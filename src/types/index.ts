export type Locale = "fi" | "es" | "en";

export type BookingStatus =
  | "inquiry"
  | "pending"
  | "payment_pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "refunded";

export interface Destination {
  [key: string]: any;
  id: string | number;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  region: string;
  images: string[];
  priceFrom: number;
  featured: boolean;
  coordinates?: { lat: number; lng: number };
  tags: string[];
  accommodationIds?: string[];
  activities?: string[];
  status?: string;
  name_es?: string;
  name_fi?: string;
  description_es?: string;
  description_fi?: string;
  hero_image_id?: string | null;
  gallery?: string[];
  latitude?: number;
  longitude?: number;
  best_season?: string;
  travel_info_es?: string;
  travel_info_fi?: string;
  highlights?: string[];
  faq?: unknown[];
  seo?: Record<string, unknown>;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface DestinationTranslation {
  [key: string]: any;
  destinationId?: string | number;
  id?: string | number;
  destination_id?: string | number;
  locale?: Locale;
  title?: string;
  description?: string;
  slug?: string;
}

export interface Cabin {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  location: string;
  region: string;
  pricePerNight: number;
  images: string[];
  features: string[];
  maxGuests: number;
  bedrooms: number;
  coordinates?: { lat: number; lng: number };
  type: "cabin" | "igloo" | "hotel" | "villa" | "glamping";
  bookingUrl?: string;
  provider?: string;
  priceNote?: Record<Locale, string>;
}

export type ExperienceStatus = "draft" | "published" | "archived";

export interface Experience {
  [key: string]: any;
  id: string | number;
  organization_id?: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  price: number;
  duration: string;
  images: string[];
  category: string;
  region: string;
  maxParticipants?: number;
  title_es?: string;
  title_fi?: string;
  short_description_es?: string;
  short_description_fi?: string;
  description_es?: string;
  description_fi?: string;
  destination_id?: string;
  category_id?: string;
  duration_minutes?: number;
  min_age?: number;
  capacity_default?: number;
  pricing?: PricingModel;
  status?: ExperienceStatus;
  seo?: Record<string, string | undefined>;
  media?: string[];
  hero_media_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceTranslation {
  [key: string]: any;
  experienceId?: string | number;
  id?: string | number;
  experience_id?: string | number;
  locale?: Locale;
  title?: string;
  description?: string;
}

export interface PricingModel {
  adult: number;
  child?: number;
  infant?: number;
  private_group?: number;
  currency: string;
}

export interface PricingRule {
  [key: string]: any;
  id?: string | number;
  experienceId?: string | number;
  basePriceEur?: number;
  adultPriceEur?: number;
  childPriceEur?: number;
  privateGroupMultiplier?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SeasonalPricing {
  [key: string]: any;
  id?: string | number;
  experienceId?: string | number;
  startDate?: string | Date;
  endDate?: string | Date;
  multiplier?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Addon {
  [key: string]: any;
  experienceId?: string | number;
  id?: string | number;
  name?: string;
  description?: string;
  priceEur?: number;
  quantity?: number;
}

export interface Media {
  [key: string]: any;
  experienceId?: string | number | null;
  destinationId?: string | number | null;
  sortOrder?: number;
  id?: string | number;
  url?: string;
  filename?: string;
  altText?: string;
  type?: string;
  createdAt?: string | Date;
}

export interface MediaItem extends Media {
  alt_text?: string;
  title?: string;
  size_bytes?: number;
  width?: number;
  height?: number;
  tags?: string[];
  created_at?: string;
  is_hero?: boolean;
  sort_order?: number;
  metadata?: Record<string, unknown>;
}

export interface Availability {
  [key: string]: any;
  timeSlot?: string;
  id: string | number;
  experienceId?: string | number;
  experience_id?: string;
  availableDate: Date;
  date?: string;
  startTime?: string;
  capacity: number;
  booked: number;
  status: "available" | "sold_out" | "cancelled" | string;
  isInstantBooking: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AvailabilitySlot {
  id: string;
  experience_id: string;
  date: string;
  start_time?: string;
  capacity_total: number;
  capacity_booked: number;
  status?: "available" | "sold_out" | "cancelled";
}

export interface Booking {
  id: string | number;
  userId?: string | number;
  customerId?: string | number;
  bookingNumber?: string;
  itemType?: "destination" | "cabin" | "experience";
  itemId?: string | number;
  experience_id?: string;
  availability_id?: string;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  experienceDate?: Date | string;
  experienceTime?: string;
  guests?: number;
  adultCount?: number;
  childCount?: number;
  privateGroup?: boolean;
  basePriceEur?: number;
  seasonalMultiplier?: number;
  totalPriceEur?: number;
  paidPriceEur?: number;
  totalPrice?: number;
  price?: number;
  status: BookingStatus;
  paymentStatus?: "pending" | "paid" | "unpaid" | "failed" | "refunded";
  cancellationReason?: string | null;
  internalNotes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  confirmedAt?: string | Date | null;
  completedAt?: string | Date | null;
  cancelledAt?: string | Date | null;
  travelers?: { adults: number; children?: number; infants?: number };
  total_cents?: number;
}

export interface BookingItem {
  id: string | number;
  bookingId: string | number;
  experienceId: string | number;
  experienceDate: Date | string;
  experienceTime?: string;
  adultCount: number;
  childCount: number;
  privateGroup: boolean;
  basePriceEur: number;
  seasonalMultiplier: number;
  totalPriceEur: number;
  createdAt?: Date | string;
}

export interface BookingAddon {
  id?: string | number;
  bookingId?: string | number;
  addonId?: string | number;
  quantity?: number;
  priceEur?: number;
}

export interface Customer {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  totalSpentEur?: number;
  interests?: string;
  leadSource?: string;
  marketingConsent?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Review {
  id: string | number;
  customerId?: string | number;
  bookingId?: string | number;
  experienceId?: string | number;
  rating: number;
  titleEs?: string;
  titleFi?: string;
  commentEs?: string;
  commentFi?: string;
  status?: string;
  publishedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Coupon {
  [key: string]: any;
  experienceId?: string | number | null;
  status?: string;
  id?: string | number;
  code?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: Date | null;
  usageLimit: number | null;
  usageCount: number;
  minimumBookingValueEur: number | null;
}

export interface Tag {
  [key: string]: any;
  nameEs?: string;
  nameFi?: string;
  id?: string | number;
  name?: string;
  slug?: string;
}

export interface Inclusion {
  [key: string]: any;
  experienceId?: string | number;
  id?: string | number;
  description?: string;
}

export interface Exclusion {
  [key: string]: any;
  experienceId?: string | number;
  id?: string | number;
  description?: string;
}

export interface FAQ {
  [key: string]: any;
  experienceId?: string | number;
  id?: string | number;
  question?: string;
  answer?: string;
}

export type ExperienceCategory = Record<string, any>;

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  name?: string;
  preferredLocale?: Locale;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  content: Record<Locale, string>;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
}
