-- Repair legacy Mathildedal link stored in homepage carousel content.
UPDATE public.site_settings
SET homepage_slides = (
  SELECT COALESCE(jsonb_agg(
    CASE
      WHEN value->>'id' = 'mathildedal'
        THEN jsonb_set(value, '{href}', '"/destinations/salo-mathildedal"'::jsonb, true)
      ELSE value
    END
    ORDER BY ordinality
  ), '[]'::jsonb)
  FROM jsonb_array_elements(COALESCE(homepage_slides, '[]'::jsonb)) WITH ORDINALITY AS items(value, ordinality)
)
WHERE homepage_slides @> '[{"id":"mathildedal"}]'::jsonb;
