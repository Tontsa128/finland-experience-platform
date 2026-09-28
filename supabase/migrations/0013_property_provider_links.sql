-- External provider links for accommodation listings.
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS provider_name TEXT,
  ADD COLUMN IF NOT EXISTS provider_url TEXT;

CREATE INDEX IF NOT EXISTS idx_properties_provider_url ON public.properties(provider_url);
