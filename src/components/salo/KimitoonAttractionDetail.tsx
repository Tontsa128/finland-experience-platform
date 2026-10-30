"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";

export type KimitoonAttraction =
  | "taalintehdas"
  | "kasnas"
  | "soderlangvik"
  | "sagalund"
  | "oro";

type Highlight = { title: string; description: string; url: string; linkLabel: string };
type AttractionCopy = {
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  aboutTitle: string;
  about: string;
  highlightsTitle: string;
  highlights: Highlight[];
  practicalTitle: string;
  practical: string[];
  officialTitle: string;
  officialUrl: string;
  officialLabel: string;
  sourceTitle: string;
  sourceUrl: string;
};

const content: Record<Locale, Record<KimitoonAttraction, AttractionCopy>> = {
  fi: {
    taalintehdas: {
      title: "Taalintehdas – ruukkikylä meren äärellä",
      intro: "Taalintehdas yhdistää historiallisen ruukkimiljöön, sataman ja saariston palvelut. Tänne kannattaa tulla kävellen, pyörällä tai veneellä – ja varata aikaa rantamaisemille sekä vanhan teollisuuskylän tunnelmalle.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
      imageAlt: "Taalintehtaan vierasvenesatama ja merellinen ruukkikylä",
      aboutTitle: "Teollisuushistoriaa ja elävää satamaelämää",
      about: "Taalintehdas on Kemiönsaaren eteläosan historiallinen ruukkikylä. Kylän merellinen keskusta, vanha teollisuusympäristö ja vierasvenesatama muodostavat helposti lähestyttävän kokonaisuuden, jossa historia ja nykyinen saaristoelämä kohtaavat.",
      highlightsTitle: "Tutustu Taalintehtaaseen",
      highlights: [
        { title: "Ruukkikylän ympäristö", description: "Tutustu vanhan ruukkikylän rakennuksiin, rantaan ja teolliseen kulttuuriperintöön omatoimisesti tai paikallisen opastuksen avulla.", url: "https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/", linkLabel: "Visit Kemiönsaari – vierailukohteet" },
        { title: "Taalintehtaan vierasvenesatama", description: "Satamassa on veneilijöille muun muassa sähköä, vettä, jätehuoltoa, sauna-, suihku- ja pesutupapalveluja. Palvelujen saatavuus ja kausi kannattaa tarkistaa ennen saapumista.", url: "https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/", linkLabel: "Sataman palvelut ja tiedot" },
        { title: "Stall’s Bar & Food", description: "Sataman vanhassa rantamakasiinissa toimiva ravintola ja tapahtumapaikka. Tarkista ruokalista, aukiolo ja ohjelma suoraan toimijalta.", url: "https://www.visitkimitoon.fi/fi/kohteet/stalls-bar-food-2/", linkLabel: "Ravintolan tiedot" }
      ],
      practicalTitle: "Hyvä tietää ennen vierailua",
      practical: ["Sataman palvelut ja matkailuneuvonnan aukiolo ovat kausiluonteisia.", "Tarkista ravintoloiden ja tapahtumien ajantasaiset tiedot ennen matkaa.", "Taalintehdas sopii myös pysähdyspaikaksi Kemiönsaaren kiertomatkalla."],
      officialTitle: "Alueen virallinen matkailuopas",
      officialUrl: "https://www.visitkimitoon.fi/fi/",
      officialLabel: "Tutustu Visit Kemiönsaareen",
      sourceTitle: "Kuva ja sisältölähde: Visit Kemiönsaari",
      sourceUrl: "https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/"
    },
    kasnas: {
      title: "Kasnäs – portti ulkosaaristoon",
      intro: "Kasnäs on merellinen tukikohta Kemiönsaaren eteläkärjessä. Satama, majoitus, kylpylä ja yhteydet ulkosaaristoon tekevät siitä luontevan lähtöpisteen Örön ja muiden saaristokohteiden retkille.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg",
      imageAlt: "Kasnäsin vierasvenesatama ja saaristomaisema",
      aboutTitle: "Palveluja ja yhteyksiä meren äärellä",
      about: "Kasnäsissä toimii perheomisteinen Spa Hotel Kasnäs, jonka palvelukokonaisuuteen kuuluvat hotelli, kylpylä, ravintola, elintarvikekauppa, caravan-alue ja vierasvenesatama. Kasnäsistä lähtee myös yhteysaluksia ja tilauskuljetuksia ulkosaaristoon.",
      highlightsTitle: "Kasnäsin palvelut ja elämykset",
      highlights: [
        { title: "Spa Hotel Kasnäs", description: "Hotelli- ja kylpyläkokonaisuus sisä- ja ulkoaltaineen. Ravintolassa tarjoillaan saaristolaistyylinen lounas ja à la carte -annoksia; tarkista ajantasaiset palvelut ja varaukset suoraan hotellilta.", url: "https://kasnas.com/", linkLabel: "Hotellin ja kylpylän verkkosivut" },
        { title: "Vierasvenesatama", description: "Kasnäsin satama palvelee veneilijöitä ja toimii tärkeänä lähtöpaikkana saaristoon. Tarkista satamapalvelut ja saapumisohjeet ennen matkaa.", url: "https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/", linkLabel: "Veneily ja vierassatamat" },
        { title: "Yhteydet Öröhön", description: "Örön linnakesaarelle kuljetaan Kasnäsistä meritse. Matka kestää aluksesta ja yhteydestä riippuen noin 30–60 minuuttia.", url: "https://www.visitoro.fi/saapuminen/", linkLabel: "Örön saapumisohjeet" }
      ],
      practicalTitle: "Suunnittele vierailu",
      practical: ["Kasnäs on tärkeä vaihtopaikka ulkosaariston lautta- ja veneyhteyksille.", "Örön kuljetukset, aikataulut ja varauskäytännöt vaihtelevat kauden mukaan.", "Tarkista kylpylän, ravintolan ja majoituksen saatavuus suoraan palveluntarjoajalta."],
      officialTitle: "Palveluntarjoajan verkkosivu",
      officialUrl: "https://kasnas.com/",
      officialLabel: "Tutustu Spa Hotel Kasnäsiin",
      sourceTitle: "Kuva ja sisältölähde: Visit Kemiönsaari",
      sourceUrl: "https://www.visitkimitoon.fi/fi/kohteet/hotel-kasnas-2/"
    },
    soderlangvik: {
      title: "Söderlångvikin kartano – taidetta, omenatarhoja ja saaristoluontoa",
      intro: "Söderlångvik on kartanomiljöö, jossa Amos Andersonin henkilöhistoria, taide, omenatarhat ja merellinen luonto muodostavat monipuolisen vierailukohteen.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/03/sloderlangvik-museum2-760x507.jpg",
      imageAlt: "Söderlångvikin kartanon päärakennuksen historiallinen sali",
      aboutTitle: "Amos Andersonin kesäresidenssistä avoimeksi kulttuurikohteeksi",
      about: "Amos Anderson osti kartanon vuonna 1927 kesäresidenssikseen. Vuodesta 1965 päärakennus on ollut avoinna yleisölle taide- ja henkilöhistoriallisena museona. Kartanon alueella on myös omenatarhoja, luontopolkuja, ravintola- ja tilapuotipalveluja sekä tapahtumia.",
      highlightsTitle: "Kartanon elämykset",
      highlights: [
        { title: "Museo ja taidenäyttelyt", description: "Tutustu Amos Andersonin elämään ja vuosittain uudistuvaan taidenäyttelyyn. Näyttelyiden ja vierailun ajankohdat kannattaa tarkistaa kartanon omilta sivuilta.", url: "https://soderlangvik.fi/", linkLabel: "Museon ja vierailun tiedot" },
        { title: "Amos Krog", description: "Kartanon ravintolassa tarjotaan paikallisiin ja kartanon omiin raaka-aineisiin perustuvia lounaita ja leivonnaisia. Aukiolo ja sesonkitarjonta vaihtelevat.", url: "https://soderlangvik.fi/", linkLabel: "Ravintolan ajankohtaiset tiedot" },
        { title: "Omenatarhat ja luontopolut", description: "Kartanon ympäristössä voi tutustua omenatarhoihin ja useisiin luontopolkuihin. Noudata alueen opasteita ja tarkista mahdolliset reittimuutokset.", url: "https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/soderlangvik/", linkLabel: "Kohteen esittely ja reittitiedot" }
      ],
      practicalTitle: "Ennen vierailua",
      practical: ["Museon, ravintolan ja tilapuodin aukiolo vaihtelee vuodenajan mukaan.", "Omenapäivä järjestetään sadonkorjuukaudella; tapahtuman ajankohta vahvistetaan vuosittain.", "Kartanoon voi saapua myös meriteitse, mutta kulkuyhteys on suunniteltava erikseen."],
      officialTitle: "Kartanon virallinen verkkosivu",
      officialUrl: "https://soderlangvik.fi/",
      officialLabel: "Tutustu Söderlångvikiin",
      sourceTitle: "Kuva ja sisältölähde: Visit Kemiönsaari",
      sourceUrl: "https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/soderlangvik/"
    },
    sagalund: {
      title: "Sagalund – elävä museo ja puutarha Kemiössä",
      intro: "Sagalundissa paikallishistoria herää eloon ulkomuseon rakennuksissa, puutarhassa ja lapsille suunnatuissa kulttuuriympäristöissä. Se on kiinnostava pysähdys niin perheille kuin kulttuuriperinnöstä kiinnostuneille.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",
      imageAlt: "Sagalundin museoalueen historiallinen rakennus ja puutarha",
      aboutTitle: "Suomen ensimmäinen ulkoilmamuseo",
      about: "Sagalundin perusti Nils Oskar Jansson vuonna 1910. Museoalueelle on siirretty yli kaksikymmentä rakennusta eri puolilta Kemiönsaarta. Kokonaisuuteen kuuluvat kotiseutumuseo, lasten kulttuurikeskus ja puutarha. Päärakennus Sagalundgården palvelee myös museon kesäkauden ulkopuolella.",
      highlightsTitle: "Mitä Sagalundissa voi kokea?",
      highlights: [
        { title: "Historialliset rakennukset", description: "Tutustu eri aikakausien rakennuksiin ja saariston paikallishistoriaan. Museoalueen aukiolo on kausiluonteinen.", url: "https://sagalund.fi/", linkLabel: "Museon virallinen verkkosivu" },
        { title: "Puutarha ja lasten kulttuuri", description: "Museoalueen puutarhassa kasvaa historiallisia kasveja ja ruusuja. Lasten kulttuuritoiminta sisältää elämyksellistä ympäristö- ja kulttuuriperintökasvatusta.", url: "https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/museot-ja-historialliset-nahtavyydet/sagalund/", linkLabel: "Sagalundin esittely" },
        { title: "Café Adèle ja museokauppa", description: "Museokäynnin yhteydessä voi nauttia lounasta ja leivonnaisia Café Adèlessa sekä tutustua museokaupan valikoimaan. Tarkista aukiolo suoraan Sagalundilta.", url: "https://sagalund.fi/", linkLabel: "Kahvilan ja museokaupan tiedot" }
      ],
      practicalTitle: "Vierailun suunnittelu",
      practical: ["Museoalue on avoinna kesäisin; päärakennuksen palvelut jatkuvat myös muina vuodenaikoina.", "Aukioloajat, opastukset ja ryhmävierailut tulee varmistaa etukäteen.", "Kohde sijaitsee Kemiön keskustan tuntumassa."],
      officialTitle: "Museon virallinen verkkosivu",
      officialUrl: "https://sagalund.fi/",
      officialLabel: "Tutustu Sagalundiin",
      sourceTitle: "Kuva ja sisältölähde: Visit Kemiönsaari",
      sourceUrl: "https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/museot-ja-historialliset-nahtavyydet/sagalund/"
    },
    oro: {
      title: "Örön linnakesaari – historiaa ja harvinaista saaristoluontoa",
      intro: "Örö yhdistää Saaristomeren kansallispuiston luonnon ja rannikkopuolustuksen historian. Entinen sotilassaari tarjoaa retkeilyreittejä, historiallisia rakenteita, majoitusta ja satamapalveluja.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
      imageAlt: "Örön linnakesaaren maisema ylhäältä kuvattuna",
      aboutTitle: "Suljetusta sotilassaaresta vierailukohteeksi",
      about: "Örö sijaitsee Saaristomeren kansallispuistossa. Saaren historia näkyy kasarmialueissa, rannikkotykistössä ja puolustusasemissa. Samalla Örö on tärkeä luontokohde, jossa on harvinaisia lajeja ja luontotyyppejä. Saarella on vierasvenesatama, ravintoloita, saunoja ja erilaisia majoitusvaihtoehtoja.",
      highlightsTitle: "Örön tärkeimmät elämykset",
      highlights: [
        { title: "Linnoitushistoria ja opastukset", description: "Tutustu kasarmialueeseen, tykkeihin ja puolustusasemiin. Opastusten ajankohdat ja saatavuus kannattaa tarkistaa Visit ÖRÖn omista tiedoista.", url: "https://www.visitkimitoon.fi/fi/kohteet/oron-linnakesaari/", linkLabel: "Örön kohde-esittely" },
        { title: "Luontopolut ja saaristomaisemat", description: "Örön luonnossa yhdistyvät rannat, niityt ja metsät. Pysy merkityillä reiteillä ja noudata kansallispuiston suojeluohjeita.", url: "https://www.visitoro.fi/", linkLabel: "Visit ÖRÖ – vierailijalle" },
        { title: "Majoitus ja vierasvenesatama", description: "Saarella on hotellimajoitusta, muita majoitusvaihtoehtoja ja noin 80 venepaikan vierassatama. Saatavuus ja satamapalvelut tarkistetaan suoraan toimijalta.", url: "https://www.visitoro.fi/satama/", linkLabel: "Sataman tiedot" }
      ],
      practicalTitle: "Saapuminen ja käytännöt",
      practical: ["Öröhön saavutaan meritse; saarelle ei pääse autolla.", "Yhteysalukset lähtevät Kasnäsistä ja merimatka kestää noin 30–60 minuuttia.", "Aikataulut, säävaraukset, majoitus ja palvelujen kausi on tarkistettava ennen matkaa."],
      officialTitle: "Saaren virallinen verkkosivu",
      officialUrl: "https://www.visitoro.fi/",
      officialLabel: "Suunnittele vierailu Örössä",
      sourceTitle: "Kuva ja sisältölähde: Visit Kemiönsaari",
      sourceUrl: "https://www.visitkimitoon.fi/fi/kohteet/oron-linnakesaari/"
    }
  },
  en: {
    taalintehdas: {
      title: "Dalsbruk – an ironworks village by the sea",
      intro: "Dalsbruk brings together an historic ironworks setting, a guest harbour and archipelago services. Explore the waterfront and the village at an unhurried pace, on foot, by bicycle or by boat.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
      imageAlt: "Dalsbruk guest harbour and historic waterfront village",
      aboutTitle: "Industrial heritage and harbour life",
      about: "Dalsbruk is a historic ironworks village in the southern part of Kimitoön. Its maritime centre, industrial heritage and guest harbour form an accessible destination where local history meets contemporary island life.",
      highlightsTitle: "Explore Dalsbruk",
      highlights: [
        { title: "The historic village", description: "Discover the former ironworks setting, historic buildings and waterfront on your own or with a local guide.", url: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/", linkLabel: "Visit Kimitoön – attractions" },
        { title: "Dalsbruk guest harbour", description: "Harbour services include electricity, water, waste management and facilities for showers, sauna and laundry. Confirm seasonal availability before arrival.", url: "https://www.visitkimitoon.fi/en/plan/guest-harbours/", linkLabel: "Harbour information" },
        { title: "Stall’s Bar & Food", description: "A restaurant and event venue in a historic waterfront warehouse by the harbour. Check menus, opening times and events with the operator.", url: "https://www.visitkimitoon.fi/fi/kohteet/stalls-bar-food-2/", linkLabel: "Restaurant information" }
      ],
      practicalTitle: "Before your visit",
      practical: ["Harbour services and visitor information are seasonal.", "Check current restaurant opening times and event details before travelling.", "Dalsbruk makes a convenient stop on a wider tour of Kimitoön."],
      officialTitle: "Official regional tourism guide",
      officialUrl: "https://www.visitkimitoon.fi/en/",
      officialLabel: "Explore Visit Kimitoön",
      sourceTitle: "Photo and content source: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/plan/guest-harbours/"
    },
    kasnas: {
      title: "Kasnäs – gateway to the outer archipelago",
      intro: "Kasnäs is a maritime base at the southern tip of Kimitoön. Its harbour, accommodation, spa and boat connections make it a natural starting point for trips to Örö and the outer islands.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg",
      imageAlt: "Kasnäs guest harbour and archipelago scenery",
      aboutTitle: "Services and connections by the sea",
      about: "Family-owned Spa Hotel Kasnäs offers a hotel, spa, restaurant, grocery shop, caravan area and guest harbour. Kasnäs is also an important departure point for scheduled and charter boat connections to the outer archipelago.",
      highlightsTitle: "Services and experiences in Kasnäs",
      highlights: [
        { title: "Spa Hotel Kasnäs", description: "A hotel and spa with indoor and outdoor pools. The restaurant serves an archipelago-style lunch and à la carte dishes; confirm current services and reservations directly with the hotel.", url: "https://kasnas.com/", linkLabel: "Hotel and spa website" },
        { title: "Guest harbour", description: "The harbour serves visiting boaters and is an important departure point for the archipelago. Check current facilities and arrival information before travelling.", url: "https://www.visitkimitoon.fi/en/plan/guest-harbours/", linkLabel: "Guest harbour information" },
        { title: "Connections to Örö", description: "Boats to Örö Fortress Island depart from Kasnäs. The crossing takes approximately 30–60 minutes depending on the vessel and service.", url: "https://www.visitoro.fi/en/visit/arrival/", linkLabel: "How to reach Örö" }
      ],
      practicalTitle: "Plan your visit",
      practical: ["Kasnäs is a key transfer point for boat connections to the outer archipelago.", "Örö services, schedules and booking rules vary by season.", "Check spa, restaurant and accommodation availability directly with each provider."],
      officialTitle: "Provider website",
      officialUrl: "https://kasnas.com/",
      officialLabel: "Explore Spa Hotel Kasnäs",
      sourceTitle: "Photo and content source: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/destinations/hotel-kasnas/"
    },
    soderlangvik: {
      title: "Söderlångvik Manor – art, apple orchards and archipelago nature",
      intro: "Söderlångvik is a manor estate where the personal history of Amos Anderson, art, apple orchards and maritime nature come together in a varied visitor experience.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/03/sloderlangvik-museum2-760x507.jpg",
      imageAlt: "Historic interior of Söderlångvik Manor",
      aboutTitle: "From Amos Anderson’s summer residence to a cultural destination",
      about: "Amos Anderson bought the estate in 1927 as his summer residence. Since 1965, the main building has been open to the public as an art and personal-history museum. The estate also includes apple orchards, nature trails, restaurant and farm-shop services, and events.",
      highlightsTitle: "Experiences at the manor",
      highlights: [
        { title: "Museum and art exhibitions", description: "Discover Amos Anderson’s life and the art exhibition renewed each year. Check visiting dates and exhibition details on the manor’s own website.", url: "https://soderlangvik.fi/", linkLabel: "Museum and visitor information" },
        { title: "Amos Krog", description: "The manor restaurant serves lunches and pastries using local and estate-grown ingredients. Opening times and seasonal services vary.", url: "https://soderlangvik.fi/", linkLabel: "Current restaurant information" },
        { title: "Apple orchards and nature trails", description: "Explore the orchards and several nature trails around the estate. Follow local signs and check for any route updates.", url: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/soderlangvik/", linkLabel: "Destination and trail information" }
      ],
      practicalTitle: "Before your visit",
      practical: ["Museum, restaurant and farm-shop opening times vary by season.", "The Apple Day takes place during the harvest season; dates are confirmed annually.", "The estate can also be reached by sea, but boat connections need separate planning."],
      officialTitle: "Official manor website",
      officialUrl: "https://soderlangvik.fi/",
      officialLabel: "Explore Söderlångvik",
      sourceTitle: "Photo and content source: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/soderlangvik/"
    },
    sagalund: {
      title: "Sagalund – living history museum and garden in Kimito",
      intro: "At Sagalund, local history comes alive in historic buildings, gardens and cultural activities for children. It is a rewarding stop for families and visitors interested in heritage.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",
      imageAlt: "Historic building and garden at Sagalund Museum",
      aboutTitle: "Finland’s first open-air museum",
      about: "Sagalund was founded by Nils Oskar Jansson in 1910. More than twenty historic buildings have been relocated to the museum grounds from different parts of Kimitoön. The site combines a local-history museum, a children’s culture centre and a garden. The main building, Sagalundgården, also serves beyond the summer museum season.",
      highlightsTitle: "What to experience at Sagalund",
      highlights: [
        { title: "Historic buildings", description: "Explore buildings from different periods and learn about local island history. The open-air museum has seasonal opening times.", url: "https://sagalund.fi/", linkLabel: "Official museum website" },
        { title: "Garden and children’s culture", description: "The garden preserves historic plants and roses. Children’s programmes bring cultural heritage and the environment to life.", url: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/museums-and-historical-sites/sagalund/", linkLabel: "Sagalund visitor guide" },
        { title: "Café Adèle and museum shop", description: "Visitors can enjoy lunch and pastries at Café Adèle and browse the museum shop. Confirm opening times directly with Sagalund.", url: "https://sagalund.fi/", linkLabel: "Café and shop information" }
      ],
      practicalTitle: "Plan your visit",
      practical: ["The museum grounds open in summer; services in the main building continue beyond the summer season.", "Confirm opening times, guided tours and group visits in advance.", "The museum is located close to the centre of Kimito."],
      officialTitle: "Official museum website",
      officialUrl: "https://sagalund.fi/",
      officialLabel: "Explore Sagalund",
      sourceTitle: "Photo and content source: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/museums-and-historical-sites/sagalund/"
    },
    oro: {
      title: "Örö Fortress Island – military history and rare archipelago nature",
      intro: "Örö combines the nature of the Archipelago Sea National Park with the history of coastal defence. This former military island offers walking trails, historic fortifications, accommodation and harbour services.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
      imageAlt: "Aerial view of Örö Fortress Island",
      aboutTitle: "From a closed military island to a visitor destination",
      about: "Örö is located in the Archipelago Sea National Park. Its history can be seen in the barracks, coastal artillery and fortifications. The island is also an important nature destination with rare species and habitats. Visitor services include a guest harbour, restaurants, saunas and several types of accommodation.",
      highlightsTitle: "Highlights of Örö",
      highlights: [
        { title: "Fortress history and guided tours", description: "Explore the barracks, artillery and defensive positions. Check guided-tour dates and availability with Visit ÖRÖ.", url: "https://www.visitkimitoon.fi/en/destinations/oro-fortress-island/", linkLabel: "Örö destination guide" },
        { title: "Nature trails and seascapes", description: "Örö’s landscapes include shorelines, meadows and forests. Stay on marked trails and follow national-park conservation guidance.", url: "https://www.visitoro.fi/en/", linkLabel: "Visit ÖRÖ – visitor information" },
        { title: "Accommodation and guest harbour", description: "The island offers hotel rooms, other accommodation and a guest harbour with around 80 berths. Check availability and harbour services directly with the operator.", url: "https://www.visitoro.fi/satama/", linkLabel: "Harbour information" }
      ],
      practicalTitle: "Getting there",
      practical: ["Örö is reached by sea; private cars cannot travel to the island.", "Passenger and charter connections depart from Kasnäs; the crossing takes approximately 30–60 minutes.", "Check schedules, weather policies, accommodation and seasonal services before travelling."],
      officialTitle: "Official island website",
      officialUrl: "https://www.visitoro.fi/en/",
      officialLabel: "Plan a visit to Örö",
      sourceTitle: "Photo and content source: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/destinations/oro-fortress-island/"
    }
  },
  es: {
    taalintehdas: {
      title: "Dalsbruk: un pueblo siderúrgico junto al mar",
      intro: "Dalsbruk reúne un antiguo entorno industrial, un puerto deportivo y servicios del archipiélago. Recorre el paseo marítimo y descubre el ambiente del pueblo sin prisas, a pie, en bicicleta o en barco.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
      imageAlt: "Puerto deportivo de Dalsbruk y pueblo histórico junto al mar",
      aboutTitle: "Patrimonio industrial y vida portuaria",
      about: "Dalsbruk es un pueblo histórico de antiguas ferrerías en el sur de Kimitoön. Su centro marítimo, el patrimonio industrial y el puerto deportivo forman un destino accesible donde la historia local se encuentra con la vida actual del archipiélago.",
      highlightsTitle: "Descubre Dalsbruk",
      highlights: [
        { title: "El pueblo histórico", description: "Descubre el antiguo entorno industrial, sus edificios históricos y el paseo marítimo por tu cuenta o con un guía local.", url: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/", linkLabel: "Visit Kimitoön: lugares de interés" },
        { title: "Puerto deportivo de Dalsbruk", description: "El puerto ofrece electricidad, agua, gestión de residuos y servicios de ducha, sauna y lavandería. Confirma la disponibilidad estacional antes de llegar.", url: "https://www.visitkimitoon.fi/en/plan/guest-harbours/", linkLabel: "Información del puerto" },
        { title: "Stall’s Bar & Food", description: "Restaurante y espacio para eventos en un antiguo almacén junto al puerto. Consulta directamente los menús, horarios y eventos.", url: "https://www.visitkimitoon.fi/fi/kohteet/stalls-bar-food-2/", linkLabel: "Información del restaurante" }
      ],
      practicalTitle: "Antes de la visita",
      practical: ["Los servicios del puerto y la información turística son estacionales.", "Comprueba los horarios actuales de restaurantes y eventos antes de viajar.", "Dalsbruk es una parada cómoda en una ruta por Kimitoön."],
      officialTitle: "Guía turística oficial de la región",
      officialUrl: "https://www.visitkimitoon.fi/en/",
      officialLabel: "Descubre Visit Kimitoön",
      sourceTitle: "Foto y fuente de contenido: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/plan/guest-harbours/"
    },
    kasnas: {
      title: "Kasnäs: puerta al archipiélago exterior",
      intro: "Kasnäs es una base marítima en el extremo sur de Kimitoön. Su puerto, alojamiento, spa y conexiones en barco lo convierten en un punto de partida natural para visitar Örö y las islas exteriores.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg",
      imageAlt: "Puerto deportivo de Kasnäs y paisaje del archipiélago",
      aboutTitle: "Servicios y conexiones junto al mar",
      about: "Spa Hotel Kasnäs, de gestión familiar, ofrece hotel, spa, restaurante, tienda de alimentación, zona para caravanas y puerto deportivo. Kasnäs también es un punto importante de salida para conexiones regulares y barcos chárter hacia las islas exteriores.",
      highlightsTitle: "Servicios y experiencias en Kasnäs",
      highlights: [
        { title: "Spa Hotel Kasnäs", description: "Hotel y spa con piscinas interiores y exteriores. El restaurante sirve almuerzos de estilo isleño y platos a la carta; confirma los servicios y reservas directamente con el hotel.", url: "https://kasnas.com/", linkLabel: "Web del hotel y spa" },
        { title: "Puerto deportivo", description: "El puerto recibe a navegantes y es un punto importante de salida hacia el archipiélago. Consulta los servicios y las indicaciones de llegada antes del viaje.", url: "https://www.visitkimitoon.fi/en/plan/guest-harbours/", linkLabel: "Información del puerto" },
        { title: "Conexiones con Örö", description: "Los barcos hacia la isla fortificada de Örö salen de Kasnäs. La travesía dura aproximadamente entre 30 y 60 minutos según el barco y el servicio.", url: "https://www.visitoro.fi/en/visit/arrival/", linkLabel: "Cómo llegar a Örö" }
      ],
      practicalTitle: "Planifica la visita",
      practical: ["Kasnäs es un punto de transbordo importante para viajar a las islas exteriores.", "Los servicios, horarios y condiciones de reserva para Örö varían según la temporada.", "Comprueba directamente la disponibilidad del spa, restaurante y alojamiento."],
      officialTitle: "Web del proveedor",
      officialUrl: "https://kasnas.com/",
      officialLabel: "Descubre Spa Hotel Kasnäs",
      sourceTitle: "Foto y fuente de contenido: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/destinations/hotel-kasnas/"
    },
    soderlangvik: {
      title: "Mansión Söderlångvik: arte, manzanos y naturaleza isleña",
      intro: "Söderlångvik es una finca histórica donde la vida de Amos Anderson, el arte, los huertos de manzanos y la naturaleza marítima crean una visita variada.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/03/sloderlangvik-museum2-760x507.jpg",
      imageAlt: "Interior histórico de la mansión Söderlångvik",
      aboutTitle: "De residencia de verano de Amos Anderson a destino cultural",
      about: "Amos Anderson compró la finca en 1927 como residencia de verano. Desde 1965, el edificio principal está abierto al público como museo de arte e historia personal. La finca también cuenta con huertos de manzanos, senderos naturales, restaurante, tienda de productos locales y eventos.",
      highlightsTitle: "Experiencias en la mansión",
      highlights: [
        { title: "Museo y exposiciones de arte", description: "Descubre la vida de Amos Anderson y la exposición de arte que se renueva cada año. Consulta las fechas de visita en la web oficial.", url: "https://soderlangvik.fi/", linkLabel: "Información del museo y visitas" },
        { title: "Amos Krog", description: "El restaurante sirve almuerzos y repostería con ingredientes locales y de la propia finca. Los horarios y servicios cambian según la temporada.", url: "https://soderlangvik.fi/", linkLabel: "Información actual del restaurante" },
        { title: "Huertos y senderos", description: "Explora los huertos y varios senderos naturales de la finca. Sigue la señalización local y comprueba posibles cambios en las rutas.", url: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/soderlangvik/", linkLabel: "Información del destino y senderos" }
      ],
      practicalTitle: "Antes de la visita",
      practical: ["Los horarios del museo, restaurante y tienda varían según la temporada.", "El Día de la Manzana se celebra durante la cosecha; las fechas se confirman cada año.", "También se puede llegar por mar, pero las conexiones deben planificarse por separado."],
      officialTitle: "Web oficial de la mansión",
      officialUrl: "https://soderlangvik.fi/",
      officialLabel: "Descubre Söderlångvik",
      sourceTitle: "Foto y fuente de contenido: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/soderlangvik/"
    },
    sagalund: {
      title: "Sagalund: museo vivo y jardín en Kimito",
      intro: "En Sagalund, la historia local cobra vida en edificios históricos, jardines y actividades culturales para niños. Es una visita interesante para familias y amantes del patrimonio.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",
      imageAlt: "Edificio histórico y jardín del Museo Sagalund",
      aboutTitle: "El primer museo al aire libre de Finlandia",
      about: "Sagalund fue fundado por Nils Oskar Jansson en 1910. Más de veinte edificios históricos de distintas partes de Kimitoön se han trasladado al recinto. El conjunto incluye un museo de historia local, un centro cultural infantil y un jardín. El edificio principal, Sagalundgården, también ofrece servicios fuera de la temporada estival.",
      highlightsTitle: "Qué descubrir en Sagalund",
      highlights: [
        { title: "Edificios históricos", description: "Explora edificios de distintas épocas y descubre la historia local de las islas. El museo al aire libre abre por temporadas.", url: "https://sagalund.fi/", linkLabel: "Web oficial del museo" },
        { title: "Jardín y cultura infantil", description: "El jardín conserva plantas históricas y rosales. Los programas infantiles acercan el patrimonio cultural y el medio ambiente.", url: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/museums-and-historical-sites/sagalund/", linkLabel: "Guía de Sagalund" },
        { title: "Café Adèle y tienda", description: "Durante la visita se puede disfrutar de almuerzos y repostería en Café Adèle y visitar la tienda del museo. Confirma los horarios directamente con Sagalund.", url: "https://sagalund.fi/", linkLabel: "Información de cafetería y tienda" }
      ],
      practicalTitle: "Planifica la visita",
      practical: ["El recinto del museo abre en verano; los servicios del edificio principal continúan fuera de la temporada estival.", "Confirma previamente los horarios, visitas guiadas y visitas de grupos.", "El museo está cerca del centro de Kimito."],
      officialTitle: "Web oficial del museo",
      officialUrl: "https://sagalund.fi/",
      officialLabel: "Descubre Sagalund",
      sourceTitle: "Foto y fuente de contenido: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/see-and-experience/attractions/museums-and-historical-sites/sagalund/"
    },
    oro: {
      title: "Isla fortificada de Örö: historia militar y naturaleza excepcional",
      intro: "Örö combina la naturaleza del Parque Nacional del Mar del Archipiélago con la historia de la defensa costera. Esta antigua isla militar ofrece rutas a pie, fortificaciones históricas, alojamiento y servicios portuarios.",
      image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
      imageAlt: "Vista aérea de la isla fortificada de Örö",
      aboutTitle: "De isla militar cerrada a destino para visitantes",
      about: "Örö se encuentra en el Parque Nacional del Mar del Archipiélago. Su historia se aprecia en los cuarteles, la artillería costera y las fortificaciones. También es un importante espacio natural con especies y hábitats poco comunes. La isla dispone de puerto deportivo, restaurantes, saunas y varias opciones de alojamiento.",
      highlightsTitle: "Lo mejor de Örö",
      highlights: [
        { title: "Historia de la fortaleza y visitas guiadas", description: "Descubre los cuarteles, la artillería y las posiciones defensivas. Consulta las fechas y disponibilidad de las visitas con Visit ÖRÖ.", url: "https://www.visitkimitoon.fi/en/destinations/oro-fortress-island/", linkLabel: "Guía de Örö" },
        { title: "Senderos y paisajes", description: "Los paisajes de Örö incluyen costas, prados y bosques. Permanece en los senderos señalizados y respeta las normas del parque nacional.", url: "https://www.visitoro.fi/en/", linkLabel: "Visit ÖRÖ: información para visitantes" },
        { title: "Alojamiento y puerto deportivo", description: "La isla ofrece hotel, otros alojamientos y un puerto deportivo con unas 80 plazas. Consulta la disponibilidad y los servicios directamente con el operador.", url: "https://www.visitoro.fi/satama/", linkLabel: "Información del puerto" }
      ],
      practicalTitle: "Cómo llegar",
      practical: ["Se llega a Örö por mar; no se puede acceder a la isla en coche.", "Los barcos salen de Kasnäs y la travesía dura aproximadamente entre 30 y 60 minutos.", "Comprueba horarios, condiciones meteorológicas, alojamiento y servicios de temporada antes de viajar."],
      officialTitle: "Web oficial de la isla",
      officialUrl: "https://www.visitoro.fi/en/",
      officialLabel: "Planifica la visita a Örö",
      sourceTitle: "Foto y fuente de contenido: Visit Kimitoön",
      sourceUrl: "https://www.visitkimitoon.fi/en/destinations/oro-fortress-island/"
    }
  }
};

export function KimitoonAttractionDetail({ locale, place }: { locale: Locale; place: KimitoonAttraction }) {
  const t = content[locale][place];
  const labels = {
    fi: { region: "Kemiö ja Kemiönsaari · Saaristo", back: "Takaisin Kemiönsaaren oppaaseen", direct: "Siirry palveluntarjoajalle", read: "Lue lisää", source: "Lähde ja kuvatiedot" },
    en: { region: "Kimito and Kimitoön · Archipelago", back: "Back to the Kimitoön guide", direct: "Visit the provider", read: "Read more", source: "Source and image credits" },
    es: { region: "Kimito y Kimitoön · Archipiélago", back: "Volver a la guía de Kimitoön", direct: "Visitar al proveedor", read: "Más información", source: "Fuente y créditos de imagen" }
  }[locale];

  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[58vh] overflow-hidden bg-brand-950 text-white sm:min-h-[68vh]">
        <Image src={t.image} alt={t.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[58vh] items-end py-16 sm:min-h-[68vh] sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{labels.region}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{t.intro}</p>
            <a href={t.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-semibold text-brand-950 transition hover:bg-gold-100">{labels.direct} ↗</a>
          </div>
        </div>
      </section>

      <section className="container-narrow grid gap-10 py-14 md:grid-cols-[1.1fr_.9fr] md:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{labels.region}</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.aboutTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{t.about}</p>
          <h2 className="mt-10 font-display text-2xl font-bold">{t.highlightsTitle}</h2>
          <div className="mt-5 grid gap-4">
            {t.highlights.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-brand-700 underline underline-offset-4">{item.linkLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-3xl bg-slate-50 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold">{t.practicalTitle}</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-slate-700">
            {t.practical.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a href={t.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-brand-950 px-5 py-3 text-center font-semibold text-white hover:bg-brand-800">{t.officialLabel} ↗</a>
        </aside>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-8">
        <div className="container-narrow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-700">{labels.source}</p>
            <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-slate-600 underline underline-offset-4">{t.sourceTitle} ↗</a>
          </div>
          <Link href={`/${locale}/destinations/kemionsaari`} className="font-semibold text-brand-800 underline underline-offset-4">{labels.back} →</Link>
        </div>
      </section>
    </main>
  );
}
