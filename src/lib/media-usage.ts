import { supabaseAdmin } from "@/lib/supabase";

export type MediaUsage = { count: number; usedIn: string[] };

export async function getMediaUsageMap(media: Array<{ id: string; url: string }>) {
  const usage = new Map<string, MediaUsage>(media.map((item) => [item.id, { count: 0, usedIn: [] }]));
  const byUrl = new Map(media.map((item) => [item.url, item.id]));
  const queries = await Promise.all([
    supabaseAdmin.from("destination_media").select("media_id,destination_id"),
    supabaseAdmin.from("property_media").select("media_id,property_id"),
    supabaseAdmin.from("experience_media").select("media_id,experience_id"),
    supabaseAdmin.from("blog_posts").select("cover_media_id"),
    supabaseAdmin.from("destinations").select("hero_image_url").is("deleted_at", null),
    supabaseAdmin.from("site_settings").select("hero_image_url,homepage_slides"),
    supabaseAdmin.from("site_pages").select("content,blocks"),
  ]);
  const [destMedia, propertyMedia, experienceMedia, blogs, destinations, settings, pages] = queries;
  const errors = queries.map((query) => query.error).filter(Boolean);
  if (errors.length) throw new Error(errors[0]?.message || "Kuvien käyttöjä ei voitu tarkistaa.");

  function add(id: string | null | undefined, label: string) {
    if (!id) return;
    const current = usage.get(String(id));
    if (!current) return;
    current.count++;
    if (!current.usedIn.includes(label)) current.usedIn.push(label);
  }
  for (const row of destMedia.data || []) add(row.media_id, "Kohteet");
  for (const row of propertyMedia.data || []) add(row.media_id, "Majoitukset");
  for (const row of experienceMedia.data || []) add(row.media_id, "Elämykset");
  for (const row of blogs.data || []) add(row.cover_media_id, "Blogi");

  function addReferencedUrls(value: unknown, label: string) {
    const serialized = typeof value === "string" ? value : JSON.stringify(value ?? "");
    if (!serialized) return;
    for (const [url, id] of Array.from(byUrl.entries())) if (serialized.includes(url)) add(id, label);
  }
  for (const row of destinations.data || []) addReferencedUrls(row.hero_image_url, "Kohteet");
  for (const row of settings.data || []) {
    addReferencedUrls(row.hero_image_url, "Etusivu");
    addReferencedUrls(row.homepage_slides, "Etusivun karuselli");
  }
  for (const row of pages.data || []) {
    addReferencedUrls(row.content, "Sivut");
    addReferencedUrls(row.blocks, "Sivut");
  }
  return usage;
}
