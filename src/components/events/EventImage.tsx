import { EventImageDisplay } from "@/components/events/EventImageDisplay";

type Props = {
  sourceUrl: string;
  imageUrl?: string;
  alt: string;
  locale: "fi" | "es" | "en";
};

function metaContent(html: string, key: string) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attrs: Record<string, string> = {};
    for (const match of Array.from(tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g))) {
      attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
    }
    const identity = (attrs.property ?? attrs.name ?? attrs.itemprop ?? "").toLowerCase();
    if (identity === key.toLowerCase() && attrs.content) return attrs.content;
  }
  return null;
}

function jsonLdImage(html: string) {
  for (const match of Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))) {
    try {
      const data = JSON.parse(match[1]);
      const queue = Array.isArray(data) ? [...data] : [data];
      while (queue.length) {
        const item = queue.shift();
        if (!item || typeof item !== "object") continue;
        if (Array.isArray(item)) { queue.push(...item); continue; }
        const image = item.image;
        if (typeof image === "string") return image;
        if (Array.isArray(image) && typeof image[0] === "string") return image[0];
        if (image && typeof image === "object" && typeof image.url === "string") return image.url;
        if (item["@graph"]) queue.push(item["@graph"]);
      }
    } catch {
      // Ignore malformed JSON-LD and continue to the next candidate.
    }
  }
  return null;
}

async function getOrganizerImage(sourceUrl: string) {
  try {
    const response = await fetch(sourceUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FINNEXPRIENCE/1.0; event image attribution)",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(9000),
    });
    if (!response.ok) return null;
    const html = await response.text();
    const raw =
      metaContent(html, "og:image") ||
      metaContent(html, "twitter:image") ||
      metaContent(html, "image");
    const structured = raw || jsonLdImage(html);
    if (!structured) return null;
    const resolved = new URL(structured.replaceAll("&amp;", "&"), sourceUrl);
    if (resolved.protocol !== "https:" && resolved.protocol !== "http:") return null;
    return resolved.toString();
  } catch {
    return null;
  }
}

export async function EventImage({ sourceUrl, imageUrl: suppliedImageUrl, alt, locale }: Props) {
  const imageUrl = suppliedImageUrl || await getOrganizerImage(sourceUrl);
  return <EventImageDisplay imageUrl={imageUrl} alt={alt} locale={locale} />;
}
