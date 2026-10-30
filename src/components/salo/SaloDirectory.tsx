import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Tag } from "lucide-react";
import type { Locale } from "@/types";
import { saloProviders, type SaloProvider } from "@/lib/salo";

const labels = {
  fi: { tourism: "Matkailuinfo", stay: "Majoitus", experience: "Elämykset", nature: "Luonto", food: "Lähiruoka & kyläelämä", price: "Hinta", visit: "Siirry palveluntarjoajalle", guide: "Avaa virallinen opas", details: "Katso kohdesivu" },
  es: { tourism: "Información turística", stay: "Alojamiento", experience: "Experiencias", nature: "Naturaleza", food: "Gastronomía local", price: "Precio", visit: "Ir al proveedor", guide: "Abrir guía oficial", details: "Ver ficha del lugar" },
  en: { tourism: "Tourism", stay: "Accommodation", experience: "Experiences", nature: "Nature", food: "Local food & village life", price: "Price", visit: "Visit provider", guide: "Open official guide", details: "View provider page" },
} as const;

type SaloArea = "mathildedal" | "teijo" | "sarkisalo" | "pernio" | "halikko" | "vaskio" | "suomusjarvi" | "salo";

const areaProviderIds: Record<SaloArea, string[]> = {
  mathildedal: ["visit-mathildedal", "hotel-mathildedal", "mathildan-marina", "matilda-villas", "matri-house", "majoitus-mathildedal", "ravintola-terho", "mathildedal-brewery", "kattohuone-mathildedal", "meri-ruukin-lomakyla", "vuorovetten-jaatelo"],
  teijo: ["teijon-masuuni", "teijo-action-park", "teijo-national-park", "meri-teijo-golf", "matildanjarven-kampat", "teijo-tentsile", "teijon-kammari"],
  sarkisalo: ["saaristomokit-sarkisalo", "forby-marina", "cafe-vinssi", "saaristoravintola-nixor", "villa-meri-sarkisalo", "tiiranta", "niksaaren-sauna", "sarkisalo-fishing", "forby-rantajooga", "villa-signell", "finnholm-strandbo", "aava-adventures", "katiskanmaeki", "lonnviken", "villa-nennebo", "meri-veikko", "kruuvan-mokit"],
  pernio: ["krailan-sabrina", "leipyolin-tila", "alaspaan-maatila"],
  halikko: ["topilan-tupa"],
  vaskio: ["onnenperan-mokki"],
  suomusjarvi: ["villa-viola", "villa-laperla", "villa-viktoria", "villa-frans"],
  salo: ["visit-salo", "salon-oppaat", "vuohensaari-camping", "chill-out-fishing"],
};

const areaCopy: Record<SaloArea, Record<Locale, { eyebrow: string; title: string; intro: string }>> = {
  mathildedal: {
    fi: { eyebrow: "Mathildedal · Salo", title: "Mathildedalin paikat ja palvelut", intro: "Ruukkikylän majoitus, ruoka, satama ja paikalliset elämykset." },
    en: { eyebrow: "Mathildedal · Salo", title: "Places and services in Mathildedal", intro: "Accommodation, food, harbour life and local experiences in the ironworks village." },
    es: { eyebrow: "Mathildedal · Salo", title: "Lugares y servicios de Mathildedal", intro: "Alojamiento, gastronomía, puerto y experiencias locales en el pueblo histórico." },
  },
  teijo: {
    fi: { eyebrow: "Teijo · Salo", title: "Teijon palvelut ja elämykset", intro: "Kansallispuiston luonto, ruukkikylän kulttuuri, majoitus ja aktiiviset elämykset." },
    en: { eyebrow: "Teijo · Salo", title: "Services and experiences in Teijo", intro: "National park nature, ironworks culture, accommodation and outdoor experiences." },
    es: { eyebrow: "Teijo · Salo", title: "Servicios y experiencias en Teijo", intro: "Naturaleza del parque nacional, cultura histórica, alojamiento y actividades al aire libre." },
  },
  sarkisalo: {
    fi: { eyebrow: "Särkisalo · Förby · Petun saari", title: "Särkisalon saaristo ja palvelut", intro: "Majoitusta, satamia, ruokapaikkoja ja merellisiä elämyksiä Särkisalon saaristossa." },
    en: { eyebrow: "Särkisalo · Förby · Pettu Island", title: "Särkisalo archipelago and local services", intro: "Stays, harbours, places to eat and sea experiences around the Särkisalo islands." },
    es: { eyebrow: "Särkisalo · Förby · Isla de Pettu", title: "Archipiélago y servicios locales de Särkisalo", intro: "Alojamiento, puertos, gastronomía y experiencias junto al mar en las islas de Särkisalo." },
  },
  pernio: {
    fi: { eyebrow: "Perniö · Salo", title: "Perniön maaseutu ja paikalliset kohteet", intro: "Maatiloja, maaseutumajoitusta ja paikallisia retkipalveluja Perniön alueella." },
    en: { eyebrow: "Perniö · Salo", title: "Perniö countryside and local places", intro: "Farms, countryside accommodation and local excursion services in the Perniö area." },
    es: { eyebrow: "Perniö · Salo", title: "Campo y lugares locales de Perniö", intro: "Granjas, alojamiento rural y servicios de excursiones en la zona de Perniö." },
  },
  halikko: {
    fi: { eyebrow: "Halikko · Salo", title: "Halikko ja paikallinen kyläelämä", intro: "Tutustu Halikon alueen paikallisiin majoitus- ja kyläpalveluihin." },
    en: { eyebrow: "Halikko · Salo", title: "Halikko and local village life", intro: "Discover local accommodation and village services in the Halikko area." },
    es: { eyebrow: "Halikko · Salo", title: "Halikko y la vida local", intro: "Descubre alojamientos y servicios locales en la zona de Halikko." },
  },
  vaskio: {
    fi: { eyebrow: "Vaskio · Salo", title: "Vaskion maaseutumajoitus", intro: "Tutustu Vaskion alueen paikalliseen mökkimajoitukseen." },
    en: { eyebrow: "Vaskio · Salo", title: "Countryside stays in Vaskio", intro: "Explore local cottage accommodation in the Vaskio area." },
    es: { eyebrow: "Vaskio · Salo", title: "Alojamiento rural en Vaskio", intro: "Descubre alojamientos rurales locales en la zona de Vaskio." },
  },
  suomusjarvi: {
    fi: { eyebrow: "Suomusjärvi · Salo", title: "Suomusjärven huvilat ja lomamökit", intro: "Löydä Lomalaperlan erilliset huvila- ja lomamökkikohteet Suomusjärvellä." },
    en: { eyebrow: "Suomusjärvi · Salo", title: "Villas and holiday cottages in Suomusjärvi", intro: "Explore Lomalaperla's individual villa and holiday cottage properties in Suomusjärvi." },
    es: { eyebrow: "Suomusjärvi · Salo", title: "Villas y casas de vacaciones en Suomusjärvi", intro: "Descubre las distintas villas y casas vacacionales de Lomalaperla en Suomusjärvi." },
  },
  salo: {
    fi: { eyebrow: "Salo · keskusta ja lähialueet", title: "Salon kaupungin palvelut ja retket", intro: "Matkailuinfo, oppaat, leirintä ja saaristoon suuntautuvat retkipalvelut." },
    en: { eyebrow: "Salo · town centre and nearby areas", title: "Salo town services and excursions", intro: "Tourism information, guides, camping and excursions towards the archipelago." },
    es: { eyebrow: "Salo · centro y alrededores", title: "Servicios y excursiones en Salo", intro: "Información turística, guías, camping y excursiones hacia el archipiélago." },
  },
};

