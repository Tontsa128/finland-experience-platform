CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  country VARCHAR(2),
  role VARCHAR(50) DEFAULT 'customer',
  status VARCHAR(20) DEFAULT 'active',
  is_email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
  id BIGSERIAL PRIMARY KEY,
  role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role_id, permission_id)
);

-- Destinations and Content
CREATE TABLE IF NOT EXISTS destinations (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  region VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  hero_image_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS destination_translations (
  id BIGSERIAL PRIMARY KEY,
  destination_id BIGINT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  language_code VARCHAR(2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  highlights TEXT,
  travel_information TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(destination_id, language_code)
);

-- Experiences
CREATE TABLE IF NOT EXISTS experience_categories (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_es VARCHAR(100) NOT NULL,
  name_fi VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  destination_id BIGINT NOT NULL REFERENCES destinations(id) ON DELETE RESTRICT,
  category_id BIGINT NOT NULL REFERENCES experience_categories(id) ON DELETE RESTRICT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  duration_minutes INT,
  meeting_point_es TEXT,
  meeting_point_fi TEXT,
  min_group_size INT DEFAULT 1,
  max_group_size INT DEFAULT 8,
  difficulty_level VARCHAR(20),
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experience_translations (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  language_code VARCHAR(2) NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  what_to_bring TEXT,
  safety_information TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(experience_id, language_code)
);

CREATE TABLE IF NOT EXISTS tags (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_es VARCHAR(100) NOT NULL,
  name_fi VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experience_tags (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(experience_id, tag_id)
);

-- Itinerary
CREATE TABLE IF NOT EXISTS itineraries (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS itinerary_days (
  id BIGSERIAL PRIMARY KEY,
  itinerary_id BIGINT NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  title_es VARCHAR(255),
  title_fi VARCHAR(255),
  description_es TEXT,
  description_fi TEXT,
  start_time TIME,
  end_time TIME,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inclusions and Exclusions
CREATE TABLE IF NOT EXISTS inclusions (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  title_es VARCHAR(255) NOT NULL,
  title_fi VARCHAR(255) NOT NULL,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exclusions (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  title_es VARCHAR(255) NOT NULL,
  title_fi VARCHAR(255) NOT NULL,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE,
  destination_id BIGINT REFERENCES destinations(id) ON DELETE CASCADE,
  question_es TEXT NOT NULL,
  question_fi TEXT NOT NULL,
  answer_es TEXT NOT NULL,
  answer_fi TEXT NOT NULL,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing and Availability
CREATE TABLE IF NOT EXISTS pricing_rules (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  base_price_eur DECIMAL(10, 2) NOT NULL,
  adult_price_eur DECIMAL(10, 2),
  child_price_eur DECIMAL(10, 2),
  child_age_min INT,
  child_age_max INT,
  private_group_multiplier DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seasonal_pricing (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  season_name_es VARCHAR(100),
  season_name_fi VARCHAR(100),
  price_multiplier DECIMAL(3, 2) NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS availability (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  capacity INT NOT NULL DEFAULT 8,
  booked INT DEFAULT 0,
  available INT GENERATED ALWAYS AS (capacity - booked) STORED,
  time_slot TIME,
  is_instant_booking BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(experience_id, available_date, time_slot)
);

CREATE TABLE IF NOT EXISTS blackout_dates (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason_es TEXT,
  reason_fi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add-ons
CREATE TABLE IF NOT EXISTS addons (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  name_es VARCHAR(255) NOT NULL,
  name_fi VARCHAR(255) NOT NULL,
  description_es TEXT,
  description_fi TEXT,
  price_eur DECIMAL(10, 2) NOT NULL,
  max_quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media
CREATE TABLE IF NOT EXISTS media (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE,
  destination_id BIGINT REFERENCES destinations(id) ON DELETE CASCADE,
  media_type VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  alt_text_es VARCHAR(255),
  alt_text_fi VARCHAR(255),
  caption_es TEXT,
  caption_fi TEXT,
  copyright TEXT,
  sort_order INT,
  is_hero BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  country VARCHAR(2),
  total_spent_eur DECIMAL(12, 2) DEFAULT 0,
  interests TEXT,
  lead_source VARCHAR(100),
  marketing_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_notes (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  booking_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(30) DEFAULT 'inquiry',
  total_price_eur DECIMAL(12, 2),
  paid_price_eur DECIMAL(12, 2) DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'unpaid',
  cancellation_reason TEXT,
  internal_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP,
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_items (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE RESTRICT,
  experience_date DATE NOT NULL,
  experience_time TIME,
  adult_count INT DEFAULT 0,
  child_count INT DEFAULT 0,
  private_group BOOLEAN DEFAULT FALSE,
  base_price_eur DECIMAL(10, 2),
  seasonal_multiplier DECIMAL(3, 2) DEFAULT 1.0,
  total_price_eur DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_addons (
  id BIGSERIAL PRIMARY KEY,
  booking_item_id BIGINT NOT NULL REFERENCES booking_items(id) ON DELETE CASCADE,
  addon_id BIGINT NOT NULL REFERENCES addons(id) ON DELETE RESTRICT,
  quantity INT DEFAULT 1,
  unit_price_eur DECIMAL(10, 2),
  total_price_eur DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  travel_dates_start DATE,
  travel_dates_end DATE,
  traveler_count INT,
  budget_eur DECIMAL(10, 2),
  destinations TEXT,
  interests TEXT,
  travel_style VARCHAR(100),
  accommodation_preference VARCHAR(100),
  message TEXT,
  status VARCHAR(30) DEFAULT 'new',
  assigned_to BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  partner_type VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  country VARCHAR(2),
  website TEXT,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partner_services (
  id BIGSERIAL PRIMARY KEY,
  partner_id BIGINT NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE,
  service_description TEXT,
  supplier_cost_eur DECIMAL(10, 2),
  commission_percentage DECIMAL(5, 2),
  other_costs_eur DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments and Refunds
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  amount_eur DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  payment_method VARCHAR(50),
  payment_gateway VARCHAR(50),
  transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refunds (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  amount_eur DECIMAL(12, 2) NOT NULL,
  reason_es TEXT,
  reason_fi TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  processed_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);

-- Vouchers
CREATE TABLE IF NOT EXISTS vouchers (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  voucher_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP
);

-- Promotions and Coupons
CREATE TABLE IF NOT EXISTS promotions (
  id BIGSERIAL PRIMARY KEY,
  title_es VARCHAR(255),
  title_fi VARCHAR(255),
  description_es TEXT,
  description_fi TEXT,
  image_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(20) NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  expiry_date DATE,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  minimum_booking_value_eur DECIMAL(10, 2),
  experience_id BIGINT REFERENCES experiences(id) ON DELETE SET NULL,
  destination_id BIGINT REFERENCES destinations(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id BIGSERIAL PRIMARY KEY,
  coupon_id BIGINT NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  discount_amount_eur DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title_es VARCHAR(255),
  title_fi VARCHAR(255),
  comment_es TEXT,
  comment_fi TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog
CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_es VARCHAR(100) NOT NULL,
  name_fi VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  blog_category_id BIGINT NOT NULL REFERENCES blog_categories(id) ON DELETE RESTRICT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_es VARCHAR(255) NOT NULL,
  title_fi VARCHAR(255) NOT NULL,
  excerpt_es TEXT,
  excerpt_fi TEXT,
  content_es TEXT NOT NULL,
  content_fi TEXT NOT NULL,
  featured_image_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  author_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages
CREATE TABLE IF NOT EXISTS pages (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_es VARCHAR(255) NOT NULL,
  title_fi VARCHAR(255) NOT NULL,
  content_es TEXT NOT NULL,
  content_fi TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO and Settings
CREATE TABLE IF NOT EXISTS seo_metadata (
  id BIGSERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id BIGINT NOT NULL,
  language_code VARCHAR(2) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  slug VARCHAR(255),
  canonical_url TEXT,
  og_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_type, entity_id, language_code)
);

CREATE TABLE IF NOT EXISTS settings (
  id BIGSERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  value_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  entity_type VARCHAR(100),
  entity_id BIGINT,
  action VARCHAR(50),
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_experiences_destination ON experiences(destination_id);
CREATE INDEX idx_experiences_category ON experiences(category_id);
CREATE INDEX idx_experiences_slug ON experiences(slug);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_booking_items_booking ON booking_items(booking_id);
CREATE INDEX idx_booking_items_experience ON booking_items(experience_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_availability_experience ON availability(experience_id);
CREATE INDEX idx_availability_date ON availability(available_date);
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_reviews_experience ON reviews(experience_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_coupons_code ON coupons(code);
