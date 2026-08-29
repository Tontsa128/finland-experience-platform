import type { Availability } from '@/types';
import { MOCK_AVAILABILITY } from '@/lib/mock-data/availability';
import { AvailabilityService as AvailabilityDomainService } from '@/domain/availability';

export class AvailabilityService {
  /**
   * Get availability for experience on specific date
   */
  static async getForDate(experienceId: number, date: Date) {
    const dateStr = date.toISOString().split('T')[0];
    return MOCK_AVAILABILITY.find(
      (a) =>
        a.experienceId === experienceId &&
        a.availableDate.toISOString().split('T')[0] === dateStr
    );
  }

  /**
   * Get available dates for date range
   */
  static async getForRange(experienceId: number, startDate: Date, endDate: Date) {
    return MOCK_AVAILABILITY.filter(
      (a) =>
        a.experienceId === experienceId &&
        a.availableDate >= startDate &&
        a.availableDate <= endDate
    ).sort((a, b) => a.availableDate.getTime() - b.availableDate.getTime());
  }

  /**
   * Check if experience is available
   */
  static async canBook(
    experienceId: number,
    date: Date,
    adultsCount: number,
    childrenCount: number,
    privateGroup: boolean = false
  ): Promise<{ available: boolean; reason?: string }> {
    const availability = await this.getForDate(experienceId, date);

    if (!availability) {
      return { available: false, reason: 'No availability for this date' };
    }

    const canBook = AvailabilityDomainService.canBook(
      availability,
      adultsCount,
      childrenCount,
      privateGroup
    );

    if (!canBook) {
      const availableSlots = AvailabilityDomainService.getAvailableCount(availability);
      return {
        available: false,
        reason: `Only ${availableSlots} spots available`,
      };
    }

    return { available: true };
  }

  /**
   * Get availability status summary
   */
  static async getSummary(experienceId: number) {
    const dates = MOCK_AVAILABILITY.filter((a) => a.experienceId === experienceId);

    const available = dates.filter((a) => !AvailabilityDomainService.isFullyBooked(a));
    const fullyBooked = dates.filter((a) => AvailabilityDomainService.isFullyBooked(a));

    return {
      totalDates: dates.length,
      availableDates: available.length,
      fullyBookedDates: fullyBooked.length,
      bookedPercentage:
        dates.length > 0
          ? Math.round(
              (dates.reduce((sum, a) => sum + a.booked, 0) /
                dates.reduce((sum, a) => sum + a.capacity, 0)) *
                100
            )
          : 0,
    };
  }
}
