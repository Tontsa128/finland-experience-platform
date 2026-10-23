import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { photoLibrary } from "@/lib/photo-library";
import type { Locale } from "@/types";

type Localized = Record<Locale, string>;

type SaunaPlace = {
  name: string;
  location: Localized;
  description: Localized;
  access: Localized;
  capacity?: string;
  image: string;
  imageCredit: string;
  source: string;
  imageSource: string;
};

const places: SaunaPlace[] = [
  {
    name: "Herrankukkaro",
    location: { fi: "Rymättylä · Naantali", es: "Rymättylä · Naantali", en: "Rymättylä · Naantali" },
    description: {
      fi: "Turun saaristossa sijaitseva elämyksellinen kokonaisuus, jossa savusauna, meri, lämminvesialtaat ja saaristolaismiljöö kohtaavat. Savusaunat palvelevat ryhmiä ja valikoituina päivinä myös yksittäisiä vieraita.",
      es: "Un lugar único en el archipiélago de Turku donde la sauna de humo, el mar, las piscinas calientes y el ambiente del archipiélago se unen. También recibe visitantes individuales en fechas seleccionadas.",
      en: "A distinctive Turku Archipelago setting where smoke sauna, sea, warm-water pools and island atmosphere come together. Individual visitors are also welcomed on selected dates.",
    },
    access: { fi: "Yksittäiset vieraat valikoituina tapahtumapäivinä · ryhmät ympäri vuoden", es: "Visitas individuales en fechas seleccionadas · grupos todo el año", en: "Individual visits on selected event dates · groups year-round" },
    capacity: "10–150 hlö",
    image: photoLibrary.herrankukkaroSauna,
    imageCredit: "Herrankukkaro",
    source: "https://www.herrankukkaro.fi/",
    imageSource: "https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt",
  },
  {
    name: "Storfinnhova Gård",
    location: { fi: "Björkboda · Kemiönsaari", es: "Björkboda · Kimitoön", en: "Björkboda · Kimitoön" },
    description: {
      fi: "Ainutlaatuinen maanalainen graniittinen savusauna metsäpuron varrella. Löylyjen välissä voi vilvoitella virtaavassa purossa. Sauna on sekä yleisövuoroilla että yksityisesti varattavissa.",
      es: "Una singular sauna de humo subterránea construida en granito junto a un arroyo forestal. Entre sesiones se puede refrescar en el agua corriente. Hay turnos públicos y reservas privadas.",
      en: "A unique underground granite smoke sauna beside a forest stream. Cool down in the flowing water between sauna sessions. Public sessions and private bookings are available.",
    },
    access: { fi: "Yleisiä saunavuoroja 2–5 kertaa kuukaudessa · yksityissauna", es: "2–5 sesiones públicas al mes · sauna privada", en: "2–5 public sessions per month · private sauna" },
    capacity: "n. 35 hlö",
    image: photoLibrary.storfinnhova,
    imageCredit: "Storfinnhova Gård",
    source: "https://www.storfinnhova.com/savusauna/",
    imageSource: "https://www.storfinnhova.com/",
  },
  {
    name: "Kavalton Tila",
    location: { fi: "Piikkiö · Kaarina", es: "Piikkiö · Kaarina", en: "Piikkiö · Kaarina" },
    description: {
      fi: "Metsälammen äärellä sijaitsevat Isännän savusauna ja suurempi Tuurun savusauna. Savusaunojen yhteydessä on tiloja oleskeluun, ruokailuun ja ryhmille.",
      es: "Dos saunas de humo junto a un estanque forestal: la Isännän savusauna y la mayor Tuurun savusauna. También hay espacios para comer y pasar tiempo juntos.",
      en: "Two smoke saunas beside a forest pond: Isännän savusauna and the larger Tuurun savusauna. Spaces for dining and spending time together are also available.",
    },
    access: { fi: "Avoimia savusauna- ja avantouinti-iltoja · yksityis- ja ryhmävaraukset", es: "Noches públicas de sauna y baño de hielo · reservas privadas y de grupos", en: "Public smoke-sauna and ice-swimming evenings · private and group bookings" },
    capacity: "15–20 / 35 hlö",
    image: "https://www.kavaltontila.com/wp-content/uploads/2023/10/351-DSCF9851-netti.jpg",
    imageCredit: "Kavalton Tila",
    source: "https://www.kavaltontila.com/tilat/",
    imageSource: "https://www.kavaltontila.com/",
  },
  {
    name: "Villa Apollo",
    location: { fi: "Parainen · Turun saaristo", es: "Pargas · Archipiélago de Turku", en: "Pargas · Turku Archipelago" },
    description: {
      fi: "Merenrantakohde, jonka erikoisuutena on maailman ensimmäiseksi kuvattu kelluva savusauna. Kokonaisuus on suunnattu yksityisille ja yritysryhmille, ja saunasta pääsee suoraan mereen tai avantoon.",
      es: "Un lugar junto al mar cuya especialidad es la sauna de humo flotante presentada como la primera del mundo. El conjunto se reserva para grupos privados y empresas, con acceso directo al mar o al hielo.",
      en: "A seafront destination featuring a floating smoke sauna described by the provider as the world's first. The sauna experience is reserved for private and corporate groups, with direct access to the sea or ice.",
    },
    access: { fi: "Yksityis- ja yritysryhmille · tilauksesta", es: "Grupos privados y empresas · bajo petición", en: "Private and corporate groups · on request" },
    capacity: "n. 10–30 hlö",
    image: photoLibrary.saunaBoat,
    imageCredit: "Villa Apollo · kuvalähde palveluntarjoajan sivulla",
    source: "https://villa-apollo.fi/sauna-ja-saunatilat-turku-saunomista-merenrannalla-savusaunassa-paljussa",
    imageSource: "https://villa-apollo.fi/sauna-ja-saunatilat-turku-saunomista-merenrannalla-savusaunassa-paljussa",
  },
  {
    name: "Zoolandian savusauna",
    location: { fi: "Lieto", es: "Lieto", en: "Lieto" },
    description: {
      fi: "Suuri savusauna lammen rannalla. Tilauksesta käytössä ympäri vuoden, ja talvikaudella järjestetään yleisiä savusaunavuoroja. Oma laituri mahdollistaa uinnin ja ryhmille sauna sopii noin 15–60 hengelle.",
      es: "Una gran sauna de humo junto a un estanque. Disponible bajo petición durante todo el año y con sesiones públicas en invierno. El embarcadero permite nadar y el espacio admite grupos de aproximadamente 15–60 personas.",
      en: "A large smoke sauna beside a pond. Available by booking year-round, with public sessions in winter. A private pier allows swimming and the sauna suits groups of around 15–60 people.",
    },
    access: { fi: "Yleisövuoroja · yksityistilaisuudet ympäri vuoden", es: "Sesiones públicas · eventos privados todo el año", en: "Public sessions · private events year-round" },
    capacity: "n. 45 hlö / 15–60 hlö ryhmät",
    image: photoLibrary.saunaTraditionalSmoke,
    imageCredit: "Zoolandia · kuvalähde palveluntarjoajan sivulla",
    source: "https://zoolandia.fi/savusauna/",
    imageSource: "https://zoolandia.fi/savusauna/",
  },
  {
    name: "Kuusijärven savusaunat",
    location: { fi: "Vantaa · Kuusijärvi", es: "Vantaa · Kuusijärvi", en: "Vantaa · Lake Kuusijärvi" },
    description: {
      fi: "Tunnettu yleinen savusaunakohde, jossa on pieni savusauna, iso rantasavusauna sekä Havu ja Pihka. Saunomiseen voi yhdistää ympärivuotisen uinnin ja talvella avantouinnin.",
      es: "Un conocido destino de saunas de humo públicas con varias saunas. La experiencia puede combinarse con natación durante todo el año y baño de hielo en invierno.",
      en: "A well-known public smoke-sauna destination with several smoke saunas. Combine sauna with year-round swimming and ice swimming in winter.",
    },
    access: { fi: "Yleiset vuorot · ei ennakkovarausta savusaunoihin", es: "Sesiones públicas · sin reserva previa para las saunas de humo", en: "Public sessions · no advance booking for smoke saunas" },
    capacity: undefined,
    image: photoLibrary.saunaTraditionalSmoke,
    imageCredit: "Cafe Kuusijärvi · kuvalähde palveluntarjoajan sivulla",
    source: "https://www.cafekuusijarvi.fi/saunat",
    imageSource: "https://www.cafekuusijarvi.fi/saunat",
  },
  {
    name: "Sipoonjoen Perinnesauna",
    location: { fi: "Sipoo", es: "Sipoo", en: "Sipoo" },
    description: {
      fi: "Perinteitä vaaliva savusaunakohde Sipoonjoen ja Sipoonkorven läheisyydessä. Kohteessa järjestetään yleisiä saunavuoroja ja saunaelämys on saatavilla myös yksityiseen käyttöön.",
      es: "Una sauna de humo dedicada a las tradiciones cerca del río Sipoonjoki y el Parque Nacional de Sipoonkorpi. Ofrece sesiones públicas y experiencias privadas.",
      en: "A tradition-focused smoke sauna near the Sipoonjoki river and Sipoonkorpi National Park. Public sessions and private sauna experiences are available.",
    },
    access: { fi: "Yleisiä vuoroja · yksityisvaraukset", es: "Sesiones públicas · reservas privadas", en: "Public sessions · private bookings" },
    image: photoLibrary.saunaTraditionalSmoke,
    imageCredit: "Sipoonjoen Perinnesauna · kuvalähde palveluntarjoajan sivulla",
    source: "https://sipoonjoenperinnesauna.johku.com/",
    imageSource: "https://sipoonjoenperinnesauna.johku.com/",
  },
  {
    name: "Korpilammen savusauna ja Riihi",
    location: { fi: "Espoo · Korpilampi", es: "Espoo · Korpilampi", en: "Espoo · Korpilampi" },
    description: {
      fi: "Luonnon keskellä sijaitseva savusaunamiljöö ryhmille. Kohde sopii erityisesti yksityiseen saunahetkeen ja yhdessäoloon.",
      es: "Un entorno de sauna de humo en plena naturaleza para grupos, ideal para una experiencia privada y para pasar tiempo juntos.",
      en: "A smoke-sauna setting in nature for groups, suited to private sauna time and shared gatherings.",
    },
    access: { fi: "Yksityis- ja ryhmävaraukset", es: "Reservas privadas y de grupos", en: "Private and group bookings" },
    image: photoLibrary.saunaCottage,
    imageCredit: "Korpilampi · kuvalähde palveluntarjoajan sivulla",
    source: "https://saunat.co/saunatila/korpilammen-savusauna/",
    imageSource: "https://saunat.co/saunatila/korpilammen-savusauna/",
  },
  {
    name: "Nuuksion savusaunat · Kattila",
    location: { fi: "Espoo · Nuuksio", es: "Espoo · Nuuksio", en: "Espoo · Nuuksio" },
    description: {
      fi: "Nuuksion luonnon ympäröimät savusaunat tarjoavat rauhallisen ympäristön yksityistilaisuuksiin ja ryhmille.",
      es: "Saunas de humo rodeadas por la naturaleza de Nuuksio, pensadas para grupos y eventos privados.",
      en: "Smoke saunas surrounded by Nuuksio nature, designed for private events and groups.",
    },
    access: { fi: "Yksityis- ja ryhmävaraukset", es: "Reservas privadas y de grupos", en: "Private and group bookings" },
    image: photoLibrary.saunaTraditionalSmoke,
    imageCredit: "Green Window · kuvalähde palveluntarjoajan sivulla",
    source: "https://greenwindow.fi/saunat/",
    imageSource: "https://greenwindow.fi/saunat/",
  },
];

