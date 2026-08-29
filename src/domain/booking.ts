import type { Booking, BookingStatus } from '@/types';

/**
 * Booking workflow state machine
 */
export class BookingWorkflow {
  static readonly VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> =
    {
      inquiry: ['pending', 'cancelled'],
      pending: ['payment_pending', 'cancelled'],
      payment_pending: ['confirmed', 'cancelled'],
      confirmed: ['completed', 'cancelled'],
      completed: ['cancelled'],
      cancelled: [],
      refunded: [],
    };

  /**
   * Check if transition is valid
   */
  static canTransition(
    currentStatus: BookingStatus,
    targetStatus: BookingStatus
  ): boolean {
    const validTransitions = this.VALID_TRANSITIONS[currentStatus];
    return validTransitions.includes(targetStatus);
  }

  /**
   * Get available next statuses
   */
  static getAvailableTransitions(currentStatus: BookingStatus): BookingStatus[] {
    return this.VALID_TRANSITIONS[currentStatus];
  }

  /**
   * Check if booking can be cancelled
   */
  static canCancel(status: BookingStatus): boolean {
    const cancellableStatuses: BookingStatus[] = [
      'inquiry',
      'pending',
      'payment_pending',
      'confirmed',
    ];
    return cancellableStatuses.includes(status);
  }

  /**
   * Check if booking can be refunded
   */
  static canRefund(status: BookingStatus): boolean {
    return status === 'confirmed' || status === 'completed';
  }

  /**
   * Generate booking number
   */
  static generateBookingNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `FEP-${timestamp}-${random}`;
  }
}
