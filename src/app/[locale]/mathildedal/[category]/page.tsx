import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BedDouble, Coffee, Compass, Flame, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

type Copy = { title: string; description: string; intro: string; eyebrow: string; back: string; openProvider: string; note: string; addressLabel: string; emptyNote: string };
type Item = { name: string; description: Record<Locale, string>; url: string; image: string; address?: string; seasonal?: boolean };

const copy: Record<Locale, Record<string, Copy>> = {
  fi: {
    majoitus: { title: "Majoitus ja mökit Mathildedalissa", description: "Mathildedalin hotellit, mökkikylät, lomahuoneistot ja luontomajoitus – siirry varaamaan suoraan majoittajalta.", intro: "Tutustu Mathildedalin kylän ja aivan lähialueen majoituksiin. Tarkista saatavuus, hinnat, varustelu ja ehdot aina majoittajan omalta sivulta.", eyebrow: "Yövy Mathildedalissa", back: "Takaisin Mathildedaliin", openProvider: "Majoittajan sivuille", note: "Finnexprience esittelee vaihtoehdot. Varaus, maksu ja sopimus tehdään suoraan majoittajan kanssa.", addressLabel: "Osoite", emptyNote: "Aukioloajat, hinnat ja saatavuus voivat muuttua sesongin mukaan." },
    ruoka: { title: "Ruoka ja juoma Mathildedalissa", description: "Mathildedalin ravintolat, kahvilat, leipomot ja paikalliset ruokapaikat – valitse paikka ja siirry sen omille sivuille.", intro: "Kahvilat, ravintolat, satamaterassit ja kausittaiset ruokapaikat kuuluvat Mathildedalin kyläpäivään. Tarkista aukioloajat ja menu suoraan toimijalta.", eyebrow: "Paikalliset maut", back: "Takaisin Mathildedaliin", openProvider: "Ravintolan sivuille", note: "Listaus perustuu kohteen viralliseen matkailuoppaaseen. Sesonkipaikat voivat olla suljettuina osan vuodesta.", addressLabel: "Osoite", emptyNote: "Tarkista päivän aukiolo ja pöytävaraus suoraan ravintolasta." },
    aktiviteetit: { title: "Aktiviteetit ja luonto Mathildedalissa", description: "Tutustu Mathildedalin ja Teijon alueen retkeilyyn, melontaan, golfiin ja ulkoiluun.", intro: "Valitse rauhallinen kyläkävely, päivä Teijon kansallispuistossa tai aktiivinen retki vesille. Tarkista reittien olosuhteet ja palveluiden kausitiedot ennen lähtöä.", eyebrow: "Liiku ja tutki", back: "Takaisin Mathildedaliin", openProvider: "Tutustu palveluun", note: "Aktiviteettien saatavuus ja varauskäytännöt vaihtelevat palveluntarjoajan ja vuodenajan mukaan.", addressLabel: "Sijainti", emptyNote: "Varmista varusteet, reitit ja sääolosuhteet ennen retkeä." },
    elamykset: { title: "Sauna ja paikalliset elämykset", description: "Sauna, satama, ruukkikylän historia ja paikalliset elämykset Mathildedalissa.", intro: "Mathildedalissa yhdistyvät historiallinen ruukkimiljöö, meren läheisyys, sauna ja paikallisten tekijöiden pienet elämykset. Ota yhteyttä järjestäjään ja sovi yksityiskohdat suoraan.", eyebrow: "Koe kylän tunnelma", back: "Takaisin Mathildedaliin", openProvider: "Järjestäjän sivuille", note: "Elämykset eivät ole Finnexpriencen myymiä paketteja. Palvelut sovitaan ja maksetaan suoraan järjestäjälle.", addressLabel: "Sijainti", emptyNote: "Varmista toteutuminen ja varaus suoraan järjestäjältä." },
  },
  es: {
    majoitus: { title: "Alojamiento y cabañas en Mathildedal", description: "Hoteles, cabañas y alojamientos de Mathildedal; reserva directamente con cada proveedor.", intro: "Descubre alojamientos en el pueblo y sus alrededores. Comprueba disponibilidad, precios, equipamiento y condiciones en la web oficial de cada proveedor.", eyebrow: "Dormir en Mathildedal", back: "Volver a Mathildedal", openProvider: "Web del alojamiento", note: "Finnexprience presenta opciones; la reserva, el pago y el contrato se gestionan directamente con el alojamiento.", addressLabel: "Dirección", emptyNote: "Los precios y la disponibilidad pueden variar según la temporada." },
    ruoka: { title: "Restaurantes y cafés de Mathildedal", description: "Restaurantes, cafés y locales gastronómicos de Mathildedal con enlaces directos.", intro: "Cafés, restaurantes, terrazas junto al puerto y propuestas de temporada forman parte de la visita. Consulta horarios y menú directamente con cada establecimiento.", eyebrow: "Sabores locales", back: "Volver a Mathildedal", openProvider: "Web del establecimiento", note: "La lista se basa en la guía turística oficial del destino. Algunos locales son estacionales.", addressLabel: "Dirección", emptyNote: "Confirma los horarios y las reservas directamente con el establecimiento." },
    aktiviteetit: { title: "Actividades y naturaleza en Mathildedal", description: "Senderismo, kayak, golf y actividades al aire libre en Mathildedal y Teijo.", intro: "Elige un paseo por el pueblo, una jornada en el Parque Nacional de Teijo o una salida activa al agua. Comprueba las condiciones y la temporada antes de salir.", eyebrow: "Explora y disfruta", back: "Volver a Mathildedal", openProvider: "Ver actividad", note: "La disponibilidad y las reservas dependen del proveedor y de la temporada.", addressLabel: "Lugar", emptyNote: "Comprueba el equipo, las rutas y el tiempo antes de salir." },
    elamykset: { title: "Sauna y experiencias locales", description: "Sauna, puerto, historia industrial y experiencias locales en Mathildedal.", intro: "Mathildedal combina patrimonio industrial, mar, sauna y experiencias de pequeños negocios locales. Contacta directamente con los organizadores para concretar los detalles.", eyebrow: "Vive el ambiente local", back: "Volver a Mathildedal", openProvider: "Web del organizador", note: "Finnexprience no vende paquetes turísticos. Los servicios se acuerdan y pagan directamente al proveedor.", addressLabel: "Lugar", emptyNote: "Confirma la disponibilidad directamente con el organizador." },
  },
  en: {
    majoitus: { title: "Accommodation and cottages in Mathildedal", description: "Hotels, cottages and holiday stays in Mathildedal with direct links to accommodation providers.", intro: "Explore places to stay in the village and nearby. Check availability, prices, facilities and terms directly on each provider's website.", eyebrow: "Stay in Mathildedal", back: "Back to Mathildedal", openProvider: "Visit accommodation website", note: "Finnexprience introduces the options; booking, payment and the contract remain directly between guest and provider.", addressLabel: "Address", emptyNote: "Prices and availability can change with the season." },
    ruoka: { title: "Food and drink in Mathildedal", description: "Restaurants, cafés, bakeries and food spots in Mathildedal with direct links.", intro: "Cafés, restaurants, harbour terraces and seasonal food spots are part of a day in Mathildedal. Check opening hours and menus directly with each business.", eyebrow: "Local flavours", back: "Back to Mathildedal", openProvider: "Visit business website", note: "This directory is based on the destination's official tourism guide. Some venues operate seasonally.", addressLabel: "Address", emptyNote: "Confirm opening times and reservations directly with the venue." },
    aktiviteetit: { title: "Activities and nature in Mathildedal", description: "Hiking, kayaking, golf and outdoor activities around Mathildedal and Teijo.", intro: "Choose a relaxed village walk, a day in Teijo National Park or an active trip on the water. Check trail conditions and seasonal services before setting out.", eyebrow: "Explore outdoors", back: "Back to Mathildedal", openProvider: "Explore activity", note: "Availability and booking arrangements depend on the provider and season.", addressLabel: "Location", emptyNote: "Check equipment, trail conditions and weather before your trip." },
    elamykset: { title: "Sauna and local experiences", description: "Sauna, harbour life, ironworks history and local experiences in Mathildedal.", intro: "Mathildedal brings together ironworks heritage, the sea, sauna and experiences offered by local makers. Contact organisers directly to arrange details.", eyebrow: "Experience local life", back: "Back to Mathildedal", openProvider: "Visit organiser website", note: "Finnexprience does not sell combined travel packages. Services are agreed and paid for directly with each provider.", addressLabel: "Location", emptyNote: "Confirm availability directly with the organiser." },
  },
};

