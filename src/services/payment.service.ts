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

export async function createPaymentIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResponse> {
  if (!Number.isInteger(input.bookingId) || input.bookingId <= 0) throw new Error('Invalid booking ID');
  if (!Number.isInteger(input.amount) || input.amount < 50) throw new Error('Invalid payment amount');
  if (!/^\S+@\S+\.\S+$/.test(input.customerEmail)) throw new Error('Invalid customer email');
  if (!input.customerName.trim()) throw new Error('Customer name is required');

  const { data: booking, error: bookingError } = await supabaseAdmin
    .from('bookings')
    .select('id,booking_number,total_price_eur,payment_status,status,payment_intent_id')
    .eq('id', input.bookingId)
    .maybeSingle();

  if (bookingError) throw new Error(`Failed to validate booking: ${bookingError.message}`);
  if (!booking) throw new Error('Booking not found');
  if (booking.status === 'cancelled' || booking.status === 'refunded') throw new Error('Booking is not payable');
  if (booking.payment_status === 'paid') throw new Error('Booking is already paid');
  if (booking.payment_intent_id) throw new Error('Payment intent already exists for this booking');

  const expectedAmount = Math.round(Number(booking.total_price_eur) * 100);
  if (!Number.isFinite(expectedAmount) || expectedAmount < 50) throw new Error('Booking has an invalid total amount');
  if (expectedAmount !== input.amount) throw new Error('Payment amount does not match booking total');

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: expectedAmount,
    currency: 'eur',
    receipt_email: input.customerEmail,
    description: input.description || `Finland Experience booking #${booking.booking_number || booking.id}`,
    metadata: {
      booking_id: String(input.bookingId),
      booking_number: String(booking.booking_number || ''),
      customer_name: input.customerName.trim().slice(0, 200),
    },
    automatic_payment_methods: { enabled: true },
  });

  const { error: updateError } = await supabaseAdmin
    .from('bookings')
    .update({
      payment_intent_id: paymentIntent.id,
      payment_status: 'unpaid',
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.bookingId);

  if (updateError) {
    try { await stripe.paymentIntents.cancel(paymentIntent.id); }
    catch (cancelError) { console.error('Failed to cancel orphaned payment intent:', cancelError); }
    throw new Error(`Failed to store payment intent: ${updateError.message}`);
  }

  return { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret };
}

export async function confirmPayment(paymentIntentId: string, bookingId: number): Promise<void> {
  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== 'succeeded') throw new Error(`Payment is not successful: ${paymentIntent.status}`);

  const { error } = await supabaseAdmin.from('bookings').update({
    status: 'confirmed',
    payment_status: 'paid',
    confirmed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq('id', bookingId);

  if (error) throw new Error(`Failed to confirm booking: ${error.message}`);
}

export async function handleFailedPayment(paymentIntentId: string, bookingId: number): Promise<void> {
  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const { error } = await supabaseAdmin.from('bookings').update({
    payment_status: 'failed',
    updated_at: new Date().toISOString(),
  }).eq('id', bookingId);
  if (error) throw new Error(`Failed to update booking: ${error.message}`);
  console.warn('Payment failed', { paymentIntentId: paymentIntent.id, bookingId, lastPaymentError: paymentIntent.last_payment_error?.message });
}

export async function refundPayment(paymentIntentId: string, bookingId: number, reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'): Promise<string> {
  const stripe = getStripe();
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    reason,
    metadata: { booking_id: String(bookingId) },
  });

  const { error } = await supabaseAdmin.from('bookings').update({
    payment_status: 'refunded',
    status: 'refunded',
    refund_id: refund.id,
    updated_at: new Date().toISOString(),
  }).eq('id', bookingId);

  if (error) throw new Error(`Refund created but booking update failed: ${error.message}`);
  return refund.id;
}