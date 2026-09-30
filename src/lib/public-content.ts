import { supabaseAdmin } from "@/lib/supabase";
import type { Cabin, Destination, Experience, Locale, BlogPost } from "@/types";

const locales: Locale[] = ["fi", "es", "en"];

type IdRow = { id: string | number };
type ProviderLinkRow = { provider_id: string | number; property_id?: string | number; experience_id?: string | number };

type PropertyTranslationRow = {
  locale?: string;
  name?: string | null;
  short_description?: string | null;
  description?: string | null;
  location_name?: string | null;
  amenities_text?: string | null;
};
type PropertyMediaRow = { sort_order?: number | null; media?: { url?: string | null } | null };
type PropertyRow = {
  id: string | number;
  slug: string;
  property_type?: string | null;
  region?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  max_guests?: number | null;
  bedrooms?: number | null;
  base_price_eur?: number | string | null;
  provider_name?: string | null;
  provider_url?: string | null;
  property_translations?: PropertyTranslationRow[] | null;
  property_media?: PropertyMediaRow[] | null;
};

type DestinationTranslationRow = {
  language_code?: string;
  name?: string | null;
  short_description?: string | null;
  full_description?: string | null;
  highlights?: string | null;
  travel_information?: string | null;
};
type DestinationMediaRow = { sort_order?: number | null; media?: { url?: string | null } | null };
type DestinationRow = {
  id: string | number;
  slug: string;
  region?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  hero_image_url?: string | null;
  status?: string | null;
  seo_title_fi?: string | null;
  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_description_fi?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  destination_media?: DestinationMediaRow[] | null;
  destination_translations?: DestinationTranslationRow[] | null;
};

type ExperienceTranslationRow = {
  language_code?: string;
  title?: string | null;
  short_description?: string | null;
  full_description?: string | null;
};
type PricingRow = { base_price_eur?: number | string | null; adult_price_eur?: number | string | null; child_price_eur?: number | string | null };
type ExperienceMediaRow = { sort_order?: number | null; media?: { url?: string | null } | null };
type ExperienceCategoryRow = { slug?: string | null };
type ExperienceRow = {
  id: string | number;
  destination_id?: string | number | null;
  category_id?: string | number | null;
  slug: string;
  duration_minutes?: number | null;
  min_group_size?: number | null;
  max_group_size?: number | null;
  difficulty_level?: string | null;
  status?: string | null;
  experience_translations?: ExperienceTranslationRow[] | null;
  pricing_rules?: PricingRow[] | null;
  experience_categories?: ExperienceCategoryRow | ExperienceCategoryRow[] | null;
  experience_media?: ExperienceMediaRow[] | null;
};

type BlogTranslationRow = { locale?: string; title?: string | null; excerpt?: string | null; content?: string | null };
type BlogPostRow = {
  id: string | number;
  slug: string;
  author_name?: string | null;
  published_at?: string | null;
  cover_media_id?: string | null;
  blog_post_translations?: BlogTranslationRow[] | null;
};
type MediaRow = { id: string | number; url?: string | null };
type NavigationRow = { id: string; locale: string; label: string; href: string; sort_order: number };
type BannerRow = {
  id: string;
  title: string;
  text?: string | null;
  cta_label?: string | null;
  cta_url?: string | null;
  image_url?: string | null;
  sort_order: number;
  start_at?: string | null;
  end_at?: string | null;
};

function idList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string | number => typeof item === "string" || typeof item === "number").map(String)
    : [];
}

function localized<T extends Record<string, unknown>>(translations: Array<T & { locale?: string; language_code?: string }>, field: keyof T) {
  const byLocale = Object.fromEntries(
    translations.map((translation) => [translation.locale ?? translation.language_code, translation])
  ) as Record<string, T | undefined>;
  return Object.fromEntries(
    locales.map((locale) => [locale, String(byLocale[locale]?.[field] ?? "")])
  ) as Record<Locale, string>;
}

