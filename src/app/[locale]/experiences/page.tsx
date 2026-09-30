import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { experiences as fallbackExperiences, getLocalized } from "@/lib/data";
import { getPublishedExperiences } from "@/lib/public-content";
import type { Locale } from "@/types";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { allowDemoFallback } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const copy = locale === "fi"
    ? { title: "Elämykset Suomessa | Sauna, saaristo ja luonto", description: "Löydä aitoja sauna-, luonto-, melonta-, pyöräily- ja saaristoelämyksiä Suomessa." }
    : locale === "es"
      ? { title: "Experiencias en Finlandia | Sauna, naturaleza y archipiélago", description: "Descubre experiencias auténticas de sauna, naturaleza, kayak, ciclismo y archipiélago en Finlandia." }
      : { title: "Experiences in Finland | Sauna, Nature & Archipelago", description: "Discover authentic sauna, nature, kayaking, cycling and archipelago experiences in Finland." };
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: "experiences" });
}

export default async function ExperiencesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsExperiences = await getPublishedExperiences();
  const experiences = cmsExperiences.length || !allowDemoFallback ? cmsExperiences : fallbackExperiences;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "fi" ? "Elämykset Suomessa" : locale === "es" ? "Experiencias en Finlandia" : "Experiences in Finland",
    itemListElement: experiences.map((experience, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getLocalized(experience.name, locale),
      url: "/" + locale + "/experiences/" + experience.slug,
    })),
  };

  const copy = locale === "fi"
    ? { eyebrow: "Suomen kesä odottaa", title: "Tee lomastasi tarina", intro: "Sauna järven rannalla. Veneily auringon alla. Yöttömän yön hetki, jonka muistat vielä pitkään.", idea: "Miltä sinun kesäsi tuntuu?", more: "Tutustu kaikkiin elämyksiin" }
    : locale === "es"
      ? { eyebrow: "El verano finlandés te espera", title: "Convierte tus vacaciones en una historia", intro: "Sauna junto al lago. Un paseo en barco bajo el sol. Una noche de verano que parece no terminar.", idea: "¿Cómo quieres sentir tu verano?", more: "Descubrir todas las experiencias" }
      : { eyebrow: "Finnish summer is waiting", title: "Turn your holiday into a story", intro: "Sauna by the lake. A boat ride beneath the sun. A summer night that seems to never end.", idea: "How do you want your summer to feel?", more: "Explore all experiences" };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <section className="bg-brand-950 text-white">
        <div className="container-narrow py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-white/60">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[1.04] sm:text-7xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-white/80">{copy.intro}</p>
          <Link href={`/${locale}/accommodations`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">
            {locale === "fi" ? "Löydä myös majoitus" : locale === "es" ? "Encontrar alojamiento" : "Find a place to stay"} <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{copy.idea}</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{locale === "fi" ? "Valitse hetki, jota odotat eniten." : locale === "es" ? "Elige el momento que más esperas." : "Choose the moment you are waiting for."}</h2></div>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <Link key={experience.id} href={`/${locale}/experiences/${experience.slug}`} className="group overflow-hidden rounded-[1.5rem] bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                {experience.images[0] ? <Image src={experience.images[0]} alt={getLocalized(experience.name, locale)} fill sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover transition duration-700 group-hover:scale-105"/> : <div className="flex h-full items-center justify-center text-brand-700"><Sparkles/></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"/>
                <div className="absolute bottom-4 left-5 right-5 text-white"><p className="text-xs font-semibold uppercase tracking-[.16em] text-white/75">{experience.category}</p><h2 className="mt-1 font-display text-2xl font-bold">{getLocalized(experience.name, locale)}</h2></div>
              </div>
              <div className="p-5"><p className="text-sm leading-relaxed text-slate-600 line-clamp-3">{getLocalized(experience.shortDescription, locale)}</p><div className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold text-brand-800"><span>{experience.price > 0 ? "€"+experience.price+"+" : locale === "fi" ? "Kysy hinta" : locale === "es" ? "Consultar precio" : "Ask provider"}</span><span>{experience.duration}</span></div></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50"><div className="container-narrow py-14"><div className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-10"><Sparkles className="h-7 w-7 text-amber-500"/><h2 className="mt-5 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{copy.more}</h2><p className="mt-4 max-w-2xl text-lg text-slate-600">{copy.intro}</p></div></div></section>
    </div>
  );
}
