import type { Locale } from "@/types";

export type SaloArea = "mathildedal" | "teijo" | "sarkisalo" | "pernio" | "halikko" | "vaskio" | "suomusjarvi" | "salo" | "kisko" | "kuusjoki" | "kiikala" | "pertteli" | "muurla" | "marynummi" | "hajala" | "angelniemi" | "kirjakkala" | "mutainen";

export const areaProviderIds: Record<SaloArea, string[]> = {
  mathildedal: ["visit-mathildedal", "hotel-mathildedal", "mathildan-marina", "matilda-villas", "matri-house", "majoitus-mathildedal", "ravintola-terho", "mathildedal-brewery", "kattohuone-mathildedal", "meri-ruukin-lomakyla", "vuorovetten-jaatelo"],
  teijo: ["teijon-masuuni", "teijo-action-park", "teijo-national-park", "meri-teijo-golf", "matildanjarven-kampat", "teijo-tentsile", "teijon-kammari", "mutainen-lohenrengas"],
  sarkisalo: ["saaristomokit-sarkisalo", "forby-marina", "cafe-vinssi", "saaristoravintola-nixor", "villa-meri-sarkisalo", "tiiranta", "niksaaren-sauna", "sarkisalo-fishing", "forby-rantajooga", "villa-signell", "finnholm-strandbo", "aava-adventures", "katiskanmaeki", "lonnviken", "villa-nennebo", "meri-veikko", "kruuvan-mokit"],
  pernio: ["krailan-sabrina", "leipyolin-tila", "alaspaan-maatila"],
  halikko: ["topilan-tupa"],
  vaskio: ["onnenperan-mokki"],
  suomusjarvi: ["villa-viola", "villa-laperla", "villa-viktoria", "villa-frans"],
  salo: ["visit-salo", "salon-oppaat", "vuohensaari-camping", "chill-out-fishing"],
  kisko: ["kisko-pohjolan-tila", "kisko-metsaketun-kievari", "kisko-puutarha-siimes", "kisko-kalliolan-tila", "kisko-purolan-tila", "kisko-church"],
  kuusjoki: ["kuusjoki-kivisaaren-piapojauhoi", "kuusjoki-ohrakasken-tila", "kuusjoki-ellun-kanat", "kuusjoki-church"],
  kiikala: ["kiikala-ilolan-arboretum", "kiikala-rinteen-luomutila", "kiikala-kangin-tila", "kiikala-hyyppara-kultalahde", "kiikala-juurevasti-juurista"],
  pertteli: ["pertteli-kurjen-maatila", "pertteli-korpiaho-design", "pertteli-church", "pertteli-koirametsa-rymy"],
  muurla: ["muurla-muurlan-opisto", "muurla-design", "muurla-ilolan-vadelmatila"],
  marynummi: ["marynummi-uimaranta", "marynummi-frisbeegolf", "marynummi-kuntorata"],
  hajala: ["hajala-myllytyry", "hajala-tromperin-kestikievari"],
  angelniemi: ["angelniemi-paula-achrenin-puutarha", "angelniemi-kokkila-beach", "angelniemi-church"],
  kirjakkala: ["kirjakkalan-ruukkikyla"],
  mutainen: ["mutainen-kylayhdistys", "mutainen-galleria-tuulitunneli"],
};

