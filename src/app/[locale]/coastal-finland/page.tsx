import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Bike, Coffee, Leaf, MapPin, Waves, Utensils, Flame } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

type Localized = Record<Locale, string>;

type Place = {
  slug: string;
  name: Localized;
  region: Localized;
  image: string;
  imageAlt: Localized;
  intro: Localized;
  stay: Localized;
  food: Localized;
  do: Localized;
  nature: Localized;
  sauna: Localized;
  official: string;
  officialLabel: Localized;
  providers: Array<{ name: Localized; text: Localized; url: string }>;
};

const places: Place[] = [
  {
    slug: "mathildedal",
    name: { fi: "Mathildedal & Teijo", es: "Mathildedal & Teijo", en: "Mathildedal & Teijo" },
    region: { fi: "Salo · Lounais-Suomi", es: "Salo · Suroeste de Finlandia", en: "Salo · Southwest Finland" },
    image: photoLibrary.mathildedalHarbour,
    imageAlt: { fi: "Mathildedalin satama ja meri", es: "Puerto y mar de Mathildedal", en: "Mathildedal harbour and sea" },
    intro: {
      fi: "Mathildedal on historiallinen ruukkikylä meren ja Teijon kansallispuiston välissä. Ruukkimiljöö, pienet putiikit, kahvilat, ravintolat ja luonto tekevät paikasta poikkeuksellisen helposti lähestyttävän Slow Finland -kohteen.",
      es: "Mathildedal es un histórico pueblo siderúrgico entre el mar y el Parque Nacional de Teijo. Su mezcla de patrimonio industrial, pequeñas tiendas, cafés, restaurantes y naturaleza convierte el lugar en una escapada muy especial.",
      en: "Mathildedal is a historic ironworks village between the sea and Teijo National Park. Its combination of industrial heritage, small shops, cafés, restaurants and nature makes it a distinctive slow-travel destination.",
    },
    stay: {
      fi: "Majoitustarjonta ulottuu boutique-hotellista ja kattohuoneista merenrantamökkeihin, glampingiin sekä Teijon kansallispuiston lähellä oleviin luontomajoituksiin.",
      es: "El alojamiento va desde hoteles boutique y habitaciones panorámicas hasta cabañas junto al mar, glamping y alojamientos de naturaleza cerca del parque.",
      en: "Stay options range from boutique hotels and rooftop rooms to seaside cottages, glamping and nature accommodation close to the national park.",
    },
    food: {
      fi: "Mathildedalissa ruoka on osa kyläkokemusta: sesongin raaka-aineita, paikallisia makuja, merenrantaravintoloita, kahviloita, omaa pienpanimoa ja kyläpaahtimoa.",
      es: "La gastronomía forma parte de la experiencia: ingredientes de temporada, sabores locales, restaurantes junto al mar, cafés, cerveza artesanal y café tostado en el propio pueblo.",
      en: "Food is part of the village experience: seasonal ingredients, local flavours, seaside dining, cafés, craft beer and coffee roasted in the village.",
    },
    do: {
      fi: "Teijon reiteille voi lähteä jalan, pyörällä tai vesille. Paikallisesti voi vuokrata pyöriä, fatbikeja, kajakkeja, kanootteja, SUP-lautoja ja soutuveneitä. Kalastus on alueen suosittu aktiviteetti.",
      es: "Puedes recorrer Teijo a pie, en bicicleta o sobre el agua. En la zona hay alquiler de bicicletas, fatbikes, kayaks, canoas, SUP y botes de remos, además de pesca.",
      en: "Explore Teijo on foot, by bike or on the water. Local rentals include bicycles, fatbikes, kayaks, canoes, SUP boards and rowing boats, while fishing is another popular activity.",
    },
    nature: {
      fi: "Teijon kansallispuistossa on noin 50 kilometriä merkittyjä reittejä järvien, metsien ja kallioiden keskellä. Mathildedalin meriuimapaikka tuo luonnon aivan kylän tuntumaan.",
      es: "El Parque Nacional de Teijo ofrece unos 50 kilómetros de rutas señalizadas entre lagos, bosques y rocas. También puedes nadar junto al pueblo en su zona costera.",
      en: "Teijo National Park offers around 50 kilometres of marked trails among lakes, forests and rocky landscapes. The village also has a seaside swimming spot close by.",
    },
    sauna: {
      fi: "Sauna kuuluu Mathildedalin vahvuuksiin: Matildanjärven saunat, jooga- ja saunailta sekä merenrannan saunaelämykset täydentävät luontopäivää.",
      es: "La sauna es una parte esencial de Mathildedal: saunas junto al lago Matildanjärvi, sesiones de yoga y sauna y experiencias junto al mar completan el día de naturaleza.",
      en: "Sauna is a natural part of the Mathildedal experience: lakeside saunas, yoga-and-sauna evenings and seaside sauna experiences complement a day outdoors.",
    },
    official: "https://www.visitmathildedal.fi/fi",
    officialLabel: { fi: "Tutustu Visit Mathildedaliin", es: "Descubre Visit Mathildedal", en: "Explore Visit Mathildedal" },
    providers: [
      { name: { fi: "Hotel Mathildedal", es: "Hotel Mathildedal", en: "Hotel Mathildedal" }, text: { fi: "Boutique-majoitusta historiallisessa ruukkimiljöössä.", es: "Alojamiento boutique en un entorno histórico.", en: "Boutique accommodation in a historic ironworks setting." }, url: "https://mathildedal.fi/" },
      { name: { fi: "Mathildan Marina", es: "Mathildan Marina", en: "Mathildan Marina" }, text: { fi: "Satamahotelli, ravintola, sauna ja vierasvenesatama meren äärellä.", es: "Hotel de puerto, restaurante, sauna y marina junto al mar.", en: "Harbour hotel, restaurant, sauna and guest marina by the sea." }, url: "https://www.mathildanmarina.fi/" },
      { name: { fi: "Matri House", es: "Matri House", en: "Matri House" }, text: { fi: "Historiallinen boutique-talo ja sesonkiravintola.", es: "Casa boutique histórica y restaurante de temporada.", en: "Historic boutique house and seasonal restaurant." }, url: "https://matrihouse.fi/" },
            { name: { fi: "Natura Viva / Teijon Luontokeskus", es: "Natura Viva / Centro de Visitantes de Teijo", en: "Natura Viva / Teijo Visitor Centre" }, text: { fi: "Luontokeskus, vuokrakalusto ja majoituspalveluita Matildanjärvellä.", es: "Centro de naturaleza, alquiler de equipo y alojamiento junto a Matildanjärvi.", en: "Nature centre, equipment rental and accommodation by Lake Matildanjärvi." }, url: "https://naturaviva.fi/" },
      { name: { fi: "Meri-Ruukin lomakylä", es: "Meri-Ruukin", en: "Meri-Ruukki Holiday Village" }, text: { fi: "Kuuden hengen loma-asuntoja, merenrantasauna, ranta, laituri ja soutuveneitä Mathildedalin lähellä.", es: "Alojamientos para seis, sauna junto al mar, playa, embarcadero y botes de remos cerca de Mathildedal.", en: "Six-person holiday homes, seaside sauna, beach, pier and rowing boats near Mathildedal." }, url: "https://meri-ruukki.fi/" },
      { name: { fi: "Bistro Bruket", es: "Bistro Bruket", en: "Bistro Bruket" }, text: { fi: "Bistro, lounas, á la carte, BBQ ja kesäinen terassi meren äärellä.", es: "Bistró con menú, almuerzo, BBQ y terraza de verano junto al mar.", en: "A bistro with lunch, à la carte, BBQ and a summer terrace by the sea." }, url: "https://bistrobruket.fi/" },
      { name: { fi: "Kyläravintola Terho", es: "Kyläravintola Terho", en: "Kyläravintola Terho" }, text: { fi: "Kylän olohuone, ruokaa, livemusiikkia, Beer Garden ja kyläpaahtimon kahvit.", es: "Restaurante local con música en directo, Beer Garden y café tostado en el pueblo.", en: "A village living room with food, live music, a Beer Garden and locally roasted coffee." }, url: "https://www.ravintolaterho.fi/" },
      { name: { fi: "Café Mathildedal", es: "Café Mathildedal", en: "Café Mathildedal" }, text: { fi: "Tuoreita leivonnaisia, kakkuja, suolaisia herkkuja ja pannukahvia historiallisessa miljöössä.", es: "Pastelería casera, tartas, salados y café preparado en un entorno histórico.", en: "Fresh pastries, cakes, savoury treats and coffee in a historic setting." }, url: "https://mathildedal.fi/" },
      { name: { fi: "Mathildedalin Kyläpanimo", es: "Mathildedalin Kyläpanimo", en: "Mathildedal Village Brewery" }, text: { fi: "Olutpuoti ja panimokierrokset sekä paikallisia juomia.", es: "Tienda de cerveza, visitas a la cervecería y bebidas locales.", en: "A beer shop, brewery visits and local drinks." }, url: "https://kylapanimo.fi/" },
      { name: { fi: "Meri-Teijo Bike Park", es: "Meri-Teijo Bike Park", en: "Meri-Teijo Bike Park" }, text: { fi: "Maasto- ja alamäkipyöräilyä, pyörävuokrausta, opetusta ja retkiä Teijon kupeessa.", es: "Mountain biking, alquiler de bicicletas, instrucción y rutas junto a Teijo.", en: "Mountain biking, bike rental, instruction and guided rides beside Teijo." }, url: "https://www.meriteijobikepark.com/" },
      { name: { fi: "Meri-Teijo Golf", es: "Meri-Teijo Golf", en: "Meri-Teijo Golf" }, text: { fi: "18-reikäinen merellinen golfkenttä kansallispuiston ja meren välissä.", es: "Campo de 18 hoyos junto al mar y al parque nacional.", en: "An 18-hole course bordered by the sea and the national park." }, url: "https://www.meriteijogolf.fi/" },
    ],
  },
  {
    slug: "naantali",
    name: { fi: "Naantali & saaristo", es: "Naantali y el archipiélago", en: "Naantali & the Archipelago" },
    region: { fi: "Naantali · Turun seutu", es: "Naantali · Región de Turku", en: "Naantali · Turku region" },
    image: photoLibrary.naantaliOldTown,
    imageAlt: { fi: "Naantalin vanhakaupunki", es: "Casco antiguo de Naantali", en: "Old Town of Naantali" },
    intro: {
      fi: "Naantali yhdistää vanhankaupungin, sataman, meren ja saariston. Se on helppo paikka aloittaa saaristopäivä, ja pienempi Saariston rengastie tarjoaa yhden tai kahden päivän oman retken.",
      es: "Naantali combina casco antiguo, puerto, mar y archipiélago. Es un punto de partida natural para el mar y para la Small Archipelago Trail.",
      en: "Naantali brings together its Old Town, harbour, sea and islands. It is an easy base for the coast and for a one- or two-day trip around the Small Archipelago Trail.",
    },
    stay: {
      fi: "Majoitukseen kuuluu kaupunkihotelleja, lomakeskuksia, saariston mökkejä ja muita meren läheisiä vaihtoehtoja. Saaristoreitin varrella on myös Herrankukkaro ja muita kohteita.",
      es: "La oferta incluye hoteles, resorts, cabañas del archipiélago y alojamientos junto al mar. En la ruta también aparecen lugares como Herrankukkaro.",
      en: "Choose from city hotels, resorts, archipelago cottages and other seaside stays. The route also connects to places such as Herrankukkaro.",
    },
    food: {
      fi: "Vanhankaupungin ravintolat, sataman terassit ja saariston kylät tarjoavat kalaa, saaristolaisruokaa, kahviloita ja kesäisiä pysähdyksiä.",
      es: "Los restaurantes del casco antiguo, las terrazas del puerto y los pueblos de las islas ofrecen pescado, cocina del archipiélago y cafés.",
      en: "Old Town restaurants, harbour terraces and island villages offer fish, archipelago flavours and relaxed café stops.",
    },
    do: {
      fi: "Muumimaailma, Kultarannan puutarha, vanhakaupunki, uimapaikat ja saariston reitit muodostavat monipuolisen päiväohjelman. Saariston pieni rengas on noin 120 km.",
      es: "Moominworld, los jardines de Kultaranta, el casco antiguo, playas y rutas del archipiélago ofrecen muchas opciones. La Small Archipelago Trail tiene unos 120 km.",
      en: "Moominworld, Kultaranta gardens, the Old Town, beaches and island routes create an easy mix of experiences. The Small Archipelago Trail is about 120 km.",
    },
    nature: {
      fi: "Saaristoa voi kokea maanteitse, pyörällä ja yhteysaluksilla. Luonnonmaalla ja Rymättylässä on lyhyitä luontopolkuja, näköalapaikkoja ja meren rantaa.",
      es: "Puedes explorar el archipiélago por carretera, en bicicleta y con barcos de conexión. Luonnonmaa y Rymättylä ofrecen senderos cortos, miradores y costa.",
      en: "Explore the archipelago by road, bike and connecting vessels. Luonnonmaa and Rymättylä offer short nature trails, viewpoints and coastal scenery.",
    },
    sauna: {
      fi: "Herrankukkaro tuo saaristoon savusaunan, uimisen ja merenrannan hyvinvointielämyksiä. Lopulliset varaukset tehdään suoraan palveluntarjoajalla.",
      es: "Herrankukkaro aporta sauna de humo, baños y bienestar junto al mar. Las reservas se realizan directamente con el proveedor.",
      en: "Herrankukkaro adds smoke sauna, swimming and seaside wellness to the archipelago experience. Bookings are handled directly by the provider.",
    },
    official: "https://visitnaantali.com/en/front-page/",
    officialLabel: { fi: "Tutustu Visit Naantaliin", es: "Descubre Visit Naantali", en: "Explore Visit Naantali" },
    providers: [
      { name: { fi: "Herrankukkaro", es: "Herrankukkaro", en: "Herrankukkaro" }, text: { fi: "Saaristokylä, savusaunat ja hyvinvointielämykset Rymättylässä.", es: "Pueblo del archipiélago, saunas de humo y bienestar en Rymättylä.", en: "Archipelago village, smoke saunas and wellness in Rymättylä." }, url: "https://www.herrankukkaro.fi/" },
      { name: { fi: "Kultaranta Resort", es: "Kultaranta Resort", en: "Kultaranta Resort" }, text: { fi: "Majoitusta, ravintola ja saariston palveluja.", es: "Alojamiento, restaurante y servicios del archipiélago.", en: "Accommodation, restaurant and archipelago services." }, url: "https://kultarantaresort.fi/" },
      { name: { fi: "Moominworld", es: "Moominworld", en: "Moominworld" }, text: { fi: "Naantalin tunnettu kesäkohde lapsiperheille.", es: "Atracción de verano conocida para familias.", en: "A major summer attraction for families." }, url: "https://www.moominworld.fi/" },
    ],
  },
  {
    slug: "turku-archipelago",
    name: { fi: "Turku & Turun saaristo", es: "Turku y el archipiélago de Turku", en: "Turku & the Turku Archipelago" },
    region: { fi: "Turku · Aurajoki · saaristo", es: "Turku · río Aura · archipiélago", en: "Turku · Aura River · archipelago" },
    image: photoLibrary.turkuAura,
    imageAlt: { fi: "Aurajoki Turussa", es: "Río Aura en Turku", en: "Aura River in Turku" },
    intro: {
      fi: "Turku on rannikkokaupunki, jossa kaupungin historia ja saaristo liittyvät toisiinsa luonnollisesti. Aurajoki, Turun linna, museot, ruoka ja saaristopäivät tekevät siitä vahvan tukikohdan.",
      es: "Turku es una ciudad costera donde historia y archipiélago están estrechamente conectados. El río Aura, el castillo, los museos, la gastronomía y las islas forman una base muy completa.",
      en: "Turku is a coastal city where history and the archipelago naturally meet. The Aura River, castle, museums, food and island days make it a strong base.",
    },
    stay: {
      fi: "Keskustan hotellit toimivat tukikohtana, mutta kaupungista voi jatkaa nopeasti saaristoon ja saariston majoituksiin.",
      es: "Los hoteles del centro funcionan como base, con fácil acceso a alojamientos del archipiélago para noches más tranquilas.",
      en: "Central hotels make an easy base, while nearby archipelago stays offer a slower alternative by the sea.",
    },
    food: {
      fi: "Aurajoen rantaa reunustavat ravintolat ja kesäterassit. Paikallisissa listoissa näkyy saariston kala, sesonkiraaka-aineet ja moderni suomalainen keittiö.",
      es: "Las orillas del Aura reúnen restaurantes y terrazas. Encontrarás pescado del archipiélago, ingredientes de temporada y cocina finlandesa moderna.",
      en: "The Aura River waterfront is lined with restaurants and summer terraces, with archipelago fish, seasonal ingredients and modern Finnish cuisine.",
    },
    do: {
      fi: "Turun linnan ja vanhan kaupungin historian voi yhdistää jokirantaan, museoihin, designiin ja saaristopäivään. Visit Turku nostaa esiin myös veden päällä liikkumisen.",
      es: "Combina el castillo, la historia y los museos con el río, el diseño y una jornada en las islas. Visit Turku también destaca las experiencias sobre el agua.",
      en: "Combine the castle, history and museums with the riverfront, design and a day in the islands. Visit Turku also highlights ways to experience the water.",
    },
    nature: {
      fi: "Ruissalon saari, saaristoreitit ja kaupungin lähiluonto tuovat merellisen ympäristön lähelle myös lyhyellä lomalla.",
      es: "La isla de Ruissalo, las rutas del archipiélago y la naturaleza cercana acercan el mar incluso en una escapada corta.",
      en: "Ruissalo, archipelago routes and nearby nature bring the sea close even on a short city break.",
    },
    sauna: {
      fi: "Turun seudulla saunan voi yhdistää saaristopäivään tai rantaympäristöön. Valitse palveluntarjoaja kohdekohtaisesti ja tarkista aukiolo ennen matkaa.",
      es: "En la región de Turku puedes combinar la sauna con un día en el archipiélago o junto al agua. Comprueba siempre la oferta y los horarios con el proveedor.",
      en: "Around Turku, sauna can be combined with an archipelago day or seaside stay. Check the exact offer and opening hours directly with the provider.",
    },
    official: "https://en.visitturku.fi/see-and-do",
    officialLabel: { fi: "Tutustu Visit Turkuun", es: "Descubre Visit Turku", en: "Explore Visit Turku" },
    providers: [
      { name: { fi: "River Taxi", es: "River Taxi", en: "River Taxi" }, text: { fi: "Puinen jokivene, jolla voi liikkua Aurajoella ja kohti Ruissaloa.", es: "Barco de madera para recorrer el Aura y acercarse a Ruissalo.", en: "A traditional wooden boat experience on the Aura River and towards Ruissalo." }, url: "https://en.visitturku.fi/see-and-do" },
      { name: { fi: "Nauvo Marina", es: "Nauvo Marina", en: "Nauvo Marina" }, text: { fi: "Saariston satama, josta Turun suunnalta voi jatkaa saaristopäivään.", es: "Puerto del archipiélago para continuar la ruta hacia las islas.", en: "Archipelago harbour for continuing deeper into the islands." }, url: "https://en.visitturku.fi/see-and-do" },
      { name: { fi: "OOBU", es: "OOBU", en: "OOBU" }, text: { fi: "Saaristovaikutteista ruokaa Aurajoen äärellä.", es: "Cocina con inspiración del archipiélago junto al Aura.", en: "Archipelago-inspired food by the Aura River." }, url: "https://en.visitturku.fi/turkus-unique-spots-and-hidden-gems" },
    ],
  },
  {
    slug: "hanko",
    name: { fi: "Hanko & läntinen rannikko", es: "Hanko y la costa oeste", en: "Hanko & the Western Coast" },
    region: { fi: "Hanko · Suomen eteläkärki", es: "Hanko · extremo sur de Finlandia", en: "Hanko · southernmost Finland" },
    image: photoLibrary.hanko,
    imageAlt: { fi: "Hanko ilmasta", es: "Hanko desde el aire", en: "Hanko from the air" },
    intro: {
      fi: "Hanko on meri kolmelta suunnalta. Eteläinen sijainti, hiekkarannat, sileät kalliot, huvilat ja satamat antavat kaupungille oman kylpyläkaupunkimaisen tunnelmansa.",
      es: "Hanko está rodeado por el mar en tres lados. Su costa, playas, rocas, villas y puertos crean una identidad propia de ciudad balnearia.",
      en: "Hanko is surrounded by the sea on three sides. Beaches, smooth rocks, villas and harbours give the town a distinctive seaside-resort character.",
    },
    stay: {
      fi: "Hankoon sopivat erityisesti hotellit, huvilat ja muut rannikon majoitukset, joista on helppo siirtyä rannoille ja satamaan.",
      es: "Los hoteles, villas y alojamientos costeros de Hanko facilitan combinar playa, puerto y naturaleza.",
      en: "Hotels, villas and coastal accommodation make it easy to combine beaches, the harbour and nature.",
    },
    food: {
      fi: "Sataman ympärillä on ravintoloita ja kesäterasseja, ja kesäpäivään sopii pysähdys meren äärellä ennen iltakävelyä rannoilla.",
      es: "El puerto concentra restaurantes y terrazas de verano, ideales para combinar comida, mar y paseos nocturnos.",
      en: "The harbour area brings together restaurants and summer terraces, ideal for pairing food with the sea and evening walks.",
    },
    do: {
      fi: "Hanko tarjoaa uintia, melontaa, leijalautailua, lintujen tarkkailua, kävelyä rannoilla ja pyöräilyä. Kaupungin pitkä rantaviiva on yksi kohteen suurista vahvuuksista.",
      es: "Puedes nadar, practicar kayak y kitesurf, observar aves, caminar por la costa y recorrer Hanko en bicicleta.",
      en: "Swim, kayak, kitesurf, birdwatch, walk the coast or cycle around Hanko. Its long shoreline is one of the town's defining strengths.",
    },
    nature: {
      fi: "Hankoa ympäröi noin 130 kilometriä rantaviivaa, josta noin 30 kilometriä on hiekkarantaa. Uddskatan, Tvärminnen ja Puistovuorten kalliot tarjoavat erilaisia merimaisemia.",
      es: "Hanko tiene aproximadamente 130 km de costa, de los cuales unos 30 km son playas de arena. Uddskatan, Tvärminne y Puistovuoret muestran distintas caras del litoral.",
      en: "Hanko has about 130 km of shoreline, including roughly 30 km of sandy beaches. Uddskatan, Tvärminne and Puistovuoret show different coastal landscapes.",
    },
    sauna: {
      fi: "Sauna sopii Hankoon erityisesti meren läheisyydessä, mutta yksittäiset palvelut kannattaa tarkistaa suoraan majoitus- tai saunapalvelulta.",
      es: "La sauna encaja naturalmente con una estancia junto al mar, pero la oferta concreta debe verificarse directamente con el proveedor.",
      en: "Sauna fits naturally with a seaside stay, but exact services should be checked directly with the accommodation or sauna provider.",
    },
    official: "https://visithanko.fi/en/",
    officialLabel: { fi: "Tutustu Visit Hankoon", es: "Descubre Visit Hanko", en: "Explore Visit Hanko" },
    providers: [
      { name: { fi: "Visit Hanko", es: "Visit Hanko", en: "Visit Hanko" }, text: { fi: "Virallinen opas rantoihin, luontoon, tapahtumiin ja majoitukseen.", es: "Guía oficial de playas, naturaleza, eventos y alojamiento.", en: "Official guide to beaches, nature, events and accommodation." }, url: "https://visithanko.fi/en/" },
    ],
  },
  {
    slug: "aland",
    name: { fi: "Ahvenanmaa", es: "Åland", en: "Åland Islands" },
    region: { fi: "Saaristomeri · Ahvenanmaa", es: "Mar del Archipiélago · Åland", en: "Archipelago Sea · Åland" },
    image: photoLibrary.aland,
    imageAlt: { fi: "Ahvenanmaan saaristomaisema", es: "Paisaje del archipiélago de Åland", en: "Åland archipelago landscape" },
    intro: {
      fi: "Ahvenanmaa on kokonainen saaristomaailma: pienet kylät, sillat, lautat, punainen graniitti, meri, pyöräily ja ruokapaikat tekevät hitaasta liikkumisesta osan itse matkaa.",
      es: "Åland es un mundo de islas, pequeños pueblos, puentes, ferris, granito rojo, mar, ciclismo y restaurantes. El desplazamiento lento forma parte de la experiencia.",
      en: "Åland is a world of islands, small villages, bridges, ferries, red granite, sea, cycling and food. Moving slowly is part of the experience.",
    },
    stay: {
      fi: "Majoitusta löytyy hotelleista, mökeistä, B&B-paikoista, leirintäalueista ja saariston pienistä majoituskohteista. Monet mökit sopivat ympärivuotiseen käyttöön.",
      es: "Hay hoteles, cabañas, B&B, camping y pequeños alojamientos del archipiélago. Muchas cabañas funcionan durante todo el año.",
      en: "Choose from hotels, cottages, B&Bs, camping and small archipelago stays. Many cottages are available year-round.",
    },
    food: {
      fi: "Pyöräilyreitit yhdistävät ravintoloita ja kahviloita, ja kesällä paikalliset saaristopaikat ovat tärkeä osa matkantekoa.",
      es: "Las rutas en bicicleta conectan restaurantes y cafés, y en verano la gastronomía local forma parte esencial del viaje.",
      en: "Cycling routes connect restaurants and cafés, making local food part of the journey, especially in summer.",
    },
    do: {
      fi: "Ahvenanmaan saariston reiteillä voi pyöräillä saarelta toiselle siltojen ja lauttayhteyksien avulla. Matkaa voi jatkaa myös Suomen saaristoreitille.",
      es: "Puedes recorrer el archipiélago en bicicleta, cruzando puentes y utilizando ferris entre las islas. También puedes combinar la ruta con el archipiélago finlandés.",
      en: "Cycle across islands using bridges and ferries, then combine the Åland route with the Finnish Archipelago Trail.",
    },
    nature: {
      fi: "Kastelholm, saariston avoimet maisemat, metsät ja rannat tuovat luontoa lähelle. Pienissä saaristokunnissa yöpyminen hidastaa matkaa tarkoituksella.",
      es: "Kastelholm, bosques, costas y paisajes abiertos forman parte del atractivo. Pasar la noche en las islas hace que el viaje sea todavía más pausado.",
      en: "Kastelholm, forests, shorelines and open island landscapes are part of the appeal. Staying overnight on the smaller islands makes the journey even slower.",
    },
    sauna: {
      fi: "Monissa Ahvenanmaan mökeissä on oma sauna, ja saaristossa on myös sauna- ja kylpyläpalveluja. Tarkista kohdekohtainen tarjonta ja aukiolo palveluntarjoajalta.",
      es: "Muchas cabañas de Åland tienen sauna privada y también existen servicios de sauna y spa. Comprueba la oferta concreta con el proveedor.",
      en: "Many Åland cottages have a private sauna, and there are also sauna and spa services. Check the exact offer directly with the provider.",
    },
    official: "https://visitaland.com/en/",
    officialLabel: { fi: "Tutustu Visit Ålandiin", es: "Descubre Visit Åland", en: "Explore Visit Åland" },
    providers: [
      { name: { fi: "Visit Åland · mökit", es: "Visit Åland · cabañas", en: "Visit Åland · cottages" }, text: { fi: "Laaja mökki- ja saaristomajoitusten kooste.", es: "Amplia selección de cabañas y alojamientos del archipiélago.", en: "A broad selection of cottages and archipelago accommodation." }, url: "https://visitaland.com/en/accommodation/cottage/" },
      { name: { fi: "Visit Åland · pyöräily", es: "Visit Åland · ciclismo", en: "Visit Åland · cycling" }, text: { fi: "Pyöräilyreitit ja saaristoreitti lauttoineen.", es: "Rutas en bicicleta y la ruta del archipiélago con ferris.", en: "Cycling routes and the archipelago trail with ferries." }, url: "https://visitaland.com/en/experience/outdoor/cycle-in-aland/" },
      { name: { fi: "Visit Åland · hotellit", es: "Visit Åland · hoteles", en: "Visit Åland · hotels" }, text: { fi: "Hotelleja kaupungissa ja saaristossa.", es: "Hoteles en Mariehamn y en el archipiélago.", en: "Hotels in Mariehamn and the archipelago." }, url: "https://visitaland.com/en/accommodation/hotel/" },
    ],
  },
];

