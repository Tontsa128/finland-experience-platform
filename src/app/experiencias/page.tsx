'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, MapPin, Search, Snowflake, Waves, TreePine } from 'lucide-react';
import { ExperienceService } from '@/services/experience';
import { DestinationService } from '@/services/destination';

type Language = 'fi' | 'es' | 'en';
interface ExperienceCard { id: number; titleEs: string; titleFi: string; shortDescriptionEs: string; shortDescriptionFi: string; }
interface DestinationCard { id: number; nameEs: string; nameFi: string; }

const copy = {
  fi: { title: 'Elämykset Suomessa', intro: 'Valitse elämyksesi Lapista, järvi-Suomesta ja Suomen kaupungeista. Suunnittelemme matkan, joka sopii juuri sinun toiveisiisi.', destinations: 'Kohteet', experiences: 'Suositut elämykset', search: 'Hae elämyksiä', empty: 'Elämyksiä ei löytynyt.', explore: 'Tutustu kohteeseen', lang: 'Español', cards: [['Revontulet', 'Opastettu retki Lapin yöhön ja parhaisiin revontulipaikkoihin.', Snowflake], ['Sauna & järvi', 'Aito suomalainen saunaelämys järven rannalla.', Waves], ['Husky-safari', 'Arktinen talviseikkailu huskyjen kanssa.', TreePine], ['Design Helsinki', 'Suomalaisen designin, arkkitehtuurin ja kahvilakulttuurin kierros.', Compass]] },
  es: { title: 'Experiencias en Finlandia', intro: 'Descubre experiencias seleccionadas en Laponia, la región de los lagos y las ciudades finlandesas. Diseñamos el viaje a tu medida.', destinations: 'Destinos', experiences: 'Experiencias populares', search: 'Buscar experiencias', empty: 'No encontramos experiencias.', explore: 'Explorar destino', lang: 'Suomi', cards: [['Auroras boreales', 'Excursión guiada a los mejores lugares de Laponia para ver auroras.', Snowflake], ['Sauna y lago', 'Una auténtica experiencia de sauna finlandesa junto al lago.', Waves], ['Safari en husky', 'Aventura invernal en la naturaleza ártica con huskies.', TreePine], ['Diseño en Helsinki', 'Ruta por el diseño, la arquitectura y la cultura de cafés de Helsinki.', Compass]] },
  en: { title: 'Experiences in Finland', intro: 'Discover selected experiences in Lapland, the lake district and Finnish cities. We can tailor the journey to your wishes.', destinations: 'Destinations', experiences: 'Popular experiences', search: 'Search experiences', empty: 'No experiences found.', explore: 'Explore destination', lang: 'Suomi', cards: [['Northern Lights', 'A guided journey to the best aurora locations in Lapland.', Snowflake], ['Sauna & lake', 'An authentic Finnish sauna experience by the lake.', Waves], ['Husky safari', 'A winter adventure through Arctic nature with huskies.', TreePine], ['Helsinki design', 'A walk through Finnish design, architecture and café culture.', Compass]] },
} as const;

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceCard[]>([]);
  const [destinations, setDestinations] = useState<DestinationCard[]>([]);
  const [language, setLanguage] = useState<Language>('fi');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const t = copy[language];

  useEffect(() => {
    let mounted = true;
    Promise.all([ExperienceService.getExperiences(true), DestinationService.getDestinations(true)])
      .then(([exps, dests]) => {
        if (!mounted) return;
        setExperiences(exps.map((exp) => {
          const es = exp.translations?.find((x) => x.languageCode === 'es');
          const fi = exp.translations?.find((x) => x.languageCode === 'fi');
          return { id: exp.id, titleEs: es?.title ?? '', titleFi: fi?.title ?? '', shortDescriptionEs: es?.shortDescription ?? '', shortDescriptionFi: fi?.shortDescription ?? '' };
        }));
        setDestinations(dests.map((dest) => {
          const es = dest.translations?.find((x) => x.languageCode === 'es');
          const fi = dest.translations?.find((x) => x.languageCode === 'fi');
          return { id: dest.id, nameEs: es?.name ?? '', nameFi: fi?.name ?? '' };
        }));
      })
      .catch((error) => console.error('Failed to load experiences:', error))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return experiences;
    return experiences.filter((x) => `${x.titleEs} ${x.titleFi} ${x.shortDescriptionEs} ${x.shortDescriptionFi}`.toLowerCase().includes(q));
  }, [experiences, search]);

  if (loading) return <main className="flex min-h-[70vh] items-center justify-center bg-slate-50"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" /><p className="mt-4 text-sm text-slate-500">Ladataan elämyksiä...</p></div></main>;

  return (
    <main className="bg-slate-50">
      <section className="bg-midnight py-16 text-white sm:py-20"><div className="container-site"><div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80"><Snowflake className="h-4 w-4 text-emerald-300" /> Finland · curated experiences</div><h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">{t.title}</h1><p className="mt-5 text-lg leading-8 text-white/65 sm:text-xl">{t.intro}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><div className="flex max-w-md flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-900"><Search className="h-5 w-5 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className="w-full bg-transparent text-sm outline-none" /></div><button type="button" onClick={() => setLanguage(language === 'fi' ? 'es' : language === 'es' ? 'en' : 'fi')} className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold hover:bg-white/15">{language === 'fi' ? 'Español ES' : language === 'es' ? 'English EN' : 'Suomi FI'}</button></div></div></div></section>

      <section className="container-site py-12 sm:py-16"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Finland Experience</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-midnight">{t.experiences}</h2></div><span className="text-sm text-slate-500">{filtered.length}</span></div><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{t.cards.map(([title, description, Icon]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight text-emerald-300"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-xl font-bold text-midnight">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><Link href="/#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">{language === 'fi' ? 'Suunnittele matka' : language === 'es' ? 'Planificar viaje' : 'Plan your trip'} <ArrowRight className="h-4 w-4" /></Link></article>)}</div>{filtered.length > 0 && <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((experience) => <article key={experience.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Experience</p><h3 className="mt-2 text-xl font-bold text-midnight">{language === 'es' ? experience.titleEs : experience.titleFi}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{language === 'es' ? experience.shortDescriptionEs : experience.shortDescriptionFi}</p></article>)}</div>}{filtered.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{t.empty}</div>}</section>

      {destinations.length > 0 && <section className="border-t border-slate-200 bg-white py-12 sm:py-16"><div className="container-site"><h2 className="text-2xl font-bold text-midnight">{t.destinations}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{destinations.map((destination) => <Link key={destination.id} href="/destinos" className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-white hover:shadow-card"><MapPin className="h-5 w-5 text-emerald-600" /><h3 className="mt-3 font-bold text-midnight">{language === 'es' ? destination.nameEs : destination.nameFi}</h3><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">{t.explore}<ArrowRight className="h-4 w-4" /></span></Link>)}</div></div></section>}
    </main>
  );
}
