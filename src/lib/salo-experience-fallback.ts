import type { Experience } from "@/types";

const img = {
  teijo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg",
  mathildedal: "https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg",
  archipelago: "https://cdn-datahub.visitfinland.com/images/2d04f3d0-d2bb-11ed-8ed8-859d0a6307f5.jpeg?s=1200",
  ylöstalo: "https://www.ylostalo.fi/sites/default/files/galleriakuvat/Veneit%C3%A4.jpg",
  rental: "https://cdn.johku.com/naturaviva/largefiles/676/webp/teijo-national-park-rental-shop.webp",
  bike: "https://meriteijobikepark.com/media/alamakipyorailya_teijolla.jpg",
  action: "https://static.wixstatic.com/media/684b51_55ccf848793a4f8fa4f76feaa7f7f779~mv2.jpg",
  kullanpuu: "https://cdn-datahub.visitfinland.com/images/6ea6c060-f008-11ed-8225-2341bac177e9.jpeg?s=1280",
  golf: "https://golf-pass.brightspotcdn.com/ea/6e/37dba4c66386c14950d0e3601306/81507.jpg",
  wiurila: "https://launokorpi.com/sites/default/files/2026-03/Wiurilan-kartano-talousrakennus.-Kuva-Satu-Maaria-Makipuro-e1704382032903.jpg",
  fineDining: "https://cdn-datahub.visitfinland.com/images/803f78a0-e7a8-11ef-a1a5-c5de292a73ba.jpeg",
  sauna: "https://cdn-datahub.visitfinland.com/images/772bd980-c22e-11ed-8fb6-cd05a147400e.jpeg?s=1280",
  forestYoga: "https://cdn-datahub.visitfinland.com/images/b565dda0-cac7-11f0-af1d-279dee19c89a.jpeg?s=1280",
  coast: "https://cdn-datahub.visitfinland.com/images/5b8fb030-095c-11f0-88da-256e05b1f1a0.jpeg?s=1280",
  sheep: "https://02c48f7ae5.cbaul-cdnwnd.com/4b1e4f0584d512bc0a027e1878c5e532/200000001-3c65a3d62c/peltosaari-lampaat-niitylla.JPG?ph=02c48f7ae5",
} as const;

function make(input: {
  id: string;
  slug: string;
  category: string;
  region: string;
  name: Record<"fi"|"es"|"en", string>;
  description: Record<"fi"|"es"|"en", string>;
  shortDescription?: Record<"fi"|"es"|"en", string>;
  image: string;
  providerName: string;
  providerUrl?: string;
  sourceUrl?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  audienceTags?: string[];
  seasonTags?: string[];
  tags?: string[];
  duration?: string;
}): Experience {
  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    description: input.description,
    shortDescription: input.shortDescription || input.description,
    price: 0,
    duration: input.duration || "",
    images: [input.image],
    category: input.category,
    region: input.region,
    providerName: input.providerName,
    providerUrl: input.providerUrl,
    sourceUrl: input.sourceUrl,
    address: input.address,
    coordinates: input.coordinates,
    audienceTags: input.audienceTags || ["couples", "friends", "groups"],
    seasonTags: input.seasonTags || ["spring", "summer", "autumn"],
    experienceTags: input.tags || [],
    verified: true,
    status: "published",
  };
}

