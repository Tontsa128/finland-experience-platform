import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

export function getSupabaseUrl(): string {
  const value = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) {
    throw new Error("Supabase URL is missing. Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL.");
  }
  return value;
}

export function getSupabaseAnonKey(): string {
  const value =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!value) {
    throw new Error(
      "Supabase anonymous key is missing. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return value;
}

export function getSupabaseServiceRoleKey(): string {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) {
    throw new Error("Supabase service role key is missing. Set SUPABASE_SERVICE_ROLE_KEY.");
  }
  return value;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  adminClient = createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
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
