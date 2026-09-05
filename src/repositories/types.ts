/**
 * Repository type definitions
 * These interfaces are implemented by both mock and Supabase repositories
 */

import type { Experience, ExperienceTranslation } from '@/types';
import type { Destination, DestinationTranslation } from '@/types';
import type { Availability } from '@/types';
import type { Booking, BookingStatus } from '@/types';
import type { PricingRule, SeasonalPricing } from '@/types';

export interface IExperienceRepository {
  getAll(): Promise<Experience[]>;
  getById(id: number): Promise<Experience | null>;
  getBySlug(slug: string): Promise<Experience | null>;
  create(experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience>;
  update(id: number, data: Partial<Experience>): Promise<Experience>;
  delete(id: number): Promise<void>;
  getTranslations(experienceId: number): Promise<ExperienceTranslation[]>;
}

export interface IDestinationRepository {
  getAll(): Promise<Destination[]>;
  getById(id: number): Promise<Destination | null>;
  getBySlug(slug: string): Promise<Destination | null>;
  create(destination: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Destination>;
  update(id: number, data: Partial<Destination>): Promise<Destination>;
  delete(id: number): Promise<void>;
  getTranslations(destinationId: number): Promise<DestinationTranslation[]>;
}

export interface IAvailabilityRepository {
  getAll(): Promise<Availability[]>;
  getById(id: number): Promise<Availability | null>;
  getByExperienceAndDate(experienceId: number, date: Date): Promise<Availability | null>;
  getByExperienceAndDateRange(experienceId: number, startDate: Date, endDate: Date): Promise<Availability[]>;
  create(availability: Omit<Availability, 'id' | 'createdAt' | 'updatedAt'>): Promise<Availability>;
  update(id: number, data: Partial<Availability>): Promise<Availability>;
  delete(id: number): Promise<void>;
}

export interface IBookingRepository {
  getAll(): Promise<Booking[]>;
  getById(id: number): Promise<Booking | null>;
  getByBookingNumber(bookingNumber: string): Promise<Booking | null>;
  getByCustomerId(customerId: number): Promise<Booking[]>;
  create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking>;
  update(id: number, data: Partial<Booking>): Promise<Booking>;
  updateStatus(id: number, status: BookingStatus): Promise<Booking>;
}

export interface IPricingRepository {
  getByExperienceId(experienceId: number): Promise<PricingRule | null>;
  getSeasonalPricing(experienceId: number): Promise<SeasonalPricing[]>;
  createPricingRule(rule: Omit<PricingRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<PricingRule>;
  updatePricingRule(id: number, data: Partial<PricingRule>): Promise<PricingRule>;
}
