import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/services/payment.service';
import { supabaseAdmin } from '@/lib/supabase';
import { PricingCalculator } from '@/domain/pricing';

export const runtime = 'nodejs';

interface CreatePaymentIntentRequest {
  bookingId: number;
  adultCount: number;
  childCount: number;
  adultPriceEur: number;
  childPriceEur: number;
  basePriceEur: number;
  privateGroup: boolean;
  privateGroupMultiplier: number;
  seasonalMultiplier: number;
  addons: Array<{ quantity: number; priceEur: number }>;
  couponDiscountEur: number;
  customerEmail: string;
  customerName: string;
  experienceTitle: string;
}

/**
 * POST /api/checkout/create-payment-intent
 * 
 * Safely calculates pricing on the backend and creates a Stripe Payment Intent
 * This ensures prices cannot be manipulated by the client
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CreatePaymentIntentRequest = await request.json();

    // Validate required fields
    if (!body.bookingId || !body.customerEmail || !body.customerName) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, customerEmail, customerName' },
        { status: 400 }
      );
    }

    // Verify booking exists
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('id', body.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Calculate pricing securely on backend
    const pricingBreakdown = PricingCalculator.calculateBreakdown({
      basePriceEur: body.basePriceEur,
      adultCount: body.adultCount,
      childCount: body.childCount,
      adultPriceEur: body.adultPriceEur,
      childPriceEur: body.childPriceEur,
      privateGroup: body.privateGroup,
      privateGroupMultiplier: body.privateGroupMultiplier,
      seasonalMultiplier: body.seasonalMultiplier,
      addons: body.addons,
      couponDiscountEur: body.couponDiscountEur,
    });

    // Convert to cents (Stripe expects integer amounts)
    const amountCents = Math.round(pricingBreakdown.totalEur * 100);

    // Create payment intent
    const paymentIntentResponse = await createPaymentIntent({
      bookingId: body.bookingId,
      amount: amountCents,
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      description: `${body.experienceTitle} - Booking #${booking.booking_number}`,
    });

    // Update booking with total price
    await supabaseAdmin
      .from('bookings')
      .update({
        total_price_eur: pricingBreakdown.totalEur,
        payment_status: 'unpaid',
        updated_at: new Date(),
      })
      .eq('id', body.bookingId);

    return NextResponse.json(
      {
        clientSecret: paymentIntentResponse.clientSecret,
        paymentIntentId: paymentIntentResponse.paymentIntentId,
        amount: amountCents,
        amountEur: pricingBreakdown.totalEur,
        breakdown: pricingBreakdown,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment intent creation error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create payment intent: ${errorMessage}` },
      { status: 500 }
    );
  }
}
