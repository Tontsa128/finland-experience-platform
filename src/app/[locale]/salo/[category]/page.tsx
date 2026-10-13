import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Coffee, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { getSaloProviderDetailCategory, saloProviders, type SaloProvider } from "@/lib/salo";

const copy = {
  fi: {
    region: "Salon seutu · Varsinais-Suomi",
    back: "Takaisin Salon seudun matkailuun",
    provider: "Avaa kohteen tiedot",
    direct: "Lisätiedot ja varaus suoraan palveluntarjoajalta",
    empty: "Tähän kategoriaan ei ole vielä julkaistu vahvistettuja palveluja.",
    categories: {
      majoitus: ["Majoitus Salossa", "Hotellit, mökit ja maaseutumajoitus", "Löydä majoitus Salon keskustasta, ruukkikylistä ja meren läheltä."],
      ruoka: ["Ruoka ja ravintolat Salossa", "Ravintolat, kahvilat ja paikalliset maut", "Tutustu paikallisiin ruokapaikkoihin ja tarkista aukioloajat suoraan toimijalta."],
      aktiviteetit: ["Aktiviteetit Salon seudulla", "Luonto, ulkoilu, veneily ja retket", "Löydä tekemistä Teijon luonnosta Särkisalon saaristoon."],
      elamykset: ["Tekemistä ja elämyksiä Salossa", "Kulttuuri, opastukset ja paikalliset kokemukset", "Tutustu paikallisiin elämyksiin ja tarkista sisältö sekä saatavuus järjestäjältä."],
      saaristo: ["Saaristo ja merenranta", "Särkisalo, satamat ja saariston palvelut", "Tutustu Salon eteläiseen saaristoon ja meren äärellä toimiviin palveluihin."],
      oppaat: ["Matkailuoppaat ja paikallistieto", "Alueen viralliset matkailuoppaat", "Avaa paikalliset oppaat ja tarkista kohteiden ajantasaiset tiedot niiden omilta sivuilta."],
      kylat: ["Kylät ja maaseutu Salossa", "Perniö, Halikko, Teijo, Mathildedal ja Särkisalo", "Tutustu Salon seudun kyliin ja maaseutualueisiin. Tarkat osoitteet ja palvelut löytyvät kunkin paikan omalta sivulta."],
      tapahtumat: ["Tapahtumat ja sesongit Salossa", "Ajankohtaiset tapahtumat virallisista kalentereista", "Tutustu Salon kaupungin, Mathildedalin ja paikallisten järjestäjien tapahtumakalentereihin. Vahvista päivämäärä ja tapahtuman tiedot aina järjestäjältä."]
    }
  },
  es: {
    region: "Región de Salo · Finlandia suroccidental",
    back: "Volver a la guía turística de Salo",
    provider: "Ver detalles del lugar",
    direct: "Información y reservas directamente con el proveedor",
    empty: "Todavía no hay servicios verificados publicados en esta categoría.",
    categories: {
      majoitus: ["Alojamiento en Salo", "Hoteles, cabañas y alojamientos rurales", "Encuentra alojamiento en el centro, los pueblos históricos y junto al mar."],
      ruoka: ["Gastronomía y restaurantes en Salo", "Restaurantes, cafés y sabores locales", "Descubre lugares para comer y confirma los horarios directamente con cada negocio."],
      aktiviteetit: ["Actividades en la región de Salo", "Naturaleza, aire libre, navegación y excursiones", "Encuentra actividades desde los bosques de Teijo hasta el archipiélago de Särkisalo."],
      elamykset: ["Experiencias en Salo", "Cultura, visitas guiadas y experiencias locales", "Descubre experiencias locales y consulta contenido y disponibilidad con el organizador."],
      saaristo: ["Archipiélago y costa", "Särkisalo, puertos y servicios marítimos", "Explora el archipiélago meridional de Salo y sus servicios junto al mar."],
      oppaat: ["Guías turísticas e información local", "Guías oficiales de la región", "Consulta las guías locales y verifica los datos actuales en sus sitios oficiales."],
      kylat: ["Pueblos y campo de Salo", "Perniö, Halikko, Teijo, Mathildedal y Särkisalo", "Descubre pueblos y zonas rurales de la región de Salo. Consulta cada página para conocer la ubicación y los servicios."],
      tapahtumat: ["Eventos y temporadas en Salo", "Calendarios oficiales de eventos", "Consulta los calendarios de la ciudad de Salo, Mathildedal y los organizadores locales. Confirma siempre las fechas y los detalles con el organizador."]
    }
  },
  en: {
    region: "Salo region · Southwest Finland",
    back: "Back to the Salo region travel guide",
    provider: "View place details",
    direct: "Details and booking directly with the provider",
    empty: "No verified services have been published in this category yet.",
    categories: {
      majoitus: ["Accommodation in Salo", "Hotels, cottages and rural stays", "Find places to stay in the town, historic villages and by the sea."],
      ruoka: ["Food and restaurants in Salo", "Restaurants, cafés and local flavours", "Discover local places to eat and confirm opening hours directly with each business."],
      aktiviteetit: ["Activities in the Salo region", "Nature, outdoors, boating and excursions", "Find things to do from Teijo's forests to the Särkisalo archipelago."],
      elamykset: ["Things to do and experiences in Salo", "Culture, guided tours and local experiences", "Explore local experiences and confirm details and availability with the organiser."],
      saaristo: ["Archipelago and coast", "Särkisalo, harbours and maritime services", "Explore the southern Salo archipelago and services by the sea."],
      oppaat: ["Tourism guides and local information", "Official regional tourism guides", "Browse local guides and verify current details on their official websites."],
      kylat: ["Villages and countryside in Salo", "Perniö, Halikko, Teijo, Mathildedal and Särkisalo", "Explore the villages and rural areas of the Salo region. Each place page provides its own location and local information."],
      tapahtumat: ["Events and seasons in Salo", "Current events from official calendars", "Explore the official event calendars for Salo, Mathildedal and local organisers. Always confirm dates and details with the organiser."]
    }
  }
} as const;

