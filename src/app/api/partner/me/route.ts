import { NextResponse } from "next/server";
import { getProviderContext } from "@/lib/provider-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await getProviderContext();
    if (!context) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: checks } = await supabaseAdmin
      .from("provider_verification_checks")
      .select("company_checked,contact_checked,pricing_checked,booking_flow_checked,spanish_content_checked,photos_checked,checked_at,notes")
      .eq("provider_id", context.provider.id).maybeSingle();
    const keys = ["company_checked","contact_checked","pricing_checked","booking_flow_checked","spanish_content_checked","photos_checked"] as const;
    const completed = keys.filter((key) => Boolean(checks?.[key])).length;
    return NextResponse.json({
      user: { id: context.user.id, email: context.user.email },
      membership: context.membership,
      provider: context.provider,
      verification: {
        completed, total: keys.length, verified: Boolean(context.provider.verified),
        checkedAt: checks?.checked_at || null,
        checks: checks ? Object.fromEntries(keys.map((key) => [key, Boolean(checks[key])])) : {},
        notes: checks?.notes || null,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load partner profile." }, { status: 503 });
  }
}
