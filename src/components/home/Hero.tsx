"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";
import { photoLibrary } from "@/lib/photo-library";

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
    href: "/destinations/hanko",
    external: false,
  },
  {
    key: "naantali",
    image: photoLibrary.naantaliHarbour,
    credit: "Pöllö / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Naantali_harbour_and_church.jpg",
    href: "/destinations/naantali",
    external: false,
  },
  {
    key: "mathildedal",
    image: photoLibrary.mathildedalVillage,
    credit: "Kotivalo / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg",
    href: "/destinations/mathildedal",
    external: false,
  },
  {
    key: "aland",
    image: photoLibrary.aland,
    credit: "Håkan Skogsjö / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg",
    href: "/destinations/aland",
    external: false,
  },
  {
    key: "porvoo",
    image: photoLibrary.porvoo,
    credit: "Teemu Eskola / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg",
    href: "/destinations/porvoo",
    external: false,
  },
  {
    key: "hankoBeach",
    image: photoLibrary.hankoRegattaBeach,
    credit: "W.carter / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg",
    href: "/destinations/hanko",
    external: false,
  },
  {
    key: "herrankukkaro",
    image: photoLibrary.herrankukkaroSauna,
    credit: "Herrankukkaro",
    href: "https://www.herrankukkaro.fi/",
    external: true,
  },
] as const;

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };

const copy: Record<"fi" | "es" | "en", Record<(typeof slides)[number]["key"], SlideCopy>> = {
  fi: {
    cottage: { eyebrow: "Suomen mökkikesä", title: "Aamukahvi veden äärellä", text: "Valoisa mökkipäivä alkaa järven rannalta – oma sauna, laituri ja luonto aivan vieressä.", cta: "Katso majoituksia" },
    archipelago: { eyebrow: "Turun saaristo", title: "Sininen meri, sileät kalliot", text: "Saariston kesä näyttää parhaat puolensa kirkkaassa päivänvalossa.", cta: "Tutustu saaristoon" },
    hanko: { eyebrow: "Hanko · Suomen eteläkärki", title: "Meri, hiekka ja pitkä kesäpäivä", text: "Hanko yhdistää rannat, puutalot ja saariston raikkaan merituulen.", cta: "Tutustu Hankoon" },
    naantali: { eyebrow: "Naantali", title: "Kesä alkaa vanhasta satamasta", text: "Värikkäät puutalot, meri ja saariston portti tekevät Naantalista täydellisen kesäpäivän.", cta: "Tutustu Naantaliin" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Pieni ruukkikylä, suuri tunnelma", text: "Käsityöläisiä, kahviloita, merta ja metsäpolkuja yhden rauhallisen kylän ympärillä.", cta: "Tutustu Mathildedaliin" },
    aland: { eyebrow: "Ahvenanmaa", title: "Saariston valo jatkuu horisonttiin", text: "Meri, kalliosaaret ja kesän kirkas pohjoismainen valo.", cta: "Tutustu Ahvenanmaahan" },
    porvoo: { eyebrow: "Porvoo", title: "Vanhan kaupungin kesäpäivä", text: "Punaiset ranta-aitat, jokimaisema ja historiallinen keskusta kutsuvat hidastamaan.", cta: "Tutustu Porvooseen" },
    hankoBeach: { eyebrow: "Hanko · rannikko", title: "Paljain jaloin kesään", text: "Aurinkoinen hiekkaranta ja meri – Suomen etelärannikon kesä parhaimmillaan.", cta: "Tutustu Hankoon" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Suomen kesä alkaa rannikon pienistä paikoista", text: "Pitkiä iltoja, saaristoa, ruukkikyliä ja rauhallisia mökkipäiviä.", cta: "Tutustu kohteisiin" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Savusauna meren äärellä", text: "Herrankukkaro yhdistää saariston, savusaunan, majoituksen ja paikalliset maut.", cta: "Siirry palveluntarjoajalle" },
    archipelago: { eyebrow: "Turun saaristo", title: "Herää saariston omaan rytmiin", text: "Pieni mökki, meri ja kalliosaaret tekevät saaristosta paikan, jossa loma alkaa heti.", cta: "Tutustu saaristoon" },
  },
  es: {
    cottage: { eyebrow: "Verano en una cabaña finlandesa", title: "Café junto al agua", text: "Un día de verano junto al lago, con sauna privada, embarcadero y naturaleza alrededor.", cta: "Ver alojamientos" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Mar azul y rocas lisas", text: "El verano del archipiélago en su versión más luminosa y auténtica.", cta: "Explorar el archipiélago" },
    hanko: { eyebrow: "Hanko · extremo sur de Finlandia", title: "Mar, arena y un largo día de verano", text: "Playas, casas de madera y el aire fresco del Báltico.", cta: "Explorar Hanko" },
    naantali: { eyebrow: "Naantali", title: "El verano comienza en el puerto antiguo", text: "Casas de madera, mar y la puerta de entrada al archipiélago.", cta: "Explorar Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Un pequeño pueblo con mucho carácter", text: "Artesanía, cafés, mar y senderos junto a un histórico pueblo industrial.", cta: "Explorar Mathildedal" },
    aland: { eyebrow: "Åland", title: "La luz del archipiélago llega hasta el horizonte", text: "Mar, islas rocosas y la luz nórdica del verano.", cta: "Explorar Åland" },
    porvoo: { eyebrow: "Porvoo", title: "Un día de verano en el casco antiguo", text: "Casas rojas junto al río, historia y cafés para disfrutar sin prisa.", cta: "Explorar Porvoo" },
    hankoBeach: { eyebrow: "Hanko · costa", title: "Camina descalzo hacia el verano", text: "Playa soleada y mar abierto en la costa sur de Finlandia.", cta: "Explorar Hanko" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "El verano finlandés empieza en la costa", text: "Largas tardes, archipiélago, pueblos históricos y cabañas tranquilas junto al agua.", cta: "Explorar destinos" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Sauna de humo junto al mar", text: "Herrankukkaro combina archipiélago, sauna de humo, alojamiento y gastronomía local.", cta: "Ir al proveedor" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Despierta al ritmo del archipiélago", text: "Una pequeña casa, el mar y las islas rocosas crean el ambiente de unas vacaciones que empiezan nada más llegar.", cta: "Explorar el archipiélago" },
  },
  en: {
    cottage: { eyebrow: "Finnish cottage summer", title: "Morning coffee by the water", text: "A bright summer day by the lake, with a private sauna, jetty and nature at your doorstep.", cta: "See stays" },
    archipelago: { eyebrow: "Turku Archipelago", title: "Blue water, sun-warmed rocks", text: "The Finnish archipelago at its brightest – open water, pine trees and summer light.", cta: "Explore the archipelago" },
    hanko: { eyebrow: "Hanko · Finland's southern coast", title: "Sea, sand and a long summer day", text: "Beaches, wooden houses and the fresh breeze of the Baltic Sea.", cta: "Explore Hanko" },
    naantali: { eyebrow: "Naantali", title: "Summer begins at the old harbour", text: "Colourful wooden houses, the sea and the gateway to the archipelago.", cta: "Explore Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "A small village with a big atmosphere", text: "Crafts, cafés, sea and forest trails around a historic ironworks village.", cta: "Explore Mathildedal" },
    aland: { eyebrow: "Åland", title: "Archipelago light all the way to the horizon", text: "Sea, rocky islands and bright Nordic summer light.", cta: "Explore Åland" },
    porvoo: { eyebrow: "Porvoo", title: "A summer day in the old town", text: "Red riverside warehouses, historic streets and cafés made for slowing down.", cta: "Explore Porvoo" },
    hankoBeach: { eyebrow: "Hanko · coast", title: "Walk barefoot into summer", text: "A sunlit sandy beach and open sea on Finland's southern coast.", cta: "Explore Hanko" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Finnish summer begins in the small places on the coast", text: "Long evenings, archipelago islands, ironworks villages and quiet cottage days by the water.", cta: "Explore destinations" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Smoke sauna by the sea", text: "Herrankukkaro brings together archipelago nature, smoke sauna, accommodation and local food.", cta: "Visit provider" },
    archipelago: { eyebrow: "Turku Archipelago", title: "Wake up to the rhythm of the islands", text: "A small wooden house, open water and rocky islands create the feeling of a Finnish coastal escape.", cta: "Explore the archipelago" },
  },
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  const text = active === 0
    ? {
        eyebrow: settings?.heroEyebrow?.[locale] || copy[locale].summer.eyebrow,
        title: settings?.heroTitle?.[locale] || copy[locale].summer.title,
        text: settings?.heroDescription?.[locale] || copy[locale].summer.text,
        cta: settings?.heroCtaLabel?.[locale] || copy[locale].summer.cta,
      }
    : copy[locale][slide.key];
  const isCmsHero = active === 0 && Boolean(settings?.heroImageUrl);
  const toLocalizedHref = (value: string) => {
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.trim().replace(/^\/+/, "").replace(/^(fi|es|en)(?=\/|$)/, "");
    return `/${locale}${normalized ? `/${normalized}` : ""}`;
  };
  const hrefValueResolved = isCmsHero ? settings?.heroCtaUrl || "/destinations" : slide.href;
  const href = toLocalizedHref(hrefValueResolved);
  const isExternal = /^https?:\/\//i.test(href);
  const secondaryHrefValue = isCmsHero ? settings?.heroSecondaryUrl || "/destinations" : "/destinations";
  const secondaryHref = toLocalizedHref(secondaryHrefValue);
  const credit = isCmsHero ? "" : slide.credit;

  return (
    <section className="relative overflow-hidden bg-white text-white">
      {slides.map((item, index) => (
        <div
          key={item.key}
          className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== active}
        >
          <Image
            src={index === 0 && settings?.heroImageUrl ? settings.heroImageUrl : item.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            unoptimized={Boolean(index === 0 && settings?.heroImageUrl)}
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
        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-gold-300">{text.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.03em] sm:text-7xl lg:text-[5.8rem]">
            {text.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-2xl sm:leading-9">
            {text.text}
          </p>

        </div>
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
              {settings?.heroSecondaryLabel?.[locale] || (locale === "es" ? "Ver ideas" : locale === "fi" ? "Katso ideat" : "See ideas")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3" aria-label={locale === "es" ? "Carrusel de imágenes" : locale === "fi" ? "Kuvakaruselli" : "Image carousel"}>
            <button type="button" onClick={() => setActive((current) => (current - 1 + slides.length) % slides.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-brand-950" aria-label={locale === "es" ? "Anterior" : locale === "fi" ? "Edellinen" : "Previous"}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {slides.map((item, index) => (
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
            <button type="button" onClick={() => setActive((current) => (current + 1) % slides.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-brand-950" aria-label={locale === "es" ? "Siguiente" : locale === "fi" ? "Seuraava" : "Next"}>
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-1 hidden text-xs font-semibold text-slate-500 sm:inline">{active + 1} / {slides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
