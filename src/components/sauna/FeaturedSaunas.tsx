import { ArrowUpRight, MapPin, Users } from "lucide-react";
import type { Locale } from "@/types";

type Localized = Record<Locale, string>;
type SaunaPlace = {
  name: string;
  location: string;
  description: Localized;
  access: Localized;
  type: Localized;
  image: string;
  imageCredit: string;
  source: string;
  booking?: string;
  status?: Localized;
  capacity?: string;
};

const places: SaunaPlace[] = [
  {
    name: "Matildanjärven rantasauna",
    location: "Teijon kansallispuisto · Matildanjärventie 84",
    description: {
      fi: "Varaa oma saunavuoro järvimaisemassa retkeilyreittien ja kansallispuiston luonnon äärellä. Sauna, pukuhuone, suihkutila ja terassi; uimapaikka on vieressä.",
      en: "Book a private sauna session beside the lake, close to hiking trails and the national park. Includes a changing room, shower and terrace, with a swimming spot nearby.",
      es: "Reserva una sesión privada junto al lago, cerca de rutas y del parque nacional. Incluye vestuario, ducha y terraza, con una zona de baño al lado."
    },
    access: { fi: "Yksityisvaraus verkossa", en: "Private booking online", es: "Reserva privada en línea" },
    type: { fi: "Vuokrasauna · järvenranta", en: "Rental sauna · lakeside", es: "Sauna de alquiler · junto al lago" },
    image: "https://cdn.johku.com/naturaviva/files/761/w374-h237-s/image.matildanj%C3%A4rven%20sauna.jpg",
    imageCredit: "Natura Viva",
    source: "https://tervarumpu.fi/fi_FI/naturaviva-sauna-teijon-kansallispuisto",
    booking: "https://tervarumpu.fi/fi_FI/naturaviva-sauna-teijon-kansallispuisto",
    capacity: "6 hlö + lisähenkilöt"
  },
  {
    name: "Mathildan Marina · sauna & lounge",
    location: "Mathildedal · Ruukinrannantie 4",
    description: {
      fi: "Yksityinen saunahetki sataman tunnelmassa. Kaksi saunaa, lounge ja katettu meriterassi; ulkoporeallas on varattavissa lisäpalveluna.",
      en: "Enjoy a private sauna session by the harbour, with two saunas, a lounge and a covered sea-view terrace. An outdoor hot tub is available as an extra.",
      es: "Disfruta de una sesión privada junto al puerto, con dos saunas, salón y terraza cubierta con vistas al mar. También se puede reservar un jacuzzi exterior."
    },
    access: { fi: "Yksityisvaraus · tarkista hinnat ja vapaat ajat", en: "Private booking · check prices and availability", es: "Reserva privada · consulta precios y disponibilidad" },
    type: { fi: "Vuokrasauna · spa", en: "Rental sauna · spa", es: "Sauna de alquiler · spa" },
    image: "https://cdn-datahub.visitfinland.com/images/e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280",
    imageCredit: "Mathildan Marina / Visit Finland DataHub",
    source: "https://mathildanmarina.fi/saunat/",
    booking: "https://mathildanmarina.fi/saunat/",
    capacity: "6 tai 12 hlö"
  },
  {
    name: "Hotel Mathildedal · maisemasauna",
    location: "Mathildedal · ruukkikylä",
    description: {
      fi: "Ruukkikylän katolla sijaitseva maisemasauna yhdistää historiallisen miljöön ja avarat näkymät. Varmista saunan varausmahdollisuus suoraan hotellilta.",
      en: "A rooftop sauna in the historic ironworks village, combining heritage surroundings with open views. Contact the hotel to confirm booking options.",
      es: "Una sauna panorámica en la azotea del pueblo histórico, con vistas abiertas y ambiente patrimonial. Consulta directamente con el hotel las opciones de reserva."
    },
    access: { fi: "Tiedustele varaus suoraan hotellilta", en: "Enquire directly with the hotel", es: "Consulta directamente con el hotel" },
    type: { fi: "Maisemasauna · varmistettava saatavuus", en: "View sauna · availability to confirm", es: "Sauna panorámica · confirmar disponibilidad" },
    image: "https://cdn-datahub.visitfinland.com/images/67490c50-bc54-11ef-9fcc-d37cec752366.jpeg?s=1280",
    imageCredit: "Hotel Mathildedal / Visit Finland DataHub",
    source: "https://mathildedal.fi/",
    booking: "https://mathildedal.fi/"
  },
  {
    name: "Myllytyryn rantasauna",
    location: "Hajala · Myllytyry",
    description: {
      fi: "Puulämmitteinen sauna lähdepohjaisen metsälampin rannalla. Saunan voi vuokrata yksityiskäyttöön; rannalla on myös laituri ja talvella avanto.",
      en: "A wood-heated sauna beside a spring-fed forest pond. The sauna can be rented privately; there is a pier and an ice-swimming hole in winter.",
      es: "Sauna de leña junto a una laguna forestal alimentada por manantiales. Se puede alquilar en privado; hay muelle y baño en hielo en invierno."
    },
    access: { fi: "Yksityisvuokraus ja varauskalenteri", en: "Private rental and booking calendar", es: "Alquiler privado y calendario de reservas" },
    type: { fi: "Vuokrasauna · puulämmitteinen", en: "Rental sauna · wood-heated", es: "Sauna de alquiler · leña" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/03/Myllytyry-sauna-1366x768.jpg",
    imageCredit: "Visit Salo / Hajalan kyläyhdistys",
    source: "https://kohteet.visitsalo.fi/myllytyryn-uimapaikka/",
    booking: "https://www.hajala.fi/myllytyry",
    capacity: "Pieni ryhmä"
  },
  {
    name: "Lainerannan sauna",
    location: "Kisko · Pitkäniementie 119",
    description: {
      fi: "Puulämmitteinen sauna Naarjärven rannalla. Kesällä sauna lämpiää perjantaisin, talvella avantouintisauna lauantaisin; tupa ja sauna ovat myös vuokrattavissa.",
      en: "A wood-heated sauna on the shore of Lake Naarjärvi. Summer sauna on Fridays and winter ice-swimming sauna on Saturdays; the sauna and cabin can also be rented.",
      es: "Sauna de leña junto al lago Naarjärvi. Sauna de verano los viernes y sauna para baño en hielo los sábados en invierno; también se alquilan la sauna y la cabaña."
    },
    access: { fi: "Yleisövuoroja ja yksityisvuokraus", en: "Public sessions and private rental", es: "Turnos públicos y alquiler privado" },
    type: { fi: "Yleisösauna · vuokrasauna", en: "Public sauna · rental", es: "Sauna pública · alquiler" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/03/Laineranta-Kuva-Jaana-Joutsen-1024x768.jpg",
    imageCredit: "Jaana Joutsen / Visit Salo",
    source: "https://kohteet.visitsalo.fi/lainerannan-uimapaikka/",
    booking: "https://www.laineranta.fi/"
  },
  {
    name: "Niksaaren sauna",
    location: "Särkisalo · Niksaarentie, Förby",
    description: {
      fi: "Merellinen kaupungin sauna, jossa on suihku- ja pukeutumistilat. Kesäisin yleisiä saunavuoroja ja erikseen varattava yksityiskäyttö.",
      en: "A municipal sauna in a maritime setting, with shower and changing facilities. Public sessions run in summer, and private use can be booked separately.",
      es: "Sauna municipal en un entorno marítimo, con duchas y vestuarios. Hay turnos públicos en verano y se puede reservar para uso privado."
    },
    access: { fi: "Yleisövuorot kesällä · yksityisvaraus erikseen", en: "Public summer sessions · separate private booking", es: "Turnos públicos en verano · reserva privada por separado" },
    type: { fi: "Yleisösauna · vuokrasauna", en: "Public sauna · rental", es: "Sauna pública · alquiler" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2026/03/Niksaari-2-1024x768.jpg",
    imageCredit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/niksaaren-sauna/",
    booking: "https://www.tiiranta.fi/",
    capacity: "n. 7–8 hlö"
  },
  {
    name: "Naarjärven uimarannan sauna",
    location: "Perniö · Uimarannantie 245",
    description: {
      fi: "Hiekkaranta, laituri, sauna ja grillikatos tekevät Naarjärvestä klassisen kesäisen uimapaikan. Talviuintiseurat voivat tiedustella saunan vuokraamista.",
      en: "A sandy beach, pier, sauna and barbecue shelter make Naarjärvi a classic summer swimming spot. Winter-swimming clubs can enquire about sauna rental.",
      es: "La playa de arena, el muelle, la sauna y la zona de barbacoa hacen de Naarjärvi un lugar clásico para bañarse en verano. Los clubes de baño invernal pueden consultar el alquiler."
    },
    access: { fi: "Yleinen sauna aukioloaikoina · talvikauden vuorot järjestäjiltä", en: "Public sauna during opening hours · ask organisers about winter sessions", es: "Sauna pública en horario de apertura · consulta los turnos de invierno" },
    type: { fi: "Saunallinen uimaranta", en: "Swimming beach with sauna", es: "Playa con sauna" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/06/Nartsi-sauna-1024x768.jpg",
    imageCredit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/naarjarven-uimaranta/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/"
  },
  {
    name: "Lehmijärven uimarannan saunat",
    location: "Perniö · Lehmirannantie 121",
    description: {
      fi: "Kaksi saunaa, suihkut, pukuhuoneet, matala hiekkaranta ja laiturit. Sauna toimii uimalan ilmoitettuina aukioloaikoina.",
      en: "Two saunas, showers, changing rooms, a shallow sandy beach and piers. Sauna access follows the swimming facility's published opening hours.",
      es: "Dos saunas, duchas, vestuarios, playa de arena poco profunda y muelles. La sauna abre según el horario publicado de la zona de baño."
    },
    access: { fi: "Yleinen sauna uimalan aukioloaikoina", en: "Public sauna during swimming facility opening hours", es: "Sauna pública durante el horario de la zona de baño" },
    type: { fi: "Saunallinen uimaranta", en: "Swimming beach with sauna", es: "Playa con sauna" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Lehmij%C3%A4rven-uimarannan-sauna-web.jpg",
    imageCredit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/lehmijarven-uimaranta/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/"
  },
  {
    name: "Nummijärven uimarannan sauna",
    location: "Kuusjoki · Järvitie 93",
    description: {
      fi: "Kirkasvetinen järvi, hiekkaranta, laituri ja sauna. Talviuintiseurat voivat tiedustella saunan vuokraamista talviuintikäyttöön.",
      en: "A clear-water lake with a sandy beach, pier and sauna. Winter-swimming clubs can enquire about renting the sauna for winter swimming.",
      es: "Lago de aguas claras con playa de arena, muelle y sauna. Los clubes de baño invernal pueden consultar el alquiler de la sauna."
    },
    access: { fi: "Yleinen sauna · talvikauden vuorot järjestäjiltä", en: "Public sauna · ask organisers about winter sessions", es: "Sauna pública · consulta los turnos de invierno" },
    type: { fi: "Saunallinen uimaranta", en: "Swimming beach with sauna", es: "Playa con sauna" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Nummij%C3%A4rven-saunarakennus-web-1366x768.jpg",
    imageCredit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/nummijarven-uimaranta/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/"
  },
  {
    name: "Märynummen uimarannan sauna",
    location: "Märynummi · Hirvitie 92",
    description: {
      fi: "Loivasti syvenevä hiekkaranta ja yhteiset sauna- ja pesutilat. Talviuintiseurat voivat tiedustella saunavuoroja järjestäjiltä.",
      en: "A gently sloping sandy beach with shared sauna and washing facilities. Winter-swimming clubs can enquire about sauna sessions.",
      es: "Playa de arena de pendiente suave con sauna y duchas compartidas. Los clubes de baño invernal pueden consultar los turnos."
    },
    access: { fi: "Yleinen sauna aukioloaikoina", en: "Public sauna during opening hours", es: "Sauna pública en horario de apertura" },
    type: { fi: "Saunallinen uimaranta", en: "Swimming beach with sauna", es: "Playa con sauna" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/06/Uimaranta-M%C3%A4ry_-1366x768.jpg",
    imageCredit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/marynummen-uimaranta/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/"
  },
  {
    name: "Varvojärven uimarannan sauna",
    location: "Pertteli · Varvontie 478",
    description: {
      fi: "Hiekkaranta, laituri, sauna ja grillikatos metsäisen järvimaiseman äärellä. Tarkista ennen uintia kaupungin ajantasaiset uimavesitiedotteet.",
      en: "A sandy beach, pier, sauna and barbecue shelter beside a forest lake. Check the city's current bathing-water notices before swimming.",
      es: "Playa de arena, muelle, sauna y zona de barbacoa junto a un lago rodeado de bosque. Consulta los avisos actuales sobre el agua antes de bañarte."
    },
    access: { fi: "Yleinen sauna aukioloaikoina", en: "Public sauna during opening hours", es: "Sauna pública en horario de apertura" },
    type: { fi: "Saunallinen uimaranta", en: "Swimming beach with sauna", es: "Playa con sauna" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Varvoj%C3%A4rvi-web-1366x768.jpg",
    imageCredit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/varvojarven-uimaranta/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/"
  },
  {
    name: "Härjänvatsan uimarannan sauna",
    location: "Kiikala · Silvantie 2",
    description: {
      fi: "Salon kaupungin saunallinen uimaranta, jossa järjestetään myös talviuintia. Ajantasaiset vuorot ja maksut kannattaa tarkistaa kaupungin ja järjestäjien sivuilta.",
      en: "A City of Salo swimming beach with a sauna and winter swimming. Check current sessions and fees with the city and local organisers.",
      es: "Playa municipal de Salo con sauna y baño invernal. Consulta los turnos y precios actuales con el ayuntamiento y los organizadores."
    },
    access: { fi: "Yleinen sauna · talviuintivuoroja", en: "Public sauna · winter swimming sessions", es: "Sauna pública · turnos de baño invernal" },
    type: { fi: "Saunallinen uimaranta", en: "Swimming beach with sauna", es: "Playa con sauna" },
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
    imageCredit: "Kospo75 · CC BY-SA 3.0 · kuvituskuva",
    source: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/"
  },
  {
    name: "Kokkilan uimarannan sauna",
    location: "Angelniemi · Kokkilantie 880",
    description: {
      fi: "Kokkilan saunarakennuksen uusiminen vaikuttaa käyttöön kaudella 2026–2027. Tarkista kaupungilta, milloin sauna avataan uudelleen.",
      en: "Reconstruction of the Kokkila sauna building affects access during the 2026–2027 season. Check with the city for reopening information.",
      es: "La renovación del edificio de sauna de Kokkila afecta al acceso durante la temporada 2026–2027. Consulta al ayuntamiento cuándo volverá a abrir."
    },
    access: { fi: "Huomio: saunarakennus poissa käytöstä rakennustöiden vuoksi", en: "Notice: sauna building unavailable during construction", es: "Aviso: sauna cerrada durante las obras" },
    type: { fi: "Saunallinen uimaranta · tilapäinen käyttökatko", en: "Swimming beach with sauna · temporary closure", es: "Playa con sauna · cierre temporal" },
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Nummij%C3%A4rven-saunarakennus-web-1366x768.jpg",
    imageCredit: "Visit Salo / Salon kaupunki · kuvituskuva",
    source: "https://kohteet.visitsalo.fi/kokkilan-uimaranta/",
    booking: "https://salo.fi/vapaa-aika-ja-matkailu/liikunta/ulkoliikuntapaikat/uimarannat/",
    status: { fi: "Käyttökatko / rakennustyöt", en: "Unavailable during construction", es: "No disponible durante las obras" }
  }
];

const labels: Record<Locale, {
  eyebrow: string; title: string; intro: string; visit: string; source: string; booking: string;
  rental: string; public: string; beach: string; disclaimer: string;
}> = {
  fi: {
    eyebrow: "SALON SEUDUN SAUNAT", title: "Yleisösaunat, vuokrasaunat ja saunalliset uimapaikat",
    intro: "Aloita Salon seudulta: varattavia rantasaunoja, yleisiä saunavuoroja, talviuintipaikkoja ja saunallisia uimarantoja. Jokainen kortti vie alkuperäiseen lähteeseen tai suoraan varaukseen.",
    visit: "Kohteen tiedot", source: "Kohteen kuva", booking: "Varaa / kysy", rental: "Vuokrasauna", public: "Yleisösauna", beach: "Saunallinen uimapaikka",
    disclaimer: "Kuvat ovat palveluntarjoajien tai Visit Salon kohdesivuilla julkaistuja kuvia, ellei kuvan yhteydessä mainita erikseen kuvituskuvaa. Hinnat, vuorot ja saatavuus voivat muuttua. Kokkilan saunarakennus on ollut rakennustöiden vuoksi poissa käytöstä; tarkista tilanne kaupungilta."
  },
  en: {
    eyebrow: "SAUNAS AROUND SALO", title: "Public saunas, rental saunas and swimming spots with saunas",
    intro: "Start in the Salo region: bookable lakeside saunas, public sauna sessions, winter-swimming locations and swimming beaches with saunas. Each card links to the original source or booking page.",
    visit: "Destination details", source: "Photo source", booking: "Book / enquire", rental: "Rental sauna", public: "Public sauna", beach: "Swimming spot with sauna",
    disclaimer: "Images are published by providers or on Visit Salo destination pages unless explicitly labelled illustrative. Prices, sessions and availability can change. Kokkila's sauna building has been unavailable due to construction; confirm its status with the city."
  },
  es: {
    eyebrow: "SAUNAS DE LA REGIÓN DE SALO", title: "Saunas públicas, de alquiler y zonas de baño con sauna",
    intro: "Empieza en la región de Salo: saunas junto al lago para reservar, turnos públicos, lugares para baño invernal y playas con sauna. Cada ficha enlaza a la fuente original o a la página de reserva.",
    visit: "Información del lugar", source: "Fuente de la foto", booking: "Reservar / consultar", rental: "Sauna de alquiler", public: "Sauna pública", beach: "Zona de baño con sauna",
    disclaimer: "Las imágenes proceden de proveedores o de páginas de Visit Salo, salvo las marcadas como ilustrativas. Los precios, turnos y disponibilidad pueden cambiar. La sauna de Kokkila ha estado cerrada por obras; confirma su estado con el ayuntamiento."
  }
};

export function FeaturedSaunas({ locale }: { locale: Locale }) {
  const x = labels[locale];
  return (
    <div className="container-narrow">
      <div className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-brand-600">{x.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">{x.title}</h2>
        <p className="mt-5 text-lg leading-8 text-slate-700">{x.intro}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {places.map((place) => {
          const isRental = place.type.fi.includes("Vuokrasauna") || place.type.fi.includes("vuokrasauna");
          const isBeach = place.type.fi.includes("uimaranta") || place.type.fi.includes("uimapaikka");
          const kind = isRental ? x.rental : isBeach ? x.beach : x.public;
          return (
            <article key={place.name} className="group overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white shadow-soft">
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${place.image}")` }} role="img" aria-label={`${place.name} – ${place.location}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-brand-950">{kind}</span>
                <div className="absolute bottom-0 p-5 text-white sm:p-6">
                  <h3 className="font-display text-2xl font-bold leading-tight">{place.name}</h3>
                  <p className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-white/85"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{place.location}</p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="leading-7 text-slate-700">{place.description[locale]}</p>
                <p className="mt-4 text-sm font-semibold text-brand-800">{place.access[locale]}</p>
                {place.capacity ? <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><Users className="h-3.5 w-3.5" />{place.capacity}</p> : null}
                {place.status ? <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">{place.status[locale]}</p> : null}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {place.booking ? <a href={place.booking} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">{x.booking}<ArrowUpRight className="h-4 w-4" /></a> : null}
                  <a href={place.source} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-800 underline underline-offset-4">{x.visit}<ArrowUpRight className="inline h-3.5 w-3.5" /></a>
                </div>
                <a href={place.imageCredit.includes("CC BY") ? place.source : place.source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[11px] text-slate-500 underline underline-offset-2">{x.source}: {place.imageCredit}</a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-7 max-w-4xl text-xs leading-6 text-slate-500">{x.disclaimer}</p>
    </div>
  );
}