export function SaloDirectory({ locale, category, area }: { locale: Locale; category?: SaloProvider["category"]; area?: SaloArea }) {
  const l = labels[locale];
  const photoCreditLabel = locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:";
  const providersForArea = area ? saloProviders.filter((provider) => areaProviderIds[area].includes(provider.id)) : saloProviders;
  const providers = category ? providersForArea.filter((provider) => provider.category === category) : providersForArea;
  const heading = area ? areaCopy[area][locale] : null;
  return (
    <section id={area ? `area-${area}` : "salo-providers"} className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">{heading?.eyebrow || "Salo · Southwest Finland"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{heading?.title || (locale === "fi" ? "Salon paikalliset palvelut" : locale === "es" ? "Servicios locales de Salo" : "Local services in Salo")}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {heading?.intro || (locale === "fi" ? "Tutustu majoitukseen, elämyksiin, ruokaan ja luontopalveluihin. Varaukset ja sopimukset tehdään suoraan palveluntarjoajan kanssa." : locale === "es" ? "Descubre alojamiento, experiencias, gastronomía y naturaleza. Las reservas y los acuerdos se realizan directamente con cada proveedor." : "Explore accommodation, experiences, food and nature services. Bookings and agreements are handled directly with each provider.")}
            {" "}{locale === "fi" ? "Avaa kohteen oma sivu tai jatka palveluntarjoajan verkkosivustolle." : locale === "es" ? "Abre la ficha del lugar o continúa al sitio web del proveedor." : "Open the provider profile or continue to the provider's website."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <article key={provider.id} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
              {provider.image ? (
                <Link href={`/${locale}/providers/salo-${provider.id}`} aria-label={`${provider.nameByLocale?.[locale] || provider.name} — ${l.details}`} className="relative block aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image src={provider.image} alt={provider.nameByLocale?.[locale] || provider.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </Link>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-brand-950 p-8 text-center text-white">
                  <ExternalLink className="h-9 w-9 text-gold-300" />
                </div>
              )}
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">{l[provider.category]}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{provider.nameByLocale?.[locale] || provider.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{provider.description[locale]}</p>
                {(provider.priceByLocale?.[locale] || (locale === "fi" ? provider.price : undefined)) ? (
                  <div className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-900">
                    <Tag className="mt-0.5 h-4 w-4 shrink-0" />
                    <span><strong>{l.price}:</strong> {provider.priceByLocale?.[locale] || provider.price}</span>
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link href={`/${locale}/providers/salo-${provider.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-950 underline underline-offset-4">{l.details}</Link>
                  <a href={provider.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                    {(provider.url.includes("visitsalo.fi") || provider.url.includes("visitmathildedal.fi") || provider.url.includes("luontoon.fi")) ? l.guide : l.visit}<ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                {provider.imageCredit ? <p className="mt-4 text-[11px] text-slate-400">{photoCreditLabel} {provider.imageCredit}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
