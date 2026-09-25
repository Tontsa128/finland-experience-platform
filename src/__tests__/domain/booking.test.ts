import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BookingWorkflow } from '@/domain/booking';

describe('BookingWorkflow', () => {
  describe('canTransition', () => {
    it('allows valid transitions', () => {
      assert.equal(BookingWorkflow.canTransition('inquiry', 'pending'), true);
      assert.equal(BookingWorkflow.canTransition('pending', 'payment_pending'), true);
      assert.equal(BookingWorkflow.canTransition('payment_pending', 'confirmed'), true);
      assert.equal(BookingWorkflow.canTransition('confirmed', 'completed'), true);
    });

    it('prevents invalid transitions', () => {
      assert.equal(BookingWorkflow.canTransition('confirmed', 'pending'), false);
      assert.equal(BookingWorkflow.canTransition('completed', 'confirmed'), false);
      assert.equal(BookingWorkflow.canTransition('cancelled', 'confirmed'), false);
    });

    it('allows cancellation from certain states', () => {
      assert.equal(BookingWorkflow.canTransition('inquiry', 'cancelled'), true);
      assert.equal(BookingWorkflow.canTransition('pending', 'cancelled'), true);
      assert.equal(BookingWorkflow.canTransition('confirmed', 'cancelled'), true);
      assert.equal(BookingWorkflow.canTransition('completed', 'cancelled'), true);
    });
  });

  describe('canCancel', () => {
    it('returns true for cancellable statuses', () => {
      assert.equal(BookingWorkflow.canCancel('inquiry'), true);
      assert.equal(BookingWorkflow.canCancel('pending'), true);
      assert.equal(BookingWorkflow.canCancel('payment_pending'), true);
      assert.equal(BookingWorkflow.canCancel('confirmed'), true);
    });

    it('returns false for non-cancellable statuses', () => {
      assert.equal(BookingWorkflow.canCancel('completed'), false);
      assert.equal(BookingWorkflow.canCancel('cancelled'), false);
      assert.equal(BookingWorkflow.canCancel('refunded'), false);
    });
  });

  describe('canRefund', () => {
    it('returns true for refundable statuses', () => {
      assert.equal(BookingWorkflow.canRefund('confirmed'), true);
      assert.equal(BookingWorkflow.canRefund('completed'), true);
    });

    it('returns false for non-refundable statuses', () => {
      assert.equal(BookingWorkflow.canRefund('inquiry'), false);
      assert.equal(BookingWorkflow.canRefund('pending'), false);
      assert.equal(BookingWorkflow.canRefund('cancelled'), false);
    });
  });

  describe('generateBookingNumber', () => {
    it('generates unique booking numbers', () => {
      const num1 = BookingWorkflow.generateBookingNumber();
      const num2 = BookingWorkflow.generateBookingNumber();
      assert.match(num1, /^FEP-/);
      assert.match(num2, /^FEP-/);
      assert.notEqual(num1, num2);
    });
  });
});
