import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const categories = {
  majoitus: {
    fi: { title: "Majoitus Mathildedalissa", description: "Boutique-hotelleja, persoonallisia majataloja, huviloita ja mökkimajoitusta historiallisen ruukkikylän ja luonnon lähellä.", intro: "Valitse tukikohta, josta käsin voit tutustua ruukkikylään, Teijon kansallispuistoon ja lähialueen rantoihin." },
    en: { title: "Places to stay in Mathildedal", description: "Boutique hotels, characterful guesthouses, villas and cottages near the historic ironworks village and nature.", intro: "Choose a base for exploring the ironworks village, Teijo National Park and the nearby coast." },
    es: { title: "Alojamiento en Mathildedal", description: "Hoteles boutique, casas de huéspedes, villas y cabañas cerca del pueblo histórico y la naturaleza.", intro: "Elige un lugar desde el que descubrir el antiguo pueblo siderúrgico, el Parque Nacional de Teijo y la costa." },
    providers: [
      { name: "Hotel Mathildedal", url: "https://mathildedal.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/mathildedal_131-copylowres.jpg?itok=blmtNtmc", credit: "Visit Mathildedal" },
      { name: "Matri House", url: "https://matrihouse.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/matrihouse_mathildedal_web.jpg?itok=hgOKNF9U", credit: "Visit Mathildedal" },
      { name: "Mathildan Marina", url: "https://mathildanmarina.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/Huone%205%20talvi%200001.jpg?itok=6ElNUZ3H", credit: "Visit Mathildedal" },
      { name: "Matilda Villas", url: "https://matildavillas.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/Matilda%20Villas_10%20kopio.jpg?itok=fPv5YeEK", credit: "Visit Mathildedal" },
      { name: "Meri-Ruukki Holiday Village", url: "https://meri-ruukki.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/oleskelutila.jpg?itok=hIXkNyVI", credit: "Visit Mathildedal" },
      { name: "Teijo Nature Centre cabins and camping", url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, credit: "Natura Viva" },
    ],
  },
  ruoka: {
    fi: { title: "Ravintolat ja kahvilat Mathildedalissa", description: "Löydä Mathildedalin ravintolat, kahvilat, leipomot ja paikalliset maut.", intro: "Pysähdy kahville, tuoreelle leivonnaiselle tai pidemmälle aterialle. Aukiolot ja sesonkivalikoimat kannattaa tarkistaa ennen vierailua." },
    en: { title: "Restaurants and cafés in Mathildedal", description: "Discover restaurants, cafés, bakeries and local flavours in Mathildedal, Finland.", intro: "Stop for coffee and fresh pastries or settle in for a longer meal. Check opening hours and seasonal menus before visiting." },
    es: { title: "Restaurantes y cafeterías en Mathildedal", description: "Descubre restaurantes, cafeterías, panaderías y sabores locales en Mathildedal, Finlandia.", intro: "Haz una pausa para tomar café y probar repostería o disfruta de una comida tranquila. Comprueba los horarios y menús de temporada antes de ir." },
    providers: [
      { name: "Kyläravintola Terho", url: "https://www.ravintolaterho.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/visit-matilda_9-uai-1032x688.jpg?itok=fNisvaPC", credit: "Visit Mathildedal" },
      { name: "Mathildan Marina Restaurant", url: "https://mathildanmarina.fi/ravintola/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/terassi%20tyt%C3%B6t%20ruoka%206329.jpg?itok=KjXz8Y_x", credit: "Visit Mathildedal" },
      { name: "Bistro Bruket", url: "https://mathildedal.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/bruket_tila.jpg?itok=yL7mEIcZ", credit: "Visit Mathildedal" },
      { name: "Café Mathildedal", url: "https://mathildedal.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/123sv_vp23710.jpg?itok=urTug-um", credit: "Visit Mathildedal" },
      { name: "Metsäravintola", url: "https://www.visitmathildedal.fi/fi/ravintolatjakahvilat", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/metsaravintola.jpg?itok=C0O4bfsi", credit: "Visit Mathildedal" },
      { name: "Viettelysten Vaunu", url: "https://www.visitmathildedal.fi/fi/ravintolatjakahvilat", image: "https://visitmathildedal.fi/sites/default/files/styles/wide/public/listauskuvat/viettelysten-vaunu-ulkokuva1.jpg?itok=6Nlo_ujs", credit: "Visit Mathildedal — official ice cream kiosk photo" },
      { name: "Meri-Teijo Golf café and pizzeria", url: "https://meriteijogolf.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/golfpizzeria.jpg?itok=C5MEdxb9", credit: "Visit Mathildedal" },
      { name: "Terho Hills", url: "https://www.ravintolaterho.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/terhohills.jpeg?itok=2zEVsfuL", credit: "Visit Mathildedal — Terho Hills interior" },
    ],
  },
  tekemista: {
    fi: { title: "Tekemistä ja elämyksiä Mathildedalissa", description: "Melontaa, pyöräilyä, patikointia, golfia, minigolfia, joogaa ja muita elämyksiä Mathildedalin ja Teijon alueella.", intro: "Yhdistä kyläkävely ja ulkoilu. Varmista vuokraus, opastukset, luvat ja kausikohtainen saatavuus suoraan palveluntarjoajalta." },
    en: { title: "Things to do in Mathildedal", description: "Kayaking, cycling, hiking, golf, adventure minigolf, yoga and outdoor experiences in Mathildedal and Teijo.", intro: "Combine a village stroll with time outdoors. Confirm rentals, guided activities, permits and seasonal availability with each provider." },
    es: { title: "Qué hacer en Mathildedal", description: "Kayak, ciclismo, senderismo, golf, minigolf, yoga y experiencias al aire libre en Mathildedal y Teijo.", intro: "Combina un paseo por el pueblo con actividades al aire libre. Confirma directamente los alquileres, las visitas guiadas, los permisos y la disponibilidad." },
    providers: [
      { name: "Teijo Nature Centre / Natura Viva", url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, credit: "Natura Viva" },
      { name: "Mathildedalin Keskuspuisto", url: "https://mathildedalinkeskuspuisto.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/adventure_koko-alue.jpeg?itok=0O7HY6ly", credit: "Visit Mathildedal — official adventure minigolf photo" },
      { name: "Meri-Teijo Bike Park", url: "https://www.meriteijobikepark.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/MTBP2025_Background.jpg?itok=y1W2mJKP", credit: "Visit Mathildedal — official bike park photo" },
      { name: "Meri-Teijo Golf", url: "https://meriteijogolf.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/golf_aktiviteetit.jpg?itok=lpvm1Tl0", credit: "Visit Mathildedal — official golf-course photo" },
      { name: "All Soul Mind – You Choose", url: "https://visitmathildedal.fi/fi/aktiviteetit", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/riemer.png?itok=pxXzeQTm", credit: "Visit Mathildedal — official wellbeing photo" },
      { name: "Teijo National Park", url: "https://www.luontoon.fi/fi/kohteet/teijon-kansallispuisto", image: photoLibrary.teijoNationalPark, credit: "Finland Experience photo library" },
      { name: "Chill Out Fishing", url: "https://chilloutfishing.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/saariretki-veneretki-kalastusretki-saaristomeri-11-980x653.jpg?itok=YnieSLEU", credit: "Visit Mathildedal — official fishing-trip photo" },
      { name: "Teijo Ski & Action Park", url: "https://meriteijo.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/ski_kuvanettiin.jpg?itok=9XkC1baY", credit: "Visit Mathildedal — official ski resort photo" },
      { name: "Yoga in Mathildedal", url: "https://www.aquarianyoga.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/joogaa-mathildedalissa-visitmathildedal-siri-ja-ari.png?itok=dMLKusbH", credit: "Visit Mathildedal — official yoga photo" },
      { name: "Hoitola Kukkuvilla", url: "https://hoitolakukkuvilla.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/hoitola_kukkuvilla_laiturijooga_31.jpg?itok=0562YMZP", credit: "Visit Mathildedal — official wellbeing photo" },
    ],
  },
  kulttuuri: {
    fi: { title: "Kulttuuri ja historia Mathildedalissa", description: "Tutustu Mathildedalin ruukin historiaan, kulttuurikohteisiin, kesäteatteriin ja kylän tarinoihin.", intro: "Mathildedalin historiallinen ruukkimiljöö on osa vierailua: kulje vanhojen rakennusten lomassa ja tarkista näyttelyiden ja esitysten ajankohtaiset tiedot." },
    en: { title: "Culture and heritage in Mathildedal", description: "Explore Mathildedal Ironworks, local heritage, summer theatre and stories from the historic village.", intro: "The historic ironworks setting is part of the experience. Wander among the old buildings and check current exhibition and performance details before your visit." },
    es: { title: "Cultura e historia en Mathildedal", description: "Descubre la antigua ferrería de Mathildedal, el patrimonio local, el teatro de verano y las historias del pueblo.", intro: "El entorno histórico forma parte de la experiencia. Pasea entre los edificios antiguos y consulta los horarios actuales de exposiciones y espectáculos." },
    providers: [
      { name: "Mathildedal Ironworks", url: "https://mathildedal.fi/en/things-to-do/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library" },
      { name: "Mathildedal Summer Theatre / Teatteri ProVinssi", url: "https://www.teatteriprovinssi.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/mathildedal-katsomo.jpg?itok=IDFAL0tW", credit: "Visit Mathildedal — official theatre photo" },
      { name: "Visit Mathildedal events", url: "https://visitmathildedal.fi/fi/tapahtumat", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library — destination context image" },
    ],
  },
  ostokset: {
    fi: { title: "Putiikit, käsityöt ja design Mathildedalissa", description: "Löydä Mathildedalin pienet putiikit, paikalliset käsityöt, vaatteet, design ja lahjat.", intro: "Varaa aikaa putiikeille ja paikallisten tekijöiden tuotteille. Aukioloajat voivat vaihdella sesongin ja tapahtumien mukaan." },
    en: { title: "Shops, crafts and design in Mathildedal", description: "Discover independent shops, local crafts, clothing, design and gifts in Mathildedal.", intro: "Make time for independent shops and products by local makers. Opening hours may vary by season and events." },
    es: { title: "Tiendas, artesanía y diseño en Mathildedal", description: "Descubre pequeñas tiendas, artesanía local, ropa, diseño y regalos en Mathildedal.", intro: "Reserva tiempo para visitar las tiendas y descubrir productos de creadores locales. Los horarios pueden variar según la temporada y los eventos." },
    providers: [
      { name: "Ruukki Creative", url: "https://ruukkicreative.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/tyohuone.jpg?itok=shPoTuHn", credit: "Visit Mathildedal — official creative studio photo" },
      { name: "Ruukin Kehräämö", url: "https://ruukinkehraamo.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/alpakkaneule10-lowres.jpg?itok=rVgS1bDJ", credit: "Visit Mathildedal — official alpaca knitwear photo" },
      { name: "Aate Clothing", url: "https://aateclothing.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/myymalavaaka.jpg?itok=U0j0U7-1", credit: "Visit Mathildedal — official clothing shop photo" },
      { name: "Visit Mathildedal shopping guide", url: "https://www.visitmathildedal.fi/fi/ostokset", image: photoLibrary.mathildedalVillage, credit: "Visit Mathildedal" },
      { name: "Kaarnalaiva", url: "https://kaarnalaiva.net/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/kaarnalaivanettisivuille-1-uai-1032x688.jpg?itok=KAsstQNx", credit: "Visit Mathildedal — official artisan workshop photo" },
      { name: "Kyläpanimo Beer Shop", url: "https://www.kylapanimo.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/panimo-pienpanimo-mathildedalin-kylapanimo-logo-visitmathildedal.jpg?itok=j2o_nrRG", credit: "Visit Mathildedal — official brewery logo" },
      { name: "Vinttipuoti", url: "https://www.visitmathildedal.fi/fi/ostokset", image: "https://visitmathildedal.fi/sites/default/files/styles/wide/public/listauskuvat/psx_20221106_095253_2.jpg?itok=Yc7PqUf-", credit: "Visit Mathildedal — official Vinttipuoti interior photo" },
      { name: "Lähiruoka Puhti", url: "https://www.visitmathildedal.fi/fi/ostokset", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/puhti-sisakuva.jpg?itok=pR18qWud", credit: "Visit Mathildedal — official local food shop photo" },
      { name: "Matildan kesäkauppa", url: "https://www.visitmathildedal.fi/fi/ostokset", image: "https://visitmathildedal.fi/sites/default/files/styles/wide/public/listauskuvat/kesakauppa.png?itok=5_Dxm8dm", credit: "Visit Mathildedal — official summer shop product collage" },
      { name: "Dock Helsinki / Piironki", url: "https://www.visitmathildedal.fi/fi/ostokset", image: "", credit: "No verified image available — image intentionally omitted" },
    ],
  },
  tapahtumat: {
    fi: { title: "Tapahtumat Mathildedalissa", description: "Tarkista Mathildedalin tapahtumat, konsertit, esitykset ja kausiohjelma järjestäjien ajantasaisista lähteistä.", intro: "Mathildedalissa järjestetään vuoden mittaan erilaista ohjelmaa. Tapahtumapäivät, liput ja mahdolliset muutokset tarkistetaan aina järjestäjän omalta sivulta." },
    en: { title: "Events in Mathildedal", description: "Find event listings, concerts, performances and seasonal programmes in Mathildedal from official organisers.", intro: "Mathildedal hosts a changing programme throughout the year. Confirm dates, tickets and any changes on the organiser's own website." },
    es: { title: "Eventos en Mathildedal", description: "Consulta conciertos, espectáculos y actividades de temporada en Mathildedal a través de los organizadores oficiales.", intro: "Mathildedal ofrece actividades durante todo el año. Confirma las fechas, entradas y posibles cambios en la web del organizador." },
    providers: [
      { name: "Visit Mathildedal event calendar", url: "https://visitmathildedal.fi/fi/tapahtumat", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library — destination context image" },
      { name: "Mathildedal Ironworks events", url: "https://mathildedal.fi/en/things-to-do/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library — destination context image" },
    ],
  },
} as const;


const providerDescriptions: Record<string, Record<Locale, string>> = {
  "Hotel Mathildedal": {
    fi: "Persoonallinen hotelli historiallisessa ruukkimiljöössä, hyvä tukikohta kylään tutustumiseen.",
    en: "A characterful hotel in the historic ironworks setting and a welcoming base for exploring the village.",
    es: "Un hotel con personalidad en el entorno histórico de la ferrería, ideal para descubrir el pueblo.",
  },
  "Matri House": {
    fi: "Majoitusvaihtoehto Mathildedalissa rauhallista ja omannäköistä vierailua etsivälle.",
    en: "A local accommodation option for travellers looking for a relaxed, individual stay.",
    es: "Una opción de alojamiento local para quienes buscan una estancia tranquila y personal.",
  },
  "Mathildan Marina": {
    fi: "Sataman äärellä sijaitseva majoitus- ja vierailukohde meren tunnelmasta nauttivalle.",
    en: "A harbour-side place to stay and visit, with the atmosphere of the Finnish coast.",
    es: "Un alojamiento y punto de visita junto al puerto, con ambiente de costa finlandesa.",
  },
  "Matilda Villas": {
    fi: "Villas-majoitusta, joka sopii omaa tilaa ja itsenäistä lomailua arvostavalle.",
    en: "Villa accommodation for visitors who value privacy and an independent holiday.",
    es: "Villas para quienes valoran la privacidad y unas vacaciones independientes.",
  },
  "Meri-Ruukki Holiday Village": {
    fi: "Loma-asumista Mathildedalin alueella, josta voi tutustua kylään ja lähiluontoon.",
    en: "Holiday accommodation in the Mathildedal area, close to village life and nature.",
    es: "Alojamiento vacacional en la zona de Mathildedal, cerca del pueblo y la naturaleza.",
  },
  "Teijo Nature Centre cabins and camping": {
    fi: "Luontoon suuntautuvalle matkailijalle mökki- ja retkeilypalveluja Teijon alueella.",
    en: "Cabin and outdoor-stay options in the Teijo area for nature-focused travellers.",
    es: "Cabañas y opciones de estancia al aire libre en la zona de Teijo para amantes de la naturaleza.",
  },
  "Kyläravintola Terho": {
    fi: "Kyläravintola paikalliseen ruokailuhetkeen; tarkista ruokalista ja aukiolo suoraan ravintolasta.",
    en: "A village restaurant for a local dining stop; check the current menu and opening hours directly.",
    es: "Un restaurante de pueblo para disfrutar de la gastronomía local; consulta el menú y el horario directamente.",
  },
  "Mathildan Marina Restaurant": {
    fi: "Satamaravintola, jossa vierailuun yhdistyy Mathildedalin merellinen ympäristö.",
    en: "A harbour restaurant where dining comes with Mathildedal's maritime surroundings.",
    es: "Un restaurante junto al puerto, rodeado del ambiente marítimo de Mathildedal.",
  },
  "Bistro Bruket": {
    fi: "Bistro-vaihtoehto ruukkikylässä. Tarkista ajankohtainen ruokalista ja palvelut ravintolan omista kanavista.",
    en: "A bistro option in the ironworks village. Check the current menu and services with the restaurant.",
    es: "Una opción de bistró en el pueblo histórico. Consulta el menú y los servicios actuales con el restaurante.",
  },
  "Café Mathildedal": {
    fi: "Kahvilapysähdys kyläkierroksen lomaan; tarkista aukiolo ja tarjonta ennen saapumista.",
    en: "A café stop during a village visit; check opening hours and the current selection before arriving.",
    es: "Una parada para tomar café durante la visita; comprueba el horario y la oferta antes de ir.",
  },
  "Metsäravintola": {
    fi: "Luonnonläheinen ruokailukohde Teijon alueella; varmista aukiolo ja kausipalvelut etukäteen.",
    en: "A nature-oriented dining stop in the Teijo area; confirm opening and seasonal service details first.",
    es: "Un lugar para comer en un entorno natural en la zona de Teijo; confirma el horario y los servicios de temporada.",
  },
  "Teijo Nature Centre / Natura Viva": {
    fi: "Tutustu Teijon ulkoilumahdollisuuksiin ja tarkista vuokrattavat välineet sekä palvelut järjestäjältä.",
    en: "Explore outdoor options in Teijo and check equipment rentals and services with the operator.",
    es: "Descubre las actividades al aire libre en Teijo y consulta los alquileres y servicios con el operador.",
  },
  "Mathildedalin Keskuspuisto": {
    fi: "Kylän vapaa-ajan alue, jonka aktiviteetit ja aukiolo kannattaa tarkistaa omalta sivustolta.",
    en: "A village leisure area; check the current activities and opening details on its own website.",
    es: "Una zona de ocio del pueblo; consulta las actividades y los horarios actuales en su web.",
  },
  "Meri-Teijo Bike Park": {
    fi: "Maastopyöräilyn kohde Teijon alueella; tarkista reitit, kausi ja palvelut ennen lähtöä.",
    en: "A mountain-biking destination in the Teijo area; check trails, season and services before setting off.",
    es: "Un destino de ciclismo de montaña en Teijo; consulta los recorridos, la temporada y los servicios antes de ir.",
  },
  "Meri-Teijo Golf": {
    fi: "Golfkohde Teijon alueella. Varmista kentän tilanne, varaukset ja palvelut suoraan golfkeskuksesta.",
    en: "A golf destination in the Teijo area. Confirm course conditions, bookings and services directly.",
    es: "Un destino de golf en la zona de Teijo. Confirma directamente el estado del campo, las reservas y los servicios.",
  },
  "Yoga in Mathildedal": {
    fi: "Visit Mathildedalin aktiviteettitiedot auttavat selvittämään joogan ajankohtaisen tarjonnan.",
    en: "Use Visit Mathildedal's activity information to check current yoga options and arrangements.",
    es: "Consulta la información de actividades de Visit Mathildedal para conocer las opciones actuales de yoga.",
  },
  "Teijo National Park": {
    fi: "Metsämaisemia, järviä ja merellistä luontoa retkeilyyn. Tarkista reitit ja ajankohtaiset ohjeet viralliselta sivulta.",
    en: "Forest scenery, lakes and coastal nature for hiking. Check trails and current guidance on the official site.",
    es: "Bosques, lagos y naturaleza costera para caminar. Consulta los senderos y las indicaciones oficiales actualizadas.",
  },
  "Mathildedal Ironworks": {
    fi: "Historiallinen ruukkimiljöö ja kylän teollinen perintö ovat keskeinen osa Mathildedalin vierailua.",
    en: "The historic ironworks setting and industrial heritage are central to a visit to Mathildedal.",
    es: "La antigua ferrería y su patrimonio industrial son una parte esencial de la visita a Mathildedal.",
  },
  "Mathildedal Summer Theatre / Teatteri ProVinssi": {
    fi: "Tarkista teatterin omilta sivuilta tulevat esitykset, liput ja mahdollinen kesäohjelma.",
    en: "Check the theatre's own website for upcoming performances, tickets and seasonal programming.",
    es: "Consulta la web del teatro para conocer las próximas funciones, entradas y programación de temporada.",
  },
  "Visit Mathildedal events": {
    fi: "Virallinen tapahtumakalenteri kokoaa paikallisia tapahtumatietoja; tarkista päivämäärät järjestäjältä.",
    en: "The official event calendar lists local happenings; confirm dates with the event organiser.",
    es: "El calendario oficial reúne eventos locales; confirma las fechas con el organizador.",
  },
  "Ruukki Creative": {
    fi: "Tutustu luovien tekijöiden tarjontaan ja tarkista toimijat sekä aukiolo suoraan palvelun sivulta.",
    en: "Explore creative local offerings and check participating makers and opening details on the official site.",
    es: "Descubre propuestas creativas locales y consulta los participantes y horarios en la web oficial.",
  },
  "Ruukin Kehräämö": {
    fi: "Paikallinen ostoskohde käsityö- ja designlöytöjä etsivälle; tarkista valikoima ja aukiolo etukäteen.",
    en: "A local shopping stop for craft and design finds; check the selection and opening hours first.",
    es: "Una tienda local para encontrar artesanía y diseño; consulta la selección y el horario antes de ir.",
  },
  "Aate Clothing": {
    fi: "Vaatteisiin keskittyvä paikallinen putiikki. Tutustu ajankohtaiseen valikoimaan yrityksen omilla sivuilla.",
    en: "A local clothing boutique. Browse the current collection on the business's own website.",
    es: "Una boutique de ropa local. Descubre la colección actual en la web de la tienda.",
  },
  "All Soul Mind – You Choose": {
    fi: "Hyvinvointipalvelu, jonka saatavuus kannattaa varmistaa ja varata suoraan palveluntarjoajalta.",
    en: "A wellbeing service; confirm availability and arrange appointments directly with the provider.",
    es: "Un servicio de bienestar; confirma la disponibilidad y reserva directamente con el proveedor.",
  },
  "Viettelysten Vaunu": { fi: "Jäätelö- ja herkkuhetki Mathildedalin vierailun lomaan. Tarkista kauden aukiolo virallisesta matkailuoppaasta.", en: "An ice-cream and treat stop during a Mathildedal visit. Check seasonal opening information in the official guide.", es: "Una parada para tomar helado y algo dulce durante la visita. Consulta el horario de temporada en la guía oficial." },
  "Meri-Teijo Golf café and pizzeria": { fi: "Golfkeskuksen kahvila ja kausittainen pizzeriatarjonta. Tarkista palvelut ja aukiolo golfkeskukselta.", en: "A golf-club café and seasonal pizzeria. Confirm current services and opening hours with the club.", es: "Cafetería del club de golf y pizzería de temporada. Confirma los servicios y horarios con el club." },
  "Terho Hills": { fi: "Teijo Ski & Action Parkin yhteydessä mainittu ruokailukohde; varmista kausipalvelut suoraan toimijalta.", en: "A dining option listed with Teijo Ski & Action Park; confirm seasonal services directly with the operator.", es: "Un lugar para comer asociado a Teijo Ski & Action Park; confirma los servicios de temporada con el operador." },
  "Chill Out Fishing": { fi: "Opastettuja kalastus- ja meriretkiä Mathildedalin ympäristössä. Luvat, kausi ja saatavuus tarkistetaan oppaalta.", en: "Guided fishing and sea trips around Mathildedal. Confirm permits, season and availability with the guide.", es: "Excursiones guiadas de pesca y mar en los alrededores de Mathildedal. Confirma permisos, temporada y disponibilidad." },
  "Teijo Ski & Action Park": { fi: "Teijon alueen ulkoaktiviteettikeskus, jonka tarjonta vaihtelee vuodenajan mukaan.", en: "An outdoor activity centre in Teijo with activities that vary by season.", es: "Un centro de actividades al aire libre en Teijo con una oferta que cambia según la temporada." },
  "Hoitola Kukkuvilla": { fi: "Hyvinvointi- ja rentoutumispalveluja. Tarkista ajankohtaiset tunnit ja varaukset suoraan toimijalta.", en: "Wellbeing and relaxation experiences. Check current sessions and bookings directly with the provider.", es: "Experiencias de bienestar y relajación. Consulta las sesiones y reservas actuales con el proveedor." },
  "Kaarnalaiva": { fi: "Mathildedalin ostosoppaassa esitelty paikallinen puoti. Tarkista valikoima ja aukiolo virallisesta oppaasta.", en: "A local shop featured in Mathildedal's shopping guide. Check its selection and opening details in the official guide.", es: "Una tienda local incluida en la guía de compras de Mathildedal. Consulta la oferta y el horario en la guía oficial." },
  "Kyläpanimo Beer Shop": { fi: "Paikallisen kyläpanimon puoti, jonka valikoima vaihtelee sesongin mukaan.", en: "The local village brewery's shop, with a selection that varies by season.", es: "La tienda de la cervecería local, con una selección que cambia según la temporada." },
  "Vinttipuoti": { fi: "Paikallinen puoti Mathildedalin ostosoppaassa. Tarkista ajantasainen aukiolo ennen vierailua.", en: "A local shop listed in Mathildedal's shopping guide. Check current opening details before visiting.", es: "Una tienda local incluida en la guía de compras de Mathildedal. Comprueba el horario antes de ir." },
  "Lähiruoka Puhti": { fi: "Lähiruokaan keskittyvä ostospaikka, jonka tarjonta ja aukiolo voivat vaihdella sesongin mukaan.", en: "A local-food shop whose selection and opening hours may vary by season.", es: "Una tienda de productos locales cuya oferta y horario pueden variar según la temporada." },
  "Matildan kesäkauppa": { fi: "Kesäkauden ostospaikka. Varmista, onko kauppa avoinna vierailusi ajankohtana.", en: "A seasonal summer shop. Check whether it is open during your visit.", es: "Una tienda de temporada de verano. Comprueba si estará abierta durante tu visita." },
  "Dock Helsinki / Piironki": { fi: "Visit Mathildedalin ostosoppaassa mainittu ostoskohde; tarkista ajantasaiset tiedot virallisesta oppaasta.", en: "A shopping listing in Visit Mathildedal's guide; check current details in the official guide.", es: "Un comercio incluido en la guía de Visit Mathildedal; consulta los datos actuales en la guía oficial." },
  "Visit Mathildedal shopping guide": {
    fi: "Virallinen ostosopas auttaa löytämään lisää putiikkeja ja paikallisia tuotteita Mathildedalissa.",
    en: "The official shopping guide helps visitors discover more shops and local products in Mathildedal.",
    es: "La guía oficial de compras ayuda a descubrir más tiendas y productos locales en Mathildedal.",
  },
  "Visit Mathildedal event calendar": {
    fi: "Tarkista tapahtumakalenterista ajankohtaiset päivät ja siirry järjestäjän tietoihin.",
    en: "Check the event calendar for current dates and follow through to organiser information.",
    es: "Consulta el calendario para ver las fechas actuales y acceder a la información del organizador.",
  },
  "Mathildedal Ironworks events": {
    fi: "Ruukin tapahtuma- ja vierailutiedot kannattaa tarkistaa kohteen omalta sivulta.",
    en: "Check the ironworks' own website for current visitor information and events.",
    es: "Consulta la web de la ferrería para obtener información actualizada sobre visitas y eventos.",
  },
};

type CategorySlug = keyof typeof categories;

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!(rawCategory in categories)) return {};
  const category = categories[rawCategory as CategorySlug];
  const locale = (rawLocale in category ? rawLocale : "en") as Locale;
  const c = category[locale];
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "mathildedal/" + rawCategory, image: photoLibrary.mathildedalHarbour });
}

export default async function MathildedalCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!(rawCategory in categories)) notFound();
  const category = categories[rawCategory as CategorySlug];
  const locale = (rawLocale in category ? rawLocale : "en") as Locale;
  const c = category[locale];
  const back = locale === "fi" ? "Takaisin Mathildedalin oppaaseen" : locale === "es" ? "Volver a la guía de Mathildedal" : "Back to the Mathildedal guide";
  const visit = locale === "fi" ? "Palveluntarjoajan sivuille" : locale === "es" ? "Visitar la web del proveedor" : "Visit provider website";
  const providerUrl = (name: string, fallbackUrl: string) => {
    const officialListings: Record<string, string> = {
      "Kyläravintola Terho": "https://visitmathildedal.fi/fi/ravintolat-kahvilat/kylaravintola-terho",
      "Bistro Bruket": "https://visitmathildedal.fi/fi/ravintolat-kahvilat/bistro-bruket",
      "Café Mathildedal": "https://visitmathildedal.fi/fi/ravintolat-kahvilat/cafe-mathildedal",
      "Mathildedalin Keskuspuisto": "https://visitmathildedal.fi/fi/aktiviteetit/mathildedalin-keskuspuisto",
      "Ruukin Kehräämö": "https://visitmathildedal.fi/fi/ostokset/ruukin-kehraamo",
      "Metsäravintola": "https://visitmathildedal.fi/fi/ravintolat-kahvilat/metsaravintola",
      "Matildan kesäkauppa": "https://visitmathildedal.fi/fi/ostokset/matildan-kesakauppa",
    };
    if (officialListings[name]) return officialListings[name];
    if (name === "Visit Mathildedal event calendar" || name === "Visit Mathildedal events") {
      return locale === "fi"
        ? "https://visitmathildedal.fi/fi/tapahtumat"
        : "https://visitmathildedal.fi/en/events";
    }
    if (name === "Mathildedal Ironworks events") {
      return locale === "fi"
        ? "https://mathildedal.fi/tapahtumat/"
        : "https://mathildedal.fi/en/events/";
    }
    if (name === "Mathildedal Ironworks") {
      return locale === "fi"
        ? "https://mathildedal.fi/"
        : "https://mathildedal.fi/en/things-to-do/";
    }
    return fallbackUrl;
  };

  return (
    <main className="min-h-screen bg-white text-brand-950">
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.mathildedalHarbour} alt={c.title} fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 to-brand-950/25" />
        <div className="container-narrow relative py-20 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">Mathildedal · Salo · Finland</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{c.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">{c.intro}</p>
        </div>
      </section>
      <section className="container-narrow py-12 sm:py-16">
        <Link href={`/${locale}/mathildedal`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:underline"><ArrowLeft className="h-4 w-4" />{back}</Link>
        <p className="mt-7 max-w-3xl leading-8 text-slate-600">{c.description}</p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.providers.map((provider) => (
            <article key={provider.name} className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
              <div className="relative h-56 bg-brand-100">
                {provider.image ? <Image src={provider.image} alt={provider.name + " Mathildedalissa"} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100 p-6 text-center"><div><p className="font-semibold text-brand-900">{locale === "fi" ? "Kuva tarkistetaan" : locale === "es" ? "Imagen pendiente de verificar" : "Photo pending verification"}</p><p className="mt-2 text-sm text-slate-600">{locale === "fi" ? "Emme näytä väärää kuvaa." : locale === "es" ? "No mostramos una imagen incorrecta." : "We will not show a mismatched photo."}</p></div></div>}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold">{provider.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{providerDescriptions[provider.name]?.[locale] ?? c.description}</p>
                <p className="mt-3 text-xs text-slate-500">{locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de la imagen" : "Image source"}: {provider.credit}</p>
                <a href={providerUrl(provider.name, provider.url)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:underline">{visit}<ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 rounded-2xl bg-brand-50 p-5 text-sm leading-7 text-slate-600">{locale === "fi" ? "Tiedot, kuvat ja saatavuus tarkistetaan palveluntarjoajien omista lähteistä. Varaus, maksu ja palvelusopimus tehdään suoraan palveluntarjoajan kanssa." : locale === "es" ? "Los datos, las imágenes y la disponibilidad deben comprobarse en las fuentes de cada proveedor. Las reservas, los pagos y los contratos se realizan directamente con el proveedor." : "Details, images and availability should be checked against each provider's own sources. Bookings, payments and service agreements are handled directly by the provider."}</p>
      </section>
    </main>
  );
}
