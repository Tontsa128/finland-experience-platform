import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedDestinations } from "@/lib/public-content";
import { destinations as fallbackDestinations, getLocalized } from "@/lib/data";
import type { Locale } from "@/types";


export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const destination = (await getPublishedDestinations()).find((item) => item.slug === params.slug);
  if (!destination) return {};
  const seo = destination.seo?.[locale] as { title?: string; description?: string } | undefined;
  const title = seo?.title || getLocalized(destination.name, locale);
  const description = seo?.description || getLocalized(destination.shortDescription, locale);
  return { title, description };
}

export default async function DestinationDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const cmsDestinations = await getPublishedDestinations();
  const destinations = cmsDestinations.length ? cmsDestinations : fallbackDestinations;
  const d = destinations.find((x) => x.slug === params.slug);
  if (!d) notFound();

  return (
    <div className="container-narrow py-12">
      <div className="relative aspect-[16/7] overflow-hidden rounded-3xl bg-slate-100">
        {d.images[0] ? <Image src={d.images[0]} alt={getLocalized(d.name, locale)} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-white/80">{d.region}</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{getLocalized(d.name, locale)}</h1>
        </div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-lg leading-relaxed text-slate-700">{getLocalized(d.description, locale)}</p>
          {d.tags.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{d.tags.map((tag) => <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">{tag}</span>)}</div>}
          <section className="mt-12">
            <h2 className="section-title text-3xl">{locale === "fi" ? "Matkavinkit" : locale === "es" ? "Información de viaje" : "Travel information"}</h2>
            <p className="mt-3 text-slate-600">{locale === "fi" ? d.travel_info_fi || "Tutustu alueen majoituksiin ja elämyksiin." : locale === "es" ? d.travel_info_es || "Descubre alojamientos y experiencias de la zona." : "Discover stays and experiences in the area."}</p>
          </section>
        </div>
        <aside className="h-fit rounded-2xl border bg-brand-950 p-6 text-white lg:sticky lg:top-28">
          <p className="text-sm uppercase tracking-[.15em] text-white/60">{locale === "fi" ? "Kesäloman idea" : locale === "es" ? "Idea para el verano" : "Summer idea"}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{locale === "fi" ? "7–14 päivää ilman kiirettä" : locale === "es" ? "7–14 días sin prisas" : "7–14 days without rushing"}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{locale === "fi" ? "Yhdistä majoitus, sauna, meri, luonto ja valitut elämykset." : locale === "es" ? "Combina alojamiento, sauna, mar, naturaleza y experiencias seleccionadas." : "Combine accommodation, sauna, sea, nature and selected experiences."}</p>
          <Link href={"/" + locale + "/contact"} className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-brand-50">{locale === "fi" ? "Kysy vaihtoehdoista" : locale === "es" ? "Pregúntanos por opciones" : "Ask us about options"}</Link>
        </aside>
      </div>
    </div>
  );
}
