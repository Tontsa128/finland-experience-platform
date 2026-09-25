import Link from "next/link";
import { destinations as fallbackDestinations, getLocalized } from "@/lib/data";
import { getPublishedDestinations } from "@/lib/public-content";
import type { Locale } from "@/types";

export default async function DestinationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsDestinations = await getPublishedDestinations();
  const destinations = cmsDestinations.length ? cmsDestinations : fallbackDestinations;

  return (
    <div className="container-narrow py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Southern Finland • Summer</p>
      <h1 className="mt-2 section-title">{locale === "fi" ? "Kohteet" : locale === "es" ? "Destinos" : "Destinations"}</h1>
      <p className="section-subtitle mt-3 mb-10">
        {locale === "fi" ? "Löydä Suomen kohteet, saaristo, järvet ja kaupungit yhdestä paikasta." : locale === "es" ? "Descubre destinos de Finlandia, archipiélago, lagos y ciudades en un solo lugar." : "Discover Finnish destinations, archipelago, lakes and cities in one place."}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Link key={destination.id} href={"/" + locale + "/destinations/" + destination.slug} className="overflow-hidden rounded-2xl border bg-white shadow-soft hover:shadow-card">
            <div className="relative aspect-[16/9] bg-slate-100">
              {destination.images[0] ? <img src={destination.images[0]} alt={getLocalized(destination.name, locale)} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-slate-400">{destination.region}</div>}
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{destination.region}</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-brand-900">{getLocalized(destination.name, locale)}</h2>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{getLocalized(destination.shortDescription, locale)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
