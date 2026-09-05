import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { confirmPayment, handleFailedPayment } from '@/services/payment.service';

export const runtime = 'nodejs';

function getBookingId(event: Stripe.Event): number | null {
  const object = event.data.object as Stripe.PaymentIntent | Stripe.Charge;
  const raw = object.metadata?.booking_id;
  const bookingId = raw ? Number(raw) : NaN;
  return Number.isInteger(bookingId) && bookingId > 0 ? bookingId : null;
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 400 });
  }

  try {
    const payload = await request.text();
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const bookingId = getBookingId(event);
        if (bookingId) {
          await confirmPayment(paymentIntent.id, bookingId);
          await supabaseAdmin
            .from('bookings')
            .update({ payment_intent_id: paymentIntent.id })
            .eq('id', bookingId);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const bookingId = getBookingId(event);
        if (bookingId) {
          await handleFailedPayment(paymentIntent.id, bookingId);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : null;
        if (paymentIntentId) {
          const { data: booking } = await supabaseAdmin
            .from('bookings')
            .select('id')
            .eq('payment_intent_id', paymentIntentId)
            .maybeSingle();

          if (booking?.id) {
            await supabaseAdmin
              .from('bookings')
              .update({
                status: 'refunded',
                payment_status: 'refunded',
                refund_id: charge.refunds?.data?.[0]?.id || null,
                updated_at: new Date().toISOString(),
              })
              .eq('id', booking.id);
          }
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Invalid webhook request' }, { status: 400 });
  }
}
