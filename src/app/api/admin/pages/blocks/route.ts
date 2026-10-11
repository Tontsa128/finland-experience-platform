import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
import { isSafeUrlOrPath } from "@/lib/utils";
import { sanitizeImageUrl } from "@/lib/media-safety";

export const dynamic = "force-dynamic";
const allowed = new Set(["hero", "text", "image", "image_text", "gallery", "cta", "spacer"]);

function clean(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 80).map((row: any, index: number) => ({
    id: String(row?.id || crypto.randomUUID()),
    type: allowed.has(row?.type) ? row.type : "text",
    sortOrder: index,
    imageUrl: sanitizeImageUrl(row?.imageUrl),
    imageAlt: String(row?.imageAlt || "").trim().slice(0, 500),
    rightsConfirmed: row?.rightsConfirmed === true,
    layout: String(row?.layout || "wide").slice(0, 30),
    visible: row?.visible !== false,
    content: Object.fromEntries(["fi", "en", "es"].map((locale) => [locale, {
      eyebrow: String(row?.content?.[locale]?.eyebrow || "").slice(0, 300),
      title: String(row?.content?.[locale]?.title || "").slice(0, 300),
      text: String(row?.content?.[locale]?.text || "").slice(0, 5000),
      buttonLabel: String(row?.content?.[locale]?.buttonLabel || "").slice(0, 200),
      buttonUrl: String(row?.content?.[locale]?.buttonUrl || "").slice(0, 500),
    }])),
    items: Array.isArray(row?.items) ? row.items.slice(0, 12).map((item: any) => ({
      id: String(item?.id || crypto.randomUUID()),
      url: sanitizeImageUrl(item?.url),
      alt: String(item?.alt || "").trim().slice(0, 500),
      rightsConfirmed: item?.rightsConfirmed === true,
    })).filter((item: any) => item.url) : [],
  }));
}

async function guard() {
  const admin = await getAdminContext();
  return admin && ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"].includes(admin.profile.role)
    ? admin
    : null;
}

export async function PUT(request: NextRequest) {
  const admin = await guard();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const blocks = clean(body?.blocks);
    const slug = String(body?.slug || "").trim().slice(0, 150);
    const locale = ["fi", "en", "es"].includes(body?.locale) ? body.locale : null;
    if (!slug || !locale) return NextResponse.json({ error: "Virheellinen sivutunniste tai kieli." }, { status: 400 });

    const { data: page, error: pageError } = await supabaseAdmin
      .from("site_pages")
      .select("id,slug,locale,blocks")
      .eq("slug", slug)
      .eq("locale", locale)
      .maybeSingle();
    if (pageError) return NextResponse.json({ error: pageError.message }, { status: 400 });
    if (!page) return NextResponse.json({ error: "Sivua ei löytynyt." }, { status: 404 });

    const { data, error } = await supabaseAdmin
      .from("site_pages")
      .update({ blocks, updated_at: new Date().toISOString() })
      .eq("id", page.id)
      .select("id,slug,locale,blocks")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await supabaseAdmin.from("cms_revisions").insert({
      entity_type: "site_page_blocks",
      entity_id: String(page.id),
      payload: { blocks },
      created_by: admin.user.id,
    });
    return NextResponse.json({ page: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Virhe" }, { status: 400 });
  }
}
