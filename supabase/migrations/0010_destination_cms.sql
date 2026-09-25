-- Complete destination CMS: gallery, SEO and publish scheduling.
ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS seo_title_fi TEXT,
  ADD COLUMN IF NOT EXISTS seo_title_es TEXT,
  ADD COLUMN IF NOT EXISTS seo_title_en TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_fi TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_es TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_en TEXT,
  ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.destination_media (
  destination_id BIGINT NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES public.media(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (destination_id, media_id)
);
CREATE INDEX IF NOT EXISTS idx_destination_media_order ON public.destination_media(destination_id, sort_order);
ALTER TABLE public.destination_media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public destination media" ON public.destination_media;
CREATE POLICY "public destination media" ON public.destination_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND d.status = 'published' AND d.deleted_at IS NULL)
);
