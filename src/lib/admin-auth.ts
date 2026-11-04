import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase-config";

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "CONTENT_MANAGER" | "BOOKING_MANAGER" | "EDITOR";

export const ADMIN_ROLES = new Set<AdminRole>([
  "SUPER_ADMIN",
  "ADMIN",
  "CONTENT_MANAGER",
  "BOOKING_MANAGER",
  "EDITOR",
]);

export async function getAdminContext() {
  const cookieStore = await cookies();

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: () => undefined,
    },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile, error } = await getSupabaseAdmin()
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Admin profile lookup failed", error);
    return null;
  }

  if (!profile || !ADMIN_ROLES.has(profile.role as AdminRole)) {
    return null;
  }

  return {
    user,
    profile: {
      id: profile.id,
      full_name: profile.full_name ?? null,
      role: profile.role as AdminRole,
    },
  };
}

export async function requireAdmin(roles?: AdminRole[]) {
  const context = await getAdminContext();
  if (!context) throw new Error("UNAUTHORIZED");

  if (roles && !roles.includes(context.profile.role)) {
    throw new Error("FORBIDDEN");
  }

  return context;
}
