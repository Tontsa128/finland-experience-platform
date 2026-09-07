import type { Destination } from '@/types';
import { MOCK_DESTINATIONS, MOCK_DESTINATION_TRANSLATIONS } from '@/lib/mock-data/destinations';
import { MOCK_MEDIA } from '@/lib/mock-data/media';
import { MOCK_EXPERIENCES, MOCK_EXPERIENCE_TRANSLATIONS } from '@/lib/mock-data/experiences';

export class DestinationService {
  /** Prefer the production API; keep mock data as an offline/development fallback. */
  static async getDestinations(published: boolean = false) {
    if (published) {
      try {
        const response = await fetch('/api/destinations', { cache: 'no-store' });
        if (response.ok) {
          const payload = await response.json();
          if (Array.isArray(payload.destinations)) return payload.destinations;
        }
      } catch {
        // Fall back to the local repository when Supabase is unavailable.
      }
    }

    let destinations = MOCK_DESTINATIONS;
    if (published) destinations = destinations.filter((d) => d.status === 'published');
    return destinations.map((dest) => ({
      ...dest,
      translations: MOCK_DESTINATION_TRANSLATIONS.filter((t) => t.destinationId === dest.id),
      media: MOCK_MEDIA.filter((m) => m.destinationId === dest.id),
      experienceCount: MOCK_EXPERIENCES.filter((e) => e.destinationId === dest.id).length,
    }));
  }

  static async getDestinationById(id: number) {
    const destination = MOCK_DESTINATIONS.find((d) => d.id === id);
    if (!destination) return null;
    const translations = MOCK_DESTINATION_TRANSLATIONS.filter((t) => t.destinationId === id);
    const byLanguage = (lang: string) => translations.find((t) => t.languageCode === lang);
    const esTranslation = byLanguage('es');
    const fiTranslation = byLanguage('fi');
    const experiences = MOCK_EXPERIENCES.filter((experience) => experience.destinationId === id).map((experience) => {
      const experienceTranslations = MOCK_EXPERIENCE_TRANSLATIONS.filter((translation) => translation.experienceId === experience.id);
      const es = experienceTranslations.find((translation) => translation.languageCode === 'es');
      const fi = experienceTranslations.find((translation) => translation.languageCode === 'fi');
      return { ...experience, titleEs: es?.title ?? '', titleFi: fi?.title ?? '', shortDescriptionEs: es?.shortDescription ?? '', shortDescriptionFi: fi?.shortDescription ?? '' };
    });
    return { ...destination, nameEs: esTranslation?.name || '', nameFi: fiTranslation?.name || '', shortDescriptionEs: esTranslation?.shortDescription || '', shortDescriptionFi: fiTranslation?.shortDescription || '', fullDescriptionEs: esTranslation?.fullDescription || '', fullDescriptionFi: fiTranslation?.fullDescription || '', highlightsEs: esTranslation?.highlights || '', highlightsFi: fiTranslation?.highlights || '', travelInformationEs: esTranslation?.travelInformation || '', travelInformationFi: fiTranslation?.travelInformation || '', media: MOCK_MEDIA.filter((m) => m.destinationId === id), experiences };
  }

  static async getDestinationBySlug(slug: string, published: boolean = true) {
    if (published) {
      try {
        const response = await fetch(`/api/destinations/${encodeURIComponent(slug)}`, { cache: 'no-store' });
        if (response.ok) return await response.json();
      } catch {
        // Fall back to the local repository when Supabase is unavailable.
      }
    }
    const destination = MOCK_DESTINATIONS.find((d) => d.slug === slug);
    if (!destination || (published && destination.status !== 'published')) return null;
    return this.getDestinationById(destination.id);
  }

  static validateForPublishing(data: unknown): { valid: boolean; errors: string[] } {
    const value = (data || {}) as Record<string, unknown>;
    const errors: string[] = [];
    if (!value.nameEs) errors.push('Spanish name is required');
    if (!value.nameFi) errors.push('Finnish name is required');
    if (!value.fullDescriptionEs) errors.push('Spanish description is required');
    if (!value.fullDescriptionFi) errors.push('Finnish description is required');
    if (!(value.media as unknown[])?.length) errors.push('Hero image is required');
    return { valid: errors.length === 0, errors };
  }
}
