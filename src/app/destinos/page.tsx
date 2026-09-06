'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search, Snowflake } from 'lucide-react';
import { DestinationService } from '@/services/destination';

type Language = 'es' | 'fi';

interface DestinationCard {
  id: number;
  slug: string;
  region: string;
  heroImageUrl: string;
  nameEs: string;
  nameFi: string;
  shortDescriptionEs: string;
  shortDescriptionFi: string;
  experienceCount: number;
}

const fallbackContent: Record<string, { es: [string, string]; fi: [string, string] }> = {
  inari: {
    es: ['Inari', 'La Laponia más auténtica: lagos, naturaleza ártica y cultura sami.'],
    fi: ['Inari', 'Aitoa Lappia: järviä, arktista luontoa ja saamelaiskulttuuria.'],
  },
  tampere: {
    es: ['Tampere', 'Ciudad de lagos, saunas y gastronomía finlandesa en el corazón del país.'],
    fi: ['Tampere', 'Järvien, saunojen ja suomalaisen gastronomian kaupunki.'],
  },
  helsinki: {
    es: ['Helsinki', 'Diseño nórdico, mar, arquitectura y la mejor puerta de entrada a Finlandia.'],
    fi: ['Helsinki', 'Pohjoismaista designia, merta, arkkitehtuuria ja kaupunkikulttuuria.'],
  },
  turku: {
    es: ['Turku', 'Historia, archipiélago y experiencias gastronómicas en la costa occidental.'],
    fi: ['Turku', 'Historiaa, saaristoa ja elämyksellistä ruokakulttuuria länsirannikolla.'],
  },
  lapland: {
    es: ['Laponia', 'Un territorio ártico de nieve, bosques, auroras y aventuras inolvidables.'],
    fi: ['Lappi', 'Arktinen maailma täynnä lunta, metsiä, revontulia ja seikkailuja.'],
  },
  lakeland: {
    es: ['Región de los Lagos', 'Miles de lagos, bosques tranquilos y el auténtico ritmo de la naturaleza finlandesa.'],
    fi: ['Järvi-Suomi', 'Tuhansia järviä, metsiä ja suomalaisen luonnon rauhallinen rytmi.'],
  },
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('es');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;

    DestinationService.getDestinations(true)
      .then((items) => {
        const mapped = items.map((destination) => {
          const es = destination.translations?.find((t) => t.languageCode === 'es');
          const fi = destination.translations?.find((t) => t.languageCode === 'fi');
          const fallback = fallbackContent[destination.slug];

          return {
            id: destination.id,
            slug: destination.slug,
            region: destination.region,
            heroImageUrl: destination.heroImageUrl,
            nameEs: es?.name || fallback?.es[0] || destination.slug,
            nameFi: fi?.name || fallback?.fi[0] || destination.slug,
            shortDescriptionEs: es?.shortDescription || fallback?.es[1] || 'Descubre Finlandia.',
            shortDescriptionFi: fi?.shortDescription || fallback?.fi[1] || 'Tutustu Suomeen.',
            experienceCount: destination.experienceCount ?? 0,
          };
        });
        if (mounted) setDestinations(mapped);
      })
      .catch((error) => console.error('Error loading destinations:', error))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return destinations;

    return destinations.filter((destination) => {
      const name = language === 'es' ? destination.nameEs : destination.nameFi;
      return `${name} ${destination.region}`.toLowerCase().includes(query);
    });
  }, [destinations, language, search]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
          <p className="mt-4 text-sm text-slate-500">Cargando Finlandia...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(32,201,151,0.22),transparent_35%)]" />
        <div className="container-site relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
              <Snowflake className="h-4 w-4 text-emerald-300" />
              Finlandia · viajes seleccionados
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {language === 'es' ? 'Descubre Finlandia' : 'Tutustu Suomeen'}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              {language === 'es'
                ? 'Destinos auténticos, naturaleza nórdica y experiencias memorables. Elige tu próxima aventura en Finlandia.'
                : 'Aitoja kohteita, pohjoista luontoa ja unohtumattomia kokemuksia. Valitse seuraava seikkailusi Suomessa.'}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-900 shadow-xl">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={language === 'es' ? 'Buscar destino...' : 'Hae kohdetta...'}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  aria-label="Buscar destino"
                />
              </div>
              <button
                type="button"
                onClick={() => setLanguage(language === 'es' ? 'fi' : 'es')}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                {language === 'es' ? 'Suomi FI' : 'Español ES'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Destinos</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-midnight sm:text-4xl">
              {language === 'es' ? 'Elige tu Finlandia' : 'Valitse oma Suomesi'}
            </h2>
          </div>
          <p className="text-sm text-slate-500">{filteredDestinations.length} destinos</p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => {
            const title = language === 'es' ? destination.nameEs : destination.nameFi;
            const description = language === 'es' ? destination.shortDescriptionEs : destination.shortDescriptionFi;

            return (
              <Link key={destination.id} href={`/destinos/${destination.slug}`} className="group block h-full">
                <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-60 overflow-hidden bg-slate-200">
                    <img
                      src={destination.heroImageUrl}
                      alt={title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-midnight backdrop-blur">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                      {destination.region}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold tracking-tight text-midnight group-hover:text-emerald-700">{title}</h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm font-semibold text-slate-500">
                        {destination.experienceCount} {language === 'es' ? 'experiencias' : 'kokemusta'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                        {language === 'es' ? 'Explorar' : 'Tutustu'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h3 className="text-xl font-bold text-midnight">No encontramos ese destino</h3>
            <p className="mt-2 text-slate-500">Prueba con otro nombre.</p>
          </div>
        )}
      </section>
    </main>
  );
}
