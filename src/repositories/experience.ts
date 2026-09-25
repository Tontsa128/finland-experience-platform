import type { Experience, ExperienceTranslation } from '@/types';

export interface IExperienceRepository {
  getAll(): Promise<Experience[]>;
  getById(id: number): Promise<Experience | null>;
  getBySlug(slug: string): Promise<Experience | null>;
  create(experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience>;
  update(id: number, data: Partial<Experience>): Promise<Experience>;
  delete(id: number): Promise<void>;
  getTranslations(experienceId: number): Promise<ExperienceTranslation[]>;
}

export class MockExperienceRepository implements IExperienceRepository {
  private experiences: Experience[] = [];
  private translations: ExperienceTranslation[] = [];
  private nextId = 1;

  constructor(initialExperiences: Experience[], initialTranslations: ExperienceTranslation[]) {
    this.experiences = initialExperiences;
    this.translations = initialTranslations;
    const numericIds = initialExperiences.map((e) => Number(e.id)).filter((id) => Number.isFinite(id));
    this.nextId = Math.max(...numericIds, 0) + 1;
  }

  async getAll(): Promise<Experience[]> {
    return this.experiences.filter((e) => e.status !== 'archived');
  }

  async getById(id: number): Promise<Experience | null> {
    return this.experiences.find((e) => e.id === id) || null;
  }

  async getBySlug(slug: string): Promise<Experience | null> {
    return this.experiences.find((e) => e.slug === slug) || null;
  }

  async create(experience: Partial<Experience>): Promise<Experience> {
    const newExperience = {
      ...experience,
      id: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Experience;
    this.experiences.push(newExperience);
    return newExperience;
  }

  async update(id: number, data: Partial<Experience>): Promise<Experience> {
    const experience = this.experiences.find((e) => e.id === id);
    if (!experience) {
      throw new Error(`Experience with id ${id} not found`);
    }
    Object.assign(experience, data, { updatedAt: new Date() });
    return experience;
  }

  async delete(id: number): Promise<void> {
    const index = this.experiences.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.experiences.splice(index, 1);
    }
  }

  async getTranslations(experienceId: number): Promise<ExperienceTranslation[]> {
    return this.translations.filter((t) => t.experienceId === experienceId);
  }
}
