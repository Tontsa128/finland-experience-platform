import { NextRequest, NextResponse } from 'next/server'

// Demo sessions mapping. Replace with a real session/JWT provider before production.
const SESSIONS: Record<string, string> = {
  'session-super': 'SUPER_ADMIN',
  'session-admin': 'ADMIN',
  'session-manager': 'MANAGER',
  'session-editor': 'CONTENT_EDITOR'
}

const ADMIN_WRITE_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH']

function getRoleFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get('demo_session')?.value
  if (cookie && SESSIONS[cookie]) return SESSIONS[cookie]

  const header = req.headers.get('x-demo-session')
  if (header && SESSIONS[header]) return SESSIONS[header]

  return null
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Login must remain public so unauthenticated users can enter the demo CMS.
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const role = getRoleFromRequest(req)
    if (!role) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname.startsWith('/api/admin')) {
    const method = req.method || 'GET'
    if (ADMIN_WRITE_METHODS.includes(method)) {
      const role = getRoleFromRequest(req)
      if (!role) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(role)) {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
