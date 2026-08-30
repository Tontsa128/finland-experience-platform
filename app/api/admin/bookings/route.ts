import { NextRequest, NextResponse } from 'next/server'
import FileBookingRepository from '../../../../src/repositories/FileBookingRepository'

const repo = new FileBookingRepository()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const exp = searchParams.get('experience_id')
  try {
    const list = await repo.list(exp || undefined)
    return NextResponse.json(list)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
