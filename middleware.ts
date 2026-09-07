import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/utils";

const handleI18n = createMiddleware({ locales, defaultLocale, localePrefix: "always" });
const SESSIONS: Record<string, string> = { "session-super": "SUPER_ADMIN", "session-admin": "ADMIN", "session-manager": "MANAGER", "session-editor": "CONTENT_EDITOR" };
const ADMIN_WRITE_METHODS = ["POST", "PUT", "DELETE", "PATCH"];
const ADMIN_WRITE_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
const ADMIN_READ_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "CONTENT_EDITOR"];

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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isAdminPath(pathname)) {
    if (pathname === "/admin/login" || /^\/(fi|es|en)\/admin\/login$/.test(pathname)) return handleI18n(req);
    if (!getRoleFromRequest(req)) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  if (pathname.startsWith("/api/admin")) {
    const role = getRoleFromRequest(req);
    if (!role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (ADMIN_WRITE_METHODS.includes(req.method) && !ADMIN_WRITE_ROLES.includes(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!ADMIN_READ_ROLES.includes(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.next();
  }
  return handleI18n(req);
}

export const config = { matcher: ["/", "/(fi|es|en)/:path*", "/admin/:path*", "/api/admin/:path*"] };
