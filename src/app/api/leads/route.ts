import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const locales = new Set(["fi","es","en"]);
const leadTypes = new Set(["inquiry","booking_redirect","planner","concierge"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const locale = String(body.locale || "es");
    if (!firstName || !email || !locales.has(locale)) {
      return NextResponse.json({ error: "firstName, email and a valid locale are required." }, { status: 400 });
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
      last_name: body.lastName ? String(body.lastName).trim() : null,
      email,
      phone: body.phone ? String(body.phone).trim() : null,
      whatsapp: Boolean(body.whatsapp),
      arrival_date: body.arrivalDate || null,
      departure_date: body.departureDate || null,
      guests: body.guests ? Number(body.guests) : null,
      message: body.message ? String(body.message).trim() : null,
      lead_type: leadType,
      source: body.source ? String(body.source).slice(0, 120) : "website",
      source_path: body.sourcePath ? String(body.sourcePath).slice(0, 500) : null,
    }).select("id,status,created_at").single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
