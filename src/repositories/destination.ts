import type { Destination, DestinationTranslation } from '@/types';

export interface IDestinationRepository {
  getAll(): Promise<Destination[]>;
  getById(id: number): Promise<Destination | null>;
  getBySlug(slug: string): Promise<Destination | null>;
  create(destination: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Destination>;
  update(id: number, data: Partial<Destination>): Promise<Destination>;
  delete(id: number): Promise<void>;
  getTranslations(destinationId: number): Promise<DestinationTranslation[]>;
}

export class MockDestinationRepository implements IDestinationRepository {
  private destinations: Destination[] = [];
  private translations: DestinationTranslation[] = [];
  private nextId = 1;

  constructor(
    initialDestinations: Destination[],
    initialTranslations: DestinationTranslation[]
  ) {
    this.destinations = initialDestinations;
    this.translations = initialTranslations;
    this.nextId = Math.max(...initialDestinations.map((d) => d.id), 0) + 1;
  }

  async getAll(): Promise<Destination[]> {
    return this.destinations.filter((d) => d.status !== 'archived');
  }

  async getById(id: number): Promise<Destination | null> {
    return this.destinations.find((d) => d.id === id) || null;
  }

  async getBySlug(slug: string): Promise<Destination | null> {
    return this.destinations.find((d) => d.slug === slug) || null;
  }

  async create(
    destination: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Destination> {
    const newDestination: Destination = {
      ...destination,
      id: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.destinations.push(newDestination);
    return newDestination;
  }

  async update(id: number, data: Partial<Destination>): Promise<Destination> {
    const destination = this.destinations.find((d) => d.id === id);
    if (!destination) {
      throw new Error(`Destination with id ${id} not found`);
    }
    Object.assign(destination, data, { updatedAt: new Date() });
    return destination;
  }

  async delete(id: number): Promise<void> {
    const index = this.destinations.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.destinations.splice(index, 1);
    }
  }

  async getTranslations(destinationId: number): Promise<DestinationTranslation[]> {
    return this.translations.filter((t) => t.destinationId === destinationId);
  }
}
