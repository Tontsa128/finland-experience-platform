const fs = require('fs')
const path = require('path')
const assert = require('assert')

const repoPath = path.resolve(__dirname, '../src/repositories/FileMediaRepository.js')
if (!fs.existsSync(repoPath)) {
  console.error('Repository implementation not found at', repoPath)
  process.exit(2)
}

const FileMediaRepository = require(repoPath).default

async function run() {
  const repo = new FileMediaRepository()
  console.log('Running media repository tests...')

  // Initial list
  const initial = await repo.list()
  console.log('Initial media count:', initial.length)

  // Create
  const created = await repo.create({ filename: 'test.jpg', url: 'https://placehold.co/800x600?text=Test', type: 'image' })
  assert(created.id, 'created id')
  console.log('Created id:', created.id)

  // Read
  const fetched = await repo.getById(created.id)
  assert(fetched && fetched.filename === 'test.jpg')

  // Update
  const updated = await repo.update(created.id, { alt_text: 'alt test', title: 'Test image' })
  assert(updated.alt_text === 'alt test')

  // Reorder
  const all = await repo.list()
  const ids = all.map(m=>m.id).reverse()
  const reordered = await repo.reorder(ids)
  assert(Array.isArray(reordered) && reordered[0].id === ids[0])

  // Set hero via update
  const heroUpdated = await repo.update(created.id, { is_hero: true })
  assert(heroUpdated.is_hero === true)

  // Delete
  await repo.delete(created.id)
  const after = await repo.getById(created.id)
  assert(after === null)

  console.log('All media tests passed')
}

run().catch(err=>{ console.error(err); process.exit(1) })
