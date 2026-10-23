-- Refresh only the known seeded homepage slides; retain the rest of each CMS slide.
-- All selected images are authentic Wikimedia Commons photographs with reuse licenses
-- and attribution links recorded in the carousel and photo library.

UPDATE public.site_settings AS settings
SET
  homepage_slides = (
    SELECT jsonb_agg(
      CASE item->>'id'
        WHEN 'summer' THEN item || jsonb_build_object(
          'imageUrl', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Turun_saaristo_1.jpg/1280px-Turun_saaristo_1.jpg',
          'credit', 'Kallerna / Wikimedia Commons',
          'creditUrl', 'https://commons.wikimedia.org/wiki/File:Turun_saaristo_1.jpg',
          'durationMs', 4000,
          'copy', jsonb_build_object(
            'fi', jsonb_build_object('eyebrow','Hidden Coastal Finland','title','Suomen kesä alkaa saariston valosta','text','Purjeveneitä, kalliosaaria ja sinistä vettä – tervetuloa kokemaan Suomen rannikon pitkät kesäpäivät.','cta','Tutustu kohteisiin'),
            'es', jsonb_build_object('eyebrow','Hidden Coastal Finland','title','El verano finlandés comienza con la luz del archipiélago','text','Veleros, islas rocosas y agua azul: descubre los largos días de verano de la costa finlandesa.','cta','Explorar destinos'),
            'en', jsonb_build_object('eyebrow','Hidden Coastal Finland','title','Finnish summer begins in the light of the archipelago','text', 'Sailing boats, rocky islands and blue water — discover the long summer days of Finland''s coast.','cta','Explore destinations')
          )
        )
        WHEN 'cottage' THEN item || jsonb_build_object(
          'imageUrl', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Summer_cottage%2C_Finland.jpg/1280px-Summer_cottage%2C_Finland.jpg',
          'credit', 'Νικόλαος Κυριακάκης / Wikimedia Commons',
          'creditUrl', 'https://commons.wikimedia.org/wiki/File:Summer_cottage,_Finland.jpg',
          'durationMs', 4000,
          'copy', jsonb_build_object(
            'fi', jsonb_build_object('eyebrow','Suomen mökkikesä','title','Aamukahvi veden äärellä','text','Mökki Saimaan rannalla, laituri ja luonnonrauha – suomalainen kesä parhaimmillaan.','cta','Katso majoituksia'),
            'es', jsonb_build_object('eyebrow','Verano en una cabaña finlandesa','title','Café junto al agua','text','Una cabaña a orillas del lago Saimaa, un embarcadero y la tranquilidad de la naturaleza.','cta','Ver alojamientos'),
            'en', jsonb_build_object('eyebrow','Finnish cottage summer','title','Morning coffee by the water','text','A cottage on Lake Saimaa, a jetty and the calm of Finnish nature.','cta','See stays')
          )
        )
        WHEN 'hanko' THEN item || jsonb_build_object(
          'imageUrl', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Coast_of_Tulliniemi_in_Hanko%2C_Finland%2C_2021_July.jpg/1280px-Coast_of_Tulliniemi_in_Hanko%2C_Finland%2C_2021_July.jpg',
          'credit', 'Coen / Wikimedia Commons',
          'creditUrl', 'https://commons.wikimedia.org/wiki/File:Coast_of_Tulliniemi_in_Hanko,_Finland,_2021_July.jpg',
          'durationMs', 4000,
          'copy', jsonb_build_object(
            'fi', jsonb_build_object('eyebrow','Hanko · Suomen etelärannikko','title','Meri, kalliot ja pitkä kesäpäivä','text','Tulliniemen avara rantamaisema, sininen Itämeri ja kirkas kesätaivas.','cta','Tutustu Hankoon'),
            'es', jsonb_build_object('eyebrow','Hanko · costa sur de Finlandia','title','Mar, rocas y un largo día de verano','text','La costa abierta de Tulliniemi, el azul del Báltico y la luz clara del verano.','cta','Explorar Hanko'),
            'en', jsonb_build_object('eyebrow','Hanko · Finland''s southern coast','title','Sea, rocky shores and a long summer day','text','The open coastline at Tulliniemi, blue Baltic water and bright summer skies.','cta','Explore Hanko')
          )
        )
        WHEN 'mathildedal' THEN item || jsonb_build_object(
          'durationMs', 4000,
          'copy', jsonb_build_object(
            'fi', jsonb_build_object('eyebrow','Mathildedal · Salo','title','Vanha ruukkimiljöö kutsuu pysähtymään','text','Punatiiliset ruukkirakennukset kertovat kylän pitkästä historiasta ja käsityöläisperinteestä.','cta','Tutustu Mathildedaliin'),
            'es', jsonb_build_object('eyebrow','Mathildedal · Salo','title','Un antiguo pueblo industrial lleno de historia','text','Los edificios de ladrillo y el antiguo entorno industrial cuentan la historia artesanal del pueblo.','cta','Explorar Mathildedal'),
            'en', jsonb_build_object('eyebrow','Mathildedal · Salo','title','A historic ironworks village to slow down in','text','Red-brick buildings and the old ironworks setting tell the story of the village''s craft heritage.','cta','Explore Mathildedal')
          )
        )
        ELSE item || jsonb_build_object('durationMs',4000)
      END
      ORDER BY position
    )
    FROM jsonb_array_elements(settings.homepage_slides) WITH ORDINALITY AS slides(item, position)
  ),
  updated_at = now()
WHERE settings.singleton = true
  AND jsonb_typeof(settings.homepage_slides) = 'array'
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(settings.homepage_slides) AS slide
    WHERE slide->>'id' IN ('summer','cottage','hanko','mathildedal')
  );
