import { NextRequest, NextResponse } from 'next/server'

// Demo sessions mapping (NOTE: For production, replace with secure session store / JWT validation)
const SESSIONS: Record<string, string> = {
  'session-super': 'SUPER_ADMIN',
  'session-admin': 'ADMIN',
  'session-manager': 'MANAGER',
  'session-editor': 'CONTENT_EDITOR'
}

const ADMIN_WRITE_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH']

function getRoleFromRequest(req: NextRequest): string | null {
  // Priority: cookie 'demo_session' then header 'x-demo-session'
  try {
    const cookie = req.cookies.get('demo_session')?.value
    if (cookie && SESSIONS[cookie]) return SESSIONS[cookie]
  } catch (e) {
    // ignore
  }
  const header = req.headers.get('x-demo-session')
  if (header && SESSIONS[header]) return SESSIONS[header]
  return null
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect admin pages (require any authenticated role)
  if (pathname.startsWith('/admin')) {
    const role = getRoleFromRequest(req)
    if (!role) {
      // redirect to login
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    // allow access to admin login itself
  }

  // Protect admin API write endpoints
  if (pathname.startsWith('/api/admin')) {
    const method = req.method || 'GET'
    if (ADMIN_WRITE_METHODS.includes(method)) {
      const role = getRoleFromRequest(req)
      if (!role) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
      }
      // Only SUPER_ADMIN, ADMIN, MANAGER allowed to write
      if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(role)) {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
