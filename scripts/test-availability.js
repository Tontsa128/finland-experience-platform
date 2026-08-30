const FileAvailabilityRepository = require('../src/repositories/FileAvailabilityRepository').default
const FileBookingRepository = require('../src/repositories/FileBookingRepository').default
const assert = require('assert')

async function run(){
  console.log('Running availability & booking tests...')
  const availRepo = new FileAvailabilityRepository()
  const bookRepo = new FileBookingRepository()

  // Create availability with capacity 1
  const slot = await availRepo.create({ experience_id: 'exp-001', date: '2026-12-31', start_time: '20:00', capacity_total: 1, capacity_booked: 0 })
  console.log('Created slot', slot.id)

  // First booking should succeed
  try{
    await availRepo.reserveSlot(slot.id, 1)
    console.log('First reservation succeeded')
  }catch(err){ console.error('First reservation failed', err); process.exit(1) }

  // Second reservation should fail due to capacity
  try{
    await availRepo.reserveSlot(slot.id, 1)
    console.error('Second reservation unexpectedly succeeded')
    process.exit(1)
  }catch(err){ console.log('Second reservation failed as expected:', err.message) }

  // Cleanup
  await availRepo.delete(slot.id)
  console.log('Availability & booking tests passed')
}

run().catch(err=>{ console.error(err); process.exit(1) })
