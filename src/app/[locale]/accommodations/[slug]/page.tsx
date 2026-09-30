import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, MapPin, Sparkles, Users } from "lucide-react";
import { getPublishedProperties } from "@/lib/public-content";
import { cabins as fallbackCabins, getLocalized } from "@/lib/data";
import type { Locale } from "@/types";
import { allowDemoFallback, formatPrice, locales } from "@/lib/utils";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) return {};
  const cmsCabins = await getPublishedProperties();
  const source = cmsCabins.length || !allowDemoFallback ? cmsCabins : fallbackCabins;
  const cabin = source.find((item) => item.slug === params.slug);
  if (!cabin) return {};
  return buildLocalizedMetadata({
    locale,
    title: getLocalized(cabin.name, locale),
    description: getLocalized(cabin.description, locale),
    path: "accommodations/" + cabin.slug,
    image: cabin.images[0],
  });
}

export default async function CabinDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const cmsCabins = await getPublishedProperties();
  const cabins = cmsCabins.length || !allowDemoFallback ? cmsCabins : fallbackCabins;
  const c = cabins.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const copy = locale === "fi"
    ? { eyebrow: "Sinun kesäpaikkasi Suomessa", sectionEyebrow: "Kohteen tiedot", dream: "Tee majoituksesta osa matkan tunnetta.", text: "Avaa ovi, hengitä metsän tuoksua ja anna päivän alkaa ilman kiirettä.", more: "Löydä lisää majoituksia", provider: "Siirry vuokraajalle", note: "Emme myy tätä majoitusta. Ohjaamme sinut suoraan palveluntarjoajan omaan varaukseen." }
    : locale === "es"
      ? { eyebrow: "Tu refugio de verano en Finlandia", sectionEyebrow: "Detalles del alojamiento", dream: "Haz que el alojamiento forme parte del viaje.", text: "Abre la puerta, respira el bosque y deja que el día empiece sin prisas.", more: "Ver más alojamientos", provider: "Ir al proveedor", note: "No vendemos este alojamiento. Te dirigimos directamente a la reserva del proveedor." }
      : { eyebrow: "Your Finnish summer hideaway", sectionEyebrow: "Stay details", dream: "Let your stay become part of the journey.", text: "Open the door, breathe in the forest and let the day begin without a hurry.", more: "Explore more stays", provider: "Visit provider", note: "We do not sell this accommodation. We send you directly to the provider's own booking." };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: getLocalized(c.name, locale),
        description: getLocalized(c.description, locale),
        image: c.images,
        url: siteUrl + "/" + locale + "/accommodations/" + c.slug,
        address: { "@type": "PostalAddress", addressCountry: "FI" },
      }) }} />
      <section className="relative isolate min-h-[62vh] overflow-hidden">
        {c.images[0] ? <Image src={c.images[0]} alt={getLocalized(c.name, locale)} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="container-narrow relative flex min-h-[62vh] items-end py-14 text-white sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[.22em] text-white/80">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{getLocalized(c.name, locale)}</h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/90">{copy.text}</p>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {c.images.length > 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {c.images.slice(1, 3).map((image) => <div key={image} className="relative aspect-[16/10] overflow-hidden rounded-2xl"><Image src={image} alt={getLocalized(c.name, locale)} fill sizes="50vw" className="object-cover" /></div>)}
              </div>
            )}
            <p className="mt-8 text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{copy.sectionEyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.dream}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{getLocalized(c.description, locale)}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4"><MapPin className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-slate-600">{c.location}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><Users className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-slate-600">{c.maxGuests} {locale === "fi" ? "hlö" : locale === "es" ? "personas" : "guests"}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><BedDouble className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-slate-600">{c.bedrooms} {locale === "fi" ? "makuuhuonetta" : locale === "es" ? "habitaciones" : "bedrooms"}</p></div>
            </div>
            {c.features.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {c.features.map((feature) => (
                  <span key={feature} className="rounded-full bg-brand-50 px-4 py-2 text-sm text-brand-800">{feature}</span>
                ))}
              </div>
            )}
            {c.provider ? <p className="mt-6 text-sm text-slate-500">{locale === "fi" ? "Palveluntarjoaja" : locale === "es" ? "Proveedor" : "Provider"}: <span className="font-semibold text-slate-700">{c.provider}</span></p> : null}
          </div>

          <aside className="h-fit rounded-[2rem] border bg-white p-7 shadow-card lg:sticky lg:top-28">
            <Sparkles className="h-7 w-7 text-amber-500" />
            <p className="mt-5 text-sm text-slate-500">{locale === "fi" ? "Hintaesimerkki" : locale === "es" ? "Precio orientativo" : "Indicative price"}</p>
            <div className="mt-1 text-3xl font-bold text-brand-950">{c.pricePerNight > 0 ? formatPrice(c.pricePerNight, locale) : "—"}</div>
            <p className="text-sm text-slate-500">{c.priceNote?.[locale] || (locale === "fi" ? "Tarkista ajantasainen hinta palveluntarjoajalta." : locale === "es" ? "Consulta el precio actual con el proveedor." : "Check the current price with the provider.")}</p>
            <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">{copy.note}</div>
            {c.bookingUrl ? <a href={c.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">{copy.provider}<ArrowUpRight className="h-4 w-4" /></a> : <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-center text-xs text-amber-800">{locale === "fi" ? "Vuokraajan linkki lisätään tähän kohteeseen." : locale === "es" ? "El enlace del proveedor se añadirá aquí." : "The provider link will be added here."}</p>}
            
            <Link href={`/${locale}/accommodations`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-600">{copy.more}<ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
