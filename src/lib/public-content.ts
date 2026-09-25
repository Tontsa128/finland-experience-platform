import { supabaseAdmin } from "@/lib/supabase";
import type { Cabin, Destination, Experience, Locale, BlogPost } from "@/types";

const locales: Locale[] = ["fi", "es", "en"];

function localized<T extends Record<string, unknown>>(translations: Array<T & { locale?: string; language_code?: string }>, field: keyof T) {
  const byLocale = Object.fromEntries(
    translations.map((translation) => [translation.locale ?? translation.language_code, translation])
  ) as Record<string, T | undefined>;
  return Object.fromEntries(
    locales.map((locale) => [locale, String(byLocale[locale]?.[field] ?? "")])
  ) as Record<Locale, string>;
}

export async function getPublishedProperties(): Promise<Cabin[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("id,slug,property_type,region,latitude,longitude,max_guests,bedrooms,base_price_eur,property_translations(locale,name,short_description,description,location_name,amenities_text),property_media(sort_order,media(url,alt_fi,alt_es,alt_en,alt_text))")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];

    return data.map((property: any) => {
      const translations = property.property_translations ?? [];
      const first = translations.find((t: any) => t.locale === "fi") ?? translations[0];
      const images = (property.property_media ?? [])
        .slice()
        .sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((item: any) => item.media?.url)
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
        bookingUrl: undefined,
        provider: undefined,
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
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];

    return data.map((destination: any) => {
      const translations = destination.destination_translations ?? [];
      const names = localized(translations, "name");
      const shortDescriptions = localized(translations, "short_description");
      const descriptions = localized(translations, "full_description");
      const firstDescription = descriptions.fi || descriptions.en || shortDescriptions.fi || "";
      const highlights = String(
        translations.find((t: any) => t.language_code === "fi")?.highlights ??
        translations.find((t: any) => t.language_code === "en")?.highlights ??
        ""
      ).split(",").map((item) => item.trim()).filter(Boolean);

      const gallery = (destination.destination_media ?? []).slice().sort((a: any, b: any) => a.sort_order - b.sort_order).map((item: any) => item.media?.url).filter(Boolean);
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
        status: destination.status,
        travel_info_fi: translations.find((t: any) => t.language_code === "fi")?.travel_information ?? "",
        travel_info_es: translations.find((t: any) => t.language_code === "es")?.travel_information ?? "",
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

    return data.map((experience: any) => {
      const translations = experience.experience_translations ?? [];
      const names = localized(translations, "title");
      const descriptions = localized(translations, "full_description");
      const shorts = localized(translations, "short_description");
      const pricing = experience.pricing_rules?.[0];
      const images = (experience.experience_media ?? []).slice().sort((a: any, b: any) => a.sort_order - b.sort_order).map((item: any) => item.media?.url).filter(Boolean);
      const category = experience.experience_categories?.slug || "experience";

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
        region: "",
        maxParticipants: Number(experience.max_group_size || 0),
        destination_id: String(experience.destination_id),
        category_id: String(experience.category_id),
        duration_minutes: experience.duration_minutes ?? undefined,
        status: experience.status,
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
      .select("id,slug,author_name,published_at,cover_media_id,blog_post_translations(locale,title,excerpt,content),media:cover_media_id(url,alt_fi,alt_es,alt_en)")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) return [];

    return data.map((post: any) => {
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
        image: post.media?.url || "",
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
};

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("hero_image_url,hero_eyebrow_fi,hero_eyebrow_es,hero_eyebrow_en,hero_title_fi,hero_title_es,hero_title_en,hero_description_fi,hero_description_es,hero_description_en,hero_cta_label_fi,hero_cta_label_es,hero_cta_label_en,hero_cta_url,hero_secondary_label_fi,hero_secondary_label_es,hero_secondary_label_en,hero_secondary_url")
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
    return (data || []).map((item) => ({
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
    return (data || []).filter((b: any) => (!b.start_at || b.start_at <= now) && (!b.end_at || b.end_at >= now)).map((b: any) => ({
      id: b.id, title: b.title, text: b.text || "", ctaLabel: b.cta_label || "", ctaUrl: b.cta_url || "", imageUrl: b.image_url || "", sortOrder: b.sort_order,
    }));
  } catch { return []; }
}
