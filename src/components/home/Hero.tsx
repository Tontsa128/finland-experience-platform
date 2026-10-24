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
  durationMs?: number;
  credit: string;
  creditUrl?: string;
  href: string;
  external?: boolean;
};

const slides: Slide[] = [
  {
    key: "spring",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg",
    credit: "Sanzzu / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg",
    href: "/destinations",
  },
  {
    key: "autumn",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg/1280px-Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg",
    credit: "Fred Sundén / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg",
    href: "/destinations",
  },
  {
    key: "summer",
    image: photoLibrary.sarkisalo,
    credit: "Motopark / Wikimedia Commons (CC BY-SA 3.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Ulkoluotosilta3.jpg",
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
    credit: "Rob Sinclair / Wikimedia Commons (CC BY-SA 2.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Turku_Archipelago.jpg",
    href: "/destinations/turku",
  },
  {
    key: "hanko",
    image: photoLibrary.hankoRegattaBeach,
    credit: "W.carter / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg",
    href: "/destinations/hanko",
  },
  {
    key: "naantali",
    image: photoLibrary.naantaliOldTown,
    credit: "Tatu Kosonen / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Old_Town_of_Naantali,_Finland.jpg",
    href: "/destinations/naantali",
  },
  {
    key: "mathildedal",
    image: photoLibrary.mathildedalVillage,
    credit: "Kotivalo / Wikimedia Commons (CC BY-SA 3.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg",
    href: "/destinations/salo-mathildedal",
  },
  {
    key: "aland",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kastelholms-slott-1.jpg",
    credit: "Helgi Þorsteinsson / norden.org (CC BY 2.5)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kastelholms-slott-1.jpg",
    href: "/destinations/aland",
  },
  {
    key: "porvoo",
    image: photoLibrary.porvoo,
    credit: "Teemu Eskola / Wikimedia Commons (CC BY-SA 3.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg",
    href: "/destinations/porvoo",
  },
  {
    key: "herrankukkaro",
    image: photoLibrary.saunaWhisking,
    credit: "Ville Kurki / Wikimedia Commons (CC BY-SA 4.0)",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_sauna_whisking_and_l%C3%B6yly.jpg",
    href: "https://www.herrankukkaro.fi/",
    external: true,
  },
];

const fallbackImages: Record<string, string> = {
  spring: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forest_path_through_a_deciduous_forest_in_spring,_Finland.jpg",
  autumn: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg/1280px-Kyrkbacken_i_Nagu_h%C3%B6sten_2019_01.jpg",
  summer: photoLibrary.sarkisalo,
  cottage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
  archipelago: photoLibrary.turkuArchipelago,
  hanko: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg",
  naantali: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Town_of_Naantali,_Finland.jpg",
  mathildedal: photoLibrary.mathildedalVillage,
  aland: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kastelholms-slott-1.jpg",
  porvoo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Porvoo_old_town.jpg",
  herrankukkaro: photoLibrary.saunaWhisking,
};

