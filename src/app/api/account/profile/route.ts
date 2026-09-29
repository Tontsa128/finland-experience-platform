import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => undefined } }
  );
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email) return null;
  return user;
}

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Kirjautuminen vaaditaan." }, { status: 401 });

  try {
    const { data: customer, error } = await getSupabaseAdmin()
      .from("customers")
      .select("id,first_name,last_name,email,phone,language_preference")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ user: { id: user.id, email: user.email }, customer });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Palvelinvirhe." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const user = await getUser();
  if (!user?.email) return NextResponse.json({ error: "Kirjautuminen vaaditaan." }, { status: 401 });

  try {
    const body = await request.json();
    const firstName = String(body.first_name || "").trim().slice(0, 100);
    const lastName = String(body.last_name || "").trim().slice(0, 100);
    const phone = String(body.phone || "").trim().slice(0, 50);
    const language = ["fi", "es", "en"].includes(body.language_preference) ? body.language_preference : "fi";

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "Etunimi ja sukunimi ovat pakollisia." }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const existing = await admin.from("customers").select("id").eq("auth_user_id", user.id).maybeSingle();
    if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 500 });

    let result;
    if (existing.data) {
      result = await admin.from("customers").update({
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        language_preference: language,
        updated_at: new Date().toISOString(),
      }).eq("id", existing.data.id)
        .select("id,first_name,last_name,email,phone,language_preference").single();
    } else {
      const byEmail = await admin.from("customers").select("id").eq("email", user.email).maybeSingle();
      if (byEmail.error) return NextResponse.json({ error: byEmail.error.message }, { status: 500 });

      if (byEmail.data) {
        const existingByEmail = await admin.from("customers").select("id,auth_user_id").eq("id", byEmail.data.id).single();
        if (existingByEmail.error) return NextResponse.json({ error: existingByEmail.error.message }, { status: 500 });
        if (existingByEmail.data.auth_user_id && existingByEmail.data.auth_user_id !== user.id) {
          return NextResponse.json({ error: "Sähköpostiosoite on jo liitetty toiseen asiakastiliin." }, { status: 409 });
        }
        result = await admin.from("customers").update({
          auth_user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
          language_preference: language,
          updated_at: new Date().toISOString(),
        }).eq("id", byEmail.data.id)
          .select("id,first_name,last_name,email,phone,language_preference").single();
      } else {
        result = await admin.from("customers").insert({
          auth_user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          email: user.email,
          phone: phone || null,
          language_preference: language,
        }).select("id,first_name,last_name,email,phone,language_preference").single();
      }
    }

    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
    return NextResponse.json({ customer: result.data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Virheellinen pyyntö." }, { status: 400 });
  }
}
