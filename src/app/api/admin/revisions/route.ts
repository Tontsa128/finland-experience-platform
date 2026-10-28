import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
const writers = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"];

async function guard() {
  const admin = await getAdminContext();
  return admin && writers.includes(admin.profile.role) ? admin : null;
}

export async function GET(request: NextRequest) {
  const admin = await guard();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const entityType = request.nextUrl.searchParams.get("entity_type");
  const entityId = request.nextUrl.searchParams.get("entity_id");
  if (!entityType || !entityId) return NextResponse.json({ error: "Versionoinnin kohde puuttuu." }, { status: 400 });
  const { data, error } = await supabaseAdmin.from("cms_revisions").select("id,entity_type,entity_id,locale,created_by,created_at,payload")
    .eq("entity_type", entityType).eq("entity_id", entityId).order("created_at", { ascending: false }).limit(30);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ revisions: data || [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const admin = await guard();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const revisionId = typeof body.revisionId === "string" ? body.revisionId : "";
    if (!revisionId) return NextResponse.json({ error: "Palautettava versio puuttuu." }, { status: 400 });
    const { data: revision, error: revisionError } = await supabaseAdmin.from("cms_revisions").select("*").eq("id", revisionId).single();
    if (revisionError || !revision) return NextResponse.json({ error: revisionError?.message || "Versiota ei löytynyt." }, { status: 404 });
    const payload = revision.payload as Record<string, any>;
    let result: unknown;

    if (revision.entity_type === "homepage_slides") {
      const { data: current } = await supabaseAdmin.from("site_settings").select("homepage_slides").eq("singleton", true).maybeSingle();
      await supabaseAdmin.from("cms_revisions").insert({ entity_type: "homepage_slides", entity_id: "singleton", payload: { slides: current?.homepage_slides || [] }, created_by: admin.user.id });
      const slides = Array.isArray(payload.slides) ? payload.slides : [];
      const { data, error } = await supabaseAdmin.from("site_settings").upsert({ singleton: true, homepage_slides: slides, updated_at: new Date().toISOString() }, { onConflict: "singleton" }).select("homepage_slides").single();
      if (error) throw new Error(error.message);
      result = data;
    } else if (revision.entity_type === "site_page_blocks") {
      const { data: current } = await supabaseAdmin.from("site_pages").select("id,blocks").eq("id", revision.entity_id).maybeSingle();
      if (!current) return NextResponse.json({ error: "Sivu on poistettu. Luo sivu uudelleen ennen palautusta." }, { status: 404 });
      await supabaseAdmin.from("cms_revisions").insert({ entity_type: "site_page_blocks", entity_id: revision.entity_id, locale: revision.locale, payload: { blocks: current.blocks || [] }, created_by: admin.user.id });
      const blocks = Array.isArray(payload.blocks) ? payload.blocks : [];
      const { data, error } = await supabaseAdmin.from("site_pages").update({ blocks, updated_at: new Date().toISOString() }).eq("id", revision.entity_id).select("id,slug,locale,blocks").single();
      if (error) throw new Error(error.message);
      result = data;
    } else if (revision.entity_type === "site_page") {
      if (!payload.slug || !payload.locale || !payload.title) return NextResponse.json({ error: "Tallennettu sivuversio ei sisällä palautukseen tarvittavia tietoja." }, { status: 400 });
      const { data: current } = await supabaseAdmin.from("site_pages").select("*").eq("id", revision.entity_id).maybeSingle();
      if (current) await supabaseAdmin.from("cms_revisions").insert({ entity_type: "site_page", entity_id: revision.entity_id, locale: revision.locale, payload: current, created_by: admin.user.id });
      const { data, error } = await supabaseAdmin.from("site_pages").upsert(payload, { onConflict: "slug,locale" }).select("*").single();
      if (error) throw new Error(error.message);
      result = data;
    } else {
      return NextResponse.json({ error: "Tätä sisältötyyppiä ei vielä voi palauttaa." }, { status: 400 });
    }
    return NextResponse.json({ restored: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Version palautus epäonnistui." }, { status: 400 });
  }
}