const labels: Record<Locale, { eyebrow: string; title: string; intro: string; public: string; private: string; visit: string; source: string }> = {
  fi: { eyebrow: "SAVUSAUNAT · SUOMI", title: "Yleisölle avoimet ja vuokrattavat savusaunat", intro: "Löydä saunapaikkoja, joissa savun, puun, veden ja suomalaisen luonnon tunnelma kuuluu itse kokemukseen. Aloitamme Varsinais-Suomen persoonallisimmista kohteista ja nostamme rinnalle tunnettuja saunoja muualta Suomesta.", public: "Yleisövuoroja", private: "Yksityis- ja ryhmävaraus", visit: "Siirry palveluntarjoajalle", source: "Kuva- ja kohdelähde" },
  es: { eyebrow: "SAUNAS DE HUMO · FINLANDIA", title: "Saunas de humo abiertas al público y para alquiler privado", intro: "Descubre lugares donde el humo, la madera, el agua y la naturaleza finlandesa forman parte de la experiencia. Empezamos por los lugares más singulares del suroeste de Finlandia y añadimos destinos conocidos de todo el país.", public: "Sesiones públicas", private: "Reserva privada y de grupos", visit: "Visitar al proveedor", source: "Fuente de imagen y destino" },
  en: { eyebrow: "SMOKE SAUNAS · FINLAND", title: "Public and private smoke saunas", intro: "Discover places where smoke, wood, water and Finnish nature are part of the experience. We start with distinctive destinations in Southwest Finland and add recognised smoke saunas from around the country.", public: "Public sessions", private: "Private & group booking", visit: "Visit provider", source: "Image & destination source" },
};

