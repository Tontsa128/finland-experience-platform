import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PricingCalculator } from '@/domain/pricing';

describe('PricingCalculator', () => {
  describe('calculateBreakdown', () => {
    it('calculates adult pricing correctly', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100, adultCount: 2, childCount: 0, adultPriceEur: 100, childPriceEur: 50,
        privateGroup: false, privateGroupMultiplier: 1.5, seasonalMultiplier: 1.0, addons: [], couponDiscountEur: 0,
      });
      assert.equal(result.adultTotalEur, 200);
      assert.equal(result.totalEur, 300);
    });

    it('calculates child discount correctly', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100, adultCount: 1, childCount: 2, adultPriceEur: 100, childPriceEur: 50,
        privateGroup: false, privateGroupMultiplier: 1.5, seasonalMultiplier: 1.0, addons: [], couponDiscountEur: 0,
      });
      assert.equal(result.childTotalEur, 100);
      assert.equal(result.totalEur, 300);
    });

    it('applies private group multiplier', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100, adultCount: 2, childCount: 0, adultPriceEur: 100, childPriceEur: 50,
        privateGroup: true, privateGroupMultiplier: 1.5, seasonalMultiplier: 1.0, addons: [], couponDiscountEur: 0,
      });
      assert.equal(result.privateGroupSurchargeEur, 150);
      assert.equal(result.totalEur, 450);
    });

    it('applies seasonal multiplier', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100, adultCount: 1, childCount: 0, adultPriceEur: 100, childPriceEur: 50,
        privateGroup: false, privateGroupMultiplier: 1.5, seasonalMultiplier: 1.4, addons: [], couponDiscountEur: 0,
      });
      assert.equal(result.seasonalAdjustmentEur, 40);
      assert.equal(result.totalEur, 240);
    });

    it('adds add-ons to total', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100, adultCount: 1, childCount: 0, adultPriceEur: 100, childPriceEur: 50,
        privateGroup: false, privateGroupMultiplier: 1.5, seasonalMultiplier: 1.0,
        addons: [{ quantity: 1, priceEur: 50 }, { quantity: 2, priceEur: 25 }],
        couponDiscountEur: 0,
      });
      assert.equal(result.addonsTotalEur, 100);
      assert.equal(result.totalEur, 300);
    });

    it('applies coupon discount', () => {
      const result = PricingCalculator.calculateBreakdown({
        basePriceEur: 100, adultCount: 1, childCount: 0, adultPriceEur: 100, childPriceEur: 50,
        privateGroup: false, privateGroupMultiplier: 1.5, seasonalMultiplier: 1.0, addons: [], couponDiscountEur: 50,
      });
      assert.equal(result.couponDiscountEur, 50);
      assert.equal(result.totalEur, 150);
    });
  });

  describe('calculateCouponDiscount', () => {
    it('calculates percentage discount', () => {
      assert.equal(PricingCalculator.calculateCouponDiscount(100, { discountType: 'percentage', discountValue: 20 }), 20);
    });

    it('calculates fixed discount', () => {
      assert.equal(PricingCalculator.calculateCouponDiscount(100, { discountType: 'fixed', discountValue: 25 }), 25);
    });
  });

  describe('isCouponValid', () => {
    it('returns true for valid coupon', () => {
      assert.equal(PricingCalculator.isCouponValid({
        expiryDate: new Date(Date.now() + 86400000), usageLimit: 10, usageCount: 5, minimumBookingValueEur: 100,
      }, 150), true);
    });

    it('returns false for expired coupon', () => {
      assert.equal(PricingCalculator.isCouponValid({
        expiryDate: new Date(Date.now() - 86400000), usageLimit: 10, usageCount: 5, minimumBookingValueEur: 100,
      }, 150), false);
    });

    it('returns false when usage limit reached', () => {
      assert.equal(PricingCalculator.isCouponValid({
        expiryDate: new Date(Date.now() + 86400000), usageLimit: 5, usageCount: 5, minimumBookingValueEur: 100,
      }, 150), false);
    });

    it('returns false when booking below minimum', () => {
      assert.equal(PricingCalculator.isCouponValid({
        expiryDate: new Date(Date.now() + 86400000), usageLimit: 10, usageCount: 5, minimumBookingValueEur: 200,
      }, 150), false);
    });
  });
});