export const saloExperienceFallback: Experience[] = [
  make({
    id:"fallback-teijo-national-park", slug:"teijo-national-park", category:"nature", region:"Teijo", image:img.teijo,
    name:{fi:"Teijon kansallispuisto",es:"Parque Nacional de Teijo",en:"Teijo National Park"},
    shortDescription:{fi:"Meri, järvet, metsät ja retkeily samassa maisemassa.",es:"Mar, lagos, bosques y senderismo en un mismo paisaje.",en:"Sea, lakes, forests and hiking in one landscape."},
    description:{fi:"Teijon kansallispuisto yhdistää rannikon, järvet, metsät, retkeilyreitit ja vesiluonnon. Kohteeseen voi tutustua omaan tahtiin ja palvelut tarkistaa suoraan alueen toimijoilta.",es:"El Parque Nacional de Teijo combina costa, lagos, bosques y rutas de senderismo.",en:"Teijo National Park combines coast, lakes, forests and hiking routes in one compact landscape."},
    providerName:"Metsähallitus / Luontoon", providerUrl:"https://www.luontoon.fi/en/destinations/teijo-national-park", sourceUrl:"https://www.visitfinland.com/en/product/4a07b463-4aed-4a37-b8f1-e8aaa494e1c4/teijo-national-park/",
    address:"Matildanjärventie 84, 25660 Salo", coordinates:{lat:60.1980,lng:23.0240}, tags:["forest","lakes","hiking","nature"], duration:"oma tahti"
  }),
  make({
    id:"fallback-teijo-rentals", slug:"teijo-nature-center-rentals", category:"water", region:"Teijo", image:img.rental,
    name:{fi:"Kajakki-, kanootti-, SUP-, soutuvene- ja fatbikevuokraus",es:"Alquiler de kayak, canoa, SUP, bote de remos y fatbike",en:"Kayak, canoe, SUP, rowing boat and fatbike rental"},
    description:{fi:"Vuokraa välineet ja lähde Matildanjärvelle tai Teijon reiteille omaan tahtiin.",es:"Alquila el equipo y explora el lago y el parque nacional a tu ritmo.",en:"Rent equipment and explore the lake and national park at your own pace."},
    providerName:"Natura Viva / Teijon Luontokeskus", providerUrl:"https://naturaviva.fi/en_US/teijo-rental-shop", sourceUrl:"https://visitsalo.fi/aktiviteetit-ja-elamykset/",
    address:"Matildanjärventie 84, 25660 Salo", coordinates:{lat:60.1900,lng:23.0200}, audienceTags:["couples","friends","families"], tags:["kayak","sup","canoe","cycling"], duration:"2–6 h"
  }),
  make({
    id:"fallback-bike-park", slug:"meri-teijo-bike-park", category:"cycling-action", region:"Teijo", image:img.bike,
    name:{fi:"Meri-Teijo Bike Park",es:"Meri-Teijo Bike Park",en:"Meri-Teijo Bike Park"},
    description:{fi:"Hissipyöräilyä, maastopyöräilyä ja sähköfatbikeja kansallispuiston kupeessa.",es:"Descenso, MTB y e-fatbikes junto al Parque Nacional de Teijo.",en:"Downhill, MTB and e-fatbikes beside Teijo National Park."},
    providerName:"Meri-Teijo Bike Park", providerUrl:"https://meriteijobikepark.com/", sourceUrl:"https://visitsalo.fi/aktiviteetit-ja-elamykset/",
    address:"Teijontie 345, 25570 Teijo", coordinates:{lat:60.2080,lng:23.0020}, audienceTags:["friends","groups","families"], seasonTags:["spring","summer","autumn"], tags:["bike","mtb","downhill"], duration:"puolipäivä–päivä"
  }),
  make({
    id:"fallback-teijo-action", slug:"teijo-action-park", category:"cycling-action", region:"Teijo", image:img.action,
    name:{fi:"Teijo Ski & Action Park – kesälajit",es:"Teijo Ski & Action Park – actividades de verano",en:"Teijo Ski & Action Park – summer action"},
    description:{fi:"Rinneautoilua, pyöräilyä, paintballia, tiimitehtäviä ja muita aktiivisia elämyksiä.",es:"Actividades de verano como karts, ciclismo, paintball y retos de equipo.",en:"Summer action including gravity carts, cycling, paintball and team activities."},
    providerName:"Teijo Ski & Action Park", providerUrl:"https://www.meriteijo.fi/kesalajit", sourceUrl:"https://www.visitteijo.com/ulkoilu-ja-urheilu",
    address:"Teijontie 345, 25570 Teijo", coordinates:{lat:60.2080,lng:23.0020}, audienceTags:["families","friends","groups"], seasonTags:["summer"], tags:["action","groups","cycling"], duration:"1–4 h"
  }),
  make({
    id:"fallback-mathildedal", slug:"mathildedal-ironworks", category:"culture-history", region:"Mathildedal", image:img.mathildedal,
    name:{fi:"Mathildedalin ruukkikylä",es:"Pueblo siderúrgico de Mathildedal",en:"Mathildedal Ironworks Village"},
    description:{fi:"Historiallinen merenrantakylä, jossa ruukkiperintö, käsityö, ruoka ja luonto ovat kävelyetäisyydellä.",es:"Un pueblo histórico junto al mar donde se unen patrimonio, artesanía, gastronomía y naturaleza.",en:"A historic seaside village where ironworks heritage, crafts, food and nature meet."},
    providerName:"Visit Mathildedal", providerUrl:"https://www.visitmathildedal.fi/fi", sourceUrl:"https://www.visitfinland.com/en/product/a09cf6d9-036c-41cf-84f6-14138030e611/mathildedal-ironworks-village/",
    address:"Ruukinrannantie 6, 25660 Mathildedal", coordinates:{lat:60.1660,lng:22.9540}, tags:["history","village","sea","slow travel"], duration:"2–4 h"
  }),
  make({
    id:"fallback-forest-bathing", slug:"forest-bathing-teijo", category:"nature", region:"Teijo", image:img.teijo,
    name:{fi:"Metsäkylpy Teijolla",es:"Baño de bosque en Teijo",en:"Forest Bathing in Teijo"},
    description:{fi:"Ohjattu hidastamisen hetki suomalaisessa metsässä.",es:"Una experiencia guiada de naturaleza lenta en el bosque de Teijo.",en:"A guided slow-nature experience in the forest of Teijo."},
    providerName:"LuontoRiihi", providerUrl:"https://www.luontoriihi.fi/finnish-nature-experiences/", sourceUrl:"https://visitsalo.fi/aktiviteetit-ja-elamykset/",
    address:"Teijon alue, Salo", coordinates:{lat:60.2080,lng:23.0000}, tags:["forest","wellness","slow"], duration:"2–3 h"
  }),
  make({
    id:"fallback-nature-exploration", slug:"luonnon-tutkimusmatka-teijo", category:"nature", region:"Teijo", image:img.teijo,
    name:{fi:"Luonnon tutkimusmatka Teijolla",es:"Descubre la naturaleza finlandesa en Teijo",en:"Explore Finnish Nature in Teijo"},
    description:{fi:"Tutustu suomalaisen metsän, järvien ja rannikon erityispiirteisiin.",es:"Descubre los bosques, lagos y costa del sur de Finlandia.",en:"Discover the characteristic forests, lakes and coast of southern Finland."},
    providerName:"LuontoRiihi", providerUrl:"https://www.luontoriihi.fi/finnish-nature-experiences/", sourceUrl:"https://visitsalo.fi/aktiviteetit-ja-elamykset/",
    address:"Teijon alue, Salo", coordinates:{lat:60.2080,lng:23.0000}, tags:["nature","forest","learning"], duration:"2–4 h"
  }),
  make({
    id:"fallback-ylostalo-fishing", slug:"ylostalo-fishing", category:"fishing", region:"Särkisalo", image:img.ylöstalo,
    name:{fi:"Ylöstalon saariston kalastus",es:"Pesca en el archipiélago de Ylöstalo",en:"Ylöstalo Archipelago Fishing"},
    description:{fi:"Saariston kalastus, veneet, mökit ja puusauna. Tarkista palvelut suoraan Ylöstalolta.",es:"Pesca en el archipiélago con barcos, cabañas y sauna de leña.",en:"Archipelago fishing with boats, cottages and a wood-heated sauna."},
    providerName:"Ylöstalo Farm", providerUrl:"https://www.ylostalo.fi/en/vuokraveneet", sourceUrl:"https://www.ylostalo.fi/en/vuokramokit",
    address:"Norrbyntie 135, 25630 Särkisalo", coordinates:{lat:60.0780,lng:22.9600}, tags:["fishing","sea","cottage"], duration:"päivä"
  }),
  make({
    id:"fallback-kraila-cruise", slug:"kraila-cruises", category:"water", region:"Perniö–Särkisalo", image:img.archipelago,
    name:{fi:"Krailan tilan tilausristeily",es:"Crucero privado de Kraila",en:"Kraila Farm Charter Cruise"},
    description:{fi:"Yksityinen saaristoristeily ja merellinen retki tilauksesta.",es:"Cruceros privados por el archipiélago y experiencias marítimas a medida.",en:"Private archipelago cruises and maritime experiences by arrangement."},
    providerName:"Krailan tila", providerUrl:"https://www.krailantila.fi/tilausristeilyt", sourceUrl:"https://visitsalo.fi/sarkisalo-ja-meri/",
    address:"Kuivastontie 410, 25500 Perniö", coordinates:{lat:60.1010,lng:22.9870}, audienceTags:["couples","friends","groups"], tags:["boat","archipelago","sea"], duration:"sopimuksen mukaan"
  }),
  make({
    id:"fallback-valla-sarkisalo", slug:"valla-outdoors", category:"water", region:"Särkisalo", image:img.archipelago,
    name:{fi:"Valla Outdoors – melonta Särkisalossa",es:"Valla Outdoors – kayak en Särkisalo",en:"Valla Outdoors – paddling in Särkisalo"},
    description:{fi:"Kajakkeja ja ohjattuja melontaretkiä Särkisalon saaristossa.",es:"Alquiler de kayaks y excursiones guiadas por el archipiélago.",en:"Kayak rentals and guided paddling in the Särkisalo archipelago."},
    providerName:"Valla Outdoors", providerUrl:"https://vallaoutdoors.com/", sourceUrl:"https://visitsalo.fi/sarkisalo-ja-meri/",
    address:"Särkisalo, Salo", coordinates:{lat:60.0690,lng:22.9000}, tags:["kayak","sea","archipelago"], duration:"2–4 h"
  }),
  make({
    id:"fallback-sarkisalo-route", slug:"sarkisalo-archipelago-route", category:"water", region:"Särkisalo", image:img.coast,
    name:{fi:"Särkisalon saaristokierros",es:"Ruta por el archipiélago de Särkisalo",en:"Särkisalo Archipelago Day"},
    description:{fi:"Merellinen päivä saariston teillä, silloilla, kylissä ja rannoilla.",es:"Un día entre islas, puentes, pueblos y costa.",en:"A maritime day among islands, bridges, villages and shores."},
    providerName:"VisitSalo", providerUrl:"https://visitsalo.fi/sarkisalo-ja-meri/", sourceUrl:"https://visitsalo.fi/sarkisalo-ja-meri/",
    address:"Särkisalo, Salo", coordinates:{lat:60.0800,lng:22.9300}, tags:["archipelago","sea","road trip"], duration:"päivä"
  }),
  make({
    id:"fallback-wiurila", slug:"wiurila-manor", category:"culture-history", region:"Halikko", image:img.wiurila,
    name:{fi:"Wiurilan kartano",es:"Mansión Wiurila",en:"Wiurila Manor"},
    description:{fi:"Kartano, historia, näyttelyt, juhlat, majoitus ja golf historiallisessa miljöössä.",es:"Patrimonio, exposiciones, eventos, alojamiento y golf en un entorno histórico.",en:"Manor heritage, exhibitions, events, accommodation and golf in a historic setting."},
    providerName:"Wiurila Manor", providerUrl:"https://wiurilankartano.fi/", sourceUrl:"https://visitsalo.fi/halikko-ja-wiurila/",
    address:"Viurilantie 126, 24910 Halikko", coordinates:{lat:60.3890,lng:23.0820}, tags:["manor","culture","history"], duration:"2–4 h"
  }),
  make({
    id:"fallback-kullanpuu", slug:"kullanpuu-farm-experience", category:"food-farm", region:"Kirjakkala", image:img.kullanpuu,
    name:{fi:"Kullanpuu – maatila, sauna ja luonto",es:"Kullanpuu – granja, sauna y naturaleza",en:"Kullanpuu – farm, sauna & nature"},
    description:{fi:"Historiallinen maatilamiljöö, puusauna, lähiluonto ja rauhallinen majoitus.",es:"Una granja histórica, sauna, naturaleza y tranquilidad.",en:"A historic farm setting, sauna, nature and a peaceful stay."},
    providerName:"Kullanpuun Maatilamajoitus", providerUrl:"https://www.kullanpuu.fi/", sourceUrl:"https://kohteet.visitsalo.fi/en/kullanpuus-farm-stay/",
    address:"Kirjakkalantie 71, 25570 Teijo", coordinates:{lat:60.2240,lng:23.0050}, audienceTags:["families","friends","groups"], tags:["farm","sauna","nature"], duration:"päivä–yöpyminen"
  }),
  make({
    id:"fallback-golf", slug:"meri-teijo-golf", category:"golf", region:"Teijo", image:img.golf,
    name:{fi:"Meri-Teijo Golf",es:"Meri-Teijo Golf",en:"Meri-Teijo Golf"},
    description:{fi:"18-reikäinen kenttä meren ja Teijon kansallispuiston kupeessa.",es:"Campo de 18 hoyos junto al mar y al Parque Nacional de Teijo.",en:"An 18-hole course beside the sea and Teijo National Park."},
    providerName:"Meri-Teijo Golf", providerUrl:"https://meriteijogolf.com/", sourceUrl:"https://www.teijo.fi/yhdistystoimintaa/meri-teijo-golf/",
    address:"Lanskalantie 56, 25570 Teijo", coordinates:{lat:60.2170,lng:23.0050}, seasonTags:["spring","summer","autumn","winter"], tags:["golf","sea","nature"], duration:"4–5 h"
  }),
  make({
    id:"fallback-chill-grill", slug:"chill-grill-mathildan-marina", category:"water", region:"Mathildedal", image:img.coast,
    name:{fi:"Chill & Grill – veneretki saareen",es:"Chill & Grill – excursión en barco a una isla",en:"Chill & Grill – boat trip to an island"},
    description:{fi:"Merellinen noin kahden tunnin retki ja nuotiohetki pienelle ryhmälle.",es:"Una excursión marítima de unas dos horas con parada y ambiente de fuego.",en:"A roughly two-hour maritime outing with an island stop and campfire atmosphere."},
    providerName:"Mathildan Marina", providerUrl:"https://mathildanmarina.fi/aktiviteetit/", sourceUrl:"https://mathildanmarina.fi/aktiviteetit/",
    address:"Ruukinrannantie 4, 25660 Mathildedal", coordinates:{lat:60.1660,lng:22.9590}, tags:["boat","food","sea","slow"], duration:"~2 h"
  }),
  make({
    id:"fallback-midnight-sun", slug:"midnight-sun-teijo", category:"nature", region:"Teijo", image:img.mathildedal,
    name:{fi:"Keskiyön aurinko Teijolla",es:"Sol de medianoche en Teijo",en:"Midnight Sun at Teijo"},
    description:{fi:"Pitkä valoisa kesäilta Teijon metsässä ja järvien äärellä.",es:"Una larga tarde de verano bajo la luz del norte.",en:"A long Nordic summer evening in the forests and lakes of Teijo."},
    providerName:"Hotel Mathildedal", providerUrl:"https://www.mathildedal.fi/", sourceUrl:"https://visitsalo.fi/aktiviteetit-ja-elamykset/",
    address:"Mathildedal, Salo", coordinates:{lat:60.1660,lng:22.9540}, seasonTags:["summer"], tags:["summer","nature","slow"], duration:"ilta"
  }),
  make({
    id:"fallback-gicel", slug:"gicel-rikalanmaki", category:"culture-history", region:"Halikko", image:img.wiurila,
    name:{fi:"Gicel-elämys Rikalanmäellä",es:"Experiencia Gicel en Rikalanmäki",en:"Gicel Experience at Rikalanmäki"},
    description:{fi:"Historiaa, paikallisia makuja ja Rikalanmäen miljöö yhdessä elämyksessä.",es:"Historia, sabores locales y ambiente histórico en Rikalanmäki.",en:"History, local flavours and a historic setting at Rikalanmäki."},
    providerName:"Ravintola Rikalan Krouvi", providerUrl:"https://rikalankrouvi.fi/gicel-experience/", sourceUrl:"https://www.visitfinland.com/en/product/8956b302-2d04-427d-8bd3-f46b653e97c3/taste-the-gicel-experience-at-rikalanmaki/",
    address:"Rikalantie 74, 24800 Halikko, Salo", coordinates:{lat:60.3900,lng:23.0900}, tags:["history","food","local"], duration:"2–3 h"
  }),
  make({
    id:"fallback-cinnamon-bun", slug:"cinnamon-bun-baking-mathildedal", category:"food-farm", region:"Mathildedal", image:img.mathildedal,
    name:{fi:"Korvapuustien leivonta Mathildedalissa",es:"Taller de bollos de canela en Mathildedal",en:"Cinnamon Bun Baking in Mathildedal"},
    description:{fi:"Leivo suomalaisia korvapuusteja paikallisessa kylämiljöössä.",es:"Aprende a hornear los clásicos bollos de canela finlandeses.",en:"Learn to bake classic Finnish cinnamon buns in Mathildedal."},
    providerName:"Hotel Mathildedal", providerUrl:"https://www.mathildedal.fi/", sourceUrl:"https://visitsalo.fi/en/local-food/",
    address:"Ruukinrannantie 6, 25660 Mathildedal", coordinates:{lat:60.1660,lng:22.9540}, tags:["baking","food","local"], duration:"2–3 h"
  }),
  make({
    id:"fallback-fine-dining", slug:"fine-dining-finnish-forest", category:"food-farm", region:"Teijo", image:img.fineDining,
    name:{fi:"Fine dining Suomen metsässä",es:"Alta cocina en el bosque finlandés",en:"Fine Dining in the Finnish Forest"},
    description:{fi:"Neljä ruokalajia luonnon keskellä, paikallisia ja kauden raaka-aineita.",es:"Cuatro platos con ingredientes locales y de temporada en Teijo.",en:"A four-course forest restaurant experience built around local seasonal ingredients."},
    providerName:"Teijo Cafe & Bakery / Metsäravintola", providerUrl:"https://www.metsaravintola.fi/", sourceUrl:"https://www.visitfinland.com/en/product/6b46dcd7-e6fb-4e39-8db8-74a30b556edc/fine-dining-experience-in-the-finnish-forest/",
    address:"Matildajärventie 84, 25660 Salo", coordinates:{lat:60.2050,lng:23.0000}, audienceTags:["couples","friends","groups"], tags:["food","forest","local"], duration:"illallinen"
  }),
  make({
    id:"fallback-power-steam", slug:"power-of-steam-mathildan-marina", category:"sauna-wellness", region:"Mathildedal", image:img.sauna,
    name:{fi:"The Power of Steam – sauna Mathildan Marinassa",es:"The Power of Steam – sauna en Mathildan Marina",en:"The Power of Steam – Sauna at Mathildan Marina"},
    description:{fi:"Yksityinen saunahetki meren äärellä, ympäri vuoden.",es:"Una experiencia privada de sauna junto al mar durante todo el año.",en:"A private seaside sauna moment available year-round."},
    providerName:"Mathildan Marina", providerUrl:"https://mathildanmarina.fi/aktiviteetit/", sourceUrl:"https://www.visitfinland.com/en/product/c2b280b9-c2bd-4c19-802a-e5528df32946/the-power-of-steam-relax-in-sauna-at-mathildan-marina/",
    address:"Ruukinrannantie 4, 25660 Mathildedal", coordinates:{lat:60.1660,lng:22.9590}, seasonTags:["spring","summer","autumn","winter"], tags:["sauna","wellness","sea"], duration:"1,5 h"
  }),
  make({
    id:"fallback-forest-yoga", slug:"forest-yoga-sound-bowls-teijo", category:"sauna-wellness", region:"Teijo", image:img.forestYoga,
    name:{fi:"Metsäjooga & äänimaljarentoutus",es:"Yoga en el bosque y relajación con cuencos",en:"Forest Yoga & Sound Bowl Relaxation"},
    description:{fi:"Joogaa järven ja mäntymetsän äärellä Teijon kansallispuistossa.",es:"Yoga y sonido junto a los lagos y bosques de pinos de Teijo.",en:"Yoga and sound relaxation beside the lakes and pine forests of Teijo."},
    providerName:"Hoitola Kukkuvilla", providerUrl:"https://hoitolakukkuvilla.fi/hoitola-kukkuvilla-in-english/", sourceUrl:"https://kohteet.visitsalo.fi/en/forest-yoga-sound-bowl-relaxation-or-both/",
    address:"Teijon kansallispuisto, Matildanjärventie 86, 25660 Mathildedal", coordinates:{lat:60.1900,lng:23.0200}, tags:["forest","yoga","wellness","slow"], duration:"1–2 h"
  }),
  make({
    id:"fallback-outdoor-skills", slug:"private-outdoor-skills-valla", category:"nature", region:"Perniö", image:img.teijo,
    name:{fi:"Erätaidot & vuolutyöpaja – Valla Outdoors",es:"Naturaleza y talla de madera – Valla Outdoors",en:"Outdoor Skills & Carving – Valla Outdoors"},
    description:{fi:"Tulenteko, suunnistus, retkeilytaidot ja oman puulusikan vuolu pienryhmässä.",es:"Fuego, orientación, acampada y talla de una cuchara de madera.",en:"Fire making, navigation, outdoor skills and carving your own wooden spoon."},
    providerName:"Valla Outdoors", providerUrl:"https://vallaoutdoors.com/", sourceUrl:"https://kohteet.visitsalo.fi/en/private-outdoors-skills-group-activity/",
    address:"Hamarijärventie 77, 25570 Salo", audienceTags:["friends","groups","families"], tags:["outdoors","fire","crafts"], duration:"3–4 h"
  }),
  make({
    id:"fallback-kisko-kayak", slug:"kisko-river-kayaking-latokartanonkoski", category:"water", region:"Salo", image:img.coast,
    name:{fi:"Kiskojoen melonta & Latokartanonkosken luontoretki",es:"Kayak por el río Kisko y senderismo",en:"Kisko River Kayaking & Latokartanonkoski Hike"},
    description:{fi:"Kevyt jokimelonta yhdistyy historiaan ja metsäpolkuun yksityisellä retkellä.",es:"Paseo en kayak, senderismo guiado e historia local.",en:"A gentle river paddle combined with a nature walk and local history."},
    providerName:"Valla Outdoors", providerUrl:"https://vallaoutdoors.johku.com/en_US/salo-kayaking/kisko-river-kayaking-latokartanonkoski-hike", sourceUrl:"https://kohteet.visitsalo.fi/en/private-river-kayaking-and-a-hike-in-salo/",
    address:"Hästöntie 116, 25500 Salo", coordinates:{lat:60.132354,lng:23.157201}, tags:["kayaking","hiking","river","history"], duration:"~3 h"
  }),
  make({
    id:"fallback-beach-yoga", slug:"gentle-beach-yoga-forby", category:"sauna-wellness", region:"Förby", image:img.coast,
    name:{fi:"Lempeä rantajooga Förbyssä",es:"Yoga suave en la playa de Förby",en:"Gentle Beach Yoga at Förby"},
    description:{fi:"Lempeä joogatuokio meren läheisyydessä Särkisalon seudulla.",es:"Yoga matinal junto al mar en la zona de Särkisalo.",en:"A gentle morning yoga session by the sea in the Särkisalo area."},
    providerName:"Hoitola Kukkuvilla", providerUrl:"https://hoitolakukkuvilla.fi/", sourceUrl:"https://www.visitfinland.com/en/product/f9a436f0-ec70-4097-94be-fe7ac81bea0a/gentle-beach-yoga-at-forby-marina/",
    address:"Förby, 25640 Salo", audienceTags:["couples","friends","adults"], seasonTags:["summer"], tags:["sea","yoga","wellness","slow"], duration:"75 min"
  }),
  make({
    id:"fallback-peltosaari", slug:"peltosaari-farm", category:"food-farm", region:"Perniö", image:img.sheep,
    name:{fi:"Peltosaaren lammastila",es:"Granja ovina Peltosaari",en:"Peltosaari Sheep Farm"},
    description:{fi:"Paikallista maatilan elämää, lampaita ja lähiruokaa Perniössä.",es:"Vida rural, ovejas y productos locales en Perniö.",en:"Farm life, sheep and local food in Perniö."},
    providerName:"Peltosaaren luomulammastila", providerUrl:"https://peltosaarenluomulammastila.fi/", sourceUrl:"https://peltosaarenluomulammastila.fi/",
    address:"Perniö, Salo", audienceTags:["families","friends","groups"], tags:["farm","sheep","local food"], duration:"sopimuksen mukaan"
  }),
];

export function getSaloExperienceFallback(): Experience[] {
  return saloExperienceFallback;
}
