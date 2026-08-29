// Domain Types
export type Language = 'es' | 'fi';

export type ExperienceStatus = 'draft' | 'published' | 'archived';
export type BookingStatus = 'inquiry' | 'pending' | 'payment_pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';
export type ReviewStatus = 'pending' | 'published' | 'rejected';

export interface Destination {
  id: number;
  slug: string;
  region: string;
  latitude: number;
  longitude: number;
  heroImageUrl: string;
  status: ExperienceStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DestinationTranslation {
  id: number;
  destinationId: number;
  languageCode: Language;
  name: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string;
  travelInformation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperienceCategory {
  id: number;
  slug: string;
  nameEs: string;
  nameFi: string;
  icon: string;
  color: string;
  createdAt: Date;
}

export interface Experience {
  id: number;
  destinationId: number;
  categoryId: number;
  slug: string;
  durationMinutes: number;
  minGroupSize: number;
  maxGroupSize: number;
  difficultyLevel: string;
  status: ExperienceStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperienceTranslation {
  id: number;
  experienceId: number;
  languageCode: Language;
  title: string;
  shortDescription: string;
  fullDescription: string;
  whatToBring: string;
  safetyInformation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingRule {
  id: number;
  experienceId: number;
  basePriceEur: number;
  adultPriceEur: number;
  childPriceEur: number;
  childAgeMin: number;
  childAgeMax: number;
  privateGroupMultiplier: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SeasonalPricing {
  id: number;
  experienceId: number;
  seasonNameEs: string;
  seasonNameFi: string;
  priceMultiplier: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Availability {
  id: number;
  experienceId: number;
  availableDate: Date;
  capacity: number;
  booked: number;
  timeSlot: string | null;
  isInstantBooking: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Addon {
  id: number;
  experienceId: number;
  nameEs: string;
  nameFi: string;
  descriptionEs: string;
  descriptionFi: string;
  priceEur: number;
  maxQuantity: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  totalSpentEur: number;
  interests: string | null;
  leadSource: string | null;
  marketingConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: number;
  customerId: number;
  bookingNumber: string;
  status: BookingStatus;
  totalPriceEur: number;
  paidPriceEur: number;
  paymentStatus: PaymentStatus;
  cancellationReason: string | null;
  internalNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
}

export interface BookingItem {
  id: number;
  bookingId: number;
  experienceId: number;
  experienceDate: Date;
  experienceTime: string | null;
  adultCount: number;
  childCount: number;
  privateGroup: boolean;
  basePriceEur: number;
  seasonalMultiplier: number;
  totalPriceEur: number;
  createdAt: Date;
}

export interface BookingAddon {
  id: number;
  bookingItemId: number;
  addonId: number;
  quantity: number;
  unitPriceEur: number;
  totalPriceEur: number;
  createdAt: Date;
}

export interface Payment {
  id: number;
  bookingId: number;
  amountEur: number;
  currency: string;
  paymentMethod: string;
  paymentGateway: string;
  transactionId: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: number;
  customerId: number;
  bookingId: number;
  experienceId: number;
  rating: number;
  titleEs: string;
  titleFi: string;
  commentEs: string;
  commentFi: string;
  status: ReviewStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate: Date | null;
  usageLimit: number | null;
  usageCount: number;
  minimumBookingValueEur: number | null;
  experienceId: number | null;
  destinationId: number | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: number;
  experienceId: number | null;
  destinationId: number | null;
  mediaType: string;
  url: string;
  altTextEs: string;
  altTextFi: string;
  captionEs: string;
  captionFi: string;
  copyright: string;
  sortOrder: number;
  isHero: boolean;
  createdAt: Date;
  updatedAt: Date;
}
