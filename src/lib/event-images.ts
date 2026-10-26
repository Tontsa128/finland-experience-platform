const imageCache = new Map<string, Promise<string | null>>();

function absoluteUrl(value: string, base: string) {
  try {
    return new URL(value, base).toString();
  } catch {
    return null;
  }
}

function extractImage(html: string, sourceUrl: string) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["'][^>]*>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const url = match?.[1] ? absoluteUrl(match[1], sourceUrl) : null;
    if (url) return url;
  }

  return null;
}

export function getEventImage(sourceUrl: string) {
  const existing = imageCache.get(sourceUrl);
  if (existing) return existing;

  const promise = fetch(sourceUrl, {
    headers: { "user-agent": "FINNEXPRIENCE event image preview/1.0" },
    next: { revalidate: 21600 },
  })
    .then(async (response) => {
      if (!response.ok) return null;
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html")) return null;
      return extractImage(await response.text(), sourceUrl);
    })
    .catch(() => null);

  imageCache.set(sourceUrl, promise);
  return promise;
}
