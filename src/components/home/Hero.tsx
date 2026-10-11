"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";
import { photoLibrary } from "@/lib/photo-library";
import { isSafeUrlOrPath } from "@/lib/utils";

const slides = [
  {
    key: "summer",
    image: photoLibrary.turkuArchipelagoHouse,
    credit: "Henri Sivonen / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Turku_archipelago_house.jpg",
    href: "/destinations",
    external: false,
  },
  {
    key: "cottage",
    image: photoLibrary.saunaCottage,
    credit: "Kospo75 / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
    href: "/accommodations",
    external: false,
  },
  {
    key: "archipelago",
    image: photoLibrary.turkuArchipelago,
    credit: "Rob Sinclair / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Turku_Archipelago.jpg",
    href: "/destinations",
    external: false,
  },
  {
    key: "hanko",
    image: photoLibrary.hankoAerial,
    credit: "Kallerna / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Hanko_aerial_1.jpg",
    href: "/hanko",
    external: false,
  },
  {
    key: "naantali",
    image: photoLibrary.naantaliHarbour,
    credit: "Pöllö / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Naantali_harbour_and_church.jpg",
    href: "/naantali",
    external: false,
  },
  {
    key: "salo",
    image: photoLibrary.mathildedalVillage,
    credit: "Kotivalo / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg",
    href: "/salo",
    external: false,
  },
  {
    key: "aland",
    image: photoLibrary.aland,
    credit: "Håkan Skogsjö / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg",
    href: "/aland",
    external: false,
  },
  {
    key: "porvoo",
    image: photoLibrary.porvoo,
    credit: "Teemu Eskola / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg",
    href: "/porvoo",
    external: false,
  },
  {
    key: "hankoBeach",
    image: photoLibrary.hankoRegattaBeach,
    credit: "W.carter / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg",
    href: "/hanko",
    external: false,
  },

] as const;

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };

