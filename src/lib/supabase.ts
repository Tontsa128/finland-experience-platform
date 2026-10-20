import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "@/lib/supabase-config";

let adminClient: SupabaseClient | null = null;

export function getSupabaseServiceRoleKey(): string {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) {
    throw new Error("Supabase service role key is missing. Set SUPABASE_SERVICE_ROLE_KEY.");
  }
  return value;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const url = process.env.SUPABASE_URL || getSupabaseUrl();
  adminClient = createClient(url, getSupabaseServiceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return adminClient;
}

/**
 * Server-only Supabase client.
 * The client is initialized lazily so builds do not require production secrets.
 */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const client = getSupabaseAdmin() as any;
    const value = client[property];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