const stays: Item[] = [
  { name: "Hotel Mathildedal", description: { fi: "Boutique-hotelli historiallisessa ruukkimiljöössä; aamiainen sisältyy majoitukseen.", es: "Hotel boutique en un entorno histórico; el desayuno está incluido.", en: "Boutique hotel in the historic ironworks setting; breakfast is included." }, url: "https://mathildedal.fi/majoitus/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/mathildedal_131-copylowres.jpg?itok=blmtNtmc", address: "Ruukinrannantie 6, Mathildedal" },
  { name: "Mathildan Marina", description: { fi: "Satamahotellin huoneita, matkaparkki sekä sauna- ja ravintolapalveluja.", es: "Habitaciones junto al puerto, área para autocaravanas, sauna y restaurante.", en: "Harbour hotel rooms, motorhome pitches, sauna and restaurant." }, url: "https://mathildanmarina.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/Huone%205%20talvi%200001.jpg?itok=6ElNUZ3H", address: "Ruukinrannantie 4, Mathildedal" },
  { name: "Matilda Villas", description: { fi: "Ympärivuotisia hyvin varusteltuja mökkejä, oma sauna ja terassi.", es: "Cabañas equipadas para todo el año, con sauna privada y terraza.", en: "Well-equipped year-round cottages with private sauna and terrace." }, url: "https://matildavillas.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/Matilda%20Villas_10%20kopio.jpg?itok=fPv5YeEK", address: "Karvarinkulma, Mathildedal" },
  { name: "Matri House", description: { fi: "Yksilöllinen boutique-majoitus kylän sydämessä, puutarha ja yhteiset tilat.", es: "Alojamiento boutique en el centro del pueblo, con jardín y espacios comunes.", en: "Individual boutique rooms in the village centre, with a garden and shared spaces." }, url: "https://matrihouse.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/matrihouse_mathildedal_web.jpg?itok=hgOKNF9U", address: "Matildan Puistotie 6, Mathildedal" },
  { name: "Meri-Ruukin lomakylä", description: { fi: "Loma-asuntoja, rantasauna, laituri ja grillialue lähellä kansallispuistoa.", es: "Apartamentos vacacionales, sauna junto al mar, muelle y zona de barbacoa.", en: "Holiday apartments, seaside sauna, pier and barbecue area near the national park." }, url: "https://meri-ruukki.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/oleskelutila.jpg?itok=hIXkNyVI", address: "Kiikunmäentie 28, Mathildedal" },
  { name: "Majoitus Mathildedal", description: { fi: "Erillinen vuokramökki Mathildedalissa; tarkista varustelu, vapaat päivät ja ehdot majoittajan sivulta.", es: "Casa de alquiler en Mathildedal; consulta equipamiento, fechas disponibles y condiciones en la web del anfitrión.", en: "A privately rented holiday cottage in Mathildedal; check facilities, availability and terms on the host website." }, url: "https://www.majoitusmathildedal.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/oleskelutila.jpg?itok=hIXkNyVI", address: "Mathildedal" },
  { name: "Natura Viva – Teijo", description: { fi: "Luontomajoitusta ja retkeilyyn sopivia yöpymisvaihtoehtoja Teijon alueella.", es: "Alojamiento en la naturaleza y opciones para senderistas en la zona de Teijo.", en: "Nature stays and accommodation options for hikers around Teijo." }, url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, address: "Matildajärventie 84, Mathildedal" },
];

