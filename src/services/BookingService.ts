import FileAvailabilityRepository from '@/repositories/FileAvailabilityRepository'
import FileBookingRepository from '@/repositories/FileBookingRepository'
import PricingService from '@/services/PricingService'

const availRepo = new FileAvailabilityRepository()
const bookingRepo = new FileBookingRepository()

export default class BookingService {
  static async createBooking(payload: { experience_id: string, availability_id: string, adults: number, children?: number, infants?: number, addons?: any[], coupon_code?: string | null }) {
    const seats = (payload.adults || 0) + (payload.children || 0) + (payload.infants || 0)
    if (seats <= 0) throw new Error('No travelers')

    const availability = await availRepo.reserveSlot(payload.availability_id, seats)
    const breakdown = await PricingService.calculate({
      experience_id: payload.experience_id,
      date: availability.date || new Date().toISOString().slice(0, 10),
      adults: payload.adults || 0,
      children: payload.children || 0,
      infants: payload.infants || 0,
      addons: payload.addons,
      coupon_code: payload.coupon_code,
    })

    return bookingRepo.create({
      experience_id: payload.experience_id,
      availability_id: payload.availability_id,
      travelers: {
        adults: payload.adults || 0,
        children: payload.children || 0,
        infants: payload.infants || 0,
      },
      total_cents: breakdown.total_cents,
      payment_status: 'paid',
      payment_method: 'mock',
    })
  }

  static async cancelBooking(bookingId: string) {
    const booking = await bookingRepo.getById(bookingId)
    if (!booking) throw new Error('Booking not found')
    if (booking.status === 'cancelled') throw new Error('Already cancelled')

    const db = await availRepo.getById(booking.availability_id)
    if (db) {
      const seats = (booking.travelers?.adults || 0) + (booking.travelers?.children || 0) + (booking.travelers?.infants || 0)
      await availRepo.update(db.id, {
        capacity_booked: Math.max(0, (db.capacity_booked || 0) - seats),
      })
    }

    return bookingRepo.update(bookingId, {
      status: 'cancelled',
      payment_status: 'refunded',
    })
  }
}
