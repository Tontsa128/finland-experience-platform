import type { Experience, ExperienceTranslation } from '@/types';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 1,
    destinationId: 1,
    categoryId: 1,
    slug: 'auroras-boreales-caza-cristal-hielo',
    durationMinutes: 480,
    minGroupSize: 1,
    maxGroupSize: 8,
    difficultyLevel: 'Moderada',
    status: 'published',
    publishedAt: new Date('2026-01-01'),
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 2,
    destinationId: 3,
    categoryId: 3,
    slug: 'retiro-vip-sauna-finlandesa-banio-helado',
    durationMinutes: 240,
    minGroupSize: 2,
    maxGroupSize: 6,
    difficultyLevel: 'Fácil',
    status: 'published',
    publishedAt: new Date('2026-01-01'),
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 3,
    destinationId: 2,
    categoryId: 1,
    slug: 'expedicion-trineo-huskies-naturaleza-salvaje',
    durationMinutes: 360,
    minGroupSize: 1,
    maxGroupSize: 10,
    difficultyLevel: 'Moderada',
    status: 'published',
    publishedAt: new Date('2026-01-01'),
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

export const MOCK_EXPERIENCE_TRANSLATIONS: ExperienceTranslation[] = [
  // Experience 1 - Aurora Borealis Hunt
  {
    id: 1,
    experienceId: 1,
    languageCode: 'es',
    title: 'Auroras Boreales y Caza del Cristal de Hielo',
    shortDescription: 'Una noche mágica bajo el cielo ártico buscando las esquivas auroras boreales',
    fullDescription:
      'Embárcate en una emocionante expedición nocturna para capturar la magia de las auroras boreales. Acompañado por un experto en auroras, viajarás hacia la naturaleza salvaje de Laponia en busca de este fenómeno natural espectacular. Esta experiencia incluye instrucción fotográfica, bebidas calientes tradicionales y la oportunidad de bailar bajo las luces verdes del norte.',
    whatToBring:
      'Ropa térmica de invierno,Botas aisladas,Guantes y gorro,Cámara (opcional),Linterna frontal',
    safetyInformation:
      'Las temperaturas pueden bajar a -25°C. Se proporcionará equipo de invierno de calidad. Guías experimentados acompañarán todo el tiempo. Seguro de viaje recomendado.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    experienceId: 1,
    languageCode: 'fi',
    title: 'Revontulet ja Jääkiteiden Metsästys',
    shortDescription: 'Lumottu yö Arktisen taivaan alla etsiessä salaperäisiä revontulia',
    fullDescription:
      'Lähde jännittävälle yöretkelle revontulten näyttämisen saavuttamiseksi. Revontuliasiantuntijan johdolla matkustat Lapin villiin luontoon tämän hämmästyttävän luonnonilmiön etsimiseksi. Tämä kokemus sisältää valokuvausopastuksen, perinteisiä kuumia juomia ja mahdollisuuden tanssia pohjoisvärien valon alla.',
    whatToBring:
      'Talven lämpövaatteet,Eritylämpöisiä saappaita,Käsineet ja hattu,Kamera (valinnainen),Otsalamppu',
    safetyInformation:
      'Lämpötila voi laskea -25°C:een. Laadukas talvivaaatetus toimitetaan. Kokeneet oppaat seuraavat koko ajan. Matkavakuutus suositeltu.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Experience 2 - Finnish Sauna Retreat
  {
    id: 3,
    experienceId: 2,
    languageCode: 'es',
    title: 'Retiro VIP de Sauna Finlandesa y Baño Helado',
    shortDescription: 'La experiencia de sauna clásica finlandesa con baño helado en un entorno de lujo',
    fullDescription:
      'Descubre la auténtica cultura finlandesa de sauna en este retiro VIP exclusivo. Te sumergirás en saunas tradicionales de leña, disfrutarás de baños helados en lagos finlandeses, masajes relajantes y cena gourmet. Una experiencia completa de bienestar finlandés en su máxima expresión.',
    whatToBring:
      'Traje de baño,Toalla (se proporciona),Chanclas,Productos de cuidado personal',
    safetyInformation:
      'No recomendado para personas con problemas cardíacos. Baño helado es voluntario. Personal médico disponible. Transporte de ida y vuelta incluido.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    experienceId: 2,
    languageCode: 'fi',
    title: 'VIP-Sauna ja Jäätalo Retro',
    shortDescription: 'Perinteinen suomalainen saunakokemus jäähauteella luksusympäristössä',
    fullDescription:
      'Tutustu aasian suomalaiseen sauna-kulttuuriin tässä eksklusiivisessa VIP-retriitissä. Uppoudut perinteisiin puulla lämmitettäviin saunoihin, nauti jäähauteista Suomen järvissa, rentoutuvista masseista ja gourmet-illallisesta. Täydellinen suomalainen wellness-kokemus korkeimmassa muodossaan.',
    whatToBring: 'Uimapuku,Pyyhe (toimitetaan),Tohvelit,Henkilökohtaiset hoitotuotteet',
    safetyInformation:
      'Ei suositeltu sydänongelmia sairastaville. Jäähautaus on vapaaehtoinen. Lääkintöhenkilökunta saatavilla. Kuljetus molempiin suuntiin sisältyy.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Experience 3 - Husky Sledding
  {
    id: 5,
    experienceId: 3,
    languageCode: 'es',
    title: 'Expedición en Trineo de Huskies en la Naturaleza Salvaje',
    shortDescription: 'Una emocionante aventura en trineo tirado por huskies a través de bosques nevados',
    fullDescription:
      'Vive la emoción de pilotar tu propio trineo tirado por atléticos perros huskies. Esta expedición de día completo te llevará a través de los bosques nevados de Inari, donde experimentarás la verdadera vida ártica. Incluye entrenamiento de conducción, almuerzo tradicional alrededor de una fogata, y la oportunidad de aprender sobre la cultura sami.',
    whatToBring:
      'Ropa térmica pesada,Botas de invierno impermeables,Gafas de sol árticas,Protector solar,Cámara',
    safetyInformation:
      'Se requiere cierta condición física. Casco proporcionado. No adecuado para personas con miedo a los perros. Guías experimentados y enfermero presente. Actividad de alto riesgo.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    experienceId: 3,
    languageCode: 'fi',
    title: 'Koiraretkellä Villien Metsien Läpi',
    shortDescription: 'Jännittävä seikkailu koirarekalla atletiikkaisten husky-koirien vetämänä',
    fullDescription:
      'Koe jännitys ajaa omaa koirarekkaasi urheilullisten husky-koirien vetämänä. Tämä koko päivän retki vie sinut Inarin lumisten metsien läpi, jossa koet todellisen arktisen elämän. Sisältää ajoopastuksen, perinteillisen lounaan nuotion ympärillä ja mahdollisuuden oppia saamelaisesta kulttuurista.',
    whatToBring:
      'Raskas lämpövaatteet,Vedenpitävät talvosaappaat,Arktisen aurinkolasit,Aurinkosuoja,Kamera',
    safetyInformation:
      'Vaaditaan jonkin verran kuntoa. Kypärä toimitetaan. Ei sovellu koirista pelkäävät. Kokeneita oppaita ja sairaanhoitaja läsnä. Korkean riskin aktiviteetti.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
