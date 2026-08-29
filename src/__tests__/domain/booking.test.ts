import { BookingWorkflow } from '@/domain/booking';

describe('BookingWorkflow', () => {
  describe('canTransition', () => {
    it('allows valid transitions', () => {
      expect(BookingWorkflow.canTransition('inquiry', 'pending')).toBe(true);
      expect(BookingWorkflow.canTransition('pending', 'payment_pending')).toBe(true);
      expect(BookingWorkflow.canTransition('payment_pending', 'confirmed')).toBe(true);
      expect(BookingWorkflow.canTransition('confirmed', 'completed')).toBe(true);
    });

    it('prevents invalid transitions', () => {
      expect(BookingWorkflow.canTransition('confirmed', 'pending')).toBe(false);
      expect(BookingWorkflow.canTransition('completed', 'confirmed')).toBe(false);
      expect(BookingWorkflow.canTransition('cancelled', 'confirmed')).toBe(false);
    });

    it('allows cancellation from certain states', () => {
      expect(BookingWorkflow.canTransition('inquiry', 'cancelled')).toBe(true);
      expect(BookingWorkflow.canTransition('pending', 'cancelled')).toBe(true);
      expect(BookingWorkflow.canTransition('confirmed', 'cancelled')).toBe(true);
      expect(BookingWorkflow.canTransition('completed', 'cancelled')).toBe(true);
    });
  });

  describe('canCancel', () => {
    it('returns true for cancellable statuses', () => {
      expect(BookingWorkflow.canCancel('inquiry')).toBe(true);
      expect(BookingWorkflow.canCancel('pending')).toBe(true);
      expect(BookingWorkflow.canCancel('payment_pending')).toBe(true);
      expect(BookingWorkflow.canCancel('confirmed')).toBe(true);
    });

    it('returns false for non-cancellable statuses', () => {
      expect(BookingWorkflow.canCancel('completed')).toBe(false);
      expect(BookingWorkflow.canCancel('cancelled')).toBe(false);
      expect(BookingWorkflow.canCancel('refunded')).toBe(false);
    });
  });

  describe('canRefund', () => {
    it('returns true for refundable statuses', () => {
      expect(BookingWorkflow.canRefund('confirmed')).toBe(true);
      expect(BookingWorkflow.canRefund('completed')).toBe(true);
    });

    it('returns false for non-refundable statuses', () => {
      expect(BookingWorkflow.canRefund('inquiry')).toBe(false);
      expect(BookingWorkflow.canRefund('pending')).toBe(false);
      expect(BookingWorkflow.canRefund('cancelled')).toBe(false);
    });
  });

  describe('generateBookingNumber', () => {
    it('generates unique booking numbers', () => {
      const num1 = BookingWorkflow.generateBookingNumber();
      const num2 = BookingWorkflow.generateBookingNumber();

      expect(num1).toMatch(/^FEP-/);
      expect(num2).toMatch(/^FEP-/);
      expect(num1).not.toBe(num2);
    });
  });
});