export const areaOfficialSources: Record<SaloArea, { url: string; label: string }> = {
  mathildedal: { url: "https://visitmathildedal.fi/", label: "Visit Mathildedal" },
  teijo: { url: "https://visitsalo.fi/", label: "Visit Salo" },
  sarkisalo: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/", label: "Salon kaupunki" },
  pernio: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/", label: "Salon kaupunki" },
  halikko: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/", label: "Salon kaupunki" },
  vaskio: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/", label: "Salon kaupunki" },
  suomusjarvi: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/", label: "Salon kaupunki" },
  salo: { url: "https://visitsalo.fi/", label: "Visit Salo" },
  kisko: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/kisko/", label: "Salon kaupunki – Kisko" },
  kuusjoki: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/kuusjoki/", label: "Salon kaupunki – Kuusjoki" },
  kiikala: { url: "https://visitsalo.fi/", label: "Visit Salo" },
  pertteli: { url: "https://visitsalo.fi/", label: "Visit Salo" },
  muurla: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/", label: "Salon kaupunki" },
  marynummi: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/marynummi/", label: "Salon kaupunki – Märynummi" },
  hajala: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/hajala/", label: "Salon kaupunki – Hajala" },
  angelniemi: { url: "https://www.vskylat.fi/maakunnan-kylat/vuoden-kyla/", label: "Varsinais-Suomen Kylät – Angelniemi" },
  kirjakkala: { url: "https://salo.fi/muuttajalle/kylat-ja-alueet/teijon-ruukkikylat/", label: "Salon kaupunki – Teijon Ruukkikylät" },
  mutainen: { url: "https://www.teijo.fi/tervetuloakyliin/mutainen/", label: "Teijon Ruukkikylät – Mutainen" },
};

