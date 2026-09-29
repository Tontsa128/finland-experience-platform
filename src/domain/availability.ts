import type { Availability } from "@/types";

/**
 * Availability domain logic.
 * Keeps booking decisions deterministic and guards against invalid input.
 */
export class AvailabilityService {
  /**
   * Check if an experience can be booked for the requested party.
   * Non-instant availability is inquiry-only: the service may accept an inquiry,
   * but it is never treated as an instant booking.
   */
  static canBook(
    availability: Availability | null,
    adultsCount: number,
    childrenCount: number,
    privateGroup: boolean
  ): boolean {
    if (!availability || availability.status !== "available") {
      return false;
    }

    if (
      !Number.isInteger(adultsCount) ||
      !Number.isInteger(childrenCount) ||
      adultsCount < 0 ||
      childrenCount < 0
    ) {
      return false;
    }

    const totalTravelers = adultsCount + childrenCount;
    if (totalTravelers < 1) {
      return false;
    }

    if (!Number.isInteger(availability.capacity) || availability.capacity < 1) {
      return false;
    }

    if (!Number.isInteger(availability.booked) || availability.booked < 0) {
      return false;
    }

    if (availability.booked >= availability.capacity) {
      return false;
    }

    // A private group reserves the full remaining capacity. It can only be
    // confirmed instantly when the requested party fits the entire slot.
    if (privateGroup && totalTravelers !== availability.capacity - availability.booked) {
      return false;
    }

    if (!availability.isInstantBooking) {
      return true;
    }

    return availability.capacity - availability.booked >= totalTravelers;
  }

  static getAvailableCount(availability: Availability): number {
    if (
      !Number.isFinite(availability.capacity) ||
      !Number.isFinite(availability.booked)
    ) {
      return 0;
    }

    return Math.max(0, availability.capacity - availability.booked);
  }

  static isFullyBooked(availability: Availability): boolean {
    return (
      Number.isFinite(availability.capacity) &&
      Number.isFinite(availability.booked) &&
      availability.booked >= availability.capacity
    );
  }

  static getBookedPercentage(availability: Availability): number {
    if (!Number.isFinite(availability.capacity) || availability.capacity <= 0) {
      return 0;
    }

    const booked = Number.isFinite(availability.booked)
      ? Math.max(0, availability.booked)
      : 0;

    return Math.min(100, (booked / availability.capacity) * 100);
  }

  /**
   * Validate every calendar date in the requested range.
   * Time-of-day differences do not make an otherwise matching date unavailable.
   */
  static areDatesAvailable(
    availabilities: Availability[],
    startDate: Date,
    endDate: Date,
    adultsCount: number,
    childrenCount: number
  ): boolean {
    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate.getTime() < startDate.getTime()
    ) {
      return false;
    }

    const dateKey = (date: Date) =>
      `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(
        date.getUTCDate()
      ).padStart(2, "0")}`;

    const availableByDate = new Map<string, Availability[]>();
    for (const availability of availabilities) {
      const key = dateKey(availability.availableDate);
      const entries = availableByDate.get(key) ?? [];
      entries.push(availability);
      availableByDate.set(key, entries);
    }

    const current = new Date(startDate);
    current.setUTCHours(0, 0, 0, 0);
    const last = new Date(endDate);
    last.setUTCHours(0, 0, 0, 0);

    while (current <= last) {
      const entries = availableByDate.get(dateKey(current)) ?? [];
      if (!entries.some((availability) =>
        this.canBook(availability, adultsCount, childrenCount, false)
      )) {
        return false;
      }
      current.setUTCDate(current.getUTCDate() + 1);
    }

    return true;
  }
}
