-- Partner portal lead lifecycle.
ALTER TABLE public.bookings_inquiries
  ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'new'
  CHECK (lead_status IN ('new','contacted','qualified','referred','booked','lost'));

CREATE INDEX IF NOT EXISTS bookings_inquiries_provider_lead_status_idx
  ON public.bookings_inquiries(provider_id, lead_status, created_at DESC);

COMMENT ON COLUMN public.bookings_inquiries.lead_status IS
  'Partner-facing lead lifecycle; inquiry_status remains the internal booking/inquiry workflow.';
