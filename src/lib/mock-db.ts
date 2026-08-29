/**
 * Mock In-Memory Database
 * This simulates a database for demo purposes
 * In production, this will be replaced with Supabase
 */

import type {
  Destination,
  DestinationTranslation,
  Experience,
  ExperienceTranslation,
  ExperienceCategory,
  PricingRule,
  SeasonalPricing,
  Availability,
  Addon,
  Media,
  Customer,
  Booking,
  BookingItem,
  BookingAddon,
  Review,
  Coupon,
  Tag,
  Inclusion,
  Exclusion,
  FAQ,
} from '@/types';

interface MockDatabase {
  destinations: Destination[];
  destinationTranslations: DestinationTranslation[];
  experiences: Experience[];
  experienceTranslations: ExperienceTranslation[];
  experienceCategories: ExperienceCategory[];
  pricingRules: PricingRule[];
  seasonalPricing: SeasonalPricing[];
  availability: Availability[];
  addons: Addon[];
  media: Media[];
  customers: Customer[];
  bookings: Booking[];
  bookingItems: BookingItem[];
  bookingAddons: BookingAddon[];
  reviews: Review[];
  coupons: Coupon[];
  tags: Tag[];
  inclusions: Inclusion[];
  exclusions: Exclusion[];
  faqs: FAQ[];
}

class MockDB implements MockDatabase {
  destinations: Destination[] = [];
  destinationTranslations: DestinationTranslation[] = [];
  experiences: Experience[] = [];
  experienceTranslations: ExperienceTranslation[] = [];
  experienceCategories: ExperienceCategory[] = [];
  pricingRules: PricingRule[] = [];
  seasonalPricing: SeasonalPricing[] = [];
  availability: Availability[] = [];
  addons: Addon[] = [];
  media: Media[] = [];
  customers: Customer[] = [];
  bookings: Booking[] = [];
  bookingItems: BookingItem[] = [];
  bookingAddons: BookingAddon[] = [];
  reviews: Review[] = [];
  coupons: Coupon[] = [];
  tags: Tag[] = [];
  inclusions: Inclusion[] = [];
  exclusions: Exclusion[] = [];
  faqs: FAQ[] = [];
}

export const mockDB = new MockDB();