const food: Item[] = [
  { name: "Bistro Bruket", description: { fi: "Bistro, à la carte, lounas ja kesäkauden terassi meren tuntumassa.", es: "Bistró, carta, almuerzos y terraza de verano cerca del mar.", en: "Bistro dining, à la carte, lunch and a summer terrace close to the sea." }, url: "https://bistrobruket.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/bruket_tila.jpg?itok=yL7mEIcZ", address: "Ruukinrannantie 6, Mathildedal" },
  { name: "Café Mathildedal", description: { fi: "Tuoreita leivonnaisia, kakkuja, suolaisia herkkuja ja pannukahvia.", es: "Bollería recién hecha, tartas, bocados salados y café de filtro.", en: "Fresh pastries, cakes, savoury treats and pot-brewed coffee." }, url: "https://mathildedal.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/123sv_vp23710.jpg?itok=urTug-um", address: "Ruukinrannantie 6, Mathildedal" },
  { name: "Kyläravintola Terho", description: { fi: "Pizzaa, paikallisia makuja, kahvia ja usein myös livemusiikkia.", es: "Pizza, sabores locales, café y música en directo en determinadas fechas.", en: "Pizza, local flavours, coffee and live music on selected dates." }, url: "https://ravintolaterho.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/visit-matilda_9-uai-1032x688.jpg?itok=fNisvaPC", address: "Matildan Puistotie 4, Mathildedal" },
  { name: "Mathildan Marina", description: { fi: "Satamaravintola ja terassi merimaisemissa; myös tapahtumia ja saunapalveluja.", es: "Restaurante y terraza junto al puerto, con eventos y sauna.", en: "Harbour restaurant and sea-view terrace, plus events and sauna." }, url: "https://mathildanmarina.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/terassi%20tyt%C3%B6t%20ruoka%206329.jpg?itok=KjXz8Y_x", address: "Ruukinrannantie 4, Mathildedal" },
  { name: "Mathildedalin Keskuspuisto", description: { fi: "Kausittainen street food, kahvila, virvokkeet ja jäätelö.", es: "Comida callejera de temporada, cafetería, bebidas y helados.", en: "Seasonal street food, café, refreshments and ice cream." }, url: "https://mathildedalinkeskuspuisto.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/janthai4.jpg?itok=37IiiOt1", address: "Mathildedal" },
  { name: "Meri-Teijo Golf Café-Pizzeria", description: { fi: "Kahvila ja kausittainen pizzeria golfkentän ja meren maisemissa.", es: "Café y pizzería de temporada con vistas al campo de golf y al mar.", en: "Café and seasonal pizzeria overlooking the golf course and sea." }, url: "https://meriteijogolf.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/golfpizzeria.jpg?itok=C5MEdxb9", address: "Länsitalantie 56, Teijo" },
  { name: "Metsäravintola", description: { fi: "Lähiruokaa ja leivonnaisia; ruokaretkiä myös tilauksesta.", es: "Productos locales y repostería; experiencias gastronómicas con reserva.", en: "Local food and baked goods, with food excursions by arrangement." }, url: "https://ravintolateijonarkki.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/metsaravintola.jpg?itok=C0O4bfsi", address: "Matildajärventie 84, Mathildedal" },
  { name: "Terho Hills", description: { fi: "Rinneravintola ja after ski Teijo Ski & Action Parkissa; kausiluonteinen.", es: "Restaurante de pistas y after-ski en Teijo Ski & Action Park; estacional.", en: "Slope-side food and après-ski at Teijo Ski & Action Park; seasonal." }, url: "https://terhohills.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/terhohills.jpeg?itok=2zEVsfuL", address: "Teijontie 345, Teijo", seasonal: true },
];

