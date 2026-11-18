import "server-only";

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getCloudflareContext } from "@opennextjs/cloudflare";

let adminClient: SupabaseClient | null = null;

/**
 * Request-time Supabase admin client for OpenNext on Cloudflare.
 * Cloudflare's async context mode is required when bindings are read from
 * Next.js request handlers / server components.
 */
export async function getSupabaseAdminAsync(): Promise<SupabaseClient> {
  if (adminClient) return adminClient;

  let url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    try {
      const context = await getCloudflareContext({ async: true });
      const bindings = context.env as unknown as {
        SUPABASE_URL?: string;
        NEXT_PUBLIC_SUPABASE_URL?: string;
        SUPABASE_SERVICE_ROLE_KEY?: string;
      };
      url = url || bindings.SUPABASE_URL || bindings.NEXT_PUBLIC_SUPABASE_URL;
      serviceRoleKey = serviceRoleKey || bindings.SUPABASE_SERVICE_ROLE_KEY;
    } catch (error) {
      console.warn("[supabase-admin] Async Cloudflare runtime bindings unavailable", {
        message: error instanceof Error ? error.message : "Unknown context error",
      });
    }
  }

  if (!url || !serviceRoleKey) {
    console.error("[supabase-admin] Required Supabase configuration is unavailable", {
      hasUrl: Boolean(url),
      hasServiceRoleKey: Boolean(serviceRoleKey),
    });
    throw new Error("Supabase server configuration is missing.");
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return adminClient;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  let url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // In OpenNext Workers, runtime secrets and vars are available on the request
  // context. Do not assume every binding is mirrored to process.env.
  if (!url || !serviceRoleKey) {
    try {
      const bindings = getCloudflareContext().env as unknown as {
        SUPABASE_URL?: string;
        NEXT_PUBLIC_SUPABASE_URL?: string;
        SUPABASE_SERVICE_ROLE_KEY?: string;
      };
      url = url || bindings.SUPABASE_URL || bindings.NEXT_PUBLIC_SUPABASE_URL;
      serviceRoleKey = serviceRoleKey || bindings.SUPABASE_SERVICE_ROLE_KEY;
    } catch (error) {
      // Vercel and plain Node.js do not have a Cloudflare request context.
      console.warn("[supabase-admin] Cloudflare runtime bindings unavailable", {
        message: error instanceof Error ? error.message : "Unknown context error",
      });
    }
  }

  if (!url || !serviceRoleKey) {
    console.error("[supabase-admin] Required Supabase configuration is unavailable", {
      hasUrl: Boolean(url),
      hasServiceRoleKey: Boolean(serviceRoleKey),
    });
    throw new Error('Supabase server configuration is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  adminClient = createClient(url, serviceRoleKey, {
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
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
