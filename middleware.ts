import { NextRequest, NextResponse } from 'next/server'

// Demo sessions mapping. Replace with a real session/JWT provider before production.
const SESSIONS: Record<string, string> = {
  'session-super': 'SUPER_ADMIN',
  'session-admin': 'ADMIN',
  'session-manager': 'MANAGER',
  'session-editor': 'CONTENT_EDITOR'
}

const ADMIN_WRITE_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH']
const ADMIN_WRITE_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
const ADMIN_READ_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'CONTENT_EDITOR']

function getRoleFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get('demo_session')?.value
  if (cookie && SESSIONS[cookie]) return SESSIONS[cookie]

  const header = req.headers.get('x-demo-session')
  if (header && SESSIONS[header]) return SESSIONS[header]

  return null
}

function jsonError(message: string, status: number) {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  if (pathname.startsWith('/admin')) {
    if (!getRoleFromRequest(req)) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname.startsWith('/api/admin')) {
    const role = getRoleFromRequest(req)
    if (!role) return jsonError('Unauthorized', 401)
    if (ADMIN_WRITE_METHODS.includes(req.method || '') && !ADMIN_WRITE_ROLES.includes(role)) {
      return jsonError('Forbidden', 403)
    }
    if (!ADMIN_READ_ROLES.includes(role)) return jsonError('Forbidden', 403)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
