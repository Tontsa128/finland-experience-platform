-- Child content tables must inherit publication visibility from their parent records.
ALTER TABLE public.experience_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public published experience categories" ON public.experience_categories;
CREATE POLICY "public published experience categories"
  ON public.experience_categories
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.category_id = experience_categories.id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published experience translations" ON public.experience_translations;
CREATE POLICY "public published experience translations"
  ON public.experience_translations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published pricing rules" ON public.pricing_rules;
CREATE POLICY "public published pricing rules"
  ON public.pricing_rules
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published seasonal pricing" ON public.seasonal_pricing;
CREATE POLICY "public published seasonal pricing"
  ON public.seasonal_pricing
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published addons" ON public.addons;
CREATE POLICY "public published addons"
  ON public.addons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published inclusions" ON public.inclusions;
CREATE POLICY "public published inclusions"
  ON public.inclusions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published exclusions" ON public.exclusions;
CREATE POLICY "public published exclusions"
  ON public.exclusions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published faqs" ON public.faqs;
CREATE POLICY "public published faqs"
  ON public.faqs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published experience media" ON public.experience_media;
CREATE POLICY "public published experience media"
  ON public.experience_media
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public published experience tags" ON public.experience_tags;
CREATE POLICY "public published experience tags"
  ON public.experience_tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_id
        AND e.status = 'published'
    )
  );

DROP POLICY IF EXISTS "public tags used by published experiences" ON public.tags;
CREATE POLICY "public tags used by published experiences"
  ON public.tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.experience_tags et
      JOIN public.experiences e ON e.id = et.experience_id
      WHERE et.tag_id = tags.id
        AND e.status = 'published'
    )
  );

-- Customer, booking, review and coupon records are intentionally private.
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
