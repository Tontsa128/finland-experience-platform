import Link from "next/link";
import type { Locale } from "@/types";
import { getKimitoonProviders, type KimitoonCategory } from "@/lib/kimitoon-providers";

const labels: Record<Locale, { title: string; open: string; source: string; empty: string }> = {
  fi: { title: "Palveluntarjoajat ja kohteet", open: "Avaa kohteen oma sivu", source: "Kuva ja lähde", empty: "Tähän teemaan lisätään kohteita lähteiden varmistuessa." },
  en: { title: "Providers and places", open: "Open the provider page", source: "Photo and source", empty: "Listings will be added as their sources are verified." },
  es: { title: "Proveedores y destinos", open: "Abrir la página del proveedor", source: "Foto y fuente", empty: "Añadiremos fichas cuando se verifiquen sus fuentes." },
};

export function KimitoonProviderCards({ locale, category }: { locale: Locale; category: KimitoonCategory }) {
  const items = getKimitoonProviders(category);
  const t = labels[locale];
  if (!items.length) return (
    <section className="container-narrow py-12 sm:py-16">
      <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-brand-950">{locale === "fi" ? "Ei vielä vahvistettuja palveluntarjoajakortteja" : locale === "es" ? "Todavía no hay fichas verificadas" : "No verified provider listings yet"}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{locale === "fi" ? "Tähän teemaan ei löytynyt vielä julkaisuvalmiita yrityskohtaisia tietoja ja kuvia tarkistetuista lähteistä. Emme lisää arvattuja yrityksiä, kuvia tai palvelulupauksia. Tarkista alueen ajantasaiset palvelut virallisesta matkailuoppaasta ja yritysrekisteristä." : locale === "es" ? "Todavía no se han verificado datos e imágenes suficientes para publicar fichas individuales en este tema. No inventamos empresas, fotos ni servicios. Consulta la información actual en las guías oficiales." : "We have not yet verified enough provider-specific details and images to publish individual listings in this theme. We do not invent businesses, photos or service claims. Check current information in the official local guides."}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-brand-800">
          <a href="https://www.visitkimitoon.fi/fi/" target="_blank" rel="noreferrer" className="underline underline-offset-4">Visit Kemiönsaari ↗</a>
          <a href="https://ksg.fi/fi/" target="_blank" rel="noreferrer" className="underline underline-offset-4">Kemiönsaaren palveluopas ↗</a>
        </div>
      </div>
    </section>
  );

  return (
    <section className="container-narrow py-12 sm:py-16" aria-labelledby={`kimitoon-providers-${category}`}>
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">Kemiönsaari · Kimitoön</p>
        <h2 id={`kimitoon-providers-${category}`} className="mt-2 font-display text-3xl font-bold text-brand-950">{t.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          {locale === "fi"
            ? "Jokainen kortti avaa oman kohdesivun. Tarkista ajantasainen saatavuus, ehdot ja varaus suoraan palveluntarjoajalta."
            : locale === "es"
              ? "Cada tarjeta abre su propia página. Consulta disponibilidad, condiciones y reservas directamente con el proveedor."
              : "Each card opens its own detail page. Confirm current availability, terms and booking directly with the provider."}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const cardImage = item.categoryImages?.[category] || item.image;
          return (
          <article key={item.id} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/${locale}/providers/kimitoon-${item.id}`} className="block">
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
                {cardImage ? (
                  <img src={cardImage} alt={item.name[locale]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="px-6 text-center text-white">
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{locale === "fi" ? "Palveluntarjoaja" : locale === "es" ? "Proveedor" : "Provider"}</p>
                    <p className="mt-3 font-display text-2xl font-semibold">{item.name[locale]}</p>
                    <p className="mt-2 text-xs text-white/70">{locale === "fi" ? "Kohdekuvaa ei ole vielä varmennettu" : locale === "es" ? "Foto pendiente de verificación" : "Provider photo not yet verified"}</p>
                  </div>
                )}
              </div>
              <div className="p-5 pb-2">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-700">{item.location[locale]}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-brand-950">{item.name[locale]}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description[locale]}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-brand-800 underline underline-offset-4">{t.open} →</span>
              </div>
            </Link>
            <div className="px-5 pb-5 pt-2 text-xs text-slate-500">
              {t.source}: {item.imageCredit} · <a href={item.imageSource} target="_blank" rel="noreferrer" className="underline underline-offset-2">{locale === "fi" ? "lähde" : locale === "es" ? "fuente" : "source"}</a>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
