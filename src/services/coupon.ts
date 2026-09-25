import type { Coupon } from '@/types';

const MOCK_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'EARLYBIRD20',
    discountType: 'percentage',
    discountValue: 20,
    expiryDate: new Date('2026-12-31'),
    usageLimit: 100,
    usageCount: 45,
    minimumBookingValueEur: 300,
    experienceId: undefined,
    destinationId: undefined,
    status: 'active',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 2,
    code: 'AURORA50',
    discountType: 'fixed',
    discountValue: 50,
    expiryDate: new Date('2027-03-31'),
    usageLimit: 50,
    usageCount: 12,
    minimumBookingValueEur: 400,
    experienceId: 1,
    destinationId: null,
    status: 'active',
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
  },
];

export class CouponService {
  /**
   * Get coupon by code
   */
  static async getByCode(code: string): Promise<Coupon | null> {
    return MOCK_COUPONS.find((c) => c.code === code.toUpperCase()) || null;
  }

  /**
   * Validate coupon
   */
  static async validate(code: string, subtotalEur: number): Promise<{ valid: boolean; error?: string }> {
    const coupon = await this.getByCode(code);

    if (!coupon) {
      return { valid: false, error: 'Coupon not found' };
    }

    if (coupon.status !== 'active') {
      return { valid: false, error: 'Coupon is not active' };
    }

    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return { valid: false, error: 'Coupon has expired' };
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { valid: false, error: 'Coupon usage limit reached' };
    }

    if (coupon.minimumBookingValueEur && subtotalEur < coupon.minimumBookingValueEur) {
      return {
        valid: false,
        error: `Minimum booking value of €${coupon.minimumBookingValueEur} required`,
      };
    }

    return { valid: true };
  }

  /**
   * Calculate discount
   */
  static calculateDiscount(
    coupon: Coupon,
    subtotalEur: number
  ): number {
    if (coupon.discountType === 'percentage') {
      return (subtotalEur * coupon.discountValue) / 100;
    }
    return coupon.discountValue;
  }
}
