import { NextResponse } from "next/server";
import {
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";

const languages = new Set(["fi", "en", "es"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const question =
    typeof body.question === "string" ? body.question.slice(0, 1200).trim() : "";
  const language = languages.has(body.language) ? body.language : "fi";

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

  const languageName =
    language === "es" ? "European Spanish" : language === "en" ? "English" : "Finnish";
  const prompt = [
    "You are Finland Experience's factual travel advisor.",
    "Answer ONLY from the VERIFIED CATALOGUE JSON below.",
    "Never invent availability, prices, opening hours, services, distances, amenities, booking terms, or facts.",
    "If the catalogue does not contain an answer, say that it is not available in the verified catalogue.",
    "You may recommend matching catalogue items, but never claim that they are available for requested dates.",
    'Return ONLY valid JSON with this exact shape: {"answer":"string","recommendations":[{"type":"destination"|"accommodation"|"experience","slug":"exact catalog slug","reason":"short reason based only on catalog facts"}]}.',
    "Use at most 3 recommendations. Every slug must exist in the verified catalogue. If none match, return an empty recommendations array.",
    "Keep the answer concise and useful.",
    "Reply in " + languageName + ".",
    "User question: " + question,
    "VERIFIED CATALOGUE: " + JSON.stringify(catalog),
  ].join("\n\n");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI advisor is not configured." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model:
          process.env.OPENAI_ADVISOR_MODEL ||
          process.env.OPENAI_TRANSLATION_MODEL ||
          "gpt-5.6-luna",
        input: prompt,
        max_output_tokens: 700,
        store: false,
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return NextResponse.json(
      { error: "AI advisor is temporarily unavailable." },
      { status: 503 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "AI advisor is temporarily unavailable." },
      { status: 503 },
    );
  }

  const data = await response.json();
  const raw = typeof data.output_text === "string" ? data.output_text.trim() : "";
  if (!raw) {
    return NextResponse.json(
      { error: "AI advisor returned no answer." },
      { status: 503 },
    );
  }

  let parsed: { answer?: unknown; recommendations?: unknown };
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { answer: raw, recommendations: [] };
  }

  const valid = new Set<string>([
    ...catalog.destinations.map((item) => "destination:" + item.slug),
    ...catalog.accommodations.map((item) => "accommodation:" + item.slug),
    ...catalog.experiences.map((item) => "experience:" + item.slug),
  ]);

  const recommendations = Array.isArray(parsed.recommendations)
    ? parsed.recommendations
        .filter(
          (item): item is { type: string; slug: string; reason?: string } =>
            !!item &&
            typeof item === "object" &&
            typeof (item as { type?: unknown }).type === "string" &&
            typeof (item as { slug?: unknown }).slug === "string" &&
            valid.has(
              (item as { type: string }).type +
                ":" +
                (item as { slug: string }).slug,
            ),
        )
        .slice(0, 3)
        .map((item) => ({
          type: item.type,
          slug: item.slug,
          reason:
            typeof item.reason === "string" ? item.reason.slice(0, 300) : "",
        }))
    : [];

  const answer = typeof parsed.answer === "string" ? parsed.answer.trim() : "";
  if (!answer) {
    return NextResponse.json(
      { error: "AI advisor returned no answer." },
      { status: 503 },
    );
  }

  return NextResponse.json({ answer, recommendations, verifiedOnly: true });
}
