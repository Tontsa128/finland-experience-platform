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
  if (error || !user) return null;
  return user;
}

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Kirjautuminen vaaditaan." }, { status: 401 });

  try {
    const admin = getSupabaseAdmin();
    const { data: customer, error } = await admin
      .from("customers")
      .select("id,first_name,last_name,email,phone,language_preference")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      user: { id: user.id, email: user.email },
      customer,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Palvelinvirhe." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Kirjautuminen vaaditaan." }, { status: 401 });

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
    const { data: customer, error } = await admin
      .from("customers")
      .upsert({
        auth_user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: user.email,
        phone: phone || null,
        language_preference: language,
        updated_at: new Date().toISOString(),
      }, { onConflict: "auth_user_id" })
      .select("id,first_name,last_name,email,phone,language_preference")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ customer });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Virheellinen pyyntö." }, { status: 400 });
  }
}
