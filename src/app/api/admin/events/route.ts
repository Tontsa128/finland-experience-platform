import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
const writers = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"];
async function guard(write = false) {
  const admin = await getAdminContext();
  return admin && (!write || writers.includes(admin.profile.role)) ? admin : null;
}

export async function GET() {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseAdmin.from("events")
    .select("*,event_locations(id,city,village,venue,address,latitude,longitude),event_sources(id,name,source_site_url,terms_url)")
    .order("starts_at", { ascending: true }).limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ events: data || [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: NextRequest) {
  const admin = await guard(true);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return NextResponse.json({ error: "Tapahtuman tunniste puuttuu." }, { status: 400 });
    const { data: old, error: oldError } = await supabaseAdmin.from("events").select("*").eq("id", id).single();
    if (oldError) return NextResponse.json({ error: oldError.message }, { status: 404 });
    const status = ["pending", "draft", "published", "cancelled", "archived"].includes(body.status) ? body.status : old.status;
    const startDate = body.starts_at === undefined ? new Date(old.starts_at) : new Date(body.starts_at);
    const endDate = body.ends_at === undefined ? (old.ends_at ? new Date(old.ends_at) : null) : body.ends_at ? new Date(body.ends_at) : null;
    if (!Number.isFinite(startDate.getTime()) || (endDate && (!Number.isFinite(endDate.getTime()) || endDate < startDate))) return NextResponse.json({ error: "Tapahtuman ajankohta ei kelpaa tai päättymisaika on ennen alkua." }, { status: 400 });
    const startsAt = startDate.toISOString();
    const endsAt = endDate?.toISOString() || null;
    const patch = {
      title_fi: String(body.title_fi ?? old.title_fi).trim().slice(0, 300),
      description_fi: String(body.description_fi ?? old.description_fi ?? "").trim().slice(0, 5000) || null,
      title_en: String(body.title_en ?? old.title_en ?? "").trim().slice(0, 300) || null,
      description_en: String(body.description_en ?? old.description_en ?? "").trim().slice(0, 5000) || null,
      title_es: String(body.title_es ?? old.title_es ?? "").trim().slice(0, 300) || null,
      description_es: String(body.description_es ?? old.description_es ?? "").trim().slice(0, 5000) || null,
      starts_at: startsAt,
      ends_at: endsAt,
      category: String(body.category ?? old.category ?? "").trim().slice(0, 120) || null,
      image_url: String(body.image_url ?? old.image_url ?? "").trim() || null,
      image_license: String(body.image_license ?? old.image_license ?? "").trim().slice(0, 300) || null,
      image_rights_verified: body.image_rights_verified === undefined ? old.image_rights_verified : body.image_rights_verified === true,
      status,
      auto_managed: false,
      reviewed_by: admin.user.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (!patch.title_fi) return NextResponse.json({ error: "Tapahtuman suomenkielinen nimi puuttuu." }, { status: 400 });
    if (patch.image_url && !/^https:\/\//i.test(patch.image_url)) return NextResponse.json({ error: "Kuvan URL:n tulee olla HTTPS." }, { status: 400 });
    if (patch.image_rights_verified && !patch.image_license) return NextResponse.json({ error: "Kuvan käyttöoikeuden tarkistus tarvitsee lisenssi- tai lupatiedon." }, { status: 400 });
    const { data, error } = await supabaseAdmin.from("events").update(patch).eq("id", id).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await supabaseAdmin.from("event_changes").insert({ event_id: id, changed_by: admin.user.id, change_type: status === "published" ? "published" : status === "cancelled" ? "cancelled" : "review", before_data: { status: old.status, title_fi: old.title_fi, starts_at: old.starts_at }, after_data: patch });
    return NextResponse.json({ event: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Tallennus epäonnistui." }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await guard(true);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    if (!body.title_fi || !body.starts_at || !body.external_url || !/^https:\/\//i.test(body.external_url)) return NextResponse.json({ error: "Nimi, alkuaika ja järjestäjän HTTPS-linkki vaaditaan." }, { status: 400 });
    const start = new Date(body.starts_at);
    const end = body.ends_at ? new Date(body.ends_at) : null;
    if (!Number.isFinite(start.getTime()) || (end && (!Number.isFinite(end.getTime()) || end < start))) return NextResponse.json({ error: "Tapahtuman ajankohta ei kelpaa." }, { status: 400 });
    const { data: location, error: locationError } = await supabaseAdmin.from("event_locations").upsert({
      city: String(body.city || "Salo").trim().slice(0, 160), venue: String(body.venue || "").trim().slice(0, 300), village: String(body.village || "").trim().slice(0, 160) || null, address: String(body.address || "").trim().slice(0, 300) || null,
    }, { onConflict: "city,venue" }).select("id").single();
    if (locationError) return NextResponse.json({ error: locationError.message }, { status: 400 });
    const { data, error } = await supabaseAdmin.from("events").insert({
      title_fi: String(body.title_fi).trim().slice(0, 300), description_fi: String(body.description_fi || "").trim().slice(0, 5000) || null,
      title_en: String(body.title_en || "").trim().slice(0, 300) || null, description_en: String(body.description_en || "").trim().slice(0, 5000) || null,
      title_es: String(body.title_es || "").trim().slice(0, 300) || null, description_es: String(body.description_es || "").trim().slice(0, 5000) || null,
      starts_at: start.toISOString(), ends_at: end?.toISOString() || null, location_id: location.id, category: String(body.category || "").trim().slice(0, 120) || null,
      external_url: body.external_url.trim(), image_url: body.image_url && /^https:\/\//i.test(body.image_url) ? body.image_url : null,
      image_license: String(body.image_license || "").trim().slice(0, 300) || null, image_rights_verified: body.image_rights_verified === true,
      status: body.status === "published" ? "published" : "draft", auto_managed: false, reviewed_by: admin.user.id, reviewed_at: new Date().toISOString(),
    }).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await supabaseAdmin.from("event_changes").insert({ event_id: data.id, changed_by: admin.user.id, change_type: data.status === "published" ? "published" : "manual_edit", after_data: data });
    return NextResponse.json({ event: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Tallennus epäonnistui." }, { status: 400 });
  }
}
