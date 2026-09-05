import type { BookingStatus } from '@/types';

/** Browser-safe booking workflow and booking-number utilities. */
export class BookingWorkflow {
  static readonly VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
    inquiry: ['pending', 'cancelled'],
    pending: ['payment_pending', 'cancelled'],
    payment_pending: ['confirmed', 'cancelled'],
    confirmed: ['completed', 'cancelled'],
    completed: ['cancelled'],
    cancelled: [],
    refunded: [],
  };

  static canTransition(currentStatus: BookingStatus, targetStatus: BookingStatus): boolean {
    return this.VALID_TRANSITIONS[currentStatus]?.includes(targetStatus) ?? false;
  }

  static getAvailableTransitions(currentStatus: BookingStatus): BookingStatus[] {
    return this.VALID_TRANSITIONS[currentStatus] ?? [];
  }

  static canCancel(status: BookingStatus): boolean {
    return ['inquiry', 'pending', 'payment_pending', 'confirmed'].includes(status);
  }

  static canRefund(status: BookingStatus): boolean {
    return status === 'confirmed' || status === 'completed';
  }

  static generateBookingNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `FEP-${timestamp}-${random}`;
  }
}

/** Backwards-compatible browser-safe alias used by the checkout UI. */
export const BookingService = BookingWorkflow;
