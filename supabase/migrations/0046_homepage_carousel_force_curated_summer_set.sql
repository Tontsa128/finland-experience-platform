-- Replace the homepage carousel with a deterministic, curated summer set.
-- Each slide contains its image, attribution, destination link and matching FI/ES/EN copy.
-- This prevents stale CMS image URLs from leaving an old image paired with new copy.

UPDATE public.site_settings
SET homepage_slides = jsonb_build_array(
  jsonb_build_object(
    'id','summer','enabled',true,'sortOrder',0,'durationMs',4000,
    'imageUrl','https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Turun_saaristo_1.jpg/1280px-Turun_saaristo_1.jpg',
    'credit','Kallerna / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Turun_saaristo_1.jpg','ctaUrl','/destinations',
    'copy',jsonb_build_object(
      'fi',jsonb_build_object('eyebrow','Hidden Coastal Finland','title','Suomen kesä alkaa saariston valosta','text','Purjeveneitä, kalliosaaria ja sinistä vettä – tervetuloa kokemaan Suomen rannikon pitkät kesäpäivät.','cta','Tutustu kohteisiin'),
      'es',jsonb_build_object('eyebrow','Hidden Coastal Finland','title','El verano finlandés comienza con la luz del archipiélago','text','Veleros, islas rocosas y agua azul: descubre los largos días de verano de la costa finlandesa.','cta','Explorar destinos'),
      'en',jsonb_build_object('eyebrow','Hidden Coastal Finland','title','Finnish summer begins in the light of the archipelago','text','Sailing boats, rocky islands and blue water — discover the long summer days of Finland''s coast.','cta','Explore destinations')
    )
  ),
  jsonb_build_object(
    'id','cottage','enabled',true,'sortOrder',1,'durationMs',4000,
    'imageUrl','https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Summer_cottage%2C_Finland.jpg/1280px-Summer_cottage%2C_Finland.jpg',
    'credit','Νικόλαος Κυριακάκης / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Summer_cottage,_Finland.jpg','ctaUrl','/accommodations',
    'copy',jsonb_build_object(
      'fi',jsonb_build_object('eyebrow','Suomen mökkikesä','title','Aamukahvi veden äärellä','text','Mökki Saimaan rannalla, laituri ja luonnonrauha – suomalainen kesä parhaimmillaan.','cta','Katso majoituksia'),
      'es',jsonb_build_object('eyebrow','Verano en una cabaña finlandesa','title','Café junto al agua','text','Una cabaña a orillas del lago Saimaa, un embarcadero y la tranquilidad de la naturaleza.','cta','Ver alojamientos'),
      'en',jsonb_build_object('eyebrow','Finnish cottage summer','title','Morning coffee by the water','text','A cottage on Lake Saimaa, a jetty and the calm of Finnish nature.','cta','See stays')
    )
  ),
  jsonb_build_object(
    'id','archipelago','enabled',true,'sortOrder',2,'durationMs',4000,
    'imageUrl','https://commons.wikimedia.org/wiki/Special:Redirect/file/Turku_Archipelago.jpg',
    'credit','Rob Sinclair / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Turku_Archipelago.jpg','ctaUrl','/destinations',
    'copy',jsonb_build_object(
      'fi',jsonb_build_object('eyebrow','Turun saaristo','title','Sininen meri, sileät kalliot','text','Saariston kesä näyttää parhaat puolensa kirkkaassa päivänvalossa.','cta','Tutustu saaristoon'),
      'es',jsonb_build_object('eyebrow','Archipiélago de Turku','title','Mar azul y rocas lisas','text','El verano del archipiélago en su versión más luminosa y auténtica.','cta','Explorar el archipiélago'),
      'en',jsonb_build_object('eyebrow','Turku Archipelago','title','Blue water, sun-warmed rocks','text','The Finnish archipelago at its brightest – open water, pine trees and summer light.','cta','Explore the archipelago')
    )
  ),
  jsonb_build_object(
    'id','hanko','enabled',true,'sortOrder',3,'durationMs',4000,
    'imageUrl','https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Coast_of_Tulliniemi_in_Hanko%2C_Finland%2C_2021_July.jpg/1280px-Coast_of_Tulliniemi_in_Hanko%2C_Finland%2C_2021_July.jpg',
    'credit','Coen / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Coast_of_Tulliniemi_in_Hanko,_Finland,_2021_July.jpg','ctaUrl','/destinations/hanko',
    'copy',jsonb_build_object(
      'fi',jsonb_build_object('eyebrow','Hanko · Suomen etelärannikko','title','Meri, kalliot ja pitkä kesäpäivä','text','Tulliniemen avara rantamaisema, sininen Itämeri ja kirkas kesätaivas.','cta','Tutustu Hankoon'),
      'es',jsonb_build_object('eyebrow','Hanko · costa sur de Finlandia','title','Mar, rocas y un largo día de verano','text','La costa abierta de Tulliniemi, el azul del Báltico y la luz clara del verano.','cta','Explorar Hanko'),
      'en',jsonb_build_object('eyebrow','Hanko · Finland''s southern coast','title','Sea, rocky shores and a long summer day','text','The open coastline at Tulliniemi, blue Baltic water and bright summer skies.','cta','Explore Hanko')
    )
  ),
  jsonb_build_object(
    'id','naantali','enabled',true,'sortOrder',4,'durationMs',4000,
    'imageUrl','https://commons.wikimedia.org/wiki/Special:Redirect/file/Naantali_harbour_and_church.jpg',
    'credit','Pöllö / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Naantali_harbour_and_church.jpg','ctaUrl','/destinations/naantali',
    'copy',jsonb_build_object(
      'fi',jsonb_build_object('eyebrow','Naantali','title','Kesä alkaa vanhasta satamasta','text','Värikkäät puutalot, meri ja saariston portti tekevät Naantalista täydellisen kesäpäivän.','cta','Tutustu Naantaliin'),
      'es',jsonb_build_object('eyebrow','Naantali','title','El verano comienza en el puerto antiguo','text','Casas de madera, mar y la puerta de entrada al archipiélago.','cta','Explorar Naantali'),
      'en',jsonb_build_object('eyebrow','Naantali','title','Summer begins at the old harbour','text','Colourful wooden houses, the sea and the gateway to the archipelago.','cta','Explore Naantali')
    )
  ),
  jsonb_build_object(
    'id','mathildedal','enabled',true,'sortOrder',5,'durationMs',4000,
    'imageUrl','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg',
    'credit','Kotivalo / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','ctaUrl','/destinations/salo-mathildedal',
    'copy',jsonb_build_object(
      'fi',jsonb_build_object('eyebrow','Mathildedal · Salo','title','Vanha ruukkimiljöö kutsuu pysähtymään','text','Punatiiliset ruukkirakennukset kertovat kylän pitkästä historiasta ja käsityöläisperinteestä.','cta','Tutustu Mathildedaliin'),
      'es',jsonb_build_object('eyebrow','Mathildedal · Salo','title','Un antiguo pueblo industrial lleno de historia','text','Los edificios de ladrillo y el antiguo entorno industrial cuentan la historia artesanal del pueblo.','cta','Explorar Mathildedal'),
      'en',jsonb_build_object('eyebrow','Mathildedal · Salo','title','A historic ironworks village to slow down in','text','Red-brick buildings and the old ironworks setting tell the story of the village''s craft heritage.','cta','Explore Mathildedal')
    )
  ),
  jsonb_build_object(
    'id','aland','enabled',true,'sortOrder',6,'durationMs',4000,
    'imageUrl','https://commons.wikimedia.org/wiki/Special:Redirect/file/Kastelholm_2026-08-09_image12.jpg','credit','Håkan Skogsjö / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg','ctaUrl','/destinations/aland',
    'copy',jsonb_build_object('fi',jsonb_build_object('eyebrow','Ahvenanmaa','title','Saariston valo jatkuu horisonttiin','text','Meri, kalliosaaret ja kesän kirkas pohjoismainen valo.','cta','Tutustu Ahvenanmaahan'),'es',jsonb_build_object('eyebrow','Åland','title','La luz del archipiélago llega hasta el horizonte','text','Mar, islas rocosas y la luz nórdica del verano.','cta','Explorar Åland'),'en',jsonb_build_object('eyebrow','Åland','title','Archipelago light all the way to the horizon','text','Sea, rocky islands and bright Nordic summer light.','cta','Explore Åland'))
  ),
  jsonb_build_object(
    'id','porvoo','enabled',true,'sortOrder',7,'durationMs',4000,
    'imageUrl','https://commons.wikimedia.org/wiki/Special:Redirect/file/Porvoo_old_town.jpg','credit','Teemu Eskola / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg','ctaUrl','/destinations/porvoo',
    'copy',jsonb_build_object('fi',jsonb_build_object('eyebrow','Porvoo','title','Vanhan kaupungin kesäpäivä','text','Punaiset ranta-aitat, jokimaisema ja historiallinen keskusta kutsuvat hidastamaan.','cta','Tutustu Porvooseen'),'es',jsonb_build_object('eyebrow','Porvoo','title','Un día de verano en el casco antiguo','text','Casas rojas junto al río, historia y cafés para disfrutar sin prisa.','cta','Explorar Porvoo'),'en',jsonb_build_object('eyebrow','Porvoo','title','A summer day in the old town','text','Red riverside warehouses, historic streets and cafés made for slowing down.','cta','Explore Porvoo'))
  ),
  jsonb_build_object(
    'id','hankoBeach','enabled',true,'sortOrder',8,'durationMs',4000,
    'imageUrl','https://commons.wikimedia.org/wiki/Special:Redirect/file/Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg','credit','W.carter / Wikimedia Commons','creditUrl','https://commons.wikimedia.org/wiki/File:Regattanranta_beach_in_the_city_center_of_Hanko,_Finland,_2021.jpg','ctaUrl','/destinations/hanko',
    'copy',jsonb_build_object('fi',jsonb_build_object('eyebrow','Hanko · rannikko','title','Paljain jaloin kesään','text','Aurinkoinen hiekkaranta ja meri – Suomen etelärannikon kesä parhaimmillaan.','cta','Tutustu Hankoon'),'es',jsonb_build_object('eyebrow','Hanko · costa','title','Camina descalzo hacia el verano','text','Playa soleada y mar abierto en la costa sur de Finlandia.','cta','Explorar Hanko'),'en',jsonb_build_object('eyebrow','Hanko · coast','title','Walk barefoot into summer','text','A sunlit sandy beach and open sea on Finland''s southern coast.','cta','Explore Hanko'))
  ),
  jsonb_build_object(
    'id','herrankukkaro','enabled',true,'sortOrder',9,'durationMs',4000,
    'imageUrl','https://le-de.cdn-website.com/437c2bac51dd486c80c3e153a9033393/dms3rep/multi/opt/Kuva8-8066abf8-1920w.jpg','credit','Herrankukkaro','ctaUrl','https://www.herrankukkaro.fi/','external',true,
    'copy',jsonb_build_object('fi',jsonb_build_object('eyebrow','Rymättylä · Naantali','title','Savusauna meren äärellä','text','Herrankukkaro yhdistää saariston, savusaunan, majoituksen ja paikalliset maut.','cta','Siirry palveluntarjoajalle'),'es',jsonb_build_object('eyebrow','Rymättylä · Naantali','title','Sauna de humo junto al mar','text','Herrankukkaro combina archipiélago, sauna de humo, alojamiento y gastronomía local.','cta','Ir al proveedor'),'en',jsonb_build_object('eyebrow','Rymättylä · Naantali','title','Smoke sauna by the sea','text','Herrankukkaro brings together archipelago nature, smoke sauna, accommodation and local food.','cta','Visit provider'))
  )
)
WHERE singleton = true;
