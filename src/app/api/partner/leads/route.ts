import { NextResponse } from "next/server";
import { getProviderContext } from "@/lib/provider-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await getProviderContext();
    if (!context) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data, error } = await supabaseAdmin
      .from("bookings_inquiries")
      .select("id,first_name,last_name,email,phone,whatsapp,arrival_date,departure_date,guests,message,lead_type,lead_status,source,source_path,created_at")
      .eq("provider_id", context.provider.id).order("created_at", { ascending: false }).limit(100);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ leads: data || [] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load leads." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  try {
    const context = await getProviderContext();
    if (!context) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = (await request.json()) as { id?: string; leadStatus?: string };
    const allowed = ["new","contacted","qualified","referred","booked","lost"];
    if (!body.id || !allowed.includes(body.leadStatus || "")) {
      return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("bookings_inquiries").update({ lead_status: body.leadStatus, updated_at: new Date().toISOString() })
      .eq("id", body.id).eq("provider_id", context.provider.id)
      .select("id,lead_status").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ lead: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update lead." }, { status: 503 });
  }
}