const copy: Record<"fi" | "es" | "en", Record<string, SlideCopy>> = {
  fi: {
    spring: { eyebrow: "Kevät Suomessa", title: "Herää kevääseen Suomen vehreissä metsissä", text: "Valoisat metsäpolut, kevään ensimmäiset lehdet ja raikas kevätilma kutsuvat ulos luontoon.", cta: "Löydä kevään kohteet" },
    autumn: { eyebrow: "Syksy Nauvon saaristossa", title: "Nauvon kirkonkylä syksyn väreissä", text: "Ilmakuva näyttää Kyrkbackenin kylän syksyisenä kokonaisuutena, kun puiden ruska värittää saaristomaisemaa.", cta: "Tutustu saaristoon" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Löydä rannikon rauhalliset reitit ja merimaisemat", text: "Pienet sillat, rantakalliot ja saaristotiet johdattavat pois kiireestä Suomen rannikon maisemiin.", cta: "Tutustu kohteisiin" },
    cottage: { eyebrow: "Suomen mökkikesä", title: "Aamukahvi veden äärellä", text: "Kesämökki, järvi, laituri ja sauna tekevät kiireettömästä päivästä osan Suomen matkaa.", cta: "Katso majoituksia" },
    archipelago: { eyebrow: "Turun saaristo", title: "Pieni puutalo saariston keskellä", text: "Saaristomaisemaan asettuva puutalo kertoo elävästä saaristosta ja sen rauhallisesta arjesta.", cta: "Tutustu saaristoon" },
    hanko: { eyebrow: "Hanko · Suomen etelärannikko", title: "Aurinkoinen ranta ja avoin meri", text: "Hanko on kesää varten: hiekkaranta, Itämeri ja pitkä päivä etelärannikolla.", cta: "Tutustu Hankoon" },
    naantali: { eyebrow: "Naantali", title: "Kävele Naantalin vanhan kaupungin puutalokaduilla", text: "Historialliset puutalot ja kapeat kadut kutsuvat rauhalliselle kävelylle meren läheiseen vanhaan kaupunkiin.", cta: "Tutustu Naantaliin" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Tutustu Mathildedalin historialliseen ruukkimiljööseen", text: "Vuodelta 1852 peräisin oleva Anttipoffin rakennus kertoo kylän ruukkihistoriasta ja vanhoista työväenasunnoista.", cta: "Tutustu Mathildedaliin" },
    aland: { eyebrow: "Ahvenanmaa", title: "Tutustu Ahvenanmaan historialliseen Kastelholman linnaan", text: "Kastelholman linna kertoo Ahvenanmaan historiasta ja tarjoaa konkreettisen pysähdyspaikan saaristomatkalle.", cta: "Tutustu Ahvenanmaahan" },
    porvoo: { eyebrow: "Porvoo", title: "Näe Porvoon vanha kaupunki yläilmoista", text: "Ilmasta avautuva näkymä näyttää historiallisen kaupungin kokonaisuutena ja kutsuu tutustumaan sen kaduille.", cta: "Tutustu Porvooseen" },
    herrankukkaro: { eyebrow: "Suomalainen saunaperinne", title: "Koe suomalainen saunominen ja vihtominen", text: "Perinteinen vihta, löyly ja rauhallinen saunahetki kuuluvat suomalaiseen saunaperinteeseen.", cta: "Siirry palveluntarjoajalle" },
  },
  es: {
    spring: { eyebrow: "Primavera en Finlandia", title: "Despierta entre los bosques verdes de Finlandia", text: "Senderos luminosos, hojas nuevas y aire fresco de primavera invitan a descubrir la naturaleza.", cta: "Descubrir destinos de primavera" },
    autumn: { eyebrow: "Otoño en el archipiélago de Nagu", title: "El pueblo de Nagu bajo los colores del otoño", text: "La vista aérea muestra Kyrkbacken en otoño, con los colores de los árboles transformando el paisaje del archipiélago.", cta: "Explorar el archipiélago" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Descubre rutas tranquilas y paisajes costeros", text: "Pequeños puentes, rocas junto al mar y carreteras entre islas te alejan de las prisas y te acercan a la costa finlandesa.", cta: "Explorar destinos" },
    cottage: { eyebrow: "Verano en una cabaña finlandesa", title: "Café junto al agua", text: "Cabaña de verano, lago, embarcadero y sauna para disfrutar Finlandia sin prisas.", cta: "Ver alojamientos" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Una pequeña casa de madera entre las islas", text: "Una casa de madera en el archipiélago muestra el carácter habitado y tranquilo de las islas finlandesas.", cta: "Explorar el archipiélago" },
    hanko: { eyebrow: "Hanko · costa sur de Finlandia", title: "Playa soleada y mar abierto", text: "Arena, Báltico y un largo día de verano en el extremo sur de Finlandia.", cta: "Explorar Hanko" },
    naantali: { eyebrow: "Naantali", title: "Pasea por las calles de madera del casco antiguo", text: "Las casas históricas de madera y las calles estrechas invitan a pasear sin prisa por esta localidad junto al mar.", cta: "Explorar Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Descubre el histórico pueblo siderúrgico de Mathildedal", text: "El edificio Anttipoffi, de 1852, cuenta la historia industrial del pueblo y de las antiguas viviendas de sus trabajadores.", cta: "Explorar Mathildedal" },
    aland: { eyebrow: "Åland", title: "Descubre el histórico castillo de Kastelholm", text: "El castillo de Kastelholm cuenta parte de la historia de Åland y ofrece una visita concreta durante tu viaje por las islas.", cta: "Explorar Åland" },
    porvoo: { eyebrow: "Porvoo", title: "Contempla el casco antiguo de Porvoo desde el aire", text: "La vista aérea muestra el conjunto histórico de la ciudad e invita a descubrir sus calles a pie.", cta: "Explorar Porvoo" },
    herrankukkaro: { eyebrow: "Tradición finlandesa", title: "Descubre la sauna finlandesa y el uso de la vihta", text: "La vihta, el vapor y un momento tranquilo en la sauna forman parte de la tradición finlandesa.", cta: "Ir al proveedor" },
  },
  en: {
    spring: { eyebrow: "Spring in Finland", title: "Wake up to Finland’s fresh green forests", text: "Sunlit woodland paths, fresh leaves and crisp spring air invite you outdoors.", cta: "Explore spring destinations" },
    autumn: { eyebrow: "Autumn in the Nagu archipelago", title: "Nagu village in its autumn colours", text: "The aerial view shows Kyrkbacken in autumn, with colourful foliage transforming the archipelago landscape.", cta: "Explore the archipelago" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Find quiet coastal routes and sea views", text: "Small bridges, rocky shores and island roads lead away from the rush and into Finland’s coastal landscapes.", cta: "Explore destinations" },
    cottage: { eyebrow: "Finnish cottage summer", title: "Morning coffee by the water", text: "A summer cottage, lake, jetty and sauna turn a quiet day into part of the journey.", cta: "See stays" },
    archipelago: { eyebrow: "Turku Archipelago", title: "A small wooden house among the islands", text: "A wooden house in the archipelago captures the lived-in, peaceful character of Finland’s island communities.", cta: "Explore the archipelago" },
    hanko: { eyebrow: "Hanko · Finland's southern coast", title: "A sunlit beach and open sea", text: "Sand, Baltic Sea and a long summer day at Finland's southern tip.", cta: "Explore Hanko" },
    naantali: { eyebrow: "Naantali", title: "Walk the wooden streets of Naantali’s old town", text: "Historic wooden houses and narrow streets invite you to slow down in this old town by the sea.", cta: "Explore Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Discover Mathildedal’s historic ironworks village", text: "The Anttipoffi building, dating from 1852, tells the story of the village’s ironworks and its former workers’ housing.", cta: "Explore Mathildedal" },
    aland: { eyebrow: "Åland", title: "Discover historic Kastelholm Castle", text: "Kastelholm Castle tells part of Åland’s history and makes a tangible stop on an island journey.", cta: "Explore Åland" },
    porvoo: { eyebrow: "Porvoo", title: "See Porvoo’s old town from above", text: "The aerial view reveals the historic town as a whole and invites you to explore its streets on foot.", cta: "Explore Porvoo" },
    herrankukkaro: { eyebrow: "Finnish sauna tradition", title: "Experience Finnish sauna and birch whisking", text: "A birch whisk, rising steam and a quiet sauna moment are part of Finland’s bathing tradition.", cta: "Visit provider" },
  },
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const cmsSlides = (settings?.homepageSlides ?? [])
    .filter((item) => {
      const localized = item.copy?.[locale];
      return (
        item.enabled !== false &&
        typeof item.imageUrl === "string" &&
        item.imageUrl.trim().length > 0 &&
        typeof localized?.title === "string" &&
        localized.title.trim().length > 0 &&
        typeof localized?.text === "string" &&
        localized.text.trim().length > 0
      );
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const activeSlides = useMemo<Array<Slide & { copy?: SlideCopy }>>(
    () => {
      // The built-in slides use explicit image/copy pairs. Never guess an image from keywords:
      // keyword matching previously caused a valid caption to be paired with an unrelated photo.
      if (cmsSlides.length) {
        return cmsSlides.map((item) => ({
          key: item.id,
          image: item.imageUrl,
          durationMs: Number.isFinite(item.durationMs) && (item.durationMs ?? 0) >= 1500 ? item.durationMs : 5500,
          credit: item.credit || "",
          creditUrl: item.creditUrl,
          href: item.href || "/destinations",
          external: item.external ?? (String(item.href || "").startsWith("https://") || String(item.href || "").startsWith("http://")),
          copy: item.copy[locale],
        }));
      }

      return slides.map((item) => ({
        ...item,
        copy: copy[locale][item.key],
      }));
    },
    [cmsSlides, locale],
  );

  const slideCount = activeSlides.length;

  useEffect(() => {
    setActive((current) => (slideCount ? current % slideCount : 0));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount < 2) return;
    const duration = activeSlides[active]?.durationMs ?? 5500;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slideCount);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [active, activeSlides, slideCount]);

  if (!slideCount) return null;

  const slide = activeSlides[active] ?? activeSlides[0];
  const text = slide.copy || copy[locale][slide.key] || copy[locale].summer;
  const href = slide.external ? slide.href : `/${locale}${slide.href}`;

  const getImage = (item: Slide & { copy?: SlideCopy }) => {
    if (!failedImages[item.key]) return item.image;

    // Only use a fallback explicitly assigned to this built-in slide key.
    // Never infer replacement imagery from copy keywords: that can show the wrong place.
    return fallbackImages[item.key] || item.image;
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
