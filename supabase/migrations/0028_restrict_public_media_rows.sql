-- The media table may contain unpublished CMS assets. Expose only assets
-- that are linked to currently published public content through the DB.
DROP POLICY IF EXISTS "Allow public read on media" ON public.media;

CREATE POLICY "public media for published content"
  ON public.media
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.destination_media dm
      JOIN public.destinations d ON d.id = dm.destination_id
      WHERE dm.media_id = media.id
        AND d.status = 'published'
        AND d.deleted_at IS NULL
        AND (d.publish_at IS NULL OR d.publish_at <= now())
    )
    OR EXISTS (
      SELECT 1
      FROM public.experience_media em
      JOIN public.experiences e ON e.id = em.experience_id
      WHERE em.media_id = media.id
        AND e.status = 'published'
    )
    OR EXISTS (
      SELECT 1
      FROM public.property_media pm
      JOIN public.properties p ON p.id = pm.property_id
      WHERE pm.media_id = media.id
        AND p.status = 'published'
    )
  );
