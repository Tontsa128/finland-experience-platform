import fs from 'fs'
import path from 'path'
import { PricingLine, PricingBreakdown } from '../types/pricing'

const DB_PATH = path.resolve(process.cwd(), 'data/mockDB.json')

function readDb() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) }

function toDateKey(d: string) { return new Date(d + 'T00:00:00Z') }

function isDateInRange(date: Date, start: string, end: string) {
  const s = toDateKey(start)
  const e = toDateKey(end)
  return date >= s && date <= e
}

export default class PricingService {
  static async calculate(payload: {
    experience_id: string
    date: string // yyyy-mm-dd
    adults: number
    children?: number
    infants?: number
    is_private?: boolean
    addons?: { id: string; quantity: number }[]
    coupon_code?: string | null
  }): Promise<PricingBreakdown> {
    const db = readDb()
    const exp = db.experiences.find((e: any) => e.id === payload.experience_id || e.slug === payload.experience_id)
    if (!exp) throw new Error('Experience not found')

    const date = new Date(payload.date + 'T00:00:00Z')
    const day = date.getUTCDay()
    const isWeekend = (day === 6 || day === 0) // Saturday=6, Sunday=0

    const seasons = db.seasons || []
    let seasonMultiplier = 1.0
    for (const s of seasons) {
      if (isDateInRange(date, s.start_date, s.end_date)) {
        seasonMultiplier = Math.max(seasonMultiplier, s.multiplier || 1)
      }
    }

    // Weekend multiplier (example: +10%)
    const weekendMultiplier = isWeekend ? 1.10 : 1.0

    // Base prices from experience (cents)
    const adults = payload.adults || 0
    const children = payload.children || 0
    const infants = payload.infants || 0

    const pricing = exp.pricing || { adult: 0, child: 0, infant: 0, currency: 'EUR' }

    // Apply seasonal & weekend multipliers to base prices
    const adultUnit = Math.round(pricing.adult * seasonMultiplier * weekendMultiplier)
    const childUnit = Math.round((pricing.child || Math.round(pricing.adult * 0.75)) * seasonMultiplier * weekendMultiplier)
    const infantUnit = Math.round((pricing.infant || 0) * seasonMultiplier * weekendMultiplier)

    const baseLines: PricingLine[] = []
    if (adults > 0) baseLines.push({ description: 'Adulto', unit_price_cents: adultUnit, quantity: adults, line_total_cents: adultUnit * adults, tax_rate: PricingService.getTaxRateForExperience(db, exp), tax_cents: 0 })
    if (children > 0) baseLines.push({ description: 'Niño', unit_price_cents: childUnit, quantity: children, line_total_cents: childUnit * children, tax_rate: PricingService.getTaxRateForExperience(db, exp), tax_cents: 0 })
    if (infants > 0) baseLines.push({ description: 'Infante', unit_price_cents: infantUnit, quantity: infants, line_total_cents: infantUnit * infants, tax_rate: PricingService.getTaxRateForExperience(db, exp), tax_cents: 0 })

    // Add-ons
    const addonsLines: PricingLine[] = []
    if (payload.addons && Array.isArray(payload.addons)) {
      for (const a of payload.addons) {
        const addon = (db.addons || []).find((x: any) => x.id === a.id)
        if (!addon) continue
        let unit = addon.price_cents || 0
        if (addon.pricing_model === 'per_person') unit = unit * (adults + children + infants)
        const qty = addon.pricing_model === 'per_booking' ? 1 : (a.quantity || 1)
        const lineTotal = unit * qty
        const taxRate = PricingService.getTaxRateForAddon(db, addon)
        addonsLines.push({ description: addon.title_es || addon.title_fi || addon.id, unit_price_cents: unit, quantity: qty, line_total_cents: lineTotal, tax_rate: taxRate, tax_cents: 0 })
      }
    }

    // Subtotal before discounts
    const subtotal = baseLines.reduce((s, l) => s + l.line_total_cents, 0) + addonsLines.reduce((s, l) => s + l.line_total_cents, 0)

    // Promotions & coupons
    const discounts: { description: string; amount_cents: number }[] = []
    // Apply promotions (season-targeted)
    const promos = db.promotions || []
    for (const p of promos) {
      if (!p.active) continue
      if (p.target && p.target.type === 'season') {
        const season = seasons.find((s: any) => s.id === p.target.season_id)
        if (season && isDateInRange(date, season.start_date, season.end_date)) {
          const amount = Math.round(subtotal * ((p.discount_percent || 0) / 100))
          if (amount > 0) discounts.push({ description: p.name, amount_cents: amount })
        }
      }
    }
    // Coupon
    if (payload.coupon_code) {
      const coupon = (db.coupons || []).find((c: any) => c.code === payload.coupon_code && c.active)
      if (coupon) {
        if (!coupon.expires_at || new Date(coupon.expires_at) > new Date()) {
          if (!coupon.min_purchase_cents || subtotal >= coupon.min_purchase_cents) {
            const amount = coupon.discount_percent ? Math.round(subtotal * (coupon.discount_percent / 100)) : (coupon.discount_cents || 0)
            if (amount > 0) discounts.push({ description: `Coupon ${coupon.code}`, amount_cents: amount })
          }
        }
      }
    }

    const discountTotal = discounts.reduce((s, d) => s + d.amount_cents, 0)
    const taxedSubtotal = Math.max(0, subtotal - discountTotal)

    // Calculate taxes per line
    let totalTax = 0
    for (const l of baseLines) {
      const lineTax = Math.round(l.line_total_cents * l.tax_rate)
      l.tax_cents = lineTax
      totalTax += lineTax
    }
    for (const l of addonsLines) {
      const lineTax = Math.round(l.line_total_cents * l.tax_rate)
      l.tax_cents = lineTax
      totalTax += lineTax
    }

    const total = taxedSubtotal + totalTax

    const breakdown: PricingBreakdown = {
      base: baseLines,
      addons: addonsLines,
      discounts: discounts,
      subtotal_cents: subtotal,
      tax_cents: totalTax,
      total_cents: total
    }

    return breakdown
  }

  static getTaxRateForExperience(db: any, exp: any) {
    // By default experiences (guided activities) use general rate 25.5% unless marked as accommodation/transport
    // For demo, use category-based rule or exp.tax_id
    if (exp && exp.category_id === 'cat-sauna') return PricingService.getVatRateById(db, 'vat-25_5')
    // Example: if addon type or experience indicates vat-10 use that
    return PricingService.getVatRateById(db, 'vat-25_5')
  }

  static getTaxRateForAddon(db: any, addon: any) {
    if (addon && addon.type_tax) return PricingService.getVatRateById(db, addon.type_tax)
    return PricingService.getVatRateById(db, 'vat-25_5')
  }

  static getVatRateById(db: any, id: string) {
    const vat = (db.vat_rates || []).find((v: any) => v.id === id)
    return vat ? vat.rate : 0.0
  }
}
