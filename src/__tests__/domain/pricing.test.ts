import { PricingCalculator } from '@/domain/pricing';
import { AvailabilityService } from '@/domain/availability';
import { BookingWorkflow } from '@/domain/booking';

describe('PricingCalculator', () => {
  describe('calculateBreakdown', () => {
    it('calculates adult pricing correctly', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100,
        adultCount: 2,
        childCount: 0,
        adultPriceEur: 100,
        childPriceEur: 50,
        privateGroup: false,
        privateGroupMultiplier: 1.5,
        seasonalMultiplier: 1.0,
        addons: [],
        couponDiscountEur: 0,
      });

      expect(result.adultTotalEur).toBe(200);
      expect(result.totalEur).toBe(300); // base + adults
    });

    it('calculates child discount correctly', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100,
        adultCount: 1,
        childCount: 2,
        adultPriceEur: 100,
        childPriceEur: 50,
        privateGroup: false,
        privateGroupMultiplier: 1.5,
        seasonalMultiplier: 1.0,
        addons: [],
        couponDiscountEur: 0,
      });

      expect(result.childTotalEur).toBe(100);
      expect(result.totalEur).toBe(300); // base + adult + children
    });

    it('applies private group multiplier', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100,
        adultCount: 2,
        childCount: 0,
        adultPriceEur: 100,
        childPriceEur: 50,
        privateGroup: true,
        privateGroupMultiplier: 1.5,
        seasonalMultiplier: 1.0,
        addons: [],
        couponDiscountEur: 0,
      });

      expect(result.privateGroupSurchargeEur).toBe(150); // 200 * 0.5
      expect(result.totalEur).toBe(450); // base + adults + surcharge
    });

    it('applies seasonal multiplier', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100,
        adultCount: 1,
        childCount: 0,
        adultPriceEur: 100,
        childPriceEur: 50,
        privateGroup: false,
        privateGroupMultiplier: 1.5,
        seasonalMultiplier: 1.4,
        addons: [],
        couponDiscountEur: 0,
      });

      expect(result.seasonalAdjustmentEur).toBe(40); // 100 * 0.4
      expect(result.totalEur).toBe(240); // base + adult + seasonal
    });

    it('adds add-ons to total', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100,
        adultCount: 1,
        childCount: 0,
        adultPriceEur: 100,
        childPriceEur: 50,
        privateGroup: false,
        privateGroupMultiplier: 1.5,
        seasonalMultiplier: 1.0,
        addons: [
          { quantity: 1, priceEur: 50 },
          { quantity: 2, priceEur: 25 },
        ],
        couponDiscountEur: 0,
      });

      expect(result.addonsTotalEur).toBe(100); // 50 + (2*25)
      expect(result.totalEur).toBe(300); // base + adult + addons
    });

    it('applies coupon discount', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100,
        adultCount: 1,
        childCount: 0,
        adultPriceEur: 100,
        childPriceEur: 50,
        privateGroup: false,
        privateGroupMultiplier: 1.5,
        seasonalMultiplier: 1.0,
        addons: [],
        couponDiscountEur: 50,
      });

      expect(result.couponDiscountEur).toBe(50);
      expect(result.totalEur).toBe(150); // base + adult - coupon
    });
  });

  describe('calculateCouponDiscount', () => {
    it('calculates percentage discount', () => {
      const discount = PricingCalculator.calculateCouponDiscount(100, {
        discountType: 'percentage',
        discountValue: 20,
      });

      expect(discount).toBe(20);
    });

    it('calculates fixed discount', () => {
      const discount = PricingCalculator.calculateCouponDiscount(100, {
        discountType: 'fixed',
        discountValue: 25,
      });

      expect(discount).toBe(25);
    });
  });

  describe('isCouponValid', () => {
    it('returns true for valid coupon', () => {
      const valid = PricingCalculator.isCouponValid(
        {
          expiryDate: new Date(Date.now() + 86400000),
          usageLimit: 10,
          usageCount: 5,
          minimumBookingValueEur: 100,
        },
        150
      );

      expect(valid).toBe(true);
    });

    it('returns false for expired coupon', () => {
      const valid = PricingCalculator.isCouponValid(
        {
          expiryDate: new Date(Date.now() - 86400000),
          usageLimit: 10,
          usageCount: 5,
          minimumBookingValueEur: 100,
        },
        150
      );

      expect(valid).toBe(false);
    });

    it('returns false when usage limit reached', () => {
      const valid = PricingCalculator.isCouponValid(
        {
          expiryDate: new Date(Date.now() + 86400000),
          usageLimit: 5,
          usageCount: 5,
          minimumBookingValueEur: 100,
        },
        150
      );

      expect(valid).toBe(false);
    });

    it('returns false when booking below minimum', () => {
      const valid = PricingCalculator.isCouponValid(
        {
          expiryDate: new Date(Date.now() + 86400000),
          usageLimit: 10,
          usageCount: 5,
          minimumBookingValueEur: 200,
        },
        150
      );

      expect(valid).toBe(false);
    });
  });
});
