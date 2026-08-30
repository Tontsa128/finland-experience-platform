import { MediaItem } from '../types/media'

export interface MediaRepository {
  list(organizationId?: string): Promise<MediaItem[]>
  getById(id: string): Promise<MediaItem | null>
  create(item: Partial<MediaItem>): Promise<MediaItem>
  update(id: string, data: Partial<MediaItem>): Promise<MediaItem>
  delete(id: string): Promise<void>
  reorder(ids: string[]): Promise<MediaItem[]>
}
