import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const allowed = [
  "site_name","primary_color","secondary_color","accent_color","heading_font","body_font",
  "whatsapp_number","contact_email","instagram_url","facebook_url","default_og_image","google_analytics_id",
  "hero_image_url","hero_eyebrow_fi","hero_eyebrow_es","hero_eyebrow_en",
  "hero_title_fi","hero_title_es","hero_title_en",
  "hero_description_fi","hero_description_es","hero_description_en",
  "hero_cta_label_fi","hero_cta_label_es","hero_cta_label_en","hero_cta_url",
  "hero_secondary_label_fi","hero_secondary_label_es","hero_secondary_label_en","hero_secondary_url",
  "homepage_intro_fi","homepage_intro_es","homepage_intro_en","homepage_featured_destination_ids","homepage_featured_property_ids","homepage_featured_experience_ids",
] as const;

export async function GET() {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { data, error } = await supabaseAdmin.from("site_settings").select("*").eq("singleton", true).maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Supabase is not configured" }, { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"].includes(admin.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
    }

    const patch: Record<string, unknown> = {};
    const colorFields = new Set(["primary_color", "secondary_color", "accent_color"]);
    const urlFields = new Set([
      "instagram_url", "facebook_url", "default_og_image", "hero_image_url",
      "hero_cta_url", "hero_secondary_url",
    ]);
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    for (const key of allowed) {
      if (!(key in body)) continue;
      const value = body[key];

      if (key.endsWith("_ids")) {
        if (!Array.isArray(value) || value.some((id) => !(typeof id === "string" || typeof id === "number"))) {
          return NextResponse.json({ error: key + " must be an array of IDs" }, { status: 400 });
        }
        patch[key] = value.slice(0, 50).map(String);
        continue;
      }

      if (typeof value !== "string") {
        return NextResponse.json({ error: key + " must be a string" }, { status: 400 });
      }

      const normalized = value.trim();
      const maxLength = key.includes("description") ? 2000 : key.includes("title") || key.includes("eyebrow") || key.includes("label") ? 300 : 500;
      if (normalized.length > maxLength) {
        return NextResponse.json({ error: key + " is too long" }, { status: 400 });
      }

      if (colorFields.has(key) && !/^#[0-9a-f]{6}$/i.test(normalized)) {
        return NextResponse.json({ error: key + " must be a 6-digit hex color" }, { status: 400 });
      }

      if (urlFields.has(key) && normalized && !/^(\/|https?:\/\/)/i.test(normalized)) {
        return NextResponse.json({ error: key + " must be a relative path or http(s) URL" }, { status: 400 });
      }

      if (key === "contact_email" && normalized && (!emailPattern.test(normalized) || normalized.length > 254)) {
        return NextResponse.json({ error: "contact_email is invalid" }, { status: 400 });
      }

      patch[key] = normalized || null;
    }

    if ("site_name" in body && !patch.site_name) {
      return NextResponse.json({ error: "site_name is required" }, { status: 400 });
    }

    patch.updated_at = new Date().toISOString();
    const { data, error } = await supabaseAdmin.from("site_settings").upsert(
      { singleton: true, ...patch },
      { onConflict: "singleton" }
    ).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ settings: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