const activities: Item[] = [
  { name: "Teijon kansallispuisto", description: { fi: "Merkityt reitit, järvet, metsät ja rannikon luonto.", es: "Senderos señalizados, lagos, bosques y naturaleza costera.", en: "Marked trails, lakes, forests and coastal nature." }, url: "https://www.luontoon.fi/teijo", image: photoLibrary.teijoNationalPark, address: "Teijon kansallispuisto" },
  { name: "Natura Viva – välinevuokraus", description: { fi: "Tarkista melonnan, vesillä liikkumisen ja retkeilyn vuokrauspalvelut.", es: "Consulta el alquiler de equipo para kayak, actividades acuáticas y excursiones.", en: "Check equipment rental for kayaking, water activities and outdoor trips." }, url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, address: "Matildajärventie 84" },
  { name: "Meri-Teijo Golf", description: { fi: "Golfia ja merellisiä maisemia; tarkista peliajat ja palvelut suoraan kentältä.", es: "Golf y paisajes marinos; consulta horarios y servicios directamente.", en: "Golf and sea views; check tee times and services directly with the course." }, url: "https://meriteijogolf.com/", image: photoLibrary.turkuArchipelago, address: "Länsitalantie 56, Teijo" },
  { name: "Mathildan Marina", description: { fi: "Satama, tapahtumat ja aktiviteetteja vierailijoille; osa palveluista on kausittaisia.", es: "Puerto, eventos y actividades para visitantes; algunos servicios son estacionales.", en: "Harbour, events and visitor activities; some services are seasonal." }, url: "https://mathildanmarina.fi/", image: photoLibrary.mathildedalHarbour, address: "Ruukinrannantie 4" },
  { name: "Mathildedalin Keskuspuisto", description: { fi: "Kylän ulkoilu- ja pelipaikka sekä kausittainen kahvila.", es: "Espacio de juegos y actividades al aire libre, con cafetería estacional.", en: "Outdoor games and activity space with a seasonal café." }, url: "https://mathildedalinkeskuspuisto.fi/", image: photoLibrary.mathildedalVillage, address: "Mathildedal" },
];

