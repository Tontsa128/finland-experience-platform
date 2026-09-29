-- Match direct public reads with the destination publish scheduler.
DROP POLICY IF EXISTS "Allow public read on published destinations" ON public.destinations;
CREATE POLICY "public published scheduled destinations"
  ON public.destinations
  FOR SELECT
  USING (
    status = 'published'
    AND deleted_at IS NULL
    AND (publish_at IS NULL OR publish_at <= now())
  );

-- Protect destination translations from exposing unpublished/scheduled content.
ALTER TABLE public.destination_translations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public published destination translations" ON public.destination_translations;
CREATE POLICY "public published destination translations"
  ON public.destination_translations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.destinations d
      WHERE d.id = destination_id
        AND d.status = 'published'
        AND d.deleted_at IS NULL
        AND (d.publish_at IS NULL OR d.publish_at <= now())
    )
  );
