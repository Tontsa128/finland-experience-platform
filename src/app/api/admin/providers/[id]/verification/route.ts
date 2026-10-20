import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { firstValidHttpUrl } from "@/lib/utils";

const fields = ["company_checked","contact_checked","pricing_checked","booking_flow_checked","spanish_content_checked","photos_checked"] as const;
const allowedRoles = ["SUPER_ADMIN","ADMIN","CONTENT_MANAGER"] as const;

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!allowedRoles.includes(admin.profile.role as typeof allowedRoles[number])) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("provider_verification_checks").select("*").eq("provider_id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ verification: data || Object.fromEntries(fields.map((field) => [field, false])) });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!allowedRoles.includes(admin.profile.role as typeof allowedRoles[number])) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const existing = await supabaseAdmin.from("provider_verification_checks").select("*").eq("provider_id", id).maybeSingle();
  if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 500 });

  const updates: Record<string, boolean | string | null> = {};
  for (const field of fields) if (typeof body[field] === "boolean") updates[field] = body[field];
  if (typeof body.notes === "string" || body.notes === null) updates.notes = body.notes === null ? null : body.notes.slice(0, 5000);
  if (!Object.keys(updates).length) return NextResponse.json({ error: "No verification changes supplied." }, { status: 400 });

  const merged = { ...(existing.data || {}), ...updates };
  const complete = fields.every((field) => merged[field] === true);
  if (complete) {
    const { data: provider, error: providerError } = await supabaseAdmin
      .from("providers")
      .select("website_url,booking_url")
      .eq("id", id)
      .maybeSingle();
    if (providerError) return NextResponse.json({ error: providerError.message }, { status: 500 });
    const providerUrl = firstValidHttpUrl(provider?.booking_url, provider?.website_url);
    if (!provider || !providerUrl) {
      return NextResponse.json({ error: "Provider verification requires a valid provider website or booking URL." }, { status: 400 });
    }
  }
  const payload = {
    provider_id: id,
    ...updates,
    checked_by: complete ? admin.user.id : (existing.data?.checked_by || null),
    checked_at: complete ? new Date().toISOString() : null,
  };
  const { data, error } = await supabaseAdmin.from("provider_verification_checks").upsert(payload, { onConflict: "provider_id" }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const providerUpdate = complete ? { verified: true, verified_at: new Date().toISOString() } : { verified: false, verified_at: null };
  const providerResult = await supabaseAdmin.from("providers").update(providerUpdate).eq("id", id);
  if (providerResult.error) return NextResponse.json({ error: providerResult.error.message }, { status: 500 });
  return NextResponse.json({ verification: data, verified: complete });
}
