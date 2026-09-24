import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Users, BedDouble } from "lucide-react";
import { cabins, getLocalized } from "@/lib/data";
import type { Locale } from "@/types";

export default function CabinDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const c = cabins.find((x) => x.slug === params.slug);
  if (!c) notFound();

  return (
    <div className="container-narrow py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.images.slice(0, 2).map((image, i) => (
              <div key={image} className={i === 0 ? "relative aspect-[16/10] overflow-hidden rounded-3xl sm:col-span-2" : "relative aspect-[16/10] overflow-hidden rounded-2xl"}>
                <Image src={image} alt={getLocalized(c.name, locale)} fill priority={i === 0} sizes={i === 0 ? "100vw" : "50vw"} className="object-cover" />
              </div>
            ))}
          </div>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[.16em] text-brand-600">{c.region}</p>
          <h1 className="mt-2 section-title">{getLocalized(c.name, locale)}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{getLocalized(c.description, locale)}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-4"><MapPin className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-slate-600">{c.location}</p></div>
            <div className="rounded-xl border bg-white p-4"><Users className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-slate-600">{c.maxGuests} {locale === "fi" ? "hlö" : locale === "es" ? "personas" : "guests"}</p></div>
            <div className="rounded-xl border bg-white p-4"><BedDouble className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-slate-600">{c.bedrooms} {locale === "fi" ? "makuuhuonetta" : locale === "es" ? "habitaciones" : "bedrooms"}</p></div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {c.features.map((f) => <span key={f} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm text-brand-800">{f}</span>)}
          </div>

          {c.priceNote && <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">{getLocalized(c.priceNote, locale)}</div>}
        </div>

        <aside className="h-fit rounded-2xl border bg-white p-6 shadow-card lg:sticky lg:top-28">
          <p className="text-sm text-slate-500">{locale === "fi" ? "Hintaesimerkki" : locale === "es" ? "Precio orientativo" : "Indicative price"}</p>
          <div className="mt-1 text-3xl font-bold text-brand-900">{c.pricePerNight > 0 ? "€" + c.pricePerNight : "—"}</div>
          <p className="text-sm text-slate-500">{locale === "fi" ? "alkaen / yö, tarkista palveluntarjoajalta" : locale === "es" ? "desde / noche, confirma con el proveedor" : "from / night, confirm with the provider"}</p>

          <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">
            {locale === "fi" ? "Emme myy tätä majoitusta. Välitämme kohteen tiedot ja ohjaamme sinut palveluntarjoajan omaan varaukseen." : locale === "es" ? "No vendemos este alojamiento. Mostramos la información y te dirigimos a la reserva del proveedor." : "We do not sell this accommodation. We present the information and send you to the provider's own booking."}
          </div>

          {c.bookingUrl ? (
            <a href={c.bookingUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-800">
              {locale === "fi" ? "Tarkista saatavuus" : locale === "es" ? "Ver disponibilidad" : "Check availability"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}

          <Link href={"/" + locale + "/contact"} className="mt-3 inline-flex w-full justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {locale === "fi" ? "Kysy tästä kohteesta" : locale === "es" ? "Preguntar por este lugar" : "Ask about this stay"}
          </Link>

          {c.provider && <p className="mt-5 text-center text-xs text-slate-400">{c.provider}</p>}
        </aside>
      </div>
    </div>
  );
}
