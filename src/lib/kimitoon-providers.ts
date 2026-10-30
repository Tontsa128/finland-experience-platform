import type { Locale } from "@/types";

export type KimitoonCategory =
  | "majoitus" | "ruoka" | "aktiviteetit" | "saaristo" | "luonto"
  | "kulttuuri" | "hyvinvointi" | "kuljetukset" | "ostokset"
  | "talviaktiviteetit" | "tapahtumapaikat" | "muut-palvelut" | "tapahtumat";

export type KimitoonProvider = {
  id: string;
  kind?: "provider" | "place" | "resource";
  categories: KimitoonCategory[];
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  location: Record<Locale, string>;
  websiteUrl: string;
  sourceUrl: string;
  image?: string;
  categoryImages?: Partial<Record<KimitoonCategory, string>>;
  imageCredit: string;
  imageSource: string;
  tags: string[];
  contact?: { phone?: string; address?: string };
};

const imageBase = "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/";
const sourceBase = "https://www.visitkimitoon.fi/fi/kohteet/";
const image = (file: string) => imageBase + file;
const source = (slug: string) => sourceBase + slug + "/";

export const kimitoonProviders: KimitoonProvider[] = [
  // Accommodation — every villa is a separate bookable listing and its own card.
  {
    id:"villa-aurora-35", categories:["majoitus"],
    name:{fi:"Villa Aurora #35",en:"Villa Aurora #35",es:"Villa Aurora #35"},
    description:{
      fi:"Merikruunun alueella sijaitseva vuonna 2022 valmistunut 44 m² huvila. Virallisessa kohde-esittelyssä mainitaan sauna, terassi, täysin varusteltu keittiö sekä majoitus enintään viidelle hengelle.",
      en:"A 44 m² villa completed in 2022 in the Merikruunu area. The official listing describes a sauna, terrace, fully equipped kitchen and accommodation for up to five guests.",
      es:"Villa de 44 m² terminada en 2022 en la zona de Merikruunu. La ficha oficial describe sauna, terraza, cocina equipada y capacidad para hasta cinco personas."
    },
    location:{fi:"Täysihoitolantie 6, Kemiönsaari",en:"Täysihoitolantie 6, Kimitoön",es:"Täysihoitolantie 6, Kimitoön"},
    websiteUrl:"https://www.vuokrahuvilasaaristossa.com/",sourceUrl:source("villa-aurora-35-2"),
    image:image("41576b80-17e2-11ee-aef2-f342e71dcccc.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / kohteen virallinen esittely",imageSource:source("villa-aurora-35-2"),tags:["villa","sauna","merikruunu"]
  },
  {
    id:"villa-bergholmen",categories:["majoitus"],
    name:{fi:"Villa Bergholmen",en:"Villa Bergholmen",es:"Villa Bergholmen"},
    description:{
      fi:"Oma saarikohde Taalintehtaan edustalla. Virallinen esittely kertoo venekuljetuksesta, huvilan kahdeksan hengen kapasiteetista sekä mahdollisuudesta kokouksiin, juhliin ja kalastusretkiin.",
      en:"A private island retreat off Dalsbruk. The official listing describes boat transfers, accommodation for eight in the main villa and facilities for meetings, celebrations and fishing trips.",
      es:"Alojamiento en una isla frente a Dalsbruk. La ficha oficial describe traslados en barco, capacidad para ocho personas en la villa principal y espacios para reuniones, celebraciones y pesca."
    },
    location:{fi:"Taalintehtaan edusta, Kemiönsaari",en:"Off Dalsbruk, Kimitoön",es:"Frente a Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.villabergholmen.fi/",sourceUrl:source("villa-bergholmen-2"),
    image:image("e6dfb0d0-3c4a-11ee-807b-e549c99fd69d.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / kohteen virallinen esittely",imageSource:source("villa-bergholmen-2"),tags:["saari","villa","juhlat","kalastus"]
  },
  {
    id:"villa-cecilia-55",categories:["majoitus"],
    name:{fi:"Villa Cecilia #55",en:"Villa Cecilia #55",es:"Villa Cecilia #55"},
    description:{
      fi:"Merikruunun saaristokylässä sijaitseva vuonna 2022 valmistunut huvila. Virallinen esittely kuvaa metsänreunan merimaisemaa, terassia ja poreallasta. Tarkista henkilömäärä ja ehdot suoraan vuokraajalta.",
      en:"A villa completed in 2022 in Merikruunu Archipelago Village. The official listing describes a woodland-edge seaside setting, terrace and outdoor hot tub. Confirm occupancy and terms with the host.",
      es:"Villa terminada en 2022 en Merikruunu Archipelago Village. La ficha oficial describe un entorno junto al mar, terraza y bañera de hidromasaje exterior. Confirma la capacidad y las condiciones con el anfitrión."
    },
    location:{fi:"Täysihoitolantie 6, Kemiönsaari",en:"Täysihoitolantie 6, Kimitoön",es:"Täysihoitolantie 6, Kimitoön"},
    websiteUrl:source("villa-cecilia-55-3"),sourceUrl:source("villa-cecilia-55-3"),
    image:image("08f6f310-309b-11ee-9fb4-c344224e6fd0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / kohteen virallinen esittely",imageSource:source("villa-cecilia-55-3"),tags:["villa","poreallas","merikruunu"]
  },
  {
    id:"villa-eden-16",categories:["majoitus"],
    name:{fi:"Villa Eden #16",en:"Villa Eden #16",es:"Villa Eden #16"},
    description:{
      fi:"Merikruunun saaristokylän huvila, jossa virallisen esittelyn mukaan on sauna, meriterassi ja ulkoporeallas. Vuonna 2022 valmistunut 44 m² huvila sijaitsee hotellin palveluiden lähellä.",
      en:"A villa in Merikruunu Archipelago Village. The official listing describes a sauna, sea-facing terrace and outdoor hot tub. The 44 m² villa was completed in 2022 and is close to hotel services.",
      es:"Villa en Merikruunu Archipelago Village. La ficha oficial describe sauna, terraza con vistas al mar y bañera de hidromasaje exterior. La villa de 44 m² se terminó en 2022 y está cerca de los servicios del hotel."
    },
    location:{fi:"Täysihoitolantie 6, Kemiönsaari",en:"Täysihoitolantie 6, Kimitoön",es:"Täysihoitolantie 6, Kimitoön"},
    websiteUrl:"https://www.villaeden.fi/",sourceUrl:source("villa-eden-2"),
    image:image("5b75b640-27bc-11ee-9fb4-c344224e6fd0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / kohteen virallinen esittely",imageSource:source("villa-eden-2"),tags:["villa","sauna","poreallas"]
  },
  {
    id:"villa-edith-4",categories:["majoitus"],
    name:{fi:"Villa Edith #4",en:"Villa Edith #4",es:"Villa Edith #4"},
    description:{
      fi:"Kemiönsaaren virallisessa matkailuhakemistossa esiteltävä Merikruunun alueen huvila. Tarkista huonejako, varustelu, henkilömäärä ja ajantasainen saatavuus kohteen omalta sivulta.",
      en:"A villa in the Merikruunu area featured in the official Kimitoön tourism directory. Check the layout, facilities, occupancy and current availability on the property's own page.",
      es:"Villa de la zona de Merikruunu incluida en el directorio turístico oficial de Kimitoön. Consulta la distribución, el equipamiento, la capacidad y la disponibilidad actual en la página del alojamiento."
    },
    location:{fi:"Merikruunu, Kemiönsaari",en:"Merikruunu, Kimitoön",es:"Merikruunu, Kimitoön"},
    websiteUrl:source("villa-edith-4-2"),sourceUrl:source("villa-edith-4-2"),
    image:image("854969d0-1597-11ee-aef2-f342e71dcccc.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-edith-4-2"),tags:["villa","merikruunu"]
  },
  {
    id:"villa-eko-8",categories:["majoitus"],
    name:{fi:"Villa Eko #8",en:"Villa Eko #8",es:"Villa Eko #8"},
    description:{
      fi:"Kemiönsaaren viralliseen matkailuhakemistoon kuuluva huvila. Tarkista kohteen ajantasainen kuvaus, varustelu ja varauskanava suoraan virallisesta kohdekortista.",
      en:"A villa listed in the official Kimitoön tourism directory. Check the current description, facilities and booking channel in the official property listing.",
      es:"Villa incluida en el directorio turístico oficial de Kimitoön. Consulta la descripción actual, el equipamiento y el canal de reserva en la ficha oficial."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-eko-8-2"),sourceUrl:source("villa-eko-8-2"),
    image:image("9483e2f0-2a22-11ee-9fb4-c344224e6fd0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-eko-8-2"),tags:["villa"]
  },
  {
    id:"villa-isla-7",categories:["majoitus"],
    name:{fi:"Villa Isla #7",en:"Villa Isla #7",es:"Villa Isla #7"},
    description:{
      fi:"Kemiönsaaren virallisen matkailuhakemiston huvila. Varmista majoituksen yksityiskohdat, palvelut ja saatavuus suoraan kohteen omasta varauskanavasta.",
      en:"A villa listed in the official Kimitoön tourism directory. Confirm accommodation details, facilities and availability directly through the property's booking channel.",
      es:"Villa incluida en el directorio turístico oficial de Kimitoön. Confirma los detalles, servicios y disponibilidad directamente en el canal de reserva del alojamiento."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-isla-7"),sourceUrl:source("villa-isla-7"),
    image:image("a8d20f60-2c62-11ee-9fb4-c344224e6fd0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-isla-7"),tags:["villa"]
  },
  {
    id:"villa-jolla-2",categories:["majoitus"],
    name:{fi:"Villa Jolla #2",en:"Villa Jolla #2",es:"Villa Jolla #2"},
    description:{
      fi:"Kemiönsaaren virallisessa hakemistossa esiteltävä huvila. Tarkista ajantasaiset majoitustiedot, varustelu ja ehdot suoraan kohteen omalta sivulta.",
      en:"A villa featured in the official Kimitoön directory. Check current accommodation details, facilities and terms on the property's own page.",
      es:"Villa presentada en el directorio oficial de Kimitoön. Consulta los datos actuales del alojamiento, el equipamiento y las condiciones en su propia página."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-jolla-2-3"),sourceUrl:source("villa-jolla-2-3"),
    image:image("0b330de0-2c5d-11ee-9fb4-c344224e6fd0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-jolla-2-3"),tags:["villa"]
  },
  {
    id:"villa-kruunula-39",categories:["majoitus"],
    name:{fi:"Villa Kruunula #39",en:"Villa Kruunula #39",es:"Villa Kruunula #39"},
    description:{
      fi:"Merikruunun alueen huvila Kemiönsaaren virallisessa matkailuhakemistossa. Tarkista kohteen omalta sivulta ajantasainen varustelu, henkilömäärä ja varausohjeet.",
      en:"A villa in the Merikruunu area listed by the official Kimitoön tourism directory. Check current facilities, occupancy and booking instructions on the property's own page.",
      es:"Villa de la zona de Merikruunu incluida en el directorio turístico oficial de Kimitoön. Consulta el equipamiento, la capacidad y las instrucciones de reserva en su propia página."
    },
    location:{fi:"Merikruunu, Kemiönsaari",en:"Merikruunu, Kimitoön",es:"Merikruunu, Kimitoön"},
    websiteUrl:source("villa-kruunula-39-2"),sourceUrl:source("villa-kruunula-39-2"),
    image:image("0240d750-1a4a-11ee-aef2-f342e71dcccc.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-kruunula-39-2"),tags:["villa","merikruunu"]
  },
  {
    id:"villa-lux-3",categories:["majoitus"],
    name:{fi:"Villa Lux #3",en:"Villa Lux #3",es:"Villa Lux #3"},
    description:{
      fi:"Kemiönsaaren virallisessa matkailuhakemistossa esiteltävä huvila. Tarkista kohteen yksityiskohtaiset tiedot, varustelu ja saatavuus suoraan virallisesta kohdekortista.",
      en:"A villa featured in the official Kimitoön tourism directory. Check detailed property information, facilities and availability directly in the official listing.",
      es:"Villa presentada en el directorio turístico oficial de Kimitoön. Consulta los detalles, el equipamiento y la disponibilidad directamente en la ficha oficial."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-lux-3-2"),sourceUrl:source("villa-lux-3-2"),
    image:image("c22af490-8388-11ee-9fca-6fdb01d69922.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-lux-3-2"),tags:["villa"]
  },
  {
    id:"villa-matilda-19",categories:["majoitus"],
    name:{fi:"Villa Matilda #19",en:"Villa Matilda #19",es:"Villa Matilda #19"},
    description:{
      fi:"Kemiönsaaren viralliseen matkailuhakemistoon kuuluva huvila. Ajantasaiset tilat, henkilömäärä, hinnat ja varausohjeet tarkistetaan suoraan kohteen omalta sivulta.",
      en:"A villa included in the official Kimitoön tourism directory. Confirm current facilities, occupancy, prices and booking instructions on the property's own page.",
      es:"Villa incluida en el directorio turístico oficial de Kimitoön. Confirma los servicios, la capacidad, los precios y las instrucciones de reserva en su propia página."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-matilda-19-2"),sourceUrl:source("villa-matilda-19-2"),
    image:image("1931dc10-2d47-11ee-9fb4-c344224e6fd0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:source("villa-matilda-19-2"),tags:["villa"]
  },
  {
    id:"villa-mimosa-37",categories:["majoitus"],
    name:{fi:"Villa Mimosa #37",en:"Villa Mimosa #37",es:"Villa Mimosa #37"},
    description:{
      fi:"Merikruunun Tähdistö-huvila, jonka virallinen esittely kertoo omasta saunasta, ulkoporeammeesta ja noin 30 m²:n meriterassista. Huvila on 44 m² ja sopii parhaiten 2–4 hengelle, enintään kuudelle.",
      en:"A Merikruunu Tähdistö villa. Its official listing describes a private sauna, outdoor hot tub and a sea terrace of about 30 m². The 44 m² villa is best suited to 2–4 guests, with a maximum of six.",
      es:"Villa Tähdistö de Merikruunu. Su ficha oficial describe sauna privada, jacuzzi exterior y terraza marítima de unos 30 m². La villa de 44 m² es ideal para 2–4 personas, con un máximo de seis."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-mimosa-37-2"),sourceUrl:source("villa-mimosa-37-2"),
    image:image("7bc26960-7393-11ef-acbd-2156ce35ca31.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["villa"]
  },
  {
    id:"villa-orion-57",categories:["majoitus"],
    name:{fi:"Villa Orion #57",en:"Villa Orion #57",es:"Villa Orion #57"},
    description:{
      fi:"Vuonna 2023 valmistunut Merikruunun Tähdistö-huvila. Virallisessa esittelyssä mainitaan kaksi terassia, ulkoporeamme, grillauspaikka ja majoitus 2+3 hengelle.",
      en:"A Merikruunu Tähdistö villa completed in 2023. The official listing mentions two terraces, an outdoor hot tub, a barbecue area and sleeping arrangements for 2+3 guests.",
      es:"Villa Tähdistö de Merikruunu terminada en 2023. La ficha oficial menciona dos terrazas, jacuzzi exterior, zona de barbacoa y capacidad para 2+3 personas."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-orion-57-2"),sourceUrl:source("villa-orion-57-2"),
    image:image("d4906620-7391-11ef-acbd-2156ce35ca31.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["villa"]
  },
  {
    id:"villa-otava-15",categories:["majoitus"],
    name:{fi:"Villa Otava #15",en:"Villa Otava #15",es:"Villa Otava #15"},
    description:{
      fi:"Kemiönsaaren virallisessa matkailuhakemistossa esitelty huvila. Tarkista kohteen omalta sivulta majoitustiedot, varustelu ja saatavuus.",
      en:"A villa featured in the official Kimitoön tourism directory. Check accommodation details, facilities and availability on the property's own page.",
      es:"Villa presentada en el directorio turístico oficial de Kimitoön. Consulta los detalles, el equipamiento y la disponibilidad en su propia página."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-otava-15-2"),sourceUrl:source("villa-otava-15-2"),
    image:image("c61f3c50-7392-11ef-acbd-2156ce35ca31.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["villa"]
  },
  {
    id:"villa-pohjantahti-18",categories:["majoitus"],
    name:{fi:"Villa Pohjantähti #18",en:"Villa Pohjantähti #18",es:"Villa Pohjantähti #18"},
    description:{
      fi:"Merikruunun Tähdistö-huvila, jossa on virallisen esittelyn mukaan oma sauna merinäkymällä, kaksi yläparvea ja poreallas. 44 m²:n huvila sopii parhaiten 2–4 hengelle, enintään kuudelle.",
      en:"A Merikruunu Tähdistö villa with a private sauna overlooking the sea, two loft sleeping areas and an outdoor hot tub, according to the official listing. The 44 m² villa is best suited to 2–4 guests, with a maximum of six.",
      es:"Villa Tähdistö de Merikruunu con sauna privada con vistas al mar, dos altillos para dormir y jacuzzi exterior, según la ficha oficial. La villa de 44 m² es ideal para 2–4 personas, con un máximo de seis."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-pohjantahti-18-2"),sourceUrl:source("villa-pohjantahti-18-2"),
    image:image("616e1b00-7392-11ef-acbd-2156ce35ca31.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["villa"]
  },
  {
    id:"villa-sirius-56",categories:["majoitus"],
    name:{fi:"Villa Sirius #56",en:"Villa Sirius #56",es:"Villa Sirius #56"},
    description:{
      fi:"Merikruunun Tähdistö-huvila, jonka virallinen esittely kertoo omasta ulkoporealtaasta, suurista terasseista ja hotellin läheisyydestä. Majoitus on ilmoitettu 2+4 hengelle.",
      en:"A Merikruunu Tähdistö villa. The official listing describes a private outdoor hot tub, large terraces and proximity to the hotel. Sleeping capacity is listed as 2+4 guests.",
      es:"Villa Tähdistö de Merikruunu. La ficha oficial describe jacuzzi exterior privado, terrazas amplias y cercanía al hotel. La capacidad indicada es de 2+4 personas."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-sirius-56-2"),sourceUrl:source("villa-sirius-56-2"),
    image:image("1d7eca10-7393-11ef-acbd-2156ce35ca31.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["villa"]
  },
  {
    id:"villa-ulrika",categories:["majoitus"],
    name:{fi:"Villa Ulrika",en:"Villa Ulrika",es:"Villa Ulrika"},
    description:{
      fi:"Kemiönsaaren virallisessa matkailuhakemistossa esiteltävä majoituskohde. Ajantasaiset tiedot ja varauskanava tarkistetaan kohteen omalta sivulta.",
      en:"An accommodation listing in the official Kimitoön tourism directory. Check current information and the booking channel on the property's own page.",
      es:"Alojamiento presentado en el directorio turístico oficial de Kimitoön. Consulta la información actual y el canal de reserva en su propia página."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:source("villa-ulrika-2"),sourceUrl:source("villa-ulrika-2"),
    image:image("a015e1d0-a993-11ef-9f10-5bce05865e51.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["villa"]
  },
  // Other accommodation providers from the official destination catalogue.
  {
    id:"villa-valo-9",categories:["majoitus"],
    name:{fi:"Villa Valo #9",en:"Villa Valo #9",es:"Villa Valo #9"},
    description:{
      fi:"Merikruunun alueen huvila Kemiönsaaren virallisessa majoitushakemistossa. Tarkista huvilan ajantasaiset tilat, henkilömäärä, hinnat ja varaus suoraan kohteen omalta sivulta.",
      en:"A villa in the Merikruunu area listed in the official Kimitoön accommodation directory. Confirm current facilities, occupancy, prices and booking directly through the property's own page.",
      es:"Villa de la zona de Merikruunu incluida en el directorio oficial de alojamientos de Kimitoön. Confirma el equipamiento, la capacidad, los precios y la reserva en la página del alojamiento."
    },
    location:{fi:"Merikruunu, Kemiönsaari",en:"Merikruunu, Kimitoön",es:"Merikruunu, Kimitoön"},
    websiteUrl:"https://www.merikruunu.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/villa-valo-9-2/",
    image:image("0aa27440-17f1-11ee-aef2-f342e71dcccc.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/villa-valo-9-2/",tags:["villa","merikruunu"]
  },
  {
    id:"spa-hotel-kasnas",categories:["majoitus","ruoka","hyvinvointi","saaristo","tapahtumapaikat","talviaktiviteetit"],
    name:{fi:"Spa Hotel Kasnäs",en:"Spa Hotel Kasnäs",es:"Spa Hotel Kasnäs"},
    description:{
      fi:"Kasnäsin merellinen hotelli- ja lomakeskus. Virallinen matkailusivusto nostaa esiin hotellin, kylpylän, ravintolan, vierasvenesataman ja caravan-alueen.",
      en:"A seaside hotel and resort in Kasnäs. The official tourism site highlights the hotel, spa, restaurant, guest harbour and caravan area.",
      es:"Hotel y complejo vacacional junto al mar en Kasnäs. La web turística oficial destaca el hotel, el spa, el restaurante, el puerto deportivo y la zona de caravanas."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://www.kasnas.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/hotel-kasnas-2/",
    image:image("87370420-2504-11ed-9a1b-ed91d10f897f.jpeg-760x430.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/hotel-kasnas-2/",tags:["hotelli","kylpylä","ravintola","satama"],
    contact:{phone:"02 5210 100",address:"Kasnäsvägen 1294, 25930 Kasnäs"}
  },
  {
    id:"soderlangvik-glamping",categories:["majoitus","luonto"],
    name:{fi:"Söderlångvik Glamping",en:"Söderlångvik Glamping",es:"Söderlångvik Glamping"},
    description:{
      fi:"Glamping-majoitus Söderlångvikin kartanon alueella. Tarkista kauden ajankohta, majoituksen sisältö ja saatavuus suoraan palveluntarjoajalta.",
      en:"Glamping accommodation at Söderlångvik Manor. Confirm the operating season, what's included and availability directly with the provider.",
      es:"Alojamiento glamping en la finca de Söderlångvik. Confirma la temporada, los servicios incluidos y la disponibilidad directamente con el proveedor."
    },
    location:{fi:"Söderlångvik, Kemiönsaari",en:"Söderlångvik, Kimitoön",es:"Söderlångvik, Kimitoön"},
    websiteUrl:"https://soderlangvik.fi/fi/glamping/",sourceUrl:"https://soderlangvik.fi/fi/glamping/",
    image:image("d9b5e0e0-ff40-11ef-a36c-890430c1f0f9.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / Söderlångvik",imageSource:"https://soderlangvik.fi/fi/glamping/",tags:["glamping","kartano","luonto"]
  },
  {
    id:"bengtskar-lighthouse-stay",categories:["majoitus","kulttuuri","aktiviteetit","saaristo","luonto"],
    name:{fi:"Yö Bengtskärin majakassa",en:"Stay overnight at Bengtskär Lighthouse",es:"Alojamiento en el faro de Bengtskär"},
    description:{
      fi:"Yöpymismahdollisuus avomeren majakkasaarella. Merikuljetus, kausi, huoneet ja vierailun ehdot on tarkistettava suoraan majakan ylläpitäjältä.",
      en:"An overnight stay on a lighthouse island in the open sea. Confirm boat transport, season, rooms and visitor terms directly with the lighthouse operator.",
      es:"Alojamiento en una isla con faro en mar abierto. Confirma el transporte marítimo, la temporada, las habitaciones y las condiciones directamente con el operador."
    },
    location:{fi:"Bengtskär, Kemiönsaaren ulkosaaristo",en:"Bengtskär, outer Kimitoön archipelago",es:"Bengtskär, archipiélago exterior de Kimitoön"},
    websiteUrl:"https://bengtskar.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("230658b0-52a6-11ec-ae70-f70f11991cb8-Bengtskar_RobinS_4.jpg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["majakka","ulkosaaristo","erikoismajoitus"]
  },
  {
    id:"sebbholmen-ecocamp-cottages",categories:["majoitus"],
    name:{fi:"Sebbholmen EcoCamp – mökit",en:"Sebbholmen EcoCamp – cabins",es:"Sebbholmen EcoCamp – cabañas"},
    description:{
      fi:"Saaristossa sijaitseva mökkimajoitus. Tarkista mökkien varustelu, kulkuyhteydet, kausi ja varaus suoraan EcoCampin omasta palvelusta.",
      en:"Cottage accommodation in the archipelago. Check cabin facilities, access, season and booking directly with EcoCamp.",
      es:"Alojamiento en cabañas en el archipiélago. Consulta el equipamiento, el acceso, la temporada y la reserva directamente con EcoCamp."
    },
    location:{fi:"Sebbholmen, Kemiönsaari",en:"Sebbholmen, Kimitoön",es:"Sebbholmen, Kimitoön"},
    websiteUrl:"https://sebbholmen.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("4c590120-6594-11ed-9d9c-2ddc96e1236d.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["mökit","saaristo","luonto"]
  },
  {
    id:"sebbholmen-tentsile",categories:["majoitus"],
    name:{fi:"Sebbholmen EcoCamp – Tentsile-teltat",en:"Sebbholmen EcoCamp – Tentsile tents",es:"Sebbholmen EcoCamp – tiendas Tentsile"},
    description:{
      fi:"Tentsile-telttamajoitus EcoCampin saaristokohteessa. Tarkista kausi, varustelu, saapumisohjeet ja saatavuus suoraan palveluntarjoajalta.",
      en:"Tentsile tent accommodation at the EcoCamp archipelago site. Confirm the season, equipment, arrival instructions and availability with the provider.",
      es:"Alojamiento en tiendas Tentsile en el destino insular de EcoCamp. Confirma la temporada, el equipamiento, las instrucciones de llegada y la disponibilidad con el proveedor."
    },
    location:{fi:"Sebbholmen, Kemiönsaari",en:"Sebbholmen, Kimitoön",es:"Sebbholmen, Kimitoön"},
    websiteUrl:"https://sebbholmen.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("f4b44880-659d-11ed-9d9c-2ddc96e1236d.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["tentsile","telttamajoitus","saaristo"]
  },
  {
    id:"merikruunu-hotel",categories:["majoitus","ruoka","tapahtumapaikat"],
    name:{fi:"Hotelli & Ravintola Merikruunu",en:"Hotel & Restaurant Merikruunu",es:"Hotel y Restaurante Merikruunu"},
    description:{
      fi:"Historiallinen saaristohotelli Dragsfjärdissä. Virallinen kohdesivu esittelee hotellin ja ravintolan; tarkista huoneet, palvelut, hinnat ja aukiolo suoraan hotellilta.",
      en:"A historic archipelago hotel in Dragsfjärd. The official listing presents the hotel and restaurant; confirm rooms, services, prices and opening times directly with the hotel.",
      es:"Hotel histórico del archipiélago en Dragsfjärd. La ficha oficial presenta el hotel y el restaurante; confirma habitaciones, servicios, precios y horarios directamente con el hotel."
    },
    location:{fi:"Pensionatvägen 8, Dragsfjärd",en:"Pensionatvägen 8, Dragsfjärd",es:"Pensionatvägen 8, Dragsfjärd"},
    websiteUrl:"https://www.merikruunu.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/hotel-merikruunu-2/",
    categoryImages:{ruoka:"https://static.wixstatic.com/media/53869d_6f42583e26fc4ffb920ac44e2fc25ec2~mv2.jpg/v1/fill/w_382%2Ch_509%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/53869d_6f42583e26fc4ffb920ac44e2fc25ec2~mv2.jpg"},image:image("ccb22f50-877f-11ee-9fca-6fdb01d69922.png-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / Merikruunu",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/hotel-merikruunu-2/",tags:["hotelli","ravintola","pub","saaristo"]
  },
  {
    id:"bb-heedbacka",categories:["majoitus"],
    name:{fi:"B & B Hembacka",en:"B&B Hembacka",es:"B&B Hembacka"},
    description:{
      fi:"Bed & breakfast -majoitus Kemiönsaaren virallisessa matkailuhakemistossa. Tarkista huonetyypit, aamiainen, palvelut ja varaus suoraan majoittajalta.",
      en:"A bed and breakfast listed in the official Kimitoön tourism directory. Confirm room types, breakfast, services and booking directly with the host.",
      es:"Alojamiento bed and breakfast incluido en el directorio turístico oficial de Kimitoön. Confirma los tipos de habitación, el desayuno, los servicios y la reserva directamente con el anfitrión."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.hembacka.fi/",sourceUrl:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/",
    image:image("1cf56a30-bf5e-11ed-8fb6-cd05a147400e.jpeg-374x211.jpeg"),imageCredit:"Visit Kimitoön",imageSource:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/",tags:["bed-and-breakfast","majoitus"],contact:{phone:"+358 45 173 0050",email:"info@hembacka.fi",address:"Villkärrintie 35, 25700 Kemiö"}
  },
  {
    id:"dals-inn",categories:["majoitus"],
    name:{fi:"Dals Inn Bed & Breakfast",en:"Dals Inn Bed & Breakfast",es:"Dals Inn Bed & Breakfast"},
    description:{
      fi:"Bed & breakfast -majoitus Taalintehtaan alueella. Tarkista huoneiden saatavuus, palvelut ja varausehdot suoraan majoituspaikalta.",
      en:"Bed and breakfast accommodation in the Dalsbruk area. Check room availability, services and booking terms directly with the property.",
      es:"Alojamiento bed and breakfast en la zona de Dalsbruk. Consulta la disponibilidad, los servicios y las condiciones de reserva directamente con el establecimiento."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/kohteet/dals-inn-bed-breakfast-3/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/dals-inn-bed-breakfast-3/",
    image:image("50f5e9e0-ac50-11f0-a598-07e1de96cda5.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/dals-inn-bed-breakfast-3/",tags:["bed-and-breakfast","taalintehdas"],contact:{phone:"+358 45 107 6140",email:"JADalsInn@gmail.com",address:"Dalsbruksvägen 709, 25900 Dalsbruk"}
  },
  {
    id:"ekniemi-holiday-village",categories:["majoitus","ruoka","hyvinvointi","tapahtumapaikat"],
    name:{fi:"Ekniemen lomakylä",en:"Ekniemi Holiday Village",es:"Complejo vacacional Ekniemi"},
    description:{
      fi:"Meren äärellä sijaitseva lomakylä, jonka virallinen esittely nostaa esiin luonnonrauhan, majoituksen ja elämykset. Tarkista mökkivalikoima ja saatavuus suoraan toimijalta.",
      en:"A seaside holiday village whose official listing highlights nature, accommodation and experiences. Check cottage options and availability directly with the operator.",
      es:"Complejo vacacional junto al mar cuya ficha oficial destaca la naturaleza, el alojamiento y las experiencias. Consulta las cabañas y la disponibilidad directamente con el operador."
    },
    location:{fi:"Ekniemi, Kemiönsaari",en:"Ekniemi, Kimitoön",es:"Ekniemi, Kimitoön"},
    websiteUrl:"https://ekniemenlomakyla.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/ekniemen-lomakyla-luonnonrauhaa-majoitusta-ja-elamyksia-meren-aarella/",
    image:image("32f73db0-4a92-11f0-9fff-ed17829cd958.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/ekniemen-lomakyla-luonnonrauhaa-majoitusta-ja-elamyksia-meren-aarella/",tags:["lomakylä","merenranta","majoitus"],
    contact:{phone:"+358 50 5483 592",email:"ekniemenlomakyla@gmail.com",address:"Leirintäalueentie 55, 25700 Kemiönsaari"}
  },
  // Food, cafés and local producers.
  {
    id:"holmbergs-four-c",categories:["ruoka","majoitus","ostokset"],
    name:{fi:"Holmbergs Fisk & Café Four C",en:"Holmbergs Fisk & Café Four C",es:"Holmbergs Fisk & Café Four C"},
    description:{
      fi:"Taalintehtaan vanhassa postitalossa toimiva kalakaupan ja kahvilan yhdistelmä. Tarkista päivän kalavalikoima, kahvilatuotteet ja aukiolo suoraan yritykseltä.",
      en:"A fish shop and café in the former post office building in Dalsbruk. Check the day's fish selection, café offering and opening times directly with the business.",
      es:"Combinación de pescadería y cafetería en la antigua oficina de correos de Dalsbruk. Consulta la selección de pescado, la oferta de cafetería y los horarios directamente con el negocio."
    },
    location:{fi:"Kolabackavägen 1a, Taalintehdas",en:"Kolabackavägen 1a, Dalsbruk",es:"Kolabackavägen 1a, Dalsbruk"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("e63be190-0326-11f0-bf08-bd872a4d1405.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["kahvila","kala","lähiruoka"]
  },
  {
    id:"amos-krog",categories:["ruoka"],
    name:{fi:"Ravintola Amos Krog",en:"Restaurant Amos Krog",es:"Restaurante Amos Krog"},
    description:{
      fi:"Söderlångvikin kartanon ravintola. Yhdistä ruokailu kartanon, museon, näyttelyiden ja omenatarhojen vierailuun; tarkista ajankohtainen menu ja aukiolo ravintolalta.",
      en:"The restaurant at Söderlångvik Manor. Combine a meal with a visit to the manor, museum, exhibitions and apple orchards; check the current menu and opening times with the restaurant.",
      es:"Restaurante de la mansión Söderlångvik. Combina la comida con una visita a la mansión, el museo, las exposiciones y los huertos; consulta el menú y los horarios actuales con el restaurante."
    },
    location:{fi:"Söderlångvik, Kemiönsaari",en:"Söderlångvik, Kimitoön",es:"Söderlångvik, Kimitoön"},
    websiteUrl:"https://www.amoskrog.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/ravintola-amos-krog/",
    image:image("750471d0-0e30-11f0-88da-256e05b1f1a0.jpeg-760x430.jpeg"),imageCredit:"Visit Kemiönsaari / Söderlångvik",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/ravintola-amos-krog/",tags:["ravintola","kartano","lähiruoka"]
  },
  {
    id:"stalls-bar-food",categories:["ruoka"],
    name:{fi:"Stall’s Bar & Food",en:"Stall’s Bar & Food",es:"Stall’s Bar & Food"},
    description:{
      fi:"Kemiönsaaren virallisen matkailusivuston ravintola- ja kahvilahakemistossa esitelty ruokapaikka. Tarkista nykyinen ruokalista, palvelut ja aukiolo suoraan ravintolalta.",
      en:"A food venue featured in the official Kimitoön restaurant and café directory. Check the current menu, services and opening times directly with the restaurant.",
      es:"Establecimiento gastronómico incluido en el directorio oficial de restaurantes y cafeterías de Kimitoön. Consulta el menú, los servicios y los horarios actuales directamente con el restaurante."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("696862b1-31ac-11f0-981a-3b9c14904d67.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["ravintola","baari"],
    contact:{phone:"0400 436 956",address:"Stallbacksvägen 6, 25900 Dalsbruk"}
  },
  {
    id:"farmors-cafe",categories:["ruoka"],
    name:{fi:"Farmors Café",en:"Farmors Café",es:"Farmors Café"},
    description:{
      fi:"Högsåran saarella historiallisessa Gamla Lillstuganin luotsimökissä toimiva saaristokahvila ja ravintola. Farmors Café on palvellut vuodesta 1994. Päivittäin vaihtuva ruokalista rakentuu sesongin ja paikallisten tuottajien raaka-aineista, ja annoksia viimeistellään oman puutarhan kukilla ja yrteillä. Saareen saavutaan Svartnäsin lossilla; auto kannattaa jättää Svartnäsiin ja jatkaa kävellen tai pyörällä.",
      en:"An archipelago café and restaurant in the historic Gamla Lillstugan pilot cottage on Högsåra island. Farmors Café has welcomed visitors since 1994. Its changing daily menu is built around seasonal ingredients from local producers and dishes are finished with flowers and herbs from its own garden. Reach the island by ferry from Svartnäs; visitors are encouraged to leave the car there and continue on foot or by bicycle.",
      es:"Cafetería y restaurante del archipiélago en la histórica casa de práctico Gamla Lillstugan, en la isla de Högsåra. Farmors Café recibe visitantes desde 1994. Su menú diario cambia según la temporada y utiliza ingredientes de productores locales; los platos se terminan con flores y hierbas de su propio jardín. Se llega a la isla en ferry desde Svartnäs; se recomienda dejar el coche allí y continuar a pie o en bicicleta."
    },
    location:{fi:"Högsåra Byväg 49 C, 25960 Högsåra",en:"Högsåra Byväg 49 C, 25960 Högsåra",es:"Högsåra Byväg 49 C, 25960 Högsåra"},
    websiteUrl:"https://www.farmorscafe.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/301a8cd0-49e9-11f1-acb5-5ba5e2fcebfb.jpeg-760x1140.jpeg",imageCredit:"Farmors Café / Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/",contact:{phone:"+358 50 564 7039",address:"Högsåra Byväg 49 C, 25960 Högsåra"},tags:["saaristokahvila","ravintola","sesonkiruoka","Högsåra"]
  },
  {
    id:"rumpan-bar",categories:["ruoka"],
    name:{fi:"Rumpan Bar",en:"Rumpan Bar",es:"Rumpan Bar"},
    description:{
      fi:"Rumpan Bar kuuluu Visit Kemiönsaaren ravintola- ja kahvilahakemistoon. Tarkista palvelun tämänhetkinen kausi, ruoka- ja juomatarjonta sekä aukiolo suoraan toimijalta.",
      en:"Rumpan Bar is listed in Visit Kimitoön's restaurant and café directory. Confirm its current season, food and drink offering and opening times directly with the operator.",
      es:"Rumpan Bar figura en el directorio de restaurantes y cafeterías de Visit Kimitoön. Confirma la temporada, la oferta de comida y bebida y los horarios directamente con el operador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/",sourceUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/492375680_122225859446051009_8172683598906080449_n.jpg",imageCredit:"Rumpan Bar / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["baari","ravintola"]
  },

  {
    id:"db-bistro-runda-munken",categories:["ruoka"],
    name:{fi:"DB Bistro Runda Munken",en:"DB Bistro Runda Munken",es:"DB Bistro Runda Munken"},
    description:{
      fi:"Taalintehtaan ruokapaikka Kemiönsaaren virallisessa matkailuhakemistossa. Tarkista ruokalista, palveluajat ja mahdolliset pöytävaraukset suoraan ravintolalta.",
      en:"A Dalsbruk dining venue in the official Kimitoön tourism directory. Check the menu, service hours and any table reservations directly with the restaurant.",
      es:"Restaurante de Dalsbruk incluido en el directorio turístico oficial de Kimitoön. Consulta el menú, los horarios y las reservas directamente con el restaurante."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.rundamunkenbistro.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/db-bistro-runda-munken-2/",
    image:image("03ed40f0-91af-11f0-8258-4d9e02b2458f.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["ravintola","taalintehdas"]
  },
  {
    id:"oro-restaurant-12",categories:["ruoka"],
    name:{fi:"Örö Ravintola 12",en:"Örö Restaurant 12",es:"Restaurante 12 de Örö"},
    description:{
      fi:"Örön linnakesaaren ravintola. Tarkista merikuljetukset, kauden aukiolo, päivän menu ja palvelut ennen saarelle lähtöä.",
      en:"The restaurant on Örö Fortress Island. Check boat connections, seasonal opening, the day's menu and services before travelling to the island.",
      es:"Restaurante de la isla fortificada de Örö. Consulta las conexiones marítimas, la apertura de temporada, el menú del día y los servicios antes de viajar a la isla."
    },
    location:{fi:"Örön linnakesaari, Kemiönsaari",en:"Örö Fortress Island, Kimitoön",es:"Isla fortificada de Örö, Kimitoön"},
    websiteUrl:"https://www.oro.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/a0a60070-c025-11ed-8fb6-cd05a147400e.jpeg-374x211.jpeg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["ravintola","saari","retkikohde"]
  },
  // Activities, outdoor, culture, events and local services.
  {
    id:"jahti-eugenia",categories:["aktiviteetit"],
    name:{fi:"Jahti Eugenia – purjehdukset ja yleisöretket",en:"Yacht Eugenia – sailing trips",es:"Yate Eugenia – excursiones a vela"},
    description:{
      fi:"Perinteinen purjealus, jolla järjestetään yleisöpurjehduksia, tilauspurjehduksia ja teemaristeilyjä Kemiönsaaren saaristossa. Tarkista reitit ja lähtöpäivät järjestäjältä.",
      en:"A traditional sailing vessel offering public sails, private charters and themed trips in the Kimitoön archipelago. Check routes and departure dates with the operator.",
      es:"Embarcación tradicional que ofrece salidas públicas, chárteres privados y excursiones temáticas por el archipiélago de Kimitoön. Consulta rutas y fechas con el operador."
    },
    location:{fi:"Taalintehdas ja Kemiönsaaren saaristo",en:"Dalsbruk and the Kimitoön archipelago",es:"Dalsbruk y el archipiélago de Kimitoön"},
    websiteUrl:"https://www.jahtieugenia.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("01c4bf90-bde0-11ef-b4f3-d183349518f6.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["purjehdus","meriretki","historiallinen alus"]
  },
  {
    id:"haahkasafari-bengtskar",categories:["aktiviteetit"],
    name:{fi:"Haahkasafari Bengtskärin majakalle",en:"Eider safari to Bengtskär Lighthouse",es:"Safari de eideres al faro de Bengtskär"},
    description:{
      fi:"Merellinen retkituote Bengtskärin majakan suuntaan. Tarkista retken toteutuminen, ajankohta, lähtöpaikka ja sääehdot suoraan järjestäjältä.",
      en:"A sea excursion towards Bengtskär Lighthouse. Confirm operating dates, departure point and weather conditions directly with the organiser.",
      es:"Excursión marítima hacia el faro de Bengtskär. Confirma fechas, punto de salida y condiciones meteorológicas directamente con el organizador."
    },
    location:{fi:"Bengtskär ja Kemiönsaaren ulkosaaristo",en:"Bengtskär and the outer Kimitoön archipelago",es:"Bengtskär y el archipiélago exterior de Kimitoön"},
    websiteUrl:"https://rosala.johku.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("d3ae3db0-9574-11ed-95a7-e96820c1f2b7.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",tags:["meriretki","bengtskar","luonto"]
  },
  {
    id:"kajakkivuokraus-hiittinen",categories:["aktiviteetit"],
    name:{fi:"Kajakkivuokraus Hiittisissä",en:"Kayak rental in Hiittinen",es:"Alquiler de kayaks en Hiittinen"},
    description:{
      fi:"Kajakkivuokraus Hiittisten saaristossa. Varmista kaluston saatavuus, vuokrausehdot, turvallisuusohjeet ja säärajat suoraan palveluntarjoajalta.",
      en:"Kayak rental in the Hiittinen archipelago. Confirm equipment availability, rental terms, safety guidance and weather limits directly with the provider.",
      es:"Alquiler de kayaks en el archipiélago de Hiittinen. Confirma la disponibilidad del equipo, las condiciones, las instrucciones de seguridad y los límites meteorológicos con el proveedor."
    },
    location:{fi:"Hiittinen, Kemiönsaari",en:"Hiittinen, Kimitoön",es:"Hiittinen, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("7b0e2d00-2cfd-11f0-981a-3b9c14904d67.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["kajakki","vuokraus","vesillä"]
  },
  {
    id:"kalliokiipeily",categories:["aktiviteetit"],
    name:{fi:"Kalliokiipeily ja laskeutuminen",en:"Rock climbing and abseiling",es:"Escalada en roca y rápel"},
    description:{
      fi:"Kemiönsaaren aktiviteettihakemistossa esitelty kiipeilyelämys. Varmista toteutuspaikka, ohjaus, osallistujavaatimukset ja varaus suoraan järjestäjältä.",
      en:"A climbing experience featured in the Kimitoön activity directory. Confirm the location, guiding, participant requirements and booking directly with the organiser.",
      es:"Experiencia de escalada incluida en el directorio de actividades de Kimitoön. Confirma el lugar, la guía, los requisitos y la reserva directamente con el organizador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("269d1530-c367-11ed-8fb6-cd05a147400e.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["kiipeily","ulkoilu","opastus"]
  },
  {
    id:"nordic-gravel-kimitoon",categories:["aktiviteetit"],
    name:{fi:"Nordic Gravel Series Kemiönsaari",en:"Nordic Gravel Series Kimitoön",es:"Nordic Gravel Series Kimitoön"},
    description:{
      fi:"Kemiönsaaren soratiepyöräilyyn liittyvä tapahtuma ja reittikokonaisuus. Tarkista tulevat tapahtumapäivät, reitit ja osallistumisohjeet järjestäjän omista kanavista.",
      en:"A gravel-cycling event and route experience on Kimitoön. Check future event dates, routes and participation details through the organiser's channels.",
      es:"Evento y experiencia de ciclismo gravel en Kimitoön. Consulta próximas fechas, rutas e información de participación en los canales del organizador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://nordicgravel.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("ba25d1f0-a1eb-11ec-a15a-251d534f22f6-Nordic_Gravel_Series-KimitoDJI_0442-photo_Ville_Vappula-web.jpg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / Nordic Gravel Series",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["pyöräily","soratie","tapahtuma"]
  },
  {
    id:"guided-walk-dalsbruk",categories:["aktiviteetit"],
    name:{fi:"Opastettu kävely Taalintehtaalla",en:"Guided walk in Dalsbruk",es:"Paseo guiado por Dalsbruk"},
    description:{
      fi:"Opastettu kävely Taalintehtaan ruukkikylässä. Tarkista kierroksen kieli, kesto, lähtöpaikka ja varaus suoraan oppaalta tai järjestäjältä.",
      en:"A guided walk through the historic ironworks village of Dalsbruk. Confirm language, duration, meeting point and booking directly with the guide or organiser.",
      es:"Paseo guiado por el histórico pueblo siderúrgico de Dalsbruk. Confirma el idioma, la duración, el punto de encuentro y la reserva con el guía u organizador."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("9c3094f0-1b2a-11ee-aef2-f342e71dcccc.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["opastus","historia","kävely"]
  },
  {
    id:"guided-kayak-archipelago",categories:["aktiviteetit"],
    name:{fi:"Opastetut melontaretket ja kajakkivuokraus",en:"Guided kayak tours and kayak rental",es:"Rutas guiadas en kayak y alquiler"},
    description:{
      fi:"Opastettuja melontaretkiä ja kajakkivuokrausta Saaristomerellä. Tarkista reitit, kalusto, turvallisuusohjeet ja säästä riippuvat ehdot järjestäjältä.",
      en:"Guided kayaking trips and kayak rental in the Archipelago Sea. Check routes, equipment, safety guidance and weather-related terms with the organiser.",
      es:"Excursiones guiadas en kayak y alquiler en el mar del Archipiélago. Consulta rutas, equipo, seguridad y condiciones meteorológicas con el organizador."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("43d3bbb0-bdc5-11ed-a101-0d79684aa620.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["melonta","kajakki","opastus"]
  },
  {
    id:"saariston-loistoreitti",categories:["aktiviteetit"],
    name:{fi:"Saariston loistoreitti – Bengtskär ja Viikinkikeskus",en:"Archipelago Lighthouse Route – Bengtskär and Viking Centre",es:"Ruta de los faros – Bengtskär y Centro Vikingo"},
    description:{
      fi:"Meriretki, joka yhdistää Bengtskärin majakan ja Rosalan Viikinkikeskuksen. Lähtöajat, liikennöintikausi ja sääehdot tarkistetaan suoraan varauspalvelusta.",
      en:"A sea excursion connecting Bengtskär Lighthouse and Rosala Viking Centre. Check departures, operating season and weather conditions through the booking service.",
      es:"Excursión marítima que conecta el faro de Bengtskär y el Centro Vikingo de Rosala. Consulta salidas, temporada y condiciones meteorológicas en el servicio de reservas."
    },
    location:{fi:"Kasnäs, Rosala ja Bengtskär",en:"Kasnäs, Rosala and Bengtskär",es:"Kasnäs, Rosala y Bengtskär"},
    websiteUrl:"https://rosala.johku.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("bfa3bc50-a5e7-11ec-ae3f-d90d6bc680b4-Bengtskar-lighthouse-from-the-sea.jpg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["risteily","bengtskar","rosala"]
  },
  {
    id:"sauva-kalastuselamys",categories:["aktiviteetit"],
    name:{fi:"Sauva – kalastuselämys",en:"Sauva – fishing experience",es:"Sauva – experiencia de pesca"},
    description:{
      fi:"Kalastuselämys Kemiönsaaren saaristossa. Tarkista kalastusmuoto, välineet, kesto, osallistujamäärä ja varaus suoraan järjestäjältä.",
      en:"A fishing experience in the Kimitoön archipelago. Confirm the type of fishing, equipment, duration, group size and booking directly with the organiser.",
      es:"Experiencia de pesca en el archipiélago de Kimitoön. Confirma la modalidad, el equipo, la duración, el tamaño del grupo y la reserva con el organizador."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("5ace8090-dbf4-11ee-b0f4-2dd7468e4ebd.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["kalastus","merielämys"]
  },
  {
    id:"merigalleria-fabrik",categories:["kulttuuri"],
    name:{fi:"Merigalleria Fabrik",en:"Merigalleria Fabrik",es:"Merigalleria Fabrik"},
    description:{
      fi:"Taidegalleria Kemiönsaaren kulttuurikohteiden hakemistossa. Tarkista ajankohtaiset näyttelyt, aukiolo ja vierailuohjeet suoraan gallerialta.",
      en:"An art gallery listed among Kimitoön's cultural destinations. Check current exhibitions, opening times and visitor information directly with the gallery.",
      es:"Galería de arte incluida entre los destinos culturales de Kimitoön. Consulta las exposiciones, los horarios y la información para visitantes directamente con la galería."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("e3ec5b50-f7f9-11ef-82bd-bd0293da0d2e.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["taide","galleria","näyttely"]
  },
  {
    id:"kubu-kulturhus",categories:["kulttuuri","tapahtumat","tapahtumapaikat","ostokset"],
    name:{fi:"Kulturhus Björkboda (KUBU)",en:"Kulturhus Björkboda (KUBU)",es:"Kulturhus Björkboda (KUBU)"},
    description:{
      fi:"Björkbodan kulttuuritila, jossa järjestetään näyttelyitä ja ohjelmaa. Tarkista ajankohtainen näyttelykalenteri ja tapahtumien tiedot KUBUn omista kanavista.",
      en:"A cultural venue in Björkboda hosting exhibitions and programmes. Check the current exhibition calendar and event details through KUBU's own channels.",
      es:"Espacio cultural en Björkboda con exposiciones y actividades. Consulta la programación y los detalles de los eventos en los canales de KUBU."
    },
    location:{fi:"Björkboda, Kemiönsaari",en:"Björkboda, Kimitoön",es:"Björkboda, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/aktiviteetit/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("a65ac7f0-5f13-11f0-ae44-c12d0d4b9580.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["kulttuuri","näyttely","tapahtuma"]
  },
  {
    id:"soderlangvik-museum",categories:["kulttuuri","luonto","tapahtumat"],
    name:{fi:"Söderlångvikin museo",en:"Söderlångvik Museum",es:"Museo Söderlångvik"},
    description:{
      fi:"Söderlångvikin kartanon päärakennuksessa toimiva museo ja taidekohde. Yhdistä vierailuun kartanon puisto, omenatarhat, ravintola ja luontopolut; tarkista aukiolo viralliselta sivulta.",
      en:"A museum and art destination in the main building of Söderlångvik Manor. Combine the visit with the manor park, apple orchards, restaurant and nature trails; check opening times on the official site.",
      es:"Museo y destino artístico en el edificio principal de la mansión Söderlångvik. Combina la visita con el parque, los huertos, el restaurante y los senderos; consulta los horarios en la web oficial."
    },
    location:{fi:"Söderlångvik, Kemiönsaari",en:"Söderlångvik, Kimitoön",es:"Söderlångvik, Kimitoön"},
    websiteUrl:"https://soderlangvik.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("05e15580-ff43-11ef-a36c-890430c1f0f9.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / Söderlångvik",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["museo","taide","kartano"]
  },
  {
    id:"glassgaraget",categories:["ostokset","kulttuuri"],
    name:{fi:"Glassgaraget – tilapuoti ja kahvila",en:"Glassgaraget – farm shop and café",es:"Glassgaraget – tienda de granja y cafetería"},
    description:{
      fi:"Tilapuodin ja kahvilan yhdistelmä Kemiönsaaren virallisessa kohdehakemistossa. Tarkista myymälän valikoima, kahvilapalvelut ja aukiolo suoraan toimijalta.",
      en:"A farm shop and café featured in the official Kimitoön destination directory. Check the shop selection, café services and opening times directly with the operator.",
      es:"Tienda de granja y cafetería incluida en el directorio oficial de destinos de Kimitoön. Consulta la selección, los servicios y los horarios directamente con el operador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/kohteet/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("431dc520-0e37-11f0-88da-256e05b1f1a0.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["tilapuoti","kahvila","ostokset"]
  },
  {
    id:"baltic-jazz",categories:["tapahtumat"],
    name:{fi:"Baltic Jazz",en:"Baltic Jazz",es:"Baltic Jazz"},
    description:{
      fi:"Taalintehtaan ja Kemiönsaaren tunnettu jazzfestivaali. Tarkista seuraavan tapahtumavuoden ohjelma, liput, esiintyjät ja aikataulut suoraan festivaalin järjestäjältä.",
      en:"A well-known jazz festival in Dalsbruk and Kimitoön. Check the next festival programme, tickets, performers and schedules directly with the organiser.",
      es:"Festival de jazz conocido en Dalsbruk y Kimitoön. Consulta el próximo programa, las entradas, los artistas y los horarios directamente con el organizador."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.balticjazz.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/tapahtumat/",
    image:image("f49c5f30-f8d3-11ed-b821-95e694c35326.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / Baltic Jazz",imageSource:"https://www.visitkimitoon.fi/fi/nae-ja-koe/tapahtumat/",tags:["festivaali","musiikki","kesä"]
  },

  {
    id:"dalsbruk-harbour",categories:["saaristo"],
    name:{fi:"Taalintehtaan vierasvenesatama",en:"Dalsbruk Guest Harbour",es:"Puerto deportivo de Dalsbruk"},
    description:{
      fi:"Taalintehtaan vierasvenesatama on yksi Kemiönsaaren virallisen matkailusivuston esiin nostamista satamista. Tarkista palvelut, venepaikat ja satamatoimiston aukiolo sataman omista tiedoista.",
      en:"Dalsbruk Guest Harbour is one of the harbours highlighted by the official Kimitoön tourism site. Check services, berths and harbour office hours in the harbour's own information.",
      es:"El puerto deportivo de Dalsbruk es uno de los puertos destacados por la web turística oficial de Kimitoön. Consulta servicios, amarres y horarios en la información del puerto."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",sourceUrl:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",tags:["satama","veneily","taalintehdas"]
  },
  {
    id:"kasnas-harbour",categories:["saaristo"],
    name:{fi:"Kasnäsin vierasvenesatama",en:"Kasnäs Guest Harbour",es:"Puerto deportivo de Kasnäs"},
    description:{
      fi:"Kasnäsin satama toimii tärkeänä porttina ulkosaaristoon ja yhteyksiin Örön sekä muiden merikohteiden suuntaan. Tarkista satamapalvelut ja yhteydet ennen matkaa.",
      en:"Kasnäs harbour is an important gateway to the outer archipelago and boat connections towards Örö and other sea destinations. Check harbour services and connections before travelling.",
      es:"El puerto de Kasnäs es una puerta importante al archipiélago exterior y a las conexiones marítimas hacia Örö y otros destinos. Consulta los servicios y conexiones antes de viajar."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://www.kasnas.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",tags:["satama","veneily","ulkosaaristo"]
  },
  {
    id:"oro-guest-harbour",categories:["saaristo"],
    name:{fi:"Örön vierasvenesatama",en:"Örö Guest Harbour",es:"Puerto deportivo de Örö"},
    description:{
      fi:"Örön linnakesaaren vierasvenesatama palvelee omalla veneellä saapuvia. Tarkista sataman ajantasaiset palvelut, paikkatilanne ja saaren muut palvelut ennen lähtöä.",
      en:"Örö Guest Harbour serves visitors arriving by private boat. Check current harbour services, berth availability and other island services before departure.",
      es:"El puerto deportivo de Örö recibe a quienes llegan en barco propio. Consulta los servicios, la disponibilidad de amarres y otros servicios de la isla antes de salir."
    },
    location:{fi:"Örön linnakesaari, Kemiönsaari",en:"Örö Fortress Island, Kimitoön",es:"Isla fortificada de Örö, Kimitoön"},
    websiteUrl:"https://www.oro.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/",tags:["satama","veneily","saari"]
  },
  {
    id:"sagalund-museum",categories:["kulttuuri"],
    name:{fi:"Sagalundin museo",en:"Sagalund Museum",es:"Museo Sagalund"},
    description:{
      fi:"Kemiön ulkomuseo ja kulttuurikohde, jossa esitellään paikallista historiaa ja rakennusperintöä. Tarkista näyttelyt, tapahtumat ja vierailuajat museon omilta sivuilta.",
      en:"An open-air museum and cultural destination in Kimito, presenting local history and built heritage. Check exhibitions, events and visiting hours on the museum's own website.",
      es:"Museo al aire libre y destino cultural en Kimito que presenta la historia y el patrimonio local. Consulta exposiciones, eventos y horarios en la web del museo."
    },
    location:{fi:"Kemiö, Kemiönsaari",en:"Kimito, Kimitoön",es:"Kimito, Kimitoön"},
    websiteUrl:"https://www.sagalund.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",imageCredit:"Visit Kemiönsaari / Sagalund",imageSource:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",tags:["museo","kulttuuri","historia"]
  },
  {
    id:"soderlangvik-manor",categories:["kulttuuri","majoitus","ruoka","luonto","ostokset","tapahtumat","tapahtumapaikat"],
    name:{fi:"Söderlångvikin kartano",en:"Söderlångvik Manor",es:"Mansión Söderlångvik"},
    description:{
      fi:"Kartanoalue yhdistää museon, taiteen, omenatarhat, ravintolan, tapahtumat ja luontopolut. Tarkista kausittaiset palvelut ja vierailutiedot kartanon omilta sivuilta.",
      en:"The manor estate combines a museum, art, apple orchards, restaurant, events and nature trails. Check seasonal services and visitor information on the estate's own website.",
      es:"La finca combina museo, arte, huertos de manzanos, restaurante, eventos y senderos. Consulta los servicios de temporada y la información para visitantes en la web de la finca."
    },
    location:{fi:"Söderlångvik, Kemiönsaari",en:"Söderlångvik, Kimitoön",es:"Söderlångvik, Kimitoön"},
    websiteUrl:"https://soderlangvik.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/03/sloderlangvik-museum2-760x507.jpg",imageCredit:"Visit Kemiönsaari / Söderlångvik",imageSource:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",tags:["kartano","museo","omenatarha","luonto"]
  },
  {
    id:"taalintehdas-ironworks",categories:["kulttuuri"],
    name:{fi:"Taalintehtaan ruukkiperintö",en:"Dalsbruk Ironworks Heritage",es:"Patrimonio siderúrgico de Dalsbruk"},
    description:{
      fi:"Taalintehtaan historiallinen ruukkimiljöö kertoo alueen teollisesta historiasta. Tutustu alueen reitteihin ja nähtävyyksiin paikan päällä sekä virallisissa matkailutiedoissa.",
      en:"The historic ironworks setting of Dalsbruk tells the story of the area's industrial past. Explore local routes and sights on site and through official visitor information.",
      es:"El entorno histórico de la ferrería de Dalsbruk cuenta el pasado industrial de la zona. Descubre las rutas y los lugares de interés en el propio pueblo y en la información turística oficial."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",sourceUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",tags:["historia","ruukki","kävely"]
  },






  {
    id:"storfinnhova-gard",categories:["majoitus","ruoka","hyvinvointi","tapahtumapaikat"],
    name:{fi:"Storfinnhova Gård",en:"Storfinnhova Gård",es:"Storfinnhova Gård"},
    description:{
      fi:"Björkbodassa sijaitseva maatilakohde, jossa voi yöpyä huviloissa ja puumajoissa. Palveluihin kuuluvat ravintola ja catering sekä maanalainen graniittinen savusauna ja perinteinen sauna. Soveltuu myös ryhmille ja tapahtumille.",
      en:"A countryside destination in Björkboda offering stays in villas and tree accommodation. Services include a restaurant, catering, an underground granite smoke sauna and a traditional sauna. The venue also caters for groups and events.",
      es:"Alojamiento rural en Björkboda con villas y cabañas en los árboles. Ofrece restaurante, catering, una sauna de humo subterránea de granito y una sauna tradicional. También recibe grupos y eventos."
    },
    location:{fi:"Finnhovavägen 163, 25860 Björkboda",en:"Finnhovavägen 163, 25860 Björkboda",es:"Finnhovavägen 163, 25860 Björkboda"},
    websiteUrl:"https://www.storfinnhova.com/",sourceUrl:"https://ksg.fi/fi/foretag/storfinnhova-gard/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/080925-Kemio-tilakuvat-web-103-1024x683.jpg",imageCredit:"Storfinnhova Gård / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/storfinnhova-gard/",tags:["huvilat","puumajoitus","savusauna","catering"],contact:{phone:"+358 40 552 8344",address:"Finnhovavägen 163, 25860 Björkboda"}
  },
  {
    id:"ragnar-antonin-lomakyla",categories:["majoitus","aktiviteetit","luonto"],
    name:{fi:"Ragnar Antonin Lomakylä",en:"Ragnar Anton's Holiday Village",es:"Complejo vacacional Ragnar Anton"},
    description:{
      fi:"Merenrantamökkejä ja mukavuuksilla varustettuja loma-asuntoja Kemiönsaaren luonnon keskellä. Lomakylän ympärillä on suojaisia merialueita kalastukseen, saaristoluontoa, kotieläimiä ja historiallisia nähtävyyksiä.",
      en:"Seaside cottages and comfortable holiday homes surrounded by Kimitoön nature. Sheltered waters nearby offer fishing opportunities, while the area features archipelago nature, farm animals and historic sights.",
      es:"Cabañas junto al mar y casas vacacionales equipadas en plena naturaleza de Kimitoön. Las aguas protegidas cercanas permiten pescar y la zona ofrece naturaleza del archipiélago, animales y lugares históricos."
    },
    location:{fi:"Elmdalsvägen 366, 25700 Kemiö",en:"Elmdalsvägen 366, 25700 Kimito",es:"Elmdalsvägen 366, 25700 Kimito"},
    websiteUrl:"https://www.ragnaranton.fi/",sourceUrl:"https://ksg.fi/fi/foretag/ragnar-antons-semesterby/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/IMG_20260528_172332-1-1024x460.jpg",imageCredit:"Ragnar Antonin Lomakylä / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/ragnar-antons-semesterby/",tags:["merenrantamökit","kalastus","saaristoluonto"],contact:{phone:"050 524 5348 / 044 511 69 00",address:"Elmdalsvägen 366, 25700 Kemiö"}
  },
  {
    id:"bjarkas-golf",categories:["aktiviteetit","majoitus","ruoka","tapahtumapaikat"],
    name:{fi:"Bjärkas Golf",en:"Bjärkas Golf",es:"Bjärkas Golf"},
    description:{
      fi:"Västanfjärdin historiallisella tilalla sijaitseva kaikille avoin 18-reikäinen par 57 -golfkenttä. Tilan toimintaan yhdistyvät golf, majoitus ja ruokailujen järjestäminen suuremmillekin ryhmille. Ilmoitettu tavanomainen pelikausi on huhtikuusta marraskuuhun.",
      en:"An open-to-all 18-hole par-57 golf course on a historic estate in Västanfjärd. The estate combines golf, accommodation and dining for larger groups. Its listed normal golf season runs from April to November.",
      es:"Campo de golf de 18 hoyos par 57 abierto a todos, situado en una finca histórica de Västanfjärd. La finca combina golf, alojamiento y comidas para grupos. La temporada habitual indicada va de abril a noviembre."
    },
    location:{fi:"Västanfjärdsvägen 655, 25840 Nivelax",en:"Västanfjärdsvägen 655, 25840 Nivelax",es:"Västanfjärdsvägen 655, 25840 Nivelax"},
    websiteUrl:"https://bjarkasgolf.com/",sourceUrl:"https://ksg.fi/fi/foretag/bjarkas-golf-2/",
    imageCredit:"Bjärkas Golf / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/bjarkas-golf-2/",tags:["golf","majoitus","ryhmäruokailu"],contact:{phone:"044 0184 653",address:"Västanfjärdsvägen 655, 25840 Nivelax"}
  },
  {
    id:"rosala-viking-centre",categories:["aktiviteetit","kulttuuri","tapahtumapaikat"],
    name:{fi:"Rosalan Viikinkikeskus",en:"Rosala Viking Centre",es:"Centro Vikingo de Rosala"},
    description:{
      fi:"Rosalan viikinkikylä on elävöittävä vierailukeskus, jossa tutustutaan rautakauden loppuun ja viikinkiaikaan. Pääsylippuun sisältyy lyhyt opastus ja kartta lähes 30 kohteeseen. Ryhmille voi varata opastuksia, ohjelmaa, juhlia ja kokouksia; Rodeborgin päällikön halli toimii juhlatilana.",
      en:"Rosala's Viking village is an immersive visitor centre exploring the late Iron Age and Viking era. Admission includes a short guided introduction and a map of nearly 30 points of interest. Groups can book tours, activities, celebrations and meetings; the Rodeborg chieftain's hall serves as an event venue.",
      es:"La aldea vikinga de Rosala es un centro de visitas inmersivo dedicado al final de la Edad del Hierro y la época vikinga. La entrada incluye una breve visita guiada y un mapa con casi 30 puntos de interés. Los grupos pueden reservar visitas, actividades, celebraciones y reuniones; la sala Rodeborg sirve como espacio para eventos."
    },
    location:{fi:"Reimarsvägen 5, 25950 Rosala",en:"Reimarsvägen 5, 25950 Rosala",es:"Reimarsvägen 5, 25950 Rosala"},
    websiteUrl:"https://rosala.fi/",sourceUrl:"https://ksg.fi/fi/foretag/rosala-bengtskar-bokningsbyra/",
    imageCredit:"Rosalan Viikinkikeskus / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/rosala-bengtskar-bokningsbyra/",tags:["viikinkikylä","opastus","ryhmät","juhlatilat"],contact:{phone:"040 218 2960",address:"Reimarsvägen 5, 25950 Rosala"}
  },
  {
    id:"oro-linnakesaari-provider",categories:["aktiviteetit","saaristo","luonto","kulttuuri","majoitus","ruoka","hyvinvointi","ostokset","tapahtumapaikat"],
    name:{fi:"Örön linnakesaari",en:"Örö Fortress Island",es:"Isla fortificada de Örö"},
    description:{
      fi:"Saaristomeren kansallispuistossa sijaitseva historiallinen linnakesaari. Saarella on kasarmialueita, Obuhov-tykkejä ja puolustusasemia sekä luontoarvoja. KSG:n palvelukuvauksen mukaan saarella on vierasvenesatama, kaksi ravintolaa, kesäpuoti, kolme saunaa, kokoustiloja ja majoitusta jopa 150 hengelle. Merimatka Kasnäsistä kestää noin 30–60 minuuttia; tarkista yhteydet ja palvelujen kausi suoraan Öröltä.",
      en:"A historic fortress island in the Archipelago Sea National Park, with barracks, Obukhov guns, defence structures and important natural habitats. The KSG service listing describes a guest harbour, two restaurants, a summer shop, three saunas, meeting facilities and accommodation for up to 150 people. The sea journey from Kasnäs takes about 30–60 minutes; confirm connections and seasonal services directly with Örö.",
      es:"Isla fortificada histórica en el Parque Nacional del Mar del Archipiélago, con antiguos cuarteles, cañones Obujov, fortificaciones y hábitats naturales importantes. La ficha de servicios de KSG menciona puerto deportivo, dos restaurantes, tienda de verano, tres saunas, salas de reuniones y alojamiento para hasta 150 personas. El trayecto marítimo desde Kasnäs dura unos 30–60 minutos; confirma conexiones y servicios de temporada con Örö."
    },
    location:{fi:"Örön linnakesaari, lähtö Kasnäsistä",en:"Örö Fortress Island, departures from Kasnäs",es:"Isla fortificada de Örö, salidas desde Kasnäs"},
    websiteUrl:"https://www.visitoro.fi/",sourceUrl:"https://ksg.fi/fi/foretag/oro-kustfort/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/109806881_2536080173161910_1059034139197076780_n-1024x768.webp",imageCredit:"Örö / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/oro-kustfort/",tags:["kansallispuisto","historia","vierasvenesatama","majoitus","saunat"],contact:{phone:"401 447 773",address:"Kerhontie 1, 25930 Kasnäs"}
  },
  {
    id:"hitis-rodd-kanotklubb",categories:["aktiviteetit","saaristo","luonto"],
    name:{fi:"Hitis Rodd- och Kanotklubb",en:"Hitis Rowing and Canoeing Club",es:"Club de remo y piragüismo de Hitis"},
    description:{
      fi:"Hiittisten alueen soutu- ja melontayhdistys, joka kuuluu Kemiönsaaren palveluoppaan aktiviteettitoimijoihin. Tarkista yhdistyksen omista kanavista mahdolliset tapahtumat, toiminta ja vierailijoille tarjolla olevat palvelut.",
      en:"A rowing and canoeing club in the Hiittinen area, listed among Kimitoön's activity providers. Check the club's own channels for events, activities and any visitor services.",
      es:"Club de remo y piragüismo de la zona de Hiittinen, incluido entre los proveedores de actividades de Kimitoön. Consulta sus canales para conocer eventos, actividades y servicios para visitantes."
    },
    location:{fi:"25940 Hiittinen",en:"25940 Hiittinen",es:"25940 Hiittinen"},
    websiteUrl:"https://www.hitisroddklubb.fi/ny/",sourceUrl:"https://ksg.fi/fi/foretag/hitis-rodd-och-kanotklubb-r-f/",
    imageCredit:"Hitis Rodd- och Kanotklubb / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/hitis-rodd-och-kanotklubb-r-f/",tags:["soutu","melonta","yhdistys"],contact:{phone:"0400 638 323",address:"25940 Hiittinen"}
  },
  {
    id:"arkipelag-workshop",categories:["aktiviteetit","kulttuuri","tapahtumapaikat"],
    name:{fi:"Arkipelag Workshop / Ateljé Tjuda Pedagogi",en:"Arkipelag Workshop / Ateljé Tjuda Pedagogi",es:"Arkipelag Workshop / Ateljé Tjuda Pedagogi"},
    description:{
      fi:"Taidegrafiikan työpaja Kemiössä. Tarjolla on taidekursseja lapsille ja aikuisille sekä työskentelytilaa ammattilaisille ja harrastajille päivä- tai viikkovuokralla.",
      en:"An art-printmaking workshop in Kimito. It offers art courses for children and adults, plus workspace for professionals and hobbyists by the day or week.",
      es:"Taller de grabado artístico en Kimito. Ofrece cursos de arte para niños y adultos, además de espacios de trabajo para profesionales y aficionados por días o semanas."
    },
    location:{fi:"Pedagogivägen 9, 25700 Kemiö",en:"Pedagogivägen 9, 25700 Kimito",es:"Pedagogivägen 9, 25700 Kimito"},
    websiteUrl:"https://ksg.fi/fi/foretag/arkipelag-workshop-rf/",sourceUrl:"https://ksg.fi/fi/foretag/arkipelag-workshop-rf/",
    imageCredit:"Arkipelag Workshop / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/arkipelag-workshop-rf/",tags:["taidegrafiikka","kurssit","työpaja"],contact:{phone:"040 540 1223",address:"Pedagogivägen 9, 25700 Kemiö"}
  },
  {
    id:"festival-norpas",categories:["tapahtumat","kulttuuri"],
    name:{fi:"Festival Norpas",en:"Festival Norpas",es:"Festival Norpas"},
    description:{
      fi:"Taalintehtaan kulttuuri- ja taidefestivaali. Ajankohtainen ohjelma, esiintyjät, liput ja tapahtumapaikat julkaistaan festivaalin omissa kanavissa.",
      en:"A culture and arts festival in Dalsbruk. The current programme, performers, tickets and venues are published through the festival's own channels.",
      es:"Festival de cultura y arte en Dalsbruk. El programa, los artistas, las entradas y los espacios se publican en los canales oficiales del festival."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.norpas.fi/",sourceUrl:"https://ksg.fi/fi/foretag/norpas-ry/",
    imageCredit:"Festival Norpas / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/norpas-ry/",tags:["festivaali","taide","kulttuuri"],contact:{phone:"044 907 2891",address:"Taalintehdas, Kemiönsaari"}
  },
  {
    id:"finlandia-sailing",categories:["aktiviteetit","saaristo","kuljetukset"],
    name:{fi:"Finlandia Sailing",en:"Finlandia Sailing",es:"Finlandia Sailing"},
    description:{
      fi:"Kasnäsissä toimiva venevuokraus- ja charter-palvelu. Kemiönsaaren palveluoppaan mukaan vuokraveneitä on tarjolla Suomen lisäksi Tukholman saaristossa, Välimerellä sekä Karibialla. Tarkista venevalikoima, alueet ja ehdot suoraan toimijalta.",
      en:"A boat rental and charter operator based in Kasnäs. The Kimitoön business guide lists rental boats in Finland, the Stockholm archipelago, the Mediterranean and the Caribbean. Confirm the fleet, areas and terms directly with the operator.",
      es:"Servicio de alquiler de barcos y chárter con base en Kasnäs. La guía empresarial de Kimitoön menciona embarcaciones en Finlandia, el archipiélago de Estocolmo, el Mediterráneo y el Caribe. Confirma la flota, las zonas y las condiciones directamente con el operador."
    },
    location:{fi:"Kasnäsvägen 1294, 25930 Kasnäs",en:"Kasnäsvägen 1294, 25930 Kasnäs",es:"Kasnäsvägen 1294, 25930 Kasnäs"},
    websiteUrl:"https://www.facebook.com/finlandiasailing",sourceUrl:"https://ksg.fi/fi/foretag/finlandia-sailing-ab-oy-kasnas/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/Santtu-yrittaa-loytaa-tuulen-henkea-1024x576.jpg",imageCredit:"Finlandia Sailing / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/finlandia-sailing-ab-oy-kasnas/",tags:["venevuokraus","charter","saaristo"],contact:{phone:"+358 400 421 050",address:"Kasnäsvägen 1294, 25930 Kasnäs"}
  },
  {
    id:"kalkholmen-marina",categories:["saaristo","kuljetukset","ruoka","aktiviteetit","hyvinvointi"],
    name:{fi:"Kalkholmen Marina",en:"Kalkholmen Marina",es:"Kalkholmen Marina"},
    description:{
      fi:"Västanfjärdin vierasvenesatama ja merellinen palvelukeskus. KSG:n mukaan alueella voi ruokailla, saunoa, pelata padelia ja tankata; satamassa on myös vuokrattavia sesonkipaikkoja. Tarkista venepaikat ja palvelujen kausi suoraan marinasta.",
      en:"A guest harbour and seaside service hub in Västanfjärd. KSG lists dining, sauna, padel and fuel services, as well as seasonal berths for rent. Check berth availability and seasonal services directly with the marina.",
      es:"Puerto deportivo y centro de servicios junto al mar en Västanfjärd. KSG menciona restaurante, sauna, pádel y combustible, además de amarres de temporada en alquiler. Consulta disponibilidad y servicios directamente con el puerto."
    },
    location:{fi:"Kalkholmsvägen 43, 25830 Västanfjärd",en:"Kalkholmsvägen 43, 25830 Västanfjärd",es:"Kalkholmsvägen 43, 25830 Västanfjärd"},
    websiteUrl:"https://www.kalkholmenmarina.fi/",sourceUrl:"https://ksg.fi/fi/foretag/kalkholmen-marina/",
    imageCredit:"Kalkholmen Marina / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/kalkholmen-marina/",tags:["vierasvenesatama","padel","sauna","tankkaus"],contact:{phone:"040 529 1258",address:"Kalkholmsvägen 43, 25830 Västanfjärd"}
  },

  {
    id:"kimitoon-guides",categories:["aktiviteetit","kulttuuri","muut-palvelut"],
    name:{fi:"Kemiönsaaren oppaat ry",en:"Kimitoön Guides Association",es:"Asociación de guías de Kimitoön"},
    description:{
      fi:"Paikallisten oppaiden yhdistys, joka kuuluu Kemiönsaaren palveluoppaan opastus- ja matkailupalveluihin. Kysy opastettuja kierroksia, kielivaihtoehtoja ja ryhmille sopivia ohjelmia suoraan yhdistykseltä.",
      en:"An association of local guides listed among Kimitoön's guiding and visitor services. Ask the association about guided tours, available languages and programmes for groups.",
      es:"Asociación de guías locales incluida entre los servicios turísticos de Kimitoön. Consulta visitas guiadas, idiomas disponibles y programas para grupos directamente con la asociación."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/kimitoons-guider/",sourceUrl:"https://ksg.fi/fi/foretag/kimitoons-guider/",
    imageCredit:"Kemiönsaaren oppaat / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/kimitoons-guider/",tags:["opastus","paikallishistoria","ryhmät"]
  },
  {
    id:"lemonlake-snooker",categories:["aktiviteetit"],
    name:{fi:"Lemonlake Snooker",en:"Lemonlake Snooker",es:"Lemonlake Snooker"},
    description:{
      fi:"Sisäaktiviteetti Kemiönsaaren palveluoppaan vapaa-ajan tarjonnassa. Tarkista pelimahdollisuudet, varaus ja aukiolo suoraan toimijalta.",
      en:"An indoor leisure activity listed in the Kimitoön business guide. Confirm playing opportunities, booking and opening times directly with the operator.",
      es:"Actividad de ocio en interior incluida en la guía empresarial de Kimitoön. Consulta las posibilidades de juego, la reserva y los horarios directamente con el operador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/lemonlake-snooker/",sourceUrl:"https://ksg.fi/fi/foretag/lemonlake-snooker/",
    imageCredit:"Lemonlake Snooker / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/lemonlake-snooker/",tags:["snooker","sisäaktiviteetti"]
  },
  {
    id:"made-in-hitis",categories:["ostokset","kulttuuri"],
    name:{fi:"Made in Hitis",en:"Made in Hitis",es:"Made in Hitis"},
    description:{
      fi:"Hiittisten paikalliseen käsityöhön ja tuotteisiin liittyvä toimija Kemiönsaaren palveluoppaassa. Tarkista ajankohtainen tuotevalikoima, myyntipaikat ja vierailumahdollisuudet suoraan toimijalta.",
      en:"A local crafts and products business in Hiittinen, listed in the Kimitoön business guide. Confirm the current product range, sales locations and visiting opportunities directly with the operator.",
      es:"Proyecto local de artesanía y productos de Hiittinen incluido en la guía empresarial de Kimitoön. Consulta la selección actual, los puntos de venta y las visitas directamente con el operador."
    },
    location:{fi:"Hiittinen, Kemiönsaari",en:"Hiittinen, Kimitoön",es:"Hiittinen, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/made-in-hitis-hitis-roddklubb/",sourceUrl:"https://ksg.fi/fi/foretag/made-in-hitis-hitis-roddklubb/",
    imageCredit:"Made in Hitis / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/made-in-hitis-hitis-roddklubb/",tags:["paikallistuotteet","käsityö","hiittinen"]
  },
  {
    id:"uppgards-fotisgolf",categories:["aktiviteetit","tapahtumapaikat"],
    name:{fi:"Uppgårds Fotisgolf",en:"Uppgårds Footgolf",es:"Footgolf Uppgårds"},
    description:{
      fi:"Jalkapallogolfiin perustuva ulkoaktiviteetti Kemiönsaaren palveluoppaan vapaa-ajan tarjonnassa. Tarkista kentän aukiolo, ryhmävaraukset ja mahdolliset tapahtumat suoraan toimijalta.",
      en:"An outdoor footgolf activity listed in the Kimitoön business guide. Check course opening, group bookings and possible events directly with the operator.",
      es:"Actividad al aire libre de footgolf incluida en la guía empresarial de Kimitoön. Consulta la apertura del campo, las reservas de grupos y los eventos directamente con el operador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/uppgards-fotisgolf-ob/",sourceUrl:"https://ksg.fi/fi/foretag/uppgards-fotisgolf-ob/",
    imageCredit:"Uppgårds Fotisgolf / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/uppgards-fotisgolf-ob/",tags:["jalkapallogolf","ulkoilu","ryhmät"]
  },
  {
    id:"utetop",categories:["aktiviteetit","luonto"],
    name:{fi:"UteTop Oy",en:"UteTop Oy",es:"UteTop Oy"},
    description:{
      fi:"Kemiönsaaren palveluoppaan urheilu- ja vapaa-ajan toimija. Tarkista ajankohtaiset ulkoilu- ja aktiviteettipalvelut suoraan yritykseltä ennen vierailua.",
      en:"A sports and leisure operator listed in the Kimitoön business guide. Confirm current outdoor and activity services directly with the company before visiting.",
      es:"Proveedor de actividades deportivas y de ocio incluido en la guía empresarial de Kimitoön. Confirma los servicios actuales directamente con la empresa antes de visitarla."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/utetop-oy/",sourceUrl:"https://ksg.fi/fi/foretag/utetop-oy/",
    imageCredit:"UteTop Oy / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/utetop-oy/",tags:["ulkoilu","aktiviteetit"]
  },
  // Food and drink businesses listed in the Kemiönsaari Business Guide.
  {
    id:"cafe-dacapo",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Café DaCapo",en:"Café DaCapo",es:"Café DaCapo"},
    description:{
      fi:"Kemiön keskustan kahvila, josta voi tilata täyte- ja voileipäkakkuja. Palveluopas mainitsee myös pitopalvelun, joten yritys sopii sekä kahvila- että juhlapalveluhakuun.",
      en:"A café in central Kimito offering made-to-order celebration cakes and savoury sandwich cakes. The business guide also lists catering, making it relevant for both café and event-service searches.",
      es:"Cafetería en el centro de Kimito que prepara tartas para celebraciones y pasteles salados por encargo. La guía empresarial también menciona catering, por lo que es útil para búsquedas de cafeterías y eventos."
    },
    location:{fi:"Gästgivargränd 2–4, 25700 Kemiö",en:"Gästgivargränd 2–4, 25700 Kimito",es:"Gästgivargränd 2–4, 25700 Kimito"},
    websiteUrl:"https://ksg.fi/fi/foretag/cafe-dacapo-2/",sourceUrl:"https://ksg.fi/fi/foretag/cafe-dacapo-2/",
    image:"https://ksg.fi/wp-content/uploads/2026/02/485413175_1156888506222939_8730533031590318541_n-772x1024.jpg",imageCredit:"Café DaCapo / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/cafe-dacapo-2/",tags:["kahvila","kakut","pitopalvelu"],contact:{phone:"0400 608 818",address:"Gästgivargränd 2–4, 25700 Kemiö"}
  },
  {
    id:"backom-cafe-pub",categories:["ruoka"],
    name:{fi:"Backom Café & Pub",en:"Backom Café & Pub",es:"Backom Café & Pub"},
    description:{
      fi:"Hiittisten kesäkahvila ja pubi Hitisvägenin varrella. Tarkista kauden aukiolo, tarjoilu ja tapahtumat suoraan toimijalta.",
      en:"A summer café and pub in Hiittinen on Hitisvägen. Confirm seasonal opening, food and drink service and events directly with the operator.",
      es:"Cafetería y pub de verano en Hiittinen, junto a Hitisvägen. Consulta la apertura de temporada, la oferta y los eventos directamente con el establecimiento."
    },
    location:{fi:"Hitisvägen 19, 25940 Hitis",en:"Hitisvägen 19, 25940 Hitis",es:"Hitisvägen 19, 25940 Hitis"},
    websiteUrl:"https://ksg.fi/fi/foretag/backom-cafe-pub/",sourceUrl:"https://ksg.fi/fi/foretag/backom-cafe-pub/",
    imageCredit:"Backom Café & Pub / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/backom-cafe-pub/",tags:["kesäkahvila","pub"],contact:{phone:"040 759 5290",address:"Hitisvägen 19, 25940 Hitis"}
  },
  {
    id:"cafe-kompass",categories:["ruoka"],
    name:{fi:"Cafe Kompass",en:"Cafe Kompass",es:"Cafe Kompass"},
    description:{
      fi:"Kemiön keskustan kahvila Engelsbyntiellä. Tarkista kahvilan tämänhetkinen valikoima, aukiolo ja mahdolliset tilaukset suoraan kahvilalta.",
      en:"A café in central Kimito on Engelsbyntie. Check the current café selection, opening times and any special orders directly with the café.",
      es:"Cafetería en el centro de Kimito, en Engelsbyntie. Consulta la oferta actual, los horarios y los encargos directamente con la cafetería."
    },
    location:{fi:"Engelsbyntie 9, 25700 Kemiö",en:"Engelsbyntie 9, 25700 Kimito",es:"Engelsbyntie 9, 25700 Kimito"},
    websiteUrl:"https://ksg.fi/fi/foretag/cafe-kompass/",sourceUrl:"https://ksg.fi/fi/foretag/cafe-kompass/",
    imageCredit:"Cafe Kompass / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/cafe-kompass/",tags:["kahvila"],contact:{phone:"041 310 3055 / 041 504 9309",address:"Engelsbyntie 9, 25700 Kemiö"}
  },
  {
    id:"bistro-marita",categories:["ruoka"],
    name:{fi:"Bistro Marita",en:"Bistro Marita",es:"Bistro Marita"},
    description:{
      fi:"Rosalan kylässä toimiva bistro, jossa palveluoppaan mukaan on bistroruokaa, kahvilatuotteita, viinejä ja olutvalikoima. Tarkista aukiolo ja tarjonta ennen saaristomatkaa.",
      en:"A bistro in the village of Rosala. The business guide lists bistro food, café products, wines and a beer selection. Check opening times and the current offering before travelling to the islands.",
      es:"Bistró en el pueblo de Rosala. La guía empresarial menciona comida de bistró, productos de cafetería, vinos y cervezas. Consulta los horarios y la oferta actual antes de viajar al archipiélago."
    },
    location:{fi:"Rosalan kylätie 34, 25950 Rosala",en:"Rosalan kylätie 34, 25950 Rosala",es:"Rosalan kylätie 34, 25950 Rosala"},
    websiteUrl:"https://ksg.fi/fi/foretag/bistro-marita/",sourceUrl:"https://ksg.fi/fi/foretag/bistro-marita/",
    imageCredit:"Bistro Marita / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/bistro-marita/",tags:["bistro","kahvila","viinit"],contact:{phone:"045 230 7087",address:"Rosalan kylätie 34, 25950 Rosala"}
  },
  {
    id:"bistro-bar-road-cafe-yttis",categories:["ruoka"],
    name:{fi:"Bistro & Bar Road Cafe Yttis",en:"Bistro & Bar Road Cafe Yttis",es:"Bistro & Bar Road Cafe Yttis"},
    description:{
      fi:"Kärran kylässä toimiva ruokapaikka, jonka listalla palveluoppaan mukaan on pizzoja, hampurilaisia, bistroannoksia sekä tunnettu lohikeitto saaristolaisleivän kanssa. Tarkista ajantasainen menu ja aukiolo toimijalta.",
      en:"A village restaurant in Kärra. The business guide lists pizzas, burgers, bistro dishes and a well-known salmon soup served with archipelago bread. Confirm the current menu and opening times with the operator.",
      es:"Restaurante en el pueblo de Kärra. La guía empresarial menciona pizzas, hamburguesas, platos de bistró y una conocida sopa de salmón con pan del archipiélago. Consulta el menú y los horarios actuales."
    },
    location:{fi:"Ytterkullavägen 1, 25870 Dragsfjärd",en:"Ytterkullavägen 1, 25870 Dragsfjärd",es:"Ytterkullavägen 1, 25870 Dragsfjärd"},
    websiteUrl:"https://ksg.fi/fi/foretag/bistro-bar-road-cafe-yttis/",sourceUrl:"https://ksg.fi/fi/foretag/bistro-bar-road-cafe-yttis/",
    imageCredit:"Bistro & Bar Road Cafe Yttis / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/bistro-bar-road-cafe-yttis/",tags:["bistro","pizza","hampurilaiset","lohikeitto"],contact:{phone:"040 054 0835",address:"Ytterkullavägen 1, 25870 Dragsfjärd"}
  },
  {
    id:"kasnas-paviljong",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Kasnäs Paviljong",en:"Kasnäs Paviljong",es:"Kasnäs Paviljong"},
    description:{
      fi:"Kasnäsin satama-alueen grillin, pizzan ja kahvilan yhdistelmä. Kemiönsaaren palveluopas listaa paikan ravintola- ja lounaspalveluihin. Tarkista kauden ruokalista ja aukiolo Kasnäsistä.",
      en:"A grill, pizza and café venue in the Kasnäs harbour area. The Kimitoön business guide lists it among restaurants and lunch venues. Check seasonal menus and opening times with Kasnäs.",
      es:"Establecimiento de parrilla, pizza y cafetería en la zona del puerto de Kasnäs. La guía empresarial de Kimitoön lo incluye entre restaurantes y lugares de almuerzo. Consulta el menú de temporada y los horarios."
    },
    location:{fi:"Kasnäsvägen 1294, 25930 Kasnäs",en:"Kasnäsvägen 1294, 25930 Kasnäs",es:"Kasnäsvägen 1294, 25930 Kasnäs"},
    websiteUrl:"https://www.kasnas.com/",sourceUrl:"https://ksg.fi/fi/foretag/kasnas-paviljong/",
    imageCredit:"Kasnäs Paviljong / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/kasnas-paviljong/",tags:["grilli","pizza","kahvila"],contact:{phone:"02 5210 115",address:"Kasnäsvägen 1294, 25930 Kasnäs"}
  },
  {
    id:"laituri-grilli",categories:["ruoka"],
    name:{fi:"Laituri Grilli",en:"Laituri Grilli",es:"Laituri Grilli"},
    description:{
      fi:"Taalintehtaan sataman vieressä Tehtaan portilla sijaitseva ravintola. Palveluoppaan mukaan tarjolla on aamiaista, lounasta ja illallista, ja paikalla on myös drive-in-mahdollisuus. Tarkista aukiolo ja päivän tarjonta suoraan ravintolalta.",
      en:"A restaurant by Dalsbruk harbour at Tehtaan portti. The business guide lists breakfast, lunch and dinner, as well as a drive-in option. Confirm opening times and the day's offering directly with the restaurant.",
      es:"Restaurante junto al puerto de Dalsbruk, en Tehtaan portti. La guía empresarial menciona desayuno, almuerzo, cena y servicio drive-in. Consulta los horarios y la oferta del día directamente con el restaurante."
    },
    location:{fi:"Dalsbruksvägen 691, 25900 Taalintehdas",en:"Dalsbruksvägen 691, 25900 Dalsbruk",es:"Dalsbruksvägen 691, 25900 Dalsbruk"},
    websiteUrl:"https://ksg.fi/fi/foretag/grillkajen/",sourceUrl:"https://ksg.fi/fi/foretag/grillkajen/",
    imageCredit:"Laituri Grilli / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/grillkajen/",tags:["aamiainen","lounas","drive-in"],contact:{phone:"040 577 2111",address:"Dalsbruksvägen 691, 25900 Taalintehdas"}
  },
  {
    id:"restaurang-portside",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Ravintola Portside",en:"Restaurant Portside",es:"Restaurante Portside"},
    description:{
      fi:"Taalintehtaan merellinen terassi ja rantamakasiini. Palveluoppaan mukaan ravintola palvelee toukokuusta elokuuhun; tarkista kauden aukiolo, ruokalista ja tapahtumat suoraan Portsidesta.",
      en:"A seaside terrace and waterfront warehouse restaurant in Dalsbruk. The business guide lists a May–August season; confirm current seasonal opening, menu and events directly with Portside.",
      es:"Terraza junto al mar y restaurante en un antiguo almacén portuario de Dalsbruk. La guía empresarial indica temporada de mayo a agosto; confirma horarios, menú y eventos directamente con Portside."
    },
    location:{fi:"Stallsbacksvägen 8, 25900 Taalintehdas",en:"Stallsbacksvägen 8, 25900 Dalsbruk",es:"Stallsbacksvägen 8, 25900 Dalsbruk"},
    websiteUrl:"https://www.portside.fi/",sourceUrl:"https://ksg.fi/fi/foretag/restaurang-portside/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/7605a92b-bd92-41bf-9d41-022caca417d4.jpg",imageCredit:"Restaurant Portside / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/restaurang-portside/",tags:["terassi","rantamakasiini","kesäravintola"],contact:{phone:"02 466 1745",address:"Stallsbacksvägen 8, 25900 Taalintehdas"}
  },
  {
    id:"rigges-thai",categories:["ruoka"],
    name:{fi:"Rigges Thai",en:"Rigges Thai",es:"Rigges Thai"},
    description:{
      fi:"Kemiönsaaren palveluoppaan catering- ja ruokatuotantotoimija. Tarkista nykyinen ruoka- ja tilauspalveluvalikoima sekä mahdolliset tapahtumatarjoilut suoraan yritykseltä.",
      en:"A catering and food-production business listed in the Kimitoön business guide. Confirm its current food and ordering services and any event catering directly with the company.",
      es:"Empresa de catering y producción alimentaria incluida en la guía empresarial de Kimitoön. Consulta directamente sus servicios actuales de comida, pedidos y catering para eventos."
    },
    location:{fi:"Norrlångviksvägen 259A, 25700 Kemiö",en:"Norrlångviksvägen 259A, 25700 Kimito",es:"Norrlångviksvägen 259A, 25700 Kimito"},
    websiteUrl:"https://www.uggeldal.com/",sourceUrl:"https://ksg.fi/fi/foretag/rigges-thai/",
    imageCredit:"Rigges Thai / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/rigges-thai/",tags:["catering","ruokatuotanto"],contact:{phone:"0400 946 950",address:"Norrlångviksvägen 259A, 25700 Kemiö"}
  },
  {
    id:"mac-daniels-grill",categories:["ruoka","tapahtumapaikat","majoitus"],
    name:{fi:"Mac Daniel's Grill ja Ravintola Galaxy",en:"Mac Daniel's Grill and Restaurant Galaxy",es:"Mac Daniel's Grill y Restaurante Galaxy"},
    description:{
      fi:"Kemiön keskustassa toimiva kahvila-, ravintola- ja pubikokonaisuus. Palveluoppaan mukaan tiloihin kuuluu ruokasali, kokouskabinetti ja juhlapalvelu. Ravintola Galaxy soveltuu suurempiin tilaisuuksiin, tanssi-iltoihin ja kokouksiin; oppaassa mainitaan myös hotellipalvelu.",
      en:"A café, restaurant and pub venue in central Kimito. The business guide lists a dining room, meeting room and event catering. Restaurant Galaxy is suited to larger functions, dance evenings and meetings; the guide also lists hotel services.",
      es:"Complejo de cafetería, restaurante y pub en el centro de Kimito. La guía empresarial menciona comedor, sala de reuniones y catering. El restaurante Galaxy sirve para eventos grandes, noches de baile y reuniones; la guía también incluye servicios hoteleros."
    },
    location:{fi:"Arkadiavägen 11, 25700 Kemiö",en:"Arkadiavägen 11, 25700 Kimito",es:"Arkadiavägen 11, 25700 Kimito"},
    websiteUrl:"https://ksg.fi/fi/foretag/mac-daniels-grill-oy-ab-2/",sourceUrl:"https://ksg.fi/fi/foretag/mac-daniels-grill-oy-ab-2/",
    imageCredit:"Mac Daniel's Grill / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/mac-daniels-grill-oy-ab-2/",tags:["kahvila","ravintola","pub","juhlatilat","kokoukset"],contact:{phone:"02 420 6312",address:"Arkadiavägen 11, 25700 Kemiö"}
  },
  {
    id:"cafe-adele",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Café Adéle",en:"Café Adéle",es:"Café Adéle"},
    description:{
      fi:"Kemiön keskustan kahvila ja lounaspaikka, jossa on myös catering-palvelu. KSG:n mukaan lounaslistalla on kasvisvaihtoehtoja ja ruokaa saa mukaan. Tunnelmallista tilaa voi vuokrata juhliin, kokouksiin ja muistotilaisuuksiin.",
      en:"A café and lunch venue in central Kimito, also offering catering. KSG notes vegetarian lunch options and takeaway meals. The cosy venue can be rented for celebrations, meetings and memorial gatherings.",
      es:"Cafetería y restaurante de almuerzos en el centro de Kimito, también con servicio de catering. KSG menciona opciones vegetarianas y comida para llevar. El local se puede alquilar para celebraciones, reuniones y actos conmemorativos."
    },
    location:{fi:"Museovägen 7, 25700 Kemiö",en:"Museovägen 7, 25700 Kimito",es:"Museovägen 7, 25700 Kimito"},
    websiteUrl:"https://ksg.fi/sv/foretag/cafe-adele/",sourceUrl:"https://ksg.fi/sv/foretag/cafe-adele/",
    imageCredit:"Café Adéle / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/cafe-adele/",tags:["kahvila","lounas","catering","juhlatila"],
    contact:{phone:"040 849 8770",address:"Museovägen 7, 25700 Kimito"}
  },
  {
    id:"konditori-mazarin",categories:["ruoka","ostokset"],
    name:{fi:"Konditori Mazarin",en:"Konditori Mazarin",es:"Konditori Mazarin"},
    description:{
      fi:"Konditoria, leipomo ja kahvila Kemiön keskustassa. KSG:n mukaan leipä leivotaan alusta asti itse hapanjuurella ja pitkällä kohotusajalla. Kahville voi tulla paikan päälle tai ostaa leipää mukaan.",
      en:"A patisserie, bakery and café in central Kimito. KSG says its bread is made from scratch with sourdough and a slow process. Stop for coffee or buy freshly baked bread to take away.",
      es:"Pastelería, panadería y cafetería en el centro de Kimito. Según KSG, el pan se elabora desde cero con masa madre y fermentación lenta. Puedes tomar un café o comprar pan recién hecho para llevar."
    },
    location:{fi:"Engelsbyvägen 3, 25700 Kemiö",en:"Engelsbyvägen 3, 25700 Kimito",es:"Engelsbyvägen 3, 25700 Kimito"},
    websiteUrl:"https://ksg.fi/fi/foretag/konditori-mazarin/",sourceUrl:"https://ksg.fi/fi/foretag/konditori-mazarin/",
    imageCredit:"Konditori Mazarin / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/konditori-mazarin/",tags:["konditoria","leipomo","kahvila"],
    contact:{phone:"02 421 910",address:"Engelsbyvägen 3, 25700 Kemiö"}
  },
  {
    id:"ren-lyx-saaristorapu",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Ren-Lyx & Saaristorapu",en:"Ren-Lyx & Saaristorapu",es:"Ren-Lyx & Saaristorapu"},
    description:{
      fi:"Kemiönsaaren catering- ja tapahtumapalvelu. KSG:n mukaan yritys järjestää juhlia ja tapahtumia sekä tarjoaa aamiaista, lounaspöytää, à la carte -ruokaa ja pizzaa. Samalla yritys tarjoaa siivouspalveluja.",
      en:"A catering and event-services business on Kimitoön. KSG lists event and celebration arrangements, breakfast, lunch buffets, à la carte dishes and pizza. The company also offers cleaning services.",
      es:"Empresa de catering y eventos en Kimitoön. KSG menciona organización de celebraciones, desayunos, buffet de almuerzo, platos a la carta y pizza. La empresa también ofrece servicios de limpieza."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/ren-lyx-skargardskraftan-fma-sabina-magnusson/",sourceUrl:"https://ksg.fi/fi/foretag/ren-lyx-skargardskraftan-fma-sabina-magnusson/",
    imageCredit:"Ren-Lyx & Saaristorapu / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/ren-lyx-skargardskraftan-fma-sabina-magnusson/",tags:["catering","juhlat","tapahtumat","siivous"]
  },
  {
    id:"kerstin-forsbom-catering",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Tmi Kerstin Forsbom",en:"Tmi Kerstin Forsbom",es:"Tmi Kerstin Forsbom"},
    description:{
      fi:"Dragsfjärdissä toimiva lounas- ja pitopalvelu. KSG:n mukaan tarjolla on arkiruokaa, kotiruokaa, kenttäkeittiöpalvelua ja kotiinkuljetusta.",
      en:"A lunch and catering business in Dragsfjärd. KSG lists weekday lunches, home-style meals, field-kitchen catering and home delivery.",
      es:"Servicio de almuerzos y catering en Dragsfjärd. KSG menciona menús entre semana, comida casera, cocina móvil para eventos y entrega a domicilio."
    },
    location:{fi:"Kärravägen 203, 25870 Dragsfjärd",en:"Kärravägen 203, 25870 Dragsfjärd",es:"Kärravägen 203, 25870 Dragsfjärd"},
    websiteUrl:"https://ksg.fi/fi/foretag/fma-kerstin-forsbom/",sourceUrl:"https://ksg.fi/fi/foretag/fma-kerstin-forsbom/",
    imageCredit:"Tmi Kerstin Forsbom / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/fma-kerstin-forsbom/",tags:["lounas","kotiruoka","pitopalvelu","kotiinkuljetus"],
    contact:{phone:"040 577 3699",address:"Kärravägen 203, 25870 Dragsfjärd"}
  },
  {
    id:"catering-thomas-ahlberg",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Catering Thomas Åhlberg",en:"Catering Thomas Åhlberg",es:"Catering Thomas Åhlberg"},
    description:{
      fi:"Kemiönsaaren palveluoppaassa catering- ja ruokatuotantopalveluihin listattu toimija. Kysy suoraan järjestäjältä tapahtumatarjoiluista, menuvaihtoehdoista ja saatavuudesta.",
      en:"A catering and food-production provider listed in the Kimitoön business guide. Contact the operator directly about event catering, menu options and availability.",
      es:"Proveedor de catering y producción alimentaria incluido en la guía empresarial de Kimitoön. Consulta directamente las opciones de menú, el servicio para eventos y la disponibilidad."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/catering-thomas-ahlberg/",sourceUrl:"https://ksg.fi/fi/foretag/catering-thomas-ahlberg/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/catering-thomas-ahlberg/",tags:["catering","ruokatuotanto"]
  },
  {
    id:"terrassn-restaurant",categories:["ruoka","tapahtumapaikat"],
    name:{fi:"Terrassn Restaurant",en:"Terrassn Restaurant",es:"Terrassn Restaurant"},
    description:{
      fi:"Kalkholmen Marinan kesäravintola Västanfjärdissä. KSG:n mukaan ruokalistalla on salaatteja, hampurilaisia sekä kala- ja liharuokia, ja raaka-aineissa hyödynnetään mahdollisuuksien mukaan paikallisia kesätuotteita. Julkaistut aukioloajat kannattaa varmistaa ennen matkaa.",
      en:"The summer restaurant at Kalkholmen Marina in Västanfjärd. KSG describes salads, burgers and fish and meat dishes, using local seasonal ingredients where possible. Confirm published opening times before travelling.",
      es:"Restaurante de verano de Kalkholmen Marina en Västanfjärd. KSG menciona ensaladas, hamburguesas y platos de pescado y carne, con ingredientes locales de temporada cuando es posible. Confirma los horarios antes de viajar."
    },
    location:{fi:"Kalkholmsvägen 43, 25830 Västanfjärd",en:"Kalkholmsvägen 43, 25830 Västanfjärd",es:"Kalkholmsvägen 43, 25830 Västanfjärd"},
    websiteUrl:"https://www.kalkholmenmarina.fi/",sourceUrl:"https://ksg.fi/fi/foretag/terrassn-restaurant/",
    imageCredit:"Terrassn Restaurant / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/terrassn-restaurant/",tags:["kesäravintola","paikallinen ruoka","satama"]
  },
  {
    id:"holmstroms-lanthandel",categories:["ostokset","ruoka","saaristo"],
    name:{fi:"Holmströms Lanthandel",en:"Holmströms Lanthandel",es:"Holmströms Lanthandel"},
    description:{
      fi:"Aito saaristokauppa Hiittisissä laajalla päivittäistavara- ja paikallistuotevalikoimalla. Café Vikinnessä tarjoillaan lounasta ja pikaruokaa muina kuin kesäkuukausina sekä kylmiä ja lämpimiä juomia. KSG ilmoittaa kaupan olevan avoinna joka päivä.",
      en:"A traditional archipelago shop in Hiittinen with a wide grocery and local-products selection. Café Vikinne serves lunch and fast food outside the summer season, plus hot and cold drinks. KSG lists the shop as open daily.",
      es:"Tienda tradicional del archipiélago en Hiittinen con amplia selección de alimentos y productos locales. Café Vikinne sirve almuerzos y comida rápida fuera del verano, además de bebidas frías y calientes. KSG indica que abre todos los días."
    },
    location:{fi:"Hitisvägen 20, 25940 Hitis",en:"Hitisvägen 20, 25940 Hitis",es:"Hitisvägen 20, 25940 Hitis"},
    websiteUrl:"https://ksg.fi/fi/foretag/holmstroms-lanthandel-kb/",sourceUrl:"https://ksg.fi/fi/foretag/holmstroms-lanthandel-kb/",
    imageCredit:"Holmströms Lanthandel / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/holmstroms-lanthandel-kb/",tags:["saaristokauppa","päivittäistavarat","kahvila","lounas"],
    contact:{phone:"02 466 6760",address:"Hitisvägen 20, 25940 Hitis"}
  },
  {
    id:"kasnas-handel",categories:["ostokset","ruoka"],
    name:{fi:"Kasnäs Handel",en:"Kasnäs Handel",es:"Kasnäs Handel"},
    description:{
      fi:"Kasnäsin ympärivuotinen päivittäistavarakauppa sataman ja lomakeskuksen yhteydessä. Tarkista ajankohtaiset palvelut ja aukiolo suoraan kaupasta.",
      en:"A year-round grocery store in Kasnäs, close to the harbour and resort. Check current services and opening times directly with the shop.",
      es:"Tienda de alimentación abierta todo el año en Kasnäs, cerca del puerto y del complejo vacacional. Consulta los servicios y horarios actuales directamente con la tienda."
    },
    location:{fi:"Kasnäsvägen 1294, 25930 Kasnäs",en:"Kasnäsvägen 1294, 25930 Kasnäs",es:"Kasnäsvägen 1294, 25930 Kasnäs"},
    websiteUrl:"https://www.kasnas.com/sv/",sourceUrl:"https://ksg.fi/fi/foretag/kasnas-handel/",
    imageCredit:"Kasnäs Handel / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/kasnas-handel/",tags:["päivittäistavarat","kauppa","ympäri vuoden"]
  },
  {
    id:"anttis-taxi",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Anttis Taxi Ab Oy",en:"Anttis Taxi Ab Oy",es:"Anttis Taxi Ab Oy"},
    description:{
      fi:"Kemiönsaarella toimiva taksipalvelu. KSG:n mukaan käytössä on kaksi 1+8-paikkaista autoa, paarivarustus ja pyörätuolivarustus. Palveluihin kuuluvat Kela-kuljetukset ja vapaa-ajan matkat.",
      en:"A taxi service on Kimitoön. KSG lists two vehicles with 1+8 seats, stretcher equipment and wheelchair access. Services include Kela rides and leisure journeys.",
      es:"Servicio de taxi en Kimitoön. KSG indica dos vehículos con capacidad 1+8, equipamiento para camillas y acceso para sillas de ruedas. Ofrece traslados Kela y viajes privados."
    },
    location:{fi:"25700 Kemiö",en:"25700 Kimito",es:"25700 Kimito"},
    websiteUrl:"https://ksg.fi/fi/foretag/anttis-taxi-ab-oy/",sourceUrl:"https://ksg.fi/fi/foretag/anttis-taxi-ab-oy/",
    imageCredit:"Anttis Taxi / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/anttis-taxi-ab-oy/",tags:["taksi","esteetön kuljetus","Kela-kyydit"],contact:{phone:"0400 423 636",address:"25700 Kemiö"}
  },
  {
    id:"taxistation-kimitoon",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taksiasema Kemiönsaari",en:"Taxistation Kimitoön",es:"Taxis Kimitoön"},
    description:{
      fi:"Paikallinen taksiasema, jonka KSG ilmoittaa tarjoavan 1+8-paikkaisen auton sekä paarien ja pyörätuolin kuljetusmahdollisuuden. Palveluihin kuuluvat myös Kela- ja matkapalvelukuljetukset.",
      en:"A local taxi station. KSG lists a 1+8-seat vehicle with stretcher and wheelchair transport, as well as Kela and travel-service rides.",
      es:"Parada y servicio local de taxi. KSG indica un vehículo con capacidad 1+8 y transporte para camillas y sillas de ruedas, además de traslados Kela y servicios de viaje."
    },
    location:{fi:"Genbölestrandvägen 69, 25870 Dragsfjärd",en:"Genbölestrandvägen 69, 25870 Dragsfjärd",es:"Genbölestrandvägen 69, 25870 Dragsfjärd"},
    websiteUrl:"https://ksg.fi/fi/foretag/taxistation-kimitoon/",sourceUrl:"https://ksg.fi/fi/foretag/taxistation-kimitoon/",
    imageCredit:"Taksiasema Kemiönsaari / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/taxistation-kimitoon/",tags:["taksi","esteetön kuljetus","Kela-kyydit"],contact:{phone:"0400 539 777",address:"Genbölestrandvägen 69, 25870 Dragsfjärd"}
  },
  {
    id:"kimirent",categories:["aktiviteetit","kuljetukset","muut-palvelut"],
    name:{fi:"Oy Kimirent Ab",en:"Oy Kimirent Ab",es:"Oy Kimirent Ab"},
    description:{
      fi:"Kemiönsaaren vuokrauspalvelu, jonka kalustoon KSG:n mukaan kuuluu muun muassa vesijettejä, perävaunuja, henkilönostimia ja muita koneita. Tarkista vesijettien saatavuus, vuokrausehdot ja muut kalustot suoraan yritykseltä.",
      en:"A rental service on Kimitoön. KSG lists water scooters, trailers, access platforms and other equipment among its fleet. Confirm water-scooter availability, rental terms and other equipment directly with the company.",
      es:"Servicio de alquiler en Kimitoön. KSG incluye motos acuáticas, remolques, plataformas elevadoras y otra maquinaria. Consulta la disponibilidad de motos acuáticas, las condiciones y el resto del equipo directamente con la empresa."
    },
    location:{fi:"Norrlångviksvägen 293, 25700 Kemiö",en:"Norrlångviksvägen 293, 25700 Kimito",es:"Norrlångviksvägen 293, 25700 Kimito"},
    websiteUrl:"https://www.kimirent.com/",sourceUrl:"https://ksg.fi/fi/foretag/oy-kimirent-ab/",
    imageCredit:"Oy Kimirent Ab / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/oy-kimirent-ab/",tags:["vesijetti","vuokraus","perävaunut"],contact:{phone:"040 744 0399",address:"Norrlångviksvägen 293, 25700 Kemiö"}
  },
  {
    id:"actiwell",categories:["hyvinvointi","aktiviteetit"],
    name:{fi:"Actiwell Ab Oy",en:"Actiwell Ab Oy",es:"Actiwell Ab Oy"},
    description:{
      fi:"Kemiössä toimiva hieronta- ja kehonhoitopalvelu, joka kuuluu myös KSG:n urheilu- ja vapaa-ajan aktiviteetteihin. Tarkista hoidot, ajanvaraus ja palvelujen saatavuus suoraan yritykseltä.",
      en:"A massage and body-care provider in Kimito, also listed by KSG under sports and leisure activities. Check treatments, appointments and availability directly with the company.",
      es:"Servicio de masaje y cuidado corporal en Kimito, también incluido por KSG en actividades deportivas y de ocio. Consulta tratamientos, citas y disponibilidad directamente con la empresa."
    },
    location:{fi:"Domarringen 6, 25700 Kemiö",en:"Domarringen 6, 25700 Kimito",es:"Domarringen 6, 25700 Kimito"},
    websiteUrl:"https://www.actiwell.fi/",sourceUrl:"https://ksg.fi/fi/foretag/actiwell-ab-oy/",
    imageCredit:"Actiwell / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/actiwell-ab-oy/",tags:["hieronta","kehonhoito","hyvinvointi"],contact:{phone:"044 025 7006",address:"Domarringen 6, 25700 Kemiö"}
  },
  {
    id:"ullmans-villa",categories:["majoitus"],
    name:{fi:"Ullman's Villa",en:"Ullman's Villa",es:"Ullman's Villa"},
    description:{
      fi:"Majoituskohde Taalintehtaan sydämessä. Kemiönsaaren palveluopas listaa sen hotellien, hostellien ja aamiaismajoitusten joukkoon. Tarkista huonetyypit, saatavuus ja varaus suoraan majoituspaikalta.",
      en:"An accommodation property in the heart of Dalsbruk. The Kimitoön business guide lists it among hotels, hostels and B&Bs. Check room types, availability and booking directly with the property.",
      es:"Alojamiento en el corazón de Dalsbruk. La guía empresarial de Kimitoön lo incluye entre hoteles, hostales y B&B. Consulta tipos de habitación, disponibilidad y reservas directamente con el establecimiento."
    },
    location:{fi:"Villavägen 1, 25900 Taalintehdas",en:"Villavägen 1, 25900 Dalsbruk",es:"Villavägen 1, 25900 Dalsbruk"},
    websiteUrl:"https://ullmansvilla.fi/",sourceUrl:"https://ksg.fi/fi/foretag/ullmans-villa/",
    imageCredit:"Ullman's Villa / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/ullmans-villa/",tags:["majoitus","taalintehdas"],contact:{phone:"+358 40 675 2570",address:"Villavägen 1, 25900 Taalintehdas"}
  },
  {
    id:"strandhotellet",categories:["majoitus","ruoka","hyvinvointi","aktiviteetit"],
    name:{fi:"Strandhotellet",en:"Strandhotellet",es:"Strandhotellet"},
    description:{
      fi:"Pieni hotelli Taalintehtaan keskustassa, jonka vanhoissa mutta kodikkaissa huoneissa on useista merinäköala. Alakerran Ravintola Strand tarjoilee bistromenua ympäri vuoden. Palveluopas mainitsee lisäksi dartsin, biljardin ja minigolfin.",
      en:"A small hotel in central Dalsbruk, with cosy rooms, several offering sea views. Restaurant Strand downstairs serves a bistro menu year-round. The business guide also lists darts, billiards and mini golf.",
      es:"Pequeño hotel en el centro de Dalsbruk, con habitaciones acogedoras, varias con vistas al mar. El restaurante Strand, en la planta baja, sirve menú de bistró durante todo el año. La guía también menciona dardos, billar y minigolf."
    },
    location:{fi:"Dalsbruksvägen 694, 25900 Taalintehdas",en:"Dalsbruksvägen 694, 25900 Dalsbruk",es:"Dalsbruksvägen 694, 25900 Dalsbruk"},
    websiteUrl:"https://www.strandhotellet.fi/",sourceUrl:"https://ksg.fi/fi/foretag/strandhotellet-eeth-ab/",
    imageCredit:"Strandhotellet / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/strandhotellet-eeth-ab/",tags:["hotelli","ravintola","meri","minigolf"],contact:{phone:"0400 481 028",address:"Dalsbruksvägen 694, 25900 Taalintehdas"}
  },
  {
    id:"bjorkboda-ruukinkartano",categories:["majoitus","tapahtumapaikat","aktiviteetit"],
    name:{fi:"Björkbodan Ruukinkartano",en:"Björkboda Manor",es:"Casa señorial de Björkboda"},
    description:{
      fi:"Björkbodan idyllisellä ruukkialueella vuokrattavia vapaa-ajan asuntoja sekä juhla- ja kokoustiloja 5–60 henkilölle vanhassa viljamakasiinissa. Asukkaiden käytössä on sauna ja ranta. Kohteessa on myös ratsastustalli ja hevosten kuntoutuspalveluja.",
      en:"Holiday apartments in the historic ironworks setting of Björkboda, plus celebration and meeting facilities for 5–60 people in an old granary. Guests have access to a sauna and beach. The estate also has a riding stable and horse rehabilitation services.",
      es:"Alojamientos vacacionales en el histórico entorno industrial de Björkboda y espacios para celebraciones y reuniones de 5 a 60 personas en un antiguo granero. Los huéspedes disponen de sauna y playa. La finca también cuenta con establo y rehabilitación equina."
    },
    location:{fi:"Gamla bruksvägen 2, 25860 Björkboda",en:"Gamla bruksvägen 2, 25860 Björkboda",es:"Gamla bruksvägen 2, 25860 Björkboda"},
    websiteUrl:"https://www.bjorkbodadressage.fi/",sourceUrl:"https://ksg.fi/fi/foretag/bjorkboda-bruksgard/",
    imageCredit:"Björkbodan Ruukinkartano / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/bjorkboda-bruksgard/",tags:["majoitus","juhlatilat","kokoukset","ratsastus"],contact:{phone:"040 581 0878",address:"Gamla bruksvägen 2, 25860 Björkboda"}
  },
  {
    id:"hotel-galaxy",categories:["majoitus","ruoka"],
    name:{fi:"Hotel Galaxy",en:"Hotel Galaxy",es:"Hotel Galaxy"},
    description:{
      fi:"Kemiönsaaren palveluoppaan mukaan Hotel Galaxy on korkeatasoinen pieni hotelli, jossa on 10 huonetta, joista kahdessa on keittiö. Tarkista huoneiden tarkemmat varustelut, hinnat ja saatavuus suoraan hotellilta.",
      en:"The Kimitoön business guide describes Hotel Galaxy as a high-standard small hotel with 10 rooms, two of them with kitchens. Confirm room facilities, prices and availability directly with the hotel.",
      es:"La guía empresarial de Kimitoön describe Hotel Galaxy como un pequeño hotel de categoría alta con 10 habitaciones, dos de ellas con cocina. Consulta directamente los servicios, precios y disponibilidad."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["hotelli","10 huonetta","keittiö"]
  },
  {
    id:"saariloma-net",categories:["majoitus"],
    name:{fi:"Saariloma.net",en:"Saariloma.net",es:"Saariloma.net"},
    description:{
      fi:"Vapaa-ajan asuntoja ja mökkejä Björkbodan ja Taalintehtaan ruukkimiljöössä. Tarkista kohteiden sijainnit, varustelu, vuokraehdot ja saatavuus suoraan vuokraajalta.",
      en:"Holiday homes and cottages in the historic ironworks settings of Björkboda and Dalsbruk. Confirm locations, facilities, rental terms and availability directly with the operator.",
      es:"Casas vacacionales y cabañas en los entornos históricos de las ferrerías de Björkboda y Dalsbruk. Consulta ubicaciones, equipamiento, condiciones y disponibilidad directamente con el operador."
    },
    location:{fi:"Björkboda ja Taalintehdas, Kemiönsaari",en:"Björkboda and Dalsbruk, Kimitoön",es:"Björkboda y Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/saariloma-net/",sourceUrl:"https://ksg.fi/fi/foretag/saariloma-net/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/saariloma-net/",tags:["mökit","loma-asunnot","ruukkimiljöö"]
  },
  {
    id:"majoitusliike-pikkutikka",categories:["majoitus"],
    name:{fi:"Majoitusliike Pikkutikka",en:"Pikkutikka Holiday Accommodation",es:"Alojamiento Pikkutikka"},
    description:{
      fi:"Kemiönsaaren palveluoppaan majoitushakemistossa lomahuvilan vuokraajana listattu toimija. Tarkista huvilan sijainti, varustelu, vuokraehdot ja vapaat ajankohdat virallisesta palveluoppaasta ja vuokraajalta.",
      en:"A holiday-villa rental provider listed in the Kimitoön business guide. Check the villa's location, facilities, rental terms and available dates through the official guide and the operator.",
      es:"Proveedor de alquiler de villas vacacionales incluido en la guía empresarial de Kimitoön. Consulta la ubicación, el equipamiento, las condiciones y las fechas disponibles en la guía oficial y con el operador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/majoitusliike-pikkutikka/",sourceUrl:"https://ksg.fi/fi/foretag/majoitusliike-pikkutikka/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/majoitusliike-pikkutikka/",tags:["vuokrahuvila","loma-asunto"]
  },
  {
    id:"db-hostel",categories:["majoitus"],
    name:{fi:"DB Hostel",en:"DB Hostel",es:"DB Hostel"},
    description:{
      fi:"Hostelli Taalintehtaan keskustassa, noin sadan metrin päässä torilta. KSG:n esittely korostaa laadukkaita huoneita ja hyvin varusteltuja yhteistiloja. Tarkista huonetyypit, varustelu ja saatavuus suoraan hostellilta.",
      en:"A hostel in central Dalsbruk, about 100 metres from the market square. KSG highlights quality rooms and well-equipped shared facilities. Confirm room types, amenities and availability directly with the hostel.",
      es:"Hostal en el centro de Dalsbruk, a unos 100 metros de la plaza del mercado. KSG destaca sus habitaciones de calidad y zonas comunes bien equipadas. Consulta directamente los tipos de habitación, servicios y disponibilidad."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://www.dbhostel.fi/",sourceUrl:"https://www.dbhostel.fi/",
    image:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_173606-1024x781.jpg",imageCredit:"DB Hostel",imageSource:"https://www.dbhostel.fi/",tags:["hostelli","taalintehdas"],contact:{phone:"+358 50 350 4930",email:"info@dbhostel.fi",address:"Masuunintie 5, 25900 Taalintehdas"}
  },
  {
    id:"viggskar-vuokramokit",categories:["majoitus","saaristo","luonto"],
    name:{fi:"Viggskärin vuokramökit",en:"Viggskär Rental Cottages",es:"Cabañas de alquiler de Viggskär"},
    description:{
      fi:"Vuokramökkejä Viggskärissä Kemiönsaaren saaristossa. Tarkista mökkien varustelu, kulkuyhteydet, vuokraehdot ja saatavuus suoraan vuokraajalta.",
      en:"Rental cottages on Viggskär in the Kimitoön archipelago. Confirm facilities, transport connections, rental terms and availability directly with the operator.",
      es:"Cabañas de alquiler en Viggskär, en el archipiélago de Kimitoön. Consulta equipamiento, conexiones, condiciones y disponibilidad directamente con el operador."
    },
    location:{fi:"Viggskär, Kemiönsaari",en:"Viggskär, Kimitoön",es:"Viggskär, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/viggskar-b-holmberg/",sourceUrl:"https://ksg.fi/fi/foretag/viggskar-b-holmberg/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/viggskar-b-holmberg/",tags:["vuokramökki","saaristo","luonto"]
  },
  {
    id:"villa-lyxfallan",categories:["majoitus"],
    name:{fi:"Villa Lyxfällan",en:"Villa Lyxfällan",es:"Villa Lyxfällan"},
    description:{
      fi:"Vuokramökki Kemiönsaaren palveluoppaan majoituslistauksessa. Tarkista mökin sijainti, varustelu, henkilömäärä, vuokraehdot ja saatavuus suoraan vuokraajalta.",
      en:"A rental cottage listed in the Kimitoön business guide. Confirm its location, facilities, occupancy, rental terms and availability directly with the operator.",
      es:"Cabaña de alquiler incluida en la guía empresarial de Kimitoön. Confirma ubicación, equipamiento, capacidad, condiciones y disponibilidad directamente con el operador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/villa-lyxfallan/",sourceUrl:"https://ksg.fi/fi/foretag/villa-lyxfallan/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/villa-lyxfallan/",tags:["vuokramökki"]
  },
  {
    id:"vano-stugor",categories:["majoitus","saaristo"],
    name:{fi:"Vänö Stugor",en:"Vänö Stugor",es:"Vänö Stugor"},
    description:{
      fi:"Vänön saaristossa toimiva mökkivuokraaja. KSG:n mukaan palveluihin kuuluu myös veneiden talvisäilytys. Tarkista mökkien tiedot, venepaikat, kuljetukset ja varaus suoraan toimijalta.",
      en:"A cottage rental operator on the island of Vänö. KSG also lists winter storage for boats among its services. Confirm cottage details, berths, transport and booking directly with the operator.",
      es:"Proveedor de cabañas en la isla de Vänö. KSG también menciona almacenamiento invernal de embarcaciones. Consulta cabañas, amarres, transporte y reservas directamente con el operador."
    },
    location:{fi:"Vänö, Kemiönsaaren ulkosaaristo",en:"Vänö, outer Kimitoön archipelago",es:"Vänö, archipiélago exterior de Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/vano-stugor/",sourceUrl:"https://ksg.fi/fi/foretag/vano-stugor/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/vano-stugor/",tags:["mökit","veneiden talvisäilytys","saaristo"]
  },
  {
    id:"ab-seaside-mokkit",categories:["majoitus"],
    name:{fi:"Ab Seaside Oy LKV – mökkivuokraus",en:"Ab Seaside Oy LKV – cottage rentals",es:"Ab Seaside Oy LKV – alquiler de cabañas"},
    description:{
      fi:"Kemiönsaaren palveluoppaan mukaan yritys välittää kiinteistöjä ja mökkivuokrausta Kemiönsaarella, Turunmaalla ja Länsi-Uudellamaalla. Tarkista vuokrattavat kohteet ja ehdot suoraan yritykseltä.",
      en:"The Kimitoön business guide lists the company for real-estate services and cottage rentals on Kimitoön, in the Turku archipelago and in western Uusimaa. Check available properties and terms directly with the company.",
      es:"La guía empresarial de Kimitoön incluye a la empresa en servicios inmobiliarios y alquiler de cabañas en Kimitoön, el archipiélago de Turku y el oeste de Uusimaa. Consulta propiedades y condiciones directamente con la empresa."
    },
    location:{fi:"Kemiönsaari ja Turunmaa",en:"Kimitoön and the Turku archipelago",es:"Kimitoön y el archipiélago de Turku"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["mökkivuokraus","kiinteistönvälitys"]
  },
  {
    id:"luddes-taxi",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Luddes Taxi",en:"Luddes Taxi",es:"Luddes Taxi"},
    description:{
      fi:"Taksi- ja henkilökuljetuspalvelu Västanfjärdissä. Tarkista auton koko, esteettömyys ja matkan saatavuus suoraan kuljettajalta.",
      en:"Taxi and passenger transport service in Västanfjärd. Confirm vehicle capacity, accessibility and journey availability directly with the driver.",
      es:"Servicio de taxi y transporte de pasajeros en Västanfjärd. Consulta directamente la capacidad del vehículo, la accesibilidad y la disponibilidad."
    },
    location:{fi:"Lammalavägen 116, 25830 Västanfjärd",en:"Lammalavägen 116, 25830 Västanfjärd",es:"Lammalavägen 116, 25830 Västanfjärd"},
    websiteUrl:"https://ksg.fi/fi/foretag/luddes-taxi/",sourceUrl:"https://ksg.fi/fi/foretag/luddes-taxi/",
    imageCredit:"Luddes Taxi / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/luddes-taxi/",tags:["taksi","henkilökuljetus"],contact:{phone:"050 562 1260",address:"Lammalavägen 116, 25830 Västanfjärd"}
  },
  {
    id:"taxi-suominen-kjell",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taksi Suominen Kjell",en:"Taxi Suominen Kjell",es:"Taxi Suominen Kjell"},
    description:{
      fi:"Taksipalvelu Dalsbrukissa. KSG:n mukaan käytössä on 1+4- ja 1+8-paikkaiset autot sekä pyörätuolivarustus. Tarkista esteettömyyden ja kuljetustarpeen sopivuus suoraan kuljettajalta.",
      en:"Taxi service in Dalsbruk. KSG lists 1+4 and 1+8-seat vehicles and wheelchair equipment. Confirm that the vehicle suits your accessibility and transport needs directly with the driver.",
      es:"Servicio de taxi en Dalsbruk. KSG indica vehículos de 1+4 y 1+8 plazas y equipamiento para sillas de ruedas. Confirma directamente con el conductor que el vehículo se adapta a tus necesidades."
    },
    location:{fi:"25900 Taalintehdas",en:"25900 Dalsbruk",es:"25900 Dalsbruk"},
    websiteUrl:"https://ksg.fi/fi/foretag/taxi-suominen-kjell/",sourceUrl:"https://ksg.fi/fi/foretag/taxi-suominen-kjell/",
    imageCredit:"Taxi Suominen Kjell / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/taxi-suominen-kjell/",tags:["taksi","pyörätuolikuljetus"],contact:{phone:"0400 399 555",address:"25900 Taalintehdas"}
  },
  {
    id:"nickes-taxi",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Nickes Taxi / Taxi Niklas Johansson",en:"Nickes Taxi / Taxi Niklas Johansson",es:"Nickes Taxi / Taxi Niklas Johansson"},
    description:{
      fi:"Kemiönsaaren taksi- ja henkilökuljetuspalvelu, jonka KSG mainitsee myös Kela- ja vammaispalvelukuljetuksiin. Varmista kuljetusmuoto, esteettömyys ja aikataulu suoraan kuljettajalta.",
      en:"Taxi and passenger transport on Kimitoön. KSG also lists Kela and disability transport services. Confirm vehicle type, accessibility and timing directly with the driver.",
      es:"Servicio de taxi y transporte de pasajeros en Kimitoön. KSG también menciona traslados Kela y para personas con discapacidad. Confirma vehículo, accesibilidad y horario directamente con el conductor."
    },
    location:{fi:"Solbackasvängen 14, 25840 Nivelax",en:"Solbackasvängen 14, 25840 Nivelax",es:"Solbackasvängen 14, 25840 Nivelax"},
    websiteUrl:"https://ksg.fi/fi/foretag/nickes-taxi-taxi-niklas-johansson/",sourceUrl:"https://ksg.fi/fi/foretag/nickes-taxi-taxi-niklas-johansson/",
    imageCredit:"Nickes Taxi / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/nickes-taxi-taxi-niklas-johansson/",tags:["taksi","Kela-kuljetukset","esteetön kuljetus"],contact:{phone:"0400 122 859",address:"Solbackasvängen 14, 25840 Nivelax"}
  },
  {
    id:"thomas-sjoblom-taxi",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Thomas Sjöblom taksi",en:"Thomas Sjöblom Taxi",es:"Taxi Thomas Sjöblom"},
    description:{
      fi:"Kemiönsaaren palveluoppaassa taksi- ja henkilökuljetuksiin listattu paikallinen kuljettaja. Varaa matka ja varmista kuljetuksen yksityiskohdat suoraan kuljettajalta.",
      en:"A local driver listed in the Kimitoön business guide for taxi and passenger transport. Book your journey and confirm the details directly with the driver.",
      es:"Conductor local incluido en la guía empresarial de Kimitoön para taxi y transporte de pasajeros. Reserva el trayecto y confirma los detalles directamente con el conductor."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/foretag/thomas-sjoblom-taksi/",sourceUrl:"https://ksg.fi/foretag/thomas-sjoblom-taksi/",
    imageCredit:"Thomas Sjöblom Taxi / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/foretag/thomas-sjoblom-taksi/",tags:["taksi","henkilökuljetus"],contact:{phone:"040 731 4045"}
  },
  {
    id:"j-m-launokorpi-charter",categories:["kuljetukset","muut-palvelut","aktiviteetit"],
    name:{fi:"J & M Launokorpi Oy – tilausajot",en:"J & M Launokorpi Oy – charter buses",es:"J & M Launokorpi Oy – autobuses privados"},
    description:{
      fi:"Kemiönsaaren palveluoppaan mukaan yritys järjestää tilausajoja 20–56-paikkaisilla linja-autoilla. Soveltuu ryhmien kuljetuksiin ja retkien järjestelyihin; varmista reitti, kalusto ja tarjous suoraan yritykseltä.",
      en:"The Kimitoön business guide lists charter transport with 20–56-seat coaches. Suitable for group transfers and excursions; confirm route, vehicle and quotation directly with the company.",
      es:"La guía empresarial de Kimitoön indica servicios de autobús privado con vehículos de 20 a 56 plazas. Para traslados de grupos y excursiones, consulta rutas, vehículos y presupuesto directamente con la empresa."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["tilausajo","linja-auto","ryhmäkuljetus"]
  },
  {
    id:"kemionsaaren-venekeskus",categories:["saaristo","ostokset","muut-palvelut"],
    name:{fi:"Kemiönsaaren Venekeskus Oy",en:"Kimitoön Boat Centre",es:"Centro Náutico de Kimitoön"},
    description:{
      fi:"Veneiden myyntiä, välitystä, säilytystä ja huoltoa tarjoava paikallinen venepalvelu. KSG listaa yrityksen myös venepaikkojen ja talvisäilytyksen yhteydessä. Tarkista palvelut ja vapaat säilytyspaikat suoraan yritykseltä.",
      en:"A local boating service offering boat sales, brokerage, storage and maintenance. KSG also lists the company under berths and winter storage. Confirm services and available storage directly with the business.",
      es:"Servicio náutico local que ofrece venta, intermediación, almacenamiento y mantenimiento de embarcaciones. KSG también lo incluye en amarres y almacenamiento invernal. Consulta servicios y plazas disponibles directamente con la empresa."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["venemyynti","venevälitys","venepaikat","talvisäilytys","huolto"]
  },
  {
    id:"kone-wuorio",categories:["ostokset","saaristo","muut-palvelut"],
    name:{fi:"Kone Wuorio Maskin Oy Ab – Taalintehdas",en:"Kone Wuorio Maskin Oy Ab – Dalsbruk",es:"Kone Wuorio Maskin Oy Ab – Dalsbruk"},
    description:{
      fi:"Taalintehtaan vene- ja kalastustarvikkeiden erikoisliike. Kemiönsaaren palveluopas listaa yrityksen veneilyyn liittyvien erikoiskauppojen joukkoon.",
      en:"A specialist shop for boating and fishing equipment in Dalsbruk. The Kimitoön business guide lists the company among specialist boating retailers.",
      es:"Tienda especializada en artículos de navegación y pesca en Dalsbruk. La guía empresarial de Kimitoön la incluye entre los comercios náuticos especializados."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["veneily","kalastustarvikkeet","erikoisliike"]
  },
  {
    id:"k-knallis",categories:["ostokset","ruoka"],
    name:{fi:"K-Knallis",en:"K-Knallis",es:"K-Knallis"},
    description:{
      fi:"Kemiönsaaren palveluoppaassa elintarvikekaupaksi listattu paikallinen kauppa. Palveluihin kuuluvat myös asiamiesposti, Veikkaus ja lääkekaappi. Tarkista ajantasainen valikoima ja aukiolo kaupasta.",
      en:"A local grocery store listed in the Kimitoön business guide. Services also include a postal agency, Veikkaus and a medicine cabinet. Check current selection and opening times with the shop.",
      es:"Tienda de alimentación local incluida en la guía empresarial de Kimitoön. También ofrece punto postal, Veikkaus y botiquín de medicamentos. Consulta la selección y los horarios actuales en la tienda."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["ruokakauppa","posti","päivittäistavarat"],
    contact:{phone:"040 561 2662",address:"Lammalavägen 98, 25830 Västanfjärd"}
  },
  {
    id:"k-market-kompis",categories:["ostokset","ruoka"],
    name:{fi:"K-Market Kompis",en:"K-Market Kompis",es:"K-Market Kompis"},
    description:{
      fi:"Kemiönsaaren palveluoppaan mukaan K-Market Kompis tarjoaa saariston paikallista kauppapalvelua. Tarkista ajantasaiset aukioloajat ja palvelut kaupasta.",
      en:"K-Market Kompis is listed in the Kimitoön business guide as a local grocery serving the archipelago. Check current opening hours and services with the shop.",
      es:"K-Market Kompis aparece en la guía empresarial de Kimitoön como tienda de alimentación local para el archipiélago. Consulta horarios y servicios actuales en la tienda."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["ruokakauppa","päivittäistavarat"]
  },
  {
    id:"k-supermarket-kompass",categories:["ostokset","ruoka"],
    name:{fi:"K-Supermarket Kompass",en:"K-Supermarket Kompass",es:"K-Supermarket Kompass"},
    description:{
      fi:"Kemiön keskustan ruokakauppa palvelutiskillä. Kemiönsaaren palveluopas listaa sen elintarvike- ja päivittäistavarakauppojen joukkoon.",
      en:"A grocery store with a service counter in central Kimito. The Kimitoön business guide lists it among local food and grocery retailers.",
      es:"Supermercado con mostrador de atención en el centro de Kimito. La guía empresarial de Kimitoön lo incluye entre los comercios de alimentación."
    },
    location:{fi:"Kemiö, Kemiönsaari",en:"Kimito, Kimitoön",es:"Kimito, Kimitoön"},
    websiteUrl:"https://www.k-ruoka.fi/kauppa/k-supermarket-kompass",sourceUrl:"https://ksg.fi/fi/foretag/k-supermarket-kompass/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/k-supermarket-kompass/",tags:["ruokakauppa","palvelutiski"]
  },
  {
    id:"antikvariat-kojan",categories:["ostokset","kulttuuri"],
    name:{fi:"Antikvariat Kojan",en:"Antikvariat Kojan",es:"Antikvariat Kojan"},
    description:{
      fi:"Antikvariaatti ja paperipuoti, josta Kemiönsaaren palveluoppaan mukaan löytyy myös paikallisia lahja- ja käsityötuotteita, leluja ja pelejä.",
      en:"A second-hand bookshop and stationery shop. The Kimitoön business guide also lists local gifts and crafts, toys and games.",
      es:"Librería de segunda mano y papelería. La guía empresarial de Kimitoön también menciona regalos y artesanía local, juguetes y juegos."
    },
    location:{fi:"Kemiö, Kemiönsaari",en:"Kimito, Kimitoön",es:"Kimito, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["antikvariaatti","paperipuoti","lahjat","käsityö"]
  },
  {
    id:"aanmaa",categories:["ostokset","kulttuuri"],
    name:{fi:"Aanmaa",en:"Aanmaa",es:"Aanmaa"},
    description:{
      fi:"Suomalaiseen käsityöhön erikoistunut paikallinen toimija. KSG listaa Aanmaan myös vaatteiden, kenkien ja tekstiilien tarjontaan.",
      en:"A local business specialising in Finnish handicrafts. KSG also lists Aanmaa under clothing, shoes and textiles.",
      es:"Negocio local especializado en artesanía finlandesa. KSG también incluye Aanmaa en ropa, calzado y textiles."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["suomalainen käsityö","lahjat","tekstiilit"]
  },
  {
    id:"atelje-rosenblad",categories:["ostokset","kulttuuri"],
    name:{fi:"Ateljé Rosenblad",en:"Ateljé Rosenblad",es:"Ateljé Rosenblad"},
    description:{
      fi:"Lastenvaatteiden omaa valmistusta ja maalaisromanttista tyyliä. Kemiönsaaren palveluopas listaa ateljeen käsityö- ja tekstiilialan toimijaksi.",
      en:"A local atelier producing children's clothing in a rural-romantic style. The Kimitoön business guide lists it under crafts and textiles.",
      es:"Atelier local de confección propia de ropa infantil con estilo romántico rural. La guía empresarial de Kimitoön lo incluye en artesanía y textiles."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["lastenvaatteet","käsityö","tekstiilit"]
  },
  {
    id:"ons-parlor",categories:["ostokset","ruoka","saaristo"],
    name:{fi:"Öns Pärlor – Yrsa Brunström",en:"Öns Pärlor – Yrsa Brunström",es:"Öns Pärlor – Yrsa Brunström"},
    description:{
      fi:"Paikallista savustettua kalaa tarjoava saaristotoimija. Kemiönsaaren palveluopas listaa sen elintarvikkeisiin, käsityöhön ja vierasvenesatamien palveluihin liittyvissä hauissa.",
      en:"An archipelago producer offering locally smoked fish. The Kimitoön business guide lists it under food, crafts and guest-harbour-related services.",
      es:"Productor del archipiélago que ofrece pescado ahumado local. La guía empresarial de Kimitoön lo incluye en alimentación, artesanía y servicios relacionados con puertos deportivos."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["savustettu kala","paikallistuotteet","saaristo"]
  },
  {
    id:"kj-koru",categories:["ostokset","kulttuuri"],
    name:{fi:"K.J. Koru Oy",en:"K.J. Koru Oy",es:"K.J. Koru Oy"},
    description:{
      fi:"Kemiönsaaren palveluoppaassa erikoisliikkeeksi listattu Classic-hopeakorujen myyjä.",
      en:"A specialist retailer listed in the Kimitoön business guide for Classic silver jewellery.",
      es:"Comercio especializado incluido en la guía empresarial de Kimitoön que vende joyería de plata Classic."
    },
    location:{fi:"Kemiö, Kemiönsaari",en:"Kimito, Kimitoön",es:"Kimito, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/",sourceUrl:"https://ksg.fi/fi/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/",tags:["hopeakorut","erikoisliike"]
  },
  {
    id:"cafe-vaffelstugan",categories:["ruoka"],
    name:{fi:"Café Våffelstugan",en:"Café Våffelstugan",es:"Café Våffelstugan"},
    description:{
      fi:"Kasnäsin alueen kahvilapalvelu, joka on listattu Kemiönsaaren palveluoppaan kahviloihin ja leipomoihin. Tarkista kauden aukiolo, vohvelivalikoima ja muut tarjoilut suoraan kahvilalta.",
      en:"A café in the Kasnäs area, listed in the Kimitoön business guide under cafés and bakeries. Confirm seasonal opening, waffle selection and other offerings directly with the café.",
      es:"Cafetería de la zona de Kasnäs, incluida en la guía empresarial de Kimitoön en cafeterías y panaderías. Consulta horarios de temporada, selección de gofres y oferta directamente con el establecimiento."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://ksg.fi/fi/foretag/cafe-vaffelstugan-2/",sourceUrl:"https://ksg.fi/fi/foretag/cafe-vaffelstugan-2/",
    imageCredit:"Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/cafe-vaffelstugan-2/",tags:["kahvila","vohvelit"]
  },
  {
    id:"nordic-activities-solutions",categories:["aktiviteetit","luonto","saaristo","talviaktiviteetit"],
    name:{fi:"Nordic Activities & Solutions",en:"Nordic Activities & Solutions",es:"Nordic Activities & Solutions"},
    description:{
      fi:"Kemiönsaarella toimiva elämys- ja välinevuokrausyritys. Palveluihin kuuluvat kajakkivuokraus, opastetut melonta- ja eräretket, kalliokiipeily ja laskeutuminen sekä talvella ski touring ja splitboarding. Yritys räätälöi myös asiakkaan toiveisiin sopivia retkiä.",
      en:"An adventure and equipment-rental company on Kimitoön. Services include kayak rental, guided paddling and wilderness trips, rock climbing and abseiling, plus ski touring and splitboarding in winter. Custom adventures can also be arranged.",
      es:"Empresa de aventuras y alquiler de equipos en Kimitoön. Ofrece alquiler de kayaks, excursiones guiadas de remo y naturaleza, escalada y rápel, además de esquí de travesía y splitboard en invierno. También organiza experiencias a medida."
    },
    location:{fi:"Rosendal Östra 108, 25860 Björkboda",en:"Rosendal Östra 108, 25860 Björkboda",es:"Rosendal Östra 108, 25860 Björkboda"},
    websiteUrl:"https://www.nordicactivities.fi/",sourceUrl:"https://www.nordicactivities.fi/",
    imageCredit:"Nordic Activities & Solutions",imageSource:"https://www.nordicactivities.fi/",tags:["kajakkivuokraus","opastetut retket","kalliokiipeily","talviaktiviteetit"],contact:{phone:"+358 400 600 711",address:"Rosendal Östra 108, 25860 Björkboda"}
  },
  {
    id:"spelman-ohoj",categories:["tapahtumat","kulttuuri","tapahtumapaikat","aktiviteetit"],
    name:{fi:"Spelmän Ohoj!",en:"Spelmän Ohoj!",es:"Spelmän Ohoj!"},
    description:{
      fi:"Kemiönsaarella toimiva kulttuuriyhdistys, joka tuottaa saariston kansanmusiikkiin perustuvia konsertteja, tapahtumia ja harrastusmahdollisuuksia. Toiminta vaalii saariston omaa musiikkiperintöä; ajankohtaiset konsertit ja harjoitukset löytyvät yhdistyksen sivuilta.",
      en:"A cultural association on Kimitoön producing concerts, events and music activities rooted in the archipelago's folk traditions. It works to preserve local musical heritage; current concerts and rehearsals are published on its website.",
      es:"Asociación cultural de Kimitoön que organiza conciertos, eventos y actividades musicales basadas en la música tradicional del archipiélago. Promueve el patrimonio musical local; los conciertos y ensayos actuales se publican en su web."
    },
    location:{fi:"Kemiönsaari · Ullman's Villa, Taalintehdas",en:"Kimitoön · Ullman's Villa, Dalsbruk",es:"Kimitoön · Ullman's Villa, Dalsbruk"},
    websiteUrl:"https://ohoj.fi/fi/",sourceUrl:"https://ohoj.fi/fi/",
    imageCredit:"Spelmän Ohoj!",imageSource:"https://ohoj.fi/fi/",tags:["kansanmusiikki","konsertit","kulttuuriperintö"]
  },
  {
    id:"vainion-liikenne",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Vainion Liikenne",en:"Vainion Liikenne",es:"Vainion Liikenne"},
    description:{
      fi:"Kemiönsaarelle kulkeva linja-autoyhtiö. Virallisella reittisivulla on Salo–Kemiö-yhteys sekä kesäkauden Helsinki–Teijo–Kemiö–Taalintehdas–Kasnäs-linja. Aikataulut ja kausivuorot muuttuvat, joten tarkista voimassa oleva PDF ja liput ennen matkaa.",
      en:"A bus operator serving Kimitoön. Its official route page lists the Salo–Kimito connection and a summer route from Helsinki via Teijo, Kimito and Dalsbruk to Kasnäs. Timetables and seasonal services change, so check the current PDF and tickets before travelling.",
      es:"Operador de autobuses con servicios a Kimitoön. Su página oficial incluye la ruta Salo–Kimito y una línea de verano desde Helsinki vía Teijo, Kimito y Dalsbruk hasta Kasnäs. Los horarios y servicios de temporada cambian; consulta el PDF vigente y los billetes antes de viajar."
    },
    location:{fi:"Reittiliikenne: Salo–Kemiö–Kasnäs",en:"Routes: Salo–Kimito–Kasnäs",es:"Rutas: Salo–Kimito–Kasnäs"},
    websiteUrl:"https://vainionliikenne.fi/reittiliikenne/",sourceUrl:"https://www.visitkimitoon.fi/fi/suunnittele/kemionsaareen/",
    imageCredit:"Vainion Liikenne / Visit Kemiönsaari",imageSource:"https://vainionliikenne.fi/reittiliikenne/",tags:["linja-auto","Salo–Kemiö","Helsinki–Kasnäs"]
  },
  {
    id:"seutu-plus",kind:"resource",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Seutu+ – paikallisliikenteen liput",en:"Seutu+ – regional transport tickets",es:"Seutu+ – billetes de transporte regional"},
    description:{
      fi:"Seutu+ on Turun seudun ja Kemiönsaaren paikallisliikenteen lippupalvelu. Kemiönsaarta palvelevat muun muassa vuorot 720–727 Turku–Kemiönsaari–Sauvo sekä linja 530 Salo–Kemiö. Tarkista matkustuskausi ja ajantasaiset aikataulut Seutu+-palvelusta.",
      en:"Seutu+ is the regional ticketing service for local transport in the Turku area and Kimitoön. Services include routes 720–727 between Turku, Kimitoön and Sauvo, and route 530 between Salo and Kimito. Check the travel season and current timetables in Seutu+.",
      es:"Seutu+ es el servicio de billetes para el transporte regional en la zona de Turku y Kimitoön. Incluye las rutas 720–727 entre Turku, Kimitoön y Sauvo, y la ruta 530 entre Salo y Kimito. Consulta la temporada y los horarios actuales en Seutu+."
    },
    location:{fi:"Kemiönsaari, Salo ja Turun seutu",en:"Kimitoön, Salo and Turku region",es:"Kimitoön, Salo y región de Turku"},
    websiteUrl:"https://www.seutuplus.fi/",sourceUrl:"https://www.kemionsaari.fi/asuminen-ja-ymparisto/liikenne-tiet-ja-yleiset-alueet/tiet-ja-liikenne/joukkoliikenne/",
    imageCredit:"Seutu+ / Kemiönsaaren kunta",imageSource:"https://www.kemionsaari.fi/asuminen-ja-ymparisto/liikenne-tiet-ja-yleiset-alueet/tiet-ja-liikenne/joukkoliikenne/",tags:["joukkoliikenne","linja-autot","liput"]
  },
  {
    id:"ms-aurora-car-ferry",kind:"place",categories:["kuljetukset","saaristo","muut-palvelut"],
    name:{fi:"M/S Aurora – Kasnäs–Rosala",en:"M/S Aurora – Kasnäs–Rosala",es:"M/S Aurora – Kasnäs–Rosala"},
    description:{
      fi:"Maksuton autolautta yhdistää Kasnäsin ja Rosalan ympäri vuoden. Merimatka kestää noin 30 minuuttia. Tarkista päivän aikataulu ja mahdolliset poikkeukset Rosalan viralliselta sivulta ennen lähtöä.",
      en:"A free car ferry connects Kasnäs and Rosala year-round. The crossing takes about 30 minutes. Check the daily timetable and any service changes on Rosala's official website before departure.",
      es:"Un ferry gratuito para coches conecta Kasnäs y Rosala durante todo el año. La travesía dura unos 30 minutos. Consulta el horario diario y posibles cambios en la web oficial de Rosala antes de salir."
    },
    location:{fi:"Långnäsin ja Kasnäsin lauttarannat",en:"Långnäs and Kasnäs ferry landings",es:"Muelles de Långnäs y Kasnäs"},
    websiteUrl:"https://rosala.fi/fi/bilfarjan-ms-aurora/",sourceUrl:"https://www.visitkimitoon.fi/fi/suunnittele/kemionsaareen/",
    imageCredit:"Rosala / Visit Kemiönsaari",imageSource:"https://rosala.fi/fi/bilfarjan-ms-aurora/",tags:["autolautta","maksuton","ympäri vuoden"]
  },
  {
    id:"kimitoon-activity-map",kind:"resource",categories:["aktiviteetit","luonto","saaristo","talviaktiviteetit","muut-palvelut"],
    name:{fi:"Kemiönsaaren aktiviteettikartta",en:"Kimitoön Activity Map",es:"Mapa de actividades de Kimitoön"},
    description:{
      fi:"Kemiönsaaren virallinen aktiviteettikartta kokoaa 277 karttakohdetta. Suodattimilla voi etsiä sisä- ja ulkoaktiviteetteja, vesiretkeilyä, retkeilyreittejä, kausikohteita ja esteettömiä paikkoja. Kartta sisältää muun muassa luontopolkuja, uimarantoja, satamia, hiihtolatuja, kiipeilykallioita ja liikuntapaikkoja.",
      en:"The official Kimitoön activity map brings together 277 mapped places. Filters cover indoor and outdoor activities, water excursions, hiking routes, seasonal places and accessible sites. The map includes nature trails, beaches, harbours, ski tracks, climbing rocks and sports facilities.",
      es:"El mapa oficial de actividades de Kimitoön reúne 277 lugares. Sus filtros incluyen actividades interiores y exteriores, excursiones acuáticas, rutas de senderismo, lugares de temporada y sitios accesibles. Incluye senderos naturales, playas, puertos, pistas de esquí, zonas de escalada e instalaciones deportivas."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["277 karttakohdetta","luonto","ulkoilu","vesiretkeily","talvi"]
  },
  {
    id:"ekniemi-luontopolut",kind:"place",categories:["luonto","aktiviteetit","talviaktiviteetit"],
    name:{fi:"Ekniemen luontopolut ja talviuintipaikka",en:"Ekniemi Nature Trails and Winter Swimming",es:"Senderos y baño invernal de Ekniemi"},
    description:{
      fi:"Ekniemen lomakylän yhteydessä on luontopolkuja, uimaranta ja talviuintipaikka. Aktiviteettikartta listaa myös alueen opastaulut ja näköalatornin. Tarkista alueen palvelut ja mahdolliset rajoitukset kartasta.",
      en:"Ekniemi Holiday Village has nature trails, a beach and a winter-swimming spot. The activity map also lists trail information boards and a lookout tower. Check current facilities and any restrictions on the map.",
      es:"Junto al complejo vacacional de Ekniemi hay senderos naturales, playa y zona de baño invernal. El mapa también incluye paneles informativos y una torre de observación. Consulta los servicios y restricciones actuales."
    },
    location:{fi:"Ekniemen lomakylä, Kemiönsaari",en:"Ekniemi Holiday Village, Kimitoön",es:"Complejo vacacional Ekniemi, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["luontopolku","uimaranta","talviuinti","näköalatorni"]
  },
  {
    id:"biskopso-nature-trail",kind:"place",categories:["luonto","aktiviteetit"],
    name:{fi:"Biskopsön luontopolku ja näköalatorni",en:"Biskopsö Nature Trail and Lookout Tower",es:"Sendero y mirador de Biskopsö"},
    description:{
      fi:"Biskopsön luontopolku ja näköalatorni ovat Kemiönsaaren virallisessa aktiviteettikartassa. Tarkista reitin lähtöpiste, kulkuyhteydet ja mahdolliset kausirajoitukset kartasta.",
      en:"Biskopsö Nature Trail and its lookout tower are listed on Kimitoön's official activity map. Check the trailhead, transport connections and any seasonal restrictions on the map.",
      es:"El sendero natural y la torre panorámica de Biskopsö aparecen en el mapa oficial de actividades de Kimitoön. Consulta el inicio del sendero, las conexiones y posibles restricciones estacionales."
    },
    location:{fi:"Biskopsö, Kemiönsaari",en:"Biskopsö, Kimitoön",es:"Biskopsö, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["luontopolku","näköalatorni"]
  },
  {
    id:"kasnas-geological-trail",kind:"place",categories:["luonto","aktiviteetit","hyvinvointi"],
    name:{fi:"Kasnäsin geologinen luontopolku",en:"Kasnäs Geological Nature Trail",es:"Sendero geológico de Kasnäs"},
    description:{
      fi:"Kasnäsin geologinen luontopolku on merkitty Kemiönsaaren viralliseen aktiviteettikarttaan. Reitin opastaulut esittelevät alueen geologiaa. Tarkista reitin lähtöpaikka ja ajantasaiset tiedot kartasta.",
      en:"The Kasnäs Geological Nature Trail is listed on Kimitoön's official activity map. Information boards introduce the area's geology. Check the trailhead and current details on the map.",
      es:"El sendero geológico de Kasnäs figura en el mapa oficial de actividades de Kimitoön. Los paneles informativos presentan la geología de la zona. Consulta el inicio y los detalles actuales en el mapa."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["geologia","luontopolku","opastaulut"]
  },
  {
    id:"lammala-nature-trail",kind:"place",categories:["luonto","aktiviteetit"],
    name:{fi:"Lammalan luontopolku",en:"Lammala Nature Trail",es:"Sendero natural de Lammala"},
    description:{
      fi:"Lammalan luontopolku on Kemiönsaaren aktiviteettikartassa merkitty retkikohde. Kartasta löytyvät myös polun opastaulut ja lähialueen palvelusatama.",
      en:"Lammala Nature Trail is listed as an outdoor destination on Kimitoön's activity map. The map also shows trail information boards and the nearby service harbour.",
      es:"El sendero natural de Lammala aparece como destino al aire libre en el mapa de actividades de Kimitoön. El mapa también muestra paneles informativos y el puerto de servicios cercano."
    },
    location:{fi:"Lammala, Kemiönsaari",en:"Lammala, Kimitoön",es:"Lammala, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["luontopolku","retkeily","satama"]
  },
  {
    id:"hogland-nature-trail",kind:"place",categories:["luonto","aktiviteetit"],
    name:{fi:"Höglandin luontopolku",en:"Högland Nature Trail",es:"Sendero natural de Högland"},
    description:{
      fi:"Höglandin luontopolku, näköalatorni, telttailualue ja tulentekopaikka löytyvät Kemiönsaaren aktiviteettikartasta. Tarkista reitin pituus ja palvelut kartasta ennen retkeä.",
      en:"Högland Nature Trail, lookout tower, camping area and fire site are listed on Kimitoön's activity map. Check trail length and facilities before setting out.",
      es:"El sendero de Högland, la torre panorámica, la zona de acampada y el lugar para hacer fuego aparecen en el mapa de actividades de Kimitoön. Consulta la longitud y los servicios antes de salir."
    },
    location:{fi:"Högland, Kemiönsaari",en:"Högland, Kimitoön",es:"Högland, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["luontopolku","näköalatorni","telttailu"]
  },
  {
    id:"yxskar-nature-trail",kind:"place",categories:["luonto","aktiviteetit","saaristo"],
    name:{fi:"Yxskärin luontopolku",en:"Yxskär Nature Trail",es:"Sendero natural de Yxskär"},
    description:{
      fi:"Yxskärin luontopolku, opastaulu, retkisatama ja tulentekopaikka on merkitty Kemiönsaaren viralliseen aktiviteettikarttaan. Tarkista saareen pääsy ja mahdolliset vene- tai säärajoitukset ennen retkeä.",
      en:"Yxskär Nature Trail, information board, excursion harbour and fire site are listed on Kimitoön's official activity map. Check island access and any boat or weather restrictions before visiting.",
      es:"El sendero natural de Yxskär, su panel informativo, puerto de excursión y lugar para hacer fuego aparecen en el mapa oficial de actividades. Comprueba el acceso a la isla y las condiciones marítimas antes de la visita."
    },
    location:{fi:"Yxskär, Kemiönsaaren saaristo",en:"Yxskär, Kimitoön archipelago",es:"Yxskär, archipiélago de Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["luontopolku","retkisatama","saaristo"]
  },
  {
    id:"taalintehdas-ski-track",kind:"place",categories:["talviaktiviteetit","luonto","aktiviteetit"],
    name:{fi:"Taalintehtaan hiihtolatu",en:"Dalsbruk Ski Track",es:"Pista de esquí de Dalsbruk"},
    description:{
      fi:"Taalintehtaan hiihtolatu on merkitty Kemiönsaaren aktiviteettikarttaan. Ladun kunto ja ylläpito riippuvat lumitilanteesta; tarkista ajantasainen tieto kartasta ennen lähtöä.",
      en:"The Dalsbruk ski track is listed on Kimitoön's activity map. Track condition and maintenance depend on snow conditions; check current information before setting out.",
      es:"La pista de esquí de Dalsbruk figura en el mapa de actividades de Kimitoön. Su estado y mantenimiento dependen de la nieve; consulta la información actual antes de salir."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["hiihto","latu","talvi"]
  },
  {
    id:"langdalen-ski-track",kind:"place",categories:["talviaktiviteetit","luonto","aktiviteetit"],
    name:{fi:"Långdalenin peltolatu",en:"Långdalen Field Ski Track",es:"Pista de esquí de Långdalen"},
    description:{
      fi:"Långdalenin peltolatu on Kemiönsaaren aktiviteettikarttaan merkitty talviliikuntakohde. Tarkista lumitilanne ja ladun ajantasainen ylläpito ennen lähtöä.",
      en:"The Långdalen field ski track is listed as a winter activity on Kimitoön's activity map. Check snow conditions and current track maintenance before setting out.",
      es:"La pista de esquí de campo de Långdalen aparece como actividad invernal en el mapa de Kimitoön. Comprueba la nieve y el mantenimiento actual antes de salir."
    },
    location:{fi:"Långdalen, Kemiönsaari",en:"Långdalen, Kimitoön",es:"Långdalen, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["hiihto","latu","talvi"]
  },
  {
    id:"labbnas-winter-swimming",kind:"place",categories:["talviaktiviteetit","hyvinvointi","luonto"],
    name:{fi:"Labbnäsin talviuintipaikka",en:"Labbnäs Winter Swimming",es:"Baño invernal de Labbnäs"},
    description:{
      fi:"Labbnäsin talviuintipaikka on merkitty Kemiönsaaren aktiviteettikarttaan. Tarkista pukutilat, käyttöehdot ja ajantasainen ylläpito suoraan kohteesta.",
      en:"Labbnäs winter-swimming spot is listed on Kimitoön's activity map. Confirm changing facilities, access rules and current maintenance directly at the site.",
      es:"La zona de baño invernal de Labbnäs aparece en el mapa de actividades de Kimitoön. Consulta vestuarios, normas de uso y mantenimiento directamente en el lugar."
    },
    location:{fi:"Labbnäs, Dragsfjärd",en:"Labbnäs, Dragsfjärd",es:"Labbnäs, Dragsfjärd"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["talviuinti","hyvinvointi"]
  },
  {
    id:"soderlangvik-winter-swimming",kind:"place",categories:["talviaktiviteetit","hyvinvointi","luonto"],
    name:{fi:"Söderlångvikin talviuintipaikka",en:"Söderlångvik Winter Swimming",es:"Baño invernal de Söderlångvik"},
    description:{
      fi:"Söderlångvikin talviuintipaikka on listattu Kemiönsaaren aktiviteettikarttaan. Tarkista kulku, käyttöehdot ja mahdolliset palvelut kartasta ja kohteen ylläpitäjältä.",
      en:"Söderlångvik winter-swimming spot is listed on Kimitoön's activity map. Check access, usage rules and available facilities on the map and with the site operator.",
      es:"La zona de baño invernal de Söderlångvik aparece en el mapa de actividades de Kimitoön. Consulta acceso, normas y servicios disponibles en el mapa y con el responsable del lugar."
    },
    location:{fi:"Söderlångvik, Kemiönsaari",en:"Söderlångvik, Kimitoön",es:"Söderlångvik, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["talviuinti","hyvinvointi"]
  },
  {
    id:"senatsberget-wellbeing-trail",kind:"place",categories:["hyvinvointi","luonto","aktiviteetit"],
    name:{fi:"Senatsbergetin hyvinvointipolku",en:"Senatsberget Wellbeing Trail",es:"Sendero de bienestar de Senatsberget"},
    description:{
      fi:"Senatsbergetin hyvinvointipolku, laavu ja näköalatorni on merkitty Kemiönsaaren aktiviteettikarttaan. Kohde sopii rauhalliseen ulkoiluun ja luonnossa palautumiseen. Tarkista reitin tiedot kartasta.",
      en:"Senatsberget Wellbeing Trail, shelter and lookout tower are listed on Kimitoön's activity map. The site is suited to gentle outdoor activity and time in nature. Check route details on the map.",
      es:"El sendero de bienestar de Senatsberget, su refugio y torre panorámica aparecen en el mapa de actividades de Kimitoön. Es un lugar para paseos tranquilos y descanso en la naturaleza. Consulta la ruta en el mapa."
    },
    location:{fi:"Senatsberget, Kemiönsaari",en:"Senatsberget, Kimitoön",es:"Senatsberget, Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://kartta.kemionsaari.fi/",
    imageCredit:"Kemiönsaaren kunta – aktiviteettikartta",imageSource:"https://kartta.kemionsaari.fi/",tags:["hyvinvointipolku","laavu","näköalatorni"]
  },

  {
    id:"bjorknas-care-water-taxi",categories:["kuljetukset","saaristo","aktiviteetit"],
    name:{fi:"Björknäs Care Oy – vesitaksi",en:"Björknäs Care Oy – water taxi",es:"Björknäs Care Oy – taxi acuático"},
    description:{
      fi:"Kemiönsaaren palveluopas listaa Björknäs Care Oy:n enintään 11 henkilön vesitaksipalveluna. Varmista reitti, matkustajamäärä, aikataulu ja sääolosuhteisiin liittyvät käytännöt suoraan toimijalta.",
      en:"The Kimitoön business guide lists Björknäs Care Oy as a water-taxi service for up to 11 passengers. Confirm route, passenger capacity, schedule and weather-related arrangements directly with the operator.",
      es:"La guía empresarial de Kimitoön incluye Björknäs Care Oy como taxi acuático para hasta 11 pasajeros. Confirma ruta, capacidad, horario y condiciones meteorológicas directamente con el operador."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/bjorknas-care-oy/",sourceUrl:"https://ksg.fi/sv/foretag/bjorknas-care-oy/",
    imageCredit:"Björknäs Care Oy / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/bjorknas-care-oy/",tags:["vesitaksi","enintään 11 matkustajaa"]
  },
  {
    id:"dalsbruks-sjotrafik",categories:["kuljetukset","saaristo"],
    name:{fi:"Dalsbruks Sjötrafik Ab",en:"Dalsbruks Sjötrafik Ab",es:"Dalsbruks Sjötrafik Ab"},
    description:{
      fi:"Taalintehtaan ja lähisaariston vesitaksiliikenne. KSG:n mukaan yritys tarjoaa taksivenekuljetuksia Dalsbrukin ympäristössä. Varaa reitti ja varmista kuljetuksen kapasiteetti suoraan yritykseltä.",
      en:"Water-taxi transport around Dalsbruk and nearby islands. KSG lists the company for taxi-boat services in the Dalsbruk area. Arrange the route and confirm passenger capacity directly with the operator.",
      es:"Transporte en taxi acuático por Dalsbruk y las islas cercanas. KSG incluye la empresa para servicios de taxi-barco en la zona. Organiza la ruta y confirma la capacidad directamente con el operador."
    },
    location:{fi:"Taalintehdas ja lähisaaristo",en:"Dalsbruk and nearby islands",es:"Dalsbruk e islas cercanas"},
    websiteUrl:"https://ksg.fi/sv/foretag/dalsbruks-sjotrafik-ab/",sourceUrl:"https://ksg.fi/sv/foretag/dalsbruks-sjotrafik-ab/",
    imageCredit:"Dalsbruks Sjötrafik / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/dalsbruks-sjotrafik-ab/",tags:["vesitaksi","saaristokuljetus"]
  },
  {
    id:"db-marina",categories:["saaristo","muut-palvelut"],
    name:{fi:"DB Marina",en:"DB Marina",es:"DB Marina"},
    description:{
      fi:"Taalintehtaan veneilijöiden palvelupiste. Kemiönsaaren palveluopas kuvaa DB Marinan palvelupisteeksi veneenomistajien tarpeisiin. Tarkista laituripaikat, palvelut ja kausitiedot suoraan marinasta.",
      en:"A boating service point in Dalsbruk. The Kimitoön business guide describes DB Marina as a service point for boat owners. Confirm berths, facilities and seasonal information directly with the marina.",
      es:"Punto de servicio náutico en Dalsbruk. La guía empresarial de Kimitoön describe DB Marina como un centro de servicios para propietarios de embarcaciones. Consulta amarres, instalaciones y temporada directamente con el puerto."
    },
    location:{fi:"Taalintehtaan satama",en:"Dalsbruk harbour",es:"Puerto de Dalsbruk"},
    websiteUrl:"https://ksg.fi/sv/foretag/db-marina/",sourceUrl:"https://ksg.fi/sv/foretag/db-marina/",
    imageCredit:"DB Marina / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/db-marina/",tags:["veneilypalvelut","satama"]
  },
  {
    id:"fma-leif-gustafsson",categories:["saaristo","kuljetukset","muut-palvelut"],
    name:{fi:"Fma Leif Gustafsson",en:"Fma Leif Gustafsson",es:"Fma Leif Gustafsson"},
    description:{
      fi:"Kemiönsaaren palveluopas listaa yrityksen venepaikkoihin, veneiden lämmin- ja kylmäsäilytykseen, venehuoltoon, venetrailerien vuokraukseen, mökkihuoltoon ja pieniin merikuljetuksiin.",
      en:"The Kimitoön business guide lists berths, heated and cold boat storage, boat service, boat-trailer rental, cottage maintenance and small sea transports among the company's services.",
      es:"La guía empresarial de Kimitoön incluye amarres, almacenamiento de embarcaciones en naves frías y cálidas, mantenimiento, alquiler de remolques, mantenimiento de cabañas y pequeños transportes marítimos."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/fma-leif-gustafsson/",sourceUrl:"https://ksg.fi/sv/foretag/fma-leif-gustafsson/",
    imageCredit:"Fma Leif Gustafsson / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/fma-leif-gustafsson/",tags:["venepaikat","talvisäilytys","venetrailerit","merikuljetukset"]
  },
  {
    id:"jimmys-boat-service",categories:["saaristo","muut-palvelut"],
    name:{fi:"Jimmy's Boat Service",en:"Jimmy's Boat Service",es:"Jimmy's Boat Service"},
    description:{
      fi:"Veneiden, moottoreiden ja mönkijöiden huoltopalvelu. KSG:n mukaan yritys tarjoaa myös Polaris-merkin valtuutettua huoltoa.",
      en:"Service and maintenance for boats, motors and ATVs. KSG also lists the company as an authorised Polaris service provider.",
      es:"Servicio y mantenimiento de embarcaciones, motores y quads. KSG también indica que es un servicio autorizado de Polaris."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/jimmys-boat-service/",sourceUrl:"https://ksg.fi/sv/foretag/jimmys-boat-service/",
    imageCredit:"Jimmy's Boat Service / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/jimmys-boat-service/",tags:["veneen huolto","moottorit","mönkijät"]
  },
  {
    id:"rosala-gasthamn-tb-marin",categories:["saaristo","ostokset","muut-palvelut"],
    name:{fi:"Rosala Gästhamn – TB-Marin",en:"Rosala Guest Harbour – TB-Marin",es:"Puerto deportivo de Rosala – TB-Marin"},
    description:{
      fi:"Rosalan vierasvenesatama, jossa KSG:n mukaan on veneiden ja moottoreiden talvisäilytystä, rakennustöitä, elintarvikekioski ja vierasvenesatama. Tarkista laituripaikat, kioskikausi ja satamapalvelut suoraan toimijalta.",
      en:"A guest harbour in Rosala. KSG lists winter storage for boats and engines, construction services, a food kiosk and guest-harbour facilities. Confirm berths, kiosk season and harbour services directly with the operator.",
      es:"Puerto deportivo en Rosala. KSG menciona almacenamiento invernal de embarcaciones y motores, trabajos de construcción, quiosco de alimentos y servicios portuarios. Consulta amarres, temporada del quiosco y servicios directamente con el operador."
    },
    location:{fi:"Rosala, Kemiönsaari",en:"Rosala, Kimitoön",es:"Rosala, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/rosala-gasthamn-tb-marin/",sourceUrl:"https://ksg.fi/sv/foretag/rosala-gasthamn-tb-marin/",
    imageCredit:"TB-Marin / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/rosala-gasthamn-tb-marin/",tags:["vierasvenesatama","talvisäilytys","kioski"]
  },
  {
    id:"wilson-charter",categories:["kuljetukset","saaristo","aktiviteetit"],
    name:{fi:"Wilson Charter Oy Ab",en:"Wilson Charter Oy Ab",es:"Wilson Charter Oy Ab"},
    description:{
      fi:"Saariston tilausvenekuljetuksia ja risteilyjä tarjoava yritys. KSG:n mukaan käytössä on 135-, 80- ja 40-paikkaisia taksiveneitä, ja risteilykohteisiin kuuluvat Bengtskär ja Örö. Tarkista reitit, aikataulut ja ryhmävaraukset suoraan yritykseltä.",
      en:"A charter-boat and cruise operator in the archipelago. KSG lists taxi boats for 135, 80 and 40 passengers, with cruises to Bengtskär and Örö. Confirm routes, schedules and group bookings directly with the company.",
      es:"Operador de barcos chárter y excursiones por el archipiélago. KSG menciona barcos taxi para 135, 80 y 40 pasajeros, con cruceros a Bengtskär y Örö. Consulta rutas, horarios y reservas de grupos directamente con la empresa."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/wilson-charter-oy-ab/",sourceUrl:"https://ksg.fi/sv/foretag/wilson-charter-oy-ab/",
    imageCredit:"Wilson Charter / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/wilson-charter-oy-ab/",tags:["taksivene","risteily","Bengtskär","Örö"]
  },
  {
    id:"dalsbruks-gasthamn",kind:"place",categories:["saaristo","muut-palvelut"],
    name:{fi:"Taalintehtaan vierasvenesatama",en:"Dalsbruk Guest Harbour",es:"Puerto deportivo de Dalsbruk"},
    description:{
      fi:"Täyden palvelun vierasvenesatama Taalintehtaan keskustassa. Tarkista ajantasaiset laituripaikat, palvelut, satamamaksut ja kausitiedot sataman omasta palvelukanavasta.",
      en:"A full-service guest harbour in central Dalsbruk. Check current berths, facilities, harbour fees and seasonal information through the harbour's official service channel.",
      es:"Puerto deportivo con servicios completos en el centro de Dalsbruk. Consulta amarres, instalaciones, tarifas y temporada en el canal oficial del puerto."
    },
    location:{fi:"Taalintehtaan keskusta",en:"Central Dalsbruk",es:"Centro de Dalsbruk"},
    websiteUrl:"https://ksg.fi/sv/foretag/dalsbruks-gasthamn/",sourceUrl:"https://ksg.fi/sv/foretag/dalsbruks-gasthamn/",
    imageCredit:"Dalsbruks Gästhamn / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/dalsbruks-gasthamn/",tags:["vierasvenesatama","täyden palvelun satama"]
  },
  {
    id:"kasnas-taxibat",categories:["kuljetukset","saaristo","aktiviteetit"],
    name:{fi:"Kasnäsin taksivene",en:"Kasnäs Water Taxi",es:"Taxi acuático de Kasnäs"},
    description:{
      fi:"Kasnäsistä lähtevä taksivenepalvelu. KSG:n mukaan veneisiin mahtuu enintään 8 tai 12 matkustajaa. Varmista reitti, matkustajamäärä ja varaus suoraan kuljettajalta.",
      en:"A water-taxi service departing from Kasnäs. KSG lists boats with capacity for up to 8 or 12 passengers. Confirm route, capacity and booking directly with the operator.",
      es:"Servicio de taxi acuático con salida desde Kasnäs. KSG indica embarcaciones para un máximo de 8 o 12 pasajeros. Confirma ruta, capacidad y reserva directamente con el operador."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/kasnas-taxibat/",sourceUrl:"https://ksg.fi/sv/foretag/kasnas-taxibat/",
    imageCredit:"Kasnäs Taxibåt / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/kasnas-taxibat/",tags:["taksivene","saaristokuljetus"]
  },
  {
    id:"d-marin",categories:["saaristo","muut-palvelut"],
    name:{fi:"D-Marin Oy Ab",en:"D-Marin Oy Ab",es:"D-Marin Oy Ab"},
    description:{
      fi:"Veneiden ja moottoreiden korjauspalvelu sekä vuokrattavia laituripaikkoja. KSG listaa yrityksen myös vierasvenesatamien yhteydessä.",
      en:"Boat and engine repair services with rental berths. KSG also lists the company among guest-harbour services.",
      es:"Servicio de reparación de embarcaciones y motores, con amarres disponibles para alquilar. KSG también incluye la empresa entre los servicios de puertos deportivos."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/d-marin-oy-ab/",sourceUrl:"https://ksg.fi/sv/foretag/d-marin-oy-ab/",
    imageCredit:"D-Marin / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/d-marin-oy-ab/",tags:["venekorjaus","moottorihuolto","laituripaikat"]
  },
  {
    id:"dalsbruks-batservice",categories:["saaristo","muut-palvelut"],
    name:{fi:"Dalsbruks Båtservice Ab",en:"Dalsbruks Båtservice Ab",es:"Dalsbruks Båtservice Ab"},
    description:{
      fi:"Taalintehtaan venealan palveluyritys. KSG:n mukaan palveluihin kuuluvat moottorihuolto ja korjaus, veneiden säilytys sekä laituripaikat.",
      en:"A boating-services company in Dalsbruk. KSG lists engine servicing and repairs, boat storage and berths among its services.",
      es:"Empresa de servicios náuticos en Dalsbruk. KSG incluye mantenimiento y reparación de motores, almacenamiento de embarcaciones y amarres."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/dalsbruks-batservice-ab/",sourceUrl:"https://ksg.fi/sv/foretag/dalsbruks-batservice-ab/",
    imageCredit:"Dalsbruks Båtservice / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/dalsbruks-batservice-ab/",tags:["moottorihuolto","venekorjaus","venepaikat"]
  },
  {
    id:"biskopso-boat-service",categories:["kuljetukset","saaristo","muut-palvelut"],
    name:{fi:"Biskopsö båt- och fastighetsservice",en:"Biskopsö Boat and Property Service",es:"Servicio náutico e inmobiliario de Biskopsö"},
    description:{
      fi:"Biskopsön alueen vene- ja kiinteistöpalvelu. KSG:n mukaan yritys tarjoaa venetaksia ja veneiden säilytystä. Varmista kuljetukset, reitit ja säilytysmahdollisuudet suoraan toimijalta.",
      en:"Boat and property services in the Biskopsö area. KSG lists water-taxi transport and boat storage. Confirm transport, routes and storage availability directly with the operator.",
      es:"Servicios náuticos e inmobiliarios en la zona de Biskopsö. KSG menciona taxi acuático y almacenamiento de embarcaciones. Consulta transporte, rutas y disponibilidad directamente con el operador."
    },
    location:{fi:"Biskopsö, Kemiönsaaren saaristo",en:"Biskopsö, Kimitoön archipelago",es:"Biskopsö, archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/biskopso-bat-fastighetsservice/",sourceUrl:"https://ksg.fi/sv/foretag/biskopso-bat-fastighetsservice/",
    imageCredit:"Biskopsö båt- och fastighetsservice / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/biskopso-bat-fastighetsservice/",tags:["venetaksi","veneen säilytys"]
  },
  {
    id:"be-marina",categories:["saaristo"],
    name:{fi:"BE-Marina Oy Ab",en:"BE-Marina Oy Ab",es:"BE-Marina Oy Ab"},
    description:{
      fi:"Taalintehtaan venepaikkoja tarjoava marina. Tarkista vapaat paikat, laituripalvelut ja kausiehdot suoraan marinasta.",
      en:"A marina offering berths in Dalsbruk. Confirm available spaces, quay services and seasonal terms directly with the marina.",
      es:"Puerto deportivo que ofrece amarres en Dalsbruk. Consulta plazas disponibles, servicios del muelle y condiciones de temporada directamente con el puerto."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/be-marina-oy-ab/",sourceUrl:"https://ksg.fi/sv/foretag/be-marina-oy-ab/",
    imageCredit:"BE-Marina / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/be-marina-oy-ab/",tags:["venepaikat","marina"]
  },
  {
    id:"soljeholmen-marina",categories:["saaristo","muut-palvelut"],
    name:{fi:"Söljeholmen Marina Ab Oy",en:"Söljeholmen Marina Ab Oy",es:"Söljeholmen Marina Ab Oy"},
    description:{
      fi:"Palvelullisia venepaikkoja tarjoava marina. KSG:n mukaan alueella on Volvo Penta -huolto sekä Suzuki- ja Honda-palveluja. Tarkista vapaat paikat ja huoltopalvelut suoraan marinasta.",
      en:"A marina offering serviced berths. KSG lists Volvo Penta service as well as Suzuki and Honda services. Confirm berth availability and maintenance services directly with the marina.",
      es:"Puerto deportivo con amarres y servicios. KSG menciona servicio Volvo Penta y servicios Suzuki y Honda. Consulta amarres y mantenimiento directamente con el puerto."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/soljeholmen-marina-ab-oy/",sourceUrl:"https://ksg.fi/sv/foretag/soljeholmen-marina-ab-oy/",
    imageCredit:"Söljeholmen Marina / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/soljeholmen-marina-ab-oy/",tags:["venepaikat","Volvo Penta","Suzuki","Honda"]
  },
  {
    id:"seapoint-dalsbruk",categories:["saaristo","muut-palvelut"],
    name:{fi:"Seapoint Dalsbruk",en:"Seapoint Dalsbruk",es:"Seapoint Dalsbruk"},
    description:{
      fi:"Veneiden ja autojen polttoainemyynti Taalintehtaalla ympäri vuorokauden. Tarkista maksutavat ja polttoainelaadut suoraan palvelupisteestä.",
      en:"24-hour fuel sales for boats and cars in Dalsbruk. Confirm payment methods and fuel types directly with the service point.",
      es:"Venta de combustible para embarcaciones y coches en Dalsbruk las 24 horas. Consulta directamente los métodos de pago y tipos de combustible."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/seapoint-dalsbruk/",sourceUrl:"https://ksg.fi/sv/foretag/seapoint-dalsbruk/",
    imageCredit:"Seapoint Dalsbruk / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/seapoint-dalsbruk/",tags:["polttoaine","veneet","autot","24/7"]
  },
  {
    id:"kimitoon-sjoraddare",categories:["saaristo","muut-palvelut"],
    name:{fi:"Kemiönsaaren Meripelastajat ry",en:"Kimitoön Sea Rescue Association",es:"Asociación de Salvamento Marítimo de Kimitoön"},
    description:{
      fi:"Vapaaehtoinen meripelastusyhdistys, jonka tehtävänä on auttaa vesillä liikkuvia. Hätätilanteessa soita aina yleiseen hätänumeroon 112; yhdistyksen omat kanavat on tarkoitettu lisätietoon ja toimintaan osallistumiseen.",
      en:"A volunteer sea-rescue association helping people on the water. In an emergency, always call the general emergency number 112; the association's own channels provide further information and participation details.",
      es:"Asociación voluntaria de salvamento marítimo que ayuda a las personas en el agua. En caso de emergencia, llama siempre al número general 112; los canales de la asociación ofrecen información y participación."
    },
    location:{fi:"Kemiönsaaren saaristo",en:"Kimitoön archipelago",es:"Archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/kimitoons-sjoraddare-rf/",sourceUrl:"https://ksg.fi/sv/foretag/kimitoons-sjoraddare-rf/",
    imageCredit:"Kemiönsaaren Meripelastajat / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/kimitoons-sjoraddare-rf/",tags:["vapaaehtoinen meripelastus","turvallisuus"]
  },
  {
    id:"kimitoon-batservice",categories:["saaristo","ostokset","muut-palvelut"],
    name:{fi:"Kimitoöns Båtservice Ab",en:"Kimitoöns Båtservice Ab",es:"Kimitoöns Båtservice Ab"},
    description:{
      fi:"Veneilyvarusteiden myyntiä ja ammattimaista asennusta Kemiönsaarella. Tarkista tuotevalikoima ja asennuspalvelut suoraan yritykseltä.",
      en:"Boat-equipment sales and professional installation on Kimitoön. Confirm the product range and installation services directly with the company.",
      es:"Venta e instalación profesional de equipamiento náutico en Kimitoön. Consulta directamente la gama de productos y los servicios de instalación."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/kimitoons-batservice-ab/",sourceUrl:"https://ksg.fi/sv/foretag/kimitoons-batservice-ab/",
    imageCredit:"Kimitoöns Båtservice / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/kimitoons-batservice-ab/",tags:["veneilyvarusteet","asennus"]
  },
  {
    id:"osterbergs-bat-och-tra",categories:["saaristo","muut-palvelut"],
    name:{fi:"Österbergs Båt och Trä",en:"Österbergs Båt och Trä",es:"Österbergs Båt och Trä"},
    description:{
      fi:"Puisten veneiden rakentamista ja korjausta. Kemiönsaaren palveluopas listaa yrityksen venealan toimijaksi.",
      en:"Construction and repair of wooden boats. The Kimitoön business guide lists the company as a local boating specialist.",
      es:"Construcción y reparación de embarcaciones de madera. La guía empresarial de Kimitoön incluye la empresa entre los especialistas náuticos locales."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/osterbergs-bat-och-tra/",sourceUrl:"https://ksg.fi/sv/foretag/osterbergs-bat-och-tra/",
    imageCredit:"Österbergs Båt och Trä / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/osterbergs-bat-och-tra/",tags:["puuveneet","veneenrakennus","korjaus"]
  },
  {
    id:"ag-service",categories:["saaristo","muut-palvelut"],
    name:{fi:"AG Service Ab Oy",en:"AG Service Ab Oy",es:"AG Service Ab Oy"},
    description:{
      fi:"Veneiden, mönkijöiden ja vesijettien säilytys- ja moottorihuoltopalvelu. KSG listaa yrityksen venepaikkojen ja talvisäilytyksen toimijaksi.",
      en:"Storage and engine service for boats, ATVs and water scooters. KSG lists the company among berth and winter-storage providers.",
      es:"Almacenamiento y mantenimiento de motores para embarcaciones, quads y motos acuáticas. KSG incluye la empresa entre los proveedores de amarres y almacenamiento invernal."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/ag-service-ab-oy/",sourceUrl:"https://ksg.fi/sv/foretag/ag-service-ab-oy/",
    imageCredit:"AG Service / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/ag-service-ab-oy/",tags:["veneen säilytys","moottorihuolto","vesijetit"]
  },
  {
    id:"lillbacka-brygga",kind:"place",categories:["saaristo","hyvinvointi","ruoka"],
    name:{fi:"Lillbackan vieraslaituri",en:"Lillbacka Guest Pier",es:"Embarcadero de visitantes de Lillbacka"},
    description:{
      fi:"Vieraslaituri, jossa on paikkoja noin 50 veneelle poijuissa ja ankkurissa. KSG:n mukaan alueella on hiekkaranta, kaunis ympäristö, puulämmitteinen sauna ja rantamökki, jossa on baari. Tarkista paikkatilanne ja palvelujen aukiolo suoraan ylläpitäjältä.",
      en:"A guest pier with space for about 50 boats at buoys and anchorages. KSG lists a sandy beach, scenic surroundings, a wood-fired sauna and a beach hut with a bar. Confirm berth availability and service hours directly with the operator.",
      es:"Embarcadero para visitantes con espacio para unos 50 barcos en boyas y fondeos. KSG menciona playa de arena, entorno natural, sauna de leña y una cabaña junto a la playa con bar. Consulta amarres y horarios directamente con el responsable."
    },
    location:{fi:"Lillbacka, Kemiönsaaren saaristo",en:"Lillbacka, Kimitoön archipelago",es:"Lillbacka, archipiélago de Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/lillbacka-brygga/",sourceUrl:"https://ksg.fi/sv/foretag/lillbacka-brygga/",
    imageCredit:"Lillbacka brygga / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/lillbacka-brygga/",tags:["vieraslaituri","sauna","ranta","baari"]
  },

  {
    id:"rosala-taxi",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Rosala Taxi",en:"Rosala Taxi",es:"Rosala Taxi"},
    description:{
      fi:"Rosalan alueen taksi- ja henkilökuljetuspalvelu Kemiönsaaren palveluoppaan mukaan. Varmista noutopaikka, aikataulu ja kuljetuksen saatavuus suoraan kuljettajalta.",
      en:"Taxi and passenger transport in the Rosala area, listed in the Kimitoön business guide. Confirm pick-up point, schedule and availability directly with the driver.",
      es:"Servicio de taxi y transporte de pasajeros en la zona de Rosala, incluido en la guía empresarial de Kimitoön. Confirma punto de recogida, horario y disponibilidad directamente con el conductor."
    },
    location:{fi:"Rosala, Kemiönsaari",en:"Rosala, Kimitoön",es:"Rosala, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/rosala-taxi/",sourceUrl:"https://ksg.fi/sv/foretag/rosala-taxi/",
    imageCredit:"Rosala Taxi / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/rosala-taxi/",tags:["taksi","henkilökuljetus"]
  },
  {
    id:"taxi-hellsberg",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taxi Hellsberg Ab Oy",en:"Taxi Hellsberg Ab Oy",es:"Taxi Hellsberg Ab Oy"},
    description:{
      fi:"Taksi- ja henkilökuljetuspalvelu Kemiönsaarella. KSG:n mukaan käytössä on 1+4-paikkainen taksi. Varmista kuljetuksen saatavuus ja mahdollinen esteettömyys suoraan kuljettajalta.",
      en:"Taxi and passenger transport on Kimitoön. KSG lists a 1+4-seat taxi. Confirm availability and any accessibility requirements directly with the driver.",
      es:"Servicio de taxi y transporte de pasajeros en Kimitoön. KSG indica un taxi de 1+4 plazas. Consulta disponibilidad y necesidades de accesibilidad directamente con el conductor."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/taxi-hellsberg-ab-oy/",sourceUrl:"https://ksg.fi/sv/foretag/taxi-hellsberg-ab-oy/",
    imageCredit:"Taxi Hellsberg / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/taxi-hellsberg-ab-oy/",tags:["taksi","henkilökuljetus"]
  },
  {
    id:"taxi-jan-wallenius",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taxi Jan Wallenius",en:"Taxi Jan Wallenius",es:"Taxi Jan Wallenius"},
    description:{
      fi:"Paikallinen taksi- ja henkilökuljetuspalvelu Kemiönsaaren palveluoppaan mukaan. Varaa matka ja varmista auton sopivuus omiin tarpeisiin suoraan kuljettajalta.",
      en:"A local taxi and passenger transport service listed in the Kimitoön business guide. Book your journey and confirm vehicle suitability directly with the driver.",
      es:"Servicio local de taxi y transporte de pasajeros incluido en la guía empresarial de Kimitoön. Reserva el trayecto y confirma el vehículo directamente con el conductor."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/taxi-jan-wallenius/",sourceUrl:"https://ksg.fi/sv/foretag/taxi-jan-wallenius/",
    imageCredit:"Taxi Jan Wallenius / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/taxi-jan-wallenius/",tags:["taksi","henkilökuljetus"]
  },
  {
    id:"taxi-kim-gustafsson",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taxi Kim Gustafsson",en:"Taxi Kim Gustafsson",es:"Taxi Kim Gustafsson"},
    description:{
      fi:"Paikallinen taksi- ja henkilökuljetuspalvelu Kemiönsaarella. Tarkista matkan saatavuus, noutopaikka ja aikataulu suoraan kuljettajalta.",
      en:"A local taxi and passenger transport service on Kimitoön. Confirm journey availability, pick-up point and schedule directly with the driver.",
      es:"Servicio local de taxi y transporte de pasajeros en Kimitoön. Consulta disponibilidad, punto de recogida y horario directamente con el conductor."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/taxi-kim-gustafsson/",sourceUrl:"https://ksg.fi/sv/foretag/taxi-kim-gustafsson/",
    imageCredit:"Taxi Kim Gustafsson / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/taxi-kim-gustafsson/",tags:["taksi","henkilökuljetus"]
  },
  {
    id:"taxi-sahlgren",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taxi Sahlgren",en:"Taxi Sahlgren",es:"Taxi Sahlgren"},
    description:{
      fi:"Paikallinen taksi- ja henkilökuljetuspalvelu Kemiönsaaren palveluoppaan mukaan. Varmista kuljetuksen saatavuus ja varaus suoraan kuljettajalta.",
      en:"A local taxi and passenger transport service listed in the Kimitoön business guide. Confirm availability and booking directly with the driver.",
      es:"Servicio local de taxi y transporte de pasajeros incluido en la guía empresarial de Kimitoön. Consulta disponibilidad y reserva directamente con el conductor."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/taxi-sahlgren/",sourceUrl:"https://ksg.fi/sv/foretag/taxi-sahlgren/",
    imageCredit:"Taxi Sahlgren / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/taxi-sahlgren/",tags:["taksi","henkilökuljetus"]
  },
  {
    id:"bruksteatern",categories:["kulttuuri","tapahtumat","tapahtumapaikat"],
    name:{fi:"Bruksteatern r.f.",en:"Bruksteatern Theatre",es:"Teatro Bruksteatern"},
    description:{
      fi:"Taalintehtaalla toimiva harrastajateatteriryhmä Kemiönsaarella. Esitysten ajankohdat, ohjelmisto, liput ja mahdolliset vierailuesitykset julkaistaan teatterin omissa kanavissa.",
      en:"An amateur theatre group based in Dalsbruk on Kimitoön. Performance dates, programme, tickets and possible guest performances are published through the theatre's own channels.",
      es:"Grupo de teatro aficionado con sede en Dalsbruk, en Kimitoön. Las fechas, el programa, las entradas y posibles actuaciones se publican en los canales del teatro."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/bruksteatern-r-f/",sourceUrl:"https://ksg.fi/sv/foretag/bruksteatern-r-f/",
    imageCredit:"Bruksteatern / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/bruksteatern-r-f/",tags:["harrastajateatteri","esitykset","kulttuuri"]
  },
  {
    id:"brukshallen",kind:"place",categories:["aktiviteetit","hyvinvointi","tapahtumapaikat"],
    name:{fi:"Brukshallen – liikunta- ja kuntosali",en:"Brukshallen – sports and fitness hall",es:"Brukshallen – pabellón deportivo y gimnasio"},
    description:{
      fi:"Taalintehtaan kuntosali ja liikuntahalli Kemiönsaaren palveluoppaan urheilu- ja vapaa-aikakohteissa. Tarkista käyttövuorot, kertamaksut, kulku ja mahdolliset yleisövuorot suoraan ylläpitäjältä.",
      en:"A gym and sports hall in Dalsbruk, listed in the Kimitoön business guide's sports and leisure category. Confirm public access, opening slots, fees and facilities directly with the operator.",
      es:"Gimnasio y pabellón deportivo en Dalsbruk, incluido en la categoría de deporte y ocio de la guía empresarial de Kimitoön. Consulta acceso público, horarios, tarifas e instalaciones directamente con el responsable."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/brukshallen/",sourceUrl:"https://ksg.fi/sv/foretag/brukshallen/",
    imageCredit:"Brukshallen / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/brukshallen/",tags:["kuntosali","liikuntahalli"]
  },
  {
    id:"bjorkboda-dressage",categories:["aktiviteetit","luonto","muut-palvelut"],
    name:{fi:"Björkboda Dressage rf",en:"Björkboda Dressage Association",es:"Asociación Björkboda Dressage"},
    description:{
      fi:"Björkbodassa toimiva hevos- ja ratsastustoiminnan yhdistys. Kemiönsaaren palveluopas listaa yhdistyksen eläinpalveluihin ja urheilu- ja vapaa-ajan toimintaan. Kysy suoraan yhdistykseltä vierailuista, tunneista ja yleisötapahtumista.",
      en:"An equestrian association based in Björkboda. The Kimitoön business guide lists it under animal services and sports and leisure. Contact the association about visits, lessons and public events.",
      es:"Asociación ecuestre con sede en Björkboda. La guía empresarial de Kimitoön la incluye en servicios de animales y deporte y ocio. Consulta visitas, clases y eventos públicos directamente con la asociación."
    },
    location:{fi:"Björkboda, Kemiönsaari",en:"Björkboda, Kimitoön",es:"Björkboda, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/bjorkboda-dressage-rf/",sourceUrl:"https://ksg.fi/sv/foretag/bjorkboda-dressage-rf/",
    imageCredit:"Björkboda Dressage / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/bjorkboda-dressage-rf/",tags:["hevoset","ratsastus","yhdistys"]
  },
  {
    id:"kimitoons-ryttare",categories:["aktiviteetit","luonto","muut-palvelut"],
    name:{fi:"Kimitoöns Ryttare r.f.",en:"Kimitoöns Ryttare Riding Association",es:"Asociación ecuestre Kimitoöns Ryttare"},
    description:{
      fi:"Kemiönsaaren ratsastus- ja hevosurheiluyhdistys. Palveluopas listaa yhdistyksen urheilu- ja vapaa-aikatoimijoihin. Tarkista mahdolliset yleisötapahtumat, ratsastustoiminta ja vierailumahdollisuudet suoraan yhdistykseltä.",
      en:"An equestrian and horse-sports association on Kimitoön. The business guide lists it among sports and leisure organisations. Confirm public events, riding activities and visitor opportunities directly with the association.",
      es:"Asociación ecuestre y de deporte hípico de Kimitoön. La guía empresarial la incluye entre las organizaciones deportivas y de ocio. Consulta eventos públicos, actividades ecuestres y visitas directamente con la asociación."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/kimitoons-ryttare-r-f/",sourceUrl:"https://ksg.fi/sv/foretag/kimitoons-ryttare-r-f/",
    imageCredit:"Kimitoöns Ryttare / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/kimitoons-ryttare-r-f/",tags:["ratsastus","hevosurheilu","yhdistys"]
  },
  {
    id:"kimitoons-golfare",categories:["aktiviteetit","tapahtumat","muut-palvelut"],
    name:{fi:"Kimitoöns Golfare rf",en:"Kimitoön Golf Association",es:"Asociación de Golf de Kimitoön"},
    description:{
      fi:"Kemiönsaaren golfyhdistys, jonka kotikenttiin KSG:n mukaan kuuluvat Bjärkas Golf ja Meri-Teijo Golf. Yhdistyksen kautta voi tarkistaa paikallisen golfharrastuksen, tapahtumien ja kurssien ajankohtaiset tiedot.",
      en:"Kimitoön's golf association. KSG lists Bjärkas Golf and Meri-Teijo Golf as its home courses. Check current local golf activities, events and courses through the association.",
      es:"Asociación de golf de Kimitoön. KSG indica que sus campos de referencia son Bjärkas Golf y Meri-Teijo Golf. Consulta actividades, eventos y cursos actuales a través de la asociación."
    },
    location:{fi:"Kemiönsaari ja Teijo",en:"Kimitoön and Teijo",es:"Kimitoön y Teijo"},
    websiteUrl:"https://ksg.fi/sv/foretag/kimitoons-golfare-rf/",sourceUrl:"https://ksg.fi/sv/foretag/kimitoons-golfare-rf/",
    imageCredit:"Kimitoöns Golfare / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/kimitoons-golfare-rf/",tags:["golf","kurssit","tapahtumat"]
  },
  {
    id:"kimitoon-music-festival",categories:["tapahtumat","kulttuuri","tapahtumapaikat"],
    name:{fi:"Föreningen för Kimitoöns Musikfestspel rf",en:"Kimitoön Music Festival Association",es:"Asociación del Festival de Música de Kimitoön"},
    description:{
      fi:"Kemiönsaaren kamarimusiikkifestivaalin ja musiikki- ja tanssileirien järjestäjä. Ajankohtainen ohjelma, konserttipaikat, liput ja leirien ilmoittautuminen julkaistaan järjestäjän omissa kanavissa.",
      en:"The organiser of Kimitoön's chamber music festival and music and dance camps. Current programmes, concert venues, tickets and camp registration are published through the organiser's own channels.",
      es:"Organizador del festival de música de cámara de Kimitoön y de campamentos de música y danza. Los programas, salas, entradas e inscripciones se publican en los canales oficiales del organizador."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/foreningen-for-kimitoons-musikfestspel-rf/",sourceUrl:"https://ksg.fi/sv/foretag/foreningen-for-kimitoons-musikfestspel-rf/",
    imageCredit:"Föreningen för Kimitoöns Musikfestspel / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/foreningen-for-kimitoons-musikfestspel-rf/",tags:["kamarimusiikki","festivaali","musiikkileiri","tanssileiri"]
  },
  {
    id:"baltic-gospel-singers",categories:["tapahtumat","kulttuuri"],
    name:{fi:"Baltic Gospel Singers r.f.",en:"Baltic Gospel Singers",es:"Baltic Gospel Singers"},
    description:{
      fi:"Kemiönsaarella toimiva gospelkuoro ja kulttuuriyhdistys. Yhdistyksen esiintymiset ja konsertit ovat tapahtumakalenterin kautta seurattavaa kulttuuritarjontaa; tarkista ajankohtaiset esiintymiset yhdistyksen omista kanavista.",
      en:"A gospel choir and cultural association on Kimitoön. Performances and concerts form part of the local cultural calendar; check upcoming appearances through the association's own channels.",
      es:"Coro gospel y asociación cultural de Kimitoön. Sus actuaciones y conciertos forman parte de la oferta cultural local; consulta próximas actuaciones en los canales de la asociación."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/baltic-gospel-singers-r-f/",sourceUrl:"https://ksg.fi/sv/foretag/baltic-gospel-singers-r-f/",
    imageCredit:"Baltic Gospel Singers / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/baltic-gospel-singers-r-f/",tags:["gospel","kuoro","konsertit"]
  },
  {
    id:"salon-oppaat-kimitoon",categories:["aktiviteetit","kulttuuri","muut-palvelut"],
    name:{fi:"Salon Oppaat ry – Kemiönsaari",en:"Salo Guides – Kimitoön",es:"Guías de Salo – Kimitoön"},
    description:{
      fi:"Suomen Opasliiton auktorisoituja matkailuoppaita Kemiönsaarella ja Salossa. Kysy opastettuja kierroksia, kielivaihtoehtoja ja ryhmille sopivia ohjelmia suoraan yhdistykseltä.",
      en:"Authorised Finnish Guide Association guides in Kimitoön and Salo. Ask the association about guided tours, available languages and programmes for groups.",
      es:"Guías autorizados de la Asociación Finlandesa de Guías en Kimitoön y Salo. Consulta visitas guiadas, idiomas y programas para grupos directamente con la asociación."
    },
    location:{fi:"Kemiönsaari ja Salo",en:"Kimitoön and Salo",es:"Kimitoön y Salo"},
    websiteUrl:"https://ksg.fi/sv/foretag/salon-oppaat-ry-kemionsaari-salo-guider-kimitoon/",sourceUrl:"https://ksg.fi/sv/foretag/salon-oppaat-ry-kemionsaari-salo-guider-kimitoon/",
    imageCredit:"Salon Oppaat ry / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/salon-oppaat-ry-kemionsaari-salo-guider-kimitoon/",tags:["auktorisoidut oppaat","opastetut kierrokset","Salo","Kemiönsaari"]
  },

  {
    id:"taxi-friberg",categories:["kuljetukset","muut-palvelut"],
    name:{fi:"Taxi Friberg Oy Ab",en:"Taxi Friberg Oy Ab",es:"Taxi Friberg Oy Ab"},
    description:{
      fi:"Kemiönsaaren taksipalvelu. KSG:n mukaan käytössä on 1+8-paikkainen auto pyörätuoli- ja paarivarustuksella sekä 1+4-paikkainen taksi. Varmista ajoneuvon sopivuus ja varaus suoraan yritykseltä.",
      en:"Taxi service on Kimitoön. KSG lists a 1+8-seat vehicle with wheelchair and stretcher equipment, plus a 1+4-seat taxi. Confirm vehicle suitability and booking directly with the company.",
      es:"Servicio de taxi en Kimitoön. KSG indica un vehículo de 1+8 plazas con equipamiento para sillas de ruedas y camillas, además de un taxi de 1+4 plazas. Consulta directamente la idoneidad y la reserva."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/taxi-friberg-oy-ab/",sourceUrl:"https://ksg.fi/sv/foretag/taxi-friberg-oy-ab/",
    imageCredit:"Taxi Friberg / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/taxi-friberg-oy/",tags:["taksi","pyörätuolikuljetus","paarikuljetus"]
  },
  {
    id:"jani-launokorpi",categories:["kuljetukset","muut-palvelut","aktiviteetit"],
    name:{fi:"Jani Launokorpi – tilausajot",en:"Jani Launokorpi – charter transport",es:"Jani Launokorpi – transporte privado"},
    description:{
      fi:"Kemiönsaaren palveluopas listaa Jani Launokorven linja-auton tilausajopalveluihin. Kysy suoraan reiteistä, ryhmäkuljetuksista, kalustosta ja tarjouksesta.",
      en:"The Kimitoön business guide lists Jani Launokorpi for charter bus services. Contact the operator about routes, group transfers, vehicles and quotations.",
      es:"La guía empresarial de Kimitoön incluye a Jani Launokorpi en servicios de autobús privado. Consulta rutas, traslados de grupos, vehículos y presupuestos directamente."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/jani-launokorpi/",sourceUrl:"https://ksg.fi/sv/foretag/jani-launokorpi/",
    imageCredit:"Jani Launokorpi / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/jani-launokorpi/",tags:["linja-auto","tilausajo","ryhmäkuljetus"]
  },
  {
    id:"carwash-kimito",categories:["muut-palvelut","kuljetukset"],
    name:{fi:"Carwash Kimito",en:"Carwash Kimito",es:"Carwash Kimito"},
    description:{
      fi:"Automaattinen autopesu Kemiössä. Kemiönsaaren palveluopas ilmoittaa palvelun olevan käytettävissä ympäri vuorokauden. Tarkista pesuohjelmat ja maksutavat paikan päällä.",
      en:"An automatic car wash in Kimito. The Kimitoön business guide lists the service as available 24/7. Check wash programmes and payment methods on site.",
      es:"Lavado automático de coches en Kimito. La guía empresarial de Kimitoön indica que el servicio está disponible las 24 horas. Consulta programas y métodos de pago en el lugar."
    },
    location:{fi:"Kemiö, Kemiönsaari",en:"Kimito, Kimitoön",es:"Kimito, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/carwash-kimito-kemio/",sourceUrl:"https://ksg.fi/sv/foretag/carwash-kimito-kemio/",
    imageCredit:"Carwash Kimito / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/carwash-kimito-kemio/",tags:["autopesu","24/7"]
  },
  {
    id:"bruks-bilservice",categories:["muut-palvelut","kuljetukset"],
    name:{fi:"Bruks Bilservice Ab",en:"Bruks Bilservice Ab",es:"Bruks Bilservice Ab"},
    description:{
      fi:"Taalintehtaan ajoneuvohuolto, joka tarjoaa autojen huoltoja, korjauksia ja rengastöitä. Tarkista palvelut ja ajanvaraus suoraan korjaamolta.",
      en:"A vehicle service workshop in Dalsbruk offering car servicing, repairs and tyre work. Confirm services and appointments directly with the workshop.",
      es:"Taller de mantenimiento de vehículos en Dalsbruk que ofrece revisiones, reparaciones y trabajos de neumáticos. Consulta servicios y citas directamente con el taller."
    },
    location:{fi:"Taalintehdas, Kemiönsaari",en:"Dalsbruk, Kimitoön",es:"Dalsbruk, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/bruks-bilservice-ab/",sourceUrl:"https://ksg.fi/sv/foretag/bruks-bilservice-ab/",
    imageCredit:"Bruks Bilservice / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/bruks-bilservice-ab/",tags:["autohuolto","korjaus","rengastyöt"]
  },
  {
    id:"hoijers-mekaniska",categories:["muut-palvelut","kuljetukset"],
    name:{fi:"Höijers Mekaniska",en:"Höijers Mekaniska",es:"Höijers Mekaniska"},
    description:{
      fi:"Autokorjaamo, joka tarjoaa monipuolisia huolto-, korjaus-, rengas- ja vikadiagnostiikkapalveluja. Varaa huolto ja tarkista ajankohtainen palveluvalikoima suoraan korjaamolta.",
      en:"A car workshop offering servicing, repairs, tyre work and vehicle diagnostics. Book maintenance and confirm current services directly with the workshop.",
      es:"Taller de automóviles que ofrece mantenimiento, reparaciones, neumáticos y diagnóstico de averías. Reserva el servicio y consulta la oferta actual directamente con el taller."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/hoijers-mekaniska/",sourceUrl:"https://ksg.fi/sv/foretag/hoijers-mekaniska/",
    imageCredit:"Höijers Mekaniska / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/hoijers-mekaniska/",tags:["autokorjaamo","rengaspalvelu","vikadiagnostiikka"]
  },
  {
    id:"colorshine-matias-friman",categories:["muut-palvelut","kuljetukset"],
    name:{fi:"Colorshine / Matias Friman",en:"Colorshine / Matias Friman",es:"Colorshine / Matias Friman"},
    description:{
      fi:"Ajoneuvojen kolarikorjaus- ja tuulilasipalvelu Kemiönsaarella. Kemiönsaaren palveluopas mainitsee kolarikorjaukset ja tuulilasien vaihdot.",
      en:"Vehicle collision repair and windscreen services on Kimitoön. The Kimitoön business guide lists collision repairs and windscreen replacement.",
      es:"Servicios de reparación de colisiones y parabrisas en Kimitoön. La guía empresarial de Kimitoön menciona reparación de golpes y sustitución de parabrisas."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/colorshine-matias-friman/",sourceUrl:"https://ksg.fi/sv/foretag/colorshine-matias-friman/",
    imageCredit:"Colorshine / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/colorshine-matias-friman/",tags:["kolarikorjaus","tuulilasin vaihto"]
  },
  {
    id:"kimito-bilmaleri",categories:["muut-palvelut","kuljetukset"],
    name:{fi:"Kemiön Automaalaamo ja Alustasuojaus Ky",en:"Kimito Vehicle Paint and Underbody Protection",es:"Taller de pintura y protección de bajos de Kimito"},
    description:{
      fi:"Kolarikorjauksia ja hinauspalvelua Kemiönsaarella ja lähialueilla. Tarkista palvelun saatavuus ja hinausalue suoraan yritykseltä.",
      en:"Collision repairs and towing services on Kimitoön and nearby areas. Confirm service availability and towing coverage directly with the company.",
      es:"Reparación de colisiones y servicios de remolque en Kimitoön y zonas cercanas. Consulta disponibilidad y cobertura directamente con la empresa."
    },
    location:{fi:"Kemiö, Kemiönsaari",en:"Kimito, Kimitoön",es:"Kimito, Kimitoön"},
    websiteUrl:"https://ksg.fi/sv/foretag/kimito-bilmaleri-underredsbehandling-kb/",sourceUrl:"https://ksg.fi/sv/foretag/kimito-bilmaleri-underredsbehandling-kb/",
    imageCredit:"Kemiön Automaalaamo / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/sv/foretag/kimito-bilmaleri-underredsbehandling-kb/",tags:["kolarikorjaus","hinaus","automaalaus"]
  }

];

export function getKimitoonProviders(category?: KimitoonCategory) {
  return category ? kimitoonProviders.filter((provider) => provider.categories.includes(category)) : kimitoonProviders;
}

export function getKimitoonProvider(id: string) {
  return kimitoonProviders.find((provider) => provider.id === id) ?? null;
}
