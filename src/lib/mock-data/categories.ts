import type { ExperienceCategory } from '@/types';

export const MOCK_CATEGORIES: ExperienceCategory[] = [
  {
    id: 1,
    slug: 'aventura-inverno',
    nameEs: 'Aventura Invernal',
    nameFi: 'Talviseikkailu',
    icon: '❄️',
    color: '#00AEEF',
    createdAt: new Date(),
  },
  {
    id: 2,
    slug: 'experiencia-cultural',
    nameEs: 'Experiencia Cultural',
    nameFi: 'Kulttuurikokemus',
    icon: '🏛️',
    color: '#FF5733',
    createdAt: new Date(),
  },
  {
    id: 3,
    slug: 'naturaleza-salvaje',
    nameEs: 'Naturaleza Salvaje',
    nameFi: 'Luontoseikkailu',
    icon: '🏕️',
    color: '#10B981',
    createdAt: new Date(),
  },
  {
    id: 4,
    slug: 'relajacion',
    nameEs: 'Relajación',
    nameFi: 'Rentoutuminen',
    icon: '🧖',
    color: '#8B5CF6',
    createdAt: new Date(),
  },
  {
    id: 5,
    slug: 'gastronomia',
    nameEs: 'Gastronomía',
    nameFi: 'Ruoka ja gastronomia',
    icon: '🍽️',
    color: '#F59E0B',
    createdAt: new Date(),
  },
];
