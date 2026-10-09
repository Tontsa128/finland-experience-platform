import { Destination, Cabin, Experience, BlogPost, Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";

const summerMathildedal = photoLibrary.mathildedalHarbour;
const finnishSummerLake = photoLibrary.teijoNationalPark;
const naantaliSummer = photoLibrary.naantaliOldTown;
const alandSea = photoLibrary.aland;
const archipelagoRoad = photoLibrary.turkuAura;
const finnishCottage = photoLibrary.sarkisalo;
const mathildedalHouse = photoLibrary.mathildedalVillage;

export const destinations: Destination[] = [
  {
    id: "salo",
    slug: "salo-mathildedal",
    name: { fi: "Salo", es: "Salo", en: "Salo" },
    description: {
      fi: "Etelä-Suomen hidasta kesää parhaimmillaan: historiallinen Mathildedalin ruukkikylä, Teijon kansallispuisto, meri, metsäpolut, saunat ja pienet paikalliset palvelut. Täällä ei tarvitse suorittaa lomaa.",
      es: "Un verano tranquilo en el suroeste de Finlandia: Mathildedal, un antiguo pueblo siderúrgico junto al mar, el Parque Nacional de Teijo, saunas, bosques y pequeños negocios locales. Ideal para quedarse una o dos semanas.",
      en: "Slow Finnish summer at its best: the historic Mathildedal ironworks village, Teijo National Park, the sea, forests, saunas and small local businesses. A natural choice for an unhurried one- or two-week stay."
    },
    shortDescription: {
      fi: "Ruukkikylä, meri, metsä ja rauhallinen kesäloma",
      es: "Pueblo histórico, mar, bosque y vacaciones tranquilas",
      en: "Ironworks village, sea, forest and slow summer days"
    },
    region: "Southwest Finland",
    images: [summerMathildedal, mathildedalHouse],
    priceFrom: 0,
    featured: true,
    coordinates: { lat: 60.390, lng: 23.130 },
    tags: ["mathildedal", "teijo", "summer", "sauna", "slow-travel"],
    accommodationIds: ["c1", "c2", "c3", "c4", "c5", "c6"],
    activities: ["Teijo National Park hiking", "kayaking & SUP on Lake Matildanjärvi", "cycling & mountain biking", "summer theatre", "local cafés, brewery & boutiques", "smoke sauna and lake swimming"]
  },
  {
    id: "naantali",
    slug: "naantali",
    name: { fi: "Naantali & saaristo", es: "Naantali y el archipiélago", en: "Naantali & the Archipelago" },
    description: {
      fi: "Aurinkoinen Naantali yhdistää vanhankaupungin, meren, saariston ja kesäpäivien kiireettömyyden. Täältä voit tehdä retkiä Muumimaailmaan, Viikinkisaarelle ja lähisaarille tai vain viettää päivän rannalla ja ilta laiturilla.",
      es: "Naantali combina casco antiguo, mar, islas y el ritmo relajado del verano finlandés. Puedes visitar Moominworld, una isla vikinga o simplemente pasar el día junto al mar.",
      en: "Sunny Naantali combines an old town, sea views, islands and the relaxed rhythm of Finnish summer. Visit Moominworld, a Viking island or simply spend the day by the water."
    },
    shortDescription: {
      fi: "Vanha kaupunki, saaristo, Muumimaailma ja kesäillat",
      es: "Casco antiguo, archipiélago, Moominworld y noches de verano",
      en: "Old town, archipelago, Moominworld and long summer evenings"
    },
    region: "Southwest Finland",
    images: [naantaliSummer, naantaliSummer],
    priceFrom: 69,
    featured: true,
    coordinates: { lat: 60.467, lng: 22.025 },
    tags: ["naantali", "archipelago", "midsummer", "family"],
    accommodationIds: ["c7", "c8", "c9"],
    activities: ["Moominworld", "Viking Island day trip", "kayaking & boating", "old town walks", "cycling", "beach and harbour evenings"]
  },
  {
    id: "aland",
    slug: "aland",
    name: { fi: "Ahvenanmaa", es: "Åland", en: "Åland Islands" },
    description: {
      fi: "Ahvenanmaa on saaristoloma, jossa meri on aina lähellä. Punaiset graniittikalliot, pyöräily, pienet satamat, mökit omalla saunalla ja pitkät valoisat illat sopivat täydellisesti rauhalliseen viikon tai kahden lomaan.",
      es: "Åland es una escapada de archipiélago donde el mar está siempre cerca. Granito rojo, ciclismo, pequeños puertos, cabañas con sauna y noches luminosas.",
      en: "Åland is an archipelago escape where the sea is always close. Red granite cliffs, cycling, small harbours, seaside cottages with saunas and long Nordic summer evenings."
    },
    shortDescription: {
      fi: "Meri, punainen graniitti, pyöräily ja saariston rauha",
      es: "Mar, granito rojo, ciclismo y paz del archipiélago",
      en: "Sea, red granite, cycling and island calm"
    },
    region: "Åland",
    images: [alandSea, alandSea],
    priceFrom: 180,
    featured: true,
    coordinates: { lat: 60.178, lng: 19.915 },
    tags: ["aland", "islands", "cycling", "sea", "summer"],
    accommodationIds: ["c10", "c11", "c12"],
    activities: ["island cycling", "kayaking", "sea swimming", "Kastelholm & Bomarsund", "local food", "sunset by the harbour"]
  },
  {
    id: "hanko",
    slug: "hanko",
    name: { fi: "Hanko & läntinen rannikko", es: "Hanko y la costa oeste", en: "Hanko & the Western Coast" },
    description: {
      fi: "Hiekkarantoja, huviloita, purjeveneitä ja vanhan kylpyläkaupungin tunnelmaa. Hanko sopii hyvin merelliselle kesälomalle ja toimii myös porttina läntisen rannikon rauhallisiin saaristokohteisiin.",
      es: "Playas de arena, villas, veleros y el ambiente de una antigua ciudad balnearia. Hanko es ideal para unas vacaciones junto al mar.",
      en: "Sandy beaches, villas, sailing boats and the atmosphere of a historic seaside resort. Hanko is made for a relaxed coastal summer."
    },
    shortDescription: {
      fi: "Hiekkarannat, meri ja läntisen rannikon kesä",
      es: "Playas, mar y verano en la costa oeste",
      en: "Beaches, sea and western-coast summer"
    },
    region: "Western Finland",
    images: [photoLibrary.hankoAerial],
    priceFrom: 120,
    featured: false,
    coordinates: { lat: 59.823, lng: 22.969 },
    tags: ["hanko", "beach", "cycling", "sea"],
    accommodationIds: ["c13"],
    activities: ["beaches", "cycling", "sailing", "nature trails", "harbour cafés", "day trips along the coast"]
  },
  {
    id: "rosala",
    slug: "rosala",
    name: { fi: "Rosala", es: "Rosala", en: "Rosala" },
    description: {
      fi: "Kemiönsaaren Rosala on pieni saaristokohde, jossa historia, meri ja paikallinen kyläelämä kohtaavat. Rosalan Viikinkikeskuksessa voi tutustua viikinkiajan historiaan, viikinkikylään, näyttelyihin, kahvilaan ja museokauppaan.",
      es: "Rosala, en Kemiönsaari, es un pequeño destino de archipiélago donde se encuentran historia, mar y vida local. El Centro Vikingo de Rosala ofrece un pueblo vikingo reconstruido, exposiciones, café y tienda.",
      en: "Rosala on Kemiönsaari is a small archipelago destination where history, sea and local village life meet. Rosala Viking Centre brings the area's Viking-age history to life through its reconstructed village, exhibitions, café and shop."
    },
    shortDescription: {
      fi: "Viikinkihistoriaa, saaristoa ja kyläelämää Kemiönsaarella",
      es: "Historia vikinga, archipiélago y vida local en Kemiönsaari",
      en: "Viking history, archipelago and local island life on Kemiönsaari"
    },
    region: "Kemiönsaari · Southwest Finland",
    images: [],
    priceFrom: 0,
    featured: false,
    tags: ["rosala", "viking", "archipelago", "history", "kemionsaari"],
    activities: ["Rosala Viking Centre", "Viking village and exhibitions", "island cycling", "sea and archipelago scenery", "Bengtskär day-trip connections"]
  },
  {
    id: "porvoo",
    slug: "porvoo",
    name: { fi: "Porvoo", es: "Porvoo", en: "Porvoo" },
    description: {
      fi: "Porvoon vanhakaupunki yhdistää punamultaiset jokirannan makasiinit, mutkittelevat mukulakivikadut, puutalot, kahvilat, ravintolat ja pienet putiikit. Kaupunki sopii myös luonto- ja saaristopäivän tukikohdaksi.",
      es: "El casco histórico de Porvoo combina almacenes rojos junto al río, calles empedradas, casas de madera, cafés, restaurantes y pequeñas tiendas. La ciudad también ofrece naturaleza y experiencias de archipiélago.",
      en: "Old Porvoo brings together red-ochre riverside warehouses, winding cobbled streets, wooden houses, cafés, restaurants and small boutiques. The city also offers nature and archipelago experiences."
    },
    shortDescription: {
      fi: "Vanha Porvoo, jokiranta, kulttuuri ja saariston läheisyys",
      es: "Casco antiguo, río, cultura y cercanía al archipiélago",
      en: "Old Town, riverside life, culture and nearby archipelago"
    },
    region: "Eastern Uusimaa · Southern Finland",
    images: [photoLibrary.porvoo],
    priceFrom: 0,
    featured: false,
    coordinates: { lat: 60.393, lng: 25.665 },
    tags: ["porvoo", "old-town", "culture", "food", "archipelago"],
    activities: ["Old Porvoo walks", "Porvoo Cathedral", "cafés and restaurants", "design and boutiques", "National Urban Park", "archipelago outings"]
  },
  {
    id: "southeast",
    slug: "southeast-finland",
    name: { fi: "Kaakkois-Suomi", es: "Sureste de Finlandia", en: "Southeast Finland" },
    description: {
      fi: "Merenlahdet, linnoituskaupungit, saaristo ja metsäiset järvimaisemat tekevät Kaakkois-Suomesta kiinnostavan kesäkohteen. Kotka, Hamina ja Loviisa sopivat hyvin rauhalliseen lomaan, jossa voi yhdistää rannikon ja luonnon.",
      es: "Bahías, ciudades históricas, islas y paisajes de lagos y bosques forman un rincón diferente del verano finlandés. Kotka, Hamina y Loviisa combinan costa y naturaleza.",
      en: "Bays, historic towns, islands and forested lake landscapes create a different side of Finnish summer. Kotka, Hamina and Loviisa combine coast and nature."
    },
    shortDescription: {
      fi: "Saaristoa, historiaa ja luonnonrauhaa",
      es: "Archipiélago, historia y naturaleza",
      en: "Archipelago, history and quiet nature"
    },
    region: "Southeast Finland",
    images: [photoLibrary.hamina, photoLibrary.porvoo],
    priceFrom: 100,
    featured: false,
    coordinates: { lat: 60.466, lng: 26.945 },
    tags: ["southeast", "coast", "nature", "history"],
    accommodationIds: ["c14"],
    activities: ["Kotka seaside parks", "Hamina old town", "Loviisa day trip", "kayaking", "cycling", "local markets and cafés"]
  },
  {
    id: "turku",
    slug: "turku",
    name: { fi: "Turku & saaristo", es: "Turku y el archipiélago", en: "Turku & the Archipelago" },
    description: {
      fi: "Turku on helppo yhdistää saaristolomaan. Aurajoki, linna, museot, ravintolat ja saaristotiet antavat lomalle kaupunkipäivän ja luonnon rauhan samassa paketissa – ilman valmismatkaa.",
      es: "Turku es una puerta natural al archipiélago. Río Aura, castillo, museos, restaurantes y rutas insulares permiten combinar ciudad y naturaleza.",
      en: "Turku is a natural gateway to the archipelago. The Aura River, castle, museums, restaurants and island routes make it easy to combine city days with nature."
    },
    shortDescription: {
      fi: "Aurajoki, historia ja saariston portti",
      es: "Río Aura, historia y puerta al archipiélago",
      en: "Aura River, history and gateway to the islands"
    },
    region: "Southwest Finland",
    images: [archipelagoRoad, archipelagoRoad],
    priceFrom: 110,
    featured: false,
    coordinates: { lat: 60.452, lng: 22.267 },
    tags: ["turku", "culture", "archipelago", "summer"],
    activities: ["Turku Castle", "Aura River", "archipelago cycling", "boat trips", "museums & markets", "local food"]
  }
];

export const cabins: Cabin[] = [
  {
    id: "c1", slug: "matilda-villas", name: { fi: "Matilda Villas", es: "Matilda Villas", en: "Matilda Villas" },
    description: {
      fi: "18 laadukasta huvilaa Mathildedalin merellisessä ruukkikylässä. Oma sauna, takka, keittiö, terassi ja yksityinen ranta-alue.",
      es: "18 villas junto al mar en Mathildedal, con sauna privada, chimenea, cocina, terraza y acceso a la playa.",
      en: "18 quality villas by the sea in Mathildedal, with private sauna, fireplace, kitchen, terrace and beach access."
    },
    location: "Mathildedal, Salo",
    region: "Southwest Finland",
    pricePerNight: 190,
    images: [summerMathildedal],
    features: ["private sauna", "fireplace", "kitchen", "terrace", "beach", "bicycles"],
    maxGuests: 6, bedrooms: 2, coordinates: { lat: 60.166, lng: 22.954 }, type: "villa",
    bookingUrl: "https://www.matildavillas.fi/en", provider: "Matilda Villas",
    priceNote: { fi: "Tarkista ajantasainen hinta ja saatavuus suoraan palveluntarjoajalta.", es: "Confirma el precio y la disponibilidad actuales directamente con el proveedor.", en: "Confirm current price and availability directly with the provider." }
  },
  {
    id: "c2", slug: "matri-house", name: { fi: "Matri House", es: "Matri House", en: "Matri House" },
    description: {
      fi: "Vuonna 1840 rakennettu boutique-majoitus Mathildedalin sydämessä. Huoneet ovat yksilöllisiä ja aamiainen kuuluu hintaan. Kesäkauden hinnat näkyvät palveluntarjoajan varausjärjestelmässä.",
      es: "Una casa boutique construida en 1840 en el corazón de Mathildedal. Habitaciones individuales y desayuno incluido.",
      en: "A restored 1840 boutique house in the heart of Mathildedal, with individually designed rooms and breakfast included."
    },
    location: "Mathildedal, Salo",
    region: "Southwest Finland",
    pricePerNight: 180,
    images: [mathildedalHouse, photoLibrary.mathildedalHarbour],
    features: ["historic house", "breakfast", "garden", "design", "village centre"],
    maxGuests: 4, bedrooms: 1, coordinates: { lat: 60.166, lng: 22.956 }, type: "hotel",
    bookingUrl: "https://matrihouse.fi/", provider: "Matri House",
    priceNote: { fi: "Tarkista ajantasainen hinta ja saatavuus suoraan palveluntarjoajalta.", es: "Confirma el precio y la disponibilidad actuales directamente con el proveedor.", en: "Confirm current price and availability directly with the provider." }
  },
  {
    id: "c3", slug: "mathildan-marina", name: { fi: "Mathildan Marina", es: "Mathildan Marina", en: "Mathildan Marina" },
    description: {
      fi: "Pieni kuuden huoneen satamahotelli aivan meren äärellä. Aamupala ja sataman palvelut kuuluvat kohteen tarjontaan; huonekohtaiset tiedot tarkistetaan palveluntarjoajalta.",
      es: "Pequeño hotel portuario de seis habitaciones junto al mar. Consulta con el proveedor los detalles actuales de las habitaciones y el desayuno.",
      en: "A six-room harbour hotel by the sea. Check current room details and breakfast arrangements directly with the provider."
    },
    location: "Mathildedal harbour",
    region: "Southwest Finland",
    pricePerNight: 179,
    images: [photoLibrary.mathildedalHarbour, photoLibrary.mathildedalVillage],
    features: ["harbour", "breakfast", "sea view", "restaurant", "wifi"],
    maxGuests: 4, bedrooms: 1, coordinates: { lat: 60.166, lng: 22.960 }, type: "hotel",
    bookingUrl: "https://mathildanmarina.fi/majoitus/", provider: "Mathildan Marina",
    priceNote: { fi: "Tarkista ajantasainen huonehinta ja saatavuus suoraan palveluntarjoajalta.", es: "Confirma la tarifa y la disponibilidad actuales directamente con el proveedor.", en: "Confirm current room rates and availability directly with the provider." }
  },
  {
    id: "c4", slug: "matildanjärvi-cabins", name: { fi: "Matildanjärven mökit", es: "Cabañas de Matildanjärvi", en: "Matildanjärvi Cabins" },
    description: {
      fi: "Pienet luontomökit Teijon kansallispuistossa. Polut, uimarannat, kalastus, vuokrakalusto ja sauna ovat lähellä. Erinomainen tukikohta viikon tai kahden luonnonlomalle.",
      es: "Pequeñas cabañas en el Parque Nacional de Teijo, cerca de senderos, playas, pesca, alquiler de equipos y sauna.",
      en: "Small nature cabins in Teijo National Park, close to trails, beaches, fishing, equipment rental and sauna."
    },
    location: "Teijo National Park, Salo",
    region: "Southwest Finland",
    pricePerNight: 100,
    images: [finnishSummerLake, summerMathildedal],
    features: ["national park", "lake", "sauna", "hiking", "fishing"],
    maxGuests: 4, bedrooms: 2, coordinates: { lat: 60.190, lng: 23.020 }, type: "cabin",
    bookingUrl: "https://naturaviva.fi/fi_FI/tutustu-palveluihin/aktiviteetit/saunat/matildanjarven-kampat", provider: "Natura Viva / Matildanjärvi cabins",
    priceNote: { fi: "Ajantasainen hinta tarkistetaan varauspalvelusta.", es: "Consulta el precio actual en el sistema de reservas.", en: "Check the current rate in the booking system." }
  },
  {
    id: "c5", slug: "sarkisalo-seaside-cottages", name: { fi: "Särkisalon merenrantamökit", es: "Cabañas junto al mar en Särkisalo", en: "Särkisalo Seaside Cottages" },
    description: {
      fi: "Ylöstalon kahdeksan saaristomökkiä tarjoavat yksityisyyttä, puulämmitteisen saunan, laiturin, soutuveneen ja ilta-auringon meren äärellä. Koot 4–10 henkilölle.",
      es: "Ocho cabañas en el archipiélago de Särkisalo, con sauna de leña, embarcadero, bote de remos y sol de tarde.",
      en: "Eight archipelago cottages in Särkisalo with wood-heated sauna, pier, rowing boat and evening sun. Options for 4–10 guests."
    },
    location: "Särkisalo, Salo",
    region: "Southwest Finland",
    pricePerNight: 0,
    images: [finnishCottage],
    features: ["sea", "private sauna", "pier", "rowing boat", "privacy"],
    maxGuests: 10, bedrooms: 4, coordinates: { lat: 60.080, lng: 22.950 }, type: "villa",
    bookingUrl: "https://www.ylostalo.fi/en/vuokramokit", provider: "Ylöstalo Farm",
    priceNote: { fi: "Hinta vaihtelee mökin ja ajankohdan mukaan – tarkista ajantasainen hinta palveluntarjoajalta.", es: "El precio depende de la cabaña y las fechas; confirma la tarifa con el proveedor.", en: "Price varies by cottage and dates; confirm the current rate with the provider." }
  },
  {
    id: "c6", slug: "storfinnhova-glamping", name: { fi: "Storfinnhova glamping", es: "Glamping Storfinnhova", en: "Storfinnhova Glamping" },
    description: {
      fi: "Metsäkylän puumajat ja glamping-teltat tarjoavat luonnon keskellä nukkumista hieman tavallista mukavammin. Tarkista ajantasaiset hinnat ja saatavuus suoraan majoittajalta.",
      es: "Cabañas en los árboles y tiendas glamping en medio del bosque. Consulta los precios y la disponibilidad actuales con el proveedor.",
      en: "Tree houses and glamping tents in the forest. Check current rates and availability directly with the provider."
    },
    location: "Kimitoön, near Salo region",
    region: "Southwest Finland",
    pricePerNight: 70,
    images: [],
    features: ["glamping", "forest", "smoke sauna", "villas", "slow travel"],
    maxGuests: 6, bedrooms: 1, coordinates: { lat: 60.160, lng: 22.740 }, type: "glamping",
    bookingUrl: "https://www.storfinnhova.com/majoitus/", provider: "Storfinnhova Gård",
    priceNote: { fi: "Tarkista ajantasainen hinta ja saatavuus suoraan palveluntarjoajalta.", es: "Confirma el precio y la disponibilidad actuales directamente con el proveedor.", en: "Confirm current price and availability directly with the provider." }
  },
  {
    id: "c7", slug: "naantali-camping", name: { fi: "Naantali Camping – mökit ja teltat", es: "Naantali Camping – cabañas y tiendas", en: "Naantali Camping – Cabins & Tents" },
    description: {
      fi: "Meren äärellä aivan Naantalin keskustan tuntumassa. Tarjolla on mökkimajoitusta ja telttapaikkoja; tarkista ajantasainen tarjonta suoraan leirintäalueelta.",
      es: "Camping junto al mar cerca del centro de Naantali, con cabañas y parcelas para tiendas. Confirma la oferta actual directamente con el camping.",
      en: "Seaside camping close to Naantali centre, with cottages and tent pitches. Confirm the current offering directly with the campsite."
    },
    location: "Naantali",
    region: "Southwest Finland",
    pricePerNight: 69,
    images: [naantaliSummer],
    features: ["sea", "cabin", "tent", "sauna", "beach"],
    maxGuests: 6, bedrooms: 2, coordinates: { lat: 60.462, lng: 22.015 }, type: "cabin",
    bookingUrl: "https://naantalicamping.bookingonline.fi/stable/index.jsp?kieli=UKN", provider: "Naantali Camping",
    priceNote: { fi: "Tarkista ajantasainen hinta ja saatavuus suoraan leirintäalueelta.", es: "Confirma el precio y la disponibilidad actuales directamente con el camping.", en: "Confirm current rates and availability directly with the campsite." }
  },
  {
    id: "c11", slug: "havsvidden", name: { fi: "Havsvidden – Ahvenanmaan kallioranta", es: "Havsvidden – costa rocosa de Åland", en: "Havsvidden – Åland Sea Cliffs" },
    description: {
      fi: "Pohjois-Ahvenanmaan näyttävä resort punaisilla graniittikallioilla. Meri, sauna, ravintola ja rauhallinen ympäristö tekevät paikasta kiinnostavan ylelliseen saaristolomaan.",
      es: "Resort espectacular sobre acantilados de granito rojo en el norte de Åland, con mar, sauna, restaurante y naturaleza.",
      en: "A striking resort on northern Åland's red granite cliffs, with sea, sauna, restaurant and archipelago nature."
    },
    location: "Geta, Åland",
    region: "Åland",
    pricePerNight: 200,
    images: [],
    features: ["sea cliffs", "sauna", "restaurant", "pool", "nature"],
    maxGuests: 4, bedrooms: 2, coordinates: { lat: 60.380, lng: 19.820 }, type: "villa",
    bookingUrl: "https://www.havsvidden.com/en", provider: "Havsvidden Resort",
    priceNote: { fi: "Hinta vaihtelee huonetyypin ja ajankohdan mukaan. Tarkista suoraan palveluntarjoajalta.", es: "La tarifa depende del alojamiento y las fechas. Confirma con el proveedor.", en: "Rates vary by accommodation and dates. Confirm directly with the provider." }
  },
];

export const experiences: Experience[] = [
  { id:"e1", slug:"smoke-sauna-summer", name:{fi:"Savusauna ja järvi-ilta",es:"Sauna de humo y lago",en:"Smoke Sauna & Lake Evening"}, description:{fi:"Aito suomalainen savusauna, rauhallinen uintipaikka ja pitkä kesäilta. Sisältö ja saatavuus määräytyvät palveluntarjoajan mukaan.",es:"Una auténtica sauna de humo finlandesa, baño y una larga tarde de verano.",en:"An authentic Finnish smoke sauna, a swim and a long Nordic summer evening."}, shortDescription:{fi:"Pehmeät löylyt ja uinti luonnon keskellä",es:"Sauna suave y baño en la naturaleza",en:"Soft sauna heat and a swim in nature"}, price:45, duration:"2–3 h", images:[photoLibrary.sauna], category:"sauna", region:"Southwest Finland", maxParticipants:10 },
  { id:"e2", slug:"teijo-kayaking", name:{fi:"Melonta Teijon vesillä",es:"Kayak en Teijo",en:"Kayaking in Teijo"}, description:{fi:"Vuokraa kanootti, kajakki tai SUP-lauta ja lähde Matildanjärven rauhallisille vesille. Natura Viva tarjoaa välinevuokrausta Teijon kansallispuiston alueella.",es:"Alquila un kayak, canoa o SUP y explora las tranquilas aguas de Teijo.",en:"Rent a kayak, canoe or SUP and explore the calm waters around Teijo National Park."}, shortDescription:{fi:"Vesi, metsä ja oma retki omaan tahtiin",es:"Agua, bosque y aventura a tu ritmo",en:"Water, forest and an adventure at your own pace"}, price:35, duration:"2–6 h", images:[finnishSummerLake], category:"cruise", region:"Southwest Finland", maxParticipants:8, providerName:"Natura Viva", providerUrl:"https://www.naturaviva.fi/" },
  { id:"e3", slug:"archipelago-cycling", name:{fi:"Saaristopyöräily",es:"Ciclismo por el archipiélago",en:"Archipelago Cycling"}, description:{fi:"Rauhallinen pyöräilypäivä saaristoteillä, kylissä ja satamissa. Reitin voi rakentaa lyhyeksi päiväretkeksi tai useamman päivän lomaksi.",es:"Un día tranquilo en bicicleta por islas, pueblos y puertos. Puedes hacer una excursión o varios días.",en:"A relaxed cycling day through islands, villages and harbours, from a day trip to a multi-day ride."}, shortDescription:{fi:"Pyörällä meren, kylien ja saariston keskellä",es:"En bici entre mar, pueblos e islas",en:"Cycle between sea, villages and islands"}, price:25, duration:"1 päivä", images:[archipelagoRoad], category:"hiking", region:"Southwest Finland", maxParticipants:10 },
  { id:"e4", slug:"viking-island-naantali", name:{fi:"Viikinkisaari-päivä",es:"Día en la isla vikinga",en:"Viking Island Day"}, description:{fi:"Kesäinen saaristopäivä, jossa yhdistyvät veneily, saaritunnelma ja historiallinen ohjelma. Saatavuus ja ohjelma tarkistetaan palveluntarjoajalta.",es:"Un día de verano en una isla con barco, ambiente de archipiélago y programa histórico.",en:"A summer island day combining a boat trip, archipelago atmosphere and historical activities."}, shortDescription:{fi:"Saaripäivä ja pala viikinkiajan tunnelmaa",es:"Un día de isla con ambiente vikingo",en:"An island day with a touch of Viking history"}, price:55, duration:"puolipäivä", images:[naantaliSummer], category:"culture", region:"Naantali", maxParticipants:20, providerName:"Visit Naantali", providerUrl:"https://visitnaantali.com/" },
  { id:"e5", slug:"moominworld-naantali", name:{fi:"Muumimaailma Naantalissa",es:"Moominworld en Naantali",en:"Moominworld in Naantali"}, description:{fi:"Naantalin kesän klassikko. Tarkista päiväliput ja aukiolo suoraan Muumimaailmasta.",es:"Un clásico del verano en Naantali. Comprueba entradas y horarios directamente con Moominworld.",en:"A classic Naantali summer day. Check tickets and opening times directly with Moominworld."}, shortDescription:{fi:"Kesäpäivä Muumien maailmassa",es:"Un día de verano en el mundo de los Moomins",en:"A summer day in the Moomin world"}, price:0, duration:"1 päivä", images:[photoLibrary.naantaliHarbour], category:"culture", region:"Naantali", maxParticipants:0, providerName:"Muumimaailma", providerUrl:"https://www.muumimaailma.fi/" },
  { id:"e6", slug:"local-food-mathildedal", name:{fi:"Mathildedalin paikalliset maut",es:"Sabores locales de Mathildedal",en:"Local Flavours of Mathildedal"}, description:{fi:"Kyläpanimo, kahvilat, ravintolat, leipomot ja pienet puodit. Rakennetaan lomapäivä paikallisten palveluiden ympärille ilman valmista matkapakettia.",es:"Cervecería, cafés, restaurantes, panadería y pequeñas tiendas. Diseña tu propio día con negocios locales.",en:"Brewery, cafés, restaurants, bakery and small shops. Build your own day around local businesses instead of a package."}, shortDescription:{fi:"Syö, kahvittele ja tutustu ruukkikylän pienyrittäjiin",es:"Come, toma café y descubre los pequeños negocios",en:"Eat, drink coffee and discover local makers"}, price:0, duration:"oma tahti", images:[mathildedalHouse], category:"food", region:"Mathildedal", maxParticipants:0, providerName:"Visit Mathildedal", providerUrl:"https://visitmathildedal.fi/" },
  { id:"e7", slug:"summer-fishing-sarkisalo", name:{fi:"Kalastus Särkisalon saaristossa",es:"Pesca en Särkisalo",en:"Fishing in Särkisalo"}, description:{fi:"Särkisalon saaristo sopii rauhalliseen kalastuslomaan. Mökkimajoitukseen voi yhdistää veneen tai kalastusoppaan palveluntarjoajan kautta.",es:"El archipiélago de Särkisalo es ideal para unas vacaciones tranquilas de pesca.",en:"The Särkisalo archipelago is a strong setting for a quiet fishing holiday, with boats and guides available through local providers."}, shortDescription:{fi:"Meri, mökki, vene ja rauhallinen kalastuspäivä",es:"Mar, cabaña, barco y pesca tranquila",en:"Sea, cottage, boat and a quiet day of fishing"}, price:0, duration:"1 päivä", images:[finnishCottage], category:"cruise", region:"Särkisalo", maxParticipants:6, providerName:"Chill Out Fishing", providerUrl:"https://www.chilloutfishing.fi/" },
  { id:"e8", slug:"juhannus-by-the-sea", name:{fi:"Juhannus meren rannalla",es:"San Juan junto al mar",en:"Midsummer by the Sea"}, description:{fi:"Kokko, sauna, savukala, uudet perunat, uinti ja valoisa ilta – vain silloin kun palveluntarjoaja järjestää nämä palvelut. Sivusto auttaa löytämään paikan, ei myy pakettia.",es:"Hoguera, sauna, pescado ahumado, patatas nuevas, baño y una noche luminosa, según la oferta local.",en:"Bonfire, sauna, smoked fish, new potatoes, swimming and a bright Nordic evening, depending on local providers."}, shortDescription:{fi:"Suomalainen juhannus – meri, sauna ja valoisa yö",es:"San Juan finlandés: mar, sauna y noche luminosa",en:"Finnish Midsummer: sea, sauna and a bright night"}, price:0, duration:"kesäilta", images:[summerMathildedal], category:"culture", region:"Southern Finland", maxParticipants:0 }
];

export const blogPosts: BlogPost[] = [
  { id:"b1", slug:"finnish-summer-holiday", title:{fi:"Suomen kesä: näin vietät viikon tai kaksi rauhassa",es:"Verano finlandés: una o dos semanas sin prisas",en:"Finnish summer: how to spend one or two weeks slowly"}, excerpt:{fi:"Mökki, sauna, meri, pyöräily ja pitkät illat – et tarvitse kiireistä ohjelmaa hyvään lomaan.",es:"Cabaña, sauna, mar, ciclismo y largas tardes: no necesitas un itinerario lleno.",en:"Cottage, sauna, sea, cycling and long evenings – you do not need a packed itinerary for a great holiday."}, content:{fi:"Suomen kesä toimii parhaiten silloin, kun jätät kalenteriin tilaa.",es:"El verano finlandés funciona mejor cuando dejas espacio en el calendario.",en:"Finnish summer works best when you leave space in the calendar."}, image:summerMathildedal, author:"Finland Experience", publishedAt:"2026-06-01", tags:["summer","slow-travel","sauna","cottages"] },
  { id:"b2", slug:"mathildedal-guide", title:{fi:"Mathildedal: ruukkikylä, jossa loma hidastuu",es:"Mathildedal: el pueblo donde el ritmo se detiene",en:"Mathildedal: the village where the pace slows down"}, excerpt:{fi:"Majoitus, Teijon kansallispuisto, meri, sauna ja paikalliset maut samassa pienessä kylässä.",es:"Alojamiento, parque nacional, mar, sauna y sabores locales en un pequeño pueblo.",en:"Accommodation, national park, sea, sauna and local flavours in one small village."}, content:{fi:"Mathildedalissa historia ja luonto ovat kävelyetäisyydellä toisistaan.",es:"En Mathildedal la historia y la naturaleza están a poca distancia.",en:"In Mathildedal, history and nature are within an easy walk."}, image:summerMathildedal, author:"Finland Experience", publishedAt:"2026-06-15", tags:["mathildedal","salo","summer"] },
];

export function getLocalized<T extends Record<Locale, string>>(obj: T, locale: Locale): string { return obj[locale] || obj.en; }
