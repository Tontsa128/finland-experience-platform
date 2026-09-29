-- Provider network and lead attribution foundation.
-- This does not create package travel sales or payment obligations.

CREATE TABLE IF NOT EXISTS public.providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  legal_name TEXT,
  slug TEXT NOT NULL UNIQUE,
  provider_type TEXT NOT NULL DEFAULT 'experience',
  description_fi TEXT,
  description_es TEXT,
  description_en TEXT,
  website_url TEXT,
  booking_url TEXT,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  address TEXT,
  region TEXT,
  languages TEXT[] NOT NULL DEFAULT '{}',
  categories TEXT[] NOT NULL DEFAULT '{}',
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_notes TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  commission_model TEXT,
  commission_value NUMERIC(8,2),
  lead_fee_eur NUMERIC(8,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_providers_active ON public.providers(active);
CREATE INDEX IF NOT EXISTS idx_providers_verified ON public.providers(verified);
CREATE INDEX IF NOT EXISTS idx_providers_region ON public.providers(region);

CREATE TABLE IF NOT EXISTS public.provider_property_links (
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  PRIMARY KEY(provider_id, property_id)
);

CREATE TABLE IF NOT EXISTS public.provider_experience_links (
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  PRIMARY KEY(provider_id, experience_id)
);

ALTER TABLE public.bookings_inquiries
  ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS source TEXT,
  ADD COLUMN IF NOT EXISTS source_path TEXT,
  ADD COLUMN IF NOT EXISTS lead_type TEXT NOT NULL DEFAULT 'inquiry';

CREATE INDEX IF NOT EXISTS idx_bookings_inquiries_provider ON public.bookings_inquiries(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_inquiries_source ON public.bookings_inquiries(source);

DROP TRIGGER IF EXISTS providers_updated_at ON public.providers;
CREATE TRIGGER providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_property_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_experience_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public active providers" ON public.providers;
CREATE POLICY "public active providers"
  ON public.providers FOR SELECT
  USING (active = true);

DROP POLICY IF EXISTS "public provider property links" ON public.provider_property_links;
CREATE POLICY "public provider property links"
  ON public.provider_property_links FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.providers p WHERE p.id = provider_id AND p.active = true));

DROP POLICY IF EXISTS "public provider experience links" ON public.provider_experience_links;
CREATE POLICY "public provider experience links"
  ON public.provider_experience_links FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.providers p WHERE p.id = provider_id AND p.active = true));

COMMENT ON TABLE public.providers IS 'Verified local travel service providers. Provider contracts and customer service remain with the provider unless separately agreed.';
COMMENT ON COLUMN public.providers.verified IS 'Editorial/business verification status, not a government certification.';
COMMENT ON COLUMN public.providers.commission_model IS 'Internal commercial model such as percentage, fixed lead fee, or none.';
