import Image from "next/image";
import { ArrowUpRight, ExternalLink, Tag } from "lucide-react";
import type { Locale } from "@/types";
import { naantaliProviders } from "@/lib/naantali";

const labels = {
  fi: { tourism: "Matkailuinfo", sight: "Nähtävyys", stay: "Majoitus", experience: "Elämys", nature: "Saaristo & luonto", food: "Ruoka", price: "Hinta", visit: "Siirry palveluntarjoajalle" },
  es: { tourism: "Turismo", sight: "Lugar de interés", stay: "Alojamiento", experience: "Experiencia", nature: "Archipiélago y naturaleza", food: "Gastronomía", price: "Precio", visit: "Ir al proveedor" },
  en: { tourism: "Tourism", sight: "Sight", stay: "Accommodation", experience: "Experience", nature: "Archipelago & nature", food: "Food", price: "Price", visit: "Visit provider" },
} as const;

export function NaantaliDirectory({ locale }: { locale: Locale }) {
  const l = labels[locale];
  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Naantali · saaristo</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">
            {locale === "fi" ? "Löydä Naantalin paikat ja palvelut" : locale === "es" ? "Descubre Naantali y sus proveedores" : "Discover Naantali and its providers"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {locale === "fi" ? "Inspiraatio ensin. Kun löydät kiinnostavan paikan, siirryt suoraan palveluntarjoajan tai Visit Naantalin omalle sivulle. Emme ota varausta tai maksua täällä." : locale === "es" ? "Primero la inspiración. Cuando encuentres un lugar que te interese, continúa directamente al proveedor o a Visit Naantali. No gestionamos reservas ni pagos aquí." : "Inspiration first. When you find a place you like, continue directly to the provider or Visit Naantali. We do not take bookings or payments here."}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {naantaliProviders.map((provider) => (
            <article key={provider.id} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
              {provider.image ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image src={provider.image} alt={provider.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-brand-950 p-8 text-center text-white"><ExternalLink className="h-9 w-9 text-gold-300" /></div>
              )}
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">{l[provider.category]}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{provider.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{provider.description[locale]}</p>
                {provider.price ? <div className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-900"><Tag className="mt-0.5 h-4 w-4 shrink-0" /><span><strong>{l.price}:</strong> {provider.price}</span></div> : null}
                <a href={provider.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{l.visit}<ArrowUpRight className="h-4 w-4" /></a>
                {provider.imageCredit ? <p className="mt-4 text-[11px] text-slate-400">Kuva: {provider.imageCredit}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
