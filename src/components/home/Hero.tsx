"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";
import { photoLibrary } from "@/lib/photo-library";

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };
type Slide = {
  key: string;
  image: string;
  credit: string;
  creditUrl?: string;
  href: string;
  external?: boolean;
};

const slides: Slide[] = [
  {
    key: "spring",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg",
    credit: "Sanzzu / Wikimedia Commons (CC BY)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg",
    href: "/destinations",
  },
  {
    key: "autumn",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg/1280px-Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg",
    credit: "Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg",
    href: "/destinations",
  },
  {
    key: "summer",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mathildedal_harbour_sunset.jpg",
    credit: "Kotivalo / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Mathildedal_harbour_sunset.jpg",
    href: "/destinations",
  },
  {
    key: "cottage",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
    credit: "Kospo75 / Wikimedia Commons (CC BY-SA 3.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
    href: "/accommodations",
  },
  {
    key: "archipelago",
    image: photoLibrary.turkuArchipelago,
    credit: "Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Turun_saaristo_1.jpg",
    href: "/destinations/turku",
  },
  {
    key: "hanko",
    image: photoLibrary.hankoRegattaBeach,
    credit: "W.carter / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg",
    href: "/destinations/hanko",
  },
  {
    key: "naantali",
    image: photoLibrary.naantaliOldTown,
    credit: "Tatu Kosonen / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Old_Town_of_Naantali,_Finland.jpg",
    href: "/destinations/naantali",
  },
  {
    key: "mathildedal",
    image: photoLibrary.mathildedalVillage,
    credit: "Kotivalo / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg",
    href: "/destinations/salo-mathildedal",
  },
  {
    key: "aland",
    image: photoLibrary.aland,
    credit: "Håkan Skogsjö / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg",
    href: "/destinations/aland",
  },
  {
    key: "porvoo",
    image: photoLibrary.porvoo,
    credit: "Teemu Eskola / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg",
    href: "/destinations/porvoo",
  },
  {
    key: "herrankukkaro",
    image: photoLibrary.saunaTraditionalSmoke,
    credit: "Kaisu Mokkila / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_sauna_healing.jpg",
    href: "https://www.herrankukkaro.fi/",
    external: true,
  },
];

const fallbackImages: Record<string, string> = {
  spring: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg",
  autumn: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg/1280px-Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg",
  summer: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mathildedal_harbour_sunset.jpg",
  cottage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
  archipelago: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Turun_saaristo_1.jpg",
  hanko: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg",
  naantali: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Town_of_Naantali,_Finland.jpg",
  mathildedal: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mathildedal_harbour_sunset.jpg",
  aland: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kastelholm_2026-08-09_image12.jpg",
  porvoo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Porvoo_old_town.jpg",
  herrankukkaro: photoLibrary.saunaTraditionalSmoke,
};

