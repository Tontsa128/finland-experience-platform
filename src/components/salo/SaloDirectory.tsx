import Image from "next/image";
import { ArrowUpRight, ExternalLink, Tag } from "lucide-react";
import type { Locale } from "@/types";
import { saloProviders, type SaloProvider } from "@/lib/salo";

const labels = {
  fi: { tourism: "Matkailuinfo", stay: "Majoitus", experience: "Elämykset", nature: "Luonto", food: "Lähiruoka & kyläelämä", price: "Hinta", visit: "Siirry palveluntarjoajalle", guide: "Avaa virallinen opas" },
  es: { tourism: "Información turística", stay: "Alojamiento", experience: "Experiencias", nature: "Naturaleza", food: "Gastronomía local", price: "Precio", visit: "Ir al proveedor", guide: "Abrir guía oficial" },
  en: { tourism: "Tourism", stay: "Accommodation", experience: "Experiences", nature: "Nature", food: "Local food & village life", price: "Price", visit: "Visit provider", guide: "Open official guide" },
} as const;

export function SaloDirectory({ locale, category }: { locale: Locale; category?: SaloProvider["category"] }) {
  const l = labels[locale];
  const providers = category ? saloProviders.filter((provider) => provider.category === category) : saloProviders;
  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Salo · Mathildedal · Teijo</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">
            {locale === "fi" ? "Löydä paikalliset palvelut" : locale === "es" ? "Descubre los proveedores locales" : "Discover local providers"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {locale === "fi" ? "Näe paikka ensin. Kun löydät kiinnostavan kohteen, siirryt suoraan palveluntarjoajan omalle sivulle. Emme ota varausta tai maksua vastaan täällä." : locale === "es" ? "Primero descubre el lugar. Cuando encuentres algo que te interese, continúa directamente al sitio del proveedor. No gestionamos la reserva ni el pago aquí." : "Discover the place first. When you find something you like, continue directly to the provider. We do not take the booking or payment here."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <article key={provider.id} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
              {provider.image ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image src={provider.image} alt={provider.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-brand-950 p-8 text-center text-white">
                  <ExternalLink className="h-9 w-9 text-gold-300" />
                </div>
              )}
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">{l[provider.category]}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{provider.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{provider.description[locale]}</p>
                {provider.price ? (
                  <div className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-900">
                    <Tag className="mt-0.5 h-4 w-4 shrink-0" />
                    <span><strong>{l.price}:</strong> {provider.price}</span>
                  </div>
                ) : null}
                <a href={provider.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                  {(provider.url.includes("visitsalo.fi") || provider.url.includes("visitmathildedal.fi") || provider.url.includes("luontoon.fi")) ? l.guide : l.visit}<ArrowUpRight className="h-4 w-4" />
                </a>
                {provider.imageCredit ? <p className="mt-4 text-[11px] text-slate-400">Kuva: {provider.imageCredit}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
