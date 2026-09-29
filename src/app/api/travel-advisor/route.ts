import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const languages = new Set(["fi","en","es"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const question = typeof body.question === "string" ? body.question.slice(0,1200).trim() : "";
  const language = languages.has(body.language) ? body.language : "fi";
  if (!question) return NextResponse.json({ error: "Question is required." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const [destinations, properties, experiences] = await Promise.all([
    supabase.from("destinations").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,tags,activities,verified").eq("status","PUBLISHED").eq("verified",true).limit(100),
    supabase.from("properties").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,location,features,price,verified").eq("status","PUBLISHED").eq("verified",true).limit(100),
    supabase.from("experiences").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,region,tags,price,verified").eq("status","PUBLISHED").eq("verified",true).limit(100),
  ]);
  if (destinations.error || properties.error || experiences.error) {
    return NextResponse.json({ error: "Verified catalogue is temporarily unavailable." }, { status: 503 });
  }

  const catalog = { destinations: destinations.data || [], accommodations: properties.data || [], experiences: experiences.data || [] };
  const languageName = language === "es" ? "European Spanish" : language === "en" ? "English" : "Finnish";
  const prompt = [
    "You are Finland Experience's factual travel advisor.",
    "Answer ONLY from the VERIFIED CATALOGUE JSON below.",
    "Never invent availability, prices, opening hours, services, distances, amenities, booking terms, or facts.",
    "If the catalogue does not contain an answer, say that it is not available in the verified catalogue.",
    "You may recommend matching catalogue items, but never claim that they are available for requested dates.",
    "Return ONLY valid JSON with this exact shape: {\"answer\":\"string\",\"recommendations\":[{\"type\":\"destination\"|\"accommodation\"|\"experience\",\"slug\":\"exact catalog slug\",\"reason\":\"short reason based only on catalog facts\"}]}.",
    "Use at most 3 recommendations. Every slug must exist in the verified catalogue. If none match, return an empty recommendations array.",
    "Keep the answer concise and useful.",
    "Reply in " + languageName + ".",
    "User question: " + question,
    "VERIFIED CATALOGUE: " + JSON.stringify(catalog),
  ].join("\n\n");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI advisor is not configured." }, { status: 503 });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: "Bearer " + apiKey },
    body: JSON.stringify({
      model: process.env.OPENAI_ADVISOR_MODEL || process.env.OPENAI_TRANSLATION_MODEL || "gpt-5.6-luna",
      input: prompt,
      max_output_tokens: 700,
    }),
  });

  if (!response.ok) return NextResponse.json({ error: "AI advisor is temporarily unavailable." }, { status: 503 });
  const data = await response.json();
  const answer = typeof data.output_text === "string" ? data.output_text.trim() : "";
  if (!answer) return NextResponse.json({ error: "AI advisor returned no answer." }, { status: 503 });
  return NextResponse.json({ answer, verifiedOnly: true });
}
