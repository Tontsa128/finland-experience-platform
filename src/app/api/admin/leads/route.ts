import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const statuses = ["new","contacted","qualified","referred","booked","lost"] as const;

export async function GET() {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("bookings_inquiries")
    .select("id,created_at,first_name,last_name,email,phone,locale,lead_type,lead_status,source,source_path,provider_id,trip_days,trip_budget_eur,trip_interests,trip_question,recommended_items,message,providers(name,slug)")
    .in("lead_type", ["planner","concierge"])
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data || [], statuses });
}

export async function PATCH(request: Request) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const id = typeof body.id === "string" ? body.id : "";
  const leadStatus = typeof body.leadStatus === "string" ? body.leadStatus : "";

  if (!id || !statuses.includes(leadStatus as typeof statuses[number])) {
    return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings_inquiries")
    .update({ lead_status: leadStatus })
    .eq("id", id)
    .select("id,lead_status")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}
