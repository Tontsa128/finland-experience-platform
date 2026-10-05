-- FINNEXPRIENCE Salo experience guide: editorial locations, direct provider links and map coordinates.
-- This is a discovery directory, not a package-travel or combined booking product.
ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
  ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS provider_direct_url TEXT,
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS editorial_verified BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_experiences_location ON public.experiences(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_experiences_editorial_verified ON public.experiences(editorial_verified);

-- Editorial categories used by the Salo pilot.
INSERT INTO public.experience_categories (slug,name_fi,name_es,icon)
VALUES
 ('nature','Luonto','Naturaleza','Trees'),
 ('water','Vesi & saaristo','Agua y archipiélago','Waves'),
 ('sauna-wellness','Sauna & hyvinvointi','Sauna y bienestar','Sparkles'),
 ('cycling-action','Pyöräily & aktiivinen','Ciclismo y actividad','Bike'),
 ('food-farm','Ruoka & maatilat','Gastronomía y granjas','Wheat'),
 ('culture-history','Kulttuuri & historia','Cultura e historia','Landmark'),
 ('golf','Golf','Golf','Flag'),
 ('fishing','Kalastus','Pesca','Fish')
ON CONFLICT (slug) DO UPDATE SET name_fi=EXCLUDED.name_fi,name_es=EXCLUDED.name_es,icon=EXCLUDED.icon;

-- Make sure the pilot destination exists. Existing destination content is preserved.
INSERT INTO public.destinations (slug,region,latitude,longitude,status,published_at)
VALUES ('salo-mathildedal','Southwest Finland',60.1660,22.9540,'published',now())
ON CONFLICT (slug) DO UPDATE SET region=EXCLUDED.region,latitude=COALESCE(public.destinations.latitude,EXCLUDED.latitude),longitude=COALESCE(public.destinations.longitude,EXCLUDED.longitude),status='published',published_at=COALESCE(public.destinations.published_at,now());

INSERT INTO public.destination_translations(destination_id,language_code,name,short_description,full_description)
SELECT d.id,'fi','Salo, Mathildedal, Teijo & Särkisalo','Meri, ruukkikylät, kansallispuisto, maatilat ja saaristo.','Salon eteläisen alueen elämykset yhdistävät Teijon kansallispuiston, Mathildedalin ruukkikylän, maaseudun, saunat ja Särkisalon saariston.')
FROM public.destinations d WHERE d.slug='salo-mathildedal'
ON CONFLICT(destination_id,language_code) DO UPDATE SET name=EXCLUDED.name,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description;
INSERT INTO public.destination_translations(destination_id,language_code,name,short_description,full_description)
SELECT d.id,'es','Salo, Mathildedal, Teijo y Särkisalo','Mar, pueblos históricos, parque nacional, granjas y archipiélago.','Los paisajes del sur de Salo combinan el Parque Nacional de Teijo, Mathildedal, la vida rural, las saunas y el archipiélago de Särkisalo.')
FROM public.destinations d WHERE d.slug='salo-mathildedal'
ON CONFLICT(destination_id,language_code) DO UPDATE SET name=EXCLUDED.name,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description;
INSERT INTO public.destination_translations(destination_id,language_code,name,short_description,full_description)
SELECT d.id,'en','Salo, Mathildedal, Teijo & Särkisalo','Sea, ironworks villages, national park, farms and archipelago.','Southern Salo brings together Teijo National Park, Mathildedal, rural Finland, sauna culture and the Särkisalo archipelago.')
FROM public.destinations d WHERE d.slug='salo-mathildedal'
ON CONFLICT(destination_id,language_code) DO UPDATE SET name=EXCLUDED.name,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description;

DO $$
DECLARE
  r RECORD;
  eid BIGINT;
  pid UUID;
  mid UUID;
  did BIGINT;
  cid BIGINT;
