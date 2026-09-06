import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

const PAYMENT_STATUSES = ['paid', 'unpaid', 'failed', 'refunded'] as const;
type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

/**
 * GET /api/admin/payments?status=paid
 *
 * Server-side payment/booking read endpoint. The service-role Supabase client
 * must never be imported into a client component.
 */
export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get('status');

    if (status && status !== 'all' && !PAYMENT_STATUSES.includes(status as PaymentStatus)) {
      return NextResponse.json({ error: 'Invalid payment status' }, { status: 400 });
    }

    let query = supabaseAdmin
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('payment_status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Admin payment query failed:', error);
      return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
    }

    return NextResponse.json({ bookings: data ?? [] });
  } catch (error) {
    console.error('Admin payment endpoint failed:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
