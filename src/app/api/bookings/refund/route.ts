import { NextRequest, NextResponse } from 'next/server';
import { refundPayment } from '@/services/payment.service';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

type RefundReason = 'duplicate' | 'fraudulent' | 'requested_by_customer';
const REFUND_REASONS: RefundReason[] = ['duplicate', 'fraudulent', 'requested_by_customer'];

interface RefundRequest {
  bookingId: number;
  reason?: RefundReason;
}

/**
 * POST /api/bookings/refund
 * Processes a Stripe refund and marks the booking as refunded.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RefundRequest;

    if (!Number.isInteger(body.bookingId) || body.bookingId <= 0) {
      return NextResponse.json({ error: 'Invalid booking ID' }, { status: 400 });
    }

    const reason = body.reason ?? 'requested_by_customer';
    if (!REFUND_REASONS.includes(reason)) {
      return NextResponse.json({ error: 'Invalid refund reason' }, { status: 400 });
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('id, payment_status, payment_intent_id, booking_number')
      .eq('id', body.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Only paid bookings can be refunded' }, { status: 409 });
    }

    if (!booking.payment_intent_id) {
      return NextResponse.json({ error: 'Booking has no Stripe payment intent' }, { status: 409 });
    }

    const refundId = await refundPayment(booking.payment_intent_id, booking.id, reason);

    return NextResponse.json({
      success: true,
      refundId,
      bookingId: booking.id,
      bookingNumber: booking.booking_number,
    });
  } catch (error) {
    console.error('Refund API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process refund';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
