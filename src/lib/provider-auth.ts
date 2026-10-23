import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase-config";

export async function getProviderContext() {
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

  const { data: membership, error: membershipError } = await supabaseAdmin
    .from("provider_members")
    .select("id, provider_id, role, active")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (membershipError || !membership) {
    return null;
  }

  const { data: provider, error: providerError } = await supabaseAdmin
    .from("providers")
    .select(
      "id,name,slug,provider_type,description_fi,description_es,description_en,website_url,booking_url,email,phone,whatsapp,address,region,languages,categories,verified,verified_at,active"
    )
    .eq("id", membership.provider_id)
    .eq("active", true)
    .maybeSingle();

  if (providerError || !provider) {
    return null;
  }

  return { user, membership, provider };
}

export async function requireProvider() {
  const context = await getProviderContext();
  if (!context) throw new Error("UNAUTHORIZED");
  return context;
}
