import { Experience } from '../types/experience'

export interface ExperienceRepository {
  list(organizationId: string): Promise<Experience[]>
  getById(id: string): Promise<Experience | null>
  getBySlug(slug: string): Promise<Experience | null>
  create(data: Partial<Experience>): Promise<Experience>
  update(id: string, data: Partial<Experience>): Promise<Experience>
  delete(id: string): Promise<void>
  duplicate(id: string): Promise<Experience>
}
