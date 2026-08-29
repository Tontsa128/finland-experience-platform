import type { FAQ } from '@/types';

export const MOCK_FAQS: FAQ[] = [
  // Experience 1 FAQs
  {
    id: 1,
    experienceId: 1,
    destinationId: null,
    questionEs: '¿Cuál es la mejor época para ver auroras boreales?',
    questionFi: 'Mikä on paras aika nähdä revontulia?',
    answerEs:
      'La mejor época es de septiembre a marzo, cuando las noches son más largas. El pico máximo suele ser entre noviembre y enero.',
    answerFi:
      'Paras aika on syyskuu-maaliskuu, kun yöt ovat pidempiä. Huippu on yleensä marraskuu-tammikuu.',
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    experienceId: 1,
    destinationId: null,
    questionEs: '¿Necesito experiencia previa en fotografía?',
    questionFi: 'Tarvitsenko aiempaa valokuvauskokemus?',
    answerEs: 'No, nuestro guía proporciona instrucción básica. Puedes usar tu teléfono o cámara.',
    answerFi: 'Ei, oppaamme antaa perusopastusta. Voit käyttää puhelintasi tai kameraa.',
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    experienceId: 1,
    destinationId: null,
    questionEs: '¿Qué tan frío hace? ¿Se proporciona abrigo?',
    questionFi: 'Kuinka kylmä on? Toimitetaanko vaatteet?',
    answerEs:
      'Las temperaturas pueden caer a -25°C. Se proporciona equipo de invierno de alta calidad incluido en el precio.',
    answerFi:
      'Lämpötilat voivat laskea -25°C:een. Laadukas talvivaaatetus toimitetaan hintaan sisältyen.',
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    experienceId: 1,
    destinationId: null,
    questionEs: '¿Es seguro viaje para mayores?',
    questionFi: 'Onko se turvallista vanhemmille?',
    answerEs:
      'Sí, es seguro para la mayoría. Consulta con nuestro equipo si tienes problemas de salud específicos.',
    answerFi: 'Kyllä, se on turvallista useimmille. Kuulemme tiimiltämme, jos sinulla on erityisiä terveysongelmia.',
    sortOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Experience 2 FAQs
  {
    id: 5,
    experienceId: 2,
    destinationId: null,
    questionEs: '¿Es seguro el baño helado?',
    questionFi: 'Onko jäähautaus turvallista?',
    answerEs:
      'El baño helado es completamente voluntario. Personal médico está presente. No recomendado para personas con problemas cardíacos.',
    answerFi:
      'Jäähautaus on täysin vapaaehtoinen. Lääkintöhenkkilö on läsnä. Ei suositella sydänongelmaisille.',
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    experienceId: 2,
    destinationId: null,
    questionEs: '¿Puedo traer a niños?',
    questionFi: 'Voinko tuoda lapsia?',
    answerEs:
      'Sí, pero los menores de 8 años necesitan supervisión adicional. El baño helado es solo para adultos.',
    answerFi: 'Kyllä, mutta alle 8-vuotiaat tarvitsevat valvontaa. Jäähautaus vain aikuisille.',
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    experienceId: 2,
    destinationId: null,
    questionEs: '¿Qué ropa debo llevar?',
    questionFi: 'Mitä vaatteita minun tulee ottaa?',
    answerEs:
      'Traje de baño, chanclas y toalla. Proporcionamos todo lo demás. Puedes traer tus productos de cuidado personal.',
    answerFi:
      'Uimapuku, tohvelit ja pyyhe. Tarjoamme kaiken muun. Voit tuoda henkilökohtaiset hoitotuotteet.',
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Experience 3 FAQs
  {
    id: 8,
    experienceId: 3,
    destinationId: null,
    questionEs: '¿Necesito experiencia previa con perros?',
    questionFi: 'Tarvitsenko aiempaa kokemusta koirista?',
    answerEs:
      'No, pero no es adecuado si tienes miedo a los perros. Nuestros huskies son muy amigables y bien entrenados.',
    answerFi:
      'Ei, mutta se ei sovellu, jos pelkää koiria. Meidän huskyt ovat ystävälliset ja hyvin koulutettuja.',
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    experienceId: 3,
    destinationId: null,
    questionEs: '¿Cuál es el nivel de dificultad?',
    questionFi: 'Mikä on vaikeusaste?',
    answerEs:
      'Nivel moderado. Se requiere cierta condición física pero no experiencia previa. Los niños de 10+ años pueden participar.',
    answerFi:
      'Kohtalainen taso. Vaaditaan jonkin verran kuntoa mutta ei aiempaa kokemusta. 10+ vuotiaat lapset voivat osallistua.',
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    experienceId: 3,
    destinationId: null,
    questionEs: '¿Cuánto tiempo durará la actividad?',
    questionFi: 'Kauanko aktiviteetti kestää?',
    answerEs: 'La experiencia dura aproximadamente 6 horas incluyendo entrenamiento, conducción y almuerzo.',
    answerFi: 'Kokemus kestää noin 6 tuntia, mukaan lukien harjoittelu, ajo ja lounas.',
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
