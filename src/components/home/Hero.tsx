"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";
import { photoLibrary } from "@/lib/photo-library";

const slides = [
  { key: "summer", image: photoLibrary.turkuArchipelagoSummer, credit: "Elämysmatkat", creditUrl: "https://elamysmatkat.com/aktiviteetti/kahden-tunnin-purjehdus-soling-class-purjeveneella/", href: "/destinations", external: false },
  { key: "cottage", image: photoLibrary.cottageBySaimaa, credit: "Lomarengas / provider image", creditUrl: "https://www.lomarengas.fi/mokit/kouvola-selanpaa-villa-saunaniemi-ii-14600", href: "/accommodations", external: false },
  { key: "archipelago", image: photoLibrary.turkuArchipelago, credit: "YACHT / travel photography", creditUrl: "https://www.yacht.de/en/worldwide/finland-island-hopping-in-the-archipelago-off-turku/", href: "/destinations", external: false },
  { key: "hanko", image: photoLibrary.hankoRegattaBeach, credit: "W.carter / Wikimedia Commons", creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg", href: "/destinations/hanko", external: false },
  { key: "naantali", image: photoLibrary.naantaliHarbour, credit: "Hertz Finland", creditUrl: "https://www.hertz.fi/p/hertzin-matkassa/turun-saariston-rengastie-autoillen", href: "/destinations/naantali", external: false },
  { key: "mathildedal", image: photoLibrary.mathildedalHarbour, credit: "Visit Mathildedal", creditUrl: "https://visitmathildedal.fi/", href: "/destinations/salo-mathildedal", external: false },
  { key: "aland", image: photoLibrary.aland, credit: "Partner image — use subject to existing permission", creditUrl: "https://www.esquire.de/life/reisen/7-geheimtipps-sommer-urlaub", href: "/destinations/aland", external: false },
  { key: "porvoo", image: photoLibrary.porvoo, credit: "Partner image — use subject to existing permission", creditUrl: "https://katjaroue.kuvat.fi/kuvat/Porvoo/", href: "/destinations/porvoo", external: false },
  { key: "hankoBeach", image: photoLibrary.hankoRegattaBeach, credit: "W.carter / Wikimedia Commons", creditUrl: "https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg", href: "/destinations/hanko", external: false },
  { key: "herrankukkaro", image: photoLibrary.herrankukkaroSauna, credit: "Herrankukkaro · kuvapankki", creditUrl: "https://www.herrankukkaro.fi/kuvat", href: "https://www.herrankukkaro.fi/", external: true },
] as const;

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };

