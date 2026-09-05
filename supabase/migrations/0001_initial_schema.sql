-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE experience_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE booking_status AS ENUM ('inquiry', 'pending', 'payment_pending', 'confirmed', 'completed', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded', 'failed');
CREATE TYPE review_status AS ENUM ('pending', 'published', 'rejected');
CREATE TYPE language_code AS ENUM ('es', 'fi');

-- Destinations table
CREATE TABLE public.destinations (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  region TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  hero_image_url TEXT,
  status experience_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_destinations_slug ON public.destinations(slug);
CREATE INDEX idx_destinations_status ON public.destinations(status);

-- Destination translations
CREATE TABLE public.destination_translations (
  id BIGSERIAL PRIMARY KEY,
  destination_id BIGINT NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  language_code language_code NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  highlights TEXT,
  travel_information TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(destination_id, language_code)
);

CREATE INDEX idx_destination_translations_destination ON public.destination_translations(destination_id);

-- Experience categories
CREATE TABLE public.experience_categories (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_es TEXT NOT NULL,
  name_fi TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_experience_categories_slug ON public.experience_categories(slug);

-- Experiences table
CREATE TABLE public.experiences (
  id BIGSERIAL PRIMARY KEY,
  destination_id BIGINT NOT NULL REFERENCES public.destinations(id),
  category_id BIGINT NOT NULL REFERENCES public.experience_categories(id),
  slug TEXT UNIQUE NOT NULL,
  duration_minutes INTEGER,
  min_group_size INTEGER DEFAULT 1,
  max_group_size INTEGER DEFAULT 100,
  difficulty_level TEXT,
  status experience_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_experiences_slug ON public.experiences(slug);
CREATE INDEX idx_experiences_destination ON public.experiences(destination_id);
CREATE INDEX idx_experiences_category ON public.experiences(category_id);
CREATE INDEX idx_experiences_status ON public.experiences(status);

-- Experience translations
CREATE TABLE public.experience_translations (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  language_code language_code NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  what_to_bring TEXT,
  safety_information TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(experience_id, language_code)
);

CREATE INDEX idx_experience_translations_experience ON public.experience_translations(experience_id);

-- Pricing rules
CREATE TABLE public.pricing_rules (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  base_price_eur DECIMAL(10, 2) NOT NULL,
  adult_price_eur DECIMAL(10, 2),
  child_price_eur DECIMAL(10, 2),
  child_age_min INTEGER DEFAULT 4,
  child_age_max INTEGER DEFAULT 12,
  private_group_multiplier DECIMAL(4, 2) DEFAULT 1.5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(experience_id)
);

CREATE INDEX idx_pricing_rules_experience ON public.pricing_rules(experience_id);

-- Seasonal pricing
CREATE TABLE public.seasonal_pricing (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  season_name_es TEXT NOT NULL,
  season_name_fi TEXT NOT NULL,
  price_multiplier DECIMAL(4, 2) NOT NULL DEFAULT 1.0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_seasonal_pricing_experience ON public.seasonal_pricing(experience_id);
CREATE INDEX idx_seasonal_pricing_dates ON public.seasonal_pricing(start_date, end_date);

-- Availability
CREATE TABLE public.availability (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 10,
  booked INTEGER NOT NULL DEFAULT 0,
  time_slot TEXT,
  is_instant_booking BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(experience_id, available_date, time_slot)
);

CREATE INDEX idx_availability_experience ON public.availability(experience_id);
CREATE INDEX idx_availability_date ON public.availability(available_date);
CREATE INDEX idx_availability_experience_date ON public.availability(experience_id, available_date);

-- Addons
CREATE TABLE public.addons (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  name_es TEXT NOT NULL,
  name_fi TEXT NOT NULL,
  description_es TEXT,
  description_fi TEXT,
  price_eur DECIMAL(10, 2) NOT NULL,
  max_quantity INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_addons_experience ON public.addons(experience_id);

-- Inclusions
CREATE TABLE public.inclusions (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  title_es TEXT NOT NULL,
  title_fi TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inclusions_experience ON public.inclusions(experience_id);

-- Exclusions
CREATE TABLE public.exclusions (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  title_es TEXT NOT NULL,
  title_fi TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exclusions_experience ON public.exclusions(experience_id);

-- FAQs
CREATE TABLE public.faqs (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  question_es TEXT NOT NULL,
  question_fi TEXT NOT NULL,
  answer_es TEXT NOT NULL,
  answer_fi TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_faqs_experience ON public.faqs(experience_id);

-- Media
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  title TEXT,
  type TEXT NOT NULL DEFAULT 'image',
  size_bytes BIGINT,
  width INTEGER,
  height INTEGER,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_hero BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_media_created ON public.media(created_at);
CREATE INDEX idx_media_tags ON public.media USING GIN(tags);

-- Experience media (many-to-many)
CREATE TABLE public.experience_media (
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES public.media(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(experience_id, media_id)
);

-- Customers
CREATE TABLE public.customers (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  language_preference language_code DEFAULT 'es',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON public.customers(email);

-- Bookings
CREATE TABLE public.bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_number TEXT UNIQUE NOT NULL,
  customer_id BIGINT NOT NULL REFERENCES public.customers(id),
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id),
  availability_id BIGINT NOT NULL REFERENCES public.availability(id),
  status booking_status NOT NULL DEFAULT 'inquiry',
  total_price_eur DECIMAL(10, 2) NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'unpaid',
  notes TEXT,
  confirmed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX idx_bookings_experience ON public.bookings(experience_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_booking_number ON public.bookings(booking_number);

-- Booking items
CREATE TABLE public.booking_items (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  adult_count INTEGER NOT NULL DEFAULT 0,
  child_count INTEGER NOT NULL DEFAULT 0,
  infant_count INTEGER NOT NULL DEFAULT 0,
  price_per_adult_eur DECIMAL(10, 2) NOT NULL,
  price_per_child_eur DECIMAL(10, 2) NOT NULL,
  total_item_price_eur DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_booking_items_booking ON public.booking_items(booking_id);

-- Booking addons
CREATE TABLE public.booking_addons (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  addon_id BIGINT NOT NULL REFERENCES public.addons(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_per_unit_eur DECIMAL(10, 2) NOT NULL,
  total_addon_price_eur DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_booking_addons_booking ON public.booking_addons(booking_id);

-- Reviews
CREATE TABLE public.reviews (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES public.bookings(id),
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id),
  customer_id BIGINT NOT NULL REFERENCES public.customers(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  status review_status NOT NULL DEFAULT 'pending',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_experience ON public.reviews(experience_id);
CREATE INDEX idx_reviews_customer ON public.reviews(customer_id);
CREATE INDEX idx_reviews_status ON public.reviews(status);

-- Coupons
CREATE TABLE public.coupons (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2) NOT NULL,
  expiry_date TIMESTAMPTZ,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_coupons_code ON public.coupons(code);
CREATE INDEX idx_coupons_active ON public.coupons(active);

-- Tags
CREATE TABLE public.tags (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Experience tags (many-to-many)
CREATE TABLE public.experience_tags (
  experience_id BIGINT NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY(experience_id, tag_id)
);

-- Row Level Security (RLS)
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read on published destinations"
  ON public.destinations FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow public read on published experiences"
  ON public.experiences FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow public read on availability"
  ON public.availability FOR SELECT
  USING (TRUE);

CREATE POLICY "Allow public read on media"
  ON public.media FOR SELECT
  USING (TRUE);
