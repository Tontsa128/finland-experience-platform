type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
const MAX_KEYS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey) buckets.delete(oldestKey);
    }
    const next = { count: 1, resetAt: now + windowMs };
    buckets.set(key, next);
    return { ok: true, remaining: Math.max(limit - 1, 0), resetAt: next.resetAt };
  }

  current.count += 1;
  return {
    ok: current.count <= limit,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
  };
}

export function requestKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const ip = forwarded || realIp || "unknown";
  return scope + ":" + ip;
}
