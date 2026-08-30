# Pricing Service

This document describes the PricingService implementation and how it handles VAT rates, seasons, coupons, promotions and add-ons.

Key business rules implemented
- Prices are stored in cents (integer) to avoid float precision issues.
- Seasonal multipliers: defined in data/mockDB.json under `seasons`. The service applies the highest matching season multiplier for the travel date.
- Weekend multiplier: applies a fixed multiplier (1.10) for Saturdays and Sundays.
- VAT rates: configured in `vat_rates` (data/mockDB.json). The service maps experiences and add-ons to VAT rate ids and applies tax per-line.
  - vat-10 (10%) is used for e.g. transfers and accommodation; vat-25_5 (25.5%) for general experiences and add-ons.
- Group pricing: base prices are multiplied by the number of travelers (adults/children/infants). Child price defaults to 75% of adult if not provided.
- Coupons & promotions: coupons are matched by code and applied if active and min_purchase is met. Promotions applied based on season targets.
- Add-ons: support per_person and per_booking pricing models; taxes are calculated per add-on using addon's `type_tax` field.
- Rounding: all intermediate price adjustments are rounded to the nearest integer cent using Math.round.

API
- POST /api/pricing/calc (implemented under app/api/pricing/calc/route.ts)
  Request body: { experience_id, date, adults, children, infants, is_private, addons: [{id, quantity}], coupon_code }
  Response: PricingBreakdown (see src/types/pricing.ts)

Testing
- Run: npm run test
- The test suite runs media tests and pricing tests (scripts/test-media.js and scripts/test-pricing.js).

Notes for production
- Replace File-based repositories with Supabase/Postgres-backed repositories for concurrency and persistence.
- VAT rules, seasonal definitions and promotions should be manageable via admin UI (Settings / Promotions sections) — currently they are defined in data/mockDB.json for demo.
- All price calculations happen server-side to prevent client-side manipulation.
