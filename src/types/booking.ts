// Availability and Booking types
export interface AvailabilitySlot {
  id: string
  experience_id: string
  date: string // yyyy-mm-dd
  start_time?: string
  capacity_total: number
  capacity_booked: number
  status?: 'available' | 'sold_out' | 'cancelled'
}

export interface Booking {
  id: string
  experience_id: string
  availability_id: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
  travelers: { adults: number; children?: number; infants?: number }
  total_cents: number
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
}
