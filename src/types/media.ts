export interface MediaItem {
  id: string
  filename: string
  url: string
  alt_text?: string
  title?: string
  type: 'image' | 'video' | 'external'
  size_bytes?: number
  width?: number
  height?: number
  tags?: string[]
  created_at?: string
  is_hero?: boolean
  sort_order?: number
  metadata?: Record<string, any>
}
