"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";

type Kind = "stay" | "food";
type Copy = {
  eyebrow:string; title:string; lead:string; storyTitle:string; story:string;
  experienceTitle:string; experiences:{title:string;text:string}[];
  facilitiesTitle:string; facilities:{title:string;text:string}[];
  practicalTitle:string; practical:{label:string;value:string}[];
  galleryTitle:string; reviewsTitle:string; reviewsIntro:string;
  reviews:{source:string;score:string;count:string;detail:string;url:string}[];
  sourceTitle:string; menuTitle?:string; menuText?:string; menuNote?:string;
  hoursTitle:string; hoursText:string; contactTitle:string; contactText:string;
  booking:string; website:string; map:string; back:string; credit:string;
};
const photos = [
  {src:"https://www.kansakouluun.fi/wp-content/uploads/2017/05/ravintola.jpg",alt:{fi:"Kansakoulun ravintolan historiallinen miljöö",en:"The historic restaurant setting at Kansakoulu",es:"El ambiente histórico del restaurante Kansakoulu"}},
  {src:"https://www.kansakouluun.fi/wp-content/uploads/2017/05/lahiruoka.jpg",alt:{fi:"Kansakoulun lähiruokatuotteita",en:"Local food products at Kansakoulu",es:"Productos locales de Kansakoulu"}},
  {src:"https://www.kansakouluun.fi/wp-content/themes/Kylakoulu/images/b6a5918181e1eb4b7fcb2e76fae3c5d4_kukko1.png",alt:{fi:"Brännbodan Kansakoulun tunnuskuva",en:"Brännboda Kansakoulu's historic schoolhouse identity",es:"Imagen de identidad de la antigua escuela Brännboda"}}
];
const copy:Record<Locale,Record<Kind,Copy>> = {
 fi:{
  stay:{
   eyebrow:"Brännboda · Västanfjärd · Kemiönsaari",title:"Kansakoulu – persoonallinen majatalo vanhassa koulussa",
   lead:"Yövy paikassa, jossa saariston historia, vanhan koulurakennuksen persoonallinen tunnelma ja kiireetön maaseudun rauha kohtaavat. Brännbodan entinen kansakoulu toimii Bed & Breakfast -tyylisenä majatalona ja ravintolakokonaisuutena.",
   storyTitle:"Vanha kansakoulu, uusi tapa kokea saaristo",
   story:"Kansakoulu sijaitsee Västanfjärdissä Kemiönsaarella. Rakennuksen historia näkyy huoneiden yksilöllisessä ilmeessä: huoneet on sisustettu eri tavoin, ja remontoinnissa on haluttu kunnioittaa vanhan koulun henkeä. Tämä ei ole ketjuhotelli vaan omaleimainen tukikohta saaristoon tutustumiseen. Päivän retkien jälkeen voit rauhoittua vanhan koulun miljöössä ja nauttia talon ravintolapalveluista niiden aukioloaikojen ja kauden mukaan.",
   experienceTitle:"Majoittumisen erityispiirteet",
   experiences:[
    {title:"Yksilölliset huoneet",text:"Huoneet ovat keskenään erikokoisia ja eri tavoin sisustettuja. Virallisen majoitussivun mukaan huoneet remontoitiin vuosina 2016–2017 vanhan koulurakennuksen historiaa kunnioittaen."},
    {title:"Vanhan koulun tunnelma",text:"Huoneita voi ajatella leikkisästi entisinä luokkahuoneina: rakennuksen menneisyys on osa vierailukokemusta eikä sitä ole peitetty persoonattomalla hotellisisustuksella."},
    {title:"Piha, laavu ja grillaus",text:"Kohteen omalla sivulla mainitaan pihapiirin laavu ja grillipaikka retkeilijöille. Grillituotteiden saatavuus kannattaa tarkistaa suoraan majatalolta."},
    {title:"Ravintola saman katon alla",text:"Majoituksen yhteydessä on ravintolakokonaisuus. Aukiolo, aterioiden tarjonta ja mahdolliset ennakkovaraukset tulee varmistaa suoraan palveluntarjoajalta."}
   ],
   facilitiesTitle:"Huomioi ennen varaamista",
   facilities:[
    {title:"Peseytyminen ja WC",text:"Kansakoulun oman majoitussivun mukaan huoneissa ei ole omaa suihkua tai WC:tä. Remontoidut yhteiset WC- ja suihkutilat sijaitsevat käytävällä."},
    {title:"Huonetyypit",text:"Huoneiden koot ja sisustus vaihtelevat. Varmista huoneen henkilömäärä, vuoteet ja wc-/suihkuratkaisu valitsemastasi huoneesta ennen varausta."},
    {title:"Saapuminen",text:"Osoite on Brännbodantie 71, 25830 Västanfjärd. Tarkista sisäänkirjautumisen ajankohta ja saapumisohjeet varausvahvistuksesta tai suoraan majoittajalta."}
   ],
   practicalTitle:"Matkailijan tiedot",
   practical:[{label:"Osoite",value:"Brännbodantie 71, 25830 Västanfjärd, Kemiönsaari"},{label:"Puhelin",value:"+358 44 977 6810"},{label:"Sähköposti",value:"info@kansakouluun.fi"},{label:"Majoitusmuoto",value:"Bed & Breakfast / majatalo"},{label:"WC ja suihku",value:"Yhteiset tilat käytävällä – tarkista huonekohtaiset tiedot"}],
   galleryTitle:"Kuvia Kansakoulusta",reviewsTitle:"Vieraiden arviot",reviewsIntro:"Arviot ovat ulkopuolisten arvostelupalvelujen omia lukuja. Pistemäärät ja arvostelumäärät voivat muuttua; tarkista aina alkuperäinen palvelu ennen varausta.",
   reviews:[
    {source:"Google",score:"4,5 / 5",count:"424 arvostelua",detail:"Google Travelin kohdeprofiilissa näkyvä kokonaisarvio. Arvio koskee Kansakoulun majoitus- ja ravintolakohdetta.",url:"https://www.google.com/maps/search/?api=1&query=Ravintola+Kansakoulu+ja+Majatalo+V%C3%A4stanfj%C3%A4rd"},
    {source:"Booking.com",score:"8,7 / 10",count:"276 majoitusarviota",detail:"Majoittujien arviot Booking.comissa. Sivulla korostuvat muun muassa henkilökunnan ystävällisyys ja aamupala.",url:"https://www.booking.com/hotel/fi/kansakoulu.html"}
   ],
   sourceTitle:"Sisältö ja kuvat: Kansakoulun oma verkkosivusto sekä erikseen nimetyt arvostelupalvelut",
   hoursTitle:"Aukiolo ja varaus",hoursText:"Majoituksen saatavuus, sisäänkirjautuminen, hinnat ja huonekohtaiset ehdot vaihtelevat. Kansakoulun vanha verkkosivusto ei tarjoa luotettavaa reaaliaikaista varaustilannetta. Tarkista vapaat huoneet ja ehdot suoraan varauspalvelusta.",
   contactTitle:"Ota yhteyttä ja varaa suoraan",contactText:"Kysy huonetyypistä, yhteisistä pesutiloista, aamiaisesta, lemmikeistä, esteettömyydestä ja saapumisesta ennen varausta.",
   booking:"Tarkista huoneet ja varaa",website:"Kansakoulun verkkosivut",map:"Avaa kartta",back:"Takaisin majoituskohteisiin",credit:"Kansakoulun alkuperäiset kuvat"
  },
  food:{
   eyebrow:"Brännboda · Västanfjärd · Kemiönsaari",title:"Kansakoulun ravintola – paikallisia makuja vanhan koulun miljöössä",
   lead:"Tule ruokailemaan persoonalliseen saaristokohteeseen, jossa vanhan kansakoulun historia, paikalliset raaka-aineet ja erilaiset tilat kohtaavat. Kansakoulun ravintolakokonaisuus on osa samaa majataloa Västanfjärdissä.",
   storyTitle:"Ruokaa ja juhlia vanhan koulun hengessä",
   story:"Kansakoulun virallisen ravintolasivun mukaan Brännbodan vanhaan koulurakennukseen on rakennettu ravintola, juhlasali, terassi ja saunatilat. Keittiö kertoo käyttävänsä kotimaisia raaka-aineita sekä Kemiönsaaren lähiruokatuottajien tuotteita. Kesäkaudesta kerrotaan päivittäisen lounaan sesonkitarjontana, mutta sivu ei julkaise ajantasaista ruokalistaa tai vahvistettuja tämänhetkisiä aukioloaikoja. Siksi päivän tarjonta ja palvelujen aukiolo on aina tarkistettava suoraan ravintolalta.",
   experienceTitle:"Ravintolakokonaisuuden palvelut",
   experiences:[
    {title:"Ravintola ja sesongin lounas",text:"Virallisella sivulla kerrotaan kesäaikaan päivittäin tarjottavasta lounaasta. Päivän annokset, mahdolliset à la carte -vaihtoehdot, hinnat ja ruokavaliot tulee varmistaa suoraan ravintolalta."},
    {title:"Rehtorin Juhlasali",text:"Juhlasali soveltuu virallisen sivun mukaan syntymäpäiviin, merkkipäiviin, yritystilaisuuksiin, rippijuhliin ja lakkiaisiin. Sivulla mainitaan noin 100 asiakaspaikkaa."},
    {title:"Pub Jälki-istunto ja Lehtorin Viinikellari",text:"Kansakoulun ravintolasivu nimeää nämä osaksi talon ravintolakonseptia. Aukiolo, tarjonta ja mahdollinen tapahtumaohjelma kannattaa varmistaa etukäteen."},
    {title:"Kaffela ja terassit",text:"Kahvila- ja terassitilat täydentävät ravintolakokonaisuutta. Aukiolo ja käytettävissä olevat palvelut voivat vaihdella vuodenajan ja tapahtumien mukaan."},
    {title:"Lähiruokapiste",text:"Kansakoulun lähiruokasivun mukaan keittiö käyttää Kemiönsaaren lähituottajien raaka-aineita, ja paikan päältä voi ostaa lähiruokatuotteita tuliaisiksi."}
   ],
   facilitiesTitle:"Juhlat, ryhmät ja käytännöt",
   facilities:[
    {title:"Juhlat ja tilaisuudet",text:"Ravintola kertoo tarjoavansa juhlia avaimet käteen -periaatteella ja voivansa välittää ohjelmaa tilaisuuksiin. Pyydä aina erillinen tarjous ja vahvista sisältö suoraan järjestäjältä."},
    {title:"Anniskeluoikeudet",text:"Virallisella ravintolasivulla ilmoitetaan tilojen A-oikeuksista. Sivun mukaan omien juomien tai ulkopuolisen pitopalvelun tuominen ei siksi ole mahdollista juhlatiloihin."},
    {title:"Ruokalista ja erityisruokavaliot",text:"Kansakoulun vanhoilla verkkosivuilla ei ole julkaistuna ajantasaista ruokalistaa tai hintoja. Kerro allergioista ja erityisruokavalioista suoraan ravintolalle ennen saapumista."}
   ],
   practicalTitle:"Ravintolan yhteystiedot",
   practical:[{label:"Osoite",value:"Brännbodantie 71, 25830 Västanfjärd, Kemiönsaari"},{label:"Puhelin",value:"+358 44 977 6810"},{label:"Sähköposti",value:"info@kansakouluun.fi"},{label:"Ruokakonsepti",value:"Ravintola, lounas sesongin mukaan, juhla- ja ryhmäpalvelut"},{label:"Lähiruoka",value:"Kemiönsaaren lähituottajien raaka-aineita ja tuotteita"}],
   galleryTitle:"Ravintolan ja lähiruoan kuvia",reviewsTitle:"Asiakkaiden ravintola-arviot",reviewsIntro:"Arvostelupalvelujen arvosanat ovat ulkopuolisten palvelujen ilmoittamia. Arvostelut eivät ole FINNEXPRIENCEn kirjoittamia tai muokkaamia.",
   reviews:[
    {source:"Google",score:"4,5 / 5",count:"424 arvostelua",detail:"Google Travelin kohdeprofiilin kokonaisarvio Kansakoulun kohteelle. Luku ei ole erillinen vain ravintolalle.",url:"https://www.google.com/maps/search/?api=1&query=Ravintola+Kansakoulu+ja+Majatalo+V%C3%A4stanfj%C3%A4rd"},
    {source:"Tripadvisor",score:"4,4 / 5",count:"33 ravintola-arviota",detail:"Tripadvisorin Ravintola Kansakoulu ja Majatalo -listaus. Tarkista alkuperäiset arviot palvelusta.",url:"https://www.tripadvisor.com/Restaurant_Review-g800217-d13203411-Reviews-Ravintola_Kansakoulu_ja_Majatalo-Vastanfjard_Kimito_Island_Southwest_Finland.html"}
   ],
   sourceTitle:"Sisältö ja kuvat: Kansakoulun viralliset ravintola- ja lähiruokasivut sekä arvostelupalvelut",
   menuTitle:"Ruokalista ja päivän tarjonta",menuText:"Kansakoulun virallisella verkkosivulla kuvataan ravintolan konsepti ja sesonkilounas, mutta ajantasaista ruokalistaa, annoshintoja tai tämän päivän tarjontaa ei ollut julkisesti vahvistettavissa tutkimushetkellä.",menuNote:"Emme julkaise keksittyä ruokalistaa tai vanhoja hintoja. Pyydä päivän menu suoraan ravintolalta.",
   hoursTitle:"Aukioloajat",hoursText:"Virallisen sivuston käytettävissä olevissa tiedoissa mainitaan kesäkauden päivittäinen lounas, mutta vahvistettuja nykyisiä viikonpäiväkohtaisia aukioloaikoja ei löytynyt. Soita tai lähetä viesti ennen matkaa.",
   contactTitle:"Pöytävaraukset ja yhteydenotto",contactText:"Varmista pöytätilanne, päivän menu, allergiat, ryhmäruokailut sekä juhla- ja saunapalvelut suoraan Kansakoululta.",
   booking:"Ota yhteyttä ravintolaan",website:"Kansakoulun ravintolasivu",map:"Avaa kartta",back:"Takaisin ruokapaikkoihin",credit:"Kansakoulun alkuperäiset kuvat"
  }
 },
 en:{
  stay:{
   eyebrow:"Brännboda · Västanfjärd · Kimitoön",title:"Kansakoulu – a characterful guesthouse in a former village school",
   lead:"Stay somewhere with a story. The former Brännboda village school combines the atmosphere of a historic schoolhouse with a relaxed countryside setting and a guesthouse-style Bed & Breakfast experience on Kimitoön.",
   storyTitle:"A former school, a distinctive archipelago stay",
   story:"Kansakoulu is located in Västanfjärd on Kimitoön. The building's past remains part of the experience: the rooms are individually furnished and vary in size, while the renovation was designed to respect the character of the old school. Rather than a standard chain hotel, it offers a personal base for exploring the archipelago. Restaurant services are available in the same property, subject to season and confirmed opening times.",
   experienceTitle:"What makes the stay special",
   experiences:[
    {title:"Individually styled rooms",text:"The rooms differ in size and interior style. The property's accommodation page says they were renovated between autumn 2016 and spring 2017 with respect for the school's history."},
    {title:"The atmosphere of a historic school",text:"The owners describe the rooms playfully as former classrooms. The building's history is part of the character of the stay."},
    {title:"Garden shelter and barbecue area",text:"The official accommodation page mentions a lean-to shelter and barbecue area in the yard for travellers and hikers. Check the availability of barbecue products directly."},
    {title:"Restaurant on site",text:"The guesthouse and restaurant share the same property. Confirm meal services, opening times and any advance booking requirements with the operator."}
   ],
   facilitiesTitle:"Important details before booking",
   facilities:[
    {title:"Bathrooms and toilets",text:"According to the property's own accommodation page, guest rooms do not have private showers or toilets. Renovated shared shower and toilet facilities are located along the corridor."},
    {title:"Room types",text:"Room sizes and layouts vary. Confirm occupancy, bed configuration and bathroom arrangements for the specific room before booking."},
    {title:"Arrival",text:"The address is Brännbodantie 71, 25830 Västanfjärd. Confirm check-in arrangements and arrival instructions in your booking confirmation or with the property."}
   ],
   practicalTitle:"Visitor information",
   practical:[{label:"Address",value:"Brännbodantie 71, 25830 Västanfjärd, Kimitoön"},{label:"Phone",value:"+358 44 977 6810"},{label:"Email",value:"info@kansakouluun.fi"},{label:"Accommodation",value:"Bed & Breakfast / guesthouse"},{label:"Bathroom",value:"Shared corridor facilities – confirm room details"}],
   galleryTitle:"Discover Kansakoulu",reviewsTitle:"Guest ratings",reviewsIntro:"Ratings are published by independent review platforms. Scores and review counts may change; always check the original platform before booking.",
   reviews:[
    {source:"Google",score:"4.5 / 5",count:"424 reviews",detail:"Overall score shown on the Google Travel property profile. It refers to the combined Kansakoulu property, not accommodation alone.",url:"https://www.google.com/maps/search/?api=1&query=Ravintola+Kansakoulu+ja+Majatalo+V%C3%A4stanfj%C3%A4rd"},
    {source:"Booking.com",score:"8.7 / 10",count:"276 accommodation reviews",detail:"Guest ratings on Booking.com. The listing highlights friendly staff and breakfast among its positive features.",url:"https://www.booking.com/hotel/fi/kansakoulu.html"}
   ],
   sourceTitle:"Content and photos: Kansakoulu's own website and the review platforms listed",
   hoursTitle:"Availability and booking",hoursText:"Room availability, check-in, rates and room-specific conditions may vary. The older official website does not provide live availability. Check current rooms and terms directly through the booking service.",
   contactTitle:"Contact and book direct",contactText:"Before booking, ask about room type, shared bathrooms, breakfast, pets, accessibility and arrival arrangements.",
   booking:"Check rooms and book",website:"Kansakoulu official website",map:"Open map",back:"Back to accommodation",credit:"Original Kansakoulu images"
  },
  food:{
   eyebrow:"Brännboda · Västanfjärd · Kimitoön",title:"Kansakoulu Restaurant – local flavours in a historic schoolhouse",
   lead:"Discover a distinctive island restaurant where the history of a former village school meets local ingredients and welcoming spaces. The restaurant is part of the Kansakoulu guesthouse in Västanfjärd.",
   storyTitle:"Food and gatherings in a former school",
   story:"Kansakoulu's official restaurant page describes a restaurant, function hall, terrace and sauna facilities in the former Brännboda school. The kitchen says it uses Finnish ingredients and products from local producers on Kimitoön. The website mentions daily lunch during the summer season, but does not provide a current menu or confirmed present-day opening hours. Check today's service directly with the restaurant.",
   experienceTitle:"The restaurant and its spaces",
   experiences:[
    {title:"Restaurant and seasonal lunch",text:"The official website mentions daily lunch during the summer season. Ask the restaurant for the current dishes, any à la carte options, prices and dietary requirements."},
    {title:"The Headmaster's Hall",text:"The function hall is described as suitable for birthdays, family celebrations, corporate events, confirmations and graduation parties. The official page mentions seating for approximately 100 guests."},
    {title:"Pub Jälki-istunto and Lehtorin Viinikellari",text:"These are named as part of the Kansakoulu restaurant concept. Confirm opening times, current offerings and event programming directly."},
    {title:"Kaffela and terraces",text:"The café and terraces complement the restaurant spaces. Their availability may vary by season and private events."},
    {title:"Local food corner",text:"The official local-food page says the kitchen uses ingredients from Kimitoön producers and that locally made products can be purchased on site."}
   ],
   facilitiesTitle:"Celebrations, groups and practical details",
   facilities:[
    {title:"Celebrations and events",text:"The restaurant says it can arrange turnkey celebrations and help source entertainment. Request a tailored quotation and confirm all arrangements directly."},
    {title:"Alcohol licence",text:"The official restaurant page states that the venue has an A alcohol licence. It therefore says guests cannot bring their own drinks or use an outside catering provider for functions."},
    {title:"Menu and dietary needs",text:"The older official website does not publish a current menu or prices. Contact the restaurant directly about allergies and dietary requirements before visiting."}
   ],
   practicalTitle:"Restaurant contact details",
   practical:[{label:"Address",value:"Brännbodantie 71, 25830 Västanfjärd, Kimitoön"},{label:"Phone",value:"+358 44 977 6810"},{label:"Email",value:"info@kansakouluun.fi"},{label:"Dining",value:"Restaurant, seasonal lunch, private events and group services"},{label:"Local food",value:"Ingredients and products from producers on Kimitoön"}],
   galleryTitle:"Restaurant and local-food photographs",reviewsTitle:"Restaurant guest reviews",reviewsIntro:"Ratings are provided by independent review platforms. FINNEXPRIENCE does not write or alter customer reviews.",
   reviews:[
    {source:"Google",score:"4.5 / 5",count:"424 reviews",detail:"Overall score on the Google Travel property profile. This is not a restaurant-only rating.",url:"https://www.google.com/maps/search/?api=1&query=Ravintola+Kansakoulu+ja+Majatalo+V%C3%A4stanfj%C3%A4rd"},
    {source:"Tripadvisor",score:"4.4 / 5",count:"33 restaurant reviews",detail:"Tripadvisor listing for Ravintola Kansakoulu ja Majatalo. Read the original guest reviews on the platform.",url:"https://www.tripadvisor.com/Restaurant_Review-g800217-d13203411-Reviews-Ravintola_Kansakoulu_ja_Majatalo-Vastanfjard_Kimito_Island_Southwest_Finland.html"}
   ],
   sourceTitle:"Content and photos: Kansakoulu's official restaurant and local-food pages, plus review platforms",
   menuTitle:"Menu and today's dishes",menuText:"Kansakoulu's official website describes the restaurant concept and seasonal lunch, but a current menu, dish prices and today's selection could not be verified publicly at the time of research.",menuNote:"We do not publish invented menus or outdated prices. Ask the restaurant directly for today's menu.",
   hoursTitle:"Opening hours",hoursText:"The accessible official website mentions daily lunch during the summer season, but current day-by-day opening hours could not be verified. Call or message before travelling.",
   contactTitle:"Table enquiries and contact",contactText:"Check table availability, today's menu, allergies, group dining, celebrations and sauna services directly with Kansakoulu.",
   booking:"Contact the restaurant",website:"Kansakoulu restaurant website",map:"Open map",back:"Back to restaurants",credit:"Original Kansakoulu images"
  }
 },
 es:{
  stay:{
   eyebrow:"Brännboda · Västanfjärd · Kimitoön",title:"Kansakoulu: una casa de huéspedes en una antigua escuela rural",
   lead:"Alójate en un lugar con historia. La antigua escuela de Brännboda combina el carácter de un edificio escolar histórico con la tranquilidad del campo y una estancia tipo Bed & Breakfast en el archipiélago de Kimitoön.",
   storyTitle:"Una antigua escuela para descubrir el archipiélago",
   story:"Kansakoulu se encuentra en Västanfjärd, en la isla de Kimitoön. La historia del edificio sigue presente en sus habitaciones, todas diferentes en tamaño y decoración. La renovación se realizó respetando el carácter de la antigua escuela. No es un hotel convencional, sino una base con personalidad para explorar las islas. El establecimiento también cuenta con restaurante; consulta directamente la temporada y los horarios de servicio.",
   experienceTitle:"Lo especial de la estancia",
   experiences:[
    {title:"Habitaciones con personalidad",text:"Las habitaciones tienen tamaños y estilos diferentes. Según la web oficial, fueron renovadas entre el otoño de 2016 y la primavera de 2017 respetando la historia de la escuela."},
    {title:"El ambiente de una escuela histórica",text:"Los propietarios describen las habitaciones, con un guiño, como antiguas aulas. La historia del edificio forma parte de la experiencia."},
    {title:"Jardín, refugio y barbacoa",text:"La web oficial de alojamiento menciona un refugio tipo lean-to y una zona de barbacoa en el patio para viajeros y excursionistas. Confirma directamente la disponibilidad de productos para cocinar."},
    {title:"Restaurante en el mismo edificio",text:"El alojamiento y el restaurante forman parte del mismo establecimiento. Consulta los servicios de comidas, horarios y posibles reservas previas."}
   ],
   facilitiesTitle:"Información importante antes de reservar",
   facilities:[
    {title:"Duchas y aseos",text:"Según la página oficial de alojamiento, las habitaciones no disponen de ducha ni aseo privados. Los baños y duchas renovados son compartidos y están en el pasillo."},
    {title:"Tipos de habitación",text:"El tamaño y la distribución varían. Confirma la capacidad, las camas y la ubicación de los baños de la habitación concreta antes de reservar."},
    {title:"Llegada",text:"La dirección es Brännbodantie 71, 25830 Västanfjärd. Confirma la hora de llegada y las instrucciones en la reserva o directamente con el establecimiento."}
   ],
   practicalTitle:"Información para visitantes",
   practical:[{label:"Dirección",value:"Brännbodantie 71, 25830 Västanfjärd, Kimitoön"},{label:"Teléfono",value:"+358 44 977 6810"},{label:"Correo",value:"info@kansakouluun.fi"},{label:"Alojamiento",value:"Bed & Breakfast / casa de huéspedes"},{label:"Baños",value:"Instalaciones compartidas en el pasillo; confirma los detalles"}],
   galleryTitle:"Descubre Kansakoulu",reviewsTitle:"Valoraciones de huéspedes",reviewsIntro:"Las puntuaciones proceden de plataformas de reseñas independientes. Pueden cambiar; consulta siempre la fuente original antes de reservar.",
   reviews:[
    {source:"Google",score:"4,5 / 5",count:"424 opiniones",detail:"Valoración general que aparece en el perfil de Google Travel. Se refiere al establecimiento Kansakoulu en conjunto, no solo al alojamiento.",url:"https://www.google.com/maps/search/?api=1&query=Ravintola+Kansakoulu+ja+Majatalo+V%C3%A4stanfj%C3%A4rd"},
    {source:"Booking.com",score:"8,7 / 10",count:"276 opiniones de alojamiento",detail:"Valoraciones de huéspedes en Booking.com. El perfil destaca, entre otros aspectos, la amabilidad del personal y el desayuno.",url:"https://www.booking.com/hotel/fi/kansakoulu.html"}
   ],
   sourceTitle:"Contenido e imágenes: web oficial de Kansakoulu y plataformas de reseñas indicadas",
   hoursTitle:"Disponibilidad y reservas",hoursText:"La disponibilidad, el registro de entrada, los precios y las condiciones dependen de la habitación. La antigua web oficial no muestra disponibilidad en tiempo real. Comprueba las habitaciones y condiciones en el servicio de reservas.",
   contactTitle:"Contacto y reserva directa",contactText:"Antes de reservar, pregunta por el tipo de habitación, baños compartidos, desayuno, mascotas, accesibilidad y llegada.",
   booking:"Consultar habitaciones y reservar",website:"Web oficial de Kansakoulu",map:"Abrir mapa",back:"Volver a alojamientos",credit:"Fotografías originales de Kansakoulu"
  },
  food:{
   eyebrow:"Brännboda · Västanfjärd · Kimitoön",title:"Restaurante Kansakoulu: sabores locales en una antigua escuela",
   lead:"Descubre un restaurante singular del archipiélago, donde la historia de una antigua escuela rural se une a los ingredientes locales y a espacios acogedores. El restaurante forma parte del alojamiento Kansakoulu en Västanfjärd.",
   storyTitle:"Gastronomía y celebraciones en una antigua escuela",
   story:"La página oficial del restaurante describe un comedor, un salón para celebraciones, una terraza y espacios de sauna en la antigua escuela de Brännboda. La cocina indica que utiliza ingredientes finlandeses y productos de productores locales de Kimitoön. La web menciona almuerzo diario durante la temporada de verano, pero no publica un menú actualizado ni horarios actuales confirmados. Comprueba directamente con el restaurante qué servicios están disponibles.",
   experienceTitle:"Restaurante y espacios",
   experiences:[
    {title:"Restaurante y almuerzo de temporada",text:"La web oficial menciona almuerzo diario durante el verano. Consulta los platos del día, opciones a la carta, precios y dietas especiales directamente."},
    {title:"Salón del Director",text:"El salón se presenta como un espacio para cumpleaños, celebraciones familiares, eventos de empresa, confirmaciones y graduaciones. La web oficial indica una capacidad aproximada de 100 personas."},
    {title:"Pub Jälki-istunto y bodega Lehtorin Viinikellari",text:"Estos espacios aparecen nombrados como parte del concepto gastronómico de Kansakoulu. Confirma horarios, oferta y programación directamente."},
    {title:"Kaffela y terrazas",text:"La cafetería y las terrazas completan el conjunto. La disponibilidad puede variar según la temporada y los eventos privados."},
    {title:"Punto de productos locales",text:"Según la página oficial, la cocina utiliza ingredientes de productores de Kimitoön y en el establecimiento se pueden comprar productos locales para llevar."}
   ],
   facilitiesTitle:"Celebraciones, grupos e información práctica",
   facilities:[
    {title:"Celebraciones y eventos",text:"El restaurante ofrece organizar celebraciones con un servicio integral y ayudar a encontrar actividades para los eventos. Solicita un presupuesto personalizado y confirma los detalles directamente."},
    {title:"Licencia de alcohol",text:"La página oficial indica que el establecimiento dispone de licencia A. Por ello, señala que no se pueden llevar bebidas propias ni contratar un servicio de catering externo para las celebraciones."},
    {title:"Menú y dietas especiales",text:"La web antigua no publica un menú ni precios actuales. Consulta directamente las alergias y necesidades dietéticas antes de acudir."}
   ],
   practicalTitle:"Contacto del restaurante",
   practical:[{label:"Dirección",value:"Brännbodantie 71, 25830 Västanfjärd, Kimitoön"},{label:"Teléfono",value:"+358 44 977 6810"},{label:"Correo",value:"info@kansakouluun.fi"},{label:"Servicios",value:"Restaurante, almuerzo de temporada, eventos y grupos"},{label:"Productos locales",value:"Ingredientes y productos de productores de Kimitoön"}],
   galleryTitle:"Imágenes del restaurante y productos locales",reviewsTitle:"Opiniones sobre el restaurante",reviewsIntro:"Las puntuaciones pertenecen a plataformas independientes. FINNEXPRIENCE no redacta ni modifica las opiniones de los clientes.",
   reviews:[
    {source:"Google",score:"4,5 / 5",count:"424 opiniones",detail:"Valoración general del perfil de Google Travel. No es una puntuación exclusiva del restaurante.",url:"https://www.google.com/maps/search/?api=1&query=Ravintola+Kansakoulu+ja+Majatalo+V%C3%A4stanfj%C3%A4rd"},
    {source:"Tripadvisor",score:"4,4 / 5",count:"33 opiniones de restaurante",detail:"Ficha de Tripadvisor de Ravintola Kansakoulu ja Majatalo. Consulta las opiniones originales en la plataforma.",url:"https://www.tripadvisor.com/Restaurant_Review-g800217-d13203411-Reviews-Ravintola_Kansakoulu_ja_Majatalo-Vastanfjard_Kimito_Island_Southwest_Finland.html"}
   ],
   sourceTitle:"Contenido e imágenes: páginas oficiales de restaurante y productos locales de Kansakoulu, y plataformas de reseñas",
   menuTitle:"Carta y platos del día",menuText:"La web oficial describe el concepto del restaurante y el almuerzo de temporada, pero no fue posible verificar públicamente una carta actual, los precios de los platos ni la oferta de hoy.",menuNote:"No publicamos cartas inventadas ni precios antiguos. Solicita el menú del día directamente al restaurante.",
   hoursTitle:"Horario de apertura",hoursText:"La web oficial disponible menciona almuerzo diario durante la temporada de verano, pero no se pudieron confirmar los horarios actuales de cada día. Llama o escribe antes de desplazarte.",
   contactTitle:"Reservas de mesa y contacto",contactText:"Confirma directamente la disponibilidad de mesas, el menú del día, alergias, comidas para grupos, celebraciones y servicios de sauna.",
   booking:"Contactar con el restaurante",website:"Web del restaurante Kansakoulu",map:"Abrir mapa",back:"Volver a restaurantes",credit:"Fotografías originales de Kansakoulu"
  }
 }
};

