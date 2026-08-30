import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // clear cookie
  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', `demo_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`)
  return res
}
