-- CMS foundation: complete locale support, soft deletes and multilingual media metadata.
ALTER TYPE public.language_code ADD VALUE IF NOT EXISTS 'en';

ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

ALTER TABLE public.media
  ADD COLUMN IF NOT EXISTS alt_fi TEXT,
  ADD COLUMN IF NOT EXISTS alt_es TEXT,
  ADD COLUMN IF NOT EXISTS alt_en TEXT,
  ADD COLUMN IF NOT EXISTS storage_path TEXT,
  ADD COLUMN IF NOT EXISTS mime_type TEXT;

CREATE INDEX IF NOT EXISTS idx_destinations_deleted_at ON public.destinations(deleted_at);
CREATE INDEX IF NOT EXISTS idx_media_storage_path ON public.media(storage_path);

-- Public images are readable; uploads/deletes stay server-side through the protected admin API.
CREATE POLICY IF NOT EXISTS "Public read cms media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cms-media');

CREATE POLICY IF NOT EXISTS "Public read media metadata"
  ON public.media FOR SELECT
  USING (TRUE);