type Category = keyof typeof copy.fi.categories;
const validCategories = Object.keys(copy.fi.categories) as Category[];
function categoryImage(category: Category): string | null {
  if (category === "majoitus") return photoLibrary.mathildedalVillage;
  if (category === "ruoka") return null;
  if (category === "aktiviteetit") return photoLibrary.teijoNationalPark;
  if (category === "saaristo") return photoLibrary.sarkisalo;
  if (category === "oppaat") return photoLibrary.saloVeturitalli;
  if (category === "kylat") return photoLibrary.mathildedalVillage;
  if (category === "tapahtumat") return photoLibrary.saloVeturitalli;
  return photoLibrary.teijoNationalPark;
}

function getCategoryItems(category: Category): SaloProvider[] {
  if (category === "majoitus") return saloProviders.filter((item) => item.category === "stay");
  if (category === "ruoka") return saloProviders.filter((item) => item.category === "food");
  if (category === "aktiviteetit") return saloProviders.filter((item) => item.category === "nature" || item.category === "experience");
  if (category === "elamykset") return saloProviders.filter((item) => item.category === "experience");
  if (category === "saaristo") return saloProviders.filter((item) => item.areaId === "sarkisalo");
  if (category === "kylat" || category === "tapahtumat") return [];
  return saloProviders.filter((item) => item.category === "tourism");
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: raw, category: rawCategory } = await params;
  if (!validCategories.includes(rawCategory as Category)) notFound();
  const locale = (["fi", "es", "en"].includes(raw) ? raw : "en") as Locale;
  const category = rawCategory as Category;
  const [title, description] = copy[locale].categories[category];
  return buildLocalizedMetadata({ locale, title, description, path: "salo/" + category, image: categoryImage(category) || undefined });
}

