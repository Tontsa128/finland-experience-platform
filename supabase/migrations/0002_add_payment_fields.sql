-- Stripe payment metadata used by the server-side payment flow.
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS payment_intent_id TEXT,
  ADD COLUMN IF NOT EXISTS refund_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

CREATE INDEX IF NOT EXISTS idx_bookings_payment_intent
  ON public.bookings(payment_intent_id);

CREATE INDEX IF NOT EXISTS idx_bookings_refund_id
  ON public.bookings(refund_id);

CREATE INDEX IF NOT EXISTS idx_bookings_stripe_customer
  ON public.bookings(stripe_customer_id);
