import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/services/payment.service';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingId = Number(body.bookingId);
    const customerEmail = String(body.customerEmail || '').trim();
    const customerName = String(body.customerName || '').trim();

    if (!Number.isInteger(bookingId) || bookingId <= 0) return NextResponse.json({ error: 'Valid bookingId is required' }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) return NextResponse.json({ error: 'Valid customer email is required' }, { status: 400 });
    if (!customerName) return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });

    const { data: booking, error } = await supabaseAdmin.from('bookings')
      .select('id,total_price_eur,booking_number').eq('id', bookingId).maybeSingle();

    if (error) return NextResponse.json({ error: 'Unable to validate booking' }, { status: 500 });
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    const amount = Math.round(Number(booking.total_price_eur) * 100);
    if (!Number.isFinite(amount) || amount < 50) return NextResponse.json({ error: 'Booking has an invalid total amount' }, { status: 409 });

    const payment = await createPaymentIntent({
      bookingId,
      amount,
      customerEmail,
      customerName,
      description: `Finland Experience booking #${booking.booking_number || booking.id}`,
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create payment intent' }, { status: 500 });
  }
}