import Image from "next/image";
import { ArrowUpRight, ExternalLink, MapPin, Sparkles, Tag } from "lucide-react";
import type { Locale } from "@/types";
import { luxuryDirectory } from "@/lib/luxury-directory";

const labels = {
  fi: {
    eyebrow: "Luxury & Authentic Finland",
    title: "Sauna, saaristo, lähiruoka ja uniikit yöpymiset.",
    intro: "Kuratoitu hakemisto matkailijoille, jotka haluavat kokea Suomen itse ja varata jokaisen kohteen suoraan palveluntarjoajalta.",
    stay: "Majoitus",
    sauna: "Sauna & hyvinvointi",
    food: "Ruoka & juoma",
    nature: "Luonto",
    experience: "Elämys",
    price: "Hintaesimerkki",
    visit: "Siirry palveluntarjoajalle",
    direct: "Varaa ja maksa suoraan palveluntarjoajalle.",
  },
  es: {
    eyebrow: "Luxury & Authentic Finland",
    title: "Sauna, archipiélago, gastronomía local y estancias únicas.",
    intro: "Un directorio curado para viajeros que quieren descubrir Finlandia y reservar cada experiencia directamente con el proveedor.",
    stay: "Alojamiento",
    sauna: "Sauna & bienestar",
    food: "Gastronomía",
    nature: "Naturaleza",
    experience: "Experiencia",
    price: "Precio orientativo",
    visit: "Ir al proveedor",
    direct: "Reserva y paga directamente con el proveedor.",
  },
  en: {
    eyebrow: "Luxury & Authentic Finland",
    title: "Sauna, archipelago, local food and unique stays.",
    intro: "A curated directory for travellers who want to discover Finland and book each place directly with the provider.",
    stay: "Stay",
    sauna: "Sauna & wellness",
    food: "Food & drink",
    nature: "Nature",
    experience: "Experience",
    price: "Price example",
    visit: "Visit provider",
    direct: "Book and pay directly with the provider.",
  },
} as const;

const categoryKeys = ["stay", "sauna", "food", "nature", "experience"] as const;

export function LuxuryDirectory({ locale }: { locale: Locale }) {
  const l = labels[locale];

  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-brand-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold-500" />
            {l.eyebrow}
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-brand-950 sm:text-6xl">{l.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{l.intro}</p>
          <p className="mt-4 text-sm font-semibold text-brand-800">{l.direct}</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categoryKeys.map((key) => (
            <span key={key} className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800">
              {l[key]}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {luxuryDirectory.map((entry) => (
            <article key={entry.id} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
              {entry.image ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image src={entry.image} alt={entry.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-brand-950 p-8 text-white">
                  <ExternalLink className="h-9 w-9 text-gold-300" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600">
                  <MapPin className="h-3.5 w-3.5" />
                  {entry.location}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[.14em] text-terracotta">{l[entry.category]}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{entry.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{entry.description[locale]}</p>

                {entry.price ? (
                  <div className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-900">
                    <Tag className="mt-0.5 h-4 w-4 shrink-0" />
                    <span><strong>{l.price}:</strong> {entry.price}</span>
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{tag}</span>
                  ))}
                </div>

                <a href={entry.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                  {l.visit}<ArrowUpRight className="h-4 w-4" />
                </a>
                {entry.imageCredit ? <p className="mt-4 text-[11px] text-slate-400">Kuva: {entry.imageCredit}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
