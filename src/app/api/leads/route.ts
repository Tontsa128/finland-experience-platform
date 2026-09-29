import { NextRequest, NextResponse } from "next/server";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase";

const locales = new Set(["fi","es","en"]);
const leadTypes = new Set(["inquiry","booking_redirect","planner","concierge"]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  const limit = rateLimit(requestKey(request,"leads"),20,60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))) },
    });
  }
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

    const providerId = body.providerId ? String(body.providerId).trim() : null;
    const propertyId = body.propertyId ? String(body.propertyId).trim() : null;
    const experienceId = body.experienceId == null || body.experienceId === ""
      ? null
      : Number(body.experienceId);
    const guests = body.guests == null || body.guests === "" ? null : Number(body.guests);
    const arrivalDate = body.arrivalDate ? String(body.arrivalDate).trim() : null;
    const departureDate = body.departureDate ? String(body.departureDate).trim() : null;

    if (providerId && !UUID_PATTERN.test(providerId)) {
      return NextResponse.json({ error: "Invalid provider." }, { status: 400 });
    }
    if (propertyId && !UUID_PATTERN.test(propertyId)) {
      return NextResponse.json({ error: "Invalid property." }, { status: 400 });
    }
    if (experienceId !== null && (!Number.isInteger(experienceId) || experienceId < 1)) {
      return NextResponse.json({ error: "Invalid experience." }, { status: 400 });
    }
    if (guests !== null && (!Number.isInteger(guests) || guests < 1 || guests > 100)) {
      return NextResponse.json({ error: "Invalid guest count." }, { status: 400 });
    }
    if ((arrivalDate && !DATE_PATTERN.test(arrivalDate)) || (departureDate && !DATE_PATTERN.test(departureDate))) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    if (arrivalDate && departureDate && departureDate < arrivalDate) {
      return NextResponse.json({ error: "Departure date cannot be before arrival date." }, { status: 400 });
    }

    if (propertyId) {
      const { data: property, error } = await supabaseAdmin
        .from("properties")
        .select("id")
        .eq("id", propertyId)
        .eq("status", "published")
        .maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!property) return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }
    if (experienceId !== null) {
      const { data: experience, error } = await supabaseAdmin
        .from("experiences")
        .select("id")
        .eq("id", experienceId)
        .eq("status", "published")
        .maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!experience) return NextResponse.json({ error: "Experience not found." }, { status: 404 });
    }

    const providerIdForInsert = providerId;
    if (providerIdForInsert) {
      const { data: provider, error } = await supabaseAdmin
        .from("providers")
        .select("id")
        .eq("id", providerIdForInsert)
        .eq("active", true)
        .maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!provider) return NextResponse.json({ error: "Provider not found." }, { status: 404 });
    }

    const leadType = String(body.leadType || "inquiry");
    if (!leadTypes.has(leadType)) return NextResponse.json({ error: "Invalid lead type." }, { status: 400 });

    const tripDays = body.tripDays == null || body.tripDays === "" ? null : Number(body.tripDays);
    const tripBudgetEur = body.tripBudgetEur == null || body.tripBudgetEur === "" ? null : Number(body.tripBudgetEur);
    if (tripDays !== null && (!Number.isInteger(tripDays) || tripDays < 1 || tripDays > 30)) {
      return NextResponse.json({ error: "Invalid trip length." }, { status: 400 });
    }
    if (tripBudgetEur !== null && (!Number.isFinite(tripBudgetEur) || tripBudgetEur < 0 || tripBudgetEur > 100000)) {
      return NextResponse.json({ error: "Invalid trip budget." }, { status: 400 });
    }

    const tripInterests = Array.isArray(body.tripInterests)
      ? body.tripInterests
          .filter((x: unknown): x is string => typeof x === "string")
          .map((x: string) => x.trim().slice(0, 50))
          .filter(Boolean)
          .slice(0, 10)
      : [];

    const recommendedItems = Array.isArray(body.recommendedItems)
      ? body.recommendedItems
          .filter((x: unknown): x is Record<string, unknown> => !!x && typeof x === "object")
          .map((x: Record<string, unknown>) => ({
            type: typeof x.type === "string" ? x.type : "",
            slug: typeof x.slug === "string" ? x.slug.trim().slice(0, 200) : "",
            reason: typeof x.reason === "string" ? x.reason.trim().slice(0, 300) : "",
          }))
          .filter((x) => ["destination", "accommodation", "experience"].includes(x.type) && x.slug)
          .slice(0, 3)
      : [];

    const { data, error } = await supabaseAdmin.from("bookings_inquiries").insert({
      provider_id: providerIdForInsert,
      property_id: propertyId,
      experience_id: experienceId,
      locale,
      first_name: firstName,
      last_name: body.lastName ? String(body.lastName).trim().slice(0, 100) : null,
      email,
      phone: body.phone ? String(body.phone).trim().slice(0, 40) : null,
      whatsapp: Boolean(body.whatsapp),
      arrival_date: arrivalDate,
      departure_date: departureDate,
      guests,
      message: body.message ? String(body.message).trim().slice(0, 5000) : null,
      lead_type: leadType,
      source: body.source ? String(body.source).slice(0, 120) : "website",
      source_path: body.sourcePath ? String(body.sourcePath).slice(0, 500) : null,
      trip_days: tripDays,
      trip_budget_eur: tripBudgetEur,
      trip_interests: tripInterests,
      trip_question: body.tripQuestion ? String(body.tripQuestion).trim().slice(0, 1200) : null,
      recommended_items: recommendedItems,
    }).select("id,status,created_at").single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
