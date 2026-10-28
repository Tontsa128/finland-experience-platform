import { createHash } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

type EventSource = {
  id: string;
  name: string;
  feed_url: string;
  region: string;
  fetch_interval_minutes: number;
  auto_publish: boolean;
  image_policy: "omit" | "review" | "licensed";
  image_license: string | null;
};

type FeedEvent = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string | null;
  url: string;
  location: string;
  image: string | null;
  hash: string;
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (match, entity: string) => {
      const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
      if (entity[0] !== "#") return named[entity.toLowerCase()] ?? match;
      const code = entity[1]?.toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    })
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(block: string, names: string[]) {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}\\s*>`, "i"));
    if (match?.[1]) return decodeXml(match[1]);
  }
  return "";
}

function attrValue(block: string, names: string[]) {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = block.match(new RegExp(`\\b${escaped}=["']([^"']+)["']`, "i"));
    if (match?.[1]) return decodeXml(match[1]);
  }
  return "";
}

function parseDate(value: string) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

function safePublicFeedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return false;
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80:")) return false;
    const ip = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (ip) {
      const [a, b] = ip.slice(1).map(Number);
      if (ip.slice(1).some((part) => Number(part) > 255) || a === 0 || a === 10 || a === 127 || a >= 224 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function fetchFeed(url: string) {
  let current = url;
  for (let redirect = 0; redirect <= 3; redirect++) {
    if (!safePublicFeedUrl(current)) throw new Error("Lähde-URL ei ole sallittu.");
    const response = await fetch(current, {
      headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" },
      signal: AbortSignal.timeout(15_000),
      redirect: "manual",
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || redirect === 3) throw new Error("Lähteen uudelleenohjaus ei ole kelvollinen.");
      current = new URL(location, current).toString();
      continue;
    }
    if (!response.ok) throw new Error(`Lähde vastasi HTTP ${response.status}.`);
    const type = response.headers.get("content-type") || "";
    if (!/xml|rss|atom|text\/plain/i.test(type)) throw new Error("Lähde ei palauttanut XML-syötettä.");
    const text = await response.text();
    if (text.length > 5_000_000) throw new Error("Syöte ylittää viiden megatavun rajan.");
    return text;
  }
  throw new Error("Syötettä ei voitu hakea.");
}

function parseFeed(xml: string): FeedEvent[] {
  const blocks = Array.from(xml.matchAll(/<(?:item|entry)\b[^>]*>[\s\S]*?<\/(?:item|entry)\s*>/gi)).slice(0, 500);
  const result: FeedEvent[] = [];
  for (const [block] of blocks) {
    const title = tagValue(block, ["title"]);
    const link = tagValue(block, ["link", "guid", "id"]) || attrValue(block.match(/<link\b[^>]*>/i)?.[0] || "", ["href"]);
    const startValue = tagValue(block, ["start", "startDate", "start_date", "dtstart", "eventStartDate", "event_start_date", "eventstart"]);
    const endValue = tagValue(block, ["end", "endDate", "end_date", "dtend", "eventEndDate", "event_end_date", "eventend"]);
    const start = parseDate(startValue);
    const url = /^https:\/\//i.test(link) ? link : "";
    if (!title || !start || !url) continue;
    const description = tagValue(block, ["description", "summary", "content:encoded", "content"]);
    const venue = tagValue(block, ["location", "venue", "place", "address"]);
    const imageBlock = block.match(/<(?:enclosure|media:content|media:thumbnail)\b[^>]*>/i)?.[0] || "";
    const imageType = attrValue(imageBlock, ["type", "medium"]);
    const image = attrValue(imageBlock, ["url", "href"]);
    const imageUrl = image && /^https:\/\//i.test(image) && (imageType.startsWith("image/") || imageType === "image") ? image : null;
    const contentHash = createHash("sha256").update(JSON.stringify({ title, description, start, end: parseDate(endValue), venue, url })).digest("hex");
    result.push({
      id: tagValue(block, ["guid", "id"]) || url,
      title: title.slice(0, 300),
      description: description.slice(0, 5000),
      start,
      end: parseDate(endValue),
      url,
      location: venue.slice(0, 300),
      image: imageUrl,
      hash: contentHash,
    });
  }
  return result;
}

async function syncSource(source: EventSource) {
  const startedAt = new Date().toISOString();
  const { data: run, error: runError } = await supabaseAdmin.from("event_sync_runs").insert({ source_id: source.id, started_at: startedAt }).select("id").single();
  if (runError) throw new Error(runError.message);
  const counts = { found: 0, created: 0, updated: 0, skipped: 0 };
  try {
    const xml = await fetchFeed(source.feed_url);
    const feedEvents = parseFeed(xml);
    counts.found = feedEvents.length;
    for (const event of feedEvents) {
      const { data: old, error: oldError } = await supabaseAdmin.from("events")
        .select("id,title_fi,description_fi,starts_at,ends_at,status,source_hash,location_id")
        .eq("source_id", source.id).eq("source_item_id", event.id).maybeSingle();
      if (oldError) throw new Error(oldError.message);

      let locationId: string | null = null;
      const city = source.region || "Salo";
      const venue = event.location || city;
      const { data: location, error: locationError } = await supabaseAdmin.from("event_locations")
        .upsert({ city, venue }, { onConflict: "city,venue" }).select("id").single();
      if (locationError) throw new Error(locationError.message);
      locationId = location.id;

      if (!old) {
        const { data: created, error } = await supabaseAdmin.from("events").insert({
          source_id: source.id,
          source_item_id: event.id,
          title_fi: event.title,
          description_fi: event.description || null,
          starts_at: event.start,
          ends_at: event.end,
          location_id: locationId,
          external_url: event.url,
          image_url: source.image_policy === "licensed" && source.image_license ? event.image : null,
          image_source_url: event.image,
          image_license: source.image_policy === "licensed" ? source.image_license : null,
          image_rights_verified: source.image_policy === "licensed" && Boolean(source.image_license && event.image),
          status: source.auto_publish ? "published" : "pending",
          auto_managed: true,
          source_snapshot: event,
          source_hash: event.hash,
          reviewed_at: source.auto_publish ? new Date().toISOString() : null,
        }).select("id").single();
        if (error) {
          if (error.code === "23505") { counts.skipped++; continue; }
          throw new Error(error.message);
        }
        counts.created++;
        await supabaseAdmin.from("event_changes").insert({ event_id: created.id, source_id: source.id, change_type: "discovered", after_data: event });
        continue;
      }

      if (old.source_hash === event.hash) { counts.skipped++; continue; }
      const before = { title: old.title_fi, description: old.description_fi, starts_at: old.starts_at, ends_at: old.ends_at };
      const nextStatus = old.status === "published" ? "pending" : old.status;
      const { error } = await supabaseAdmin.from("events").update({
        title_fi: event.title,
        description_fi: event.description || null,
        starts_at: event.start,
        ends_at: event.end,
        location_id: locationId,
        external_url: event.url,
        image_source_url: event.image,
        source_snapshot: event,
        source_hash: event.hash,
        status: nextStatus,
        reviewed_at: null,
        updated_at: new Date().toISOString(),
      }).eq("id", old.id);
      if (error) throw new Error(error.message);
      counts.updated++;
      await supabaseAdmin.from("event_changes").insert({ event_id: old.id, source_id: source.id, change_type: "source_update", before_data: before, after_data: event });
    }

    const finishedAt = new Date().toISOString();
    await supabaseAdmin.from("event_sources").update({ last_checked_at: finishedAt, next_check_at: new Date(Date.now() + Math.max(60, source.fetch_interval_minutes) * 60_000).toISOString(), updated_at: finishedAt }).eq("id", source.id);
    await supabaseAdmin.from("event_sync_runs").update({ status: "success", finished_at: finishedAt, found_count: counts.found, created_count: counts.created, updated_count: counts.updated, skipped_count: counts.skipped }).eq("id", run.id);
    return { sourceId: source.id, sourceName: source.name, status: "success", ...counts };
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 1000) : "Lähteen haku epäonnistui.";
    const finishedAt = new Date().toISOString();
    await supabaseAdmin.from("event_sources").update({ last_checked_at: finishedAt, next_check_at: new Date(Date.now() + Math.max(60, source.fetch_interval_minutes) * 60_000).toISOString(), updated_at: finishedAt }).eq("id", source.id);
    await supabaseAdmin.from("event_sync_runs").update({ status: "failed", finished_at: finishedAt, found_count: counts.found, created_count: counts.created, updated_count: counts.updated, skipped_count: counts.skipped, error_message: message }).eq("id", run.id);
    return { sourceId: source.id, sourceName: source.name, status: "failed", ...counts, error: message };
  }
}

export async function syncEventSources(options: { sourceIds?: string[]; force?: boolean } = {}) {
  let query = supabaseAdmin.from("event_sources").select("id,name,feed_url,region,fetch_interval_minutes,auto_publish,image_policy,image_license").eq("enabled", true);
  if (options.sourceIds?.length) query = query.in("id", options.sourceIds);
  else if (!options.force) query = query.lte("next_check_at", new Date().toISOString());
  const { data, error } = await query.order("next_check_at").limit(20);
  if (error) throw new Error(error.message);
  const results = [];
  for (const row of (data || []) as EventSource[]) results.push(await syncSource(row));
  return { checked: results.length, results };
}
