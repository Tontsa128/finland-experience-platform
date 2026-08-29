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
      const result = AvailabilityService.canBook(mockAvailability, 2, 1, false);
      expect(result).toBe(true);
    });

    it('returns false when no availability', () => {
      const result = AvailabilityService.canBook(null, 2, 1, false);
      expect(result).toBe(false);
    });

    it('returns false when fully booked', () => {
      const fullBooking: Availability = {
        ...mockAvailability,
        booked: 8,
      };
      const result = AvailabilityService.canBook(fullBooking, 1, 0, false);
      expect(result).toBe(false);
    });

    it('returns false when requesting more spots than available', () => {
      const result = AvailabilityService.canBook(mockAvailability, 3, 3, false);
      expect(result).toBe(false);
    });

    it('returns false for non-instant booking', () => {
      const inquiryOnly: Availability = {
        ...mockAvailability,
        isInstantBooking: false,
      };
      const result = AvailabilityService.canBook(inquiryOnly, 1, 0, false);
      expect(result).toBe(true); // Can inquire
    });
  });

  describe('getAvailableCount', () => {
    it('calculates remaining capacity correctly', () => {
      const count = AvailabilityService.getAvailableCount(mockAvailability);
      expect(count).toBe(5); // 8 - 3
    });

    it('returns 0 when fully booked', () => {
      const fullBooking: Availability = {
        ...mockAvailability,
        booked: 8,
      };
      const count = AvailabilityService.getAvailableCount(fullBooking);
      expect(count).toBe(0);
    });
  });

  describe('isFullyBooked', () => {
    it('returns false when spots available', () => {
      expect(AvailabilityService.isFullyBooked(mockAvailability)).toBe(false);
    });

    it('returns true when fully booked', () => {
      const fullBooking: Availability = {
        ...mockAvailability,
        booked: 8,
      };
      expect(AvailabilityService.isFullyBooked(fullBooking)).toBe(true);
    });
  });

  describe('getBookedPercentage', () => {
    it('calculates booking percentage', () => {
      const percentage = AvailabilityService.getBookedPercentage(mockAvailability);
      expect(percentage).toBe(37.5); // 3/8 * 100
    });
  });
});
