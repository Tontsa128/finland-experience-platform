import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const MODEL = process.env.OPENAI_TRANSLATION_MODEL || "gpt-5.6-luna";

type Body = { text?: string; context?: "travel" | "seo" | "button" | "general" };

export async function POST(request: Request) {
  try {
    await requireAdmin(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"]);
    const body = (await request.json()) as Body;
    const text = body.text?.trim();
    if (!text) return NextResponse.json({ error: "Käännettävä teksti puuttuu." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY puuttuu palvelimen ympäristömuuttujista." }, { status: 503 });

    const context = body.context || "travel";
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        instructions: [
          "You are the professional translator for a premium Finland travel website.",
          "Translate Finnish source content into natural, polished English and European Spanish.",
          "Preserve facts, meaning, tone and calls to action. Never invent amenities, prices, locations or claims.",
          "Keep destination names such as Finland, Naantali, Mathildedal, Turku, Hanko and Åland/Ahvenanmaa as proper names when appropriate.",
          "English should sound natural to an international traveller. Spanish should sound natural for travel customers.",
          context === "button" ? "This is a short UI/CTA label: keep translations concise." : "",
          context === "seo" ? "This is SEO content: keep important destination terms natural and descriptive without keyword stuffing." : "",
          "Return ONLY valid JSON with exactly two string fields: english and spanish."
        ].filter(Boolean).join("\n"),
        input: text
      })
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "Käännöspalvelu epäonnistui." }, { status: 502 });

    let raw = data?.output_text;
    if (!raw && Array.isArray(data?.output)) {
      raw = data.output.flatMap((item: any) => item?.content || []).map((item: any) => item?.text || "").join("");
    }
    if (!raw) return NextResponse.json({ error: "Käännösmalli ei palauttanut tekstiä." }, { status: 502 });

    const cleaned = String(raw).replace(/^\`\`\`json\s*/i, "").replace(/\s*\`\`\`$/, "").trim();
    const parsed = JSON.parse(cleaned) as { english?: string; spanish?: string };
    if (!parsed.english || !parsed.spanish) return NextResponse.json({ error: "Käännöksistä puuttuu englanti tai espanja." }, { status: 502 });

    return NextResponse.json({ english: parsed.english, spanish: parsed.spanish, model: MODEL });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Käännös epäonnistui.";
    const unauthorized = message === "UNAUTHORIZED" || message === "FORBIDDEN";
    return NextResponse.json({ error: unauthorized ? "Kirjaudu sisään hallintaan." : message }, { status: unauthorized ? 401 : 500 });
  }
}