async function getVerifiedProviderIds(): Promise<Set<string>> {
  const [{ data: links }, { data: providers }] = await Promise.all([
    supabaseAdmin.from("provider_property_links").select("property_id,provider_id"),
    supabaseAdmin.from("providers").select("id").eq("active", true).eq("verified", true),
  ]);
  const verifiedIds = new Set((providers as IdRow[] ?? []).map((provider) => String(provider.id)));
  return new Set((links as ProviderLinkRow[] ?? []).filter((link) => link.property_id != null && verifiedIds.has(String(link.provider_id))).map((link) => String(link.property_id)));
}

async function getVerifiedExperienceIds(): Promise<Set<string>> {
  const [{ data: links }, { data: providers }] = await Promise.all([
    supabaseAdmin.from("provider_experience_links").select("experience_id,provider_id"),
    supabaseAdmin.from("providers").select("id").eq("active", true).eq("verified", true),
  ]);
  const verifiedIds = new Set((providers as IdRow[] ?? []).map((provider) => String(provider.id)));
  return new Set((links as ProviderLinkRow[] ?? []).filter((link) => link.experience_id != null && verifiedIds.has(String(link.provider_id))).map((link) => String(link.experience_id)));
}
async function getVerifiedExperienceProviders(): Promise<Map<string, { name?: string; url?: string; region?: string }>> {
  const [{ data: links }, { data: providers }] = await Promise.all([
    supabaseAdmin.from("provider_experience_links").select("experience_id,provider_id"),
    supabaseAdmin.from("providers").select("id,name,website_url,booking_url,region").eq("active", true).eq("verified", true),
  ]);
  const providerRows = (providers ?? []) as unknown as Array<{ id: string | number; name?: string | null; website_url?: string | null; booking_url?: string | null; region?: string | null }>;
  const providerMap = new Map(providerRows.map((provider) => [
    String(provider.id),
    { name: provider.name || undefined, url: provider.booking_url || provider.website_url || undefined, region: provider.region || undefined },
  ]));
  const result = new Map<string, { name?: string; url?: string; region?: string }>();
  for (const link of (links ?? []) as unknown as ProviderLinkRow[]) {
    if (link.experience_id == null) continue;
    const provider = providerMap.get(String(link.provider_id));
    if (provider) result.set(String(link.experience_id), provider);
  }
  return result;
}


export async function getPublishedProperties(): Promise<Cabin[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("id,slug,property_type,region,latitude,longitude,max_guests,bedrooms,base_price_eur,provider_name,provider_url,property_translations(locale,name,short_description,description,location_name,amenities_text),property_media(sort_order,media(url,alt_fi,alt_es,alt_en,alt_text))")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];
    const verifiedPropertyIds = await getVerifiedProviderIds();

    const properties = data as unknown as PropertyRow[];
    return properties.map((property) => {
      const translations = property.property_translations ?? [];
      const first = translations.find((t) => t.locale === "fi") ?? translations[0];
      const images = (property.property_media ?? [])
        .slice()
        .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
        .map((item) => item.media?.url)
        .filter(Boolean);

      const names = localized(translations, "name");
      const descriptions = localized(translations, "description");
      const locations = localized(translations, "location_name");
      const amenities = String(first?.amenities_text ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      return {
        id: property.id,
        slug: property.slug,
        name: {
          fi: names.fi || names.en || property.slug,
          es: names.es || names.en || property.slug,
          en: names.en || names.fi || property.slug,
        },
        description: {
          fi: descriptions.fi || names.fi || "",
          es: descriptions.es || descriptions.en || names.en || "",
          en: descriptions.en || descriptions.fi || names.fi || "",
        },
        location: locations.fi || locations.en || property.region || "",
        region: property.region || "",
        pricePerNight: Number(property.base_price_eur || 0),
        images,
        features: amenities,
        maxGuests: Number(property.max_guests || 0),
        bedrooms: Number(property.bedrooms || 0),
        coordinates:
          property.latitude != null && property.longitude != null
            ? { lat: Number(property.latitude), lng: Number(property.longitude) }
            : undefined,
        type: property.property_type as Cabin["type"],
        bookingUrl: property.provider_url || undefined,
        provider: property.provider_name || undefined,
        verified: verifiedPropertyIds.has(String(property.id)),
        priceNote: {
          fi: property.base_price_eur ? `Alkaen ${property.base_price_eur} €/yö. Tarkista ajantasainen hinta.` : "Tarkista ajantasainen hinta.",
          es: property.base_price_eur ? `Desde ${property.base_price_eur} € por noche. Consulta el precio actual.` : "Consulta el precio actual.",
          en: property.base_price_eur ? `From €${property.base_price_eur} per night. Check the current price.` : "Check the current price.",
        },
      } satisfies Cabin;
    }).filter((cabin) => cabin.images.length > 0);
  } catch {
    return [];
  }
}

