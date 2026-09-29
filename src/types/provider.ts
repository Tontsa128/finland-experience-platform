export type ProviderType = 'accommodation' | 'restaurant' | 'sauna' | 'experience' | 'transport' | 'culture' | 'other';

export type Provider = {
  id: string;
  name: string;
  slug: string;
  providerType: ProviderType;
  description: { fi: string; es: string; en: string };
  websiteUrl?: string;
  bookingUrl?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  region?: string;
  languages: string[];
  categories: string[];
  verified: boolean;
  verifiedAt?: string;
  featured: boolean;
};

export type LeadAttribution = {
  providerId?: string;
  source?: string;
  sourcePath?: string;
  leadType?: string;
};
