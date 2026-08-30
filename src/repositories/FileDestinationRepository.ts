import fs from 'fs'
import path from 'path'
import { Destination } from '../types/destination'
import { v4 as uuidv4 } from 'uuid'

const DB_PATH = path.resolve(process.cwd(), 'data/mockDB.json')

function readDb() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) }
function writeDb(obj: any) { fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2), 'utf-8') }

export default class FileDestinationRepository {
  async list() {
    const db = readDb()
    return db.destinations as Destination[]
  }
  async getById(id: string) {
    const db = readDb()
    return db.destinations.find((d: Destination)=>d.id===id) || null
  }
  async create(data: Partial<Destination>){
    const db = readDb()
    const now = new Date().toISOString()
    const item: Destination = {
      id: data.id || uuidv4(),
      slug: data.slug || (data.name_es ? slugify(data.name_es) : 'untitled-'+Date.now()),
      name_es: data.name_es || 'Untitled',
      name_fi: data.name_fi || '',
      description_es: data.description_es || '',
      description_fi: data.description_fi || '',
      hero_image_id: data.hero_image_id || null,
      gallery: data.gallery || [],
      latitude: data.latitude,
      longitude: data.longitude,
      region: data.region || '',
      best_season: data.best_season || '',
      travel_info_es: data.travel_info_es || '',
      travel_info_fi: data.travel_info_fi || '',
      highlights: data.highlights || [],
      faq: data.faq || [],
      seo: data.seo || {},
      created_at: now,
      updated_at: now
    }
    db.destinations.push(item)
    writeDb(db)
    return item
  }
  async update(id:string, data: Partial<Destination>){
    const db = readDb()
    const idx = db.destinations.findIndex((d: Destination)=>d.id===id)
    if(idx===-1) throw new Error('Not found')
    const now = new Date().toISOString()
    db.destinations[idx] = { ...db.destinations[idx], ...data, updated_at: now }
    writeDb(db)
    return db.destinations[idx]
  }
  async delete(id:string){
    const db = readDb()
    db.destinations = db.destinations.filter((d: Destination)=>d.id!==id)
    // remove destination reference from experiences
    db.experiences = db.experiences.map((e:any)=> e.destination_id===id ? { ...e, destination_id: null } : e)
    writeDb(db)
  }
}

function slugify(s: string){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') }
