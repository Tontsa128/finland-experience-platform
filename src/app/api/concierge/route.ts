import { NextResponse } from "next/server";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import {
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";

const languages = new Set(["fi", "en", "es"]);

type Recommendation = {
  type: "destination" | "accommodation" | "experience";
  slug: string;
  reason: string;
};
type ModelPlan = {
  summary?: unknown;
  days?: Array<{ title?: unknown; items?: unknown }>;
  recommendations?: unknown;
};

export async function POST(request: Request) {
  const limit = rateLimit(requestKey(request,"concierge"),20,60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))) },
    });
  }
  const body = await request.json().catch(() => ({}));
  const language = languages.has(body.language) ? body.language : "fi";
  const question =
    typeof body.question === "string" ? body.question.trim().slice(0, 1500) : "";
  const rawDays = Number(body.days);
  const rawPeople = Number(body.people);
  const rawBudget = Number(body.budget);
  const days = Number.isFinite(rawDays)
    ? Math.min(Math.max(Math.floor(rawDays), 1), 14)
    : 1;
  const people = Number.isFinite(rawPeople)
    ? Math.min(Math.max(Math.floor(rawPeople), 1), 20)
    : 1;
  const budget = Number.isFinite(rawBudget)
    ? Math.min(Math.max(rawBudget, 0), 100000)
    : 0;
  const interests = Array.isArray(body.interests)
    ? body.interests
        .filter((item: unknown): item is string => typeof item === "string")
        .map((item: string) => item.trim().slice(0, 50))
        .filter(Boolean)
        .slice(0, 10)
    : [];

  if (!question) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const [destinations, properties, experiences] = await Promise.all([
    getPublishedDestinations(),
    getPublishedProperties(),
    getPublishedExperiences(),
  ]);

  const catalog = {
    destinations: destinations
      .filter((item) => item.verified === true)
      .slice(0, 100)
      .map((item) => ({
        slug: item.slug,
        name: item.name,
        description: item.description,
        tags: item.tags,
        activities: item.activities,
        verified: true,
      })),
    accommodations: properties
      .filter((item) => item.verified === true)
      .slice(0, 100)
      .map((item) => ({
        slug: item.slug,
        name: item.name,
        description: item.description,
        location: item.location,
        features: item.features,
        price: item.pricePerNight,
        verified: true,
      })),
    experiences: experiences
      .filter((item) => item.verified === true)
      .slice(0, 100)
      .map((item) => ({
        slug: item.slug,
        name: item.name,
        description: item.description,
        region: item.region,
        tags: [item.category],
        price: item.price,
        verified: true,
      })),
  };

  if (
    !catalog.destinations.length &&
    !catalog.accommodations.length &&
    !catalog.experiences.length
  ) {
    return NextResponse.json(
      { error: "Verified catalogue is temporarily unavailable." },
      { status: 503 },
    );
  }

  const langName =
    language === "es" ? "European Spanish" : language === "en" ? "English" : "Finnish";

  const prompt = [
    "You are a premium Finland travel concierge.",
    "Use ONLY the VERIFIED CATALOGUE. Never invent services, availability, opening hours, prices, distances, amenities or booking conditions.",
    "Create a practical inspiration plan for the requested number of days. This is not a booking and must not imply availability.",
    'Return ONLY JSON: {"summary":"string","days":[{"day":1,"title":"string","items":[{"type":"destination"|"accommodation"|"experience","slug":"exact catalog slug","reason":"catalog-based reason"}]}],"recommendations":[{"type":"destination"|"accommodation"|"experience","slug":"exact catalog slug","reason":"short catalog-based reason"}]}',
    "Use 1-2 catalog items per day, maximum 6 days in the response. Use at most 3 recommendations. Every slug must exist in the verified catalogue.",
    "If the catalogue lacks enough matching content, keep the plan shorter rather than inventing content.",
    "Write in " + langName + ".",
    "Trip length: " + days + " days. People: " + people + ". Budget per night: €" + budget + ". Interests: " + JSON.stringify(interests) + ".",
    "Customer request: " + question,
    "VERIFIED CATALOGUE: " + JSON.stringify(catalog),
  ].join("\n\n");

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "AI concierge is not configured." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + key,
      },
      body: JSON.stringify({
        model:
          process.env.OPENAI_ADVISOR_MODEL ||
          process.env.OPENAI_TRANSLATION_MODEL ||
          "gpt-5.6-luna",
        input: prompt,
        max_output_tokens: 1400,
        store: false,
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return NextResponse.json(
      { error: "AI concierge is temporarily unavailable." },
      { status: 503 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "AI concierge is temporarily unavailable." },
      { status: 503 },
    );
  }

  const data = await response.json();
  const raw = typeof data.output_text === "string" ? data.output_text.trim() : "";
  if (!raw) {
    return NextResponse.json(
      { error: "AI concierge returned no answer." },
      { status: 503 },
    );
  }

  let parsed: ModelPlan;
  try {
    parsed = JSON.parse(raw) as ModelPlan;
  } catch {
    return NextResponse.json(
      { error: "AI concierge returned invalid plan." },
      { status: 503 },
    );
  }

  const valid = new Set<string>([
    ...catalog.destinations.map((item) => "destination:" + item.slug),
    ...catalog.accommodations.map((item) => "accommodation:" + item.slug),
    ...catalog.experiences.map((item) => "experience:" + item.slug),
  ]);

  const cleanRecommendation = (value: unknown): Recommendation | null => {
    if (!value || typeof value !== "object") return null;
    const item = value as Record<string, unknown>;
    if (
      (item.type !== "destination" &&
        item.type !== "accommodation" &&
        item.type !== "experience") ||
      typeof item.slug !== "string" ||
      !valid.has(item.type + ":" + item.slug)
    ) {
      return null;
    }

    return {
      type: item.type,
      slug: item.slug,
      reason: typeof item.reason === "string" ? item.reason.slice(0, 300) : "",
    };
  };

  const recommendations = Array.isArray(parsed.recommendations)
    ? parsed.recommendations
        .map(cleanRecommendation)
        .filter((item): item is Recommendation => item !== null)
        .slice(0, 3)
    : [];

  const plan = Array.isArray(parsed.days)
    ? parsed.days
        .slice(0, 6)
        .map((day, index) => ({
          day: index + 1,
          title:
            typeof day?.title === "string"
              ? day.title.slice(0, 160)
              : "Day " + (index + 1),
          items: Array.isArray(day?.items)
            ? day.items
                .map(cleanRecommendation)
                .filter((item): item is Recommendation => item !== null)
                .slice(0, 2)
            : [],
        }))
        .filter((item) => item.items.length > 0)
    : [];

  const summary =
    typeof parsed.summary === "string" ? parsed.summary.trim().slice(0, 1000) : "";

  if (!summary && !plan.length) {
    return NextResponse.json(
      { error: "AI concierge returned no usable plan." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    summary,
    days: plan,
    recommendations,
    verifiedOnly: true,
  });
}
