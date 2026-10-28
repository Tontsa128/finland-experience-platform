-- Extend the existing CMS media library and add reviewed event ingestion.
ALTER TABLE public.site_pages ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;
DROP POLICY IF EXISTS "public published site pages" ON public.site_pages;
CREATE POLICY "public published site pages" ON public.site_pages FOR SELECT
  USING (published = true AND (publish_at IS NULL OR publish_at <= now()));

UPDATE storage.buckets
SET file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
WHERE id = 'cms-media';

ALTER TABLE public.media
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS license TEXT,
  ADD COLUMN IF NOT EXISTS location_tag TEXT,
  ADD COLUMN IF NOT EXISTS category_tag TEXT,
  ADD COLUMN IF NOT EXISTS rights_status TEXT NOT NULL DEFAULT 'unknown'
    CHECK (rights_status IN ('unknown', 'licensed', 'permission_granted', 'public_domain')),
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.event_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  feed_url TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'rss' CHECK (source_type IN ('rss', 'atom')),
  source_site_url TEXT,
  terms_url TEXT,
  region TEXT NOT NULL DEFAULT 'Salo',
  enabled BOOLEAN NOT NULL DEFAULT false,
  auto_publish BOOLEAN NOT NULL DEFAULT false,
  fetch_interval_minutes INTEGER NOT NULL DEFAULT 360 CHECK (fetch_interval_minutes BETWEEN 60 AND 10080),
  image_policy TEXT NOT NULL DEFAULT 'omit' CHECK (image_policy IN ('omit', 'review', 'licensed')),
  image_license TEXT,
  last_checked_at TIMESTAMPTZ,
  next_check_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (feed_url)
);

CREATE TABLE IF NOT EXISTS public.event_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  village TEXT,
  venue TEXT NOT NULL DEFAULT '',
  address TEXT,
  latitude DOUBLE PRECISION CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
  longitude DOUBLE PRECISION CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (city, venue)
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.event_sources(id) ON DELETE SET NULL,
  source_item_id TEXT,
  title_fi TEXT NOT NULL,
  description_fi TEXT,
  title_en TEXT,
  description_en TEXT,
  title_es TEXT,
  description_es TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  all_day BOOLEAN NOT NULL DEFAULT false,
  location_id UUID REFERENCES public.event_locations(id) ON DELETE SET NULL,
  category TEXT,
  external_url TEXT NOT NULL,
  image_url TEXT,
  image_source_url TEXT,
  image_license TEXT,
  image_rights_verified BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'draft', 'published', 'cancelled', 'archived')),
  auto_managed BOOLEAN NOT NULL DEFAULT true,
  source_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_hash TEXT,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_item_id)
);

CREATE INDEX IF NOT EXISTS events_public_schedule_idx ON public.events(status, starts_at, ends_at);
CREATE INDEX IF NOT EXISTS events_location_schedule_idx ON public.events(location_id, starts_at);
CREATE INDEX IF NOT EXISTS event_sources_due_idx ON public.event_sources(enabled, next_check_at);

CREATE TABLE IF NOT EXISTS public.event_sync_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.event_sources(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'success', 'failed')),
  found_count INTEGER NOT NULL DEFAULT 0,
  created_count INTEGER NOT NULL DEFAULT 0,
  updated_count INTEGER NOT NULL DEFAULT 0,
  skipped_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS public.event_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  source_id UUID REFERENCES public.event_sources(id) ON DELETE SET NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('discovered', 'source_update', 'review', 'cancelled', 'published', 'manual_edit')),
  before_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  after_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.event_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_sync_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_changes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public upcoming published events" ON public.events;
CREATE POLICY "public upcoming published events" ON public.events
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND COALESCE(ends_at, starts_at) >= now());

DROP POLICY IF EXISTS "public locations for upcoming events" ON public.event_locations;
CREATE POLICY "public locations for upcoming events" ON public.event_locations
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.events e
    WHERE e.location_id = event_locations.id
      AND e.status = 'published'
      AND COALESCE(e.ends_at, e.starts_at) >= now()
  ));

-- The application uses a server-only service-role client for CMS writes. These
-- policies intentionally do not grant clients direct access to source settings,
-- drafts, sync logs, or editorial history.
REVOKE ALL ON public.event_sources, public.event_sync_runs, public.event_changes FROM anon, authenticated;
GRANT SELECT ON public.events, public.event_locations TO anon, authenticated;
GRANT ALL ON public.event_sources, public.event_sync_runs, public.event_changes TO service_role;
GRANT ALL ON public.events, public.event_locations TO service_role;
