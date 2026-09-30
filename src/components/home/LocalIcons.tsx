import Image from "next/image";
import { ArrowUpRight, Compass, Fish, Sailboat, Trees, Waves } from "lucide-react";
import { photoLibrary } from "@/lib/photo-library";

const partners = [
  {
    key: "herrankukkaro",
    name: "Herrankukkaro",
    place: "Rymättylä · Naantali",
    description: {
      fi: "Savusauna, merenranta, majoitus ja saariston ruokaperinne.",
      es: "Sauna de humo, mar, alojamiento y sabores del archipiélago.",
      en: "Smoke sauna, seaside accommodation and archipelago food.",
    },
    image: photoLibrary.herrankukkaroSauna,
    href: "https://www.herrankukkaro.fi/",
    icon: Waves,
  },
  {
    key: "storfinnhova",
    name: "Storfinnhova Gård",
    place: "Björkboda · Kemiönsaari",
    description: {
      fi: "Metsäkylä, maanalainen graniittinen savusauna, puumajat ja glamping.",
      es: "Pueblo del bosque, sauna de humo de granito, casas en los árboles y glamping.",
      en: "Forest village, underground granite smoke sauna, tree cabins and glamping.",
    },
    image: photoLibrary.storfinnhova,
    href: "https://www.storfinnhova.com/",
    icon: Trees,
  },
  {
    key: "bjorkholm",
    name: "Björkholm",
    place: "Parainen · Turun saaristo",
    description: {
      fi: "Saunamökkejä, veneilyä, melontaa, kalastusta ja saaristotunnelmaa.",
      es: "Cabañas con sauna, barcos, kayak, pesca y vida de isla.",
      en: "Sauna cottages, boats, kayaking, fishing and island life.",
    },
    image: photoLibrary.bjorkholm,
    href: "https://bjorkholm.johku.com/",
    icon: Sailboat,
  },
  {
    key: "natura",
    name: "Natura Viva · Teijo",
    place: "Mathildedal · Salo",
    description: {
      fi: "Kajakit, kanootit, SUP-laudat, soutuveneet ja fatbiket Teijon kansallispuistossa.",
      es: "Kayaks, canoas, SUP, barcas de remos y fatbikes en Teijo.",
      en: "Kayaks, canoes, SUP boards, rowboats and fatbikes in Teijo National Park.",
    },
    image: photoLibrary.naturaVivaTeijo,
    href: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop",
    icon: Compass,
  },
  {
    key: "tuuseikkailee",
    name: "TuuSeikkailee",
    place: "Oripää · Auranmaa",
    description: {
      fi: "Oripään harjumaisemia, sähköfatbikeja ja kanoottivuokrausta pieniin luontoelämyksiin.",
      es: "Naturaleza de Oripää, bicicletas eléctricas fatbike y canoas para pequeñas aventuras.",
      en: "Oripää landscapes, e-fatbikes and canoe rental for small outdoor adventures.",
    },
    href: "https://tuuseikkailee.fi/",
    image: undefined,
    icon: Fish,
  },
] as const;

export default function LocalIcons({ locale }: { locale: "fi" | "es" | "en" }) {
  const title = locale === "fi" ? "Paikalliset helmet" : locale === "es" ? "Joyas locales" : "Local icons";
  const intro = locale === "fi"
    ? "Valitsimme pieniä ja omaleimaisia toimijoita, joiden kautta pääset kiinni oikeaan saaristo- ja maaseutukokemukseen."
    : locale === "es"
      ? "Una selección de pequeños proveedores que acercan al viajero a la auténtica vida rural y del archipiélago."
      : "A handpicked set of small providers that bring you closer to authentic rural and archipelago life.";
  const cta = locale === "fi" ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit provider";

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="container-narrow">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">Hidden Coastal Finland</p>
          <h2 className="mt-3 section-title">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <article key={partner.key} className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  {partner.image ? (
                    <Image src={partner.image} alt={partner.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-brand-950 text-white"><Icon className="h-10 w-10 text-gold-300" /></div>
                  )}
                  <div className="absolute left-4 top-4 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm"><Icon className="h-4 w-4" /></div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-terracotta">{partner.place}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{partner.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{partner.description[locale]}</p>
                  <a href={partner.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                    {cta} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          {locale === "fi"
            ? "Palveluntarjoajien omat hinnat, saatavuus, aukioloajat ja sopimusehdot voivat muuttua. Tarkista ajantasaiset tiedot aina palveluntarjoajan omalta sivulta."
            : locale === "es"
              ? "Precios, disponibilidad, horarios y condiciones pueden cambiar. Comprueba siempre la información actual en la web del proveedor."
              : "Prices, availability, opening times and terms can change. Always confirm current details on the provider's own website."}
        </p>
      </div>
    </section>
  );
}
