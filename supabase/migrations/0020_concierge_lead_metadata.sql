-- Concierge lead metadata for structured trip-planning requests.
ALTER TABLE public.bookings_inquiries
  ADD COLUMN IF NOT EXISTS trip_days INTEGER,
  ADD COLUMN IF NOT EXISTS trip_budget_eur NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS trip_interests TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS trip_question TEXT,
  ADD COLUMN IF NOT EXISTS recommended_items JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_bookings_inquiries_lead_type_created
  ON public.bookings_inquiries(lead_type, created_at DESC);

COMMENT ON COLUMN public.bookings_inquiries.recommended_items IS 'Verified catalogue recommendations captured when the lead was submitted.';
