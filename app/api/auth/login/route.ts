import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Expect { token: 'session-admin' }
    const token = body?.token
    if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })
    // For demo we accept certain tokens; cookie will be set HttpOnly
    const allowed = ['session-super','session-admin','session-manager','session-editor']
    if (!allowed.includes(token)) return NextResponse.json({ error: 'invalid token' }, { status: 400 })

    const res = NextResponse.json({ ok: true })
    // Set cookie (HttpOnly)
    res.headers.set('Set-Cookie', `demo_session=${token}; Path=/; HttpOnly; SameSite=Lax`)
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
