export type UUID = string

export interface PricingModel {
  adult: number // cents
  child?: number
  infant?: number
  private_group?: number
  currency: string
}

export type ExperienceStatus = 'draft' | 'published' | 'archived'

export interface Experience {
  id: UUID
  organization_id: string
  slug: string
  title_es: string
  title_fi?: string
  short_description_es?: string
  short_description_fi?: string
  description_es?: string
  description_fi?: string
  destination_id?: string
  category_id?: string
  duration_minutes?: number
  min_age?: number
  capacity_default?: number
  pricing?: PricingModel
  status?: ExperienceStatus
  seo?: { title_es?: string; description_es?: string; title_fi?: string; description_fi?: string }
  media?: string[]
  hero_media_id?: string | null
  created_at?: string
  updated_at?: string
}
