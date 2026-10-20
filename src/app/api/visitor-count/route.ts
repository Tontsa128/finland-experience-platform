import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseRequest(path: string, init?: RequestInit) {
  const config = getSupabaseConfig();
  if (!config) return null;
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`Supabase metrics request failed: ${response.status}`);
  return response.json();
}

function normalizeMetrics(row: Record<string, unknown> | undefined) {
  if (!row) return null;
  return {
    count: Number(row.total_visitors ?? 0),
    totalVisitors: Number(row.total_visitors ?? 0),
    totalDownloads: Number(row.total_downloads ?? 53547),
    totalSiteVisits: Number(row.total_site_visits ?? 50000),
    monthVisitors: Number(row.month_visitors ?? 0),
    monthKey: String(row.month_key ?? ""),
    configured: true,
  };
}

export async function GET() {
  try {
    const rows = await supabaseRequest("public_site_metrics?select=total_visitors,total_downloads,month_visitors,month_key,total_site_visits&id=eq.true&limit=1") as Record<string, unknown>[] | null;
    if (!rows) return NextResponse.json({ count: null, configured: false }, { status: 200 });
    const metrics = normalizeMetrics(rows[0]);
    if (!metrics) return NextResponse.json({ count: null, configured: false }, { status: 503 });
    return NextResponse.json(metrics, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ count: null, configured: false }, { status: 503 });
  }
}

export async function POST() {
  try {
    const result = await supabaseRequest("rpc/increment_public_site_metrics", {
      method: "POST",
      body: "{}",
    }) as Record<string, unknown>[] | null;
    if (result === null) return NextResponse.json({ error: "Metrics are not configured" }, { status: 503 });
    const metrics = normalizeMetrics(Array.isArray(result) ? result[0] : undefined);
    if (!metrics) return NextResponse.json({ error: "Metrics are not configured" }, { status: 503 });
    return NextResponse.json(metrics, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ error: "Metrics temporarily unavailable" }, { status: 503 });
  }
}