export async function getPublishedDestinations(): Promise<Destination[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("destinations")
      .select("id,slug,region,latitude,longitude,hero_image_url,status,published_at,publish_at,seo_title_fi,seo_title_es,seo_title_en,seo_description_fi,seo_description_es,seo_description_en,destination_media(sort_order,media(url,alt_fi,alt_es,alt_en,alt_text)),destination_translations(language_code,name,short_description,full_description,highlights,travel_information)")
      .eq("status", "published")
      .is("deleted_at", null)
      .or(`publish_at.is.null,publish_at.lte.${new Date().toISOString()}`)
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];

    const destinations = data as unknown as DestinationRow[];
    return destinations.map((destination) => {
      const translations = destination.destination_translations ?? [];
      const names = localized(translations, "name");
      const shortDescriptions = localized(translations, "short_description");
      const descriptions = localized(translations, "full_description");
      const firstDescription = descriptions.fi || descriptions.en || shortDescriptions.fi || "";
      const highlights = String(
        translations.find((t) => t.language_code === "fi")?.highlights ??
        translations.find((t) => t.language_code === "en")?.highlights ??
        ""
      ).split(",").map((item) => item.trim()).filter(Boolean);

      const gallery = (destination.destination_media ?? []).slice().sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)).map((item) => item.media?.url).filter(Boolean);
      const image = destination.hero_image_url || gallery[0] || "";
      return {
        id: destination.id,
        slug: destination.slug,
        name: {
          fi: names.fi || names.en || destination.slug,
          es: names.es || names.en || destination.slug,
          en: names.en || names.fi || destination.slug,
        },
        shortDescription: {
          fi: shortDescriptions.fi || shortDescriptions.en || "",
          es: shortDescriptions.es || shortDescriptions.en || "",
          en: shortDescriptions.en || shortDescriptions.fi || "",
        },
        description: {
          fi: descriptions.fi || descriptions.en || firstDescription,
          es: descriptions.es || descriptions.en || firstDescription,
          en: descriptions.en || descriptions.fi || firstDescription,
        },
        region: destination.region,
        images: Array.from(new Set([image, ...gallery].filter(Boolean))),
        priceFrom: 0,
        featured: false,
        coordinates:
          destination.latitude != null && destination.longitude != null
            ? { lat: Number(destination.latitude), lng: Number(destination.longitude) }
            : undefined,
        tags: highlights,
        activities: [],
        seo: {
          fi: { title: destination.seo_title_fi || "", description: destination.seo_description_fi || "" },
          es: { title: destination.seo_title_es || "", description: destination.seo_description_es || "" },
          en: { title: destination.seo_title_en || "", description: destination.seo_description_en || "" },
        },
        status: destination.status,
        verified: true,
        travel_info_fi: translations.find((t) => t.language_code === "fi")?.travel_information ?? "",
        travel_info_es: translations.find((t) => t.language_code === "es")?.travel_information ?? "",
      } satisfies Destination;
    });
  } catch {
    return [];
  }
}

