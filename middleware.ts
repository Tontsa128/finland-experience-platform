import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/utils";
import { updateSupabaseSession } from "@/lib/supabase-middleware";

const handleI18n = createMiddleware({ locales, defaultLocale, localePrefix: "always" });

const ADMIN_WRITE_METHODS = ["POST", "PUT", "DELETE", "PATCH"];
const ADMIN_READ_ROLES = new Set(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "BOOKING_MANAGER", "EDITOR"]);
const ADMIN_WRITE_ROLES = new Set(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "BOOKING_MANAGER"]);

const SPANISH_COUNTRIES = new Set([
  "ES", "MX", "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ",
  "GT", "HN", "NI", "PA", "PY", "PE", "PR", "UY", "VE",
]);

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || /^\/(fi|es|en)\/admin(?:\/|$)/.test(pathname);
}

function getLocaleFromCountry(country: string | null) {
  if (!country) return null;
  const code = country.toUpperCase();
  if (code === "FI") return "fi" as const;
  if (SPANISH_COUNTRIES.has(code)) return "es" as const;
  return "en" as const;
}

function getLocaleFromBrowser(req: NextRequest) {
  const languageHeader = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const languages = languageHeader
    .split(",")
    .map((part) => part.trim().split(";", 1)[0])
    .map((part) => part.split("-", 1)[0]);

  for (const language of languages) {
    if (locales.includes(language as (typeof locales)[number])) {
      return language as (typeof locales)[number];
    }
  }
  return null;
}

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

function handleLocalizedRequest(req: NextRequest) {
  const response = handleI18n(req);
  const localeMatch = req.nextUrl.pathname.match(/^\/(fi|es|en)(?:\/|$)/);
  if (localeMatch) {
    const locale = (localeMatch[1] ?? defaultLocale) as (typeof locales)[number];
    return setLocaleCookie(response, locale);
  }
  return response;
}

async function getAdminRole(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { role: null, response: null as NextResponse | null, configured: false };
  }

  try {
    const { response, user, supabase } = await updateSupabaseSession(req);
    if (!user) return { role: null, response, configured: true };

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    return { role: profile?.role ?? null, response, configured: true };
  } catch {
    return { role: null, response: null as NextResponse | null, configured: true };
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAdminPath(pathname)) {
    if (pathname === "/admin/login" || /^\/(fi|es|en)\/admin\/login$/.test(pathname)) {
      return handleLocalizedRequest(req);
    }

    const auth = await getAdminRole(req);
    if (!auth.configured) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      loginUrl.searchParams.set("reason", "supabase-not-configured");
      return NextResponse.redirect(loginUrl);
    }
    if (!auth.role || !ADMIN_READ_ROLES.has(auth.role)) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const response = auth.response ?? NextResponse.next();
    return response;
  }

  if (pathname.startsWith("/api/admin")) {
    const auth = await getAdminRole(req);
    if (!auth.configured || !auth.role || !ADMIN_READ_ROLES.has(auth.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (ADMIN_WRITE_METHODS.includes(req.method) && !ADMIN_WRITE_ROLES.has(auth.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return auth.response ?? NextResponse.next();
  }

  if (pathname === "/") {
    const savedLocale = req.cookies.get("NEXT_LOCALE")?.value;
    const preferredLocale =
      savedLocale && locales.includes(savedLocale as (typeof locales)[number])
        ? (savedLocale as (typeof locales)[number])
        : null;

    const locale =
      preferredLocale ??
      getLocaleFromCountry(req.headers.get("x-vercel-ip-country")) ??
      getLocaleFromBrowser(req) ??
      defaultLocale;

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/${locale}`;
    return setLocaleCookie(NextResponse.redirect(redirectUrl), locale);
  }

  return handleLocalizedRequest(req);
}

export const config = {
  matcher: ["/", "/(fi|es|en)/:path*", "/admin/:path*", "/api/admin/:path*"],
};
