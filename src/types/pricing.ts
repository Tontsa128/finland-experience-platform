export interface PricingLine {
  description: string
  unit_price_cents: number
  quantity: number
  line_total_cents: number
  tax_rate: number
  tax_cents: number
}

export interface PricingBreakdown {
  base: PricingLine[]
  addons: PricingLine[]
  discounts: { description: string; amount_cents: number }[]
  subtotal_cents: number
  tax_cents: number
  total_cents: number
}
