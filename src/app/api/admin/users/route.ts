import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

const ROLES = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "BOOKING_MANAGER", "EDITOR", "CUSTOMER"] as const;
type ManagedRole = (typeof ROLES)[number];

function isRole(value: unknown): value is ManagedRole {
  return typeof value === "string" && ROLES.includes(value as ManagedRole);
}

export async function GET() {
  try {
    const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const ids = data.users.map((u) => u.id);
    const { data: profiles, error: profileError } = ids.length
      ? await supabase.from("profiles").select("id,full_name,role,created_at,updated_at").in("id", ids)
      : { data: [], error: null };
    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

    const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
    return NextResponse.json({
      currentUserId: admin.user.id,
      users: data.users.map((user) => {
        const profile = profileMap.get(user.id);
        return {
          id: user.id,
          email: user.email,
          fullName: profile?.full_name ?? user.user_metadata?.full_name ?? null,
          role: profile?.role ?? "CUSTOMER",
          emailConfirmedAt: user.email_confirmed_at ?? null,
          invitedAt: user.invited_at ?? null,
          lastSignInAt: user.last_sign_in_at ?? null,
          createdAt: user.created_at,
          bannedUntil: user.banned_until ?? null,
        };
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 401 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const fullName = typeof body.fullName === "string" ? body.fullName.trim().slice(0, 120) : "";
    const role = isRole(body.role) ? body.role : "EDITOR";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Anna kelvollinen sähköpostiosoite." }, { status: 400 });
    }
    if (role === "SUPER_ADMIN" && admin.profile.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Vain pääkäyttäjä voi antaa SUPER_ADMIN-roolin." }, { status: 403 });
    }

    const supabase = getSupabaseAdmin();
    const origin = new URL(request.url).origin;
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName || email },
      redirectTo: `${origin}/admin/login`,
    });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message ?? "Kutsua ei voitu lähettää." }, { status: 400 });
    }

    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName || email,
      role,
      updated_at: new Date().toISOString(),
    });

    await supabase.from("admin_user_role_audit").insert({
      user_id: data.user.id,
      changed_by: admin.user.id,
      old_role: null,
      new_role: role,
    });

    return NextResponse.json({ ok: true, userId: data.user.id, email, role });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
    const body = await request.json().catch(() => ({}));
    const userId = typeof body.userId === "string" ? body.userId : "";
    const role = isRole(body.role) ? body.role : null;
    if (!userId || !role) return NextResponse.json({ error: "Käyttäjä ja rooli ovat pakollisia." }, { status: 400 });

    if (role === "SUPER_ADMIN" && admin.profile.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Vain pääkäyttäjä voi antaa SUPER_ADMIN-roolin." }, { status: 403 });
    }
    if (userId === admin.user.id && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Et voi poistaa oman pääkäyttäjätilisi oikeuksia tässä näkymässä." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: existing, error: existingError } = await supabase
      .from("profiles").select("role").eq("id", userId).maybeSingle();
    if (existingError) return NextResponse.json({ error: existingError.message }, { status: 500 });
    if (!existing) return NextResponse.json({ error: "Käyttäjäprofiilia ei löytynyt." }, { status: 404 });

    if (existing.role === "SUPER_ADMIN" && admin.profile.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Vain pääkäyttäjä voi muuttaa pääkäyttäjän roolia." }, { status: 403 });
    }

    const { error } = await supabase.from("profiles").update({
      role,
      updated_at: new Date().toISOString(),
    }).eq("id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await supabase.from("admin_user_role_audit").insert({
      user_id: userId,
      changed_by: admin.user.id,
      old_role: existing.role,
      new_role: role,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 401 });
  }
}
