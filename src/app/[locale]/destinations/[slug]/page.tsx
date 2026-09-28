import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getPublishedDestinations } from "@/lib/public-content";
import { destinations as fallbackDestinations, getLocalized } from "@/lib/data";
import type { Locale } from "@/types";

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const destination = (await getPublishedDestinations()).find((item) => item.slug === params.slug);
  if (!destination) return {};
  const seo = destination.seo?.[locale] as { title?: string; description?: string } | undefined;
  return {
    title: seo?.title || getLocalized(destination.name, locale),
    description: seo?.description || getLocalized(destination.shortDescription, locale),
  };
}

export default async function DestinationDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const cmsDestinations = await getPublishedDestinations();
  const destinations = cmsDestinations.length ? cmsDestinations : fallbackDestinations;
  const d = destinations.find((x) => x.slug === params.slug);
  if (!d) notFound();

  const copy = locale === "fi"
    ? {
        eyebrow: "Suomen kesä alkaa tästä",
        dream: "Kuvittele itsesi täällä.",
        dreamText: "Järvi, metsä, pitkät valoisat illat ja tunne siitä, ettei mihinkään ole kiire.",
        exploreStays: "Löydä majoitus",
        exploreExperiences: "Etsi elämyksiä",
        tips: "Näin koet kohteen",
        tipText: d.travel_info_fi || "Yhdistä tähän kohteeseen sauna, luonto, paikallinen ruoka ja yksi elämyksellinen kesäpäivä.",
        summerIdea: "Täydellinen kesäpäivä",
        summerText: "Aloita aamulla luonnosta, vietä iltapäivä järven rannalla ja anna illan jatkua auringonlaskuun asti.",
        back: "Takaisin kohteisiin",
      }
    : locale === "es"
      ? {
          eyebrow: "Así empieza tu verano en Finlandia",
          dream: "Imagínate aquí.",
          dreamText: "Un lago tranquilo, bosques infinitos y noches tan luminosas que el tiempo parece detenerse.",
          exploreStays: "Encontrar alojamiento",
          exploreExperiences: "Descubrir experiencias",
          tips: "Cómo vivir el destino",
          tipText: d.travel_info_es || "Combina naturaleza, sauna, gastronomía local y una experiencia especial de verano.",
          summerIdea: "Un día de verano perfecto",
          summerText: "Empieza entre naturaleza, disfruta del lago por la tarde y deja que la noche continúe bajo el sol de medianoche.",
          back: "Volver a destinos",
        }
      : {
          eyebrow: "This is where your Finnish summer begins",
          dream: "Imagine yourself here.",
          dreamText: "A quiet lake, endless forests and bright summer evenings when there is simply no need to hurry.",
          exploreStays: "Find a place to stay",
          exploreExperiences: "Discover experiences",
          tips: "How to experience it",
          tipText: "Combine nature, sauna, local food and one unforgettable summer experience.",
          summerIdea: "Your perfect summer day",
          summerText: "Start in nature, spend the afternoon by the water and let the evening stretch beneath the midnight sun.",
          back: "Back to destinations",
        };

  return (
    <div className="bg-white">
      <section className="relative isolate min-h-[68vh] overflow-hidden">
        {d.images[0] ? <Image src={d.images[0]} alt={getLocalized(d.name, locale)} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
        <div className="container-narrow relative flex min-h-[68vh] items-end py-14 text-white sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[.22em] text-white/80">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{getLocalized(d.name, locale)}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">{getLocalized(d.shortDescription, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/accommodations`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">{copy.exploreStays}<ArrowRight className="h-4 w-4" /></Link>
              <Link href={`/${locale}/experiences`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/15">{copy.exploreExperiences}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{copy.dream}</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">{copy.dream}</h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-600">{copy.dreamText}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{getLocalized(d.description, locale)}</p>
          </div>
          <div className="rounded-[2rem] bg-brand-950 p-7 text-white shadow-card sm:p-9">
            <Sparkles className="h-7 w-7 text-amber-300" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[.16em] text-white/60">{copy.summerIdea}</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug">{copy.summerText}</p>
            <Link href={`/${locale}/contact`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-amber-200">{copy.tips}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container-narrow py-14 sm:py-18">
          <h2 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{copy.tips}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{copy.tipText}</p>
          {d.tags.length > 0 && <div className="mt-7 flex flex-wrap gap-2">{d.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-4 py-2 text-sm text-brand-800 shadow-sm">{tag}</span>)}</div>}
          <Link href={`/${locale}/destinations`} className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-600">{copy.back}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
