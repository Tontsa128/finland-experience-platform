#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const destRepoPath = path.resolve(__dirname, '../src/repositories/FileDestinationRepository.js')
if(!fs.existsSync(destRepoPath)){ console.error('FileDestinationRepository not found'); process.exit(2) }
const FileDestinationRepository = require(destRepoPath).default

async function run(){
  const repo = new FileDestinationRepository()
  console.log('Testing Destination repository...')
  const initial = await repo.list()
  console.log('Initial count:', initial.length)
  const created = await repo.create({ name_es: 'Testville', slug: 'testville' })
  assert(created.id)
  console.log('Created id:', created.id)
  const fetched = await repo.getById(created.id)
  assert(fetched && fetched.name_es === 'Testville')
  const updated = await repo.update(created.id, { region: 'Test Region' })
  assert(updated.region === 'Test Region')
  await repo.delete(created.id)
  const after = await repo.getById(created.id)
  assert(after === null)
  console.log('Destination tests passed')
}
run().catch(err=>{ console.error(err); process.exit(1) })
