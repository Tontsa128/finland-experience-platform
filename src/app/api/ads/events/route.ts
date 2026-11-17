import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { rateLimit, requestKey } from "@/lib/rate-limit";

const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const locales = ["fi", "es", "en"] as const;

export async function POST(request: NextRequest) {
  const limit = rateLimit(requestKey(request, "paid-ad-events"), 90, 60_000);
  if (!limit.ok) return NextResponse.json({ error: "Too many events" }, { status: 429 });

  try {
    const body = await request.json();
    const campaignId = String(body?.campaignId || "");
    const event = body?.event;
    const locale = body?.locale;
    const slideIndex = Number(body?.slideIndex ?? 0);
    if (!idPattern.test(campaignId) || !["impression", "click"].includes(event) ||
        !locales.includes(locale) || !Number.isInteger(slideIndex) || slideIndex < 0 || slideIndex > 4) {
      return NextResponse.json({ error: "Invalid ad event" }, { status: 400 });
    }

    const { data: campaign, error: lookupError } = await supabaseAdmin
      .from("ad_campaigns")
      .select("id,placement,starts_at,ends_at,status")
      .eq("id", campaignId)
      .eq("status", "approved")
      .maybeSingle();
    if (lookupError || !campaign) return NextResponse.json({ error: "Campaign unavailable" }, { status: 404 });

    const now = Date.now();
    if ((campaign.starts_at && Date.parse(campaign.starts_at) > now) ||
        (campaign.ends_at && Date.parse(campaign.ends_at) < now)) {
      return NextResponse.json({ error: "Campaign inactive" }, { status: 404 });
    }

    const { error } = await supabaseAdmin.from("ad_campaign_events").insert({
      campaign_id: campaignId,
      event_type: event,
      locale,
      placement: campaign.placement,
      slide_index: slideIndex,
    });
    if (error) return NextResponse.json({ error: "Event could not be recorded" }, { status: 500 });
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }
}
