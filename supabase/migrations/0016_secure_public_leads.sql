-- Public lead submissions are handled exclusively by the server-side API.
-- Anonymous/authenticated clients must not write inquiry records directly.
ALTER TABLE public.bookings_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings_inquiries FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public insert inquiries" ON public.bookings_inquiries;
DROP POLICY IF EXISTS "public read inquiries" ON public.bookings_inquiries;
DROP POLICY IF EXISTS "public update inquiries" ON public.bookings_inquiries;
DROP POLICY IF EXISTS "public delete inquiries" ON public.bookings_inquiries;

COMMENT ON TABLE public.bookings_inquiries IS 'Customer leads/inquiries. Direct client access is blocked by RLS; the server-side lead API writes through service role.';
