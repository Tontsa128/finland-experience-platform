import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isUuid(value: string | undefined): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-9a-f][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

export async function POST(request: NextRequest) {
  try {
    const existingId = request.cookies.get("fx_visitor_id")?.value;
    const visitorId = isUuid(existingId) ? existingId : randomUUID();
    const { error } = await supabaseAdmin.from("site_visit_events").insert({ visitor_id: visitorId });

    if (error) {
      return NextResponse.json({ error: "Visitor statistics are not configured." }, { status: 503 });
    }

    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    if (visitorId !== existingId) {
      response.cookies.set("fx_visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  } catch {
    return NextResponse.json({ error: "Visitor statistics are unavailable." }, { status: 503 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.rpc("get_site_visitor_stats");
    if (error || !Array.isArray(data) || !data[0]) {
      return NextResponse.json({ error: "Visitor statistics are not configured." }, { status: 503 });
    }
    return NextResponse.json({
      monthlyVisitors: Number(data[0].monthly_visitors) || 0,
      totalVisitors: Number(data[0].total_visitors) || 0,
    }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json({ error: "Visitor statistics are unavailable." }, { status: 503 });
  }
}
