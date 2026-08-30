import fs from 'fs'
import path from 'path'
import { Experience } from '../types/experience'
import { v4 as uuidv4 } from 'uuid'

const DB_PATH = path.resolve(process.cwd(), 'data/mockDB.json')

function readDb() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}
function writeDb(obj: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2), 'utf-8')
}

export default class FileExperienceRepository {
  async list(organizationId: string) {
    const db = readDb()
    return db.experiences.filter((e: Experience) => e.organization_id === organizationId)
  }

  async getById(id: string) {
    const db = readDb()
    return db.experiences.find((e: Experience) => e.id === id) || null
  }

  async getBySlug(slug: string) {
    const db = readDb()
    return db.experiences.find((e: Experience) => e.slug === slug) || null
  }

  async create(data: Partial<Experience>) {
    const db = readDb()
    const now = new Date().toISOString()
    const newExp: Experience = {
      id: data.id || uuidv4(),
      organization_id: data.organization_id || 'org-0001',
      slug: data.slug || (data.title_es ? slugify(data.title_es) : 'untitled-' + Date.now()),
      title_es: data.title_es || 'Untitled',
      title_fi: data.title_fi || '',
      short_description_es: data.short_description_es || '',
      short_description_fi: data.short_description_fi || '',
      description_es: data.description_es || '',
      description_fi: data.description_fi || '',
      destination_id: data.destination_id || null,
      category_id: data.category_id || null,
      duration_minutes: data.duration_minutes || 0,
      min_age: data.min_age || 0,
      capacity_default: data.capacity_default || 0,
      pricing: data.pricing || { adult: 0, currency: 'EUR' },
      status: data.status || 'draft',
      seo: data.seo || {},
      media: data.media || [],
      created_at: now,
      updated_at: now
    }
    db.experiences.push(newExp)
    writeDb(db)
    return newExp
  }

  async update(id: string, data: Partial<Experience>) {
    const db = readDb()
    const idx = db.experiences.findIndex((e: Experience) => e.id === id)
    if (idx === -1) throw new Error('Not found')
    const now = new Date().toISOString()
    db.experiences[idx] = { ...db.experiences[idx], ...data, updated_at: now }
    writeDb(db)
    return db.experiences[idx]
  }

  async delete(id: string) {
    const db = readDb()
    db.experiences = db.experiences.filter((e: Experience) => e.id !== id)
    writeDb(db)
  }

  async duplicate(id: string) {
    const db = readDb()
    const found = db.experiences.find((e: Experience) => e.id === id)
    if (!found) throw new Error('Not found')
    const copy = { ...found, id: uuidv4(), slug: found.slug + '-copy', title_es: found.title_es + ' (copy)', status: 'draft', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    db.experiences.push(copy)
    writeDb(db)
    return copy
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