export const areaCopy: Record<SaloArea, Record<Locale, { eyebrow: string; title: string; intro: string }>> = {
  mathildedal: {
    fi: { eyebrow: "Mathildedal · Salo", title: "Mathildedalin paikat ja palvelut", intro: "Ruukkikylän majoitus, ruoka, satama ja paikalliset elämykset." },
    en: { eyebrow: "Mathildedal · Salo", title: "Places and services in Mathildedal", intro: "Accommodation, food, harbour life and local experiences in the ironworks village." },
    es: { eyebrow: "Mathildedal · Salo", title: "Lugares y servicios de Mathildedal", intro: "Alojamiento, gastronomía, puerto y experiencias locales en el pueblo histórico." },
  },
  teijo: {
    fi: { eyebrow: "Teijo · Salo", title: "Teijon palvelut ja elämykset", intro: "Kansallispuiston luonto, ruukkikylän kulttuuri, majoitus ja aktiiviset elämykset." },
    en: { eyebrow: "Teijo · Salo", title: "Services and experiences in Teijo", intro: "National park nature, ironworks culture, accommodation and outdoor experiences." },
    es: { eyebrow: "Teijo · Salo", title: "Servicios y experiencias en Teijo", intro: "Naturaleza del parque nacional, cultura histórica, alojamiento y actividades al aire libre." },
  },
  sarkisalo: {
    fi: { eyebrow: "Särkisalo · Förby · Petun saari", title: "Särkisalon saaristo ja palvelut", intro: "Majoitusta, satamia, ruokapaikkoja ja merellisiä elämyksiä Särkisalon saaristossa." },
    en: { eyebrow: "Särkisalo · Förby · Pettu Island", title: "Särkisalo archipelago and local services", intro: "Stays, harbours, places to eat and sea experiences around the Särkisalo islands." },
    es: { eyebrow: "Särkisalo · Förby · Isla de Pettu", title: "Archipiélago y servicios locales de Särkisalo", intro: "Alojamiento, puertos, gastronomía y experiencias junto al mar en las islas de Särkisalo." },
  },
  pernio: {
    fi: { eyebrow: "Perniö · Salo", title: "Perniön maaseutu ja paikalliset kohteet", intro: "Maatiloja, maaseutumajoitusta ja paikallisia retkipalveluja Perniön alueella." },
    en: { eyebrow: "Perniö · Salo", title: "Perniö countryside and local places", intro: "Farms, countryside accommodation and local excursion services in the Perniö area." },
    es: { eyebrow: "Perniö · Salo", title: "Campo y lugares locales de Perniö", intro: "Granjas, alojamiento rural y servicios de excursiones en la zona de Perniö." },
  },
  halikko: {
    fi: { eyebrow: "Halikko · Salo", title: "Halikko ja paikallinen kyläelämä", intro: "Tutustu Halikon alueen paikallisiin majoitus- ja kyläpalveluihin." },
    en: { eyebrow: "Halikko · Salo", title: "Halikko and local village life", intro: "Discover local accommodation and village services in the Halikko area." },
    es: { eyebrow: "Halikko · Salo", title: "Halikko y la vida local", intro: "Descubre alojamientos y servicios locales en la zona de Halikko." },
  },
  vaskio: {
    fi: { eyebrow: "Vaskio · Salo", title: "Vaskion maaseutumajoitus", intro: "Tutustu Vaskion alueen paikalliseen mökkimajoitukseen." },
    en: { eyebrow: "Vaskio · Salo", title: "Countryside stays in Vaskio", intro: "Explore local cottage accommodation in the Vaskio area." },
    es: { eyebrow: "Vaskio · Salo", title: "Alojamiento rural en Vaskio", intro: "Descubre alojamientos rurales locales en la zona de Vaskio." },
  },
  suomusjarvi: {
    fi: { eyebrow: "Suomusjärvi · Salo", title: "Suomusjärven huvilat ja lomamökit", intro: "Löydä Lomalaperlan erilliset huvila- ja lomamökkikohteet Suomusjärvellä." },
    en: { eyebrow: "Suomusjärvi · Salo", title: "Villas and holiday cottages in Suomusjärvi", intro: "Explore Lomalaperla's individual villa and holiday cottage properties in Suomusjärvi." },
    es: { eyebrow: "Suomusjärvi · Salo", title: "Villas y casas de vacaciones en Suomusjärvi", intro: "Descubre las distintas villas y casas vacacionales de Lomalaperla en Suomusjärvi." },
  },
  kisko: {
    fi: { eyebrow: "Kisko · Salo", title: "Järvien Kisko", intro: "Kiskon järvimaisemat, Toijan palvelukeskus, historiallinen kirkonkylä ja vanha kaivos- ja ruukkihistoria kutsuvat tutustumaan Salon itäiseen pitäjään." },
    en: { eyebrow: "Kisko · Salo", title: "Kisko – the village of lakes", intro: "Discover the lakes, local services in Toija, the historic church village and the area's mining and ironworks heritage in eastern Salo." },
    es: { eyebrow: "Kisko · Salo", title: "Kisko, el pueblo de los lagos", intro: "Descubre los lagos, los servicios locales de Toija, el histórico núcleo parroquial y el patrimonio minero e industrial del este de Salo." },
  },
  kuusjoki: {
    fi: { eyebrow: "Kuusjoki · Salo", title: "Kuusjoki – maaseudun helmi", intro: "Kuusjoen kylät levittäytyvät metsien, peltojen ja jokea seuraavien maisemien lomaan. Alueella on luontopolkuja, paikallisia tiloja, harrastusmahdollisuuksia ja kylätapahtumia." },
    en: { eyebrow: "Kuusjoki · Salo", title: "Kuusjoki – a rural gem", intro: "The villages of Kuusjoki sit among forests, fields and river landscapes, with nature trails, local farms, outdoor activities and community events." },
    es: { eyebrow: "Kuusjoki · Salo", title: "Kuusjoki, una joya rural", intro: "Los pueblos de Kuusjoki se extienden entre bosques, campos y paisajes fluviales, con senderos, granjas locales, actividades al aire libre y eventos comunitarios." },
  },
  kiikala: {
    fi: { eyebrow: "Kiikala · Salo", title: "Kiikalan kylät ja järvimaisemat", intro: "Kiikalan alueella kohtaavat maaseudun kylät, järvet, suot ja vaihtelevat luontokohteet. Tutustu esimerkiksi Härjänvatsan ja Rekijoen seutuun." },
    en: { eyebrow: "Kiikala · Salo", title: "Villages and lake landscapes of Kiikala", intro: "Kiikala brings together rural villages, lakes, mires and varied natural landscapes. Explore areas such as Härjänvatsa and Rekijoki." },
    es: { eyebrow: "Kiikala · Salo", title: "Pueblos y paisajes lacustres de Kiikala", intro: "Kiikala reúne pueblos rurales, lagos, zonas pantanosas y paisajes naturales variados. Explora lugares como Härjänvatsa y Rekijoki." },
  },
  pertteli: {
    fi: { eyebrow: "Pertteli · Salo", title: "Pertteli – kyliä ja maaseudun historiaa", intro: "Perttelin kylämaisemissa yhdistyvät historiallinen kivikirkko, maaseudun pihapiirit, paikalliset reitit ja pienet kyläyhteisöt." },
    en: { eyebrow: "Pertteli · Salo", title: "Pertteli – villages and rural heritage", intro: "Pertteli's village landscapes combine a historic stone church, traditional rural courtyards, local routes and small village communities." },
    es: { eyebrow: "Pertteli · Salo", title: "Pertteli, pueblos y patrimonio rural", intro: "Los paisajes de Pertteli combinan una histórica iglesia de piedra, antiguas casas rurales, rutas locales y pequeñas comunidades." },
  },
  muurla: {
    fi: { eyebrow: "Muurla · Salo", title: "Muurla – kylä järvien ja vanhan kirkkomiljöön äärellä", intro: "Muurlan kylämaisemaa leimaavat järvet, maaseudun rauha ja vuonna 1835 valmistunut puukirkko. Alue toimii myös luontevana pysähdyspaikkana Salon ja Turun välisellä reitillä." },
    en: { eyebrow: "Muurla · Salo", title: "Muurla – a village of lakes and heritage", intro: "Muurla is shaped by its lakes, peaceful countryside and wooden church completed in 1835. The village also makes a natural stop on the route between Salo and Turku." },
    es: { eyebrow: "Muurla · Salo", title: "Muurla, un pueblo de lagos y patrimonio", intro: "Muurla destaca por sus lagos, su tranquilo entorno rural y su iglesia de madera, terminada en 1835. El pueblo también es una parada natural entre Salo y Turku." },
  },
  marynummi: {
    fi: { eyebrow: "Märynummi · Salo", title: "Märynummi – luontoa ja aktiivista kyläelämää", intro: "Märynummi sijaitsee hiekkaharjulla lähellä moottoritietä. Alueella on luontopolkuja, frisbeegolfia, uimala saunoineen sekä kylän yhteisiä harrastus- ja kokoontumistiloja." },
    en: { eyebrow: "Märynummi · Salo", title: "Märynummi – nature and active village life", intro: "Märynummi sits on a sandy ridge close to the motorway. The area offers nature trails, disc golf, a swimming area with saunas and shared facilities for local activities." },
    es: { eyebrow: "Märynummi · Salo", title: "Märynummi, naturaleza y vida local activa", intro: "Märynummi se encuentra sobre una loma arenosa cerca de la autopista. La zona ofrece senderos, disc golf, una zona de baño con saunas y espacios comunitarios para actividades." },
  },
  hajala: {
    fi: { eyebrow: "Hajala · Halikko · Salo", title: "Hajala – kyläyhteisöä ja Myllytyryn luontoa", intro: "Hajala on maaseutumainen kylä Vanhan Kuninkaantien varrella. Kylän kohtaamispaikkoihin kuuluvat Myllytyryn metsälampi ja sauna sekä historiallinen Trömperin kestikievari. Kyläyhdistys ja paikalliset toimijat järjestävät yhteistä toimintaa ympäri vuoden." },
    en: { eyebrow: "Hajala · Halikko · Salo", title: "Hajala – village community and Myllytyry nature", intro: "Hajala is a rural village along the historic King's Road. Local meeting places include the forest lake and sauna at Myllytyry and the historic Trömperi roadside inn. The village association and local groups organise community activities throughout the year." },
    es: { eyebrow: "Hajala · Halikko · Salo", title: "Hajala, comunidad rural y naturaleza en Myllytyry", intro: "Hajala es un pueblo rural situado junto a la histórica Ruta del Rey. Entre sus lugares de encuentro destacan el lago forestal y la sauna de Myllytyry y la antigua posada de Trömperi. La asociación local y otros grupos organizan actividades comunitarias durante todo el año." },
  },
  angelniemi: {
    fi: { eyebrow: "Angelniemi · Salo", title: "Angelniemi – merellistä kyläelämää ja historiaa", intro: "Angelniemi on Halikonlahden ja Kemiönsaaren suunnan tuntumassa sijaitseva merellinen kylä. Kylän yhteisöllisyyttä ylläpitävät aktiiviset yhdistykset ja Seurojentalo. Kokkilan ranta, Lossiranta ja historiallinen kirkko tuovat alueelle saariston tunnelmaa." },
    en: { eyebrow: "Angelniemi · Salo", title: "Angelniemi – coastal village life and heritage", intro: "Angelniemi is a coastal village near Halikko Bay and the route towards Kimitoön. Active associations and the village hall are at the heart of its community life. Kokkila beach, Lossiranta and the historic church give the area its maritime character." },
    es: { eyebrow: "Angelniemi · Salo", title: "Angelniemi, vida de pueblo costero y patrimonio", intro: "Angelniemi es un pueblo costero cerca de la bahía de Halikko y de la ruta hacia Kimitoön. Las asociaciones activas y el centro comunitario mantienen viva la vida local. La playa de Kokkila, Lossiranta y la iglesia histórica aportan el carácter marítimo de la zona." },
  },
  kirjakkala: {
    fi: { eyebrow: "Kirjakkala · Teijo · Salo", title: "Kirjakkala – historiallinen ruukkikylä Hamarijärven rannalla", intro: "Kirjakkalan ruukin historia alkaa vuodesta 1686. Teijon kansallispuiston reittien äärellä sijaitseva kylä tunnetaan vanhoista ruukkirakennuksista, lehtomaisesta pihapiiristä, Hamarijärvestä sekä majoitus-, sauna- ja melontapalveluista." },
    en: { eyebrow: "Kirjakkala · Teijo · Salo", title: "Kirjakkala – historic ironworks village by Lake Hamarijärvi", intro: "Kirjakkala's ironworks history dates back to 1686. Beside the trails of Teijo National Park, the village is known for its historic ironworks buildings, leafy grounds, Lake Hamarijärvi and its accommodation, sauna and paddling services." },
    es: { eyebrow: "Kirjakkala · Teijo · Salo", title: "Kirjakkala, pueblo histórico de ferrería junto al lago Hamarijärvi", intro: "La historia de la ferrería de Kirjakkala se remonta a 1686. Junto a los senderos del Parque Nacional de Teijo, el pueblo destaca por sus edificios históricos, su entorno arbolado, el lago Hamarijärvi y sus servicios de alojamiento, sauna y piragüismo." },
  },
  mutainen: {
    fi: { eyebrow: "Mutainen · Teijon Ruukkikylät · Salo", title: "Mutainen – merellinen kylä Teijon Ruukkikylissä", intro: "Halikonlahden rannalla sijaitseva Mutainen on Teijon Ruukkikylien pohjoisin kylä. Alueen historia ulottuu esihistorialliseen asutukseen, ja maisemissa vuorottelevat merenranta, metsät ja pellot. Salo–Strömmä-pyöräilyreitti kulkee kylän kautta." },
    en: { eyebrow: "Mutainen · Teijo Ironworks Villages · Salo", title: "Mutainen – a coastal village in the Teijo Ironworks Villages", intro: "Located on the shore of Halikonlahti Bay, Mutainen is the northernmost of the Teijo Ironworks Villages. Its history reaches back to prehistoric settlement, while the landscape combines coastline, forests and fields. The Salo–Strömmä cycling route passes through the village." },
    es: { eyebrow: "Mutainen · Aldeas históricas de Teijo · Salo", title: "Mutainen – pueblo costero de las aldeas históricas de Teijo", intro: "Situado a orillas de la bahía de Halikonlahti, Mutainen es el pueblo más septentrional de las aldeas históricas de Teijo. Su historia se remonta a asentamientos prehistóricos y el paisaje combina costa, bosques y campos. La ruta ciclista Salo–Strömmä atraviesa el pueblo." },
  },
  salo: {
    fi: { eyebrow: "Salo · keskusta ja lähialueet", title: "Salon kaupungin palvelut ja retket", intro: "Matkailuinfo, oppaat, leirintä ja saaristoon suuntautuvat retkipalvelut." },
    en: { eyebrow: "Salo · town centre and nearby areas", title: "Salo town services and excursions", intro: "Tourism information, guides, camping and excursions towards the archipelago." },
    es: { eyebrow: "Salo · centro y alrededores", title: "Servicios y excursiones en Salo", intro: "Información turística, guías, camping y excursiones hacia el archipiélago." },
  },
};
