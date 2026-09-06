'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { DestinationService } from '@/services/destination';

interface DestinationExperience { id: number; slug: string; titleEs: string; titleFi: string; }
interface Destination {
  id: number;
  slug: string;
  region: string;
  heroImageUrl: string;
  nameEs: string;
  nameFi: string;
  fullDescriptionEs: string;
  fullDescriptionFi: string;
  highlightsEs: string;
  highlightsFi: string;
  experiences: DestinationExperience[];
}

interface ManagedDestination {
  id: number;
  slug: string;
  nameEs: string;
  nameFi: string;
  region: string;
  descriptionEs: string;
  descriptionFi: string;
  imageUrl: string;
}

const STORAGE_KEY = 'finland-experience-managed-destinations';

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'fi'>('es');

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const dest = await DestinationService.getDestinationBySlug(params.slug, true);
        if (dest) {
          if (mounted) {
            setDestination({
              id: dest.id,
              slug: dest.slug,
              region: dest.region,
              heroImageUrl: dest.heroImageUrl,
              nameEs: dest.nameEs,
              nameFi: dest.nameFi,
              fullDescriptionEs: dest.fullDescriptionEs,
              fullDescriptionFi: dest.fullDescriptionFi,
              highlightsEs: dest.highlightsEs,
              highlightsFi: dest.highlightsFi,
              experiences: dest.experiences.map((experience) => ({ id: experience.id, slug: experience.slug, titleEs: experience.titleEs, titleFi: experience.titleFi })),
            });
          }
          return;
        }

        const managed: ManagedDestination[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const custom = managed.find((item) => item.slug === params.slug);
        if (custom && mounted) {
          setDestination({
            id: custom.id,
            slug: custom.slug,
            region: custom.region,
            heroImageUrl: custom.imageUrl,
            nameEs: custom.nameEs,
            nameFi: custom.nameFi,
            fullDescriptionEs: custom.descriptionEs,
            fullDescriptionFi: custom.descriptionFi,
            highlightsEs: '',
            highlightsFi: '',
            experiences: [],
          });
        }
      } catch (error) {
        console.error('Error loading destination:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => { mounted = false; };
  }, [params.slug]);

  if (loading) {
    return <main className="flex min-h-[70vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" /></main>;
  }

  if (!destination) {
    return <main className="flex min-h-[70vh] items-center justify-center px-4"><div className="text-center"><h1 className="text-3xl font-bold text-midnight">Destino no encontrado</h1><Link href="/destinos" className="mt-4 inline-flex items-center gap-2 font-semibold text-emerald-700"><ArrowLeft className="h-4 w-4" /> Volver a destinos</Link></div></main>;
  }

  const text = (es: string, fi: string) => language === 'es' ? es : fi;
  const title = text(destination.nameEs, destination.nameFi);
  const description = text(destination.fullDescriptionEs, destination.fullDescriptionFi);
  const highlights = text(destination.highlightsEs, destination.highlightsFi);

  return (
    <main className="bg-slate-50">
      <section className="relative h-[55vh] min-h-[430px] overflow-hidden bg-midnight">
        <img src={destination.heroImageUrl} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/35 to-transparent" />
        <div className="container-site absolute inset-x-0 bottom-0 pb-10 text-white sm:pb-14">
          <Link href="/destinos" className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-black/40"><ArrowLeft className="h-4 w-4" /> Destinos</Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/75"><MapPin className="h-4 w-4 text-emerald-300" /> {destination.region}</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
        </div>
        <button type="button" onClick={() => setLanguage(language === 'es' ? 'fi' : 'es')} className="absolute right-5 top-5 rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-sm font-bold text-white backdrop-blur hover:bg-black/50">{language === 'es' ? 'FI' : 'ES'}</button>
      </section>

      <section className="container-site py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card sm:p-9">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600"><Sparkles className="h-4 w-4" /> {language === 'es' ? 'El destino' : 'Kohde'}</div>
              <h2 className="text-3xl font-bold text-midnight">{language === 'es' ? 'Una Finlandia para recordar' : 'Suomi, joka jää mieleen'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
            </article>

            {highlights && (
              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card sm:p-9">
                <h2 className="text-2xl font-bold text-midnight">{language === 'es' ? 'Lo más destacado' : 'Kohokohdat'}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {highlights.split(',').filter(Boolean).map((item) => <div key={item} className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">{item.trim()}</div>)}
                </div>
              </article>
            )}

            {destination.experiences.length > 0 && (
              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card sm:p-9">
                <h2 className="text-2xl font-bold text-midnight">{language === 'es' ? 'Experiencias en este destino' : 'Kokemukset tässä kohteessa'}</h2>
                <div className="mt-5 divide-y divide-slate-100">
                  {destination.experiences.map((experience) => <Link key={experience.id} href={`/experiencias/${experience.slug}`} className="flex items-center justify-between py-4 font-semibold text-midnight hover:text-emerald-700"><span>{language === 'es' ? experience.titleEs : experience.titleFi}</span><ChevronRight className="h-5 w-5 text-emerald-600" /></Link>)}
                </div>
              </article>
            )}
          </div>

          <aside>
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-7 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Finland Experience</p>
              <h2 className="mt-2 text-2xl font-bold text-midnight">{language === 'es' ? 'Planifica tu viaje' : 'Suunnittele matkasi'}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{language === 'es' ? 'Explora nuestras experiencias y encuentra el momento perfecto para visitar Finlandia.' : 'Tutustu kokemuksiimme ja löydä täydellinen aika matkustaa Suomeen.'}</p>
              <Link href="/experiencias" className="mt-6 flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-white shadow-lg hover:bg-emerald-600">{language === 'es' ? 'Ver experiencias' : 'Katso kokemukset'}</Link>
              <Link href="/destinos" className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{language === 'es' ? 'Otros destinos' : 'Muut kohteet'}</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
