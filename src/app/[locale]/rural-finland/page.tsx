import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Sparkles, Utensils } from "lucide-react";
import { photoLibrary } from "@/lib/photo-library";
import { localizedUrl } from "@/lib/seo";
import type { Locale } from "@/types";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const copy = locale === "es"
    ? {
        title: "Turismo rural y cabañas en Finlandia | Finland Experience",
        description: "Descubre cabañas, saunas tradicionales, archipiélago, Teijo, Mathildedal, gastronomía local y experiencias auténticas en el sur de Finlandia.",
      }
    : locale === "en"
      ? {
          title: "Rural Finland, Cottages & Archipelago | Finland Experience",
          description: "Discover private cottages, traditional smoke saunas, the Turku Archipelago, Teijo National Park, Mathildedal and local food in Southern Finland.",
        }
      : {
          title: "Maaseutumatkailu, mökit ja saaristo | Finland Experience",
          description: "Löydä mökit, savusaunat, saaristo, Teijo, Mathildedal, lähiruoka ja aidot paikalliset elämykset Etelä-Suomessa.",
        };

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: localizedUrl(locale, "rural-finland") },
  };
}

export default function RuralFinlandPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isEs = locale === "es";
  const isEn = locale === "en";

  const t = isEs
    ? {
        eyebrow: "Turismo rural y cabañas en Finlandia",
        title: "La Finlandia que se vive despacio",
        intro: "Cabañas junto al agua, saunas de humo, islas, bosques, pueblos históricos y comida local. Una guía para viajeros que buscan privacidad, naturaleza y auténtica vida finlandesa.",
        reserve: "Descubre y reserva directamente",
        how: "Cómo funciona",
        steps: ["Inspírate y elige la zona", "Visita la web del proveedor", "Reserva y paga directamente con él"],
        events: "Otoño y Navidad 2026",
        eventsText: "Kurpitsaviikot en Salo, Ghost Village y los mercados navideños de Mathildedal convierten la temporada en un motivo para alargar la estancia.",
        ctaEvents: "Ver eventos",
      }
    : isEn
      ? {
          eyebrow: "Rural Finland, cottages & authentic experiences",
          title: "The Finland you experience slowly",
          intro: "Private cottages, smoke saunas, islands, forests, historic villages and local food – for travellers looking for privacy, nature and real Finnish life.",
          reserve: "Discover and book direct",
          how: "How it works",
          steps: ["Get inspired and choose an area", "Visit the provider's own website", "Book and pay directly with the provider"],
          events: "Autumn & Christmas 2026",
          eventsText: "Pumpkin Weeks in Salo, Ghost Village and Mathildedal's Christmas Markets make the season a reason to stay longer.",
          ctaEvents: "See events",
        }
      : {
          eyebrow: "Maaseutumatkailu, mökit ja aidot elämykset",
          title: "Suomi, jonka kokee hitaasti",
          intro: "Oma mökki veden äärellä, savusauna, saaristo, metsät, historialliset ruukkikylät ja lähiruoka – matkalle, jossa yksityisyys ja paikallinen elämä ovat osa ylellisyyttä.",
          reserve: "Löydä ja siirry suoraan palveluntarjoajalle",
          how: "Näin sivusto toimii",
          steps: ["Inspiroidu ja valitse alue", "Siirry palveluntarjoajan omalle sivulle", "Varaa ja maksa suoraan palveluntarjoajalle"],
          events: "Syksy ja joulu 2026",
          eventsText: "Salon Kurpitsaviikot, Mathildedalin Kummituskylä ja joulumarkkinat tekevät loppuvuodesta oman matkansa.",
          ctaEvents: "Katso tapahtumat",
        };

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t.title,
    description: t.intro,
    touristType: isEs ? "Spanish travellers" : "International slow travellers",
    itinerary: ["Salo", "Mathildedal", "Teijo National Park", "Naantali", "Turku Archipelago", "Kemiönsaari", "Parainen"],
  };

  const providers = [
    { name: "Herrankukkaro", place: "Rymättylä · Naantali", image: photoLibrary.herrankukkaroSauna, href: "https://www.herrankukkaro.fi/", text: isEs ? "Sauna de humo, alojamiento y mar." : isEn ? "Smoke sauna, accommodation and sea." : "Savusauna, majoitus ja meri." },
    { name: "Storfinnhova Gård", place: "Kemiönsaari", image: photoLibrary.storfinnhova, href: "https://www.storfinnhova.com/", text: isEs ? "Sauna subterránea de granito y glamping." : isEn ? "Underground granite smoke sauna and glamping." : "Maanalainen graniittisavusauna ja glamping." },
    { name: "Björkholm", place: "Parainen", image: photoLibrary.bjorkholm, href: "https://bjorkholm.johku.com/", text: isEs ? "Cabañas con sauna, barcos y kayak." : isEn ? "Sauna cottages, boats and kayaking." : "Saunamökit, veneet ja melonta." },
    { name: "Natura Viva", place: "Teijo · Mathildedal", image: photoLibrary.naturaVivaTeijo, href: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", text: isEs ? "Kayak, canoa, SUP y bicicleta." : isEn ? "Kayak, canoe, SUP and cycling." : "Kajakki, kanootti, SUP ja pyöräily." },
    { name: "TuuSeikkailee", place: "Oripää · Auranmaa", image: photoLibrary.teijoNationalPark, href: "https://tuuseikkailee.fi/", text: isEs ? "Naturaleza, experiencias y bienestar." : isEn ? "Nature, experience and wellbeing." : "Luonto-, elämys- ja hyvinvointipalvelut." },
  ];

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
        <Image src={photoLibrary.mathildedalHarbour} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/20" />
        <div className="container-narrow relative">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl">{t.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">{t.intro}</p>
          <Link href={"/" + locale + "/destinations"} className="btn-gold mt-8 inline-flex">{t.reserve} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            [Sparkles, isEs ? "Sauna tradicional y bienestar" : isEn ? "Traditional sauna & wellbeing" : "Savusauna ja hyvinvointi", isEs ? "Saunas de humo, agua y descanso." : isEn ? "Smoke sauna, water and a slower rhythm." : "Savusauna, vesi ja rauhallinen suomalainen rytmi."],
            [Compass, isEs ? "Naturaleza, kayak y bicicleta" : isEn ? "Nature, kayaking & cycling" : "Luonto, melonta ja pyöräily", isEs ? "Teijo, islas, senderos, kayak y bicicleta." : isEn ? "Teijo, islands, trails, kayaking and cycling." : "Teijo, saaret, reitit, melonta ja pyöräily."],
            [Utensils, isEs ? "Gastronomía local y temporada" : isEn ? "Local food & seasonal life" : "Lähiruoka ja vuodenaika", isEs ? "Pescado, pan de archipiélago, bayas y pequeños productores." : isEn ? "Fish, archipelago bread, berries and small local producers." : "Kala, saaristolaisleipä, marjat ja pienet paikalliset tuottajat."],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Sparkles;
            return <article key={title as string} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7"><I className="h-7 w-7 text-brand-700" /><h2 className="mt-6 font-display text-2xl font-bold text-brand-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>;
          })}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{t.how}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950">{t.reserve}</h2>
            <div className="mt-7 space-y-4">
              {t.steps.map((step) => <div key={step} className="flex gap-3 rounded-2xl bg-white p-4 shadow-soft"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" /><span className="text-sm font-semibold text-slate-700">{step}</span></div>)}
            </div>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem]"><Image src={photoLibrary.archipelagoFerry} alt="" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">Turun saaristo</p><p className="mt-2 max-w-xl font-display text-3xl font-bold">{isEs ? "El ferry también forma parte de la experiencia." : isEn ? "The ferry is part of the experience." : "Lossi on osa saaristokokemusta."}</p></div></div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{isEs ? "Proveedores locales" : isEn ? "Local providers" : "Paikalliset palveluntarjoajat"}</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{isEs ? "De la inspiración al proveedor local" : isEn ? "From inspiration to the local provider" : "Inspiraatiosta suoraan palveluntarjoajalle"}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {providers.map((provider) => <article key={provider.name} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft"><div className="relative aspect-[4/3]"><Image src={provider.image} alt={provider.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-terracotta">{provider.place}</p><h3 className="mt-2 font-display text-xl font-bold text-brand-950">{provider.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{provider.text}</p><a href={provider.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{isEs ? "Ir al proveedor" : isEn ? "Visit provider" : "Siirry palveluntarjoajalle"} <ArrowUpRight className="h-4 w-4" /></a></div></article>)}
        </div>
      </section>

      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="container-narrow grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{t.events}</p><h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{t.events}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{t.eventsText}</p><Link href={"/" + locale + "/events"} className="btn-gold mt-7 inline-flex">{t.ctaEvents} <ArrowUpRight className="h-4 w-4" /></Link></div>
          <Image src={photoLibrary.mathildedalChristmas} alt="" width={1200} height={800} className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
        </div>
      </section>

      <section className="container-narrow py-14 text-sm leading-7 text-slate-600 sm:py-20">
        <p>{isEs ? "cabañas exclusivas con sauna en Finlandia · alquiler de cabañas junto al lago · casas tradicionales del archipiélago finlandés · sauna de humo tradicional · retiro de bienestar y naturaleza · kayak en el Parque Nacional de Teijo · ciclismo por el archipiélago · gastronomía local · eventos de otoño y Navidad" : isEn ? "Private cottages with sauna · lakeside accommodation · traditional archipelago cabins · smoke sauna · nature retreats · Teijo kayaking · archipelago cycling · local food · seasonal events" : "Saunamökit · järvi- ja merenrantamajoitus · saariston mökit · savusaunat · luontoretket · Teijon melonta · saaristopyöräily · lähiruoka · syksyn ja joulun tapahtumat"}</p>
      </section>
    </main>
  );
}
