'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Check, Compass, Mail, MapPin, Search, Sparkles, Waves, Snowflake, TreePine } from 'lucide-react';

type Language = 'fi' | 'es' | 'en';

const content = {
  fi: {
    nav: ['Etusivu', 'Kohteet', 'Elämykset', 'Blogi', 'Ota yhteyttä'],
    heroTitle: 'Koe Suomen taika – elämyksiä pohjoisesta etelään.',
    heroText: 'Suomi Experience yhdistää Lapin, järvien, kaupunkien ja saariston parhaat elämykset yhdeksi helposti varattavaksi kokonaisuudeksi.',
    primary: 'Tutustu elämyksiin',
    secondary: 'Katso suosituimmat kohteet',
    highlight: 'Suomi kolmessa elämyksessä',
    highlights: ['Revontulet ja arktinen Lappi', 'Saunat, järvet ja metsät', 'Helsinki, Turku ja saaristo'],
    destinationsTitle: 'Kohteet Suomessa',
    destinationsIntro: 'Valitse matkaasi sopiva alue – Lappi, järvi-Suomi, kaupunkikulttuuri tai saaristo.',
    searchTitle: 'Etsi kohteita',
    searchPlaceholder: 'Kirjoita kohteen nimi tai teema',
    destinations: [
      ['Lappi – Inari ja Rovaniemi', 'Aitoa Lappia, arktista luontoa, revontulia, poroja ja saamelaiskulttuuria.', 'inari'],
      ['Tampere – järvien ja saunojen kaupunki', 'Järviä, saunoja, Tammerkoski ja elämyksellinen kaupunkikulttuuri.', 'tampere'],
      ['Helsinki – portti Suomeen', 'Pohjoismaista designia, merta, arkkitehtuuria ja saaristoa.', 'helsinki'],
      ['Turku – historia ja saaristo', 'Suomen vanhin kaupunki, Aurajoki, linna ja ainutlaatuinen saaristo.', 'turku'],
    ] as const,
    experiencesTitle: 'Elämykset ja aktiviteetit',
    experiencesIntro: 'Valitse valmis elämys tai rakennetaan yhdessä juuri sinun matkasi. Kaikki kokemukset voidaan sovittaa vuodenaikaan ja matkan pituuteen.',
    experiences: [
      ['Revontulet', 'Opastettu retki Lapin yöhön parhaisiin revontulipaikkoihin.', Snowflake],
      ['Sauna & järvi', 'Perinteinen suomalainen sauna järven rannalla ja mahdollisuus pulahtaa veteen.', Waves],
      ['Husky-ajelu', 'Talvinen huskysafari, jossa arktinen luonto ja hiljaisuus ovat pääosassa.', TreePine],
      ['Design-kierros Helsingissä', 'Tutustu suomalaiseen muotoiluun, arkkitehtuuriin ja kahvilakulttuuriin.', Compass],
    ] as const,
    blogTitle: 'Blogi ja tarinat Suomesta',
    blogIntro: 'Inspiraatiota, käytännön vinkkejä ja tarinoita, joiden avulla suunnittelet paremman Suomen-matkan.',
    blog: [['Ensimmäinen talvi Suomessa', 'Miten pukeutua, liikkua ja nauttia Suomen talvesta?'], ['Saunakulttuuri selitettynä', 'Miksi sauna on niin tärkeä osa suomalaista elämäntapaa?']],
    contactTitle: 'Suunnitellaan sinun Suomen-matkasi',
    contactIntro: 'Kerro meille, millaista matkaa suunnittelet. Autamme löytämään oikeat kohteet, elämykset ja reitin.',
    name: 'Nimi', email: 'Sähköposti', message: 'Viesti', submit: 'Lähetä matkapyyntö',
    aiTitle: 'Tekoäly matkaneuvontaan', aiText: 'Kysy esimerkiksi: Missä näen revontulet? Miten yhdistän Helsingin ja Lapin? Mikä saunaelämys sopii minulle?',
    footer: 'Suomi Experience – suomalaiset elämykset kansainvälisille matkailijoille.',
  },
  es: {
    nav: ['Inicio', 'Destinos', 'Experiencias', 'Blog', 'Contacto'],
    heroTitle: 'Descubre la magia de Finlandia.',
    heroText: 'Suomi Experience reúne lo mejor de Laponia, los lagos, las ciudades y el archipiélago en una experiencia de viaje fácil de descubrir y reservar.',
    primary: 'Ver experiencias', secondary: 'Destinos populares', highlight: 'Finlandia en tres experiencias',
    highlights: ['Auroras boreales y Laponia ártica', 'Saunas, lagos y bosques', 'Helsinki, Turku y archipiélago'],
    destinationsTitle: 'Destinos en Finlandia', destinationsIntro: 'Elige la región ideal para tu viaje: Laponia, zona de lagos, cultura urbana o archipiélago.', searchTitle: 'Buscar destinos', searchPlaceholder: 'Escribe un destino o tema',
    destinations: [['Laponia – Inari y Rovaniemi', 'Naturaleza ártica, auroras, renos y cultura sami en la Laponia más auténtica.', 'inari'], ['Tampere – ciudad de lagos y saunas', 'Lagos, saunas, Tammerkoski y una vibrante cultura urbana.', 'tampere'], ['Helsinki – puerta de entrada a Finlandia', 'Diseño nórdico, mar, arquitectura y archipiélago.', 'helsinki'], ['Turku – historia y archipiélago', 'La ciudad más antigua de Finlandia, el río Aura y el archipiélago.', 'turku']],
    experiencesTitle: 'Experiencias y actividades', experiencesIntro: 'Elige una experiencia preparada o diseñemos juntos tu viaje. Adaptamos las experiencias a la temporada y duración de tu estancia.',
    experiences: [['Auroras boreales', 'Excursión guiada a los mejores lugares de Laponia para ver las auroras.', Snowflake], ['Sauna y lago', 'Sauna tradicional finlandesa junto al lago con posibilidad de bañarse.', Waves], ['Safari en husky', 'Una aventura invernal en husky para descubrir la naturaleza ártica.', TreePine], ['Ruta de diseño en Helsinki', 'Diseño finlandés, arquitectura y cultura de cafés en Helsinki.', Compass]],
    blogTitle: 'Blog y historias de Finlandia', blogIntro: 'Inspiración, consejos prácticos e historias para ayudarte a planificar un viaje inolvidable.', blog: [['Tu primer invierno en Finlandia', 'Cómo vestirse, moverse y disfrutar del invierno finlandés.'], ['La cultura de la sauna explicada', 'Por qué la sauna es una parte tan importante de la vida finlandesa.']],
    contactTitle: 'Diseñemos tu viaje a Finlandia', contactIntro: 'Cuéntanos qué tipo de viaje estás planeando. Te ayudaremos a encontrar los destinos, experiencias y ruta adecuados.', name: 'Nombre', email: 'Correo electrónico', message: 'Mensaje', submit: 'Enviar solicitud de viaje',
    aiTitle: 'IA para asesoría de viaje', aiText: 'Pregunta, por ejemplo: ¿Dónde puedo ver auroras? ¿Cómo combino Helsinki y Laponia? ¿Qué experiencia de sauna me conviene?', footer: 'Suomi Experience – experiencias finlandesas para viajeros internacionales.',
  },
  en: {
    nav: ['Home', 'Destinations', 'Experiences', 'Blog', 'Contact'], heroTitle: 'Experience the magic of Finland.', heroText: 'Suomi Experience brings together the best of Lapland, lakes, cities and archipelago in one easy-to-discover travel experience.', primary: 'Explore experiences', secondary: 'View popular destinations', highlight: 'Finland in three experiences', highlights: ['Northern Lights and Arctic Lapland', 'Saunas, lakes and forests', 'Helsinki, Turku and archipelago'], destinationsTitle: 'Destinations in Finland', destinationsIntro: 'Choose the region that fits your trip: Lapland, the lake district, urban culture or the archipelago.', searchTitle: 'Search destinations', searchPlaceholder: 'Type a destination or theme', destinations: [['Lapland – Inari and Rovaniemi', 'Arctic nature, Northern Lights, reindeer and Sámi culture.', 'inari'], ['Tampere – city of lakes and saunas', 'Lakes, saunas, Tammerkoski and vibrant city culture.', 'tampere'], ['Helsinki – gateway to Finland', 'Nordic design, sea, architecture and archipelago.', 'helsinki'], ['Turku – history and archipelago', 'Finland’s oldest city, the Aura River and the archipelago.', 'turku']], experiencesTitle: 'Experiences and activities', experiencesIntro: 'Choose a ready-made experience or let us design your trip together. Experiences can be adapted to the season and length of your stay.', experiences: [['Northern Lights', 'A guided journey into the Lapland night to find the best aurora conditions.', Snowflake], ['Sauna & lake', 'Traditional Finnish sauna by the lake with an opportunity for a refreshing swim.', Waves], ['Husky safari', 'A winter husky adventure through Arctic nature and silence.', TreePine], ['Helsinki design walk', 'Finnish design, architecture and café culture in Helsinki.', Compass]], blogTitle: 'Blog and stories from Finland', blogIntro: 'Inspiration, practical tips and stories to help you plan an unforgettable Finnish journey.', blog: [['Your first winter in Finland', 'How to dress, get around and enjoy the Finnish winter.'], ['Sauna culture explained', 'Why sauna is such an important part of Finnish life.']], contactTitle: 'Let’s plan your Finland journey', contactIntro: 'Tell us what kind of trip you are planning. We will help you find the right destinations, experiences and route.', name: 'Name', email: 'Email', message: 'Message', submit: 'Send travel request', aiTitle: 'AI travel advisor', aiText: 'Ask for example: Where can I see the Northern Lights? How do I combine Helsinki and Lapland? Which sauna experience is right for me?', footer: 'Suomi Experience – authentic Finnish experiences for international travellers.',
  },
} as const;

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('fi');
  const [search, setSearch] = useState('');
  const t = content[language];
  const query = search.trim().toLowerCase();
  const destinations = t.destinations.filter(([title, description]) => `${title} ${description}`.toLowerCase().includes(query));

  return (
    <main className="bg-slate-50 text-slate-900">
      <section id="home" className="relative overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(32,201,151,0.28),transparent_34%),linear-gradient(120deg,rgba(7,26,43,0.98),rgba(7,26,43,0.72))]" />
        <div className="container-site relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85"><Sparkles className="h-4 w-4 text-emerald-300" /> Finland · curated journeys</div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">{t.heroText}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/experiencias" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 font-bold text-midnight shadow-xl transition hover:bg-emerald-300">{t.primary}<ArrowRight className="h-4 w-4" /></Link>
              <a href="#destinations" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur hover:bg-white/15">{t.secondary}</a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Suomi Experience</p>
            <h2 className="mt-3 text-2xl font-bold">{t.highlight}</h2>
            <div className="mt-6 space-y-4">{t.highlights.map((item, index) => <div key={item} className="flex items-start gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-emerald-300">{index + 1}</span><span className="leading-6 text-white/80">{item}</span></div>)}</div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center"><div><div className="text-xl font-bold">4+</div><div className="text-xs text-white/50">regions</div></div><div><div className="text-xl font-bold">100%</div><div className="text-xs text-white/50">Finland</div></div><div><div className="text-xl font-bold">3</div><div className="text-xs text-white/50">languages</div></div></div>
          </div>
        </div>
      </section>

      <section id="destinations" className="container-site py-16 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Finland</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-midnight sm:text-4xl">{t.destinationsTitle}</h2><p className="mt-3 text-slate-600">{t.destinationsIntro}</p></div><div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:w-80"><Search className="h-5 w-5 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-transparent text-sm outline-none" aria-label={t.searchTitle} /></div></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{destinations.map(([title, description, slug]) => <Link href={`/destinos/${slug}`} key={slug} className="group"><article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"><div className="relative h-44 overflow-hidden bg-slate-200"><img src={slug === 'inari' ? 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85' : slug === 'tampere' ? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85' : slug === 'helsinki' ? 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=85' : 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=85'} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent" /><span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-midnight"><MapPin className="mr-1 inline h-3 w-3" /> Finland</span></div><div className="p-5"><h3 className="text-xl font-bold text-midnight group-hover:text-emerald-700">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">{language === 'fi' ? 'Tutustu' : language === 'es' ? 'Explorar' : 'Explore'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div></article></Link>)}</div>
        {destinations.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{language === 'fi' ? 'Kohteita ei löytynyt.' : language === 'es' ? 'No encontramos destinos.' : 'No destinations found.'}</div>}
      </section>

      <section id="experiences" className="bg-white py-16 sm:py-20"><div className="container-site"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Experiences</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-midnight sm:text-4xl">{t.experiencesTitle}</h2><p className="mt-3 text-slate-600">{t.experiencesIntro}</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{t.experiences.map(([title, description, Icon]) => <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-card"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight text-emerald-300"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-xl font-bold text-midnight">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>

      <section id="blog" className="container-site py-16 sm:py-20"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Journal</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-midnight sm:text-4xl">{t.blogTitle}</h2><p className="mt-3 text-slate-600">{t.blogIntro}</p></div><div className="mt-10 grid gap-6 md:grid-cols-2">{t.blog.map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Finland Experience</p><h3 className="mt-3 text-2xl font-bold text-midnight">{title}</h3><p className="mt-3 leading-7 text-slate-600">{description}</p><button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">{language === 'fi' ? 'Lue lisää' : language === 'es' ? 'Leer más' : 'Read more'} <ArrowRight className="h-4 w-4" /></button></article>)}</div></section>

      <section id="contact" className="bg-midnight py-16 text-white sm:py-20"><div className="container-site grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">Contact</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.contactTitle}</h2><p className="mt-4 max-w-xl leading-7 text-white/65">{t.contactIntro}</p><div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-start gap-3"><Bot className="mt-1 h-5 w-5 text-emerald-300" /><div><h3 className="font-bold">{t.aiTitle}</h3><p className="mt-2 text-sm leading-6 text-white/60">{t.aiText}</p></div></div></div></div><form className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8" onSubmit={(e) => e.preventDefault()}><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">{t.name}<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500" /></label><label className="text-sm font-semibold text-slate-700">{t.email}<input type="email" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500" /></label></div><label className="mt-5 block text-sm font-semibold text-slate-700">{t.message}<textarea rows={5} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500" /></label><button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-midnight px-5 py-3.5 font-bold text-white hover:bg-slate-800"><Mail className="h-4 w-4" />{t.submit}</button></form></div></section>

      <section className="border-t border-slate-200 bg-white py-5"><div className="container-site flex flex-wrap items-center justify-center gap-2 sm:justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Check className="h-4 w-4 text-emerald-600" />{t.footer}</div><div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-400">Language</span>{(['fi', 'es', 'en'] as const).map((lang) => <button key={lang} type="button" onClick={() => setLanguage(lang)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${language === lang ? 'bg-midnight text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{lang === 'fi' ? 'Suomi' : lang === 'es' ? 'Español' : 'English'}</button>)}</div></div></section>
    </main>
  );
}
