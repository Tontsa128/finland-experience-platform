-- Normalize the legacy Mathildedal destination slug when the canonical slug is unused.
-- Keep the application resolver backwards-compatible with existing old links.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.destinations WHERE slug = 'mathildedal')
     AND NOT EXISTS (SELECT 1 FROM public.destinations WHERE slug = 'salo-mathildedal') THEN
    UPDATE public.destinations
    SET slug = 'salo-mathildedal', updated_at = now()
    WHERE slug = 'mathildedal';
  END IF;
END $$;
