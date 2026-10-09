import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";
import { saloProviders, type SaloProvider } from "@/lib/salo";

const labels = {
  fi: { tourism: "Matkailuinfo", stay: "Majoitus", experience: "Elämykset", nature: "Luonto", food: "Ruoka ja paikalliset maut", visit: "Avaa kohteen tiedot", heading: "Löydä paikalliset palvelut", intro: "Tutustu kohteeseen ja siirry sen omalle sivulle. Varaus, maksu ja sopimus tehdään aina suoraan palveluntarjoajan kanssa." },
  es: { tourism: "Información turística", stay: "Alojamiento", experience: "Experiencias", nature: "Naturaleza", food: "Gastronomía local", visit: "Ver detalles del lugar", heading: "Descubre los servicios locales", intro: "Conoce cada lugar en su propia página. Las reservas, los pagos y los contratos se realizan directamente con cada proveedor." },
  en: { tourism: "Tourism information", stay: "Accommodation", experience: "Experiences", nature: "Nature", food: "Food and local flavours", visit: "View place details", heading: "Discover local services", intro: "Explore each place on its own page. Bookings, payments and contracts are handled directly by each provider." },
} as const;

const categoryForProvider: Record<SaloProvider["category"], string> = {
  tourism: "oppaat",
  stay: "majoitus",
  experience: "elamykset",
  nature: "aktiviteetit",
  food: "ruoka",
};
const archipelagoIds = new Set(["saaristomokit-sarkisalo", "forby-marina", "cafe-vinssi", "saaristoravintola-nixor", "sarkisalo-fishing", "chill-out-fishing", "villa-meri-sarkisalo"]);

function categorySlug(provider: SaloProvider) {
  return archipelagoIds.has(provider.id) ? "saaristo" : categoryForProvider[provider.category];
}

function fallbackImage(provider: SaloProvider) {
  if (provider.category === "stay") return photoLibrary.mathildedalVillage;
  if (provider.category === "food") return photoLibrary.mathildedalHarbour;
  if (provider.category === "nature") return photoLibrary.teijoNationalPark;
  if (provider.category === "experience") return photoLibrary.naturaVivaTeijo;
  return photoLibrary.saloVeturitalli;
}

export function SaloDirectory({ locale, category }: { locale: Locale; category?: SaloProvider["category"] }) {
  const l = labels[locale];
  const providers = category ? saloProviders.filter((provider) => provider.category === category) : saloProviders;
  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Salo · Mathildedal · Teijo</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{l.heading}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{l.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <Link key={provider.id} href={`/${locale}/salo/${categorySlug(provider)}/${provider.id}`} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                <Image src={fallbackImage(provider)} alt={locale === "fi" ? "Aluekuva Salon seudulta" : locale === "es" ? "Imagen de contexto de la región de Salo" : "Regional context image from Salo"} fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-brand-600"><ExternalLink className="h-3.5 w-3.5" />{l[provider.category]}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{provider.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{provider.description[locale]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{l.visit}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                <p className="mt-4 text-[11px] text-slate-400">{locale === "fi" ? "Aluekuva – ei välttämättä kuva kyseisestä yrityksestä." : locale === "es" ? "Imagen de la región; no necesariamente del establecimiento." : "Regional image; not necessarily a photo of this business."}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