const sectionLabels = {
  fi: { stay: "Majoitus", food: "Ruoka & kahvilat", do: "Tekemistä", nature: "Luonto & meri", sauna: "Sauna", providers: "Poimittuja suoria linkkejä" },
  es: { stay: "Alojamiento", food: "Gastronomía y cafés", do: "Qué hacer", nature: "Naturaleza y mar", sauna: "Sauna", providers: "Enlaces directos seleccionados" },
  en: { stay: "Stay", food: "Food & cafés", do: "Things to do", nature: "Nature & sea", sauna: "Sauna", providers: "Selected direct links" },
} as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const c = locale === "fi"
    ? { title: "Rannikon Suomi | Mathildedal, Naantali, Turku, Hanko & Åland", description: "Ammattimainen opas Suomen rannikon viiteen kiinnostavaan lähtöpisteeseen: Mathildedal, Naantali, Turku, Hanko ja Ahvenanmaa." }
    : locale === "es"
      ? { title: "La Finlandia costera | Mathildedal, Naantali, Turku, Hanko y Åland", description: "Una guía en español por cinco puntos de partida de la costa finlandesa: Mathildedal, Naantali, Turku, Hanko y Åland." }
      : { title: "Coastal Finland | Mathildedal, Naantali, Turku, Hanko & Åland", description: "A curated guide to five starting points for experiencing Finland's coast: Mathildedal, Naantali, Turku, Hanko and Åland." };
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "coastal-finland" });
}

