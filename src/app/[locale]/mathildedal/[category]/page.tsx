import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const categories = {
  majoitus: {
    fi: { title: "Majoitus Mathildedalissa", description: "Boutique-hotelleja, persoonallisia majataloja, huviloita ja mökkimajoitusta historiallisen ruukkikylän ja luonnon lähellä.", intro: "Valitse tukikohta, josta käsin voit tutustua ruukkikylään, Teijon kansallispuistoon ja lähialueen rantoihin." },
    en: { title: "Places to stay in Mathildedal", description: "Boutique hotels, characterful guesthouses, villas and cottages near the historic ironworks village and nature.", intro: "Choose a base for exploring the ironworks village, Teijo National Park and the nearby coast." },
    es: { title: "Alojamiento en Mathildedal", description: "Hoteles boutique, casas de huéspedes, villas y cabañas cerca del pueblo histórico y la naturaleza.", intro: "Elige un lugar desde el que descubrir el antiguo pueblo siderúrgico, el Parque Nacional de Teijo y la costa." },
    providers: [
      { name: "Hotel Mathildedal", url: "https://mathildedal.fi/", image: "https://cdn-datahub.visitfinland.com/images/67490c50-bc54-11ef-9fcc-d37cec752366.jpeg?s=1280", credit: "Visit Salo / Visit Finland DataHub" },
      { name: "Matri House", url: "https://matrihouse.fi/", image: "https://cdn-datahub.visitfinland.com/images/532d5770-1b9a-11f1-b3a4-6d11235fc921.jpeg?s=1280", credit: "Visit Salo / Visit Finland DataHub" },
      { name: "Mathildan Marina", url: "https://mathildanmarina.fi/", image: "https://cdn-datahub.visitfinland.com/images/e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280", credit: "Visit Salo / Visit Finland DataHub" },
      { name: "Matilda Villas", url: "https://matildavillas.fi/", image: photoLibrary.mathildedalHarbour, credit: "Finland Experience photo library" },
      { name: "Meri-Ruukki Holiday Village", url: "https://meri-ruukki.fi/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Teijo Nature Centre cabins and camping", url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, credit: "Natura Viva" },
    ],
  },
  ruoka: {
    fi: { title: "Ravintolat ja kahvilat Mathildedalissa", description: "Löydä Mathildedalin ravintolat, kahvilat, leipomot ja paikalliset maut.", intro: "Pysähdy kahville, tuoreelle leivonnaiselle tai pidemmälle aterialle. Aukiolot ja sesonkivalikoimat kannattaa tarkistaa ennen vierailua." },
    en: { title: "Restaurants and cafés in Mathildedal", description: "Discover restaurants, cafés, bakeries and local flavours in Mathildedal, Finland.", intro: "Stop for coffee and fresh pastries or settle in for a longer meal. Check opening hours and seasonal menus before visiting." },
    es: { title: "Restaurantes y cafeterías en Mathildedal", description: "Descubre restaurantes, cafeterías, panaderías y sabores locales en Mathildedal, Finlandia.", intro: "Haz una pausa para tomar café y probar repostería o disfruta de una comida tranquila. Comprueba los horarios y menús de temporada antes de ir." },
    providers: [
      { name: "Kyläravintola Terho", url: "https://www.ravintolaterho.fi/", image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kyl%C3%A4panimo-laatikko-web.jpg", credit: "Visit Salo" },
      { name: "Mathildan Marina Restaurant", url: "https://mathildanmarina.fi/ravintola/", image: "https://cdn-datahub.visitfinland.com/images/e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280", credit: "Mathildan Marina / Visit Salo DataHub" },
      { name: "Bistro Bruket", url: "https://mathildedal.fi/", image: photoLibrary.mathildedalChristmas, credit: "Visit Mathildedal" },
      { name: "Café Mathildedal", url: "https://mathildedal.fi/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Metsäravintola", url: "https://www.visitmathildedal.fi/fi/ravintolatjakahvilat", image: photoLibrary.naturaVivaTeijo, credit: "Visit Mathildedal" },
    ],
  },
  tekemista: {
    fi: { title: "Tekemistä ja elämyksiä Mathildedalissa", description: "Melontaa, pyöräilyä, patikointia, golfia, minigolfia, joogaa ja muita elämyksiä Mathildedalin ja Teijon alueella.", intro: "Yhdistä kyläkävely ja ulkoilu. Varmista vuokraus, opastukset, luvat ja kausikohtainen saatavuus suoraan palveluntarjoajalta." },
    en: { title: "Things to do in Mathildedal", description: "Kayaking, cycling, hiking, golf, adventure minigolf, yoga and outdoor experiences in Mathildedal and Teijo.", intro: "Combine a village stroll with time outdoors. Confirm rentals, guided activities, permits and seasonal availability with each provider." },
    es: { title: "Qué hacer en Mathildedal", description: "Kayak, ciclismo, senderismo, golf, minigolf, yoga y experiencias al aire libre en Mathildedal y Teijo.", intro: "Combina un paseo por el pueblo con actividades al aire libre. Confirma directamente los alquileres, las visitas guiadas, los permisos y la disponibilidad." },
    providers: [
      { name: "Teijo Nature Centre / Natura Viva", url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, credit: "Natura Viva" },
      { name: "Mathildedalin Keskuspuisto", url: "https://mathildedalinkeskuspuisto.fi/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Meri-Teijo Bike Park", url: "https://www.meriteijobikepark.com/", image: photoLibrary.teijoNationalPark, credit: "Finland Experience photo library" },
      { name: "Meri-Teijo Golf", url: "https://meriteijogolf.com/", image: photoLibrary.teijoNationalPark, credit: "Finland Experience photo library" },
      { name: "Yoga in Mathildedal", url: "https://visitmathildedal.fi/fi/aktiviteetit", image: photoLibrary.mathildedalHarbour, credit: "Visit Mathildedal" },
      { name: "Teijo National Park", url: "https://www.luontoon.fi/fi/kohteet/teijon-kansallispuisto", image: photoLibrary.teijoNationalPark, credit: "Finland Experience photo library" },
    ],
  },
  kulttuuri: {
    fi: { title: "Kulttuuri ja historia Mathildedalissa", description: "Tutustu Mathildedalin ruukin historiaan, kulttuurikohteisiin, kesäteatteriin ja kylän tarinoihin.", intro: "Mathildedalin historiallinen ruukkimiljöö on osa vierailua: kulje vanhojen rakennusten lomassa ja tarkista näyttelyiden ja esitysten ajankohtaiset tiedot." },
    en: { title: "Culture and heritage in Mathildedal", description: "Explore Mathildedal Ironworks, local heritage, summer theatre and stories from the historic village.", intro: "The historic ironworks setting is part of the experience. Wander among the old buildings and check current exhibition and performance details before your visit." },
    es: { title: "Cultura e historia en Mathildedal", description: "Descubre la antigua ferrería de Mathildedal, el patrimonio local, el teatro de verano y las historias del pueblo.", intro: "El entorno histórico forma parte de la experiencia. Pasea entre los edificios antiguos y consulta los horarios actuales de exposiciones y espectáculos." },
    providers: [
      { name: "Mathildedal Ironworks", url: "https://mathildedal.fi/en/things-to-do/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Mathildedal Summer Theatre / Teatteri ProVinssi", url: "https://www.teatteriprovinssi.fi/", image: photoLibrary.mathildedalHarbour, credit: "Finland Experience photo library" },
      { name: "Visit Mathildedal events", url: "https://visitmathildedal.fi/fi/tapahtumat", image: photoLibrary.mathildedalChristmas, credit: "Visit Mathildedal" },
    ],
  },
  ostokset: {
    fi: { title: "Putiikit, käsityöt ja design Mathildedalissa", description: "Löydä Mathildedalin pienet putiikit, paikalliset käsityöt, vaatteet, design ja lahjat.", intro: "Varaa aikaa putiikeille ja paikallisten tekijöiden tuotteille. Aukioloajat voivat vaihdella sesongin ja tapahtumien mukaan." },
    en: { title: "Shops, crafts and design in Mathildedal", description: "Discover independent shops, local crafts, clothing, design and gifts in Mathildedal.", intro: "Make time for independent shops and products by local makers. Opening hours may vary by season and events." },
    es: { title: "Tiendas, artesanía y diseño en Mathildedal", description: "Descubre pequeñas tiendas, artesanía local, ropa, diseño y regalos en Mathildedal.", intro: "Reserva tiempo para visitar las tiendas y descubrir productos de creadores locales. Los horarios pueden variar según la temporada y los eventos." },
    providers: [
      { name: "Ruukki Creative", url: "https://ruukkicreative.fi/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Ruukin Kehräämö", url: "https://ruukinkehraamo.fi/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Aate Clothing", url: "https://aateclothing.fi/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Visit Mathildedal shopping guide", url: "https://www.visitmathildedal.fi/fi/ostokset", image: photoLibrary.mathildedalVillage, credit: "Visit Mathildedal" },
    ],
  },
  tapahtumat: {
    fi: { title: "Tapahtumat Mathildedalissa", description: "Tarkista Mathildedalin tapahtumat, konsertit, esitykset ja kausiohjelma järjestäjien ajantasaisista lähteistä.", intro: "Mathildedalissa järjestetään vuoden mittaan erilaista ohjelmaa. Tapahtumapäivät, liput ja mahdolliset muutokset tarkistetaan aina järjestäjän omalta sivulta." },
    en: { title: "Events in Mathildedal", description: "Find event listings, concerts, performances and seasonal programmes in Mathildedal from official organisers.", intro: "Mathildedal hosts a changing programme throughout the year. Confirm dates, tickets and any changes on the organiser's own website." },
    es: { title: "Eventos en Mathildedal", description: "Consulta conciertos, espectáculos y actividades de temporada en Mathildedal a través de los organizadores oficiales.", intro: "Mathildedal ofrece actividades durante todo el año. Confirma las fechas, entradas y posibles cambios en la web del organizador." },
    providers: [
      { name: "Visit Mathildedal event calendar", url: "https://visitmathildedal.fi/fi/tapahtumat", image: photoLibrary.mathildedalChristmas, credit: "Visit Mathildedal" },
      { name: "Mathildedal Ironworks events", url: "https://mathildedal.fi/en/things-to-do/", image: photoLibrary.mathildedalVillage, credit: "Hotel Mathildedal" },
    ],
  },
} as const;

type CategorySlug = keyof typeof categories;

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!(rawCategory in categories)) return {};
  const category = categories[rawCategory as CategorySlug];
  const locale = (rawLocale in category ? rawLocale : "en") as Locale;
  const c = category[locale];
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "mathildedal/" + rawCategory, image: photoLibrary.mathildedalHarbour });
}

