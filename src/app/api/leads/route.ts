import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const locales = new Set(["fi","es","en"]);
const leadTypes = new Set(["inquiry","booking_redirect","planner","concierge"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ inquiry: null }, { status: 201 });
    const firstName = String(body.firstName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const locale = String(body.locale || "es");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || firstName.length > 100 || !emailPattern.test(email) || email.length > 254 || !locales.has(locale)) {
      return NextResponse.json({ error: "Please provide a valid name, email and locale." }, { status: 400 });
    }

    const providerId = body.providerId ? String(body.providerId) : null;
    if (providerId) {
      const { data: provider, error } = await supabaseAdmin
        .from("providers")
        .select("id")
        .eq("id", providerId)
        .eq("active", true)
        .maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!provider) return NextResponse.json({ error: "Provider not found." }, { status: 404 });
    }

    const leadType = String(body.leadType || "inquiry");
    if (!leadTypes.has(leadType)) return NextResponse.json({ error: "Invalid lead type." }, { status: 400 });

    const { data, error } = await supabaseAdmin.from("bookings_inquiries").insert({
      provider_id: providerId,
      property_id: body.propertyId ? String(body.propertyId) : null,
      experience_id: body.experienceId ? Number(body.experienceId) : null,
      locale,
      first_name: firstName,
      last_name: body.lastName ? String(body.lastName).trim().slice(0, 100) : null,
      email,
      phone: body.phone ? String(body.phone).trim().slice(0, 40) : null,
      whatsapp: Boolean(body.whatsapp),
      arrival_date: body.arrivalDate || null,
      departure_date: body.departureDate || null,
      guests: body.guests ? Number(body.guests) : null,
      message: body.message ? String(body.message).trim().slice(0, 5000) : null,
      lead_type: leadType,
      source: body.source ? String(body.source).slice(0, 120) : "website",
      source_path: body.sourcePath ? String(body.sourcePath).slice(0, 500) : null,
      trip_days: Number.isFinite(Number(body.tripDays)) ? Math.min(Math.max(Number(body.tripDays), 1), 30) : null,
      trip_budget_eur: Number.isFinite(Number(body.tripBudgetEur)) ? Math.min(Math.max(Number(body.tripBudgetEur), 0), 100000) : null,
      trip_interests: Array.isArray(body.tripInterests) ? body.tripInterests.map((x: unknown) => String(x).slice(0, 50)).slice(0, 10) : [],
      trip_question: body.tripQuestion ? String(body.tripQuestion).trim().slice(0, 1200) : null,
      recommended_items: Array.isArray(body.recommendedItems)
        ? body.recommendedItems
            .filter((x: unknown): x is Record<string, unknown> => !!x && typeof x === "object")
            .map((x) => ({
              type: typeof x.type === "string" ? x.type.slice(0, 30) : "",
              slug: typeof x.slug === "string" ? x.slug.slice(0, 200) : "",
              reason: typeof x.reason === "string" ? x.reason.slice(0, 300) : "",
            }))
            .filter((x) => ["destination", "accommodation", "experience"].includes(x.type) && x.slug)
            .slice(0, 3)
        : [],
    }).select("id,status,created_at").single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
