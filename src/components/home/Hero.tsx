"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    key: "summer",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Turun_saaristo_1.jpg/1600px-Turun_saaristo_1.jpg",
    credit: "Kallerna / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Turun_saaristo_1.jpg",
    href: "/destinations",
  },
  {
    key: "cottage",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Summer_cottage%2C_Finland.jpg/1600px-Summer_cottage%2C_Finland.jpg",
    credit: "Νικόλαος Κυριακάκης / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Summer_cottage,_Finland.jpg",
    href: "/accommodations",
  },
  {
    key: "archipelago",
    image: photoLibrary.turkuArchipelago,
    credit: "Elämysmatkat",
    creditUrl: "https://elamysmatkat.com/aktiviteetti/kahden-tunnin-purjehdus-soling-class-purjeveneella/",
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
    image: "https://www.rantapallo.fi/wp-content/uploads/2020/05/suomi-naantali-vanhakaupunki-satama-ss-900x590.jpg",
    credit: "Rantapallo",
    creditUrl: "https://www.rantapallo.fi/suomen-matkailu/suomen-ihanat-kesakohteet-kotimaan-salatut-helmet/",
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
    image: "https://visitaland.wntr.io/uploads/2022/03/20210713-125108.png",
    credit: "Visit Åland",
    creditUrl: "https://visitaland.com/de/segelen-und-leben-an-board/",
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
    image: photoLibrary.herrankukkaroSauna,
    credit: "Herrankukkaro",
    creditUrl: "https://www.herrankukkaro.fi/kuvat",
    href: "https://www.herrankukkaro.fi/",
    external: true,
  },
];

const copy: Record<"fi" | "es" | "en", Record<string, SlideCopy>> = {
  fi: {
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
  const cmsSlides = (settings?.homepageSlides ?? [])
    .filter((item) => item.enabled !== false && typeof item.imageUrl === "string" && item.imageUrl.trim().length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeSlides: Array<Slide & { copy?: SlideCopy }> = cmsSlides.length
    ? cmsSlides.map((item) => ({
        key: item.id,
        image: item.imageUrl,
        credit: item.credit || "",
        creditUrl: item.creditUrl,
        href: item.href || "/destinations",
        external: item.external ?? /^https?:\/\//i.test(item.href || ""),
        copy: item.copy?.[locale],
      }))
    : slides.map((item) => ({ ...item, copy: copy[locale][item.key] }));
  const [active, setActive] = useState(0);
  const slideCount = activeSlides.length;
  const slide = activeSlides[active % slideCount] ?? activeSlides[0];
  const text = slide.copy || copy[locale][slide.key] || copy[locale].summer;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  const href = slide.external ? slide.href : `/${locale}${slide.href}`;

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div className="absolute inset-0">
        {activeSlides.map((item, index) => (
          <div key={item.key} className={`absolute inset-x-0 top-0 h-[34svh] bg-brand-950 transition-opacity duration-700 sm:inset-0 sm:h-auto ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={index !== active}>
            <Image
              src={item.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              quality={90}
              className="object-cover brightness-110 contrast-105"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 sm:bg-gradient-to-t" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

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
        <div className="container-narrow flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-5">
          {slide.external ? (
            <a href={href} target="_blank" rel="noreferrer" className="btn-gold w-full justify-center px-6 py-3 sm:w-auto sm:px-7 sm:py-4">
              {text.cta} <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <Link href={href} className="btn-gold w-full justify-center px-6 py-3 sm:w-auto sm:px-7 sm:py-4">
              {text.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <div className="flex items-center justify-center gap-2.5" aria-label={locale === "es" ? "Carrusel de imágenes" : locale === "fi" ? "Kuvakaruselli" : "Image carousel"}>
            <button type="button" onClick={() => setActive((current) => (current - 1 + activeSlides.length) % activeSlides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-brand-200 bg-white hover:bg-brand-50" aria-label={locale === "fi" ? "Edellinen" : locale === "es" ? "Anterior" : "Previous"}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex max-w-[42vw] gap-1 overflow-hidden">
              {activeSlides.map((item, index) => (
                <button key={item.key} type="button" onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-brand-900" : "w-3 bg-brand-200"}`} aria-label={locale === "fi" ? `Dia ${index + 1}` : locale === "es" ? `Diapositiva ${index + 1}` : `Slide ${index + 1}`} aria-current={index === active} />
              ))}
            </div>
            <button type="button" onClick={() => setActive((current) => (current + 1) % activeSlides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-brand-200 bg-white hover:bg-brand-50" aria-label={locale === "fi" ? "Seuraava" : locale === "es" ? "Siguiente" : "Next"}>
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="hidden text-xs font-semibold text-slate-500 sm:inline">{active + 1} / {activeSlides.length}</span>
          </div>

          <div className="hidden text-right text-[9px] text-slate-500 sm:block sm:max-w-[180px]">
            {slide.creditUrl ? <a href={slide.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-slate-300 underline-offset-2">{slide.credit}</a> : slide.credit}
          </div>
        </div>
      </div>
    </section>
  );
}