export default async function MathildedalCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!(rawCategory in categories)) notFound();
  const category = categories[rawCategory as CategorySlug];
  const locale = (rawLocale in category ? rawLocale : "en") as Locale;
  const c = category[locale];
  const back = locale === "fi" ? "Takaisin Mathildedalin oppaaseen" : locale === "es" ? "Volver a la guía de Mathildedal" : "Back to the Mathildedal guide";
  const visit = locale === "fi" ? "Palveluntarjoajan sivuille" : locale === "es" ? "Visitar la web del proveedor" : "Visit provider website";

  return (
    <main className="min-h-screen bg-white text-brand-950">
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.mathildedalHarbour} alt={c.title} fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 to-brand-950/25" />
        <div className="container-narrow relative py-20 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">Mathildedal · Salo · Finland</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{c.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">{c.intro}</p>
        </div>
      </section>
      <section className="container-narrow py-12 sm:py-16">
        <Link href={`/${locale}/mathildedal`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:underline"><ArrowLeft className="h-4 w-4" />{back}</Link>
        <p className="mt-7 max-w-3xl leading-8 text-slate-600">{c.description}</p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.providers.map((provider) => (
            <article key={provider.name} className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
              <div className="relative h-56 bg-brand-100">
                <Image src={provider.image} alt={provider.name + " Mathildedalissa"} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold">{provider.name}</h2>
                <p className="mt-2 text-xs text-slate-500">{locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de la imagen" : "Image source"}: {provider.credit}</p>
                <a href={provider.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:underline">{visit}<ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 rounded-2xl bg-brand-50 p-5 text-sm leading-7 text-slate-600">{locale === "fi" ? "Tiedot, kuvat ja saatavuus tarkistetaan palveluntarjoajien omista lähteistä. Varaus, maksu ja palvelusopimus tehdään suoraan palveluntarjoajan kanssa." : locale === "es" ? "Los datos, las imágenes y la disponibilidad deben comprobarse en las fuentes de cada proveedor. Las reservas, los pagos y los contratos se realizan directamente con el proveedor." : "Details, images and availability should be checked against each provider's own sources. Bookings, payments and service agreements are handled directly by the provider."}</p>
      </section>
    </main>
  );
}
