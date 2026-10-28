import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function safeAdminRedirect(value: string | null) {
  if (!value || value.startsWith("//") || !(value === "/admin" || value.startsWith("/admin/"))) return "/admin";
  return value;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const allowedEmail = process.env.CMS_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const next = safeAdminRedirect(url.searchParams.get("next"));
  const response = NextResponse.redirect(new URL("/admin/login?reason=oauth-failed", url.origin));

  if (!code || !allowedEmail) {
    response.headers.set(
      "Location",
      new URL(`/admin/login?reason=${allowedEmail ? "oauth-failed" : "oauth-admin-setup"}`, url.origin).toString(),
    );
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    response.headers.set("Location", new URL("/admin/login?reason=supabase-not-configured", url.origin).toString());
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies) {
        for (const { name, value, options } of cookies) response.cookies.set(name, value, options);
      },
    },
  });

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) return response;

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const provider = user?.app_metadata?.provider;
  if (
    userError ||
    !user ||
    !user.email_confirmed_at ||
    user.email?.trim().toLowerCase() !== allowedEmail ||
    typeof provider !== "string" ||
    !["google", "github"].includes(provider)
  ) {
    await supabase.auth.signOut();
    response.headers.set("Location", new URL("/admin/login?reason=oauth-not-authorized", url.origin).toString());
    return response;
  }

  try {
    const admin = getSupabaseAdmin();
    const { error: profileError } = await admin
      .from("profiles")
      .upsert({ id: user.id, role: "SUPER_ADMIN" }, { onConflict: "id" });
    if (profileError) throw profileError;
  } catch {
    await supabase.auth.signOut();
    response.headers.set("Location", new URL("/admin/login?reason=oauth-admin-setup", url.origin).toString());
    return response;
  }

  response.headers.set("Location", new URL(next, url.origin).toString());
  return response;
}

