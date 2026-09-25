-- Booking security hardening.
-- The application writes booking/payment state through server-side service-role code.
-- No client-facing INSERT/UPDATE/DELETE policies are created for bookings, so
-- authenticated and anonymous Supabase clients cannot mutate booking totals,
-- payment state, customer ownership, or Stripe identifiers directly.

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings FORCE ROW LEVEL SECURITY;

ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items FORCE ROW LEVEL SECURITY;

ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_addons FORCE ROW LEVEL SECURITY;

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers FORCE ROW LEVEL SECURITY;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews FORCE ROW LEVEL SECURITY;

-- Intentionally no public/authenticated policies are added to these tables.
-- Server-side service-role operations continue to work because the service
-- role bypasses RLS. Customer-facing access should be exposed only through
-- authenticated server APIs that validate ownership and allowed fields.
