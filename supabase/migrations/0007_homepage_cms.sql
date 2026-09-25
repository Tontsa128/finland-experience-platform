-- Homepage CMS content and publishing controls.
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
  ADD COLUMN IF NOT EXISTS hero_eyebrow_fi TEXT,
  ADD COLUMN IF NOT EXISTS hero_eyebrow_es TEXT,
  ADD COLUMN IF NOT EXISTS hero_eyebrow_en TEXT,
  ADD COLUMN IF NOT EXISTS hero_title_fi TEXT,
  ADD COLUMN IF NOT EXISTS hero_title_es TEXT,
  ADD COLUMN IF NOT EXISTS hero_title_en TEXT,
  ADD COLUMN IF NOT EXISTS hero_description_fi TEXT,
  ADD COLUMN IF NOT EXISTS hero_description_es TEXT,
  ADD COLUMN IF NOT EXISTS hero_description_en TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_label_fi TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_label_es TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_label_en TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_url TEXT,
  ADD COLUMN IF NOT EXISTS hero_secondary_label_fi TEXT,
  ADD COLUMN IF NOT EXISTS hero_secondary_label_es TEXT,
  ADD COLUMN IF NOT EXISTS hero_secondary_label_en TEXT,
  ADD COLUMN IF NOT EXISTS hero_secondary_url TEXT,
  ADD COLUMN IF NOT EXISTS homepage_intro_fi TEXT,
  ADD COLUMN IF NOT EXISTS homepage_intro_es TEXT,
  ADD COLUMN IF NOT EXISTS homepage_intro_en TEXT;

-- Public pages need the singleton settings for the homepage.
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public site settings" ON public.site_settings;
CREATE POLICY "public site settings" ON public.site_settings FOR SELECT USING (singleton = true);
