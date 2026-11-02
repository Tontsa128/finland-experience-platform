import type { Locale } from "@/types";

export type SaloArea = "mathildedal" | "teijo" | "sarkisalo" | "pernio" | "halikko" | "vaskio" | "suomusjarvi" | "salo" | "kisko" | "kuusjoki" | "kiikala" | "pertteli";

export const areaProviderIds: Record<SaloArea, string[]> = {
  mathildedal: ["visit-mathildedal", "hotel-mathildedal", "mathildan-marina", "matilda-villas", "matri-house", "majoitus-mathildedal", "ravintola-terho", "mathildedal-brewery", "kattohuone-mathildedal", "meri-ruukin-lomakyla", "vuorovetten-jaatelo"],
  teijo: ["teijon-masuuni", "teijo-action-park", "teijo-national-park", "meri-teijo-golf", "matildanjarven-kampat", "teijo-tentsile", "teijon-kammari"],
  sarkisalo: ["saaristomokit-sarkisalo", "forby-marina", "cafe-vinssi", "saaristoravintola-nixor", "villa-meri-sarkisalo", "tiiranta", "niksaaren-sauna", "sarkisalo-fishing", "forby-rantajooga", "villa-signell", "finnholm-strandbo", "aava-adventures", "katiskanmaeki", "lonnviken", "villa-nennebo", "meri-veikko", "kruuvan-mokit"],
  pernio: ["krailan-sabrina", "leipyolin-tila", "alaspaan-maatila"],
  halikko: ["topilan-tupa"],
  vaskio: ["onnenperan-mokki"],
  suomusjarvi: ["villa-viola", "villa-laperla", "villa-viktoria", "villa-frans"],
  salo: ["visit-salo", "salon-oppaat", "vuohensaari-camping", "chill-out-fishing"],
  kisko: [],
  kuusjoki: [],
  kiikala: [],
  pertteli: [],
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
  salo: {
    fi: { eyebrow: "Salo · keskusta ja lähialueet", title: "Salon kaupungin palvelut ja retket", intro: "Matkailuinfo, oppaat, leirintä ja saaristoon suuntautuvat retkipalvelut." },
    en: { eyebrow: "Salo · town centre and nearby areas", title: "Salo town services and excursions", intro: "Tourism information, guides, camping and excursions towards the archipelago." },
    es: { eyebrow: "Salo · centro y alrededores", title: "Servicios y excursiones en Salo", intro: "Información turística, guías, camping y excursiones hacia el archipiélago." },
  },
};
