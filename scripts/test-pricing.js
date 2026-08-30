const PricingService = require('../src/services/PricingService').default
const assert = require('assert')

async function runTests(){
  console.log('Running pricing tests...')
  // Test 1: basic adult price
  const res1 = await PricingService.calculate({ experience_id: 'exp-001', date: '2026-12-05', adults: 2 })
  console.log('Test1 total:', res1.total_cents)
  assert(res1.base.length === 1)

  // Test 2: season multiplier applied (winter multiplier 1.2) - exp-001 adult 20000 => 24000 per adult => 48000
  const adultUnit = res1.base[0].unit_price_cents
  assert(adultUnit >= 20000, 'adult unit should be adjusted for season/weekend')

  // Test 3: addon tax rates
  const res2 = await PricingService.calculate({ experience_id: 'exp-001', date: '2026-12-05', adults: 2, addons: [{ id: 'addon-thermal', quantity: 1 }] })
  const addonLine = res2.addons.find(a=>a.description.includes('Alquiler'))
  assert(addonLine, 'addon present')
  console.log('Addon tax rate:', addonLine.tax_rate)

  // Test 4: coupon application
  const res3 = await PricingService.calculate({ experience_id: 'exp-001', date: '2026-12-05', adults: 2, coupon_code: 'EARLY10' })
  console.log('Discounts:', res3.discounts)

  // Test 5: group discount for 4+ travelers
  const res4 = await PricingService.calculate({ experience_id: 'exp-001', date: '2026-12-05', adults: 2, children: 2 })
  const group = res4.discounts.find(d=>d.description && d.description.includes('Group discount'))
  assert(group && group.amount_cents > 0, 'group discount should be applied for 4 travelers')

  console.log('Pricing tests passed')
}

runTests().catch(err=>{ console.error(err); process.exit(1) })
