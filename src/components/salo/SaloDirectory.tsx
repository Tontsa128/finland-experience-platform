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

export function SaloDirectory({ locale, category, area }: { locale: Locale; category?: SaloProvider["category"]; area?: "mathildedal" }) {
  const l = labels[locale];
  const photoCreditLabel = locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:";
  const mathildedalIds = new Set(["visit-mathildedal", "hotel-mathildedal", "mathildan-marina", "matilda-villas", "matri-house", "majoitus-mathildedal", "mathildedal-brewery", "ravintola-terho"]);
  const areaProviders = area === "mathildedal" ? saloProviders.filter((provider) => mathildedalIds.has(provider.id)) : saloProviders;
  const providers = category ? areaProviders.filter((provider) => provider.category === category) : areaProviders;
  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">{area === "mathildedal" ? "Mathildedal · Salo" : "Salo · Mathildedal · Teijo"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">
            {area === "mathildedal" ? (locale === "fi" ? "Mathildedalin paikat ja palvelut" : locale === "es" ? "Lugares y servicios de Mathildedal" : "Places and services in Mathildedal") : (locale === "fi" ? "Löydä paikalliset palvelut" : locale === "es" ? "Descubre los proveedores locales" : "Discover local providers")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {area === "mathildedal" ? (locale === "fi" ? "Tutustu majoitukseen, kylän palveluihin ja paikallisiin elämyksiin. Avaa jokaisen kohteen oma alasivu ja siirry sieltä suoraan palveluntarjoajan sivustolle." : locale === "es" ? "Descubre alojamientos, servicios del pueblo y experiencias locales. Abre la ficha de cada lugar y continúa directamente a la web del proveedor." : "Explore accommodation, village services and local experiences. Open each place’s own detail page and continue directly to the provider’s website.") : (locale === "fi" ? "Näe paikka ensin. Kun löydät kiinnostavan kohteen, siirryt suoraan palveluntarjoajan omalle sivulle. Emme ota varausta tai maksua vastaan täällä." : locale === "es" ? "Primero descubre el lugar. Cuando encuentres algo que te interese, continúa directamente al sitio del proveedor. No gestionamos la reserva ni el pago aquí." : "Discover the place first. When you find something you like, continue directly to the provider. We do not take the booking or payment here.")}
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
