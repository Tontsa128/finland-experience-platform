import fs from 'fs'
import path from 'path'
import { AvailabilitySlot } from '../types/booking'
import { v4 as uuidv4 } from 'uuid'

const DB_PATH = path.resolve(process.cwd(), 'data/mockDB.json')

function readDb() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) }
function writeDb(obj: any) { fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2), 'utf-8') }

export default class FileAvailabilityRepository {
  async list(experienceId?: string) {
    const db = readDb()
    let all = db.availability || []
    if (experienceId) all = all.filter((a: AvailabilitySlot) => a.experience_id === experienceId)
    return all
  }
  async getById(id: string) {
    const db = readDb()
    return (db.availability || []).find((a: AvailabilitySlot) => a.id === id) || null
  }
  async create(data: Partial<AvailabilitySlot>) {
    const db = readDb()
    const now = new Date().toISOString()
    const item: AvailabilitySlot = {
      id: data.id || uuidv4(),
      experience_id: data.experience_id || '',
      date: data.date || '',
      start_time: data.start_time || '',
      capacity_total: data.capacity_total || 0,
      capacity_booked: data.capacity_booked || 0,
      status: data.status || 'available'
    }
    db.availability = db.availability || []
    db.availability.push(item)
    writeDb(db)
    return item
  }
  async update(id: string, data: Partial<AvailabilitySlot>) {
    const db = readDb()
    db.availability = db.availability || []
    const idx = db.availability.findIndex((a: AvailabilitySlot) => a.id === id)
    if (idx === -1) throw new Error('Not found')
    db.availability[idx] = { ...db.availability[idx], ...data }
    writeDb(db)
    return db.availability[idx]
  }
  async delete(id: string) {
    const db = readDb()
    db.availability = (db.availability || []).filter((a: AvailabilitySlot) => a.id !== id)
    writeDb(db)
  }
  async reserveSlot(id: string, seats: number) {
    // Simple atomic-like reserve using a lock file
    const lockPath = DB_PATH + '.lock'
    const maxAttempts = 5
    let attempt = 0
    while (true) {
      try {
        const fd = fs.openSync(lockPath, 'wx')
        fs.closeSync(fd)
        // inside lock
        const db = readDb()
        const slotIdx = (db.availability || []).findIndex((a: AvailabilitySlot) => a.id === id)
        if (slotIdx === -1) {
          fs.unlinkSync(lockPath)
          throw new Error('Availability not found')
        }
        const slot = db.availability[slotIdx]
        const available = slot.capacity_total - (slot.capacity_booked || 0)
        if (available < seats) {
          fs.unlinkSync(lockPath)
          throw new Error('Not enough capacity')
        }
        db.availability[slotIdx].capacity_booked = (db.availability[slotIdx].capacity_booked || 0) + seats
        writeDb(db)
        fs.unlinkSync(lockPath)
        return db.availability[slotIdx]
      } catch (err:any) {
        if (err.code === 'EEXIST') {
          // lock exists, retry
          attempt++
          if (attempt > maxAttempts) throw new Error('Could not acquire lock')
          await new Promise(r=>setTimeout(r, 50))
          continue
        }
        throw err
      }
    }
  }
}