const experiences: Item[] = [
  { name: "Mathildan Marina – sauna ja satama", description: { fi: "Sauna, poreallas- ja talvikauden palvelut sekä tunnelmallinen satamaympäristö; kysy saatavuus suoraan.", es: "Sauna, servicios de temporada fría y ambiente portuario; consulta disponibilidad.", en: "Sauna, cold-season services and a harbour setting; ask the provider about availability." }, url: "https://mathildanmarina.fi/", image: photoLibrary.sauna, address: "Ruukinrannantie 4" },
  { name: "Mathildedalin ruukkikylä", description: { fi: "Tutustu vanhoihin ruukkirakennuksiin, putiikkeihin, käsityöhön ja kylän historiaan.", es: "Descubre los edificios históricos, tiendas, artesanía e historia del pueblo.", en: "Explore historic ironworks buildings, small shops, crafts and village history." }, url: "https://visitmathildedal.fi/fi", image: photoLibrary.mathildedalVillage, address: "Mathildedalin kylä" },
  { name: "Visit Mathildedal – tapahtumat ja vierailu", description: { fi: "Tarkista ajankohtaiset tapahtumat, vierailuvinkit ja sesonkien palvelut.", es: "Consulta eventos, consejos para la visita y servicios de temporada.", en: "Check current events, visitor tips and seasonal services." }, url: "https://visitmathildedal.fi/fi", image: photoLibrary.mathildedalChristmas, address: "Mathildedal" },
  { name: "Teijon kansallispuisto – luontoelämys", description: { fi: "Yhdistä kyläkäyntiin retki metsään, järven rantaan tai merkitylle reitille.", es: "Combina la visita al pueblo con un paseo por el bosque, el lago o un sendero señalizado.", en: "Combine a village visit with a forest, lakeside or marked-trail walk." }, url: "https://www.luontoon.fi/teijo", image: photoLibrary.teijoNationalPark, address: "Teijon kansallispuisto" },
];

