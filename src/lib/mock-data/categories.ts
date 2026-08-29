import type { ExperienceCategory } from '@/types';

export const MOCK_CATEGORIES: ExperienceCategory[] = [
  {
    id: 1,
    slug: 'aventura-inverno',
    nameEs: 'Aventura Invernal',
    nameFi: 'Talviseikkailu',
    icon: '❄️',
    color: '#0F172A',
  },
  {
    id: 2,
    slug: 'naturaleza-salvaje',
    nameEs: 'Naturaleza Salvaje',
    nameFi: 'Luontoseikkailu',
    icon: '🏕️',
    color: '#10B981',
  },
  {
    id: 3,
    slug: 'relajacion',
    nameEs: 'Relajación',
    nameFi: 'Rentoutuminen',
    icon: '🧖',
    color: '#F8FAFC',
  },
  {
    id: 4,
    slug: 'cultural',
    nameEs: 'Experiencias Culturales',
    nameFi: 'Kulttuurikokemukset',
    icon: '🎭',
    color: '#334155',
  },
];
