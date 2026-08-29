'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExperienceService } from '@/services/experience';
import { DestinationService } from '@/services/destination';
import { MOCK_CATEGORIES } from '@/lib/mock-data/categories';
import { formatCurrency } from '@/lib/utils';
import { MapPin, Clock, Users, Star } from 'lucide-react';

interface Experience {
  id: number;
  slug: string;
  titleEs: string;
  titleFi: string;
  shortDescriptionEs: string;
  shortDescriptionFi: string;
  durationMinutes: number;
  minGroupSize: number;
  maxGroupSize: number;
  destinationId: number;
  categoryId: number;
  pricing: any;
  media: any[];
  difficultyLevel: string;
}

interface Destination {
  id: number;
  slug: string;
  nameEs: string;
  nameFi: string;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'fi'>('es');
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const exps = await ExperienceService.getExperiences(true);
        const dests = await DestinationService.getDestinations(true);
        setExperiences(exps as Experience[]);
        setDestinations(dests as Destination[]);
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredExperiences = experiences.filter((exp) => {
    if (selectedDestination && exp.destinationId !== selectedDestination) return false;
    if (selectedCategory && exp.categoryId !== selectedCategory) return false;
    const title = language === 'es' ? exp.titleEs : exp.titleFi;
    if (searchQuery && !title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getHeroImage = (experience: Experience) => {
    return experience.media.find((m) => m.isHero)?.url || experience.media[0]?.url || '/placeholder.jpg';
  };

  const getTitle = (experience: Experience) => {
    return language === 'es' ? experience.titleEs : experience.titleFi;
  };

  const getDescription = (experience: Experience) => {
    return language === 'es' ? experience.shortDescriptionEs : experience.shortDescriptionFi;
  };

  const getCategoryName = (categoryId: number) => {
    const category = MOCK_CATEGORIES.find((c) => c.id === categoryId);
    return language === 'es' ? category?.nameEs : category?.nameFi;
  };

  const getDestinationName = (destId: number) => {
    const dest = destinations.find((d) => d.id === destId);
    return language === 'es' ? dest?.nameEs : dest?.nameFi;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aurora mx-auto mb-4"></div>
          <p className="text-slate">{language === 'es' ? 'Cargando...' : 'Ladataan...'}</p>
        </div>
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
              {language === 'es' ? 'Experiencias' : 'Kokemukset'}
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
              ? 'Descubre experiencias premium en Finlandia'
              : 'Tutustu Suomen premium-kokemuksiin'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-slate/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar...' : 'Haku...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
            />

            {/* Destination Filter */}
            <select
              value={selectedDestination || ''}
              onChange={(e) => setSelectedDestination(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
            >
              <option value="">{language === 'es' ? 'Todos los destinos' : 'Kaikki kohteet'}</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {language === 'es' ? dest.nameEs : dest.nameFi}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
            >
              <option value="">{language === 'es' ? 'Todas las categorías' : 'Kaikki kategoriat'}</option>
              {MOCK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {language === 'es' ? cat.nameEs : cat.nameFi}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate text-lg">
              {language === 'es' ? 'No se encontraron experiencias' : 'Kokemuksia ei löytynyt'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <Link key={experience.id} href={`/experiencias/${experience.slug}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate/10">
                    <img
                      src={getHeroImage(experience)}
                      alt={getTitle(experience)}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-aurora text-midnight px-3 py-1 rounded-full text-sm font-semibold">
                      {getCategoryName(experience.categoryId)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-midnight mb-2 line-clamp-2">
                      {getTitle(experience)}
                    </h3>

                    <p className="text-slate text-sm mb-4 line-clamp-2 flex-1">
                      {getDescription(experience)}
                    </p>

                    {/* Meta */}
                    <div className="space-y-2 text-sm text-slate mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{getDestinationName(experience.destinationId)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{experience.durationMinutes} {language === 'es' ? 'min' : 'min'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {experience.minGroupSize}-{experience.maxGroupSize}{' '}
                          {language === 'es' ? 'personas' : 'henkilöä'}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    {experience.pricing && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate/10">
                        <span className="text-2xl font-bold text-aurora">
                          {formatCurrency(experience.pricing.basePriceEur)}
                        </span>
                        <span className="text-xs text-slate">
                          {language === 'es' ? 'por persona' : 'per henkilö'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