BEGIN
  SELECT id INTO did FROM public.destinations WHERE slug='salo-mathildedal' LIMIT 1;

  FOR r IN
    SELECT * FROM (VALUES
      ('teijo-national-park','nature','Teijon kansallispuisto','Teijo National Park','Parque Nacional de Teijo',60.1980,23.0240,'Matildanjärventie 84, 25660 Salo','https://www.visitfinland.com/en/product/4a07b463-4aed-4947-b8f1-e8aaa494e1c4/teijo-national-park/','https://visitsalo.fi/teijon-kansallispuisto/','Teijon kansallispuisto','Teijo National Park','Parque Nacional de Teijo','Meri-, järvi- ja metsämaisemat, retkeily, melonta ja kalastus muodostavat Salon tunnetuimman luontoelämyksen.','Coast, lakes, forests, hiking, canoeing and fishing meet in one national-park experience.','Bosques, lagos, costa, senderismo, piragüismo y pesca en un solo destino.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','nature'),
      ('teijo-nature-center-rentals','water','Kajakki-, kanootti-, SUP-, soutuvene- ja fatbikevuokraus','Kayak, canoe, SUP, rowing boat and fatbike rental','Alquiler de kayak, canoa, SUP, bote de remos y fatbike',60.1900,23.0200,'Matildanjärventie 84, 25660 Salo','https://naturaviva.fi/en_US/teijo-rental-shop','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Natura Viva / Teijon Luontokeskus','Natura Viva / Teijo Nature Center','Natura Viva / Centro de Naturaleza de Teijo','Lähde järvelle tai kansallispuiston reiteille vuokrakalustolla ja omaan tahtiin.','Rent equipment for the lake and national park and explore at your own pace.','Alquila el equipo y explora el lago y el parque nacional a tu ritmo.','https://cdn.johku.com/naturaviva/largefiles/676/webp/teijo-national-park-rental-shop.webp','water'),
      ('meri-teijo-bike-park','cycling-action','Meri-Teijo Bike Park','Meri-Teijo Bike Park','Meri-Teijo Bike Park',60.2080,23.0020,'Teijontie 345, 25570 Teijo','https://meriteijobikepark.com/','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Meri-Teijo Bike Park','Meri-Teijo Bike Park','Meri-Teijo Bike Park','Hissi- ja maastopyöräilyä, sähköfatbikeja, vuokrausta ja valmennusta kansallispuiston kainalossa.','Lift-accessed downhill riding, MTB, e-fatbikes, rentals and coaching beside the national park.','Descenso, MTB, e-fatbikes, alquiler y entrenamiento junto al parque nacional.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','cycling'),
      ('teijo-action-park','cycling-action','Teijo Ski & Action Park – rinneautoilu ja ryhmäelämykset','Teijo Ski & Action Park – gravity carts and group activities','Teijo Ski & Action Park – karts y actividades de grupo',60.2080,23.0020,'Teijontie 345, 25570 Teijo','https://www.meriteijo.fi/kesalajit','https://visitteijo.com/ulkoilu-ja-urheilu','Teijo Ski & Action Park','Teijo Ski & Action Park','Teijo Ski & Action Park','Rinneautoilua, pyöräilyä, paintballia, laser trapia ja muita ryhmäaktiviteetteja.','Gravity-carting, cycling, paintball, laser trap and other group activities.','Karting de gravedad, ciclismo, paintball, laser trap y actividades de grupo.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','action'),
      ('matildajarvi-sauna','sauna-wellness','Matildanjärven rantasauna','Matildanjärvi Lakeside Sauna','Sauna junto al lago Matildanjärvi',60.1900,23.0200,'Matildanjärventie 84, 25660 Salo','https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop','https://www.visitmathildedal.fi/fi/aktiviteetit/uimarannat-ja-vuokrasaunat','Natura Viva / Teijon Luontokeskus','Natura Viva / Teijo Nature Center','Natura Viva / Centro de Naturaleza de Teijo','Perinteinen suomalainen sauna järven rannalla – löylyjen jälkeen voi pulahtaa järveen.','A traditional Finnish sauna by the lake, with a chance for a refreshing swim.','Una sauna finlandesa junto al lago, con posibilidad de bañarse después de la sauna.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Traditional_Finnish_smoke_sauna.jpg','sauna'),
      ('mathildan-marina-sauna','sauna-wellness','Mathildan Marinan sauna & poreallas','Mathildan Marina sauna & hot tub','Sauna y jacuzzi de Mathildan Marina',60.1660,22.9590,'Ruukinrannantie 4, 25660 Mathildedal','https://mathildanmarina.fi/saunat/','https://mathildanmarina.fi/saunat/','Mathildan Marina','Mathildan Marina','Mathildan Marina','Yksityinen saunaosasto, meriterassi ja mahdollisuus ulkoporealtaaseen Mathildedalin satamassa.','A private sauna area, sea-view terrace and optional outdoor hot tub at the harbour.','Sauna privada, terraza con vistas al mar y jacuzzi opcional en el puerto.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Traditional_Finnish_sauna_whisking_and_l%C3%B6yly.jpg','sauna'),
      ('mathildan-marina-pier-yoga','sauna-wellness','Laiturijooga Mathildan Marinassa','Pier Yoga at Mathildan Marina','Yoga en el muelle de Mathildan Marina',60.1660,22.9590,'Ruukinrannantie 4, 25660 Mathildedal','https://mathildanmarina.fi/aktiviteetit/','https://www.visitmathildedal.fi/fi/aktiviteetit/herata-aistit-ja-hoivaa-kehoa','Mathildan Marina','Mathildan Marina','Mathildan Marina','Joogaa meren äärellä ja rauhallinen hetki ruukkikylän satamassa.','Yoga by the sea and a calm pause in the ironworks village harbour.','Yoga junto al mar y un momento de calma en el puerto.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Mathildedal_harbour_sunset.jpg','wellness'),
      ('forest-bathing-teijo','nature','Metsäkylpy Teijolla','Forest Bathing in Teijo','Baño de bosque en Teijo',60.2080,23.0000,'Hamarinjärventie 62, 25570 Teijo','https://www.visitmathildedal.fi/fi/aktiviteetit/herata-aistit-ja-hoivaa-kehoa','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Visit Mathildedal / local guide','Visit Mathildedal / local guide','Visit Mathildedal / guía local','Ohjattu luonnossa rauhoittuminen, jossa metsästä tehdään aistien ja palautumisen paikka.','A guided slow-nature experience focused on the senses and recovery.','Una experiencia guiada de naturaleza lenta centrada en los sentidos y el bienestar.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','wellness'),
      ('luonnon-tutkimusmatka-teijo','nature','Luonnon tutkimusmatka Teijolla','Explore Finnish Nature in Teijo','Descubre la naturaleza finlandesa en Teijo',60.2080,23.0000,'Hamarinjärventie 62, 25570 Teijo','https://www.visitmathildedal.fi/fi/aktiviteetit/herata-aistit-ja-hoivaa-kehoa','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Visit Mathildedal / local guide','Visit Mathildedal / local guide','Visit Mathildedal / guía local','Tutustutaan suomalaisen metsän, järvien ja rannikon erityispiirteisiin.','Discover the characteristic forests, lakes and coast of southern Finland.','Descubre los bosques, lagos y costa del sur de Finlandia.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','nature'),
      ('mathildedal-ironworks','culture-history','Mathildedalin ruukkikylä ja ruukkitehtaat','Mathildedal Ironworks Village','Pueblo siderúrgico de Mathildedal',60.1660,22.9540,'Ruukinrannantie 6, 25660 Mathildedal','https://www.visitmathildedal.fi/fi','https://www.visitmathildedal.fi/fi','Visit Mathildedal','Visit Mathildedal','Visit Mathildedal','Historiallinen merenrantakylä, jossa ruukin rakennukset, käsityö, ravintolat ja luonto ovat kävelyetäisyydellä.','A historic seaside village where ironworks heritage, crafts, food and nature meet.','Un pueblo histórico junto al mar donde se unen patrimonio, artesanía, gastronomía y naturaleza.','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','culture'),
      ('mathildedal-guided-tour','culture-history','Opastettu ruukkikierros','Guided Ironworks Tour','Visita guiada del pueblo siderúrgico',60.1660,22.9540,'Ruukinrannantie 6, 25660 Mathildedal','https://visitmathildedal.fi/fi/node/135','https://www.visitmathildedal.fi/fi/node/135','Hotel & Café Mathildedal / local guides','Hotel & Café Mathildedal / local guides','Hotel & Café Mathildedal / guías locales','Kylän historia, vanhat ruukkirakennukset ja Teijon teollinen perintö yhden kierroksen aikana.','Learn the village story, historic buildings and industrial heritage with a local guide.','Conoce la historia, los edificios históricos y el patrimonio industrial con un guía local.','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','culture'),
      ('mathildedal-keskuspuisto','cycling-action','Mathildedalin Keskuspuisto','Mathildedal Central Park','Parque Central de Mathildedal',60.1670,22.9550,'Tullintie 2, 25660 Mathildedal','https://visitmathildedal.fi/fi/aktiviteetit','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Mathildedalin Keskuspuisto','Mathildedal Central Park','Mathildedal Central Park','Minigolfia, padelia, tennistä ja vuokrattavaa tekemistä keskellä ruukkikylää.','Adventure mini-golf, padel, tennis and rentals in the heart of the village.','Minigolf, pádel, tenis y alquileres en el corazón del pueblo.','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','family'),
      ('vaski-cider','food-farm','Vaski Cider & Distillery – kierros ja tasting','Vaski Cider & Distillery – tour & tasting','Vaski Cider & Distillery – visita y degustación',60.3620,23.1800,'Vaskiontie 418, 24800 Salo','https://www.vaskicider.fi/','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Vaski Cider & Distillery','Vaski Cider & Distillery','Vaski Cider & Distillery','Paikalliseen omenaan ja käsityöhön perustuva siiderikokemus, kierros ja tasting.','A local craft-cider experience with a tour and tasting.','Una experiencia de sidra artesanal local con visita y degustación.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg','food'),
      ('matildankartano','food-farm','Matildankartano – leipomo, kahvila ja lähiruoka','Matildankartano – bakery, café and local food','Matildankartano – panadería, café y sabores locales',60.1660,22.9530,'Bremerintie 4, 25660 Mathildedal','https://matildankartano.johku.com/','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Matildankartano','Matildankartano','Matildankartano','Hapanjuurileipomo, kahvila, lounas, aamupala ja käsintehtyjä herkkuja ruukkikylän sydämessä.','Sourdough bakery, café, lunch, breakfast and handmade treats in the village.','Panadería de masa madre, café, almuerzo, desayuno y dulces artesanales.','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','food'),
      ('pohjolan-farm','food-farm','Pohjolan tila – maatilapuoti ja tastingit','Pohjola Farm – farm shop and tastings','Granja Pohjola – tienda y degustaciones',60.2590,23.1730,'Tieksmäentie 459, 25460 Kisko','https://pohjolanmaatila.fi/','https://www.visitfinland.com/en/product/42c97a8c-e856-4ddd-89f8-4c6729922ca4/pohjola-farm/','Pohjolan tila','Pohjola Farm','Granja Pohjola','Marjoja, jalosteita, tilapuoti, kesäkahvila sekä tastingeja, iltapäiväteetä ja ryhmätapahtumia.','Farm produce, a shop, summer café, tastings, afternoon teas and group visits.','Productos de la granja, tienda, café de verano, degustaciones y visitas de grupos.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg','farm'),
      ('peltosaari-farm','food-farm','Peltosaaren luomulammastila – lammaselämys','Peltosaari Organic Sheep Farm','Granja ovina ecológica Peltosaari',60.2580,23.0660,'Lehtiniityntie 52, 25560 Koski as','https://peltosaarenluomulammastila.fi/','https://kohteet.visitsalo.fi/peltosaaren-luomulammastila/','Peltosaaren luomulammastila','Peltosaari Organic Sheep Farm','Granja ovina ecológica Peltosaari','Suomenlampaita, luomutuotteita, maatilamatkailua ja lammaspaimenviikkoja.','Finnish sheep, organic products, farm tourism and shepherd weeks.','Ovejas finlandesas, productos ecológicos, turismo rural y semanas como pastor.','https://www.storfinnhova.com/wp-content/uploads/2025/10/080925-Kemio-tilakuvat-web-117_cropped.jpg','farm'),
      ('ketolan-animal-farm','food-farm','Ketolan kotieläintila','Ketola Animal Farm','Granja de animales Ketola',60.1740,23.1380,'Sormijärventie 265, 25500 Perniö','https://ketolankotielaintila.wordpress.com/','https://visitsalo.fi/aktiviteetit-ja-elamykset/','Ketolan Kotieläintila','Ketola Animal Farm','Granja de animales Ketola','Kotieläimiä, poniratsastusta, opastettuja kierroksia ja ryhmävierailuja ajanvarauksella.','Farm animals, pony rides, guided visits and group visits by appointment.','Animales, paseos en poni, visitas guiadas y grupos con reserva previa.','https://www.storfinnhova.com/wp-content/uploads/2025/10/080925-Kemio-tilakuvat-web-117_cropped.jpg','farm'),
      ('alaspaa-farm','food-farm','Alaspään maatila – luomutila','Alaspää Organic Farm','Granja ecológica Alaspää',60.1660,23.1000,'Saarenjärventie 536, 25500 Perniö','https://alaspaanmaatila.fi/','https://alaspaanmaatila.fi/yhteystiedot/','Alaspään maatila','Alaspää Organic Farm','Granja ecológica Alaspää','Luomumansikoita, vihanneksia ja luonnontuotteita. Vierailu sovitaan etukäteen.','Organic berries, vegetables and wild products; visits should be arranged in advance.','Frutas, verduras y productos silvestres ecológicos; las visitas se acuerdan con antelación.','https://www.storfinnhova.com/wp-content/uploads/2025/10/080925-Kemio-tilakuvat-web-117_cropped.jpg','farm'),
      ('kurjen-farm','food-farm','Kurjen maatila – itsepoiminta','Kurjen Farm – pick your own','Granja Kurjen – recogida propia',60.3460,23.1900,'Inkereentie 638, 25180 Pertteli','https://kurjenmaatila.fi/','https://kohteet.visitsalo.fi/kurjen-maatila/','Kurjen maatila','Kurjen Farm','Granja Kurjen','Mansikkaa suoraan tilalta ja itsepoimintaa satokaudella.','Strawberries sold directly from the farm and pick-your-own during the season.','Fresas directamente de la granja y recogida propia durante la temporada.','https://www.storfinnhova.com/wp-content/uploads/2025/10/080925-Kemio-tilakuvat-web-117_cropped.jpg','farm'),
      ('leipyoli-farm','food-farm','Leipyölin tila – ylämaankarja ja maatilamatkailu','Leipyöli Farm – Highland cattle & farm stay','Granja Leipyöli – ganado Highland y turismo rural',60.2210,23.1760,'Leipyölintie 218, 25500 Perniö','https://leipyoli.com/','https://visitsalo.fi/en/routes/coastal-route/','Leipyölin tila','Leipyöli Farm','Granja Leipyöli','Ylämaankarjaa, maatilamajoitusta, ruokapalveluita ja jokimaisemia.','Highland cattle, farm accommodation, food services and river landscapes.','Ganado Highland, alojamiento rural, comida y paisajes junto al río.','https://www.storfinnhova.com/wp-content/uploads/2025/10/080925-Kemio-tilakuvat-web-117_cropped.jpg','farm'),
      ('ylostalo-fishing','fishing','Ylöstalon saariston kalastus','Ylöstalo Archipelago Fishing','Pesca en el archipiélago de Ylöstalo',60.0780,22.9600,'Norrbyntie 135, 25630 Särkisalo','https://www.ylostalo.fi/en/vuokramokit','https://kohteet.visitsalo.fi/en/','Ylöstalo Farm','Ylöstalo Farm','Granja Ylöstalo','Saariston kalastus, veneet, mökit ja puusauna. Kalastuspalvelut ja saatavuus tarkistetaan suoraan palveluntarjoajalta.','Archipelago fishing with boats, cottages and wood-heated sauna. Check services and availability directly with the provider.','Pesca en el archipiélago con barcos, cabañas y sauna de leña. Consulta directamente la disponibilidad.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Ulkoluotosilta3.jpg','fishing'),
      ('kraila-cruises','water','Krailan tilan tilausristeily','Kraila Farm Charter Cruise','Crucero privado de Kraila',60.1010,22.9870,'Kuivastontie 410, 25500 Perniö','https://www.krailantila.fi/tilausristeilyt','https://visitsalo.fi/sarkisalo-ja-meri/','Krailan tila','Kraila Farm','Granja Kraila','Yksityinen saaristoristeily, merimaisemat ja tilauksesta rakennettavat elämykset.','Private archipelago cruises and tailor-made maritime experiences.','Cruceros privados por el archipiélago y experiencias marítimas a medida.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Ulkoluotosilta3.jpg','water'),
      ('valla-outdoors','water','Valla Outdoors – melonta Särkisalossa','Valla Outdoors – paddling in Särkisalo','Valla Outdoors – kayak en Särkisalo',60.0690,22.9000,'Särkisalo, Salo','https://vallaoutdoors.com/','https://visitsalo.fi/sarkisalo-ja-meri/','Valla Outdoors','Valla Outdoors','Valla Outdoors','Kajakkeja ja ohjattuja melontaretkiä Särkisalon saaristossa.','Kayak rentals and guided paddling in the Särkisalo archipelago.','Alquiler de kayaks y excursiones guiadas por el archipiélago de Särkisalo.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Ulkoluotosilta3.jpg','water'),
      ('aava-adventures','water','Aava Adventures – melonta ja saaristomajoitus','Aava Adventures – paddling and archipelago stay','Aava Adventures – kayak y alojamiento',60.0700,22.9100,'Uudenkyläntie 65, 25640 Särkisalo','https://visitsalo.fi/sarkisalo-ja-meri/','https://kohteet.visitsalo.fi/location/sarkisalo/page/2/','Aava Adventures','Aava Adventures','Aava Adventures','Mökkimajoitusta ja melontaa Särkisalon merellisissä maisemissa. Tarkista palvelut suoraan toimijalta.','Cottage accommodation and paddling in the maritime Särkisalo landscape. Check services directly with the provider.','Alojamiento en cabaña y kayak en el paisaje marítimo de Särkisalo. Consulta los servicios con el proveedor.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Ulkoluotosilta3.jpg','water'),
      ('wiurila-manor','culture-history','Wiurilan kartano','Wiurila Manor','Mansión Wiurila',60.3890,23.0820,'Viurilantie 126, 24910 Halikko','https://wiurilankartano.fi/','https://visitsalo.fi/halikko-ja-wiurila/','Wiurila Manor','Wiurila Manor','Mansión Wiurila','Kartano, historia, näyttelyt, juhlat, majoitus ja golf samassa miljöössä.','Manor heritage, exhibitions, events, accommodation and golf in one historic setting.','Patrimonio, exposiciones, eventos, alojamiento y golf en un entorno histórico.','https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg','culture'),
      ('teijon-masuuni','culture-history','Teijon Masuuni','Teijo Masuuni','Teijo Masuuni',60.2110,22.9560,'Masuunintie 8, 25570 Teijo','https://www.teijonmasuuni.fi/','https://visitteijo.com/','Teijon Masuuni','Teijo Masuuni','Teijo Masuuni','Taide, käsityö, näyttelyt ja ruukkikylän kulttuuriperintö vanhan masuunin ympärillä.','Art, crafts, exhibitions and ironworks heritage around the old blast furnace.','Arte, artesanía, exposiciones y patrimonio industrial alrededor del antiguo alto horno.','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','culture')
    ) AS x(slug,cat,title_fi,title_en,title_es,lat,lon,address,provider_url,source_url,provider_fi,provider_en,provider_es,desc_fi,desc_en,desc_es,image_url,tag)
  LOOP
    SELECT id INTO cid FROM public.experience_categories WHERE slug=r.cat LIMIT 1;
    IF cid IS NULL THEN CONTINUE; END IF;

    INSERT INTO public.providers(id,name,slug,provider_type,description_fi,description_en,description_es,website_url,region,verified,verified_at,verified_notes,active,featured)
    VALUES (
      uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:'||r.slug),
      r.provider_fi,
      r.slug||'-provider',
      'experience',
      r.desc_fi,r.desc_en,r.desc_es,
      r.provider_url,
      'Salo',
      true,now(),
      'Editorial source checked against the provider or official tourism source. This is not a commercial partnership claim.',
      true,false
    )
    ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name,website_url=EXCLUDED.website_url,description_fi=EXCLUDED.description_fi,description_en=EXCLUDED.description_en,description_es=EXCLUDED.description_es,verified=true,verified_at=now(),verified_notes=EXCLUDED.verified_notes,active=true;

    SELECT id INTO pid FROM public.providers WHERE slug=r.slug||'-provider' LIMIT 1;

    INSERT INTO public.experiences(destination_id,category_id,slug,duration_minutes,min_group_size,max_group_size,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
    VALUES(did,cid,r.slug,NULL,1,100,'published',now(),r.lat,r.lon,r.address,r.provider_url,r.source_url,true)
    ON CONFLICT(slug) DO UPDATE SET destination_id=EXCLUDED.destination_id,category_id=EXCLUDED.category_id,status='published',published_at=COALESCE(public.experiences.published_at,now()),latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
    RETURNING id INTO eid;

    INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description)
    VALUES
      (eid,'fi',r.title_fi,left(r.desc_fi,500),r.desc_fi),
      (eid,'en',r.title_en,left(r.desc_en,500),r.desc_en),
      (eid,'es',r.title_es,left(r.desc_es,500),r.desc_es)
    ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();

    mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:'||r.slug);
    INSERT INTO public.media(id,filename,url,title,alt_text,tags)
    VALUES(mid,r.slug||'.jpg',r.image_url,r.title_en,r.title_en,ARRAY['salo','experience',r.tag])
    ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
    INSERT INTO public.experience_media(experience_id,media_id,sort_order)
    VALUES(eid,mid,0)
    ON CONFLICT(experience_id,media_id) DO UPDATE SET sort_order=0;

    INSERT INTO public.provider_experience_links(provider_id,experience_id)
    VALUES(pid,eid)
    ON CONFLICT(provider_id,experience_id) DO NOTHING;
  END LOOP;
END $$;

COMMENT ON COLUMN public.experiences.editorial_verified IS 'Editorial source check for the public experience guide; it does not mean a commercial partnership or government certification.';