export default function CoastalFinlandPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isFi = locale === "fi";
  const copy = locale === "fi"
    ? { eyebrow: "HIDDEN COASTAL FINLAND", title: "Viisi rannikon paikkaa, joista on helppo aloittaa", intro: "Mathildedalin ruukkikylä, Naantalin saaristo, Turku, Hanko ja Ahvenanmaa näyttävät Suomen rannikon eri puolet. Täällä reitti ei ole paketti – sinä päätät, missä viivyt.", note: "Löydä ensin paikka. Tarkista sitten ajantasaiset palvelut ja jatka suoraan palveluntarjoajalle.", nearby: "Myös tämä kuuluu samaan merelliseen kokonaisuuteen", nearbyText: "Särkisalo täydentää Salon rannikkokokonaisuutta: mökkejä, satamia, ravintoloita, melontaa, kalastusta, rantoja ja paikallista saaristoelämää." }
    : locale === "es"
      ? { eyebrow: "HIDDEN COASTAL FINLAND", title: "Cinco lugares costeros para empezar", intro: "Mathildedal, Naantali, Turku, Hanko y Åland muestran distintas caras de la costa finlandesa. No es un paquete turístico: tú decides dónde parar y cuánto tiempo quedarte.", note: "Descubre primero el lugar. Después comprueba los servicios actuales y continúa directamente con el proveedor.", nearby: "También forma parte de la misma Finlandia marítima", nearbyText: "Särkisalo completa la costa de Salo con cabañas, puertos, restaurantes, kayak, pesca, playas y vida local del archipiélago." }
      : { eyebrow: "HIDDEN COASTAL FINLAND", title: "Five coastal places to start with", intro: "Mathildedal, Naantali, Turku, Hanko and Åland reveal different sides of Finland's coast. This is not a package tour: you choose where to stop and how long to stay.", note: "Discover the place first. Then check current services and continue directly with the provider.", nearby: "Part of the same coastal story", nearbyText: "Särkisalo completes the Salo coast with cottages, harbours, restaurants, kayaking, fishing, beaches and local island life." };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.title,
    itemListElement: places.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: place.name[locale],
      url: `${siteUrl}/${locale}/coastal-finland#${place.slug}`,
    })),
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.turkuArchipelagoHouse} alt={locale === "fi" ? "Suomen saaristomaisema" : locale === "es" ? "Paisaje del archipiélago finlandés" : "Finnish archipelago landscape"} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/30 via-brand-950/65 to-brand-950" />
        <div className="container-narrow relative py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-9">{copy.intro}</p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75 backdrop-blur">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />{copy.note}
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {places.map((place) => (
            <a key={place.slug} href={`#${place.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={place.image} alt={place.imageAlt[locale]} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-brand-600">{place.region[locale]}</p>
                <h2 className="mt-2 font-display text-xl font-bold text-brand-950">{place.name[locale]}</h2>
              </div>
            </a>
          ))}
        </div>
      </section>

      {places.map((place, index) => (
        <section key={place.slug} id={place.slug} className={index % 2 ? "bg-brand-50 py-16 sm:py-24" : "bg-white py-16 sm:py-24"}>
          <div className="container-narrow">
            <div className="grid gap-9 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div className={index % 2 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card">
                  <Image src={place.image} alt={place.imageAlt[locale]} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </div>
              </div>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{place.region[locale]}</p>
                <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-brand-950 sm:text-5xl">{place.name[locale]}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-700">{place.intro[locale]}</p>
                <a href={place.official} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
                  {place.officialLabel[locale]}<ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: BedDouble, title: sectionLabels[locale].stay, text: place.stay[locale] },
                { icon: Utensils, title: sectionLabels[locale].food, text: place.food[locale] },
                { icon: Bike, title: sectionLabels[locale].do, text: place.do[locale] },
                { icon: Leaf, title: sectionLabels[locale].nature, text: place.nature[locale] },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                  <Icon className="h-6 w-6 text-brand-700" />
                  <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>

            <article className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <Flame className="h-6 w-6 text-amber-600" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{sectionLabels[locale].sauna}</h3>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700">{place.sauna[locale]}</p>
            </article>

            <div className="mt-8">
              <h3 className="font-display text-2xl font-bold text-brand-950">{sectionLabels[locale].providers}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {place.providers.map((provider) => (
                  <a key={provider.name.en} href={provider.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
                    <h4 className="font-semibold text-brand-950">{provider.name[locale]}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{provider.text[locale]}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">{isFi ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit provider"}<ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="container-narrow grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{copy.nearby}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Särkisalo & Salo Coast</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">{copy.nearbyText}</p>
          </div>
          <Link href={`/${locale}/destinations/salo-mathildedal`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
            {locale === "fi" ? "Tutustu Salo & Mathildedaliin" : locale === "es" ? "Descubre Salo y Mathildedal" : "Explore Salo & Mathildedal"}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
