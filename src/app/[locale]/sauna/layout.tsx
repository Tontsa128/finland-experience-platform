import type { ReactNode } from "react";
import { FeaturedSaunas } from "@/components/sauna/FeaturedSaunas";
import { SaunaCarousel } from "@/components/sauna/SaunaCarousel";
import { photoLibrary } from "@/lib/photo-library";
import type { Locale } from "@/types";

function localeOf(value: string): Locale {
  return value === "fi" || value === "es" || value === "en" ? value : "en";
}

const carouselItems = [
  {
    image: photoLibrary.herrankukkaroSauna,
    title: { fi: "Sauna saaristossa", es: "Sauna en el archipiélago", en: "Sauna in the archipelago" },
    text: { fi: "Herrankukkaron saaristoympäristössä sauna, meri ja paikallinen tunnelma kohtaavat.", es: "En Herrankukkaro, sauna, mar y archipiélago forman una experiencia.", en: "At Herrankukkaro, sauna, sea and archipelago become one experience." },
    credit: "Herrankukkaro",
    source: "https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt",
  },
  {
    image: photoLibrary.storfinnhova,
    title: { fi: "Maanalainen savusauna", es: "Sauna de humo subterránea", en: "Underground smoke sauna" },
    text: { fi: "Storfinnhova Gårdin graniittinen savusauna sijaitsee metsäpuron varrella.", es: "La sauna de humo de granito de Storfinnhova está junto a un arroyo forestal.", en: "Storfinnhova Gård's granite smoke sauna sits beside a forest stream." },
    credit: "Storfinnhova Gård",
    source: "https://www.storfinnhova.com/",
  },
  {
    image: photoLibrary.saunaBoat,
    title: { fi: "Sauna veden äärellä", es: "Sauna junto al agua", en: "Sauna by the water" },
    text: { fi: "Sauna ja vesi kohtaavat kelluvassa saunassa.", es: "La sauna y el agua se encuentran en una sauna flotante.", en: "Sauna and water meet in a floating sauna." },
    credit: "Santeri Viinamäki",
    source: "https://commons.wikimedia.org/wiki/File:Sauna_boat_20180802.jpg",
  },
  {
    image: photoLibrary.saunaTraditionalSmoke,
    title: { fi: "Perinteinen savusauna", es: "Sauna de humo tradicional", en: "Traditional smoke sauna" },
    text: { fi: "Savusauna on suomalaisen saunaperinteen vanha ja tunnistettava muoto.", es: "La sauna de humo es una forma antigua y reconocible de la tradición finlandesa.", en: "The smoke sauna is an old and distinctive form of Finnish sauna tradition." },
    credit: "JP Korpi-Vartiainen",
    source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_smoke_sauna.jpg",
  },
  {
    image: photoLibrary.bjorkholm,
    title: { fi: "Sauna mökkimaisemassa", es: "Sauna en un paisaje de cabaña", en: "Sauna in a cottage setting" },
    text: { fi: "Björkholmin saaristomiljöö tuo mökkielämän ja saunan samaan kokemukseen.", es: "El entorno del archipiélago de Björkholm une la vida de cabaña y la sauna.", en: "Björkholm's archipelago setting brings cottage life and sauna together." },
    credit: "Björkholm mökit Oy",
    source: "https://bjorkholm.johku.com/en_US/cottages/svartan-mokki",
  },
  {
    image: photoLibrary.naturaVivaTeijo,
    title: { fi: "Sauna Teijon luonnossa", es: "Sauna en la naturaleza de Teijo", en: "Sauna in Teijo nature" },
    text: { fi: "Teijon kansallispuiston ympäristö yhdistää luonnon, ulkoilun ja saunan.", es: "El entorno del Parque Nacional de Teijo une naturaleza, actividades al aire libre y sauna.", en: "Teijo National Park surroundings bring nature, outdoor activity and sauna together." },
    credit: "Natura Viva",
    source: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop",
  },
];

export default async function SaunaLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = localeOf(rawLocale);

  return (
    <>
      <FeaturedSaunas locale={locale} />
      <section className="container-narrow py-12 sm:py-16" aria-labelledby="sauna-carousel-title">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">
            {locale === "fi" ? "SAUNA · KUVAT" : locale === "es" ? "SAUNA · IMÁGENES" : "SAUNA · IMAGES"}
          </p>
          <h2 id="sauna-carousel-title" className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            {locale === "fi" ? "Saunaelämys alkaa kuvasta" : locale === "es" ? "La experiencia de sauna empieza con una imagen" : "The sauna experience starts with a picture"}
          </h2>
        </div>
        <SaunaCarousel items={carouselItems} locale={locale} imageLabel={locale === "fi" ? "Kuva" : locale === "es" ? "Imagen" : "Image"} />
      </section>
      {children}
    </>
  );
}
