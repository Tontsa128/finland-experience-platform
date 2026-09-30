import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { experiences as fallbackExperiences, getLocalized } from "@/lib/data";
import { getPublishedExperiences } from "@/lib/public-content";
import type { Locale } from "@/types";
import { allowDemoFallback, locales } from "@/lib/utils";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) return {};
  const cmsExperiences = await getPublishedExperiences();
  const source = cmsExperiences.length || !allowDemoFallback ? cmsExperiences : fallbackExperiences;
  const experience = source.find((item) => item.slug === params.slug);
  if (!experience) return {};
  return buildLocalizedMetadata({
    locale,
    title: getLocalized(experience.name, locale),
    description: getLocalized(experience.description, locale),
    path: "experiences/" + experience.slug,
    image: experience.images[0],
  });
}

export default async function ExperienceDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const cmsExperiences = await getPublishedExperiences();
  const experiences = cmsExperiences.length || !allowDemoFallback ? cmsExperiences : fallbackExperiences;
  const e = experiences.find((x) => x.slug === params.slug);
  if (!e) notFound();

  const copy = locale === "fi"
    ? { eyebrow: "Yksi kesäpäivä, jonka muistat", dream: "Tee tästä päivästä tarina.", book: "Kysy saatavuudesta", more: "Löydä lisää elämyksiä", info: "Elämys alkaa jo ennen kuin saavut.", text: "Suomen kesässä parhaat hetket syntyvät usein yksinkertaisista asioista: luonnosta, vedestä, saunasta, ihmisistä ja valosta.", note: "Näytämme paikallisia palveluita ja ohjaamme varaukseen palveluntarjoajalle.", provider: "Siirry palveluntarjoajalle" }
    : locale === "es"
      ? { eyebrow: "Un día de verano que recordarás", dream: "Convierte este día en una historia.", book: "Preguntar disponibilidad", more: "Descubrir más experiencias", info: "La experiencia empieza antes de llegar.", text: "En el verano finlandés, los mejores momentos nacen de cosas sencillas: naturaleza, agua, sauna, personas y luz.", note: "Mostramos servicios locales y dirigimos al proveedor para reservar.", provider: "Ir al proveedor" }
      : { eyebrow: "One summer day you will remember", dream: "Turn this day into a story.", book: "Ask about availability", more: "Discover more experiences", info: "The experience starts before you arrive.", text: "In a Finnish summer, the best moments often come from simple things: nature, water, sauna, people and light.", note: "We show local services and direct you to the provider to book.", provider: "Visit provider" };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: getLocalized(e.name, locale),
        description: getLocalized(e.description, locale),
        image: e.images,
        url: siteUrl + "/" + locale + "/experiences/" + e.slug,
      }) }} />
      <section className="relative isolate min-h-[64vh] overflow-hidden">
        {e.images[0] ? <Image src={e.images[0]} alt={getLocalized(e.name, locale)} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="container-narrow relative flex min-h-[64vh] items-end py-14 text-white sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-white/80">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{getLocalized(e.name, locale)}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">{getLocalized(e.description, locale)}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-white/80"><span>{e.region || e.category}</span><span>•</span><span>{e.duration}</span></div>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{copy.info}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.dream}</h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-600">{copy.text}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{getLocalized(e.description, locale)}</p>
          </div>
          <aside className="h-fit rounded-[2rem] border bg-white p-7 shadow-card lg:sticky lg:top-28">
            <Sparkles className="h-7 w-7 text-amber-500" />
            <p className="mt-5 text-sm text-slate-500">{locale === "fi" ? "Hintaesimerkki" : locale === "es" ? "Precio orientativo" : "Indicative price"}</p>
            <div className="mt-1 text-3xl font-bold text-brand-950">{e.price > 0 ? "€" + e.price : "—"}</div>
            <p className="mt-1 text-sm text-slate-500">{locale === "fi" ? "Tarkista ajantasainen hinta palveluntarjoajalta." : locale === "es" ? "Confirma el precio actual con el proveedor." : "Confirm the current price with the provider."}</p>
            <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">{copy.note}</div>
            {e.providerUrl ? (
              <a href={e.providerUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">{copy.provider}<CalendarDays className="h-4 w-4" /></a>
            ) : (
              <Link href={`/${locale}/contact`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">{copy.book}<CalendarDays className="h-4 w-4" /></Link>
            )}
            <Link href={`/${locale}/experiences`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{copy.more}<ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
