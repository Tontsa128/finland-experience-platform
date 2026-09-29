-- Customer and inquiry records contain personal data and must not be directly
-- readable or writable from the public Supabase client.
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings_inquiries ENABLE ROW LEVEL SECURITY;

-- No public policies are created. Server-side service-role APIs are responsible
-- for authenticated account, CRM and partner access.
