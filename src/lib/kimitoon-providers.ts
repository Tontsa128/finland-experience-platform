import type { Locale } from "@/types";

export type KimitoonCategory =
  | "majoitus" | "ruoka" | "aktiviteetit" | "saaristo" | "luonto"
  | "kulttuuri" | "hyvinvointi" | "kuljetukset" | "ostokset"
  | "talviaktiviteetit" | "tapahtumapaikat" | "muut-palvelut" | "tapahtumat";

export type KimitoonProvider = {
  id: string;
  categories: KimitoonCategory[];
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  location: Record<Locale, string>;
  websiteUrl: string;
  sourceUrl: string;
  image?: string;
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
    id:"spa-hotel-kasnas",categories:["majoitus"],
    name:{fi:"Spa Hotel Kasnäs",en:"Spa Hotel Kasnäs",es:"Spa Hotel Kasnäs"},
    description:{
      fi:"Kasnäsin merellinen hotelli- ja lomakeskus. Virallinen matkailusivusto nostaa esiin hotellin, kylpylän, ravintolan, vierasvenesataman ja caravan-alueen.",
      en:"A seaside hotel and resort in Kasnäs. The official tourism site highlights the hotel, spa, restaurant, guest harbour and caravan area.",
      es:"Hotel y complejo vacacional junto al mar en Kasnäs. La web turística oficial destaca el hotel, el spa, el restaurante, el puerto deportivo y la zona de caravanas."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://www.kasnas.com/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/hotel-kasnas-2/",
    image:image("87370420-2504-11ed-9a1b-ed91d10f897f.jpeg-760x430.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/hotel-kasnas-2/",tags:["hotelli","kylpylä","ravintola","satama"]
  },
  {
    id:"soderlangvik-glamping",categories:["majoitus"],
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
    id:"bengtskar-lighthouse-stay",categories:["majoitus"],
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
    id:"merikruunu-hotel",categories:["majoitus"],
    name:{fi:"Hotelli & Ravintola Merikruunu",en:"Hotel & Restaurant Merikruunu",es:"Hotel y Restaurante Merikruunu"},
    description:{
      fi:"Historiallinen saaristohotelli Dragsfjärdissä. Virallinen kohdesivu esittelee hotellin ja ravintolan; tarkista huoneet, palvelut, hinnat ja aukiolo suoraan hotellilta.",
      en:"A historic archipelago hotel in Dragsfjärd. The official listing presents the hotel and restaurant; confirm rooms, services, prices and opening times directly with the hotel.",
      es:"Hotel histórico del archipiélago en Dragsfjärd. La ficha oficial presenta el hotel y el restaurante; confirma habitaciones, servicios, precios y horarios directamente con el hotel."
    },
    location:{fi:"Pensionatvägen 8, Dragsfjärd",en:"Pensionatvägen 8, Dragsfjärd",es:"Pensionatvägen 8, Dragsfjärd"},
    websiteUrl:"https://www.merikruunu.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/hotel-merikruunu-2/",
    image:image("ccb22f50-877f-11ee-9fca-6fdb01d69922.png-374x211.jpeg"),imageCredit:"Visit Kemiönsaari / Merikruunu",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/hotel-merikruunu-2/",tags:["hotelli","ravintola","pub","saaristo"]
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
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/majoitu/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("1cf56a30-bf5e-11ed-8fb6-cd05a147400e.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["bed-and-breakfast","majoitus"]
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
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/majoitu/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("50f5e9e0-ac50-11f0-a598-07e1de96cda5.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["bed-and-breakfast","taalintehdas"]
  },
  {
    id:"ekniemi-holiday-village",categories:["majoitus"],
    name:{fi:"Ekniemen lomakylä",en:"Ekniemi Holiday Village",es:"Complejo vacacional Ekniemi"},
    description:{
      fi:"Meren äärellä sijaitseva lomakylä, jonka virallinen esittely nostaa esiin luonnonrauhan, majoituksen ja elämykset. Tarkista mökkivalikoima ja saatavuus suoraan toimijalta.",
      en:"A seaside holiday village whose official listing highlights nature, accommodation and experiences. Check cottage options and availability directly with the operator.",
      es:"Complejo vacacional junto al mar cuya ficha oficial destaca la naturaleza, el alojamiento y las experiencias. Consulta las cabañas y la disponibilidad directamente con el operador."
    },
    location:{fi:"Ekniemi, Kemiönsaari",en:"Ekniemi, Kimitoön",es:"Ekniemi, Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/majoitu/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("32f73db0-4a92-11f0-9fff-ed17829cd958.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["lomakylä","merenranta","majoitus"]
  },
  // Food, cafés and local producers.
  {
    id:"holmbergs-four-c",categories:["ruoka"],
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
    image:image("696862b1-31ac-11f0-981a-3b9c14904d67.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["ravintola","baari"]
  },
  {
    id:"farmors-cafe",categories:["ruoka"],
    name:{fi:"Farmors Café",en:"Farmors Café",es:"Farmors Café"},
    description:{
      fi:"Kemiönsaaren matkailuhakemistossa esitelty kahvila. Tarkista kauden leivonnaiset, palvelut ja aukiolo suoraan kahvilalta ennen vierailua.",
      en:"A café featured in the Kimitoön tourism directory. Check seasonal pastries, services and opening times directly with the café before visiting.",
      es:"Cafetería incluida en el directorio turístico de Kimitoön. Consulta los dulces de temporada, los servicios y los horarios directamente con la cafetería antes de visitarla."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:image("1dedf000-55cf-11f1-a99c-e5a59b9f35a4.jpeg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["kahvila","leivonnaiset"]
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
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2026/04/Visitkimito_NLux_cJaskaPoikonen-1472-1162x657.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/",tags:["baari","ravintola"]
  },
  {
    id:"merikruunu-restaurant",categories:["ruoka"],
    name:{fi:"Merikruunun ravintola ja Pub Svarte Krona",en:"Merikruunu Restaurant & Pub Svarte Krona",es:"Restaurante Merikruunu y Pub Svarte Krona"},
    description:{
      fi:"Hotelli Merikruunun yhteydessä toimiva ravintola- ja pubipalvelu. Menu, palveluajat ja kausittainen tarjonta on tarkistettava suoraan hotellilta.",
      en:"Restaurant and pub services at Hotel Merikruunu. Check the menu, service hours and seasonal offering directly with the hotel.",
      es:"Restaurante y pub del Hotel Merikruunu. Consulta el menú, los horarios de servicio y la oferta de temporada directamente con el hotel."
    },
    location:{fi:"Pensionatvägen 8, Dragsfjärd",en:"Pensionatvägen 8, Dragsfjärd",es:"Pensionatvägen 8, Dragsfjärd"},
    websiteUrl:"https://www.merikruunu.fi/ravintola",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/hotel-merikruunu-2/",
    image:"https://static.wixstatic.com/media/53869d_6f42583e26fc4ffb920ac44e2fc25ec2~mv2.jpg/v1/fill/w_382%2Ch_509%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/53869d_6f42583e26fc4ffb920ac44e2fc25ec2~mv2.jpg",imageCredit:"Hotel Merikruunu",imageSource:"https://www.merikruunu.fi/ravintola",tags:["ravintola","pub","hotelli"]
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
    websiteUrl:"https://www.visitkimitoon.fi/fi/kohteet/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
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
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/8ead5540-d2f8-11ed-8ed8-859d0a6307f5.jpeg-374x211.jpeg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["ravintola","saari","retkikohde"]
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
    id:"kubu-kulturhus",categories:["kulttuuri"],
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
    id:"soderlangvik-museum",categories:["kulttuuri"],
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
    id:"glassgaraget",categories:["ostokset"],
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
    id:"kasnas-spa-wellbeing",categories:["hyvinvointi"],
    name:{fi:"Kasnäsin kylpylä ja hyvinvointi",en:"Kasnäs Spa and wellbeing",es:"Spa y bienestar de Kasnäs"},
    description:{
      fi:"Kasnäsin kylpyläpalvelut osana Spa Hotel Kasnäsin lomakeskusta. Tarkista allasosaston, saunojen, hoitojen ja muiden hyvinvointipalvelujen ajantasaiset tiedot palveluntarjoajalta.",
      en:"Spa services within the Spa Hotel Kasnäs resort. Check current information about pools, saunas, treatments and other wellbeing services with the provider.",
      es:"Servicios de spa dentro del complejo Spa Hotel Kasnäs. Consulta la información actual sobre piscinas, saunas, tratamientos y otros servicios directamente con el proveedor."
    },
    location:{fi:"Kasnäs, Kemiönsaari",en:"Kasnäs, Kimitoön",es:"Kasnäs, Kimitoön"},
    websiteUrl:"https://www.kasnas.com/",sourceUrl:"https://www.kasnas.com/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/syo_ja_majoitu/majoitu/",tags:["kylpylä","sauna","hyvinvointi"]
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
    id:"soderlangvik-manor",categories:["kulttuuri"],
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
    id:"bengtskar-lighthouse-visit",categories:["kulttuuri"],
    name:{fi:"Bengtskärin majakka ja museo",en:"Bengtskär Lighthouse and Museum",es:"Faro y museo de Bengtskär"},
    description:{
      fi:"Avomeren majakka ja historiallinen vierailukohde. Merikuljetus, aukiolo, näyttelyt ja mahdollinen majoitus on varmistettava suoraan kohteen ylläpitäjältä.",
      en:"An offshore lighthouse and historic visitor attraction. Boat transport, opening times, exhibitions and any accommodation must be confirmed with the site operator.",
      es:"Faro en mar abierto y lugar histórico de visita. Confirma el transporte marítimo, los horarios, las exposiciones y el posible alojamiento con el operador."
    },
    location:{fi:"Bengtskär, Kemiönsaaren ulkosaaristo",en:"Bengtskär, outer Kimitoön archipelago",es:"Bengtskär, archipiélago exterior de Kimitoön"},
    websiteUrl:"https://bengtskar.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",
    image:image("230658b0-52a6-11ec-ae70-f70f11991cb8-Bengtskar_RobinS_4.jpg-374x211.jpeg"),imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/",tags:["majakka","historia","museo","saari"]
  },
  {
    id:"taksi-ja-tilausliikenne",categories:["kuljetukset"],
    name:{fi:"Taksit ja tilausliikenne Kemiönsaarella",en:"Taxis and charter transport on Kimitoön",es:"Taxis y transporte concertado en Kimitoön"},
    description:{
      fi:"Kemiönsaaren matkailusivusto kokoaa taksi- ja tilausliikenteen ohjeita matkailijoille. Varmista kuljetusyritys, saatavuus, reitti ja hinta suoraan liikennöitsijältä.",
      en:"The Kimitoön tourism site provides information about taxis and charter transport for visitors. Confirm the operator, availability, route and price directly with the transport company.",
      es:"La web turística de Kimitoön reúne información sobre taxis y transporte concertado. Confirma el operador, la disponibilidad, la ruta y el precio directamente con la empresa."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/suunnittele/taksi-ja-tilausliikenne/",sourceUrl:"https://www.visitkimitoon.fi/fi/suunnittele/taksi-ja-tilausliikenne/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/suunnittele/taksi-ja-tilausliikenne/",tags:["taksi","kuljetus","tilausajo"]
  },
  {
    id:"glassgaraget-shop",categories:["ostokset"],
    name:{fi:"Paikalliset puodit ja lähiruoka",en:"Local shops and food producers",es:"Tiendas locales y productores de alimentos"},
    description:{
      fi:"Kemiönsaaren virallinen kohdehakemisto kokoaa paikallisia ostos- ja lähiruokakohteita. Tutustu yrityksiin ja tarkista tuotevalikoima sekä aukiolo suoraan toimijoilta.",
      en:"The official Kimitoön destination directory lists local shops and food producers. Explore the businesses and confirm product ranges and opening times directly with them.",
      es:"El directorio oficial de destinos de Kimitoön reúne tiendas locales y productores de alimentos. Descubre los negocios y confirma sus productos y horarios directamente."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/kohteet/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2026/04/Visitkimito_NLux_cJaskaPoikonen-1472-1162x657.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["ostokset","lähiruoka","paikalliset yritykset"]
  },
  {
    id:"winter-activities-kimitoon",categories:["talviaktiviteetit"],
    name:{fi:"Kemiönsaaren talviaktiviteetit",en:"Winter activities on Kimitoön",es:"Actividades de invierno en Kimitoön"},
    description:{
      fi:"Talvikauden retket ja aktiviteetit kootaan viralliseen aktiviteettikarttaan ja järjestäjien omiin kanaviin. Tarkista olosuhteet, reittien käytettävyys ja palvelujen aukiolo ennen lähtöä.",
      en:"Winter excursions and activities are listed in the official activity map and organisers' own channels. Check conditions, route access and service opening before setting out.",
      es:"Las excursiones y actividades de invierno se publican en el mapa oficial y en los canales de los organizadores. Comprueba las condiciones, el acceso a las rutas y los horarios antes de salir."
    },
    location:{fi:"Kemiönsaari ja ulkosaaret",en:"Kimitoön and the outer islands",es:"Kimitoön y las islas exteriores"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["talvi","luonto","aktiviteetit"]
  },
  {
    id:"event-venues-kimitoon",categories:["tapahtumapaikat"],
    name:{fi:"Kemiönsaaren tapahtuma- ja juhlatilat",en:"Event and celebration venues on Kimitoön",es:"Espacios para eventos y celebraciones en Kimitoön"},
    description:{
      fi:"Kemiönsaaren kohdehakemistossa on erillinen tapahtumapaikkojen luokka. Tila, kapasiteetti, tekniikka, tarjoilu ja varaus on varmistettava aina suoraan tilan ylläpitäjältä.",
      en:"The official Kimitoön destination directory has a dedicated event-venue category. Confirm capacity, equipment, catering and booking directly with each venue.",
      es:"El directorio oficial de Kimitoön cuenta con una categoría específica de espacios para eventos. Confirma capacidad, equipamiento, catering y reserva directamente con cada espacio."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://www.visitkimitoon.fi/fi/kohteet/",sourceUrl:"https://www.visitkimitoon.fi/fi/kohteet/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://www.visitkimitoon.fi/fi/kohteet/",tags:["juhlat","kokoukset","tapahtumat"]
  },
  {
    id:"kimitoon-activity-map",categories:["muut-palvelut"],
    name:{fi:"Kemiönsaaren aktiviteettikartta",en:"Kimitoön Activity Map",es:"Mapa de actividades de Kimitoön"},
    description:{
      fi:"Kunnan ylläpitämä digitaalinen kartta kokoaa liikunta- ja retkeilykohteita sekä palveluja. Karttaa uudistetaan siten, että myös matkailuyritysten majoitukset, vuokrauspalvelut, elämykset, kaupat, ravintolat ja kahvilat tulevat paremmin löydettäviksi.",
      en:"A municipal digital map bringing together outdoor and activity locations and services. The update is intended to make accommodation, rentals, experiences, shops, restaurants and cafés easier to discover.",
      es:"Mapa digital municipal que reúne lugares de actividades al aire libre y servicios. La actualización busca facilitar el descubrimiento de alojamientos, alquileres, experiencias, tiendas, restaurantes y cafeterías."
    },
    location:{fi:"Kemiönsaari",en:"Kimitoön",es:"Kimitoön"},
    websiteUrl:"https://kartta.kemionsaari.fi/",sourceUrl:"https://www.kemionsaari.fi/2026/08/20/kemionsaaren-aktiviteettikartta-2-0-nakyvyytta-palveluntarjoajille/",
    image:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",imageCredit:"Visit Kemiönsaari",imageSource:"https://kartta.kemionsaari.fi/",tags:["kartta","matkailupalvelut","reittitieto"]
  }
  // Additional providers from the Kemiönsaari Business Guide (KSG).
  {
    id:"labbnas-lomakoti",categories:["majoitus","ruoka","hyvinvointi","tapahtumapaikat"],
    name:{fi:"Labbnäsin Lomakoti",en:"Labbnäs Holiday Home",es:"Alojamiento Labbnäs"},
    description:{
      fi:"Entiseen pappilaan rakennettu luonnonläheinen lomakoti Dragsfjärdissä. Labbnäs tarjoaa majoitusta, tilausravintolan saariston ja kotiruoan mauilla, ryhmäruokailuja, kursseja ja retriittejä. Kokoukset voi yhdistää rantasaunaan ja kesäjuhlia järjestää pihapiirissä.",
      en:"A nature-focused holiday home in a former vicarage in Dragsfjärd. Labbnäs offers accommodation, a reservation restaurant serving archipelago-inspired and home-style food, group dining, courses and retreats. Meetings can be combined with the lakeside sauna, and summer celebrations can be held on the grounds.",
      es:"Alojamiento rodeado de naturaleza en una antigua casa parroquial de Dragsfjärd. Labbnäs ofrece alojamiento, restaurante bajo reserva con cocina local y casera, comidas para grupos, cursos y retiros. Las reuniones pueden combinarse con la sauna junto al lago y las celebraciones de verano pueden organizarse en el recinto."
    },
    location:{fi:"Labbnäsvägen 66, 25870 Dragsfjärd",en:"Labbnäsvägen 66, 25870 Dragsfjärd",es:"Labbnäsvägen 66, 25870 Dragsfjärd"},
    websiteUrl:"https://www.labbnas.fi/",sourceUrl:"https://ksg.fi/fi/foretag/labbnas-semesterhem/",
    image:"https://ksg.fi/wp-content/uploads/2026/01/labbnas-header-1-1-1-1-1-1-1-1-1-1.png",imageCredit:"Labbnäs / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/labbnas-semesterhem/",tags:["majoitus","tilausravintola","rantasauna","juhlatilat"],contact:{phone:"040 83 30 495",address:"Labbnäsvägen 66, 25870 Dragsfjärd"}
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
    image:"https://ksg.fi/wp-content/uploads/2026/04/Nayttokuva-2026-04-14-130951.png",imageCredit:"Kalkholmen Marina / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/kalkholmen-marina/",tags:["vierasvenesatama","padel","sauna","tankkaus"],contact:{phone:"040 529 1258",address:"Kalkholmsvägen 43, 25830 Västanfjärd"}
  },
  {
    id:"kasnas-badhus",categories:["hyvinvointi","aktiviteetit"],
    name:{fi:"Kasnäsin Kylpylä",en:"Kasnäs Spa",es:"Spa de Kasnäs"},
    description:{
      fi:"Kasnäsin kylpyläpalvelut osana merellistä lomakeskusta. Kemiönsaaren palveluoppaan mukaan palvelu liittyy myös hierontaan, kehonhoitoon ja liikuntaan. Tarkista allasosaston, saunojen ja muiden palvelujen ajantasaiset tiedot Kasnäsistä.",
      en:"Spa services within the seaside resort of Kasnäs. The Kimitoön business guide also categorises the service under massage, body care and fitness. Confirm current pool, sauna and other service details with Kasnäs.",
      es:"Servicios de spa dentro del complejo costero de Kasnäs. La guía empresarial de Kimitoön también lo clasifica en masaje, cuidado corporal y actividad física. Confirma los servicios actuales de piscina, sauna y otros tratamientos con Kasnäs."
    },
    location:{fi:"Kasnäsvägen 1294, 25930 Kasnäs",en:"Kasnäsvägen 1294, 25930 Kasnäs",es:"Kasnäsvägen 1294, 25930 Kasnäs"},
    websiteUrl:"https://www.kasnas.com/",sourceUrl:"https://ksg.fi/fi/foretag/kasnas-badhus-1/",
    imageCredit:"Kasnäs / Kemiönsaaren palveluopas",imageSource:"https://ksg.fi/fi/foretag/kasnas-badhus-1/",tags:["kylpylä","sauna","hyvinvointi"],contact:{phone:"02 5210 100",address:"Kasnäsvägen 1294, 25930 Kasnäs"}
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
  }

];

export function getKimitoonProviders(category?: KimitoonCategory) {
  return category ? kimitoonProviders.filter((provider) => provider.categories.includes(category)) : kimitoonProviders;
}

export function getKimitoonProvider(id: string) {
  return kimitoonProviders.find((provider) => provider.id === id) ?? null;
}
