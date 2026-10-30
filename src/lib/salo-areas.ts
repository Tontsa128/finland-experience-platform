import type { Locale } from "@/types";

export type SaloArea = "mathildedal" | "teijo" | "sarkisalo" | "pernio" | "halikko" | "vaskio" | "suomusjarvi" | "salo";

export const areaProviderIds: Record<SaloArea, string[]> = {
  mathildedal: ["visit-mathildedal", "hotel-mathildedal", "mathildan-marina", "matilda-villas", "matri-house", "majoitus-mathildedal", "ravintola-terho", "mathildedal-brewery", "kattohuone-mathildedal", "meri-ruukin-lomakyla", "vuorovetten-jaatelo"],
  teijo: ["teijon-masuuni", "teijo-action-park", "teijo-national-park", "meri-teijo-golf", "matildanjarven-kampat", "teijo-tentsile", "teijon-kammari"],
  sarkisalo: ["saaristomokit-sarkisalo", "forby-marina", "cafe-vinssi", "saaristoravintola-nixor", "villa-meri-sarkisalo", "tiiranta", "niksaaren-sauna", "sarkisalo-fishing", "forby-rantajooga", "villa-signell", "finnholm-strandbo", "aava-adventures", "katiskanmaeki", "lonnviken", "villa-nennebo", "meri-veikko", "kruuvan-mokit"],
  pernio: ["krailan-sabrina", "leipyolin-tila", "alaspaan-maatila"],
  halikko: ["topilan-tupa"],
  vaskio: ["onnenperan-mokki"],
  suomusjarvi: ["villa-viola", "villa-laperla", "villa-viktoria", "villa-frans"],
  salo: ["visit-salo", "salon-oppaat", "vuohensaari-camping", "chill-out-fishing"],
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
  salo: {
    fi: { eyebrow: "Salo · keskusta ja lähialueet", title: "Salon kaupungin palvelut ja retket", intro: "Matkailuinfo, oppaat, leirintä ja saaristoon suuntautuvat retkipalvelut." },
    en: { eyebrow: "Salo · town centre and nearby areas", title: "Salo town services and excursions", intro: "Tourism information, guides, camping and excursions towards the archipelago." },
    es: { eyebrow: "Salo · centro y alrededores", title: "Servicios y excursiones en Salo", intro: "Información turística, guías, camping y excursiones hacia el archipiélago." },
  },
};
