import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const fields = [
  "company_checked",
  "contact_checked",
  "pricing_checked",
  "booking_flow_checked",
  "spanish_content_checked",
  "photos_checked",
] as const;

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN","ADMIN","CONTENT_MANAGER"].includes(admin.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const updates: Record<string, boolean | string | null> = {};
  for (const field of fields) if (typeof body[field] === "boolean") updates[field] = body[field];
  if (typeof body.notes === "string") updates.notes = body.notes.slice(0, 5000);
  const allChecked = fields.every((field) => updates[field] === true);
  const existing = await supabaseAdmin.from("provider_verification_checks").select("*").eq("provider_id", id).maybeSingle();
  if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 500 });
  const merged = { ...(existing.data || {}), ...updates };
  const complete = fields.every((field) => merged[field] === true);
  const payload = {
    provider_id: id,
    ...updates,
    checked_by: complete ? admin.user.id : (existing.data?.checked_by || null),
    checked_at: complete ? new Date().toISOString() : (existing.data?.checked_at || null),
  };
  const { data, error } = await supabaseAdmin.from("provider_verification_checks").upsert(payload).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (complete) await supabaseAdmin.from("providers").update({ verified: true, verified_at: new Date().toISOString() }).eq("id", id);
  else await supabaseAdmin.from("providers").update({ verified: false }).eq("id", id);
  return NextResponse.json({ verification: data, verified: complete });
}
