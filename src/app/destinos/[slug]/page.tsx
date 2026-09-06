'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DestinationService } from '@/services/destination';
import { ChevronRight } from 'lucide-react';

interface DestinationExperience {
  id: number;
  slug: string;
  titleEs: string;
  titleFi: string;
}

interface Destination {
  id: number;
  slug: string;
  nameEs: string;
  nameFi: string;
  fullDescriptionEs: string;
  fullDescriptionFi: string;
  highlightsEs: string;
  highlightsFi: string;
  media: Array<{ url: string; isHero: boolean }>;
  experiences: DestinationExperience[];
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'fi'>('es');

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const dest = await DestinationService.getDestinationBySlug(params.slug, true);
        if (!mounted || !dest) return;

        setDestination({
          id: dest.id,
          slug: dest.slug,
          nameEs: dest.nameEs,
          nameFi: dest.nameFi,
          fullDescriptionEs: dest.fullDescriptionEs,
          fullDescriptionFi: dest.fullDescriptionFi,
          highlightsEs: dest.highlightsEs,
          highlightsFi: dest.highlightsFi,
          media: dest.media.map((media) => ({ url: media.url, isHero: media.isHero })),
          experiences: dest.experiences.map((experience) => ({
            id: experience.id,
            slug: experience.slug,
            titleEs: experience.titleEs,
            titleFi: experience.titleFi,
          })),
        });
      } catch (error) {
        console.error('Error loading destination:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aurora" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-midnight mb-4">
            {language === 'es' ? 'Destino no encontrado' : 'Kohdetta ei löytynyt'}
          </h1>
          <Link href="/destinos" className="text-aurora hover:underline">
            {language === 'es' ? 'Volver a destinos' : 'Palaa kohteisiin'}
          </Link>
        </div>
      </div>
    );
  }

  const getText = (es: string, fi: string) => (language === 'es' ? es : fi);
  const heroImage = destination.media.find((m) => m.isHero)?.url || destination.media[0]?.url;
  const title = getText(destination.nameEs, destination.nameFi);
  const description = getText(destination.fullDescriptionEs, destination.fullDescriptionFi);
  const highlights = getText(destination.highlightsEs, destination.highlightsFi);

  return (
    <div className="min-h-screen bg-snow">
      <div className="fixed top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setLanguage(language === 'es' ? 'fi' : 'es')}
          className="bg-aurora text-midnight px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {language === 'es' ? 'FI' : 'ES'}
        </button>
      </div>

      {heroImage && (
        <div className="relative h-96 w-full overflow-hidden">
          <img src={heroImage} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-snow mb-2">{title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-midnight mb-4">
                {language === 'es' ? 'Descripción' : 'Kuvaus'}
              </h2>
              <p className="text-slate leading-relaxed">{description}</p>
            </div>

            {highlights && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-midnight mb-4">
                  {language === 'es' ? 'Destacados' : 'Kohokohdat'}
                </h2>
                <p className="text-slate whitespace-pre-line">{highlights}</p>
              </div>
            )}

            {destination.experiences.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-midnight mb-4">
                  {language === 'es' ? 'Experiencias en este destino' : 'Kokemukset tässä kohteessa'}
                </h2>
                <div className="space-y-3">
                  {destination.experiences.map((exp) => {
                    const experienceTitle = language === 'es' ? exp.titleEs : exp.titleFi;
                    return (
                      <Link
                        key={exp.id}
                        href={`/experiencias/${exp.slug}`}
                        className="flex items-center justify-between p-3 hover:bg-slate/5 rounded-lg transition group"
                      >
                        <span className="font-semibold text-midnight group-hover:text-aurora transition">
                          {experienceTitle || exp.titleFi || exp.titleEs}
                        </span>
                        <ChevronRight className="w-5 h-5 text-aurora" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8 space-y-6">
              <h3 className="text-xl font-bold text-midnight">
                {language === 'es' ? 'Información' : 'Tiedot'}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate mb-1">
                    {language === 'es' ? 'Ubicación' : 'Sijainti'}
                  </p>
                  <p className="font-semibold text-midnight">{title}</p>
                </div>
                <div>
                  <p className="text-sm text-slate mb-1">
                    {language === 'es' ? 'Experiencias disponibles' : 'Saatavilla olevat kokemukset'}
                  </p>
                  <p className="font-semibold text-aurora text-lg">{destination.experiences.length}</p>
                </div>
              </div>
              <Link
                href="/experiencias"
                className="w-full bg-aurora text-midnight py-2 rounded-lg font-semibold hover:opacity-90 transition text-center"
              >
                {language === 'es' ? 'Ver todas las experiencias' : 'Näytä kaikki kokemukset'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