const copy: Record<"fi" | "es" | "en", Record<(typeof slides)[number]["key"], SlideCopy>> = {
  fi: {
    cottage: { eyebrow: "Suomen mökkikesä", title: "Aamukahvi veden äärellä", text: "Mökki Saimaan rannalla, laituri ja luonnonrauha – suomalainen kesä parhaimmillaan.", cta: "Katso majoituksia" },
    archipelago: { eyebrow: "Turun saaristo", title: "Sininen meri, sileät kalliot", text: "Saariston kesä näyttää parhaat puolensa kirkkaassa päivänvalossa.", cta: "Tutustu saaristoon" },
    hanko: { eyebrow: "Hanko · Suomen etelärannikko", title: "Aurinkoinen päivä meren äärellä", text: "Hiekkaranta, sininen Itämeri ja Hangon avara kesätunnelma.", cta: "Tutustu Hankoon" },
    naantali: { eyebrow: "Naantali", title: "Kesä alkaa vanhasta satamasta", text: "Värikkäät puutalot, meri ja saariston portti tekevät Naantalista täydellisen kesäpäivän.", cta: "Tutustu Naantaliin" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Kesäpäivä ruukkikylässä", text: "Vanha ruukkimiljöö, satama ja meren läheisyys tekevät Mathildedalista ainutlaatuisen pysähdyksen.", cta: "Tutustu Mathildedaliin" },
    aland: { eyebrow: "Ahvenanmaa", title: "Saariston valo jatkuu horisonttiin", text: "Meri, kalliosaaret ja kesän kirkas pohjoismainen valo.", cta: "Tutustu Ahvenanmaahan" },
    porvoo: { eyebrow: "Porvoo", title: "Vanhan kaupungin kesäpäivä", text: "Punaiset ranta-aitat, jokimaisema ja historiallinen keskusta kutsuvat hidastamaan.", cta: "Tutustu Porvooseen" },
    hankoBeach: { eyebrow: "Hanko · rannikko", title: "Paljain jaloin kesään", text: "Aurinkoinen hiekkaranta ja meri – Suomen etelärannikon kesä parhaimmillaan.", cta: "Tutustu Hankoon" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Suomen kesä alkaa saariston valosta", text: "Purjeveneitä, kalliosaaria ja sinistä vettä – tervetuloa kokemaan Suomen rannikon pitkät kesäpäivät.", cta: "Tutustu kohteisiin" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Savusauna meren äärellä", text: "Herrankukkaro yhdistää saariston, savusaunan, majoituksen ja paikalliset maut.", cta: "Siirry palveluntarjoajalle" },
  },
  es: {
    cottage: { eyebrow: "Verano en una cabaña finlandesa", title: "Café junto al agua", text: "Una cabaña a orillas del lago Saimaa, un embarcadero y la tranquilidad de la naturaleza.", cta: "Ver alojamientos" },
    archipelago: { eyebrow: "Archipiélago de Turku", title: "Mar azul y rocas lisas", text: "El verano del archipiélago en su versión más luminosa y auténtica.", cta: "Explorar el archipiélago" },
    hanko: { eyebrow: "Hanko · costa sur de Finlandia", title: "Un día soleado junto al mar", text: "Playa de arena, Báltico azul y el ambiente veraniego abierto de Hanko.", cta: "Explorar Hanko" },
    naantali: { eyebrow: "Naantali", title: "El verano comienza en el puerto antiguo", text: "Casas de madera, mar y la puerta de entrada al archipiélago.", cta: "Explorar Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "Un día de verano en el pueblo industrial", text: "Un antiguo entorno industrial junto al puerto y al mar convierte Mathildedal en una parada especial.", cta: "Explorar Mathildedal" },
    aland: { eyebrow: "Åland", title: "La luz del archipiélago llega hasta el horizonte", text: "Mar, islas rocosas y la luz nórdica del verano.", cta: "Explorar Åland" },
    porvoo: { eyebrow: "Porvoo", title: "Un día de verano en el casco antiguo", text: "Casas rojas junto al río, historia y cafés para disfrutar sin prisa.", cta: "Explorar Porvoo" },
    hankoBeach: { eyebrow: "Hanko · costa", title: "Camina descalzo hacia el verano", text: "Playa soleada y mar abierto en la costa sur de Finlandia.", cta: "Explorar Hanko" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "El verano finlandés comienza con la luz del archipiélago", text: "Veleros, islas rocosas y agua azul: descubre los largos días de verano de la costa finlandesa.", cta: "Explorar destinos" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Sauna de humo junto al mar", text: "Herrankukkaro combina archipiélago, sauna de humo, alojamiento y gastronomía local.", cta: "Ir al proveedor" },
  },
  en: {
    cottage: { eyebrow: "Finnish cottage summer", title: "Morning coffee by the water", text: "A cottage on Lake Saimaa, a jetty and the calm of Finnish nature.", cta: "See stays" },
    archipelago: { eyebrow: "Turku Archipelago", title: "Blue water, sun-warmed rocks", text: "The Finnish archipelago at its brightest – open water, pine trees and summer light.", cta: "Explore the archipelago" },
    hanko: { eyebrow: "Hanko · Finland's southern coast", title: "A sunny day by the sea", text: "A sandy beach, blue Baltic water and the open summer atmosphere of Hanko.", cta: "Explore Hanko" },
    naantali: { eyebrow: "Naantali", title: "Summer begins at the old harbour", text: "Colourful wooden houses, the sea and the gateway to the archipelago.", cta: "Explore Naantali" },
    mathildedal: { eyebrow: "Mathildedal · Salo", title: "A summer day in the ironworks village", text: "A historic village setting beside the harbour and sea makes Mathildedal a memorable stop.", cta: "Explore Mathildedal" },
    aland: { eyebrow: "Åland", title: "Archipelago light all the way to the horizon", text: "Sea, rocky islands and bright Nordic summer light.", cta: "Explore Åland" },
    porvoo: { eyebrow: "Porvoo", title: "A summer day in the old town", text: "Red riverside warehouses, historic streets and cafés made for slowing down.", cta: "Explore Porvoo" },
    hankoBeach: { eyebrow: "Hanko · coast", title: "Walk barefoot into summer", text: "A sunlit sandy beach and open sea on Finland's southern coast.", cta: "Explore Hanko" },
    summer: { eyebrow: "Hidden Coastal Finland", title: "Finnish summer begins in the light of the archipelago", text: "Sailing boats, rocky islands and blue water — discover the long summer days of Finland's coast.", cta: "Explore destinations" },
    herrankukkaro: { eyebrow: "Rymättylä · Naantali", title: "Smoke sauna by the sea", text: "Herrankukkaro brings together archipelago nature, smoke sauna, accommodation and local food.", cta: "Visit provider" },
  },
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  // Use the reviewed, curated carousel assets in code until the Supabase CMS slide set is verified and updated.
  // This prevents stale homepage_slides and hero_image_url values from overriding the approved images.
  const cmsSlides: HomepageSettings["homepageSlides"] = [];
  const activeSlides = cmsSlides.length ? cmsSlides.map((item) => ({ ...item, key: item.id, image: item.imageUrl })) : slides.map((item, index) => ({ ...item, id: item.key, imageUrl: item.image, sortOrder: index, durationMs: 4000, enabled: true, copy: { fi: copy.fi[item.key], es: copy.es[item.key], en: copy.en[item.key] } }));
  const [active, setActive] = useState(0);
  const slideCount = activeSlides.length;
  const activeSlideDuration = activeSlides[active]?.durationMs || 4000;

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slideCount), activeSlideDuration);
    return () => window.clearInterval(timer);
  }, [active, slideCount, activeSlideDuration]);

  const slide = activeSlides[active];
  const text = cmsSlides.length ? slide.copy[locale] : active === 0 ? { eyebrow: settings?.heroEyebrow?.[locale] || copy[locale].summer.eyebrow, title: settings?.heroTitle?.[locale] || copy[locale].summer.title, text: settings?.heroDescription?.[locale] || copy[locale].summer.text, cta: settings?.heroCtaLabel?.[locale] || copy[locale].summer.cta } : copy[locale][slide.key as keyof typeof copy[typeof locale]];
  const isCmsHero = false;
  const toLocalizedHref = (value: string) => { if (/^https?:\/\//i.test(value)) return value; const normalized = value.trim().replace(/^\/+/, "").replace(/^(fi|es|en)(?=\/|$)/, ""); return `/${locale}${normalized ? `/${normalized}` : ""}`; };
  const hrefValueResolved = isCmsHero ? settings?.heroCtaUrl || "/destinations" : slide.href;
  const href = toLocalizedHref(hrefValueResolved);
  const isExternal = /^https?:\/\//i.test(href);
  const secondaryHrefValue = isCmsHero ? settings?.heroSecondaryUrl || "/destinations" : "/destinations";
  const secondaryHref = toLocalizedHref(secondaryHrefValue);
  const credit = isCmsHero ? "" : slide.credit;

  return (
    <section className="relative overflow-hidden bg-white text-white">
      {(cmsSlides.length ? activeSlides : slides).map((item, index) => (
        <div key={item.key} className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={index !== active}>
          <Image src={item.image} alt="" fill priority={index === 0} sizes="(max-width: 640px) 100vw, 100vw" quality={90} className="object-cover brightness-110 contrast-105" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/5 to-transparent" />
      {credit ? <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/45 px-2 py-0.5 text-[8px] leading-3 text-white/65 backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-2.5 sm:py-1 sm:text-[9px]">{"creditUrl" in slide && slide.creditUrl ? <a href={slide.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-white/40 underline-offset-2 hover:text-white">{credit}</a> : credit}</div> : null}
      <div className="relative z-10 flex min-h-[58svh] items-end pb-8 pt-24 sm:min-h-[600px] sm:pb-14 lg:min-h-[680px] lg:pb-18">
        <div className="container-narrow w-full"><motion.div key={String(slide.key)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} className="max-w-4xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-gold-300 sm:mb-4">{text.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[.96] tracking-[-.03em] sm:text-6xl lg:text-[5.2rem]">{text.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:mt-6 sm:text-xl sm:leading-8">{text.text}</p>
        </motion.div></div>
      </div>
      <div className="relative z-20 border-t border-slate-200 bg-white text-brand-950 shadow-[0_-10px_30px_rgba(15,23,42,0.08)]">
        <div className="container-narrow flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {isExternal ? <a href={href} target="_blank" rel="noreferrer" className="btn-gold w-full justify-center px-7 py-4 sm:w-auto">{text.cta} <ExternalLink className="h-4 w-4" /></a> : <Link href={href} className="btn-gold w-full justify-center px-7 py-4 sm:w-auto">{text.cta} <ArrowRight className="h-4 w-4" /></Link>}
            <Link href={secondaryHref} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-7 py-4 text-sm font-bold text-brand-950 hover:bg-brand-100 sm:w-auto">{settings?.heroSecondaryLabel?.[locale] || (locale === "es" ? "Ver ideas" : locale === "fi" ? "Katso ideat" : "See ideas")} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="flex items-center justify-center gap-3" aria-label={locale === "es" ? "Carrusel de imágenes" : locale === "fi" ? "Kuvakaruselli" : "Image carousel"}>
            <button type="button" onClick={() => setActive((current) => (current - 1 + activeSlides.length) % activeSlides.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-brand-950" aria-label={locale === "es" ? "Anterior" : locale === "fi" ? "Edellinen" : "Previous"}><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex gap-1.5">{activeSlides.map((item, index) => <button key={item.key} type="button" onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-10 bg-white" : "w-4 bg-white/40"}`} aria-label={locale === "es" ? `Diapositiva ${index + 1}` : locale === "fi" ? `Dia ${index + 1}` : `Slide ${index + 1}`} aria-current={index === active} />)}</div>
            <button type="button" onClick={() => setActive((current) => (current + 1) % activeSlides.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-brand-950" aria-label={locale === "es" ? "Siguiente" : locale === "fi" ? "Seuraava" : "Next"}><ChevronRight className="h-5 w-5" /></button>
            <span className="ml-1 hidden text-xs font-semibold text-slate-500 sm:inline">{active + 1} / {activeSlides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
