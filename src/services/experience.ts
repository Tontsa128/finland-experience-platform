import type { Experience, ExperienceTranslation, PricingRule, Availability, Addon, Media } from '@/types';
import { MOCK_EXPERIENCES, MOCK_EXPERIENCE_TRANSLATIONS } from '@/lib/mock-data/experiences';
import { MOCK_PRICING_RULES } from '@/lib/mock-data/pricing';
import { MOCK_AVAILABILITY } from '@/lib/mock-data/availability';
import { MOCK_ADDONS } from '@/lib/mock-data/addons';
import { MOCK_MEDIA } from '@/lib/mock-data/media';

export class ExperienceService {
  /**
   * Get all experiences with translations
   */
  static async getExperiences(published: boolean = false) {
    let experiences = MOCK_EXPERIENCES;
    if (published) {
      experiences = experiences.filter((e) => e.status === 'published');
    }

    return experiences.map((exp) => ({
      ...exp,
      translations: MOCK_EXPERIENCE_TRANSLATIONS.filter((t) => t.experienceId === exp.id),
      pricing: MOCK_PRICING_RULES.find((p) => p.experienceId === exp.id),
      media: MOCK_MEDIA.filter((m) => m.experienceId === exp.id),
      addons: MOCK_ADDONS.filter((a) => a.experienceId === exp.id),
    }));
  }

  /**
   * Get single experience
   */
  static async getExperienceById(id: number) {
    const experience = MOCK_EXPERIENCES.find((e) => e.id === id);
    if (!experience) return null;

    const translations = MOCK_EXPERIENCE_TRANSLATIONS.filter((t) => t.experienceId === id);
    const esByLanguage = (lang: string) => translations.find((t) => t.languageCode === lang);

    return {
      ...experience,
      titleEs: esByLanguage('es')?.title || '',
      titleFi: esByLanguage('fi')?.title || '',
      shortDescriptionEs: esByLanguage('es')?.shortDescription || '',
      shortDescriptionFi: esByLanguage('fi')?.shortDescription || '',
      fullDescriptionEs: esByLanguage('es')?.fullDescription || '',
      fullDescriptionFi: esByLanguage('fi')?.fullDescription || '',
      whatToBringEs: esByLanguage('es')?.whatToBring || '',
      whatToBringFi: esByLanguage('fi')?.whatToBring || '',
      safetyInformationEs: esByLanguage('es')?.safetyInformation || '',
      safetyInformationFi: esByLanguage('fi')?.safetyInformation || '',
      pricing: MOCK_PRICING_RULES.find((p) => p.experienceId === id),
      media: MOCK_MEDIA.filter((m) => m.experienceId === id),
      addons: MOCK_ADDONS.filter((a) => a.experienceId === id),
    };
  }

  /**
   * Get by slug
   */
  static async getExperienceBySlug(slug: string, published: boolean = true) {
    const experience = MOCK_EXPERIENCES.find((e) => e.slug === slug);
    if (!experience) return null;
    if (published && experience.status !== 'published') return null;

    return this.getExperienceById(experience.id);
  }

  /**
   * Validate experience before publishing
   */
  static validateForPublishing(
    data: any
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.titleEs) errors.push('Spanish title is required');
    if (!data.titleFi) errors.push('Finnish title is required');
    if (!data.shortDescriptionEs) errors.push('Spanish short description is required');
    if (!data.shortDescriptionFi) errors.push('Finnish short description is required');
    if (!data.fullDescriptionEs) errors.push('Spanish full description is required');
    if (!data.fullDescriptionFi) errors.push('Finnish full description is required');
    if (!data.destinationId) errors.push('Destination is required');
    if (!data.categoryId) errors.push('Category is required');
    if (!data.pricing?.basePriceEur) errors.push('Base price is required');
    if (!data.media?.length) errors.push('At least one hero image is required');

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get available dates for booking
   */
  static async getAvailableDates(experienceId: number) {
    return MOCK_AVAILABILITY.filter((a) => a.experienceId === experienceId).sort(
      (a, b) => a.availableDate.getTime() - b.availableDate.getTime()
    );
  }
}
