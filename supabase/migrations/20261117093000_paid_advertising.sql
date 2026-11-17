-- Paid advertising is stored separately from editorial homepage slides and site banners.
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name TEXT NOT NULL,
  advertiser_name TEXT NOT NULL,
  provider_url TEXT NOT NULL,
  billing_model TEXT NOT NULL CHECK (billing_model IN ('monthly', 'campaign')),
  price_eur NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (price_eur >= 0),
  placement TEXT NOT NULL DEFAULT 'homepage' CHECK (placement IN ('homepage', 'map', 'directory', 'category')),
  region TEXT NOT NULL DEFAULT 'southwest_finland',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'paused', 'archived')),
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  slide_interval_ms INTEGER NOT NULL DEFAULT 6000 CHECK (slide_interval_ms BETWEEN 5000 AND 7000),
  slides JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (
    jsonb_typeof(slides) = 'array'
    AND (jsonb_array_length(slides) = 0 OR jsonb_array_length(slides) BETWEEN 3 AND 5)
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at > starts_at)
);

CREATE INDEX IF NOT EXISTS idx_ad_campaigns_public_schedule
  ON public.ad_campaigns (placement, region, starts_at, ends_at)
  WHERE status = 'approved';

ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public can read approved active ad campaigns" ON public.ad_campaigns;
CREATE POLICY "public can read approved active ad campaigns"
  ON public.ad_campaigns FOR SELECT TO anon, authenticated
  USING (
    status = 'approved'
    AND (starts_at IS NULL OR starts_at <= now())
    AND (ends_at IS NULL OR ends_at >= now())
  );

CREATE TABLE IF NOT EXISTS public.ad_campaign_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click')),
  locale TEXT NOT NULL CHECK (locale IN ('fi', 'es', 'en')),
  placement TEXT NOT NULL CHECK (placement IN ('homepage', 'map', 'directory', 'category')),
  slide_index INTEGER NOT NULL DEFAULT 0 CHECK (slide_index BETWEEN 0 AND 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ad_campaign_events_campaign_date
  ON public.ad_campaign_events (campaign_id, created_at DESC);

ALTER TABLE public.ad_campaign_events ENABLE ROW LEVEL SECURITY;

-- Public visitors may only read campaigns that pass the RLS schedule policy.
-- All writes and event reporting are server-side through the service role.
REVOKE ALL ON TABLE public.ad_campaigns, public.ad_campaign_events FROM anon, authenticated;
GRANT SELECT ON TABLE public.ad_campaigns TO anon, authenticated;
GRANT ALL ON TABLE public.ad_campaigns, public.ad_campaign_events TO service_role;

-- Event rows are private: no public or authenticated policies or grants.
