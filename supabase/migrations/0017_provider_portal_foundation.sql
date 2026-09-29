-- Partner portal foundation: provider memberships and verification checklist.
CREATE TABLE IF NOT EXISTS public.provider_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('OWNER','MANAGER','MEMBER')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(provider_id,user_id)
);

CREATE INDEX IF NOT EXISTS idx_provider_members_user ON public.provider_members(user_id);
CREATE INDEX IF NOT EXISTS idx_provider_members_provider ON public.provider_members(provider_id);

CREATE TABLE IF NOT EXISTS public.provider_verification_checks (
  provider_id UUID PRIMARY KEY REFERENCES public.providers(id) ON DELETE CASCADE,
  company_checked BOOLEAN NOT NULL DEFAULT FALSE,
  contact_checked BOOLEAN NOT NULL DEFAULT FALSE,
  pricing_checked BOOLEAN NOT NULL DEFAULT FALSE,
  booking_flow_checked BOOLEAN NOT NULL DEFAULT FALSE,
  spanish_content_checked BOOLEAN NOT NULL DEFAULT FALSE,
  photos_checked BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  checked_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  checked_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_provider_verification_checked ON public.provider_verification_checks(checked_at);

DROP TRIGGER IF EXISTS provider_members_updated_at ON public.provider_members;
CREATE TRIGGER provider_members_updated_at BEFORE UPDATE ON public.provider_members
FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

DROP TRIGGER IF EXISTS provider_verification_checks_updated_at ON public.provider_verification_checks;
CREATE TRIGGER provider_verification_checks_updated_at BEFORE UPDATE ON public.provider_verification_checks
FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

ALTER TABLE public.provider_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_verification_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "provider members own membership" ON public.provider_members;
CREATE POLICY "provider members own membership" ON public.provider_members
FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "provider verification admin only" ON public.provider_verification_checks;
CREATE POLICY "provider verification admin only" ON public.provider_verification_checks
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('SUPER_ADMIN','ADMIN','CONTENT_MANAGER')
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('SUPER_ADMIN','ADMIN','CONTENT_MANAGER')
  )
);

COMMENT ON TABLE public.provider_members IS 'Links Supabase Auth users to partner providers.';
COMMENT ON TABLE public.provider_verification_checks IS 'Internal editorial/business verification checklist; not a government certification.';
