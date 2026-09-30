import type { Locale } from "@/types";

export type LuxuryDirectoryEntry = {
  id: string;
  category: "stay" | "sauna" | "food" | "nature" | "experience";
  location: string;
  name: string;
  description: Record<Locale, string>;
  url: string;
  price?: string;
  image?: string;
  imageCredit?: string;
  tags: string[];
  linkLabel?: Record<Locale, string>;
};

const cdn = "https://cdn-datahub.visitfinland.com/images/";

export const luxuryDirectory: LuxuryDirectoryEntry[] = [
  {
    id: "herrankukkaro",
    category: "sauna",
    location: "Naantali · Rymättylä",
    name: "Herrankukkaro",
    description: {
      fi: "Aito savusauna, saaristolaisruoka, mökkimajoitus, meriuinti ja avanto samassa saaristokohteessa.",
      es: "Sauna de humo, gastronomía del archipiélago, cabañas, baño en el mar y experiencias auténticas.",
      en: "Smoke sauna, archipelago food, cottage stays, sea swimming and authentic Finnish sauna culture."
    },
    url: "https://www.herrankukkaro.fi",
    price: "Majoitus 108–288 €/mökki/yö; savusauna + saaristoruoka 65 €/hlö",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/IMG_0650__verkko-870x580.png",
    imageCredit: "Visit Naantali",
    tags: ["smoke sauna", "archipelago", "local food", "stay"]
  },
  {
    id: "airisto-spa",
    category: "sauna",
    location: "Turun saaristo · Parainen",
    name: "Airisto Spa",
    description: {
      fi: "Merenrannan savusauna, saunat ja altaat, saaristomajoitus, illallinen, kalastus ja veneily.",
      es: "Sauna de humo junto al mar, piscinas, alojamiento, gastronomía, pesca y navegación.",
      en: "Seaside smoke sauna, pools, archipelago accommodation, dining, fishing and boating."
    },
    url: "https://airistospa.fi",
    price: "Saunat + altaat 1 050–1 300 € + 10 €/hlö; kalastusvene oppaalla alkaen 650 € / 4 h",
    tags: ["smoke sauna", "sea", "fishing", "villas"]
  },
  {
    id: "aurora-igloo-porvoo",
    category: "stay",
    location: "Porvoo · Emäsalo",
    name: "Aurora Igloo Porvoo",
    description: {
      fi: "Lasi-iglu, merellinen maisema, sauna ja romanttinen yöpyminen Porvoon saaristossa.",
      es: "Iglú de cristal, paisaje marítimo, sauna y una estancia romántica cerca de Porvoo.",
      en: "A glass igloo, sea views, sauna and a romantic stay near Porvoo."
    },
    url: "https://www.auroraigloo.fi",
    tags: ["glass igloo", "romantic", "sea", "sauna"]
  },
  {
    id: "archipelago-live-igloos",
    category: "stay",
    location: "Naantali · Rymättylä",
    name: "Archipelago Live Igloos",
    description: {
      fi: "AuroraHut-iglumajoitus Aaslaassa: merimaisemat, auringonlaskut ja tähtitaivas panoraamaikkunoista.",
      es: "Alojamiento en iglú flotante con vistas al mar, puestas de sol y cielo estrellado.",
      en: "AuroraHut igloo accommodation with sea views, sunsets and panoramic views of the night sky."
    },
    url: "https://www.archipelagolive.fi",
    image: "https://static.wixstatic.com/media/fcabc2_794847b2185d4a65b6a6c8eae56fc0a3~mv2.jpg",
    imageCredit: "Archipelago Live",
    tags: ["igloo", "archipelago", "romantic", "sunset"]
  },
  {
    id: "matri-house",
    category: "stay",
    location: "Mathildedal · Salo",
    name: "Matri House",
    description: {
      fi: "Vuonna 1840 rakennettu boutique-majoitus, kuusi yksilöllistä huonetta ja designia Mathildedalin sydämessä.",
      es: "Casa boutique de 1840 con seis habitaciones únicas, diseño y ambiente histórico en Mathildedal.",
      en: "An 1840 boutique house with six individually designed rooms in the heart of Mathildedal."
    },
    url: "https://matrihouse.fi",
    image: `${cdn}532d5770-1b9a-11f1-b3a4-6d11235fc921.jpeg?s=1280`,
    imageCredit: "Visit Salo / Visit Finland DataHub",
    tags: ["boutique", "design", "Mathildedal", "slow travel"]
  },
  {
    id: "hotel-mathildedal",
    category: "stay",
    location: "Mathildedal · Salo",
    name: "Hotel Mathildedal",
    description: {
      fi: "13 huoneen boutique-hotelli historiallisessa ruukkikylässä, aivan Teijon kansallispuiston vieressä.",
      es: "Hotel boutique de 13 habitaciones en un histórico pueblo siderúrgico junto al Parque Nacional de Teijo.",
      en: "A 13-room boutique hotel in the historic ironworks village beside Teijo National Park."
    },
    url: "https://mathildedal.fi",
    image: `${cdn}67490c50-bc54-11ef-9fcc-d37cec752366.jpeg?s=1280`,
    imageCredit: "Visit Salo / Visit Finland DataHub",
    tags: ["boutique", "ironworks village", "local food", "nature"]
  },
  {
    id: "mathildan-marina",
    category: "stay",
    location: "Mathildedal · Salo",
    name: "Mathildan Marina",
    description: {
      fi: "Satamahotelli meren äärellä, sauna, meriterassi, ravintola ja vierasvenesatama.",
      es: "Hotel junto al puerto con sauna, terraza junto al mar, restaurante y marina.",
      en: "Harbour hotel with sauna, sea terrace, restaurant and guest marina."
    },
    url: "https://www.mathildanmarina.fi",
    image: `${cdn}e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280`,
    imageCredit: "Visit Salo / Visit Finland DataHub",
    tags: ["harbour", "sauna", "sea", "restaurant"]
  },
  {
    id: "mathildan-marina-restaurant",
    category: "food",
    location: "Mathildedal · Salo",
    name: "Mathildan Marina Restaurant",
    description: {
      fi: "Sesonkien mukaan vaihtuvaa saaristoruokaa, kalaa, riistaa ja viiden annoksen maistelumenu.",
      es: "Cocina de temporada con pescado, caza y un menú degustación de cinco platos.",
      en: "Seasonal archipelago cuisine with fish, game and a five-course tasting menu."
    },
    url: "https://mathildanmarina.fi/ravintola/",
    image: `${cdn}e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280`,
    imageCredit: "Mathildan Marina",
    tags: ["local food", "tasting menu", "fish", "game"]
  },
  {
    id: "mathildedal-village-brewery",
    category: "food",
    location: "Mathildedal · Salo",
    name: "Mathildedalin Kyläpanimo",
    description: {
      fi: "Kyläläisten perustama pienpanimo ruukkikylän sydämessä. Oluita voi maistella ja ostaa mukaan.",
      es: "Microcervecería fundada por los vecinos en el corazón de Mathildedal, con cervezas locales para degustar y llevar.",
      en: "A village brewery in the heart of Mathildedal, with local beers to taste and take home."
    },
    url: "https://kylapanimo.fi",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kyl%C3%A4panimo-laatikko-web.jpg",
    imageCredit: "Visit Salo",
    tags: ["craft beer", "village life", "local food", "Mathildedal"]
  },
  {
    id: "lepola-drinks",
    category: "food",
    location: "Salo",
    name: "Lepola Drinks",
    description: {
      fi: "Käsintehtyjä omenasiidereitä paikallisista omenoista. Siiderimyymälä ja terassi palvelevat kesäkaudella.",
      es: "Sidras artesanales elaboradas con manzanas locales. Tienda y terraza en temporada de verano.",
      en: "Handcrafted apple ciders made from local apples, with a shop and terrace in summer."
    },
    url: "https://lepoladrinks.fi",
    tags: ["cider", "local apples", "local food", "Salo"]
  },
  {
    id: "bistro-bruket",
    category: "food",
    location: "Mathildedal · Salo",
    name: "Bistro Bruket",
    description: {
      fi: "Ruukkikylän ravintola, jossa sesongit, lähiraaka-aineet ja kylän tunnelma kohtaavat.",
      es: "Restaurante del pueblo siderúrgico donde se encuentran los productos locales y los sabores de temporada.",
      en: "A Mathildedal restaurant bringing together local ingredients, seasonal flavours and ironworks-village atmosphere."
    },
    url: "https://mathildedal.fi",
    tags: ["seasonal food", "local ingredients", "Mathildedal"]
  },
  {
    id: "kirjakkala",
    category: "experience",
    location: "Teijo · Salo",
    name: "Kirjakkalan Ruukkikylä",
    description: {
      fi: "Pieni ruukkikylä Teijon alueella, josta löytyy paikallisia luonto- ja kalastuselämyksiä.",
      es: "Pequeño pueblo siderúrgico de la zona de Teijo con experiencias de naturaleza y pesca.",
      en: "A small ironworks village in the Teijo area with local nature and fishing experiences."
    },
    url: "https://www.ruukkikyla.fi/eng/",
    tags: ["village", "fishing", "nature", "slow travel"]
  },
  {
    id: "teijo-national-park",
    category: "nature",
    location: "Teijo · Salo",
    name: "Teijon kansallispuisto",
    description: {
      fi: "Järviä, metsiä, kallioita ja reittejä. Kalastus, melonta, soutu ja nuotiopaikat tekevät päivästä aidosti suomalaisen.",
      es: "Lagos, bosques, rocas y senderos. Pesca, kayak, remo y lugares de fuego para una experiencia finlandesa auténtica.",
      en: "Lakes, forests, rocks and trails, with fishing, paddling, rowing and campfire spots for an authentic Finnish day outdoors."
    },
    url: "https://www.luontoon.fi/fi/kohteet/teijon-kansallispuisto",
    linkLabel: { fi: "Tutustu Luontoon-palvelussa", es: "Ver el parque en Luontoon", en: "Explore the park on Luontoon" },
    image: `${cdn}40f256f0-6b21-11ed-8b5d-750472ef9a58.jpeg?s=1280`,
    imageCredit: "Visit Salo / Visit Finland DataHub",
    tags: ["national park", "fishing", "campfire", "kayaking"]
  }
];
