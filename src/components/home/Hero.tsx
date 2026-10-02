"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    key: "sauna",
    image: photoLibrary.sauna,
    credit: "Visit Finland DataHub",
    href: "/experiences",
    external: false,
  },
  {
    key: "teijo",
    image: photoLibrary.teijoNationalPark,
    credit: "Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Punassuo2.jpg",
    href: "/destinations/teijo-national-park",
    external: false,
  },
  {
    key: "herrankukkaro",
    image: photoLibrary.herrankukkaroSauna,
    credit: "Herrankukkaro",
    href: "https://www.herrankukkaro.fi/",
    external: true,
  },
  {
    key: "storfinnhova",
    image: photoLibrary.storfinnhova,
    credit: "Storfinnhova Gård",
    href: "https://www.storfinnhova.com/",
    external: true,
  },
  {
    key: "natura",
    image: photoLibrary.naturaVivaTeijo,
    credit: "Natura Viva",
    href: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop",
    external: true,
  },
  {
    key: "bjorkholm",
    image: photoLibrary.bjorkholm,
    credit: "Björkholm mökit Oy",
    href: "https://bjorkholm.johku.com/",
    external: true,
  },
  {
    key: "pumpkin",
    image: photoLibrary.pumpkinWeeks,
    credit: "Visit Salo / Kurpitsaviikot",
    href: "/events",
    external: false,
  },
  {
    key: "christmas",
    image: photoLibrary.mathildedalChristmas,
    credit: "Visit Mathildedal",
    href: "/events",
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
] as const;

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };

