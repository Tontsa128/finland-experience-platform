import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

const roles = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"];

export async function GET() {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseAdmin.from("site_navigation").select("*").order("location").order("locale").order("sort_order");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data || [] });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !roles.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const item = { location: body.location || "header", locale: body.locale, label: body.label, href: body.href, sort_order: Number(body.sort_order ?? 0), active: body.active !== false };
  if (!["fi","es","en"].includes(item.locale) || !item.label || !item.href) return NextResponse.json({ error: "locale, label ja href ovat pakollisia" }, { status: 400 });
  const { data, error } = await supabaseAdmin.from("site_navigation").insert(item).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ item });
}

export async function PATCH(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !roles.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id puuttuu" }, { status: 400 });
  const patch = { label: body.label, href: body.href, sort_order: Number(body.sort_order ?? 0), active: body.active !== false, locale: body.locale, location: body.location || "header" };
  const { data, error } = await supabaseAdmin.from("site_navigation").update(patch).eq("id", body.id).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ item: data });
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !roles.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id puuttuu" }, { status: 400 });
  const { error } = await supabaseAdmin.from("site_navigation").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
