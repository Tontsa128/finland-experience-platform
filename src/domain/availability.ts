import type { Availability } from '@/types';

/**
 * Availability domain logic
 * Prevents overbooking at the business logic layer
 */
export class AvailabilityService {
  /**
   * Check if experience is available on given date/time for given number of travelers
   */
  static canBook(
    availability: Availability | null,
    adultsCount: number,
    childrenCount: number,
    privateGroup: boolean
  ): boolean {
    if (!availability) {
      return false;
    }

    if (availability.status !== 'available') {
      return false;
    }

    if (!availability.isInstantBooking) {
      return true; // Can inquire, just not instant book
    }

    const totalTravelers = adultsCount + childrenCount;
    const availableSlots = availability.capacity - availability.booked;

    return availableSlots >= totalTravelers;
  }

  /**
   * Get available count for a date
   */
  static getAvailableCount(availability: Availability): number {
    return Math.max(0, availability.capacity - availability.booked);
  }

  /**
   * Check if date is fully booked
   */
  static isFullyBooked(availability: Availability): boolean {
    return availability.booked >= availability.capacity;
  }

  /**
   * Get percentage booked
   */
  static getBookedPercentage(availability: Availability): number {
    return (availability.booked / availability.capacity) * 100;
  }

  /**
   * Validate date range against availability
   */
  static areDatesAvailable(
    availabilities: Availability[],
    startDate: Date,
    endDate: Date,
    adultsCount: number,
    childrenCount: number
  ): boolean {
    // For simplicity, check only the start date
    // In a real system, might need to validate all dates in range
    const startDateAvailability = availabilities.find(
      (a) => a.availableDate.getTime() === startDate.getTime()
    );

    if (!startDateAvailability) {
      return false;
    }

    return this.canBook(
      startDateAvailability,
      adultsCount,
      childrenCount,
      false
    );
  }
}
