export interface Destination {
  id: string
  slug: string
  name_es: string
  name_fi?: string
  description_es?: string
  description_fi?: string
  hero_image_id?: string | null
  gallery?: string[]
  latitude?: number
  longitude?: number
  region?: string
  best_season?: string
  travel_info_es?: string
  travel_info_fi?: string
  highlights?: string[]
  faq?: any[]
  seo?: Record<string, any>
  created_at?: string
  updated_at?: string
}
