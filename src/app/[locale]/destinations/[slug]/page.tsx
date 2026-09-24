import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { destinations, cabins, getLocalized } from "@/lib/data";
import type { Locale } from "@/types";

export default function DestinationDetail({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const d = destinations.find((x) => x.slug === params.slug);
  if (!d) notFound();
  const stays = (d.accommodationIds ?? []).map((id) => cabins.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="container-narrow py-12">
      <div className="relative aspect-[16/7] overflow-hidden rounded-3xl">
        <Image src={d.images[0]} alt={getLocalized(d.name, locale)} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-white/80">{d.region}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold">{getLocalized(d.name, locale)}</h1>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-lg leading-relaxed text-slate-700">{getLocalized(d.description, locale)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {d.tags.map((tag) => <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">{tag}</span>)}
          </div>

          <section className="mt-12">
            <h2 className="section-title text-3xl">{locale === "fi" ? "Majoitukset" : locale === "es" ? "Alojamientos" : "Places to stay"}</h2>
            <p className="section-subtitle mt-2">{locale === "fi" ? "Valitse rauhallinen mökki, boutique-majoitus, glamping tai merenrantahuvila. Varaus tehdään aina palveluntarjoajan omassa järjestelmässä." : locale === "es" ? "Elige una cabaña, boutique, glamping o villa junto al mar. La reserva se realiza directamente con el proveedor." : "Choose a cottage, boutique stay, glamping tent or seaside villa. Booking is completed directly with the provider."}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {stays.map((c) => c && (
                <Link key={c.id} href={"/" + locale + "/accommodations/" + c.slug} className="group overflow-hidden rounded-2xl border bg-white shadow-soft hover:shadow-card transition">
                  <div className="relative aspect-[16/9] overflow-hidden"><Image src={c.images[0]} alt={getLocalized(c.name, locale)} fill sizes="(max-width:768px) 100vw,50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-brand-900">{getLocalized(c.name, locale)}</h3>
                    <p className="mt-1 text-sm text-slate-500">{c.location}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">{getLocalized(c.description, locale)}</p>
                    <p className="mt-4 font-semibold text-brand-700">{c.pricePerNight > 0 ? "€" + c.pricePerNight + " / yö" : locale === "fi" ? "Tarkista ajantasainen hinta" : locale === "es" ? "Consultar precio actual" : "Check current price"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="section-title text-3xl">{locale === "fi" ? "Tekemistä ja näkemistä" : locale === "es" ? "Qué hacer y ver" : "Things to do & see"}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(d.activities ?? []).map((activity) => (
                <div key={activity} className="rounded-2xl border bg-white p-4 shadow-soft"><span className="text-sm font-medium text-slate-700">{activity}</span></div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border bg-brand-950 p-6 text-white shadow-card lg:sticky lg:top-28">
          <p className="text-sm uppercase tracking-[.15em] text-white/60">{locale === "fi" ? "Kesäloman idea" : locale === "es" ? "Idea para el verano" : "Summer idea"}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{locale === "fi" ? "7–14 päivää ilman kiirettä" : locale === "es" ? "7–14 días sin prisas" : "7–14 days without rushing"}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{locale === "fi" ? "Yhdistä majoitus, sauna, meri, luonto ja muutama valittu aktiviteetti. Me välitämme tiedon ja ohjaamme palveluntarjoajan sivulle – emme myy valmista matkapakettia." : locale === "es" ? "Combina alojamiento, sauna, mar, naturaleza y algunas actividades. Nosotros mostramos las opciones y dirigimos al proveedor; no vendemos un paquete turístico." : "Combine accommodation, sauna, sea, nature and a few selected activities. We present the options and send you to the provider; we do not sell a travel package."}</p>
          <Link href={"/" + locale + "/contact"} className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-brand-50">{locale === "fi" ? "Kysy sopivista vaihtoehdoista" : locale === "es" ? "Pregúntanos por opciones" : "Ask us about options"}</Link>
        </aside>
      </div>
    </div>
  );
}
