import { NextRequest, NextResponse } from 'next/server';
import { refundPayment } from '@/services/payment.service';
import { getAdminContext } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

type RefundReason = 'duplicate' | 'fraudulent' | 'requested_by_customer';
const REFUND_REASONS: RefundReason[] = ['duplicate', 'fraudulent', 'requested_by_customer'];

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminContext();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['SUPER_ADMIN', 'ADMIN', 'BOOKING_MANAGER'].includes(admin.profile.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const bookingId = Number(body.bookingId);
    if (!Number.isInteger(bookingId) || bookingId <= 0) return NextResponse.json({ error: 'Invalid booking ID' }, { status: 400 });

    const reason = body.reason ?? 'requested_by_customer';
    if (!REFUND_REASONS.includes(reason)) return NextResponse.json({ error: 'Invalid refund reason' }, { status: 400 });

    const { data: booking, error: bookingError } = await supabaseAdmin.from('bookings')
      .select('id,payment_status,payment_intent_id,booking_number').eq('id', bookingId).maybeSingle();

    if (bookingError) return NextResponse.json({ error: 'Unable to validate booking' }, { status: 500 });
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    if (booking.payment_status !== 'paid') return NextResponse.json({ error: 'Only paid bookings can be refunded' }, { status: 409 });
    if (!booking.payment_intent_id) return NextResponse.json({ error: 'Booking has no Stripe payment intent' }, { status: 409 });

    const refundId = await refundPayment(booking.payment_intent_id, booking.id, reason);
    return NextResponse.json({ success: true, refundId, bookingId: booking.id, bookingNumber: booking.booking_number });
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to process refund' }, { status: 500 });
  }
}