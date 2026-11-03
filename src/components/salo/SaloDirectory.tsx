import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Tag } from "lucide-react";
import type { Locale } from "@/types";
import { saloProviders, type SaloProvider } from "@/lib/salo";
import { areaCopy, areaProviderIds, type SaloArea } from "@/lib/salo-areas";

const labels = {
  fi: {
    tourism: "Matkailuinfo", stay: "Majoitus", experience: "Elämykset", nature: "Luonto", food: "Lähiruoka & kyläelämä",
    price: "Hinta", visit: "Siirry palveluntarjoajalle", guide: "Avaa virallinen opas", details: "Katso kohdesivu",
    photoSource: "Kuvan lähde", eyebrow: "Paikalliset palvelut",
  },
  es: {
    tourism: "Información turística", stay: "Alojamiento", experience: "Experiencias", nature: "Naturaleza", food: "Gastronomía local",
    price: "Precio", visit: "Ir al proveedor", guide: "Abrir guía oficial", details: "Ver ficha del lugar",
    photoSource: "Fuente de la foto", eyebrow: "Servicios locales",
  },
  en: {
    tourism: "Tourism", stay: "Accommodation", experience: "Experiences", nature: "Nature", food: "Local food & village life",
    price: "Price", visit: "Visit provider", guide: "Open official guide", details: "View provider page",
    photoSource: "Photo source", eyebrow: "Local services",
  },
} as const;

export function SaloDirectory({ locale, category, area }: { locale: Locale; category?: SaloProvider["category"]; area?: SaloArea }) {
  const l = labels[locale];
  const photoCreditLabel = locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:";
  const providersForArea = area ? saloProviders.filter((provider) => areaProviderIds[area].includes(provider.id)) : saloProviders;
  const providers = category ? providersForArea.filter((provider) => provider.category === category) : providersForArea;
  const heading = area ? areaCopy[area][locale] : null;

  return (
    <section id={area ? `area-${area}` : "salo-providers"} className="bg-brand-50 py-14 sm:py-20">
      <div className="container-narrow">
        <div className="mb-9 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{heading?.eyebrow || `Salo · ${l.eyebrow}`}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
            {locale === "fi" ? "Palveluntarjoajat ja kohteet" : locale === "es" ? "Proveedores y lugares" : "Providers and places"}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {heading?.intro || (locale === "fi"
              ? "Tutustu majoitukseen, elämyksiin, ruokaan ja luontopalveluihin. Varaukset ja sopimukset tehdään suoraan palveluntarjoajan kanssa."
              : locale === "es"
                ? "Descubre alojamiento, experiencias, gastronomía y naturaleza. Las reservas y los acuerdos se realizan directamente con cada proveedor."
                : "Explore accommodation, experiences, food and nature services. Bookings and agreements are handled directly with each provider.")}
          </p>
        </div>

        {providers.length ? (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => {
              const name = provider.nameByLocale?.[locale] || provider.name;
              const profileHref = `/${locale}/providers/salo-${provider.id}`;
              const externalLabel = provider.url.includes("visitsalo.fi") || provider.url.includes("visitmathildedal.fi") || provider.url.includes("luontoon.fi")
                ? l.guide
                : l.visit;

              return (
                <article key={provider.id} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl">
                  <Link href={profileHref} aria-label={`${name} — ${l.details}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
                      {provider.image ? (
                        <>
                          <Image
                            src={provider.image}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
                          <ExternalLink className="h-9 w-9 text-gold-300" aria-hidden="true" />
                          <span className="text-xs font-bold uppercase tracking-[.18em]">{l[provider.category]}</span>
                        </div>
                      )}
                      <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-brand-950/55 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-sm">
                        {l[provider.category]}
                      </span>
                    </div>
                    <div className="px-5 pt-5 sm:px-6">
                      <h3 className="font-display text-xl font-bold leading-tight text-brand-950 transition group-hover:text-brand-700 sm:text-2xl">{name}</h3>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6">
                    <p className="mt-3 text-sm leading-7 text-slate-600">{provider.description[locale]}</p>
                    {(provider.priceByLocale?.[locale] || (locale === "fi" ? provider.price : undefined)) ? (
                      <div className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-900">
                        <Tag className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span><strong>{l.price}:</strong> {provider.priceByLocale?.[locale] || provider.price}</span>
                      </div>
                    ) : null}
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
                      <Link href={profileHref} className="inline-flex items-center gap-2 text-sm font-bold text-brand-950 underline underline-offset-4">
                        {l.details}
                      </Link>
                      <a href={provider.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                        {externalLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                    {provider.imageCredit ? (
                      <p className="mt-4 text-[11px] text-slate-400">
                        {photoCreditLabel} {provider.imageCredit}
                        {provider.imageSource && /^https?:\/\//i.test(provider.imageSource) ? (
                          <>
                            {" · "}
                            <a href={provider.imageSource} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition hover:text-brand-800">
                              {l.photoSource}
                            </a>
                          </>
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold text-brand-950">
              {locale === "fi" ? "Palveluja täydennetään" : locale === "es" ? "Estamos completando los servicios" : "Listings are being completed"}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {locale === "fi"
                ? "Tähän näkymään lisätään vain tarkistettuja paikallisia palveluja. Emme julkaise arvattuja yrityksiä, kuvia tai palvelulupauksia."
                : locale === "es"
                  ? "Aquí solo publicamos servicios locales verificados. No inventamos empresas, imágenes ni servicios."
                  : "Only verified local services are published here. We do not invent businesses, images or service claims."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
