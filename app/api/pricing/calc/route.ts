import { NextRequest, NextResponse } from 'next/server'
import PricingService from '../../../../src/services/PricingService'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Basic validation
    if (!body.experience_id) return NextResponse.json({ error: 'experience_id required' }, { status: 400 })
    if (!body.date) return NextResponse.json({ error: 'date required' }, { status: 400 })
    const breakdown = await PricingService.calculate(body)
    return NextResponse.json(breakdown)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
