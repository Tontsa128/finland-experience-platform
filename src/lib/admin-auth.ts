import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "CONTENT_MANAGER" | "BOOKING_MANAGER" | "EDITOR";

export async function getAdminContext() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => undefined } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await getSupabaseAdmin().from("profiles").select("id,full_name,role").eq("id", user.id).single();
  if (!profile) return null;
  return { user, profile: profile as { id: string; full_name: string | null; role: AdminRole } };
}

export async function requireAdmin(roles?: AdminRole[]) {
  const context = await getAdminContext();
  if (!context) throw new Error("UNAUTHORIZED");
  if (roles && !roles.includes(context.profile.role)) throw new Error("FORBIDDEN");
  return context;
}
