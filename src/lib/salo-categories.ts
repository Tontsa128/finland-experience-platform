import type { Locale } from "@/types";
import { saloProviders, type SaloProvider } from "@/lib/salo";
import { areaProviderIds, type SaloArea } from "@/lib/salo-areas";

export type SaloCategory = SaloProvider["category"];

export const saloCategorySlugs: Record<SaloCategory, string> = {
  stay: "majoitus",
  food: "ruoka",
  experience: "tekemista",
  nature: "luonto",
  tourism: "matkailuinfo",
};

export const saloCategoryCopy: Record<SaloCategory, Record<Locale, { title: string; intro: string }>> = {
  stay: {
    fi: { title: "Majoitus", intro: "Yövy alueen paikallisissa majoituspaikoissa." },
    en: { title: "Accommodation", intro: "Stay at local accommodation in the area." },
    es: { title: "Alojamiento", intro: "Alójate en establecimientos locales de la zona." },
  },
  food: {
    fi: { title: "Ruoka ja paikalliset maut", intro: "Löydä alueen ravintolat, kahvilat ja paikalliset maut." },
    en: { title: "Food and local flavours", intro: "Explore local restaurants, cafés and flavours." },
    es: { title: "Gastronomía y sabores locales", intro: "Descubre restaurantes, cafeterías y sabores locales." },
  },
  experience: {
    fi: { title: "Tekemistä ja elämyksiä", intro: "Tutustu paikallisiin aktiviteetteihin, retkiin ja elämyksiin." },
    en: { title: "Things to do and experiences", intro: "Discover local activities, excursions and experiences." },
    es: { title: "Actividades y experiencias", intro: "Descubre actividades, excursiones y experiencias locales." },
  },
  nature: {
    fi: { title: "Luonto ja ulkoilu", intro: "Lähde luontoon ja tutustu alueen ulkoilupalveluihin." },
    en: { title: "Nature and outdoors", intro: "Get outdoors and explore local nature services." },
    es: { title: "Naturaleza y actividades al aire libre", intro: "Sal a la naturaleza y descubre servicios al aire libre." },
  },
  tourism: {
    fi: { title: "Matkailuinfo ja oppaat", intro: "Suunnittele vierailu paikallisen matkailutiedon ja oppaiden avulla." },
    en: { title: "Tourist information and guides", intro: "Plan your visit with local information and guides." },
    es: { title: "Información turística y guías", intro: "Planifica tu visita con información local y guías." },
  },
};

export function getSaloAreaCategories(area: SaloArea): SaloCategory[] {
  const ids = new Set(areaProviderIds[area]);
  const available = new Set(
    saloProviders.filter((provider) => ids.has(provider.id)).map((provider) => provider.category),
  );
  return (Object.keys(saloCategorySlugs) as SaloCategory[]).filter((category) => available.has(category));
}

export function getSaloCategoryFromSlug(slug: string): SaloCategory | undefined {
  return (Object.keys(saloCategorySlugs) as SaloCategory[]).find(
    (category) => saloCategorySlugs[category] === slug,
  );
}
