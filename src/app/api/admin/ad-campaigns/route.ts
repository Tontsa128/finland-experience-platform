import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
import { isSafeUrlOrPath } from "@/lib/utils";

const editorRoles = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"];
const validStatuses = ["draft", "pending", "approved", "paused", "archived"];
const validPlacements = ["homepage", "map", "directory", "category"];
const validBilling = ["monthly", "campaign"];
const locales = ["fi", "es", "en"] as const;

async function admin() {
  const context = await getAdminContext();
  return context && editorRoles.includes(context.profile.role) ? context : null;
}

function safeHttps(value: unknown): value is string {
  if (typeof value !== "string" || !value.startsWith("https://") || !isSafeUrlOrPath(value)) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function cleanSlides(value: unknown) {
  if (!Array.isArray(value) || value.length < 3 || value.length > 5) return null;
  const slides = value.map((item) => {
    if (!item || typeof item !== "object") return null;
    const slide = item as Record<string, unknown>;
    if (typeof slide.imageUrl !== "string" || !isSafeUrlOrPath(slide.imageUrl) ||
        typeof slide.href !== "string" || !isSafeUrlOrPath(slide.href)) return null;
    const copy = (key: string) => {
      const source = slide[key] && typeof slide[key] === "object" ? slide[key] as Record<string, unknown> : {};
      return Object.fromEntries(locales.map((locale) => [locale, String(source[locale] ?? "").trim().slice(0, key === "text" ? 500 : 240)]));
    };
    const title = copy("title");
    const text = copy("text");
    const ctaLabel = copy("ctaLabel");
    const alt = copy("alt");
    if (locales.some((locale) => !title[locale] || !alt[locale])) return null;
    return { imageUrl: slide.imageUrl.trim(), href: slide.href.trim(), title, text, ctaLabel, alt };
  });
  return slides.some((slide) => !slide) ? null : slides;
}

function validate(body: Record<string, unknown>, role: string) {
  const campaignName = String(body.campaign_name || "").trim();
  const advertiserName = String(body.advertiser_name || "").trim();
  const providerUrl = body.provider_url;
  const billingModel = body.billing_model;
  const price = Number(body.price_eur);
  const placement = body.placement;
  const region = String(body.region || "southwest_finland");
  const status = body.status || "draft";
  const slides = cleanSlides(body.slides);
  const interval = Number(body.slide_interval_ms || 6000);
  const startsAt = body.starts_at ? String(body.starts_at) : null;
  const endsAt = body.ends_at ? String(body.ends_at) : null;

  if (!campaignName || campaignName.length > 120 || !advertiserName || advertiserName.length > 120 ||
      !safeHttps(providerUrl) || !validBilling.includes(String(billingModel)) ||
      !Number.isFinite(price) || price < 0 || price > 100000 ||
      !validPlacements.includes(String(placement)) || !/^[a-z0-9_-]{2,60}$/.test(region) ||
      !validStatuses.includes(String(status)) || !slides ||
      !Number.isInteger(interval) || interval < 5000 || interval > 7000) return null;
  if (startsAt && Number.isNaN(Date.parse(startsAt))) return null;
  if (endsAt && Number.isNaN(Date.parse(endsAt))) return null;
  if (startsAt && endsAt && Date.parse(endsAt) <= Date.parse(startsAt)) return null;
  if (status === "approved" && !["SUPER_ADMIN", "ADMIN"].includes(role)) return null;

  return {
    campaign_name: campaignName,
    advertiser_name: advertiserName,
    provider_url: providerUrl,
    billing_model: billingModel,
    price_eur: price,
    placement,
    region,
    status,
    starts_at: startsAt,
    ends_at: endsAt,
    slide_interval_ms: interval,
    slides,
    updated_at: new Date().toISOString(),
  };
}

export async function GET() {
  const context = await admin();
  if (!context) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { data, error } = await supabaseAdmin.from("ad_campaigns").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ campaigns: data || [] });
}

export async function POST(request: NextRequest) {
  const context = await admin();
  if (!context) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const row = validate(body, context.profile.role);
    if (!row) return NextResponse.json({ error: "Tarkista kampanjan tiedot, 3–5 diaa, kieliversiot ja käyttöoikeutesi." }, { status: 400 });
    const { data, error } = await supabaseAdmin.from("ad_campaigns").insert(row).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ campaign: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Virheellinen kampanjapyyntö" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const context = await admin();
  if (!context) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const id = String(body.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Virheellinen kampanjatunnus" }, { status: 400 });
    const row = validate(body, context.profile.role);
    if (!row) return NextResponse.json({ error: "Tarkista kampanjan tiedot, 3–5 diaa, kieliversiot ja käyttöoikeutesi." }, { status: 400 });
    const { data, error } = await supabaseAdmin.from("ad_campaigns").update(row).eq("id", id).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ campaign: data });
  } catch {
    return NextResponse.json({ error: "Virheellinen kampanjapyyntö" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const context = await admin();
  if (!context) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Virheellinen kampanjatunnus" }, { status: 400 });
  const { error } = await supabaseAdmin.from("ad_campaigns").update({ status: "archived", updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