const copy: Record<"fi" | "es" | "en", Record<(typeof slides)[number]["key"], SlideCopy>> = {
  fi: {
    cottage: { eyebrow: "Suomen mökkikesä", title: "Aamukahvi veden äärellä", text: "Valoisa mökkipäivä alkaa järven rannalta – oma sauna, laituri ja luonto aivan vieressä.", cta: "Katso majoituksia" },
    archipelago: { eyebrow: "Turun saaristo", title: "Sininen meri, sileät kalliot", text: "Saariston kesä näyttää parhaat puolensa kirkkaassa päivänvalossa.", cta: "Tutustu saaristoon" },
    hanko: { eyebrow: "Hanko · Suomen eteläkärki", title: "Meri, hiekka ja pitkä kesäpäivä", text: "Hanko yhdistää rannat, puutalot ja saariston raikkaan merituulen.", cta: "Tutustu Hankoon" },
    naantali: { eyebrow: "Naantali", title: "Kesä alkaa vanhasta satamasta", text: "Värikkäät puutalot, meri ja saariston portti tekevät Naantalista täydellisen kesäpäivän.", cta: "Tutustu Naantaliin" },
    salo: { eyebrow: "Salo · Varsinais-Suomi", title: "Tutustu Salon seutuun", text: "Kaupunkikulttuuria, historiallisia kyliä, kansallispuisto ja saariston rannat saman alueen sisällä.", cta: "Tutustu Saloon" },
    aland: { eyebrow: "Ahvenanmaa", title: "Saariston valo jatkuu horisonttiin", text: "Meri, kalliosaaret ja kesän kirkas pohjoismainen valo.", cta: "Tutustu Ahvenanmaahan" },
    porvoo: { eyebrow: "Porvoo", title: "Vanhan kaupungin kesäpäivä", text: "Punaiset ranta-aitat, jokimaisema ja historiallinen keskusta kutsuvat hidastamaan.", cta: "Tutustu Porvooseen" },
    hankoBeach: { eyebrow: "Hanko · rannikko", title: "Paljain jaloin kesään", text: "Aurinkoinen hiekkaranta ja meri – Suomen etelärannikon kesä parhaimmillaan.", cta: "Tutustu Hankoon" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Suomen kesä alkaa rannikon pienistä paikoista", text: "Pitkiä iltoja, saaristoa, ruukkikyliä ja rauhallisia mökkipäiviä.", cta: "Tutustu kohteisiin" },
    
  },
  es: {
    cottage: { eyebrow: "Verano en una cabaña finlandesa", title: "Café junto al agua", text: "Un día de verano junto al lago, con sauna privada, embarcadero y naturaleza alrededor.", cta: "Ver alojamientos" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Mar azul y rocas lisas", text: "El verano del archipiélago en su versión más luminosa y auténtica.", cta: "Explorar el archipiélago" },
    hanko: { eyebrow: "Hanko · extremo sur de Finlandia", title: "Mar, arena y un largo día de verano", text: "Playas, casas de madera y el aire fresco del Báltico.", cta: "Explorar Hanko" },
    naantali: { eyebrow: "Naantali", title: "El verano comienza en el puerto antiguo", text: "Casas de madera, mar y la puerta de entrada al archipiélago.", cta: "Explorar Naantali" },
    salo: { eyebrow: "Salo · Finlandia suroccidental", title: "Descubre la región de Salo", text: "Cultura urbana, pueblos históricos, parque nacional y costa del archipiélago en una sola región.", cta: "Explorar Salo" },
    aland: { eyebrow: "Åland", title: "La luz del archipiélago llega hasta el horizonte", text: "Mar, islas rocosas y la luz nórdica del verano.", cta: "Explorar Åland" },
    porvoo: { eyebrow: "Porvoo", title: "Un día de verano en el casco antiguo", text: "Casas rojas junto al río, historia y cafés para disfrutar sin prisa.", cta: "Explorar Porvoo" },
    hankoBeach: { eyebrow: "Hanko · costa", title: "Camina descalzo hacia el verano", text: "Playa soleada y mar abierto en la costa sur de Finlandia.", cta: "Explorar Hanko" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "El verano finlandés empieza en la costa", text: "Largas tardes, archipiélago, pueblos históricos y cabañas tranquilas junto al agua.", cta: "Explorar destinos" },
    
  },
  en: {
    cottage: { eyebrow: "Finnish cottage summer", title: "Morning coffee by the water", text: "A bright summer day by the lake, with a private sauna, jetty and nature at your doorstep.", cta: "See stays" },
    archipelago: { eyebrow: "Turku Archipelago", title: "Blue water, sun-warmed rocks", text: "The Finnish archipelago at its brightest – open water, pine trees and summer light.", cta: "Explore the archipelago" },
    hanko: { eyebrow: "Hanko · Finland's southern coast", title: "Sea, sand and a long summer day", text: "Beaches, wooden houses and the fresh breeze of the Baltic Sea.", cta: "Explore Hanko" },
    naantali: { eyebrow: "Naantali", title: "Summer begins at the old harbour", text: "Colourful wooden houses, the sea and the gateway to the archipelago.", cta: "Explore Naantali" },
    salo: { eyebrow: "Salo · Southwest Finland", title: "Explore the Salo region", text: "Town culture, historic villages, a national park and archipelago coastline in one region.", cta: "Explore Salo" },
    aland: { eyebrow: "Åland", title: "Archipelago light all the way to the horizon", text: "Sea, rocky islands and bright Nordic summer light.", cta: "Explore Åland" },
    porvoo: { eyebrow: "Porvoo", title: "A summer day in the old town", text: "Red riverside warehouses, historic streets and cafés made for slowing down.", cta: "Explore Porvoo" },
    hankoBeach: { eyebrow: "Hanko · coast", title: "Walk barefoot into summer", text: "A sunlit sandy beach and open sea on Finland's southern coast.", cta: "Explore Hanko" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Finnish summer begins in the small places on the coast", text: "Long evenings, archipelago islands, ironworks villages and quiet cottage days by the water.", cta: "Explore destinations" },
    
  },
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const cmsSlides = (settings?.homepageSlides || []).filter((item) => item.enabled !== false && item.rightsConfirmed === true && item.imageUrl && isSafeUrlOrPath(item.imageUrl) && (item.imageUrl.startsWith("/") && !item.imageUrl.startsWith("//") || /^https:\/\//i.test(item.imageUrl)));
  const activeSlides = cmsSlides.length
    ? cmsSlides.map((item) => ({ ...item, key: item.id, image: item.imageUrl }))
    : slides.map((item, index) => ({
        ...item,
        id: item.key,
        imageUrl: item.image,
        sortOrder: index,
        durationMs: 3000,
        enabled: true,
        copy: { fi: copy.fi[item.key], es: copy.es[item.key], en: copy.en[item.key] },
      }));
  const [active, setActive] = useState(0);
  const slideCount = activeSlides.length;
  const activeSlideDuration = activeSlides[active]?.durationMs || 3000;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
    }, activeSlideDuration);

    return () => window.clearInterval(timer);
  }, [active, slideCount, activeSlideDuration]);

  const slide = activeSlides[active];
  const text = cmsSlides.length
    ? slide.copy[locale]
    : copy[locale][slide.key as keyof typeof copy[typeof locale]];
  const toLocalizedHref = (value: string) => {
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.trim().replace(/^\/+/, "").replace(/^(fi|es|en)(?=\/|$)/, "");
    return `/${locale}${normalized ? `/${normalized}` : ""}`;
  };
  const hrefValueResolved = slide.href;
  const href = toLocalizedHref(hrefValueResolved);
  const isExternal = /^https?:\/\//i.test(href);
  const secondaryHrefValue = "/destinations";
  const secondaryHref = toLocalizedHref(secondaryHrefValue);
  const credit = slide.credit;

  return (
    <section className="relative overflow-hidden bg-white text-white">
      {(cmsSlides.length ? activeSlides : slides).map((item, index) => (
        <div
          key={item.key}
          className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== active}
        >
          <Image
            src={cmsSlides.length ? activeSlides[index].imageUrl : item.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            unoptimized={Boolean(cmsSlides.length)}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

      {credit ? (
        <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/45 px-2 py-0.5 text-[8px] leading-3 text-white/65 backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-2.5 sm:py-1 sm:text-[9px]">
          {"creditUrl" in slide && slide.creditUrl ? (
            <a href={slide.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-white/40 underline-offset-2 hover:text-white">
              {credit}
            </a>
          ) : (
            credit
          )}
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-[68svh] items-end pb-10 pt-28 sm:min-h-[700px] sm:pb-16 lg:min-h-[720px] lg:pb-20">
        <div className="container-narrow w-full">
        <motion.div
          key={String(slide.key)}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-gold-300">{text.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.03em] sm:text-7xl lg:text-[5.8rem]">
            {text.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-2xl sm:leading-9">
            {text.text}
          </p>
        </motion.div>
      </div>
      </div>

      <div className="relative z-20 border-t border-slate-200 bg-white text-brand-950 shadow-[0_-10px_30px_rgba(15,23,42,0.08)]">
        <div className="container-narrow flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {isExternal ? (
              <a href={href} target="_blank" rel="noreferrer" className="btn-gold w-full justify-center px-7 py-4 sm:w-auto">
                {text.cta} <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link href={href} className="btn-gold w-full justify-center px-7 py-4 sm:w-auto">
                {text.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link href={secondaryHref} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-7 py-4 text-sm font-bold text-brand-950 hover:bg-brand-100 sm:w-auto">
              {locale === "es" ? "Ver ideas" : locale === "fi" ? "Katso ideat" : "See ideas"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3" aria-label={locale === "es" ? "Carrusel de imágenes" : locale === "fi" ? "Kuvakaruselli" : "Image carousel"}>
            <button type="button" onClick={() => setActive((current) => (current - 1 + activeSlides.length) % activeSlides.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-brand-950" aria-label={locale === "es" ? "Anterior" : locale === "fi" ? "Edellinen" : "Previous"}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {activeSlides.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all ${index === active ? "w-10 bg-white" : "w-4 bg-white/40"}`}
                  aria-label={locale === "es" ? `Diapositiva ${index + 1}` : locale === "fi" ? `Dia ${index + 1}` : `Slide ${index + 1}`}
                  aria-current={index === active}
                />
              ))}
            </div>
            <button type="button" onClick={() => setActive((current) => (current + 1) % activeSlides.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-brand-950" aria-label={locale === "es" ? "Siguiente" : locale === "fi" ? "Seuraava" : "Next"}>
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-1 hidden text-xs font-semibold text-slate-500 sm:inline">{active + 1} / {activeSlides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
