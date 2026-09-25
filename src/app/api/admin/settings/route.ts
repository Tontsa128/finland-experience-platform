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
  "homepage_intro_fi","homepage_intro_es","homepage_intro_en",
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
    const patch: Record<string, unknown> = {};
    for (const key of allowed) if (key in body) patch[key] = body[key];
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
