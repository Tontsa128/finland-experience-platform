import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
const writers = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"];

async function guard(write = false) {
  const admin = await getAdminContext();
  return admin && (!write || writers.includes(admin.profile.role)) ? admin : null;
}

function validFeedUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === "https:" && !url.username && !url.password && hostname !== "localhost" && !hostname.endsWith(".local") && !hostname.endsWith(".localhost");
  } catch {
    return false;
  }
}

export async function GET() {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [{ data: sources, error }, { data: runs, error: runsError }] = await Promise.all([
    supabaseAdmin.from("event_sources").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("event_sync_runs").select("id,source_id,started_at,finished_at,status,found_count,created_count,updated_count,skipped_count,error_message").order("started_at", { ascending: false }).limit(50),
  ]);
  if (error || runsError) return NextResponse.json({ error: error?.message || runsError?.message }, { status: 500 });
  return NextResponse.json({ sources: sources || [], runs: runs || [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const admin = await guard(true);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 160) : "";
    const feedUrl = typeof body.feed_url === "string" ? body.feed_url.trim() : "";
    const termsUrl = typeof body.terms_url === "string" && body.terms_url.trim() ? body.terms_url.trim() : null;
    const imagePolicy = ["omit", "review", "licensed"].includes(body.image_policy) ? body.image_policy : "omit";
    if (!name || !validFeedUrl(feedUrl)) return NextResponse.json({ error: "Nimi ja julkinen HTTPS RSS/Atom-osoite vaaditaan." }, { status: 400 });
    if (termsUrl && !validFeedUrl(termsUrl)) return NextResponse.json({ error: "Käyttöehtojen osoitteen tulee olla HTTPS." }, { status: 400 });
    if (imagePolicy === "licensed" && (typeof body.image_license !== "string" || !body.image_license.trim())) return NextResponse.json({ error: "Kuvan lisenssi pitää kirjata ennen kuvien automaattista käyttöä." }, { status: 400 });
    const interval = Number(body.fetch_interval_minutes ?? 360);
    if (!Number.isInteger(interval) || interval < 60 || interval > 10080) return NextResponse.json({ error: "Hakuvälin tulee olla 60–10080 minuuttia." }, { status: 400 });
    const { data, error } = await supabaseAdmin.from("event_sources").insert({
      name,
      feed_url: feedUrl,
      source_site_url: validFeedUrl(body.source_site_url) ? body.source_site_url : null,
      terms_url: termsUrl,
      region: typeof body.region === "string" && body.region.trim() ? body.region.trim().slice(0, 160) : "Salo",
      enabled: body.enabled === true,
      auto_publish: body.auto_publish === true,
      fetch_interval_minutes: interval,
      image_policy: imagePolicy,
      image_license: imagePolicy === "licensed" ? body.image_license.trim().slice(0, 300) : null,
      source_type: body.source_type === "atom" ? "atom" : "rss",
    }).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ source: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Pyyntö epäonnistui." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const admin = await guard(true);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return NextResponse.json({ error: "Lähteen tunniste puuttuu." }, { status: 400 });
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (body.name !== undefined) patch.name = String(body.name).trim().slice(0, 160);
    if (body.feed_url !== undefined) {
      if (!validFeedUrl(body.feed_url)) return NextResponse.json({ error: "Lähteen URL:n tulee olla julkinen HTTPS-osoite." }, { status: 400 });
      patch.feed_url = body.feed_url.trim();
    }
    if (body.terms_url !== undefined) {
      if (body.terms_url && !validFeedUrl(body.terms_url)) return NextResponse.json({ error: "Käyttöehtojen osoitteen tulee olla HTTPS." }, { status: 400 });
      patch.terms_url = body.terms_url || null;
    }
    for (const key of ["region", "source_site_url"]) if (body[key] !== undefined) patch[key] = String(body[key]).slice(0, 500) || null;
    if (body.enabled !== undefined) patch.enabled = body.enabled === true;
    if (body.auto_publish !== undefined) patch.auto_publish = body.auto_publish === true;
    if (body.fetch_interval_minutes !== undefined) {
      const interval = Number(body.fetch_interval_minutes);
      if (!Number.isInteger(interval) || interval < 60 || interval > 10080) return NextResponse.json({ error: "Hakuvälin tulee olla 60–10080 minuuttia." }, { status: 400 });
      patch.fetch_interval_minutes = interval;
    }
    if (body.image_policy !== undefined) {
      if (!["omit", "review", "licensed"].includes(body.image_policy)) return NextResponse.json({ error: "Virheellinen kuvan käyttöpolitiikka." }, { status: 400 });
      if (body.image_policy === "licensed" && !(typeof body.image_license === "string" && body.image_license.trim())) return NextResponse.json({ error: "Lisenssi vaaditaan kuvien automaattiseen käyttöön." }, { status: 400 });
      patch.image_policy = body.image_policy;
      patch.image_license = body.image_policy === "licensed" ? body.image_license.trim().slice(0, 300) : null;
    }
    const { data, error } = await supabaseAdmin.from("event_sources").update(patch).eq("id", id).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ source: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Pyyntö epäonnistui." }, { status: 400 });
  }
}
