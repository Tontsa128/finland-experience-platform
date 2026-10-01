import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const languages = new Set(["fi", "en", "es"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const language = languages.has(body.language) ? body.language : "fi";
  const question = typeof body.question === "string" ? body.question.trim().slice(0, 1500) : "";
  const rawDays = Number(body.days);
  const rawPeople = Number(body.people);
  const rawBudget = Number(body.budget);
  const days = Number.isFinite(rawDays) ? Math.min(Math.max(Math.floor(rawDays), 1), 14) : 1;
  const people = Number.isFinite(rawPeople) ? Math.min(Math.max(Math.floor(rawPeople), 1), 20) : 1;
  const budget = Number.isFinite(rawBudget) ? Math.min(Math.max(rawBudget, 0), 100000) : 0;
  const interests = Array.isArray(body.interests)
    ? body.interests
        .filter((x: unknown): x is string => typeof x === "string")
        .map((x: string) => x.trim().slice(0, 50))
        .filter(Boolean)
        .slice(0, 10)
    : [];

  if (!question) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: "Verified catalogue is temporarily unavailable." }, { status: 503 });
  }

  const [destinations, properties, experiences] = await Promise.all([
    supabase.from("destinations").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,tags,activities,verified").eq("status", "PUBLISHED").eq("verified", true).limit(100),
    supabase.from("properties").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,location,features,price,verified").eq("status", "PUBLISHED").eq("verified", true).limit(100),
    supabase.from("experiences").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,region,tags,price,verified").eq("status", "PUBLISHED").eq("verified", true).limit(100),
  ]);

  if (destinations.error || properties.error || experiences.error) {
    return NextResponse.json({ error: "Verified catalogue is temporarily unavailable." }, { status: 503 });
  }

  const catalog = {
    destinations: destinations.data || [],
    accommodations: properties.data || [],
    experiences: experiences.data || [],
  };
  const languageName = language === "es" ? "European Spanish" : language === "en" ? "English" : "Finnish";
  const prompt = [
    "You are a premium Finland travel concierge.",
    "Use ONLY the VERIFIED CATALOGUE. Never invent services, availability, opening hours, prices, distances, amenities or booking conditions.",
    "Create a practical inspiration plan for the requested number of days. This is not a booking and must not imply availability.",
    "Return ONLY valid JSON with this exact shape: {\"summary\":\"string\",\"days\":[{\"day\":1,\"title\":\"string\",\"items\":[{\"type\":\"destination\"|\"accommodation\"|\"experience\",\"slug\":\"exact catalog slug\",\"reason\":\"catalog-based reason\"}]}],\"recommendations\":[{\"type\":\"destination\"|\"accommodation\"|\"experience\",\"slug\":\"exact catalog slug\",\"reason\":\"short reason\"}]}",
    "Use 1-2 catalog items per day, maximum 6 days in the response. Use at most 3 top-level recommendations. Every slug must exist in the verified catalogue.",
    "If the catalogue lacks enough matching content, keep the plan shorter rather than inventing content.",
    "Write in " + languageName + ".",
    "Trip length: " + days + " days. People: " + people + ". Budget per night: €" + budget + ". Interests: " + JSON.stringify(interests) + ".",
    "Customer request: " + question,
    "VERIFIED CATALOGUE: " + JSON.stringify(catalog),
  ].join("\n\n");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI concierge is not configured." }, { status: 503 });
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
        model: process.env.OPENAI_ADVISOR_MODEL || process.env.OPENAI_TRANSLATION_MODEL || "gpt-5.6-luna",
        input: prompt,
        max_output_tokens: 1400,
      }),
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    return NextResponse.json({ error: "AI concierge is temporarily unavailable." }, { status: 503 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: "AI concierge is temporarily unavailable." }, { status: 503 });
  }

  const data = await response.json();
  const raw = typeof data.output_text === "string" ? data.output_text.trim() : "";
  if (!raw) {
    return NextResponse.json({ error: "AI concierge returned no answer." }, { status: 503 });
  }

  let parsed: { summary?: unknown; days?: unknown; recommendations?: unknown };
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "AI concierge returned an invalid plan." }, { status: 503 });
  }

  const valid = new Set<string>([
    ...(destinations.data || []).map((x) => "destination:" + x.slug),
    ...(properties.data || []).map((x) => "accommodation:" + x.slug),
    ...(experiences.data || []).map((x) => "experience:" + x.slug),
  ]);

  type CatalogItem = { type: "destination" | "accommodation" | "experience"; slug: string; reason: string };

  const cleanItem = (x: unknown): CatalogItem | null => {
    if (
      !x ||
      typeof x !== "object" ||
      typeof (x as { type?: unknown }).type !== "string" ||
      typeof (x as { slug?: unknown }).slug !== "string"
    ) {
      return null;
    }
    const type = (x as { type: string }).type;
    const slug = (x as { slug: string }).slug;
    if (!valid.has(type + ":" + slug)) return null;
    const reasonRaw = (x as { reason?: unknown }).reason;
    return {
      type: type as CatalogItem["type"],
      slug,
      reason: typeof reasonRaw === "string" ? reasonRaw.slice(0, 300) : "",
    };
  };

  const recommendations = Array.isArray(parsed.recommendations)
    ? parsed.recommendations.map(cleanItem).filter((x): x is CatalogItem => x !== null).slice(0, 3)
    : [];

  const plan = Array.isArray(parsed.days)
    ? parsed.days.slice(0, 6).map((day: unknown, i: number) => {
        const d = day as { title?: unknown; items?: unknown } | null;
        const title = d && typeof d.title === "string" ? d.title.slice(0, 160) : "Day " + (i + 1);
        const items = d && Array.isArray(d.items)
          ? d.items.map(cleanItem).filter((x): x is CatalogItem => x !== null).slice(0, 4)
          : [];
        return { day: i + 1, title, items };
      })
    : [];

  const summary = typeof parsed.summary === "string" ? parsed.summary.trim().slice(0, 1000) : "";
  if (!summary && !plan.length) {
    return NextResponse.json({ error: "AI concierge returned no usable plan." }, { status: 503 });
  }

  return NextResponse.json({ summary, days: plan, recommendations, verifiedOnly: true });
}
