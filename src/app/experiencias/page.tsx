'use client';

import { useEffect, useState } from 'react';
import { ExperienceService } from '@/services/experience';
import { DestinationService } from '@/services/destination';
import type { Experience, Destination } from '@/types';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [exps, dests] = await Promise.all([
          ExperienceService.getExperiences(true),
          DestinationService.getDestinations(),
        ]);

        if (!mounted) return;

        const mappedExperiences: Experience[] = exps.map((exp) => {
          const es = exp.translations?.find((t) => t.languageCode === 'es');
          const fi = exp.translations?.find((t) => t.languageCode === 'fi');
          return {
            ...exp,
            titleEs: es?.title ?? '',
            titleFi: fi?.title ?? '',
            shortDescriptionEs: es?.shortDescription ?? '',
            shortDescriptionFi: fi?.shortDescription ?? '',
          } as Experience;
        });

        const mappedDestinations: Destination[] = dests.map((dest) => {
          const es = dest.translations?.find((t) => t.languageCode === 'es');
          const fi = dest.translations?.find((t) => t.languageCode === 'fi');
          return {
            ...dest,
            nameEs: es?.name ?? '',
            nameFi: fi?.name ?? '',
          } as Destination;
        });

        setExperiences(mappedExperiences);
        setDestinations(mappedDestinations);
      } catch (error) {
        console.error('Failed to load experiences:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
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
              <p className="mt-2 text-sm text-gray-600">
                {experience.shortDescriptionEs || experience.shortDescriptionFi}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
