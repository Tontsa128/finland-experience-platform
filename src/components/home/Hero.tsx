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
    image: photoLibrary.mathildedalHarbour,
    credit: "Kotivalo / Wikimedia Commons",
    href: "/destinations",
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
    key: "ferry",
    image: photoLibrary.archipelagoFerry,
    credit: "Motopark / Wikimedia Commons",
    href: "/destinations",
    external: false,
  },
] as const;

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };

const copy: Record<"fi" | "es" | "en", Record<(typeof slides)[number]["key"], SlideCopy>> = {
  fi: {
    summer: { eyebrow: "Hidden Coastal Finland", title: "Suomen kesä alkaa rannikon pienistä paikoista", text: "Pitkiä iltoja, saaristoa, ruukkikyliä ja rauhallisia mökkipäiviä.", cta: "Tutustu kohteisiin" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Savusauna meren äärellä", text: "Herrankukkaro yhdistää saariston, savusaunan, majoituksen ja paikalliset maut.", cta: "Siirry palveluntarjoajalle" },
    storfinnhova: { eyebrow: "Kemiönsaari", title: "Yövy metsäkylässä", text: "Maanalainen graniittinen savusauna, puumajat ja glamping luonnon keskellä.", cta: "Siirry palveluntarjoajalle" },
    natura: { eyebrow: "Teijon kansallispuisto · Salo", title: "Melo, pyöräile ja pysähdy nuotiolle", text: "Natura Vivan vuokraamosta lähdet Matildanjärven vesille ja Teijon reiteille.", cta: "Siirry palveluntarjoajalle" },
    bjorkholm: { eyebrow: "Parainen · Turun saaristo", title: "Jätä murheet mantereelle", text: "Saunamökki, meri, vene, melonta ja saaristoon saapuminen lossilla.", cta: "Siirry palveluntarjoajalle" },
    pumpkin: { eyebrow: "Salo · 9.–18.10.2026", title: "Kurpitsaviikot tuovat syksyn valoon", text: "Kurpitsapuisto, paikalliset maut, Mathildedalin kummitukset ja koko Salon syyslomakausi.", cta: "Katso tapahtumat" },
    christmas: { eyebrow: "Mathildedal · 21. & 28.11.2026", title: "Joulu tuntuu paremmalta pienessä kylässä", text: "Valaistu ruukkimiljöö, käsityöläiset, lähiruoka ja joulumarkkinat.", cta: "Katso tapahtumat" },
    ferry: { eyebrow: "Turun saaristo", title: "Lossi on osa matkaa", text: "Saaret eivät ole pelkkä päämäärä. Veneet, lossit ja saaristotiet kuuluvat kokemukseen.", cta: "Aloita saaristomatka" },
  },
  es: {
    summer: { eyebrow: "Hidden Coastal Finland", title: "El verano finlandés empieza en la costa", text: "Largas tardes, archipiélago, pueblos históricos y cabañas tranquilas junto al agua.", cta: "Explorar destinos" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Sauna de humo junto al mar", text: "Herrankukkaro combina archipiélago, sauna de humo, alojamiento y gastronomía local.", cta: "Ir al proveedor" },
    storfinnhova: { eyebrow: "Kemiönsaari", title: "Duerme en un pueblo del bosque", text: "Sauna de humo de granito subterránea, casas en los árboles y glamping en plena naturaleza.", cta: "Ir al proveedor" },
    natura: { eyebrow: "Parque Nacional de Teijo · Salo", title: "Kayak, bicicleta y fuego en el bosque", text: "Alquila equipo en Natura Viva y descubre el lago Matildanjärvi y las rutas de Teijo.", cta: "Ir al proveedor" },
    bjorkholm: { eyebrow: "Parainen · Archipiélago de Turku", title: "Deja las preocupaciones en tierra firme", text: "Cabaña con sauna, mar, barcos, kayak y la llegada a la isla en ferry.", cta: "Ir al proveedor" },
    pumpkin: { eyebrow: "Salo · 9–18.10.2026", title: "Calabazas, luces y otoño finlandés", text: "Kurpitsapuisto, sabores locales y la temporada de fantasmas de Mathildedal.", cta: "Ver eventos" },
    christmas: { eyebrow: "Mathildedal · 21 y 28.11.2026", title: "La Navidad se siente mejor en un pequeño pueblo", text: "Fábricas iluminadas, artesanía, gastronomía local y mercados navideños.", cta: "Ver eventos" },
    ferry: { eyebrow: "Archipiélago de Turku", title: "El ferry también forma parte del viaje", text: "Islas, carreteras tranquilas, pequeños ferries y paisajes marítimos.", cta: "Explorar el archipiélago" },
  },
  en: {
    summer: { eyebrow: "Hidden Coastal Finland", title: "Finnish summer begins in the small places on the coast", text: "Long evenings, archipelago islands, ironworks villages and quiet cottage days by the water.", cta: "Explore destinations" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Smoke sauna by the sea", text: "Herrankukkaro brings together archipelago nature, smoke sauna, accommodation and local food.", cta: "Visit provider" },
    storfinnhova: { eyebrow: "Kemiönsaari", title: "Sleep in a forest village", text: "An underground granite smoke sauna, tree cabins and glamping in the woods.", cta: "Visit provider" },
    natura: { eyebrow: "Teijo National Park · Salo", title: "Paddle, cycle and stop by the fire", text: "Rent equipment from Natura Viva and explore Lake Matildanjärvi and the Teijo trails.", cta: "Visit provider" },
    bjorkholm: { eyebrow: "Parainen · Turku Archipelago", title: "Leave your worries on the mainland", text: "A cottage sauna, sea, boats, kayaking and the ferry crossing are part of the island experience.", cta: "Visit provider" },
    pumpkin: { eyebrow: "Salo · 9–18 Oct 2026", title: "Pumpkins bring autumn to life", text: "Kurpitsapuisto, local flavours and the Halloween season in Mathildedal.", cta: "See events" },
    christmas: { eyebrow: "Mathildedal · 21 & 28 Nov 2026", title: "Christmas feels different in a small village", text: "Lit-up ironworks, local crafts, food and traditional Christmas markets.", cta: "See events" },
    ferry: { eyebrow: "Turku Archipelago", title: "The ferry is part of the journey", text: "Islands, quiet roads, little ferries and open sea views are part of the experience.", cta: "Explore the archipelago" },
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
    <section
      className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-brand-950 text-white sm:min-h-[760px]"
    >
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
        <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-sm">
          {credit}
        </div>
      ) : null}

      <div className="container-narrow relative z-10 flex min-h-[calc(100svh-4rem)] items-end pb-20 pt-32 sm:min-h-[760px] sm:pb-24 lg:pb-28">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-gold-300">{text.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.03em] sm:text-7xl lg:text-[5.8rem]">
            {text.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-2xl sm:leading-9">
            {text.text}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {isExternal ? (
              <a href={href} target="_blank" rel="noreferrer" className="btn-gold justify-center px-7 py-4">
                {text.cta} <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link href={href} className="btn-gold justify-center px-7 py-4">
                {text.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link href={secondaryHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-black/15 px-7 py-4 text-sm font-bold backdrop-blur-md hover:bg-white hover:text-brand-950">
              {settings?.heroSecondaryLabel?.[locale] || (locale === "es" ? "Ver ideas" : locale === "fi" ? "Katso ideat" : "See ideas")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3" aria-label={locale === "es" ? "Carrusel de imágenes" : locale === "fi" ? "Kuvakaruselli" : "Image carousel"}>
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
            <span className="ml-1 hidden text-xs font-semibold text-white/65 sm:inline">{active + 1} / {slides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
