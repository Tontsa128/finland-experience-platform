'use client';

import { useEffect, useState } from 'react';
import { ExperienceService } from '@/services/experience';
import { DestinationService } from '@/services/destination';

interface ExperienceCard {
  id: number;
  titleEs: string;
  titleFi: string;
  shortDescriptionEs: string;
  shortDescriptionFi: string;
}

interface DestinationCard {
  id: number;
  nameEs: string;
  nameFi: string;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceCard[]>([]);
  const [destinations, setDestinations] = useState<DestinationCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [exps, dests] = await Promise.all([
          ExperienceService.getExperiences(true),
          DestinationService.getDestinations(true),
        ]);

        if (!mounted) return;

        setExperiences(exps.map((exp) => {
          const es = exp.translations?.find((t) => t.languageCode === 'es');
          const fi = exp.translations?.find((t) => t.languageCode === 'fi');
          return {
            id: exp.id,
            titleEs: es?.title ?? '',
            titleFi: fi?.title ?? '',
            shortDescriptionEs: es?.shortDescription ?? '',
            shortDescriptionFi: fi?.shortDescription ?? '',
          };
        }));

        setDestinations(dests.map((dest) => {
          const es = dest.translations?.find((t) => t.languageCode === 'es');
          const fi = dest.translations?.find((t) => t.languageCode === 'fi');
          return {
            id: dest.id,
            nameEs: es?.name ?? '',
            nameFi: fi?.name ?? '',
          };
        }));
      } catch (error) {
        console.error('Failed to load experiences:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <main className="mx-auto max-w-7xl px-4 py-12">Loading...</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Experiencias</h1>
      <p className="mt-2 text-gray-600">Descubre experiencias inolvidables en Finlandia.</p>

      {destinations.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Destinos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <article key={destination.id} className="rounded-lg border p-4">
                <h3 className="font-semibold">{destination.nameEs || destination.nameFi}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Experiencias</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <article key={experience.id} className="rounded-lg border p-5">
              <h3 className="font-semibold">{experience.titleEs || experience.titleFi}</h3>
              <p className="mt-2 text-sm text-gray-600">{experience.shortDescriptionEs || experience.shortDescriptionFi}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
