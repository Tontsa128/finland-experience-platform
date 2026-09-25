import { supabaseAdmin } from "@/lib/supabase";
import type { Cabin, Locale } from "@/types";

type PublishedProperty = {
  id: string;
  slug: string;
  property_type: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  max_guests: number;
  bedrooms: number;
  base_price_eur: number | null;
  property_translations: Array<{
    locale: Locale;
    name: string;
    short_description: string | null;
    description: string | null;
    location_name: string | null;
    amenities_text: string | null;
  }>;
  property_media: Array<{
    sort_order: number;
    media: { url: string; alt_fi: string | null; alt_es: string | null; alt_en: string | null; alt_text: string | null } | null;
  }>;
};

export async function getPublishedProperties(): Promise<Cabin[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("id,slug,property_type,region,latitude,longitude,max_guests,bedrooms,base_price_eur,property_translations(locale,name,short_description,description,location_name,amenities_text),property_media(sort_order,media(url,alt_fi,alt_es,alt_en,alt_text))")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];

    return (data as unknown as PublishedProperty[]).map((property) => {
      const translations = Object.fromEntries(
        property.property_translations.map((translation) => [translation.locale, translation])
      ) as Record<Locale, PublishedProperty["property_translations"][number]>;

      const first = translations.fi || translations.en || property.property_translations[0];
      const images = property.property_media
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => item.media?.url)
        .filter((url): url is string => Boolean(url));

      const names = { fi: translations.fi?.name, es: translations.es?.name, en: translations.en?.name };
      const descriptions = {
        fi: translations.fi?.description || translations.fi?.short_description,
        es: translations.es?.description || translations.es?.short_description,
        en: translations.en?.description || translations.en?.short_description,
      };
      const locations = {
        fi: translations.fi?.location_name || first?.location_name || property.region || "",
        es: translations.es?.location_name || first?.location_name || property.region || "",
        en: translations.en?.location_name || first?.location_name || property.region || "",
      };

      return {
        id: property.id,
        slug: property.slug,
        name: {
          fi: names.fi || names.en || property.slug,
          es: names.es || names.en || property.slug,
          en: names.en || names.fi || property.slug,
        },
        description: {
          fi: descriptions.fi || descriptions.en || "",
          es: descriptions.es || descriptions.en || "",
          en: descriptions.en || descriptions.fi || "",
        },
        location: locations.fi || locations.en || property.region || "",
        region: property.region || "",
        pricePerNight: Number(property.base_price_eur || 0),
        images,
        features: (first?.amenities_text || "").split(",").map((item) => item.trim()).filter(Boolean),
        maxGuests: property.max_guests,
        bedrooms: property.bedrooms,
        coordinates: property.latitude != null && property.longitude != null
          ? { lat: property.latitude, lng: property.longitude }
          : { lat: 0, lng: 0 },
        type: property.property_type as Cabin["type"],
        bookingUrl: "#",
        provider: "",
        priceNote: {
          fi: property.base_price_eur ? `Alkaen ${property.base_price_eur} €/yö.` : "Tarkista ajantasainen hinta.",
          es: property.base_price_eur ? `Desde ${property.base_price_eur} € por noche.` : "Consulta el precio actual.",
          en: property.base_price_eur ? `From €${property.base_price_eur} per night.` : "Check the current price.",
        },
      };
    }).filter((cabin) => cabin.images.length > 0);
  } catch {
    return [];
  }
}
