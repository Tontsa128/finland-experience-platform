import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Camera, Coffee, Flame, Ship, Sparkles, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const c = {
  fi: {
    title: "Naantali – vanhakaupunki, meri ja saariston kesä",
    description: "Naantali-opas: vanhakaupunki, satama, Kultaranta, Muumimaailma, saaristoreitit, ruoka, majoitus ja merelliset elämykset.",
    eyebrow: "NAANTALI · AURINKOINEN SAARISTOKAUPUNKI",
    intro: "Naantali yhdistää historiallisen puukaupungin, vilkkaan vierassataman, Kultarannan puutarhat, Muumimaailman ja saariston. Kaupunki toimii sekä helppona viikonloppukohteena että lähtöpisteenä saaristopäivään.",
    oldTown: "Vanhakaupunki & satama",
    oldTownText: "Kapeat kadut, vanhat puutalot, kahvilat, ravintolat, museot ja pienet putiikit tekevät vanhastakaupungista paikan, jossa kannattaa viipyä eikä vain käydä.",
    kultaranta: "Kultaranta",
    kultarantaText: "Kultarannan puutarha on yksi Naantalin tunnetuista nähtävyyksistä. Puutarhan kierroksilla historia, kesäasuminen ja tarkkaan suunnitellut istutukset kohtaavat.",
    moomin: "Muumimaailma",
    moominText: "Kailon saarella sijaitseva Muumimaailma on Naantalin vahva perhekohde. Päivään voi yhdistää vanhankaupungin, rannan ja sataman.",
    archipelago: "Saariston pieni rengasreitti",
    archipelagoText: "Pieni saaristoreitti on noin 120 km kokonaisuus, jonka voi ajaa autolla 1–2 päivässä tai pyöräillä 2–3 päivässä. Reitillä on kolme vesiyhteyttä.",
    stay: "Majoitus",
    stayText: "Valittavana on hotelleja, kylpylä, vanhankaupungin majoituksia, saaristomökkejä, lomakeskuksia ja leirintäalueita. Herrankukkaro ja Kultaranta Resort tuovat saaristoon erilaiset majoitustyylit.",
    food: "Ruoka & kahvilat",
    foodText: "Naantalin ravintolavalikoima kulkee sataman terasseista vanhankaupungin ravintoloihin ja saariston kylien ruokapaikkoihin. Reitillä voi pysähtyä esimerkiksi Rymättylässä tai Röölässä.",
    sauna: "Sauna & hyvinvointi",
    saunaText: "Naantali yhdistää kylpylän, saariston saunat ja meren läheisyyden. Herrankukkaro tuo Rymättylään savusauna- ja saaristokokemuksen, ja Naantalin Spa tarjoaa kaupunkimaisemman vaihtoehdon.",
    explore: "Tutustu Visit Naantaliin",
    direct: "Suoria kohdelinkkejä",
    directText: "Nämä ovat inspiraatio- ja jatkopolkuja. Varaus, maksu ja lopullinen sopimus tehdään suoraan palveluntarjoajan kanssa.",
    coastal: "Takaisin Rannikon Suomi -oppaaseen",
  },
  es: {
    title: "Naantali – casco antiguo, mar y verano en el archipiélago",
    description: "Guía de Naantali: casco antiguo, puerto, Kultaranta, Moominworld, rutas del archipiélago, gastronomía, alojamiento y sauna.",
    eyebrow: "NAANTALI · CIUDAD DEL ARCHIPIÉLAGO",
    intro: "Naantali combina casas de madera, puerto, jardines de Kultaranta, Moominworld y el archipiélago. Funciona tanto para una escapada de fin de semana como para empezar un día entre islas.",
    oldTown: "Casco antiguo y puerto",
    oldTownText: "Calles estrechas, casas de madera, cafés, restaurantes, museos y boutiques hacen que el casco antiguo merezca tiempo y no solo una visita rápida.",
    kultaranta: "Kultaranta",
    kultarantaText: "Los jardines de Kultaranta son una de las visitas más conocidas de Naantali. Los recorridos combinan historia, vida de verano y jardines cuidadosamente diseñados.",
    moomin: "Moominworld",
    moominText: "Moominworld, en la isla de Kailo, es una de las grandes atracciones familiares de Naantali. Puedes combinarlo con el casco antiguo, la playa y el puerto.",
    archipelago: "La Small Archipelago Trail",
    archipelagoText: "La ruta corta del archipiélago tiene unos 120 km; se puede recorrer en coche en 1–2 días o en bicicleta en 2–3 días, con tres cruces por agua.",
    stay: "Alojamiento",
    stayText: "Hay hoteles, spa, alojamientos en el casco antiguo, cabañas, resorts y camping. Herrankukkaro y Kultaranta Resort ofrecen dos maneras muy diferentes de vivir el archipiélago.",
    food: "Gastronomía y cafés",
    foodText: "La oferta va desde terrazas del puerto hasta restaurantes del casco antiguo y pueblos del archipiélago. En la ruta puedes parar en Rymättylä o Röölä.",
    sauna: "Sauna y bienestar",
    saunaText: "Naantali combina spa, saunas del archipiélago y el mar. Herrankukkaro aporta sauna de humo y ambiente insular, mientras Naantali Spa ofrece una experiencia más urbana.",
    explore: "Descubre Visit Naantali",
    direct: "Enlaces directos",
    directText: "Son ideas y rutas de continuación. Las reservas, pagos y contratos se realizan directamente con cada proveedor.",
    coastal: "Volver a la guía de Finlandia costera",
  },
  en: {
    title: "Naantali – Old Town, sea and an archipelago summer",
    description: "Naantali guide: Old Town, harbour, Kultaranta, Moominworld, archipelago routes, food, accommodation and sauna.",
    eyebrow: "NAANTALI · SUNNY ARCHIPELAGO TOWN",
    intro: "Naantali brings together historic wooden streets, a lively guest harbour, Kultaranta gardens, Moominworld and the archipelago. It works equally well for a weekend break or an island day.",
    oldTown: "Old Town & harbour",
    oldTownText: "Narrow streets, wooden houses, cafés, restaurants, museums and boutiques make the Old Town a place to linger rather than simply tick off.",
    kultaranta: "Kultaranta",
    kultarantaText: "Kultaranta gardens are one of Naantali's best-known sights. Guided visits bring together history, summer residence traditions and formal gardens.",
    moomin: "Moominworld",
    moominText: "Moominworld on Kailo Island is one of Naantali's major family attractions. Combine it with the Old Town, beach and harbour.",
    archipelago: "The Small Archipelago Trail",
    archipelagoText: "The short archipelago route is around 120 km. Allow 1–2 days by car or 2–3 by bike, with three water crossings.",
    stay: "Accommodation",
    stayText: "Choose from hotels, spa stays, Old Town accommodation, cottages, resorts and camping. Herrankukkaro and Kultaranta Resort offer contrasting archipelago experiences.",
    food: "Food & cafés",
    foodText: "The scene runs from harbour terraces to Old Town restaurants and island-village dining. The route also opens easy stops in Rymättylä and Röölä.",
    sauna: "Sauna & wellbeing",
    saunaText: "Naantali combines spa culture, archipelago saunas and the sea. Herrankukkaro adds smoke sauna and island atmosphere, while Naantali Spa offers a more urban wellness experience.",
    explore: "Explore Visit Naantali",
    direct: "Direct onward links",
    directText: "These are inspiration and onward paths. Bookings, payments and final contracts take place directly with each provider.",
    coastal: "Back to the Coastal Finland guide",
  },
} as const;

