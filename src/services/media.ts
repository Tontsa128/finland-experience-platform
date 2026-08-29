import type { Media } from '@/types';
import { MOCK_MEDIA } from '@/lib/mock-data/media';

export interface MediaUploadInput {
  url: string;
  altTextEs: string;
  altTextFi: string;
  captionEs?: string;
  captionFi?: string;
  copyright?: string;
  isHero?: boolean;
}

export class MediaService {
  /**
   * Get all media
   */
  static async getAll() {
    return MOCK_MEDIA;
  }

  /**
   * Get media by ID
   */
  static async getById(id: number) {
    return MOCK_MEDIA.find((m) => m.id === id);
  }

  /**
   * Get media for experience
   */
  static async getExperienceMedia(experienceId: number) {
    return MOCK_MEDIA.filter((m) => m.experienceId === experienceId).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }

  /**
   * Get media for destination
   */
  static async getDestinationMedia(destinationId: number) {
    return MOCK_MEDIA.filter((m) => m.destinationId === destinationId).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }

  /**
   * Upload media (demo)
   * In production, this would upload to Supabase Storage
   */
  static async upload(
    experienceId: number | null,
    destinationId: number | null,
    data: MediaUploadInput
  ): Promise<Media> {
    const maxId = Math.max(...MOCK_MEDIA.map((m) => m.id), 0);
    const media: Media = {
      id: maxId + 1,
      experienceId,
      destinationId,
      mediaType: 'image',
      url: data.url,
      altTextEs: data.altTextEs,
      altTextFi: data.altTextFi,
      captionEs: data.captionEs || '',
      captionFi: data.captionFi || '',
      copyright: data.copyright || '',
      sortOrder: Math.max(...MOCK_MEDIA.map((m) => m.sortOrder), 0) + 1,
      isHero: data.isHero || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    MOCK_MEDIA.push(media);
    return media;
  }

  /**
   * Delete media
   */
  static async delete(id: number): Promise<void> {
    const index = MOCK_MEDIA.findIndex((m) => m.id === id);
    if (index !== -1) {
      MOCK_MEDIA.splice(index, 1);
    }
  }

  /**
   * Reorder media
   */
  static async reorder(ids: number[]): Promise<void> {
    ids.forEach((id, index) => {
      const media = MOCK_MEDIA.find((m) => m.id === id);
      if (media) {
        media.sortOrder = index;
      }
    });
  }

  /**
   * Update media
   */
  static async update(id: number, data: Partial<Media>): Promise<Media> {
    const media = MOCK_MEDIA.find((m) => m.id === id);
    if (!media) {
      throw new Error(`Media with id ${id} not found`);
    }
    Object.assign(media, data, { updatedAt: new Date() });
    return media;
  }
}
