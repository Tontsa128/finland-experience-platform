import fs from 'fs'
import path from 'path'
import { Booking } from '../types/booking'
import { v4 as uuidv4 } from 'uuid'

const DB_PATH = path.resolve(process.cwd(), 'data/mockDB.json')

function readDb() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) }
function writeDb(obj: any) { fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2), 'utf-8') }

export default class FileBookingRepository {
  async list(experienceId?: string) {
    const db = readDb()
    let all = db.bookings || []
    if (experienceId) all = all.filter((b: Booking) => b.experience_id === experienceId)
    return all
  }
  async getById(id: string) {
    const db = readDb()
    return (db.bookings || []).find((b: Booking) => b.id === id) || null
  }
  async create(data: Partial<Booking>) {
    const db = readDb()
    const now = new Date().toISOString()
    const item: Booking = {
      id: data.id || uuidv4(),
      experience_id: data.experience_id || '',
      availability_id: data.availability_id || '',
      status: data.status || 'confirmed',
      created_at: now,
      travelers: data.travelers || { adults: 0 },
      total_cents: data.total_cents || 0,
      payment_status: data.payment_status || 'paid',
      payment_method: data.payment_method || ''
    }
    db.bookings = db.bookings || []
    db.bookings.push(item)
    writeDb(db)
    return item
  }
  async update(id: string, data: Partial<Booking>) {
    const db = readDb()
    db.bookings = db.bookings || []
    const idx = db.bookings.findIndex((b: Booking) => b.id === id)
    if (idx === -1) throw new Error('Not found')
    db.bookings[idx] = { ...db.bookings[idx], ...data }
    writeDb(db)
    return db.bookings[idx]
  }
  async delete(id: string) {
    const db = readDb()
    db.bookings = (db.bookings || []).filter((b: Booking) => b.id !== id)
    writeDb(db)
  }
}
