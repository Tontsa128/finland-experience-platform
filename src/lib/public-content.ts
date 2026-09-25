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
      .select("id,slug,region,latitude,longitude,hero_image_url,status,published_at,destination_translations(language_code,name,short_description,full_description,highlights,travel_information)")
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

      const image = destination.hero_image_url || "";
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
        images: image ? [image] : [],
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
      .select("id,destination_id,category_id,slug,duration_minutes,min_group_size,max_group_size,difficulty_level,status,experience_translations(language_code,title,short_description,full_description),pricing_rules(base_price_eur,adult_price_eur,child_price_eur),experience_categories(slug,name_fi,name_es)")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];

    return data.map((experience: any) => {
      const translations = experience.experience_translations ?? [];
      const names = localized(translations, "title");
      const descriptions = localized(translations, "full_description");
      const shorts = localized(translations, "short_description");
      const pricing = experience.pricing_rules?.[0];
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
        images: [],
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
