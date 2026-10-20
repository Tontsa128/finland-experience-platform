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
  if (!response.ok) throw new Error(`Supabase counter request failed: ${response.status}`);
  return response.json();
}

export async function GET() {
  try {
    const rows = await supabaseRequest("public_visitor_counter?select=total_visits&id=eq.true&limit=1");
    if (!rows) return NextResponse.json({ count: null, configured: false }, { status: 200 });
    return NextResponse.json(
      { count: Number(rows[0]?.total_visits ?? 0), configured: true },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json({ count: null, configured: false }, { status: 503 });
  }
}

export async function POST() {
  try {
    const result = await supabaseRequest("rpc/increment_public_visitor_counter", {
      method: "POST",
      body: "{}",
    });
    if (result === null) return NextResponse.json({ error: "Counter is not configured" }, { status: 503 });
    return NextResponse.json(
      { count: Number(result), configured: true },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json({ error: "Counter temporarily unavailable" }, { status: 503 });
  }
}
