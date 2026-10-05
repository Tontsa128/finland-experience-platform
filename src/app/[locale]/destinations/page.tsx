import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { destinations as fallbackDestinations, getLocalized } from "@/lib/data";
import { getPublishedDestinations } from "@/lib/public-content";
import type { Locale } from "@/types";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { canonicalDestinationSlug } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const copy = locale === "fi"
    ? { title: "Kesäkohteet Suomessa | Finland Experience", description: "Löydä saaristo, Mathildedal, Teijo, Naantali, Turku ja muut aidot suomalaiset matkakohteet." }
    : locale === "es"
      ? { title: "Destinos de verano en Finlandia | Finland Experience", description: "Descubre el archipiélago, Mathildedal, Teijo, Naantali, Turku y otros destinos auténticos." }
      : { title: "Summer Destinations in Finland | Finland Experience", description: "Discover the archipelago, Mathildedal, Teijo, Naantali, Turku and other authentic Finnish destinations." };
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: "destinations" });
}

export default async function DestinationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsDestinations = await getPublishedDestinations();
  const destinations = cmsDestinations.length ? cmsDestinations : fallbackDestinations;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "fi" ? "Kesäkohteet Suomessa" : locale === "es" ? "Destinos de verano en Finlandia" : "Summer destinations in Finland",
    itemListElement: destinations.map((destination, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getLocalized(destination.name, locale),
      url: "/" + locale + "/destinations/" + canonicalDestinationSlug(destination.slug),
    })),
  };

  const copy = locale === "fi"
    ? { eyebrow:"Suomi, jonka haluat kokea", title:"Valitse maisema, johon haluat herätä.", intro:"Järven hiljaisuus, saariston valo, merenrantakaupungit ja pienet kylät. Löydä paikka, jossa lomasi alkaa tuntua jo ennen kuin saavut.", explore:"Katso kohde", stays:"Löydä majoitus", story:"Jokaisella paikalla on oma rytminsä." }
    : locale === "es"
      ? { eyebrow:"La Finlandia que quieres vivir", title:"Elige el paisaje junto al que quieres despertar.", intro:"Lagos silenciosos, luz del archipiélago, ciudades junto al mar y pequeños pueblos. Encuentra el lugar donde tus vacaciones empiezan antes de llegar.", explore:"Ver destino", stays:"Encontrar alojamiento", story:"Cada lugar tiene su propio ritmo." }
      : { eyebrow:"The Finland you want to feel", title:"Choose the landscape you want to wake up in.", intro:"Quiet lakes, archipelago light, seaside towns and tiny villages. Find the place where your holiday begins before you arrive.", explore:"Explore destination", stays:"Find a place to stay", story:"Every place has its own rhythm." };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(214,169,72,.2),transparent_30%)]" />
        <div className="container-narrow relative py-16 sm:py-24 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.98] sm:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">{copy.intro}</p>
          <Link href={`/${locale}/accommodations`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 transition hover:-translate-y-0.5">
            {copy.stays}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Finland · Summer</p><h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.story}</h2></div>
          <Sparkles className="hidden h-8 w-8 text-gold-500 sm:block" />
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {destinations.length ? destinations.map((destination, index) => (
            <Link key={destination.id} href={`/${locale}/destinations/${canonicalDestinationSlug(destination.slug)}`} className={`group overflow-hidden rounded-[2rem] bg-brand-50 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-card ${index === 0 ? "lg:col-span-2" : ""}`}>
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                {destination.images[0] ? <Image src={destination.images[0]} alt={getLocalized(destination.name, locale)} fill sizes={index===0 ? "(max-width:1024px) 100vw, 66vw" : "(max-width:1024px) 50vw, 33vw"} className="object-cover transition duration-700 group-hover:scale-105"/> : <div className="flex h-full items-center justify-center">{destination.region}</div>}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-white/70"><MapPin className="h-3.5 w-3.5"/>{destination.region}</div>
                  <h2 className="mt-2 font-display text-3xl font-bold">{getLocalized(destination.name, locale)}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">{getLocalized(destination.shortDescription, locale)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-300">{copy.explore}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span>
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
              {locale === "fi" ? "Kohteita ei ole tällä hetkellä julkaistu." : locale === "es" ? "No hay destinos publicados en este momento." : "No destinations are published at the moment."}
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">{locale === "fi" ? "Alueoppaat" : locale === "es" ? "Guías regionales" : "Regional guides"}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Aloita kohteesta, syvennä alueella." : locale === "es" ? "Empieza por un destino y descubre toda la región." : "Start with a destination, then explore the region."}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{locale === "fi" ? "Näissä oppaissa kokoamme paikallista tietoa, majoitusta, ruokaa, luontoa ja elämyksiä yhteen. Mahdolliset varaukset tehdään aina suoraan palveluntarjoajalle." : locale === "es" ? "Estas guías reúnen información local, alojamiento, gastronomía, naturaleza y experiencias. Las reservas se realizan siempre directamente con cada proveedor." : "These guides bring together local information, stays, food, nature and experiences. Any booking is always handled directly with the provider."}</p>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Salo", "salo", photoLibrary.mathildedalHarbour, "Mathildedal · Salo", locale === "fi" ? "Mathildedal, Teijo, Särkisalo, Perniö ja kaupungin palvelut." : locale === "es" ? "Mathildedal, Teijo, Särkisalo, Perniö y servicios de Salo." : "Mathildedal, Teijo, Särkisalo, Perniö and Salo services."],
              ["Turku", "turku", photoLibrary.turkuAura, "Turku · Aurajoki", locale === "fi" ? "Aurajoki, Ruissalo, kulttuuri, ruoka ja Turun saaristo." : locale === "es" ? "Río Aura, Ruissalo, cultura, gastronomía y archipiélago." : "Aura River, Ruissalo, culture, food and the Turku Archipelago."],
              ["Naantali", "naantali", photoLibrary.naantaliOldTown, "Naantali · vanhakaupunki", locale === "fi" ? "Vanhakaupunki, satama, Muumimaailma ja pieni saaristoreitti." : locale === "es" ? "Casco antiguo, puerto, Moominworld y la Small Archipelago Trail." : "Old Town, harbour, Moominworld and the Small Archipelago Trail."],
              ["Hanko", "hanko", photoLibrary.hanko, "Hanko · eteläkärki", locale === "fi" ? "Rannat, avomeri, pyöräily, saunat ja merielämykset." : locale === "es" ? "Playas, mar abierto, ciclismo, saunas y experiencias marinas." : "Beaches, open sea, cycling, saunas and sea experiences."],
              ["Kemiönsaari & Rosala", "kimitoon", photoLibrary.rosalaVikingCentre, "Rosala · Kemiönsaari", locale === "fi" ? "Viikinkikeskus, Kasnäs, Bengtskär, mökit ja Saaristomeri." : locale === "es" ? "Centro Vikingo, Kasnäs, Bengtskär, cabañas y archipiélago." : "Viking Centre, Kasnäs, Bengtskär, cottages and the Archipelago Sea."],
              ["Åland", "aland", photoLibrary.aland, "Åland · saaristo", locale === "fi" ? "Pyöräily, saaristoreitti, mökit, ruoka ja pienet saaret." : locale === "es" ? "Ciclismo, rutas, cabañas, gastronomía y pequeñas islas." : "Cycling, island routes, cottages, food and small islands."],
              ["Porvoo", "porvoo", photoLibrary.porvoo, "Porvoo · vanhakaupunki", locale === "fi" ? "Vanha Porvoo, jokiranta, ruoka, kulttuuri ja saariston läheisyys." : locale === "es" ? "Casco antiguo, río, gastronomía, cultura y archipiélago." : "Old Town, riverside life, food, culture and nearby archipelago."],
              [locale === "fi" ? "Kaakkois-Suomi" : locale === "es" ? "Sureste de Finlandia" : "Southeast Finland", "southeast-finland", photoLibrary.hamina, "Hamina · Itäinen Suomenlahti", locale === "fi" ? "Kotka, Hamina, Loviisa, Strömfors, Valkmusa ja Itäisen Suomenlahden saaristo." : locale === "es" ? "Kotka, Hamina, Loviisa, Strömfors, Valkmusa y el archipiélago del Golfo de Finlandia." : "Kotka, Hamina, Loviisa, Strömfors, Valkmusa and the Eastern Gulf of Finland archipelago."],
            ].map(([name, href, image, location, description]) => (
              <Link key={href} href={"/" + locale + "/" + href} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
                  <Image src={image} alt={name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[.16em] text-white/75">{location}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white">{name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-slate-600">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa opas" : locale === "es" ? "Abrir guía" : "Open guide"}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>       </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-narrow overflow-hidden rounded-[2rem] bg-brand-950 p-8 text-white sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">Luxury & Authentic Finland</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {locale === "fi" ? "Sauna, saaristo, lähiruoka ja uniikit yöpymiset." : locale === "es" ? "Sauna, archipiélago, gastronomía local y estancias únicas." : "Sauna, archipelago, local food and unique stays."}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
            {locale === "fi" ? "Kuratoitu hakemisto Salon, Naantalin, Turun saariston ja Etelä-Suomen elämyksistä. Varaat jokaisen kohteen itse suoraan palveluntarjoajalta." : locale === "es" ? "Un directorio curado de experiencias en Salo, Naantali, el archipiélago de Turku y el sur de Finlandia. Reservas directamente con cada proveedor." : "A curated directory of experiences in Salo, Naantali, the Turku archipelago and Southern Finland. Book directly with each provider."}
          </p>
          <Link href={`/${locale}/luxury-finland`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
            {locale === "fi" ? "Avaa Luxury & Authentic Finland" : locale === "es" ? "Abrir Luxury & Authentic Finland" : "Open Luxury & Authentic Finland"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Slow down · Stay longer</p><h2 className="mt-4 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.story}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{copy.intro}</p></div>
          <Link href={`/${locale}/accommodations`} className="group relative min-h-[280px] overflow-hidden rounded-[2rem] bg-brand-950 p-8 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-950"/>
            <div className="relative flex h-full flex-col justify-between"><MapPin className="h-8 w-8 text-gold-300"/><div><p className="font-display text-3xl font-bold">{copy.stays}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gold-300">{copy.explore}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span></div></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
