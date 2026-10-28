import { supabaseAdmin } from "@/lib/supabase";
import type { Locale } from "@/types";

export type PublicEvent = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  start: string;
  end?: string;
  location: string;
  url: string;
  image?: string;
};

export async function getPublishedEvents(): Promise<PublicEvent[]> {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabaseAdmin.from("events")
      .select("id,title_fi,description_fi,title_en,description_en,title_es,description_es,starts_at,ends_at,external_url,image_url,image_rights_verified,event_locations(city,village,venue,address)")
      .eq("status", "published")
      .or(`ends_at.gte.${now},and(ends_at.is.null,starts_at.gte.${now})`)
      .order("starts_at", { ascending: true }).limit(200);
    if (error || !data?.length) return [];
    return data.map((row: any) => {
      const location = Array.isArray(row.event_locations) ? row.event_locations[0] : row.event_locations;
      const fiTitle = String(row.title_fi || "");
      const enTitle = String(row.title_en || fiTitle);
      const esTitle = String(row.title_es || enTitle);
      const fiDescription = String(row.description_fi || "");
      const enDescription = String(row.description_en || fiDescription);
      const esDescription = String(row.description_es || enDescription);
      return {
        id: String(row.id),
        title: { fi: fiTitle, en: enTitle, es: esTitle },
        description: { fi: fiDescription, en: enDescription, es: esDescription },
        start: String(row.starts_at),
        end: row.ends_at ? String(row.ends_at) : undefined,
        location: [location?.venue, location?.village, location?.city].filter(Boolean).join(", "),
        url: String(row.external_url),
        image: row.image_rights_verified && row.image_url ? String(row.image_url) : undefined,
      } satisfies PublicEvent;
    }).filter((event: PublicEvent) => event.title.fi && event.url.startsWith("https://"));
  } catch {
    // Keep the current curated calendar available until the migration is deployed.
    return [];
  }
}