const providers = [
  { name: { fi: "Herrankukkaro", es: "Herrankukkaro", en: "Herrankukkaro" }, text: { fi: "Saaristokylä, savusaunat, majoitus ja paikalliset maut Rymättylässä.", es: "Pueblo del archipiélago, saunas de humo, alojamiento y sabores locales en Rymättylä.", en: "An archipelago village with smoke saunas, accommodation and local food in Rymättylä." }, url: "https://www.herrankukkaro.fi/" },
  { name: { fi: "Kultaranta Resort", es: "Kultaranta Resort", en: "Kultaranta Resort" }, text: { fi: "Majoitus, ravintola ja saariston palveluja Naantalissa.", es: "Alojamiento, restaurante y servicios del archipiélago en Naantali.", en: "Accommodation, restaurant and archipelago services in Naantali." }, url: "https://kultarantaresort.fi/" },
  { name: { fi: "Naantali Camping", es: "Naantali Camping", en: "Naantali Camping" }, text: { fi: "Merenrantamajoitusta lähellä keskustaa, mökkejä ja telttapaikkoja.", es: "Camping junto al mar cerca del centro, con cabañas y parcelas.", en: "Seaside camping close to the centre with cottages and pitches." }, url: "https://www.naantalicamping.fi/" },
  { name: { fi: "Muumimaailma", es: "Moominworld", en: "Moominworld" }, text: { fi: "Kailon saaren kesäkohde, jossa Muumien maailma muuttuu elämykseksi.", es: "Atracción familiar de verano en la isla de Kailo.", en: "A family summer attraction on Kailo Island." }, url: "https://www.moominworld.fi/" },
  { name: { fi: "Naantali Spa", es: "Naantali Spa", en: "Naantali Spa" }, text: { fi: "Kylpylä, ravintolat ja hyvinvointipalvelut meren äärellä.", es: "Spa, restaurantes y bienestar junto al mar.", en: "Spa, restaurants and wellness by the sea." }, url: "https://www.naantalispa.fi/" },
  { name: { fi: "Röölänranta", es: "Röölänranta", en: "Röölänranta" }, text: { fi: "Saaristokylän ravintola- ja vierasvenesatamamiljöö Rymättylän suunnalla.", es: "Restaurante y ambiente portuario de un pueblo del archipiélago.", en: "Village restaurant and harbour atmosphere in the archipelago." }, url: "https://ravintolaroola.fi/" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = c[locale] || c.en;
  return buildLocalizedMetadata({ locale, title: t.title, description: t.description, path: "naantali", image: photoLibrary.naantaliOldTown });
}

export default async function NaantaliPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = c[locale] || c.en;
  const cards = [
    { icon: Camera, title: t.oldTown, text: t.oldTownText },
    { icon: Sparkles, title: t.kultaranta, text: t.kultarantaText },
    { icon: Waves, title: t.moomin, text: t.moominText },
    { icon: Ship, title: t.archipelago, text: t.archipelagoText },
  ];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.naantaliOldTown} alt={locale === "fi" ? "Naantalin vanhakaupunki" : locale === "es" ? "Casco antiguo de Naantali" : "Naantali Old Town"} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10" />
        <div className="container-narrow relative py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl lg:text-8xl">{t.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-9">{t.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://visitnaantali.com/en/see-and-experience/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{t.explore}<ArrowUpRight className="h-4 w-4" /></a>
            <Link href={`/${locale}/coastal-finland#naantali`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white">{t.coastal}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
              <Icon className="h-7 w-7 text-brand-700" />
              <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <BedDouble className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{t.stay}</h2>
            <p className="mt-4 leading-8 text-slate-700">{t.stayText}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <Coffee className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{t.food}</h2>
            <p className="mt-4 leading-8 text-slate-700">{t.foodText}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <Flame className="h-7 w-7 text-amber-500" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{t.sauna}</h2>
            <p className="mt-4 leading-8 text-slate-700">{t.saunaText}</p>
          </article>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{t.direct}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{t.direct}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{t.directText}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <a key={provider.name.en} href={provider.url} target="_blank" rel="noopener noreferrer" className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <h3 className="font-display text-2xl font-bold text-brand-950">{provider.name[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{provider.text[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">{locale === "fi" ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit provider"}<ArrowUpRight className="h-3.5 w-3.5" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
        <Image src={photoLibrary.turkuArchipelagoHouse} alt="" fill sizes="100vw" className="absolute inset-0 -z-20 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-brand-950/80" />
        <div className="container-narrow grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{t.archipelago}</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{t.archipelago}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{t.archipelagoText}</p>
          </div>
          <a href="https://visitnaantali.com/en/see-and-experience/archipelago/the-small-archipelago-trail/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
            {locale === "fi" ? "Katso reitti ja yhteydet" : locale === "es" ? "Ver ruta y conexiones" : "View route & connections"}<ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
