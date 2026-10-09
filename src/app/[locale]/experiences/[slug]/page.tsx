import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getLocalized, experiences as fallbackExperiences } from "@/lib/data";
import { getPublishedExperiences } from "@/lib/public-content";
import type { Locale } from "@/types";
import { formatPrice, locales } from "@/lib/utils";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";
import ExperienceMap from "@/components/experiences/ExperienceMap";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) return {};
  const cmsExperiences = await getPublishedExperiences();
  const source = cmsExperiences.length ? cmsExperiences : fallbackExperiences;
  const experience = source.find((item) => item.slug === slug);
  if (!experience) return {};
  return buildLocalizedMetadata({
    locale,
    title: getLocalized(experience.name, locale),
    description: getLocalized(experience.description, locale),
    path: "experiences/" + experience.slug,
    image: experience.images[0],
  });
}

export default async function ExperienceDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  const cmsExperiences = await getPublishedExperiences();
  const experiences = cmsExperiences.length ? cmsExperiences : fallbackExperiences;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();
  const providerUrl = experience.providerUrl && /^https?:\/\//i.test(experience.providerUrl) ? experience.providerUrl : null;
  const navigationUrl = experience.coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${experience.coordinates.lat},${experience.coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(experience.address || experience.region || experience.name.fi)}`;

  const copy = locale === "fi"
    ? { eyebrow: "Yksi hetki, jonka muistat", dream: "Tee tästä päivästä tarina.", more: "Löydä lisää elämyksiä", info: "Elämys alkaa jo ennen kuin saavut.", text: "Suomen kesässä parhaat hetket syntyvät usein yksinkertaisista asioista: luonnosta, vedestä, saunasta, ihmisistä ja valosta.", note: "Näytämme paikallisia palveluita ja ohjaamme sinut suoraan palveluntarjoajalle. Varaus, maksu ja sopimus tehdään palveluntarjoajan kanssa.", provider: "Siirry palveluntarjoajalle", price: "Hintaesimerkki" }
    : locale === "es"
      ? { eyebrow: "Un momento que recordarás", dream: "Convierte este día en una historia.", more: "Descubrir más experiencias", info: "La experiencia empieza antes de llegar.", text: "En el verano finlandés, los mejores momentos nacen de cosas sencillas: naturaleza, agua, sauna, personas y luz.", note: "Mostramos servicios locales y te dirigimos directamente al proveedor. La reserva, el pago y el contrato se realizan con el proveedor.", provider: "Ir al proveedor", price: "Precio orientativo" }
      : { eyebrow: "One moment you will remember", dream: "Turn this day into a story.", more: "Discover more experiences", info: "The experience starts before you arrive.", text: "In a Finnish summer, the best moments often come from simple things: nature, water, sauna, people and light.", note: "We show local services and direct you to the provider. Booking, payment and the contract are handled with the provider.", provider: "Visit provider", price: "Indicative price" };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: getLocalized(experience.name, locale),
        description: getLocalized(experience.description, locale),
        image: experience.images,
        url: siteUrl + "/" + locale + "/experiences/" + experience.slug,
      }) }} />
      <section className="relative isolate min-h-[64vh] overflow-hidden">
        {experience.images[0] ? <Image src={experience.images[0]} alt={getLocalized(experience.name, locale)} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="container-narrow relative flex min-h-[64vh] items-end py-14 text-white sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-white/80">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{getLocalized(experience.name, locale)}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">{getLocalized(experience.description, locale)}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-white/80">
              {experience.region ? <span>{experience.region}</span> : null}
              {experience.region && experience.duration ? <span aria-hidden="true">•</span> : null}
              {experience.duration ? <span>{experience.duration}</span> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{copy.info}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.dream}</h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-600">{copy.text}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{getLocalized(experience.description, locale)}</p>
            {experience.address ? <p className="mt-6 flex items-start gap-2 text-sm font-medium text-slate-500"><span aria-hidden="true">📍</span><span>{experience.address}</span></p> : null}
            {experience.coordinates ? (
              <div className="mt-10">
                <ExperienceMap items={[experience]} locale={locale} selectedSlug={experience.slug} />
                <a href={navigationUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-900 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800">
                  {locale === "fi" ? "Navigoi kohteeseen" : locale === "es" ? "Navegar hasta el lugar" : "Navigate to this place"}
                </a>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-[2rem] border bg-white p-7 shadow-card lg:sticky lg:top-28">
            <Sparkles className="h-7 w-7 text-amber-500" />
            <p className="mt-5 text-sm text-slate-500">{copy.price}</p>
            <div className="mt-1 text-3xl font-bold text-brand-950">
              {experience.verified && experience.price > 0 ? formatPrice(experience.price, locale) : (locale === "fi" ? "Tarkista palveluntarjoajalta" : locale === "es" ? "Consultar al proveedor" : "Check with provider")}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {locale === "fi" ? "Tarkista ajantasainen hinta palveluntarjoajalta."
                : locale === "es" ? "Confirma el precio actual con el proveedor."
                : "Confirm the current price with the provider."}
            </p>
            <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">{copy.note}</div>

            {providerUrl ? (
              <a href={providerUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
                {copy.provider}
              </a>
            ) : (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-900">
                {locale === "fi" ? "Palveluntarjoajan linkkiä ei ole vielä julkaistu."
                  : locale === "es" ? "El enlace del proveedor aún no está publicado."
                  : "The provider link has not been published yet."}
              </div>
            )}

            <Link href={`/${locale}/experiences`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {copy.more} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
