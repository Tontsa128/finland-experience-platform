import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { MediaItem } from '../types/media'

const DB_PATH = path.resolve(process.cwd(), 'data/mockDB.json')

function readDb() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}
function writeDb(obj: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2), 'utf-8')
}

export default class FileMediaRepository {
  async list() {
    const db = readDb()
    return db.media as MediaItem[]
  }

  async getById(id: string) {
    const db = readDb()
    return (db.media as MediaItem[]).find(m => m.id === id) || null
  }

  async create(item: Partial<MediaItem>) {
    const db = readDb()
    const now = new Date().toISOString()
    if (!item.filename) throw new Error('filename required')
    if (!item.url) throw new Error('url required')
    const newItem: MediaItem = {
      id: item.id || uuidv4(),
      filename: item.filename,
      url: item.url,
      alt_text: item.alt_text || '',
      title: item.title || '',
      type: item.type || 'image',
      size_bytes: item.size_bytes || 0,
      width: item.width || 0,
      height: item.height || 0,
      tags: item.tags || [],
      created_at: now,
      is_hero: !!item.is_hero,
      sort_order: typeof item.sort_order === 'number' ? item.sort_order : (db.media.length),
      metadata: item.metadata || {}
    }
    db.media.push(newItem)
    writeDb(db)
    return newItem
  }

  async update(id: string, data: Partial<MediaItem>) {
    const db = readDb()
    const idx = (db.media as MediaItem[]).findIndex(m => m.id === id)
    if (idx === -1) throw new Error('Media not found')
    const now = new Date().toISOString()
    const existing = db.media[idx]
    const updated = { ...existing, ...data, updated_at: now }
    db.media[idx] = updated
    writeDb(db)
    return updated
  }

  async delete(id: string) {
    const db = readDb()
    db.media = (db.media as MediaItem[]).filter(m => m.id !== id)
    // Also remove references from experiences
    db.experiences = db.experiences.map((e: any) => ({ ...e, media: (e.media || []).filter((mid: string) => mid !== id) }))
    writeDb(db)
  }

  async reorder(ids: string[]) {
    const db = readDb()
    const map: Record<string, MediaItem> = {}
    for (const m of db.media) map[m.id] = m
    const newList: MediaItem[] = []
    ids.forEach((id, idx) => {
      if (map[id]) {
        const item = { ...map[id], sort_order: idx }
        newList.push(item)
      }
    })
    // append any missing
    for (const m of db.media) if (!ids.includes(m.id)) newList.push(m)
    db.media = newList
    writeDb(db)
    return db.media
  }
}