export function KimitoonKansakouluDetail({locale,kind}:{locale:Locale;kind:Kind}) {
 const t=copy[locale][kind];
 const isStay=kind==="stay";
 const bookingUrl=isStay?"https://www.booking.com/hotel/fi/kansakoulu.html":"https://www.kansakouluun.fi/ravintolat/";
 const officialUrl=isStay?"https://www.kansakouluun.fi/majoitus/":"https://www.kansakouluun.fi/ravintolat/";
 const mapUrl="https://www.google.com/maps/search/?api=1&query=Br%C3%A4nnbodantie+71%2C+25830+V%C3%A4stanfj%C3%A4rd";
 const backPath=isStay?"majoitus":"ruoka";
 return <main className="bg-white text-brand-950">
  <section className="relative isolate min-h-[58vh] overflow-hidden bg-brand-950 text-white sm:min-h-[68vh]">
   <Image src={photos[0].src} alt={photos[0].alt[locale]} fill priority sizes="100vw" className="object-cover"/>
   <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10"/>
   <div className="container-narrow relative flex min-h-[58vh] items-end py-16 sm:min-h-[68vh] sm:py-24"><div className="max-w-4xl">
    <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{t.eyebrow}</p>
    <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{t.title}</h1>
    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{t.lead}</p>
    <div className="mt-8 flex flex-wrap gap-3"><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-semibold text-brand-950 hover:bg-gold-100">{t.booking} ↗</a><a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10">{t.website} ↗</a></div>
   </div></div>
  </section>
  <section className="container-narrow grid gap-10 py-14 md:grid-cols-[1.1fr_.9fr] md:py-20">
   <div><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{t.eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.storyTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-700">{t.story}</p>
    <h2 className="mt-10 font-display text-2xl font-bold">{t.experienceTitle}</h2><div className="mt-5 grid gap-4">{t.experiences.map((item)=><article key={item.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6"><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.text}</p></article>)}</div>
   </div>
   <aside className="h-fit rounded-3xl bg-slate-50 p-6 sm:p-8"><h2 className="font-display text-2xl font-bold">{t.practicalTitle}</h2><dl className="mt-4 space-y-4">{t.practical.map((item)=><div key={item.label}><dt className="text-xs font-bold uppercase tracking-wide text-brand-700">{item.label}</dt><dd className="mt-1 leading-6 text-slate-700">{item.value}</dd></div>)}</dl><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-brand-950 px-5 py-3 text-center font-semibold text-white hover:bg-brand-800">{t.map} ↗</a></aside>
  </section>
  <section className="bg-stone-50 py-12 sm:py-16"><div className="container-narrow"><h2 className="font-display text-3xl font-bold">{t.facilitiesTitle}</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{t.facilities.map((item)=><article key={item.title} className="rounded-2xl border border-stone-200 bg-white p-5"><h3 className="font-bold">{item.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p></article>)}</div></div></section>
  {kind==="food"&&<section className="container-narrow py-12 sm:py-16"><h2 className="font-display text-3xl font-bold">{t.menuTitle}</h2><p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">{t.menuText}</p><p className="mt-3 rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-950">{t.menuNote}</p><a href="https://www.kansakouluun.fi/ravintolat/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-bold text-brand-800 underline">{t.website} ↗</a></section>}
  <section className="container-narrow py-12 sm:py-16"><h2 className="font-display text-3xl font-bold">{t.galleryTitle}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{photos.slice(0,2).map((photo)=><figure key={photo.src} className="overflow-hidden rounded-2xl bg-stone-100"><div className="relative h-64"><Image src={photo.src} alt={photo.alt[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/></div><figcaption className="p-3 text-xs text-slate-500">{t.credit} · kansakouluun.fi</figcaption></figure>)}</div></section>
  <section className="bg-brand-950 py-12 text-white sm:py-16"><div className="container-narrow"><h2 className="font-display text-3xl font-bold">{t.reviewsTitle}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">{t.reviewsIntro}</p><div className="mt-6 grid gap-4 md:grid-cols-2">{t.reviews.map((review)=><article key={review.source} className="rounded-2xl border border-white/15 bg-white/5 p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-gold-300">{review.source}</p><div className="mt-3 flex flex-wrap items-baseline gap-3"><strong className="font-display text-3xl">{review.score}</strong><span className="text-sm text-white/70">{review.count}</span></div><p className="mt-3 text-sm leading-7 text-white/80">{review.detail}</p><a href={review.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-gold-300 underline underline-offset-4">{locale==="fi"?"Lue alkuperäiset arviot":locale==="es"?"Leer opiniones originales":"Read original reviews"} ↗</a></article>)}</div></div></section>
  <section className="border-y border-stone-200 bg-stone-50 py-8"><div className="container-narrow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-brand-700">{t.sourceTitle}</p><p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">{t.hoursTitle}: {t.hoursText}</p><p className="mt-2 text-xs text-slate-500">{t.contactTitle}: {t.contactText}</p></div><Link href={"/"+locale+"/destinations/kemionsaari/"+backPath} className="font-semibold text-brand-800 underline underline-offset-4">{t.back} →</Link></div></section>
 </main>;
}
