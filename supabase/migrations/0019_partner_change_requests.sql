-- Partner-managed profile changes.
-- Verification, featured status and commercial fields remain admin-controlled.
ALTER TABLE public.providers
  ADD COLUMN IF NOT EXISTS partner_change_requested_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.provider_change_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  requested_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  changes JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS provider_change_requests_provider_idx
  ON public.provider_change_requests(provider_id, status, created_at DESC);

ALTER TABLE public.provider_change_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "provider members can read own change requests"
  ON public.provider_change_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.provider_members m
      WHERE m.provider_id = public.provider_change_requests.provider_id
        AND m.user_id = auth.uid()
        AND m.active = true
    )
  );

COMMENT ON TABLE public.provider_change_requests IS
  'Partner-submitted profile changes awaiting editorial/admin review.';
