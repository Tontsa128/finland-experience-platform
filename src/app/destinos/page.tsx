'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DestinationService } from '@/services/destination';
import { formatCurrency } from '@/lib/utils';
import { MapPin, ArrowRight } from 'lucide-react';

interface Destination {
  id: number;
  slug: string;
  nameEs: string;
  nameFi: string;
  shortDescriptionEs: string;
  shortDescriptionFi: string;
  fullDescriptionEs: string;
  fullDescriptionFi: string;
  media: any[];
  experiences: any[];
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'fi'>('es');

  useEffect(() => {
    const loadData = async () => {
      try {
        const dests = await DestinationService.getDestinations(true);
        setDestinations(dests as unknown as Destination[]);

      } catch (error) {
        console.error('Error loading destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aurora"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <div className="bg-midnight text-snow py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              {language === 'es' ? 'Destinos' : 'Kohteet'}
            </h1>
            <button
              onClick={() => setLanguage(language === 'es' ? 'fi' : 'es')}
              className="bg-aurora text-midnight px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {language === 'es' ? 'FI' : 'ES'}
            </button>
          </div>
          <p className="text-lg text-snow/80">
            {language === 'es'
              ? 'Explora los destinos más hermosos de Finlandia'
              : 'Tutustu Suomen kauneimpiin kohteisiin'}
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination) => {
            const heroImage =
              destination.media.find((m) => m.isHero)?.url || destination.media[0]?.url;
            const title = language === 'es' ? destination.nameEs : destination.nameFi;
            const description =
              language === 'es' ? destination.shortDescriptionEs : destination.shortDescriptionFi;

            return (
              <Link key={destination.id} href={`/destinos/${destination.slug}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate/10">
                    {heroImage && (
                      <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-midnight mb-2">{title}</h2>
                    <p className="text-slate mb-4 line-clamp-3">{description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate/10">
                      <span className="text-sm text-slate font-semibold">
                        {destination.experiences.length}{' '}
                        {language === 'es' ? 'experiencias' : 'kokemukset'}
                      </span>
                      <ArrowRight className="w-5 h-5 text-aurora group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