export default async function SaloCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: raw, category: rawCategory } = await params;
  if (!validCategories.includes(rawCategory as Category)) notFound();
  const locale = (["fi", "es", "en"].includes(raw) ? raw : "en") as Locale;
  const category = rawCategory as Category;
  const labels = copy[locale];
  const [title, , intro] = labels.categories[category];
  const providers = getCategoryItems(category);
  const localities = [
    { id: "mathildedal", title: "Mathildedal", text: { fi: "Historiallinen ruukkikylä meren äärellä.", es: "Pueblo histórico de ferrería junto al mar.", en: "Historic ironworks village by the sea." }, image: photoLibrary.mathildedalHarbour, href: `/${locale}/mathildedal` },
    { id: "teijo", title: "Teijo", text: { fi: "Kansallispuisto, järvimaisemat ja ulkoilureitit.", es: "Parque nacional, lagos y rutas al aire libre.", en: "National park, lakes and outdoor trails." }, image: photoLibrary.teijoNationalPark, href: `/${locale}/places/teijo` },
    { id: "sarkisalo", title: "Särkisalo", text: { fi: "Saaristokylä, satamat ja merenrantamaisemat.", es: "Pueblo del archipiélago, puertos y costa.", en: "Archipelago village, harbours and coastal scenery." }, image: photoLibrary.sarkisalo, href: `/${locale}/places/sarkisalo` },
    { id: "pernio", title: "Perniö", text: { fi: "Maaseudun historiaa ja paikallisia kyliä.", es: "Historia rural y pueblos locales.", en: "Rural history and local villages." }, image: null, href: `/${locale}/places/pernio` },
    { id: "halikko-wiurila", title: "Halikko ja Wiurila", text: { fi: "Kartanoalue, kulttuuriperintö ja lähialueen nähtävyydet.", es: "Zona señorial, patrimonio y lugares de interés.", en: "Manor area, heritage and nearby sights." }, image: null, href: `/${locale}/places/halikko-wiurila` },
    { id: "jarvi-salo", title: "Järvi-Salo", text: { fi: "Järvimaisemia ja rauhallisia luontokohteita.", es: "Paisajes lacustres y lugares tranquilos en la naturaleza.", en: "Lake scenery and quiet nature spots." }, image: null, href: `/${locale}/places/jarvi-salo` },
  ];

  return (
    <main className="min-h-screen bg-white text-brand-950">
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        {categoryImage(category) ? <Image src={categoryImage(category)!} alt={locale === "fi" ? "Aluekuva Salon seudulta" : locale === "es" ? "Imagen de contexto de la región de Salo" : "Regional context image from Salo"} fill priority sizes="100vw" unoptimized className="object-cover opacity-45" /> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-800 text-center text-white"><Coffee className="h-10 w-10 text-gold-300" /><p className="mt-3 text-sm font-semibold">{locale === "fi" ? "Ruokakuva lisätään käyttöoikeuden vahvistamisen jälkeen" : locale === "es" ? "La foto gastronómica se añadirá cuando se confirmen los derechos de uso" : "A food photo will be added once usage rights are confirmed"}</p></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/20" />
        <div className="container-narrow relative py-20 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{labels.region}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">{intro}</p>
        </div>
      </section>
      <section className="container-narrow py-12 sm:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="max-w-2xl text-sm leading-6 text-slate-600">{labels.direct}</p>
          <Link href={`/${locale}/salo`} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-800"><ArrowLeft className="h-4 w-4" />{labels.back}</Link>
        </div>
        {category === "tapahtumat" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "salo", title: { fi: "Salon virallinen tapahtumakalenteri", es: "Calendario oficial de eventos de Salo", en: "Official Salo events calendar" }, text: { fi: "Kaupungin tapahtumat, kulttuuri, konsertit ja paikalliset menot.", es: "Eventos municipales, cultura, conciertos y actividades locales.", en: "City events, culture, concerts and local happenings." }, url: "https://tapahtumat.salo.fi" },
              { id: "visit-salo", title: { fi: "Visit Salon tapahtumat", es: "Eventos de Visit Salo", en: "Visit Salo events" }, text: { fi: "Matkailijan tapahtumapoiminnat ja alueen sesonkivinkit.", es: "Selección de eventos para visitantes y propuestas de temporada.", en: "Visitor-focused events and seasonal ideas for the region." }, url: "https://visitsalo.fi/tapahtumat/" },
              { id: "mathildedal", title: { fi: "Mathildedalin tapahtumat", es: "Eventos de Mathildedal", en: "Mathildedal events" }, text: { fi: "Ruukkikylän omat tapahtumat ja paikalliset sesongit.", es: "Eventos del pueblo histórico y actividades de temporada.", en: "Events and seasonal activities in the historic ironworks village." }, url: "https://mathildedal.fi/tapahtumat/" },
              { id: "marina", title: { fi: "Mathildan Marinan tapahtumat", es: "Eventos de Mathildan Marina", en: "Mathildan Marina events" }, text: { fi: "Sataman tapahtumat ja ohjelma palveluntarjoajan omalla sivulla.", es: "Programa del puerto publicado por el propio proveedor.", en: "Harbour events and programme published by the provider." }, url: "https://mathildanmarina.fi/tulevat-tapahtumat/" },
            ].map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
                <CalendarDays className="h-8 w-8 text-brand-700" />
                <h2 className="mt-5 font-display text-2xl font-bold">{item.title[locale]}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text[locale]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa järjestäjän sivu" : locale === "es" ? "Abrir web del organizador" : "Open organiser website"}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        ) : category === "kylat" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localities.map((place) => (
              <Link key={place.id} href={place.href} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                  {place.image ? <Image src={place.image} alt={place.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-brand-700"><MapPin className="h-8 w-8" /><p className="mt-3 text-xs font-semibold">{locale === "fi" ? "Paikallinen kuva lisätään vahvistuksen jälkeen" : locale === "es" ? "Se añadirá una imagen local tras verificarla" : "A local image will be added after verification"}</p></div>}
                </div>
                <div className="p-6"><h2 className="font-display text-2xl font-bold">{place.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{place.text[locale]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{labels.provider}<MapPin className="h-4 w-4" /></span></div>
              </Link>
            ))}
          </div>
        ) : providers.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <Link key={provider.id} href={`/${locale}/salo/${getSaloProviderDetailCategory(provider)}/${provider.id}`} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
                <div className="relative aspect-[16/10] bg-brand-100">
                  {categoryImage(category) ? <Image src={categoryImage(category)!} alt={locale === "fi" ? "Aluekuva Salon seudulta" : locale === "es" ? "Imagen de contexto de la región de Salo" : "Regional context image from Salo"} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-50 px-6 text-center text-brand-700"><Coffee className="h-8 w-8" /><p className="mt-3 text-xs font-semibold">{locale === "fi" ? "Ruokakuva lisätään käyttöoikeuden vahvistamisen jälkeen" : locale === "es" ? "La foto gastronómica se añadirá cuando se confirmen los derechos de uso" : "A food photo will be added once usage rights are confirmed"}</p></div>}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl font-bold">{provider.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{provider.description[locale]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{labels.provider}<MapPin className="h-4 w-4 transition group-hover:translate-x-1" /></span><p className="mt-3 text-[11px] text-slate-400">{locale === "fi" ? "Aluekuva – ei välttämättä kuva kyseisestä yrityksestä." : locale === "es" ? "Imagen de la región; no necesariamente del establecimiento." : "Regional image; not necessarily a photo of this business."}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="rounded-2xl bg-brand-50 p-6 text-slate-700">{labels.empty}</p>}
      </section>
    </main>
  );
}
