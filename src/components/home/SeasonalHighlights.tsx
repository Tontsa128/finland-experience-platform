import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const items = [
  {
    date: "9.–18.10.2026",
    key: "pumpkin",
    image: null,
    href: "https://visitsalo.fi/kurpitsaviikot/",
    title: {
      fi: "Kurpitsaviikot Salossa",
      es: "Kurpitsaviikot: otoño en Salo",
      en: "Pumpkin Weeks in Salo",
    },
    text: {
      fi: "Kurpitsapuisto uudella paikalla Vaskiontie 50:ssä, Halikko. Puisto on avoinna klo 10–22.",
      es: "El parque de calabazas se traslada a Vaskiontie 50, Halikko. Abierto de 10:00 a 22:00.",
      en: "The pumpkin park moves to Vaskiontie 50 in Halikko. Open daily 10am–10pm.",
    },
  },
  {
    date: "9.–25.10. & 31.10.–1.11.2026",
    key: "ghost",
    image: null,
    href: "https://mathildedal.fi/en/2026/09/21/ghosts-take-over-mathildedal-welcome-to-ghost-village/",
    title: {
      fi: "Kummitusmuseo Mathildedalissa",
      es: "Ghost Village en Mathildedal",
      en: "Ghost Village in Mathildedal",
    },
    text: {
      fi: "Ruukkikylän syksyyn kuuluvat kummitusmuseo, lasten kummitusmuseo ja Kurpitsaviikkojen tunnelma. Tarkista aukioloajat järjestäjän sivulta.",
      es: "Museo de fantasmas, versión infantil y ambiente de Halloween en el antiguo pueblo industrial. Comprueba los horarios en la web del organizador.",
      en: "Ghost Museum, children's version and Halloween atmosphere in the historic ironworks village. Check opening hours on the organizer's site.",
    },
  },
  {
    date: "21. & 28.11.2026",
    key: "christmas",
    image: null,
    href: "https://mathildedal.fi/2026/04/27/mathildedalin-joulumarkkinat-21-11-28-11-2026/",
    title: {
      fi: "Mathildedalin joulumarkkinat",
      es: "Mercado de Navidad de Mathildedal",
      en: "Mathildedal Christmas Market",
    },
    text: {
      fi: "Perinteiset joulumarkkinat ruukkitehtailla klo 12–18. Käsityöläisiä, lähiruokaa ja valaistu kylämiljöö.",
      es: "Mercado navideño en las antiguas fábricas de 12:00 a 18:00, con artesanía y productos locales.",
      en: "A traditional Christmas market at the ironworks, 12–18, with local crafts, food and a lit-up village.",
    },
  },
] as const;

export default function SeasonalHighlights({ locale }: { locale: "fi" | "es" | "en" }) {
  const eyebrow = locale === "fi" ? "Tämän kauden poiminnat" : locale === "es" ? "Lo más interesante de la temporada" : "Seasonal highlights";
  const title = locale === "fi" ? "Tapahtumia, joiden vuoksi kannattaa jäädä yöksi" : locale === "es" ? "Eventos que merecen una noche extra" : "Events worth staying an extra night for";
  const cta = locale === "fi" ? "Katso tapahtuma" : locale === "es" ? "Ver evento" : "See event";

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-narrow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{eyebrow}</p>
            <h2 className="mt-3 section-title">{title}</h2>
          </div>
          <a href="https://visitsalo.fi/kurpitsaviikot/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-800">
            {locale === "fi" ? "Ajantasaiset tapahtumat" : locale === "es" ? "Eventos actualizados" : "Current event listings"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.key} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-50 shadow-soft">
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-brand-50">
                {item.image ? <Image src={item.image} alt={item.title[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <div className="flex max-w-xs flex-col items-center px-6 text-center text-brand-700"><CalendarDays className="h-8 w-8" /><p className="mt-3 text-xs font-semibold">{locale === "fi" ? "Tapahtumakuva lisätään, kun käyttöoikeus on vahvistettu" : locale === "es" ? "La imagen del evento se añadirá cuando se confirmen los derechos de uso" : "An event photo will be added once usage rights are confirmed"}</p></div>}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm"><CalendarDays className="h-3.5 w-3.5" />{item.date}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-brand-950">{item.title[locale]}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text[locale]}</p>
                <a href={item.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{cta} <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
