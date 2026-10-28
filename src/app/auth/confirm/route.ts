import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const requestedNext = url.searchParams.get("next") || "/admin/recovery";
  const next = requestedNext === "/admin/recovery" || requestedNext === "/admin/login" ? requestedNext : "/admin/recovery";
  const redirectUrl = new URL(next, url.origin);
  const response = NextResponse.redirect(redirectUrl);
  if (!tokenHash || !["recovery", "invite", "signup", "email"].includes(type || "")) {
    return NextResponse.redirect(new URL("/admin/login?recovery=invalid", url.origin));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return NextResponse.redirect(new URL("/admin/login?reason=supabase-not-configured", url.origin));

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies) { for (const { name, value, options } of cookies) response.cookies.set(name, value, options); },
    },
  });
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type as "recovery" | "invite" | "signup" | "email" });
  if (error) return NextResponse.redirect(new URL("/admin/login?recovery=invalid", url.origin));
  return response;
}
