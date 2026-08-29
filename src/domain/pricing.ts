import type { PricingRule, SeasonalPricing, Addon } from '@/types';

export interface PricingCalculationInput {
  basePriceEur: number;
  adultCount: number;
  childCount: number;
  adultPriceEur: number;
  childPriceEur: number;
  privateGroup: boolean;
  privateGroupMultiplier: number;
  seasonalMultiplier: number;
  addons: Array<{ quantity: number; priceEur: number }>;
  couponDiscountEur: number;
}

export interface PricingBreakdown {
  basePriceEur: number;
  adultTotalEur: number;
  childTotalEur: number;
  privateGroupSurchargeEur: number;
  subtotalEur: number;
  seasonalAdjustmentEur: number;
  addonsTotalEur: number;
  couponDiscountEur: number;
  taxesEur: number;
  totalEur: number;
}

/**
 * Core pricing calculation engine
 * All pricing logic MUST go through this module, not in React components
 */
export class PricingCalculator {
  /**
   * Calculate full pricing breakdown
   */
  static calculateBreakdown(input: PricingCalculationInput): PricingBreakdown {
    // Base price
    const basePrice = input.basePriceEur;

    // Adult pricing
    const adultTotal = input.adultCount * (input.adultPriceEur || basePrice);

    // Child pricing
    const childTotal = input.childCount * (input.childPriceEur || 0);

    // Private group surcharge
    const privateGroupSurcharge = input.privateGroup
      ? (adultTotal + childTotal) * (input.privateGroupMultiplier - 1)
      : 0;

    // Subtotal before seasonal adjustment
    const subtotal = basePrice + adultTotal + childTotal + privateGroupSurcharge;

    // Seasonal adjustment
    const seasonalAdjustment =
      (adultTotal + childTotal) * (input.seasonalMultiplier - 1);

    // Add-ons
    const addonsTotal = input.addons.reduce(
      (sum, addon) => sum + addon.quantity * addon.priceEur,
      0
    );

    // Subtotal after all adjustments
    const subtotalWithAddons =
      subtotal + seasonalAdjustment + addonsTotal - input.couponDiscountEur;

    // Taxes (if applicable - can be configured in settings)
    const taxes = 0; // TODO: Implement tax calculation based on settings

    return {
      basePriceEur: basePrice,
      adultTotalEur: adultTotal,
      childTotalEur: childTotal,
      privateGroupSurchargeEur: privateGroupSurcharge,
      subtotalEur: subtotal,
      seasonalAdjustmentEur: seasonalAdjustment,
      addonsTotalEur: addonsTotal,
      couponDiscountEur: input.couponDiscountEur,
      taxesEur: taxes,
      totalEur: Math.max(0, subtotalWithAddons + taxes),
    };
  }

  /**
   * Calculate discount amount for a coupon
   */
  static calculateCouponDiscount(
    subtotalEur: number,
    coupon: { discountType: 'percentage' | 'fixed'; discountValue: number }
  ): number {
    if (coupon.discountType === 'percentage') {
      return (subtotalEur * coupon.discountValue) / 100;
    }
    return coupon.discountValue;
  }

  /**
   * Check if coupon is valid for this booking
   */
  static isCouponValid(
    coupon: {
      expiryDate: Date | null;
      usageLimit: number | null;
      usageCount: number;
      minimumBookingValueEur: number | null;
    },
    subtotalEur: number
  ): boolean {
    // Check expiry
    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return false;
    }

    // Check usage limit
    if (
      coupon.usageLimit !== null &&
      coupon.usageCount >= coupon.usageLimit
    ) {
      return false;
    }

    // Check minimum booking value
    if (
      coupon.minimumBookingValueEur !== null &&
      subtotalEur < coupon.minimumBookingValueEur
    ) {
      return false;
    }

    return true;
  }
}
