import FileAvailabilityRepository from '../../../src/repositories/FileAvailabilityRepository'
import FileBookingRepository from '../../../src/repositories/FileBookingRepository'
import PricingService from '../../../src/services/PricingService'

const availRepo = new FileAvailabilityRepository()
const bookingRepo = new FileBookingRepository()

export default class BookingService {
  static async createBooking(payload: { experience_id: string, availability_id: string, adults: number, children?: number, infants?: number, addons?: any[], coupon_code?: string|null }) {
    // 1. Check availability and reserve seats (atomic-like)
    const seats = (payload.adults || 0) + (payload.children || 0) + (payload.infants || 0)
    if (seats <= 0) throw new Error('No travelers')
    // reserve
    await availRepo.reserveSlot(payload.availability_id, seats)
    // calculate price via PricingService
    const dateObj = await (async ()=>{
      // fetch availability to get date
      const av = await availRepo.getById(payload.availability_id)
      return av ? av.date : undefined
    })()
    const breakdown = await PricingService.calculate({ experience_id: payload.experience_id, date: dateObj || new Date().toISOString().slice(0,10), adults: payload.adults||0, children: payload.children||0, infants: payload.infants||0, addons: payload.addons, coupon_code: payload.coupon_code })
    const total = breakdown.total_cents
    // create booking
    const booking = await bookingRepo.create({ experience_id: payload.experience_id, availability_id: payload.availability_id, travelers: { adults: payload.adults, children: payload.children, infants: payload.infants }, total_cents: total, payment_status: 'paid', payment_method: 'mock' })
    return { booking, breakdown }
  }

  static async cancelBooking(bookingId: string) {
    const b = await bookingRepo.getById(bookingId)
    if (!b) throw new Error('Booking not found')
    if (b.status === 'cancelled') throw new Error('Already cancelled')
    // reduce booked capacity
    const avail = await (async ()=>{ const ar = new FileAvailabilityRepository(); return ar.getById(b.availability_id) })()
    if (avail) {
      const dbPath = require('path').resolve(process.cwd(), 'data/mockDB.json')
      const raw = require('fs').readFileSync(dbPath, 'utf-8')
      const db = JSON.parse(raw)
      const idx = (db.availability||[]).findIndex((a:any)=>a.id===avail.id)
      if (idx!==-1) {
        db.availability[idx].capacity_booked = Math.max(0, (db.availability[idx].capacity_booked || 0) - ((b.travelers?.adults||0) + (b.travelers?.children||0) + (b.travelers?.infants||0)))
        require('fs').writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
      }
    }
    const updated = await bookingRepo.update(bookingId, { status: 'cancelled', payment_status: 'refunded' })
    return updated
  }
}