const data: Record<string, Item[]> = { majoitus: stays, ruoka: food, aktiviteetit: activities, elamykset: experiences };
const icons = { majoitus: BedDouble, ruoka: Coffee, aktiviteetit: Compass, elamykset: Flame };
const sectionLabels: Record<Locale, Record<string, string>> = {
  fi: { majoitus: "Majoitus", ruoka: "Ruoka ja juoma", aktiviteetit: "Aktiviteetit", elamykset: "Elämykset" },
  es: { majoitus: "Alojamiento", ruoka: "Gastronomía", aktiviteetit: "Actividades", elamykset: "Experiencias" },
  en: { majoitus: "Accommodation", ruoka: "Food & drink", aktiviteetit: "Activities", elamykset: "Experiences" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "en") as Locale;
  const c = copy[locale][category];
  if (!c) return {};
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: `mathildedal/${category}`, image: category === "majoitus" ? photoLibrary.mathildedalVillage : category === "ruoka" ? photoLibrary.mathildedalHarbour : category === "aktiviteetit" ? photoLibrary.teijoNationalPark : photoLibrary.sauna });
}

export default async function MathildedalCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "en") as Locale;
  const c = copy[locale][category];
  const items = data[category];
  if (!c || !items) notFound();
  const Icon = icons[category as keyof typeof icons];
  const hero = category === "majoitus" ? photoLibrary.mathildedalVillage : category === "ruoka" ? photoLibrary.mathildedalHarbour : category === "aktiviteetit" ? photoLibrary.teijoNationalPark : photoLibrary.sauna;
  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[48svh] overflow-hidden bg-brand-950 text-white">
        <Image src={hero} alt={c.title} fill priority unoptimized sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="container-narrow relative z-10 flex min-h-[48svh] items-end py-12 sm:py-16">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{c.eyebrow} · Mathildedal</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{c.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90">{c.intro}</p>
          </div>
        </div>
      </section>
      <section className="container-narrow py-12 sm:py-16">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">{items.length} {locale === "fi" ? "kohdetta" : locale === "es" ? "lugares" : "places"}</p><h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{sectionLabels[locale][category]}</h2></div>
          <Icon className="mt-1 h-8 w-8 shrink-0 text-brand-700" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.name} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft">
              <div className="relative aspect-[16/10] bg-brand-50"><Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover" /></div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold">{item.name}</h3>
                <p className="mt-3 min-h-[5rem] text-sm leading-6 text-slate-600">{item.description[locale]}</p>
                {item.address ? <p className="mt-3 flex gap-2 text-xs text-slate-500"><MapPin className="h-4 w-4 shrink-0" />{item.address}</p> : null}
                {item.seasonal ? <p className="mt-2 text-xs font-semibold text-amber-800">{locale === "fi" ? "Kausikohde – varmista aukiolo" : locale === "es" ? "Lugar estacional: confirma apertura" : "Seasonal venue — confirm opening"}</p> : null}
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-800">{c.openProvider}<ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-2xl bg-brand-50 p-5 text-sm leading-6 text-slate-600">{c.note} {c.emptyNote}</p>
      </section>
      <section className="border-t border-slate-100 bg-slate-50 py-8">
        <div className="container-narrow flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}/mathildedal`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-800"><ArrowLeft className="h-4 w-4" />{c.back}</Link>
          <a href="https://visitmathildedal.fi/fi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800">{locale === "fi" ? "Virallinen Visit Mathildedal -opas" : locale === "es" ? "Guía oficial de Visit Mathildedal" : "Official Visit Mathildedal guide"}<ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
