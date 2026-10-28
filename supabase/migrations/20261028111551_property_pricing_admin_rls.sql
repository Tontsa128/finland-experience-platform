-- Keep accommodation amenity and seasonal pricing data private to the site owner.
-- The server uses service_role for privileged operations; direct client access is
-- limited to authenticated users explicitly promoted to SUPER_ADMIN.
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_season_prices ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.property_amenities, public.property_season_prices FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.property_amenities, public.property_season_prices TO authenticated;
GRANT ALL ON TABLE public.property_amenities, public.property_season_prices TO service_role;

DROP POLICY IF EXISTS "super admins manage property amenities" ON public.property_amenities;
CREATE POLICY "super admins manage property amenities"
  ON public.property_amenities
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid())
        AND p.role = 'SUPER_ADMIN'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid())
        AND p.role = 'SUPER_ADMIN'
    )
  );

DROP POLICY IF EXISTS "super admins manage property season prices" ON public.property_season_prices;
CREATE POLICY "super admins manage property season prices"
  ON public.property_season_prices
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid())
        AND p.role = 'SUPER_ADMIN'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid())
        AND p.role = 'SUPER_ADMIN'
    )
  );

