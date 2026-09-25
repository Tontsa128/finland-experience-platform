-- CMS campaign banners.
-- Public visibility is additionally constrained by active date window.
DROP POLICY IF EXISTS "public active banners" ON public.site_banners;
CREATE POLICY "public active banners" ON public.site_banners
FOR SELECT USING (
  active = true
  AND (start_at IS NULL OR start_at <= now())
  AND (end_at IS NULL OR end_at >= now())
);
CREATE INDEX IF NOT EXISTS idx_site_banners_locale_sort ON public.site_banners(locale, sort_order);
