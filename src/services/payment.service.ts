import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export interface CreatePaymentIntentInput {
  bookingId: number;
  amount: number;
  customerEmail: string;
  customerName: string;
  description?: string;
}

export interface PaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string | null;
}

export async function createPaymentIntent(
  input: CreatePaymentIntentInput
): Promise<PaymentIntentResponse> {
  if (!Number.isInteger(input.bookingId) || input.bookingId <= 0) {
    throw new Error('Invalid booking ID');
  }
  if (!Number.isInteger(input.amount) || input.amount < 50) {
    throw new Error('Invalid payment amount');
  }
  if (!/^\S+@\S+\.\S+$/.test(input.customerEmail)) {
    throw new Error('Invalid customer email');
  }

  const stripe = getStripe();
  const { data: booking, error: bookingError } = await supabaseAdmin.from('bookings').select('id,total_amount,currency,status,payment_status').eq('id', input.bookingId).maybeSingle();
  if (bookingError) throw new Error(`Failed to validate booking: ${bookingError.message}`);
  if (!booking) throw new Error('Booking not found');
  if (booking.status === 'cancelled' || booking.status === 'refunded') throw new Error('Booking is not payable');
  const expectedAmount = Math.round(Number(booking.total_amount) * 100);
  if (!Number.isFinite(expectedAmount) || expectedAmount !== input.amount) throw new Error('Payment amount does not match booking total');

  const paymentIntent = await stripe.paymentIntents.create({
    amount: input.amount,
    currency: (booking.currency || 'EUR').toLowerCase(),
    receipt_email: input.customerEmail,
    description: input.description || `Finland Experience booking #${input.bookingId}`,
    metadata: {
      booking_id: String(input.bookingId),
      customer_name: input.customerName.slice(0, 200),
    },
    automatic_payment_methods: { enabled: true },
  });

  return {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };
}

export async function confirmPayment(
  paymentIntentId: string,
  bookingId: number
): Promise<void> {
  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== 'succeeded') {
    throw new Error(`Payment is not successful: ${paymentIntent.status}`);
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      confirmed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) throw new Error(`Failed to confirm booking: ${error.message}`);
}

export async function handleFailedPayment(
  paymentIntentId: string,
  bookingId: number
): Promise<void> {
  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      payment_status: 'failed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) throw new Error(`Failed to update booking: ${error.message}`);

  console.warn('Payment failed', {
    paymentIntentId: paymentIntent.id,
    bookingId,
    lastPaymentError: paymentIntent.last_payment_error?.message,
  });
}

export async function refundPayment(
  paymentIntentId: string,
  bookingId: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
): Promise<string> {
  const stripe = getStripe();
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    reason,
    metadata: { booking_id: String(bookingId) },
  });

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      payment_status: 'refunded',
      status: 'refunded',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) throw new Error(`Refund created but booking update failed: ${error.message}`);

  return refund.id;
}
