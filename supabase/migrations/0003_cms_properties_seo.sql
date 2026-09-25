-- Finland Experience CMS expansion.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
  CREATE TYPE public.property_status AS ENUM ('draft','published','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.inquiry_status AS ENUM ('new','contacted','quoted','confirmed','cancelled','completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  status public.property_status NOT NULL DEFAULT 'draft',
  property_type TEXT NOT NULL DEFAULT 'cabin',
  region TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  max_guests INTEGER NOT NULL DEFAULT 2,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  base_price_eur NUMERIC(10,2),
  check_in_time TIME,
  check_out_time TIME,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(featured);

CREATE TABLE IF NOT EXISTS public.property_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('fi','es','en')),
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  location_name TEXT,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  amenities_text TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] NOT NULL DEFAULT '{}',
  og_title TEXT,
  og_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(property_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_property_translations_locale ON public.property_translations(locale);

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS alt_fi TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS alt_es TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS alt_en TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS caption_fi TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS caption_es TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS caption_en TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS storage_path TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS mime_type TEXT;

CREATE TABLE IF NOT EXISTS public.property_media (
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES public.media(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(property_id, media_id)
);

CREATE TABLE IF NOT EXISTS public.property_amenities (
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL,
  name_fi TEXT NOT NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  PRIMARY KEY(property_id, amenity_id)
);

CREATE TABLE IF NOT EXISTS public.property_season_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  season_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_per_night_eur NUMERIC(10,2) NOT NULL,
  minimum_nights INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_property_season_dates ON public.property_season_prices(property_id,start_date,end_date);

CREATE TABLE IF NOT EXISTS public.property_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  price_override_eur NUMERIC(10,2),
  minimum_nights INTEGER,
  UNIQUE(property_id,date)
);

CREATE TABLE IF NOT EXISTS public.bookings_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  experience_id BIGINT REFERENCES public.experiences(id) ON DELETE SET NULL,
  locale TEXT NOT NULL CHECK (locale IN ('fi','es','en')),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp BOOLEAN NOT NULL DEFAULT FALSE,
  arrival_date DATE,
  departure_date DATE,
  guests INTEGER,
  message TEXT,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_inquiries_status ON public.bookings_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_bookings_inquiries_created ON public.bookings_inquiries(created_at DESC);

CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton BOOLEAN NOT NULL DEFAULT TRUE UNIQUE,
  site_name TEXT NOT NULL DEFAULT 'Finland Experience',
  primary_color TEXT NOT NULL DEFAULT '#123C36',
  secondary_color TEXT NOT NULL DEFAULT '#D8B477',
  accent_color TEXT NOT NULL DEFAULT '#4C9AA8',
  heading_font TEXT NOT NULL DEFAULT 'Inter',
  body_font TEXT NOT NULL DEFAULT 'Inter',
  whatsapp_number TEXT,
  contact_email TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  default_og_image TEXT,
  google_analytics_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('fi','es','en')),
  title TEXT NOT NULL,
  content TEXT,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(slug,locale)
);

CREATE TABLE IF NOT EXISTS public.customer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_country TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_fi TEXT,
  review_es TEXT,
  review_en TEXT,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description_fi TEXT,
  description_es TEXT,
  description_en TEXT,
  logo_url TEXT,
  url TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'EDITOR'
    CHECK (role IN ('SUPER_ADMIN','ADMIN','CONTENT_MANAGER','BOOKING_MANAGER','EDITOR')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION public.set_cms_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $func$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$func$;

DROP TRIGGER IF EXISTS properties_updated_at ON public.properties;
CREATE TRIGGER properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

DROP TRIGGER IF EXISTS property_translations_updated_at ON public.property_translations;
CREATE TRIGGER property_translations_updated_at BEFORE UPDATE ON public.property_translations FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

DROP TRIGGER IF EXISTS bookings_inquiries_updated_at ON public.bookings_inquiries;
CREATE TRIGGER bookings_inquiries_updated_at BEFORE UPDATE ON public.bookings_inquiries FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_cms_updated_at();

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public published properties" ON public.properties;
CREATE POLICY "public published properties" ON public.properties FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "public property translations" ON public.property_translations;
CREATE POLICY "public property translations" ON public.property_translations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.status = 'published')
);

DROP POLICY IF EXISTS "public property availability" ON public.property_availability;
CREATE POLICY "public property availability" ON public.property_availability FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.status = 'published')
);

DROP POLICY IF EXISTS "public property media" ON public.property_media;
CREATE POLICY "public property media" ON public.property_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.status = 'published')
);

DROP POLICY IF EXISTS "public site pages" ON public.site_pages;
CREATE POLICY "public site pages" ON public.site_pages FOR SELECT USING (noindex = false);

DROP POLICY IF EXISTS "public reviews" ON public.customer_reviews;
CREATE POLICY "public reviews" ON public.customer_reviews FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "public certifications" ON public.certifications;
CREATE POLICY "public certifications" ON public.certifications FOR SELECT USING (active = true);

INSERT INTO public.site_settings(singleton,site_name)
VALUES (true,'Finland Experience')
ON CONFLICT (singleton) DO NOTHING;
