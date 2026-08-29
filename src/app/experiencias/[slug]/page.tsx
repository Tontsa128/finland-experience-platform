'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExperienceService } from '@/services/experience';
import { DestinationService } from '@/services/destination';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Clock, MapPin, Users, AlertCircle, ChevronRight } from 'lucide-react';

interface Experience {
  id: number;
  slug: string;
  titleEs: string;
  titleFi: string;
  shortDescriptionEs: string;
  shortDescriptionFi: string;
  fullDescriptionEs: string;
  fullDescriptionFi: string;
  whatToBringEs: string;
  whatToBringFi: string;
  safetyInformationEs: string;
  safetyInformationFi: string;
  durationMinutes: number;
  minGroupSize: number;
  maxGroupSize: number;
  destinationId: number;
  categoryId: number;
  pricing: any;
  media: any[];
  addons: any[];
  difficultyLevel: string;
}

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'fi'>('es');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const exp = await ExperienceService.getExperienceBySlug(params.slug, true);
        if (exp) {
          setExperience(exp as Experience);
          const dest = await DestinationService.getDestinationById(exp.destinationId);
          setDestination(dest);
        }
      } catch (error) {
        console.error('Error loading experience:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aurora"></div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-midnight mb-4">
            {language === 'es' ? 'Experiencia no encontrada' : 'Kokemusta ei löytynyt'}
          </h1>
          <Link href="/experiencias" className="text-aurora hover:underline">
            {language === 'es' ? 'Volver a experiencias' : 'Palaa kokemuksiin'}
          </Link>
        </div>
      </div>
    );
  }

  const getText = (es: string, fi: string) => (language === 'es' ? es : fi);
  const heroImage = experience.media.find((m) => m.isHero)?.url || experience.media[0]?.url;

  return (
    <div className="min-h-screen bg-snow">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === 'es' ? 'fi' : 'es')}
          className="bg-aurora text-midnight px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {language === 'es' ? 'FI' : 'ES'}
        </button>
      </div>

      {/* Hero Section */}
      {heroImage && (
        <div className="relative h-96 w-full overflow-hidden">
          <img src={heroImage} alt={getText(experience.titleEs, experience.titleFi)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-snow mb-2">
              {getText(experience.titleEs, experience.titleFi)}
            </h1>
            <p className="text-lg text-snow/80">
              {getText(experience.shortDescriptionEs, experience.shortDescriptionFi)}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <Clock className="w-6 h-6 text-aurora mb-2" />
                <p className="text-sm text-slate mb-1">
                  {language === 'es' ? 'Duración' : 'Kesto'}
                </p>
                <p className="font-semibold text-midnight">{experience.durationMinutes} min</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <Users className="w-6 h-6 text-aurora mb-2" />
                <p className="text-sm text-slate mb-1">
                  {language === 'es' ? 'Grupo' : 'Ryhmä'}
                </p>
                <p className="font-semibold text-midnight">
                  {experience.minGroupSize}-{experience.maxGroupSize}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <MapPin className="w-6 h-6 text-aurora mb-2" />
                <p className="text-sm text-slate mb-1">
                  {language === 'es' ? 'Destino' : 'Kohde'}
                </p>
                <p className="font-semibold text-midnight text-sm">
                  {getText(destination?.nameEs, destination?.nameFi)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <AlertCircle className="w-6 h-6 text-aurora mb-2" />
                <p className="text-sm text-slate mb-1">
                  {language === 'es' ? 'Dificultad' : 'Vaikeus'}
                </p>
                <p className="font-semibold text-midnight text-sm">{experience.difficultyLevel}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-midnight mb-4">
                {language === 'es' ? 'Descripción' : 'Kuvaus'}
              </h2>
              <p className="text-slate leading-relaxed">
                {getText(experience.fullDescriptionEs, experience.fullDescriptionFi)}
              </p>
            </div>

            {/* What to Bring */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-midnight mb-4">
                {language === 'es' ? 'Qué llevar' : 'Mitä tuoda'}
              </h2>
              <p className="text-slate whitespace-pre-line">
                {getText(experience.whatToBringEs, experience.whatToBringFi)}
              </p>
            </div>

            {/* Safety */}
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-aurora">
              <h2 className="text-2xl font-bold text-midnight mb-4">
                {language === 'es' ? 'Seguridad' : 'Turvallisuus'}
              </h2>
              <p className="text-slate whitespace-pre-line">
                {getText(experience.safetyInformationEs, experience.safetyInformationFi)}
              </p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8 space-y-6">
              {/* Price */}
              {experience.pricing && (
                <div>
                  <p className="text-sm text-slate mb-2">
                    {language === 'es' ? 'Precio desde' : 'Hinta alkaen'}
                  </p>
                  <p className="text-4xl font-bold text-aurora">
                    {formatCurrency(experience.pricing.basePriceEur)}
                  </p>
                  <p className="text-sm text-slate mt-1">
                    {language === 'es' ? 'por persona' : 'per henkilö'}
                  </p>
                </div>
              )}

              {/* Travelers Selection */}
              <div className="border-t pt-4">
                <p className="font-semibold text-midnight mb-3">
                  {language === 'es' ? 'Viajeros' : 'Matkailijat'}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate">
                      {language === 'es' ? 'Adultos' : 'Aikuiset'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 border border-slate/20 rounded hover:bg-slate/5"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 border border-slate/20 rounded hover:bg-slate/5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate">
                      {language === 'es' ? 'Niños' : 'Lapset'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 border border-slate/20 rounded hover:bg-slate/5"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 border border-slate/20 rounded hover:bg-slate/5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/checkout?experience=${experience.id}&adults=${adults}&children=${children}`}
                className="w-full bg-aurora text-midnight py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {language === 'es' ? 'Reservar ahora' : 'Varaa nyt'}
                <ChevronRight className="w-5 h-5" />
              </Link>

              <p className="text-xs text-slate text-center">
                {language === 'es'
                  ? 'Pago seguro. Sin compromiso.'
                  : 'Turvallinen maksu. Ei sitoutumista.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
