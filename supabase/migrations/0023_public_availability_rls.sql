-- Restrict public availability reads to experiences that are actually published.
-- Availability records may contain capacity/booked information and must not expose
-- draft or archived experience inventory.
DROP POLICY IF EXISTS "Allow public read on availability" ON public.availability;

CREATE POLICY "public availability for published experiences"
  ON public.availability
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = availability.experience_id
        AND e.status = 'published'
    )
  );