const copy: Record<"fi" | "es" | "en", Record<string, SlideCopy>> = {
  fi: {
    spring: { eyebrow: "Kevät Suomessa", title: "Herää kevääseen Suomen vehreissä metsissä", text: "Valoisat metsäpolut, kevään ensimmäiset kukat ja raikas saaristo kutsuvat ulos luontoon.", cta: "Löydä kevään kohteet" },
    autumn: { eyebrow: "Syksy saaristossa", title: "Kultainen ruska ja saaristokylien rauha", text: "Värikkäät puut, punaiset rantamakasiinit ja tyyni meri tekevät syysretkestä unohtumattoman.", cta: "Tutustu saaristoon" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Suomen kesä alkaa rannikon pienistä paikoista", text: "Saaristoa, kalliosaaria ja avointa merta – suomalainen kesä parhaimmillaan.", cta: "Tutustu kohteisiin" },
    cottage: { eyebrow: "Suomen mökkikesä", title: "Aamukahvi veden äärellä", text: "Kesämökki, järvi, laituri ja sauna tekevät kiireettömästä päivästä osan Suomen matkaa.", cta: "Katso majoituksia" },
    archipelago: { eyebrow: "Turun saaristo", title: "Sininen meri, sileät kalliot", text: "Kirkas kesäpäivä saaristossa: saaria, mäntyjä ja avointa vettä ilman kiirettä.", cta: "Tutustu saaristoon" },
    hanko: { eyebrow: "Hanko · Suomen etelärannikko", title: "Aurinkoinen ranta ja avoin meri", text: "Hanko on kesää varten: hiekkaranta, Itämeri ja pitkä päivä etelärannikolla.", cta: "Tutustu Hankoon" },
    naantali: { eyebrow: "Naantali", title: "Kesä alkaa vanhasta satamasta", text: "Värikkäät puutalot, satama ja meri johdattavat suoraan saariston tunnelmaan.", cta: "Tutustu Naantaliin" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Historiallinen ruukkikylä meren lähellä", text: "Vanha ruukkimiljöö, käsityöläiset ja kylän kesäinen tunnelma tekevät Mathildedalista omanlaisensa.", cta: "Tutustu Mathildedaliin" },
    aland: { eyebrow: "Ahvenanmaa", title: "Saariston valo jatkuu horisonttiin", text: "Meri, kalliosaaret ja kirkas pohjoismainen kesävalo kutsuvat hidastamaan.", cta: "Tutustu Ahvenanmaahan" },
    porvoo: { eyebrow: "Porvoo", title: "Vanhan kaupungin kesäpäivä", text: "Punaiset ranta-aitat, jokimaisema ja historiallinen keskusta kutsuvat kävelemään hitaasti.", cta: "Tutustu Porvooseen" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Savusauna meren äärellä", text: "Aito savusaunan sisätila, puulauteet ja kivikiuas johdattavat suomalaisen saunan tunnelmaan.", cta: "Siirry palveluntarjoajalle" },
  },
  es: {
    spring: { eyebrow: "Primavera en Finlandia", title: "Despierta entre los bosques verdes de Finlandia", text: "Senderos luminosos, primeras flores y aire fresco invitan a descubrir la naturaleza.", cta: "Descubrir destinos de primavera" },
    autumn: { eyebrow: "Otoño en el archipiélago", title: "Colores dorados y pueblos costeros con encanto", text: "Árboles de colores, casas rojas junto al agua y un mar tranquilo crean una escapada inolvidable.", cta: "Explorar el archipiélago" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "El verano finlandés empieza en la costa", text: "Archipiélago, islas rocosas y mar abierto: el verano finlandés en su mejor versión.", cta: "Explorar destinos" },
    cottage: { eyebrow: "Verano en una cabaña finlandesa", title: "Café junto al agua", text: "Cabaña de verano, lago, embarcadero y sauna para disfrutar Finlandia sin prisas.", cta: "Ver alojamientos" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Mar azul y rocas lisas", text: "Un día de verano luminoso entre islas, pinos y agua abierta.", cta: "Explorar el archipiélago" },
    hanko: { eyebrow: "Hanko · costa sur de Finlandia", title: "Playa soleada y mar abierto", text: "Arena, Báltico y un largo día de verano en el extremo sur de Finlandia.", cta: "Explorar Hanko" },
    naantali: { eyebrow: "Naantali", title: "El verano comienza en el puerto antiguo", text: "Casas de madera, puerto y mar abren la puerta al ambiente del archipiélago.", cta: "Explorar Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Un histórico pueblo siderúrgico junto al mar", text: "Patrimonio industrial, artesanía y ambiente de verano en un pequeño pueblo con carácter.", cta: "Explorar Mathildedal" },
    aland: { eyebrow: "Åland", title: "La luz del archipiélago llega hasta el horizonte", text: "Mar, islas rocosas y luz nórdica para viajar despacio.", cta: "Explorar Åland" },
    porvoo: { eyebrow: "Porvoo", title: "Un día de verano en el casco antiguo", text: "Almacenes rojos junto al río, calles históricas y cafés para disfrutar sin prisa.", cta: "Explorar Porvoo" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Sauna de humo junto al mar", text: "Interior auténtico de una sauna de humo, bancos de madera y una gran estufa de piedras.", cta: "Ir al proveedor" },
  },
  en: {
    spring: { eyebrow: "Spring in Finland", title: "Wake up to Finland’s fresh green forests", text: "Sunlit woodland paths, the first wildflowers and the fresh coastal air invite you outdoors.", cta: "Explore spring destinations" },
    autumn: { eyebrow: "Autumn in the archipelago", title: "Golden foliage and charming coastal villages", text: "Colourful trees, red waterfront houses and calm sea make an autumn escape unforgettable.", cta: "Explore the archipelago" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Finnish summer begins on the small places of the coast", text: "Archipelago islands, rocky shores and open sea – Finland at its brightest.", cta: "Explore destinations" },
    cottage: { eyebrow: "Finnish cottage summer", title: "Morning coffee by the water", text: "A summer cottage, lake, jetty and sauna turn a quiet day into part of the journey.", cta: "See stays" },
    archipelago: { eyebrow: "Turku Archipelago", title: "Blue water, sun-warmed rocks", text: "A bright summer day among islands, pine trees and open water.", cta: "Explore the archipelago" },
    hanko: { eyebrow: "Hanko · Finland's southern coast", title: "A sunlit beach and open sea", text: "Sand, Baltic Sea and a long summer day at Finland's southern tip.", cta: "Explore Hanko" },
    naantali: { eyebrow: "Naantali", title: "Summer begins at the old harbour", text: "Colourful wooden houses, the harbour and the sea open the way to the archipelago.", cta: "Explore Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "A historic ironworks village by the sea", text: "Industrial heritage, local crafts and a relaxed summer atmosphere in a village with character.", cta: "Explore Mathildedal" },
    aland: { eyebrow: "Åland", title: "Archipelago light all the way to the horizon", text: "Sea, rocky islands and bright Nordic summer light invite you to slow down.", cta: "Explore Åland" },
    porvoo: { eyebrow: "Porvoo", title: "A summer day in the old town", text: "Red riverside warehouses, historic streets and cafés made for slowing down.", cta: "Explore Porvoo" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Smoke sauna by the sea", text: "An authentic smoke-sauna interior, wooden benches and a large stone stove reveal the Finnish sauna tradition.", cta: "Visit provider" },
  },
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const cmsSlides = (settings?.homepageSlides ?? [])
    .filter((item) => item.enabled !== false && typeof item.imageUrl === "string" && item.imageUrl.trim().length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const activeSlides = useMemo<Array<Slide & { copy?: SlideCopy }>>(
    () => {
      const editorialPhoto = (item: Slide & { copy?: SlideCopy }): Partial<Slide> => {
        const text = `${item.copy?.eyebrow ?? ""} ${item.copy?.title ?? ""} ${item.copy?.text ?? ""}`.toLocaleLowerCase();
        // Return image and its own attribution together: never show a credit for a different photo.
        if (/savusauna|smoke sauna|sauna de humo|löyly|sauna/.test(text)) return { image: photoLibrary.saunaTraditionalSmoke, credit: "JP Korpi-Vartiainen / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_smoke_sauna.jpg" };
        if (/mathildedal|ruukkikylä|ironworks village|ruukki/.test(text)) return { image: photoLibrary.mathildedalVillage, credit: "Kotivalo / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg" };
        if (/porvoo|punaiset ranta-aitat|red riverside warehouses/.test(text)) return { image: photoLibrary.porvoo, credit: "Teemu Eskola / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg" };
        if (/naantali|vanhasta satamasta|old harbour|puutalot, satama/.test(text)) return { image: photoLibrary.naantaliHarbour, credit: "Pöllö / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Naantali_harbour_and_church.jpg" };
        if (/hanko|beach|ranta|playa/.test(text)) return { image: photoLibrary.hankoRegattaBeach, credit: "W.carter / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg" };
        if (/ahvenanmaa|åland|kastelholm/.test(text)) return { image: photoLibrary.aland, credit: "Håkan Skogsjö / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg" };
        if (/turun saaristo|turku archipelago/.test(text)) return { image: photoLibrary.turkuArchipelago, credit: "Rob Sinclair / Wikimedia Commons (CC BY-SA 2.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Turku_Archipelago.jpg" };
        if (/mökk|cottage|lake|järv|cabaña|alojamiento|aamukahvi veden äärellä/.test(text)) return { image: photoLibrary.saunaCottage, credit: "Kospo75 / Wikimedia Commons (CC BY-SA 3.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg" };
        if (/syksy|syksyinen|autumn|fall foliage|otoño|otoñal|ruska/.test(text)) return { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg/1280px-Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg", credit: "Wikimedia Commons", creditUrl: "https://commons.wikimedia.org/wiki/File:Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg" };
        if (/kevät|spring|primavera/.test(text)) return { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg", credit: "Sanzzu / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg" };
        if (/summer|kesä|verano|meri|coast|costa|saaristo|archipelago/.test(text)) return { image: photoLibrary.mathildedalHarbour, credit: "Kotivalo / Wikimedia Commons (CC BY-SA 4.0)", creditUrl: "https://commons.wikimedia.org/wiki/File:Mathildedal_harbour_sunset.jpg" };
        return { image: item.image };
      };
      const items: Array<Slide & { copy?: SlideCopy }> = cmsSlides.length
        ? cmsSlides.map((item) => ({
            key: item.id,
            image: item.imageUrl,
            credit: item.credit || "",
            creditUrl: item.creditUrl,
            href: item.href || "/destinations",
            external: item.external ?? /^https?:\/\//i.test(item.href || ""),
            copy: item.copy?.[locale] || copy[locale].summer,
          }))
        : slides.map((item) => ({ ...item, copy: copy[locale][item.key] }));
      return items.map((item) => ({ ...item, ...editorialPhoto(item) }));
    },
    [cmsSlides, locale],
  );

  const slideCount = activeSlides.length;

  useEffect(() => {
    setActive((current) => (slideCount ? current % slideCount : 0));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (!slideCount) return null;

  const slide = activeSlides[active] ?? activeSlides[0];
  const text = slide.copy || copy[locale][slide.key] || copy[locale].summer;
  const href = slide.external ? slide.href : `/${locale}${slide.href}`;

  const getImage = (item: Slide & { copy?: SlideCopy }) => {
    if (!failedImages[item.key]) return item.image;

    // CMS slide IDs are database-generated and do not match the built-in slide keys.
    // Choose a fallback from the slide's actual content before using a generic coastal image.
    const searchableCopy = `${item.copy?.eyebrow ?? ""} ${item.copy?.title ?? ""} ${item.copy?.text ?? ""}`.toLocaleLowerCase();
    if (/sauna|savusauna|smoke sauna|löyly/.test(searchableCopy)) return photoLibrary.saunaTraditionalSmoke;
    if (/mökk|cottage|lake|järv|cabaña|alojamiento/.test(searchableCopy)) return photoLibrary.saunaCottage;
    if (/saarist|archipelago|island|isla|saar/.test(searchableCopy)) return photoLibrary.turkuArchipelago;
    if (/hanko|beach|ranta|playa/.test(searchableCopy)) return photoLibrary.hankoRegattaBeach;
    if (/mathildedal|ruukk|ironworks/.test(searchableCopy)) return photoLibrary.mathildedalVillage;
    return fallbackImages[item.key] || photoLibrary.hero;
  };

  const markImageFailed = (key: string) => {
    setFailedImages((current) => (current[key] ? current : { ...current, [key]: true }));
  };

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div className="absolute inset-0">
        {activeSlides.map((item, index) => (
          <div
            key={item.key}
            className={`absolute inset-x-0 top-0 h-[34svh] bg-brand-950 transition-opacity duration-700 sm:inset-0 sm:h-auto ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={index !== active}
          >
            <Image
              src={getImage(item)}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              quality={100}
              unoptimized
              onError={() => markImageFailed(item.key)}
              className="object-cover brightness-110 contrast-105"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />

      <div className="relative z-10 flex min-h-[76svh] items-end pb-7 pt-[36svh] sm:min-h-[600px] sm:pb-12 sm:pt-28 lg:min-h-[680px] lg:pb-16 lg:pt-32">
        <div className="container-narrow w-full">
          <div key={slide.key} className="max-w-4xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-gold-300 sm:mb-4 sm:text-xs sm:tracking-[.24em]">{text.eyebrow}</p>
            <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight tracking-[-.03em] sm:text-6xl sm:leading-[.96] lg:text-[5.4rem]">{text.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-5 text-white/90 sm:mt-6 sm:text-xl sm:leading-8 lg:text-2xl lg:leading-9">{text.text}</p>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t border-white/15 bg-white text-brand-950 shadow-[0_-10px_30px_rgba(15,23,42,0.12)]">
        <div className="container-narrow flex min-h-[88px] items-center justify-between gap-4 py-4 sm:min-h-[104px] sm:py-5">
          {href ? (
            slide.external ? (
              <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-300 px-6 py-3 text-sm font-bold transition hover:bg-gold-200 sm:px-7 sm:text-base">
                {text.cta}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link href={href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-300 px-6 py-3 text-sm font-bold transition hover:bg-gold-200 sm:px-7 sm:text-base">
                {text.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          ) : null}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button type="button" aria-label="Edellinen dia" onClick={() => setActive((current) => (current - 1 + slideCount) % slideCount)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white transition hover:bg-brand-50">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex max-w-[120px] items-center justify-center gap-1.5 overflow-hidden sm:max-w-none">
              {activeSlides.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={`Siirry diaan ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className={`h-2.5 min-w-2.5 rounded-full transition-all ${index === active ? "w-8 bg-brand-800" : "w-2.5 bg-brand-200 hover:bg-brand-300"}`}
                />
              ))}
            </div>
            <button type="button" aria-label="Seuraava dia" onClick={() => setActive((current) => (current + 1) % slideCount)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white transition hover:bg-brand-50">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {slide.credit ? (
        <div className="absolute bottom-[104px] right-3 z-20 max-w-[75%] rounded-full bg-black/45 px-3 py-1.5 text-[10px] text-white/85 backdrop-blur-sm sm:bottom-[120px] sm:right-6">
          {slide.creditUrl ? (
            <a href={slide.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-white/40 underline-offset-2 hover:decoration-white">Kuva: {slide.credit}</a>
          ) : (
            <>Kuva: {slide.credit}</>
          )}
        </div>
      ) : null}
    </section>
  );
}
