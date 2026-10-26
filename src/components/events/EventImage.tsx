import Image from "next/image";

type Props = {
  sourceUrl: string;
  alt: string;
};

function readMeta(html: string, property: string) {
  const patterns = [
    new RegExp(`<meta[^>]+property=[\\\"']${property}[\\\"'][^>]+content=[\\\"']([^\\\"']+)[\\\"']`, "i"),
    new RegExp(`<meta[^>]+content=[\\\"']([^\\\"']+)[\\\"'][^>]+property=[\\\"']${property}[\\\"']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

async function getOrganizerImage(sourceUrl: string) {
  try {
    const response = await fetch(sourceUrl, {
      headers: { "User-Agent": "FINNEXPRIENCE-event-image-fetcher/1.0" },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) return null;
    const html = await response.text();
    const raw = readMeta(html, "og:image") || readMeta(html, "twitter:image");
    return raw ? new URL(raw, sourceUrl).toString() : null;
  } catch {
    return null;
  }
}

export async function EventImage({ sourceUrl, alt }: Props) {
  const imageUrl = await getOrganizerImage(sourceUrl);
  if (!imageUrl) return null;

  return (
    <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-slate-100">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        unoptimized
      />
      <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-sm">
        Järjestäjän kuva
      </div>
    </div>
  );
}
