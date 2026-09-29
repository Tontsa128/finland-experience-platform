import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function getProviderContext() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => undefined } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership } = await supabaseAdmin
    .from("provider_members").select("id,provider_id,role,active")
    .eq("user_id", user.id).eq("active", true).maybeSingle();
  if (!membership) return null;

  const { data: provider } = await supabaseAdmin
    .from("providers")
    .select("id,name,slug,provider_type,description_fi,description_es,description_en,website_url,booking_url,email,phone,whatsapp,address,region,languages,categories,verified,verified_at,active,featured")
    .eq("id", membership.provider_id).eq("active", true).single();
  if (!provider) return null;
  return { user, membership, provider };
}

export async function requireProvider() {
  const context = await getProviderContext();
  if (!context) throw new Error("UNAUTHORIZED");
  return context;
}
