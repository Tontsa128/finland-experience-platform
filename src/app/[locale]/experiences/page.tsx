import Link from "next/link";
import { experiences as fallbackExperiences, getLocalized } from "@/lib/data";
import { getPublishedExperiences } from "@/lib/public-content";
import type { Locale } from "@/types";

export default async function ExperiencesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsExperiences = await getPublishedExperiences();
  const experiences = cmsExperiences.length ? cmsExperiences : fallbackExperiences;

  return (
    <div className="container-narrow py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Summer • Finland</p>
      <h1 className="mt-2 section-title">{locale === "fi" ? "Tekemistä ja elämyksiä" : locale === "es" ? "Qué hacer y experiencias" : "Things to do & experiences"}</h1>
      <p className="section-subtitle mt-3 mb-10">{locale === "fi" ? "Hallitut elämykset ja paikalliset palvelut yhdestä paikasta." : locale === "es" ? "Experiencias y servicios locales en un solo lugar." : "Experiences and local services in one place."}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience) => (
          <Link key={experience.id} href={"/" + locale + "/experiences/" + experience.slug} className="rounded-2xl border bg-white p-6 shadow-soft hover:shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{experience.category}</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-brand-900">{getLocalized(experience.name, locale)}</h2>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">{getLocalized(experience.shortDescription, locale)}</p>
            <div className="mt-4 flex justify-between gap-3 font-semibold text-brand-700">
              <span>{experience.price > 0 ? "€" + experience.price + "+" : locale === "fi" ? "Kysy hinta" : locale === "es" ? "Consultar precio" : "Ask provider"}</span>
              <span>{experience.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