const copy: Record<"fi" | "es" | "en", Record<(typeof slides)[number]["key"], SlideCopy>> = {
  fi: {
    sauna: { eyebrow: "Sauna · Suomi", title: "Lämpöä, hiljaisuutta ja vettä", text: "Sauna kuuluu suomalaisen kesän tärkeimpiin hetkiin – järven, meren tai metsän äärellä.", cta: "Tutustu elämyksiin" },
    teijo: { eyebrow: "Teijon kansallispuisto", title: "Metsä alkaa läheltä rannikkoa", text: "Järviä, kallioita, metsiä ja rauhallisia reittejä Salon seudulla.", cta: "Tutustu kohteeseen" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Suomen kesä alkaa rannikon pienistä paikoista", text: "Pitkiä iltoja, saaristoa, ruukkikyliä ja rauhallisia mökkipäiviä.", cta: "Tutustu kohteisiin" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Savusauna meren äärellä", text: "Herrankukkaro yhdistää saariston, savusaunan, majoituksen ja paikalliset maut.", cta: "Siirry palveluntarjoajalle" },
    storfinnhova: { eyebrow: "Kemiönsaari", title: "Yövy metsäkylässä", text: "Maanalainen graniittinen savusauna, puumajat ja glamping luonnon keskellä.", cta: "Siirry palveluntarjoajalle" },
    natura: { eyebrow: "Teijon kansallispuisto · Salo", title: "Melo, pyöräile ja pysähdy nuotiolle", text: "Natura Vivan vuokraamosta lähdet Matildanjärven vesille ja Teijon reiteille.", cta: "Siirry palveluntarjoajalle" },
    bjorkholm: { eyebrow: "Parainen · Turun saaristo", title: "Jätä murheet mantereelle", text: "Saunamökki, meri, vene, melonta ja saaristoon saapuminen lossilla.", cta: "Siirry palveluntarjoajalle" },
    pumpkin: { eyebrow: "Salo · 9.–18.10.2026", title: "Kurpitsaviikot tuovat syksyn valoon", text: "Kurpitsapuisto, paikalliset maut, Mathildedalin kummitukset ja koko Salon syyslomakausi.", cta: "Katso tapahtumat" },
    christmas: { eyebrow: "Mathildedal · 21. & 28.11.2026", title: "Joulu tuntuu paremmalta pienessä kylässä", text: "Valaistu ruukkimiljöö, käsityöläiset, lähiruoka ja joulumarkkinat.", cta: "Katso tapahtumat" },
    archipelago: { eyebrow: "Turun saaristo", title: "Herää saariston omaan rytmiin", text: "Pieni mökki, meri ja kalliosaaret tekevät saaristosta paikan, jossa loma alkaa heti.", cta: "Tutustu saaristoon" },
  },
  es: {
    sauna: { eyebrow: "Sauna · Finlandia", title: "Calor, silencio y agua", text: "La sauna forma parte de los momentos esenciales del verano finlandés, junto al lago, el mar o el bosque.", cta: "Explorar experiencias" },
    teijo: { eyebrow: "Parque Nacional de Teijo", title: "El bosque empieza cerca de la costa", text: "Lagos, rocas, bosques y rutas tranquilas en la región de Salo.", cta: "Explorar destino" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "El verano finlandés empieza en la costa", text: "Largas tardes, archipiélago, pueblos históricos y cabañas tranquilas junto al agua.", cta: "Explorar destinos" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Sauna de humo junto al mar", text: "Herrankukkaro combina archipiélago, sauna de humo, alojamiento y gastronomía local.", cta: "Ir al proveedor" },
    storfinnhova: { eyebrow: "Kemiönsaari", title: "Duerme en un pueblo del bosque", text: "Sauna de humo de granito subterránea, casas en los árboles y glamping en plena naturaleza.", cta: "Ir al proveedor" },
    natura: { eyebrow: "Parque Nacional de Teijo · Salo", title: "Kayak, bicicleta y fuego en el bosque", text: "Alquila equipo en Natura Viva y descubre el lago Matildanjärvi y las rutas de Teijo.", cta: "Ir al proveedor" },
    bjorkholm: { eyebrow: "Parainen · Archipiélago de Turku", title: "Deja las preocupaciones en tierra firme", text: "Cabaña con sauna, mar, barcos, kayak y la llegada a la isla en ferry.", cta: "Ir al proveedor" },
    pumpkin: { eyebrow: "Salo · 9–18.10.2026", title: "Calabazas, luces y otoño finlandés", text: "Kurpitsapuisto, sabores locales y la temporada de fantasmas de Mathildedal.", cta: "Ver eventos" },
    christmas: { eyebrow: "Mathildedal · 21 y 28.11.2026", title: "La Navidad se siente mejor en un pequeño pueblo", text: "Fábricas iluminadas, artesanía, gastronomía local y mercados navideños.", cta: "Ver eventos" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Despierta al ritmo del archipiélago", text: "Una pequeña casa, el mar y las islas rocosas crean el ambiente de unas vacaciones que empiezan nada más llegar.", cta: "Explorar el archipiélago" },
  },
  en: {
    sauna: { eyebrow: "Sauna · Finland", title: "Warmth, silence and water", text: "Sauna is one of the essential Finnish summer moments – by a lake, the sea or deep in the woods.", cta: "Explore experiences" },
    teijo: { eyebrow: "Teijo National Park", title: "The forest begins close to the coast", text: "Lakes, rocky landscapes, forests and quiet trails in the Salo region.", cta: "Explore destination" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Finnish summer begins in the small places on the coast", text: "Long evenings, archipelago islands, ironworks villages and quiet cottage days by the water.", cta: "Explore destinations" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Smoke sauna by the sea", text: "Herrankukkaro brings together archipelago nature, smoke sauna, accommodation and local food.", cta: "Visit provider" },
    storfinnhova: { eyebrow: "Kemiönsaari", title: "Sleep in a forest village", text: "An underground granite smoke sauna, tree cabins and glamping in the woods.", cta: "Visit provider" },
    natura: { eyebrow: "Teijo National Park · Salo", title: "Paddle, cycle and stop by the fire", text: "Rent equipment from Natura Viva and explore Lake Matildanjärvi and the Teijo trails.", cta: "Visit provider" },
    bjorkholm: { eyebrow: "Parainen · Turku Archipelago", title: "Leave your worries on the mainland", text: "A cottage sauna, sea, boats, kayaking and the ferry crossing are part of the island experience.", cta: "Visit provider" },
    pumpkin: { eyebrow: "Salo · 9–18 Oct 2026", title: "Pumpkins bring autumn to life", text: "Kurpitsapuisto, local flavours and the Halloween season in Mathildedal.", cta: "See events" },
    christmas: { eyebrow: "Mathildedal · 21 & 28 Nov 2026", title: "Christmas feels different in a small village", text: "Lit-up ironworks, local crafts, food and traditional Christmas markets.", cta: "See events" },
    archipelago: { eyebrow: "Turku Archipelago", title: "Wake up to the rhythm of the islands", text: "A small wooden house, open water and rocky islands create the feeling of a Finnish coastal escape.", cta: "Explore the archipelago" },
  },
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const [active, setActive] = useState(0);

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
        <div className="absolute right-4 top-[calc(68svh-3rem)] z-20 rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-sm sm:top-[660px] lg:top-[680px]">
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