export async function getPublishedExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("experiences")
      .select("id,destination_id,category_id,slug,duration_minutes,min_group_size,max_group_size,difficulty_level,status,experience_translations(language_code,title,short_description,full_description),pricing_rules(base_price_eur,adult_price_eur,child_price_eur),experience_categories(slug,name_fi,name_es),experience_media(sort_order,media(url,alt_fi,alt_es,alt_en,alt_text))")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];
    const verifiedExperienceIds = await getVerifiedExperienceIds();
    const verifiedExperienceProviders = await getVerifiedExperienceProviders();

    const experiences = data as unknown as ExperienceRow[];
    return experiences.map((experience) => {
      const translations = experience.experience_translations ?? [];
      const names = localized(translations, "title");
      const descriptions = localized(translations, "full_description");
      const shorts = localized(translations, "short_description");
      const pricing = experience.pricing_rules?.[0];
      const images = (experience.experience_media ?? []).slice().sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)).map((item) => item.media?.url).filter(Boolean);
      const categoryValue = Array.isArray(experience.experience_categories) ? experience.experience_categories[0] : experience.experience_categories;
      const category = categoryValue?.slug || "experience";

      return {
        id: experience.id,
        slug: experience.slug,
        name: {
          fi: names.fi || names.en || experience.slug,
          es: names.es || names.en || experience.slug,
          en: names.en || names.fi || experience.slug,
        },
        description: {
          fi: descriptions.fi || shorts.fi || "",
          es: descriptions.es || descriptions.en || shorts.es || "",
          en: descriptions.en || descriptions.fi || shorts.en || "",
        },
        shortDescription: {
          fi: shorts.fi || shorts.en || "",
          es: shorts.es || shorts.en || "",
          en: shorts.en || shorts.fi || "",
        },
        price: Number(pricing?.adult_price_eur ?? pricing?.base_price_eur ?? 0),
        duration: experience.duration_minutes ? `${experience.duration_minutes} min` : "",
        images,
        category,
        region: verifiedExperienceProviders.get(String(experience.id))?.region || "",
        providerName: verifiedExperienceProviders.get(String(experience.id))?.name,
        providerUrl: verifiedExperienceProviders.get(String(experience.id))?.url,
        maxParticipants: Number(experience.max_group_size || 0),
        destination_id: String(experience.destination_id),
        category_id: String(experience.category_id),
        duration_minutes: experience.duration_minutes ?? undefined,
        status: experience.status,
        verified: verifiedExperienceIds.has(String(experience.id)),
        pricing: pricing
          ? {
              adult: Number(pricing.adult_price_eur ?? pricing.base_price_eur ?? 0),
              child: pricing.child_price_eur != null ? Number(pricing.child_price_eur) : undefined,
              currency: "EUR",
            }
          : undefined,
      } satisfies Experience;
    });
  } catch {
    return [];
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id,slug,author_name,published_at,cover_media_id,blog_post_translations(locale,title,excerpt,content)")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) return [];

    const posts = data as unknown as BlogPostRow[];
    const coverIds = posts.map((post) => post.cover_media_id).filter(Boolean) as string[];
    const { data: mediaRows } = coverIds.length
      ? await supabaseAdmin.from("media").select("id,url,alt_fi,alt_es,alt_en").in("id", coverIds)
      : { data: [] };
    const mediaById = new Map((mediaRows ?? []).map((media) => [String((media as MediaRow).id), media as MediaRow]));

    return posts.map((post) => {
      const cover = post.cover_media_id ? mediaById.get(String(post.cover_media_id)) : null;
      const translations = post.blog_post_translations ?? [];
      const titles = localized(translations, "title");
      const excerpts = localized(translations, "excerpt");
      const contents = localized(translations, "content");
      return {
        id: String(post.id),
        slug: post.slug,
        title: {
          fi: titles.fi || titles.en || post.slug,
          es: titles.es || titles.en || post.slug,
          en: titles.en || titles.fi || post.slug,
        },
        excerpt: {
          fi: excerpts.fi || excerpts.en || "",
          es: excerpts.es || excerpts.en || "",
          en: excerpts.en || excerpts.fi || "",
        },
        content: {
          fi: contents.fi || contents.en || "",
          es: contents.es || contents.en || "",
          en: contents.en || contents.fi || "",
        },
        image: cover?.url || "",
        author: post.author_name || "Finland Experience",
        publishedAt: post.published_at || "",
        tags: [],
      };
    });
  } catch {
    return [];
  }
}


