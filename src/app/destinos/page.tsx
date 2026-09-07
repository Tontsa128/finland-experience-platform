'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search, Snowflake } from 'lucide-react';
import { DestinationService } from '@/services/destination';

type Language = 'fi' | 'es' | 'en';
interface DestinationCard { id: number; slug: string; region: string; heroImageUrl: string; nameEs: string; nameFi: string; shortDescriptionEs: string; shortDescriptionFi: string; experienceCount: number; }
interface ManagedDestination { id: number; slug: string; nameEs: string; nameFi: string; region: string; descriptionEs: string; descriptionFi: string; imageUrl: string; }
const STORAGE_KEY = 'finland-experience-managed-destinations';
const fallback: Record<string, { es: [string,string]; fi: [string,string]; en: [string,string] }> = {
  inari: { es: ['Inari', 'La Laponia más auténtica: lagos, naturaleza ártica y cultura sami.'], fi: ['Inari', 'Aitoa Lappia: järviä, arktista luontoa ja saamelaiskulttuuria.'], en: ['Inari', 'Authentic Lapland: lakes, Arctic nature and Sámi culture.'] },
  tampere: { es: ['Tampere', 'Ciudad de lagos, saunas y gastronomía finlandesa.'], fi: ['Tampere', 'Järvien, saunojen ja suomalaisen ruoan kaupunki.'], en: ['Tampere', 'A city of lakes, saunas and Finnish food culture.'] },
  helsinki: { es: ['Helsinki', 'Diseño nórdico, mar, arquitectura y archipiélago.'], fi: ['Helsinki', 'Pohjoismaista designia, merta, arkkitehtuuria ja saaristoa.'], en: ['Helsinki', 'Nordic design, sea, architecture and archipelago.'] },
  turku: { es: ['Turku', 'Historia, río Aura y el espectacular archipiélago.'], fi: ['Turku', 'Historiaa, Aurajoki ja ainutlaatuinen saaristo.'], en: ['Turku', 'History, the Aura River and the spectacular archipelago.'] },
  lapland: { es: ['Laponia', 'Nieve, bosques, auroras y aventuras árticas.'], fi: ['Lappi', 'Lunta, metsiä, revontulia ja arktisia seikkailuja.'], en: ['Lapland', 'Snow, forests, Northern Lights and Arctic adventures.'] },
  lakeland: { es: ['Región de los Lagos', 'Miles de lagos y la tranquilidad de la naturaleza finlandesa.'], fi: ['Järvi-Suomi', 'Tuhansia järviä ja suomalaisen luonnon rauha.'], en: ['Lakeland', 'Thousands of lakes and the quiet rhythm of Finnish nature.'] },
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationCard[]>([]);
  const [language, setLanguage] = useState<Language>('fi');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    DestinationService.getDestinations(true).then((items) => {
      const mapped: DestinationCard[] = items.map((destination) => {
        const es = destination.translations?.find((x) => x.languageCode === 'es');
        const fi = destination.translations?.find((x) => x.languageCode === 'fi');
        const f = fallback[destination.slug];
        return { id: destination.id, slug: destination.slug, region: destination.region, heroImageUrl: destination.heroImageUrl, nameEs: es?.name || f?.es[0] || destination.slug, nameFi: fi?.name || f?.fi[0] || destination.slug, shortDescriptionEs: es?.shortDescription || f?.es[1] || 'Descubre Finlandia.', shortDescriptionFi: fi?.shortDescription || f?.fi[1] || 'Tutustu Suomeen.', experienceCount: destination.experienceCount ?? 0 };
      });
      let managed: ManagedDestination[] = [];
      try { managed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { managed = []; }
      const managedCards = managed.map((x) => ({ id: x.id, slug: x.slug, region: x.region, heroImageUrl: x.imageUrl, nameEs: x.nameEs, nameFi: x.nameFi, shortDescriptionEs: x.descriptionEs, shortDescriptionFi: x.descriptionFi, experienceCount: 0 }));
      if (mounted) setDestinations([...managedCards, ...mapped]);
    }).catch((error) => console.error('Error loading destinations:', error)).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter((x) => `${x.nameEs} ${x.nameFi} ${x.region}`.toLowerCase().includes(q));
  }, [destinations, search]);
  const text = language === 'fi' ? { title: 'Kohteet Suomessa', intro: 'Löydä Lapin, järvi-Suomen, kaupunkien ja saariston parhaat paikat.', search: 'Hae kohdetta tai teemaa', explore: 'Tutustu', count: 'kohdetta' } : language === 'es' ? { title: 'Destinos en Finlandia', intro: 'Descubre lo mejor de Laponia, los lagos, las ciudades y el archipiélago.', search: 'Buscar destino o tema', explore: 'Explorar', count: 'destinos' } : { title: 'Destinations in Finland', intro: 'Discover the best of Lapland, the lakes, cities and the Finnish archipelago.', search: 'Search destination or theme', explore: 'Explore', count: 'destinations' };

  if (loading) return <main className="flex min-h-[70vh] items-center justify-center bg-slate-50"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" /><p className="mt-4 text-sm text-slate-500">Ladataan kohteita...</p></div></main>;

  return <main className="bg-slate-50"><section className="relative overflow-hidden bg-midnight py-16 text-white sm:py-20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(32,201,151,0.24),transparent_36%)]" /><div className="container-site relative"><div className="max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80"><Snowflake className="h-4 w-4 text-emerald-300" /> Finland Experience</span><h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">{text.title}</h1><p className="mt-4 text-lg leading-8 text-white/65">{text.intro}</p><div className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-900 shadow-xl"><Search className="h-5 w-5 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={text.search} className="w-full bg-transparent text-sm outline-none" /></div><button type="button" onClick={() => setLanguage(language === 'fi' ? 'es' : language === 'es' ? 'en' : 'fi')} className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold hover:bg-white/15">{language === 'fi' ? 'Español ES' : language === 'es' ? 'English EN' : 'Suomi FI'}</button></div></div></div></section><section className="container-site py-12 sm:py-16"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Finland</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-midnight">{language === 'fi' ? 'Valitse oma Suomesi' : language === 'es' ? 'Elige tu Finlandia' : 'Choose your Finland'}</h2></div><span className="text-sm text-slate-500">{filtered.length} {text.count}</span></div><div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((destination) => { const title = language === 'fi' ? destination.nameFi : destination.nameEs; const description = language === 'fi' ? destination.shortDescriptionFi : destination.shortDescriptionEs; return <Link key={`${destination.id}-${destination.slug}`} href={`/destinos/${destination.slug}`} className="group"><article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl"><div className="relative h-60 overflow-hidden bg-slate-200"><img src={destination.heroImageUrl} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-midnight"><MapPin className="mr-1 inline h-3.5 w-3.5 text-emerald-600" /> {destination.region}</span></div><div className="p-6"><h3 className="text-2xl font-bold tracking-tight text-midnight group-hover:text-emerald-700">{title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{description}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-sm text-slate-500">{destination.experienceCount} {language === 'es' ? 'experiencias' : language === 'fi' ? 'elämystä' : 'experiences'}</span><span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">{text.explore}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></div></article></Link>; })}</div>{filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">{language === 'fi' ? 'Kohteita ei löytynyt.' : language === 'es' ? 'No encontramos destinos.' : 'No destinations found.'}</div>}</section></main>;
}
