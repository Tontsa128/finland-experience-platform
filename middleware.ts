import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/utils";

const handleI18n = createMiddleware({ locales, defaultLocale, localePrefix: "always" });
const SESSIONS: Record<string, string> = {
  "session-super": "SUPER_ADMIN",
  "session-admin": "ADMIN",
  "session-manager": "MANAGER",
  "session-editor": "CONTENT_EDITOR",
};
const ADMIN_WRITE_METHODS = ["POST", "PUT", "DELETE", "PATCH"];
const ADMIN_WRITE_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
const ADMIN_READ_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "CONTENT_EDITOR"];

const SPANISH_COUNTRIES = new Set([
  "ES", "MX", "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ",
  "GT", "HN", "NI", "PA", "PY", "PE", "PR", "UY", "VE",
]);

function getRoleFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get("demo_session")?.value;
  if (cookie && SESSIONS[cookie]) return SESSIONS[cookie];
  const header = req.headers.get("x-demo-session");
  if (header && SESSIONS[header]) return SESSIONS[header];
  return null;
}

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
  if (localeMatch) return setLocaleCookie(response, localeMatch[1] ?? defaultLocale);
  return response;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAdminPath(pathname)) {
    if (pathname === "/admin/login" || /^\/(fi|es|en)\/admin\/login$/.test(pathname)) {
      return handleLocalizedRequest(req);
    }
    if (!getRoleFromRequest(req)) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/api/admin")) {
    const role = getRoleFromRequest(req);
    if (!role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (ADMIN_WRITE_METHODS.includes(req.method) && !ADMIN_WRITE_ROLES.includes(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (!ADMIN_READ_ROLES.includes(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
  }

  // The root URL is language-neutral. Choose an existing user preference first,
  // then Vercel's visitor country, then the browser language, with English as fallback.
  if (pathname === "/") {
    const savedLocale = req.cookies.get("NEXT_LOCALE")?.value;
    const locale = locales.includes(savedLocale as (typeof locales)[number])
      ? savedLocale
      : getLocaleFromCountry(req.headers.get("x-vercel-ip-country"))
        ?? getLocaleFromBrowser(req)
        ?? defaultLocale;

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/${locale}`;
    return setLocaleCookie(NextResponse.redirect(redirectUrl), locale);
  }

  return handleLocalizedRequest(req);
}

export const config = {
  matcher: ["/", "/(fi|es|en)/:path*", "/admin/:path*", "/api/admin/:path*"],
};
