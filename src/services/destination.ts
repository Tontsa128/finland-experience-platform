import type { Destination, DestinationTranslation } from '@/types';
import { MOCK_DESTINATIONS, MOCK_DESTINATION_TRANSLATIONS } from '@/lib/mock-data/destinations';
import { MOCK_MEDIA } from '@/lib/mock-data/media';
import { MOCK_EXPERIENCES } from '@/lib/mock-data/experiences';

export class DestinationService {
  /**
   * Get all destinations
   */
  static async getDestinations(published: boolean = false) {
    let destinations = MOCK_DESTINATIONS;
    if (published) {
      destinations = destinations.filter((d) => d.status === 'published');
    }

    return destinations.map((dest) => ({
      ...dest,
      translations: MOCK_DESTINATION_TRANSLATIONS.filter((t) => t.destinationId === dest.id),
      media: MOCK_MEDIA.filter((m) => m.destinationId === dest.id),
      experienceCount: MOCK_EXPERIENCES.filter((e) => e.destinationId === dest.id).length,
    }));
  }

  /**
   * Get single destination
   */
  static async getDestinationById(id: number) {
    const destination = MOCK_DESTINATIONS.find((d) => d.id === id);
    if (!destination) return null;

    const translations = MOCK_DESTINATION_TRANSLATIONS.filter((t) => t.destinationId === id);
    const byLanguage = (lang: string) => translations.find((t) => t.languageCode === lang);

    const esTranslation = byLanguage('es');
    const fiTranslation = byLanguage('fi');

    return {
      ...destination,
      nameEs: esTranslation?.name || '',
      nameFi: fiTranslation?.name || '',
      shortDescriptionEs: esTranslation?.shortDescription || '',
      shortDescriptionFi: fiTranslation?.shortDescription || '',
      fullDescriptionEs: esTranslation?.fullDescription || '',
      fullDescriptionFi: fiTranslation?.fullDescription || '',
      highlightsEs: esTranslation?.highlights || '',
      highlightsFi: fiTranslation?.highlights || '',
      travelInformationEs: esTranslation?.travelInformation || '',
      travelInformationFi: fiTranslation?.travelInformation || '',
      media: MOCK_MEDIA.filter((m) => m.destinationId === id),
      experiences: MOCK_EXPERIENCES.filter((e) => e.destinationId === id),
    };
  }

  /**
   * Get by slug
   */
  static async getDestinationBySlug(slug: string, published: boolean = true) {
    const destination = MOCK_DESTINATIONS.find((d) => d.slug === slug);
    if (!destination) return null;
    if (published && destination.status !== 'published') return null;

    return this.getDestinationById(destination.id);
  }

  /**
   * Validate destination before publishing
   */
  static validateForPublishing(
    data: any
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.nameEs) errors.push('Spanish name is required');
    if (!data.nameFi) errors.push('Finnish name is required');
    if (!data.fullDescriptionEs) errors.push('Spanish description is required');
    if (!data.fullDescriptionFi) errors.push('Finnish description is required');
    if (!data.media?.length) errors.push('Hero image is required');

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
