import { NextRequest, NextResponse } from 'next/server'
import BookingService from '../../../src/services/BookingService'

export async function POST(req: NextRequest){
  try{
    const body = await req.json()
    // expect: experience_id, availability_id, adults, children?, infants?, addons?, coupon_code?
    const res = await BookingService.createBooking(body)
    return NextResponse.json(res)
  }catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest){
  try{
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if(!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const res = await BookingService.cancelBooking(id)
    return NextResponse.json(res)
  }catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
