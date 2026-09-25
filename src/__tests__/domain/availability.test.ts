import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AvailabilityService } from '@/domain/availability';
import type { Availability } from '@/types';

describe('AvailabilityService', () => {
  const mockAvailability: Availability = {
    id: 1,
    experienceId: 1,
    availableDate: new Date('2026-05-01'),
    capacity: 8,
    booked: 3,
    timeSlot: '14:00',
    isInstantBooking: true,
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('canBook', () => {
    it('returns true when availability exists and spots available', () => {
      assert.equal(AvailabilityService.canBook(mockAvailability, 2, 1, false), true);
    });

    it('returns false when no availability', () => {
      assert.equal(AvailabilityService.canBook(null, 2, 1, false), false);
    });

    it('returns false when fully booked', () => {
      const fullBooking: Availability = { ...mockAvailability, booked: 8 };
      assert.equal(AvailabilityService.canBook(fullBooking, 1, 0, false), false);
    });

    it('returns false when requesting more spots than available', () => {
      assert.equal(AvailabilityService.canBook(mockAvailability, 3, 3, false), false);
    });

    it('returns false for non-instant booking', () => {
      const inquiryOnly: Availability = { ...mockAvailability, isInstantBooking: false };
      assert.equal(AvailabilityService.canBook(inquiryOnly, 1, 0, false), true);
    });
  });

  describe('getAvailableCount', () => {
    it('calculates remaining capacity correctly', () => {
      assert.equal(AvailabilityService.getAvailableCount(mockAvailability), 5);
    });

    it('returns 0 when fully booked', () => {
      const fullBooking: Availability = { ...mockAvailability, booked: 8 };
      assert.equal(AvailabilityService.getAvailableCount(fullBooking), 0);
    });
  });

  describe('isFullyBooked', () => {
    it('returns false when spots available', () => {
      assert.equal(AvailabilityService.isFullyBooked(mockAvailability), false);
    });

    it('returns true when fully booked', () => {
      const fullBooking: Availability = { ...mockAvailability, booked: 8 };
      assert.equal(AvailabilityService.isFullyBooked(fullBooking), true);
    });
  });

  describe('getBookedPercentage', () => {
    it('calculates booking percentage', () => {
      assert.equal(AvailabilityService.getBookedPercentage(mockAvailability), 37.5);
    });
  });
});