export type HomepageSettings = {
  heroImageUrl: string;
  heroEyebrow: Record<Locale, string>;
  heroTitle: Record<Locale, string>;
  heroDescription: Record<Locale, string>;
  heroCtaLabel: Record<Locale, string>;
  heroCtaUrl: string;
  heroSecondaryLabel: Record<Locale, string>;
  heroSecondaryUrl: string;
  featuredDestinationIds: string[];
  featuredPropertyIds: string[];
  featuredExperienceIds: string[];
};

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("hero_image_url,hero_eyebrow_fi,hero_eyebrow_es,hero_eyebrow_en,hero_title_fi,hero_title_es,hero_title_en,hero_description_fi,hero_description_es,hero_description_en,hero_cta_label_fi,hero_cta_label_es,hero_cta_label_en,hero_cta_url,hero_secondary_label_fi,hero_secondary_label_es,hero_secondary_label_en,hero_secondary_url,homepage_featured_destination_ids,homepage_featured_property_ids,homepage_featured_experience_ids")
      .eq("singleton", true)
      .maybeSingle();

    if (error || !data) return null;

    const value = (key: string) => String((data as Record<string, unknown>)[key] ?? "");
    return {
      heroImageUrl: value("hero_image_url"),
      heroEyebrow: { fi: value("hero_eyebrow_fi"), es: value("hero_eyebrow_es"), en: value("hero_eyebrow_en") },
      heroTitle: { fi: value("hero_title_fi"), es: value("hero_title_es"), en: value("hero_title_en") },
      heroDescription: { fi: value("hero_description_fi"), es: value("hero_description_es"), en: value("hero_description_en") },
      heroCtaLabel: { fi: value("hero_cta_label_fi"), es: value("hero_cta_label_es"), en: value("hero_cta_label_en") },
      heroCtaUrl: value("hero_cta_url") || "/accommodations",
      heroSecondaryLabel: { fi: value("hero_secondary_label_fi"), es: value("hero_secondary_label_es"), en: value("hero_secondary_label_en") },
      heroSecondaryUrl: value("hero_secondary_url") || "/destinations",
      featuredDestinationIds: idList((data as Record<string, unknown>).homepage_featured_destination_ids),
      featuredPropertyIds: idList((data as Record<string, unknown>).homepage_featured_property_ids),
      featuredExperienceIds: idList((data as Record<string, unknown>).homepage_featured_experience_ids),
    };
  } catch {
    return null;
  }
}


export type NavigationItem = { id: string; locale: Locale; label: string; href: string; sortOrder: number };

export async function getPublishedNavigation(locale: Locale, location = "header"): Promise<NavigationItem[]> {
  try {
    const { data, error } = await supabaseAdmin.from("site_navigation")
      .select("id,locale,label,href,sort_order")
      .eq("location", location).eq("locale", locale).eq("active", true)
      .order("sort_order");
    if (error) return [];
    const rows = (data || []) as unknown as NavigationRow[];
    return rows.map((item) => ({
      id: item.id, locale: item.locale as Locale, label: item.label, href: item.href, sortOrder: item.sort_order,
    }));
  } catch { return []; }
}


export type SiteBanner = { id: string; title: string; text: string; ctaLabel: string; ctaUrl: string; imageUrl: string; sortOrder: number };

export async function getActiveBanners(locale: Locale): Promise<SiteBanner[]> {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabaseAdmin.from("site_banners").select("id,title,text,cta_label,cta_url,image_url,sort_order,start_at,end_at")
      .eq("locale", locale).eq("active", true).order("sort_order");
    if (error) return [];
    const rows = (data || []) as unknown as BannerRow[];
    return rows.filter((b) => (!b.start_at || b.start_at <= now) && (!b.end_at || b.end_at >= now)).map((b) => ({
      id: b.id, title: b.title, text: b.text || "", ctaLabel: b.cta_label || "", ctaUrl: b.cta_url || "", imageUrl: b.image_url || "", sortOrder: b.sort_order,
    }));
  } catch { return []; }
}
