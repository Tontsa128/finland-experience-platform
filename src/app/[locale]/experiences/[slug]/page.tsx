import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { experiences as fallbackExperiences, getLocalized } from "@/lib/data";
import { getPublishedExperiences } from "@/lib/public-content";
import type { Locale } from "@/types";

export default async function ExperienceDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const cmsExperiences = await getPublishedExperiences();
  const experiences = cmsExperiences.length ? cmsExperiences : fallbackExperiences;
  const e = experiences.find((x) => x.slug === params.slug);
  if (!e) notFound();

  return (
    <div className="container-narrow py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {e.images[0] ? (
            <div className="relative aspect-video overflow-hidden rounded-3xl">
              <Image src={e.images[0]} alt={getLocalized(e.name, locale)} fill sizes="(max-width:1024px) 100vw,70vw" className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-3xl bg-brand-50 text-sm text-brand-700">{e.category}</div>
          )}
          <div className="mt-8 flex gap-3 text-sm text-brand-700"><span>{e.region || e.category}</span><span>•</span><span>{e.duration}</span></div>
          <h1 className="mt-3 section-title">{getLocalized(e.name, locale)}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{getLocalized(e.description, locale)}</p>
        </div>
        <aside className="h-fit rounded-2xl border bg-white p-6 shadow-card lg:sticky lg:top-28">
          <p className="text-sm text-slate-500">{locale === "fi" ? "Hintaesimerkki" : locale === "es" ? "Precio orientativo" : "Indicative price"}</p>
          <div className="mt-1 text-3xl font-bold text-brand-900">{e.price > 0 ? "€" + e.price : "—"}</div>
          <p className="text-sm text-slate-500">{locale === "fi" ? "tarkista ajantasainen hinta palveluntarjoajalta" : locale === "es" ? "confirma el precio actual con el proveedor" : "confirm the current price with the provider"}</p>
          <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">
            {locale === "fi" ? "Näytämme paikallisia palveluita ja ohjaamme varaukseen palveluntarjoajalle. Emme myy valmista matkapakettia." : locale === "es" ? "Mostramos servicios locales y dirigimos al proveedor para reservar. No vendemos paquetes turísticos." : "We show local services and direct you to the provider to book. We do not sell travel packages."}
          </div>
          <Link href={"/" + locale + "/contact"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-800">
            {locale === "fi" ? "Kysy tästä elämyksestä" : locale === "es" ? "Preguntar por esta actividad" : "Ask about this activity"}
          </Link>
        </aside>
      </div>
    </div>
  );
}