export function FeaturedSaunas({ locale }: { locale: Locale }) {
  const x = labels[locale];
  return (
    <section className="bg-brand-50 py-16 sm:py-24" aria-labelledby="featured-saunas-title">
      <div className="container-narrow">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-brand-600">{x.eyebrow}</p>
          <h2 id="featured-saunas-title" className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">{x.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">{x.intro}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place, index) => (
            <article key={place.name} className={`group overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-soft ${index === 0 ? "lg:col-span-2" : ""}`}>
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${place.image}")` }} aria-label={`${place.name} – ${place.location[locale]}`} role="img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-200">{place.location[locale]}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{place.name}</h3>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <p className="leading-7 text-slate-700">{place.description[locale]}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-2 text-brand-900"><MapPin className="h-3.5 w-3.5" />{place.location[locale]}</span>
                  {place.capacity ? <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-2 text-slate-700"><Users className="h-3.5 w-3.5" />{place.capacity}</span> : null}
                </div>
                <p className="mt-4 text-sm font-semibold text-brand-700">{place.access[locale]}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href={place.source} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2">{x.visit}<ArrowUpRight className="h-4 w-4" /></a>
                  <a href={place.imageSource} target="_blank" rel="noreferrer" className="text-xs font-semibold text-slate-500 underline underline-offset-4">{x.source}: {place.imageCredit}</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-4xl text-xs leading-6 text-slate-500">
          {locale === "fi" ? "Palvelujen aukioloajat, hinnat ja saatavuus voivat muuttua. Tarkista ajantasaiset tiedot aina palveluntarjoajan omalta sivulta. FINNEXPRIENCE ohjaa asiakkaan palveluntarjoajalle; varaus ja maksu tehdään suoraan palveluntarjoajalla." : locale === "es" ? "Los horarios, precios y disponibilidad pueden cambiar. Comprueba siempre la información actualizada en la web del proveedor. FINNEXPRIENCE dirige al cliente al proveedor; la reserva y el pago se realizan directamente con el proveedor." : "Opening hours, prices and availability may change. Always check the provider's own website for current information. FINNEXPRIENCE sends customers to the provider; booking and payment are made directly with the provider."}
        </p>
      </div>
    </section>
  );
}
