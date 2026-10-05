-- Correct direct provider routing for LuontoRiihi and add two high-value Mathildedal experiences.
DO $$
DECLARE pid UUID; eid BIGINT; cid BIGINT; did BIGINT; mid UUID;
BEGIN
  SELECT id INTO did FROM public.destinations WHERE slug='salo-mathildedal' LIMIT 1;

  -- Repoint the existing wellness/nature entries to the actual provider.
  UPDATE public.providers SET name='LuontoRiihi',slug='luontoriihi-provider',website_url='https://www.luontoriihi.fi/finnish-nature-experiences/',region='Salo',verified=true,verified_at=now(),active=true
  WHERE slug IN ('forest-bathing-teijo-provider','forest-yoga-teijo-provider') LIMIT 1;

  UPDATE public.experiences
  SET provider_direct_url='https://www.luontoriihi.fi/finnish-nature-experiences/',source_url='https://www.visitfinland.com/en/product/7667a583-9f0d-4b36-b5f0-8e4e685f6912/forest-bathing-well-being-from-nature-in-salo/',experience_tags=ARRAY['wellness','forest','slow'],season_tags=ARRAY['spring','summer','autumn','winter']
  WHERE slug='forest-bathing-teijo';

  UPDATE public.experiences
  SET provider_direct_url='https://www.luontoriihi.fi/finnish-nature-experiences/',source_url='https://www.visitfinland.com/en/product/3726c189-7fb1-45e2-85bc-67109ebde9e7/creative-nature-lets-get-inspired-by-finnish-nature-in-salo/',experience_tags=ARRAY['creative','nature','wellness'],season_tags=ARRAY['spring','summer','autumn']
  WHERE slug='luonnon-tutkimusmatka-teijo';

  SELECT id INTO cid FROM public.experience_categories WHERE slug='water' LIMIT 1;
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
  VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:mathildan-marina'), 'Mathildan Marina','mathildan-marina-provider','experience','https://mathildanmarina.fi/aktiviteetit/','Salo',true,now(),'Editorial source checked against current provider activity page; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,verified=true,verified_at=now(),active=true
  RETURNING id INTO pid;

  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'chill-grill-mathildan-marina','published',now(),60.1660,22.9590,'Ruukinrannantie 4, 25660 Mathildedal','https://mathildanmarina.fi/aktiviteetit/','https://mathildanmarina.fi/aktiviteetit/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer','autumn'],ARRAY['sea','boat','food','slow'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Chill & Grill – veneretki lähisaareen','Veneretki, nuotio ja merellinen ilta kalastusoppaan johdolla.','Mathildan Marinan Chill & Grill vie lähisaareen veneellä, jossa nautitaan nuotiolla grillaamisesta ja saariston tunnelmasta.'),
   (eid,'en','Chill & Grill – boat trip to a nearby island','A boat trip, campfire and easy-going archipelago atmosphere.','Mathildan Marina takes you by boat to a nearby island for a relaxed campfire and maritime evening.'),
   (eid,'es','Chill & Grill – excursión en barco a una isla','Paseo en barco, fuego y ambiente relajado del archipiélago.','Mathildan Marina te lleva en barco a una isla cercana para disfrutar de una tarde junto al fuego y el mar.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:chill-grill-mathildan-marina');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'chill-grill.jpg','https://upload.wikimedia.org/wikipedia/commons/9/91/Mathildedal_harbour_sunset.jpg','Chill & Grill at Mathildan Marina','Mathildedal harbour and archipelago evening',ARRAY['salo','mathildedal','sea','food'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  SELECT id INTO cid FROM public.experience_categories WHERE slug='nature' LIMIT 1;
  SELECT id INTO pid FROM public.providers WHERE slug='mathildedal-provider' LIMIT 1;
  IF pid IS NULL THEN
    INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
    VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:hotel-mathildedal'),'Hotel Mathildedal','mathildedal-provider','https://www.mathildedal.fi/','Salo',true,now(),'Editorial source checked against current provider experience listing; no commercial partnership claim.',true)
    RETURNING id INTO pid;
  END IF;

  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'midnight-sun-teijo','published',now(),60.1660,22.9540,'Ruukinrannantie 6, 25660 Mathildedal','https://www.mathildedal.fi/','https://www.visitfinland.com/en/product/832cffd4-01d4-426e-9496-df5a4ece7a09/midnight-sun-excursion-at-teijo-national-park/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer'],ARRAY['midnight-sun','forest','campfire','slow'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Yöttömän yön retki Teijon kansallispuistossa','Nuotio, iltaretki, järvenranta ja kesäyön valo.','Lyhyt iltaretki Teijon kansallispuistossa, nuotio ja järvenrannan hiljaisuus tekevät kesäyöstä elämyksen.'),
   (eid,'en','Midnight Sun Excursion in Teijo National Park','A short hike, campfire, lakeshore and the light of the Finnish summer night.','A short evening hike in Teijo National Park combines a campfire, lakeshore calm and the bright Finnish summer night.'),
   (eid,'es','Excursión del sol de medianoche en Teijo','Caminata corta, fuego, lago y luz del verano finlandés.','Una caminata vespertina en Teijo combina fuego, lago y la luz especial de las noches de verano finlandesas.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:midnight-sun-teijo');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'midnight-sun.jpg','https://upload.wikimedia.org/wikipedia/commons/9/91/Mathildedal_harbour_sunset.jpg','Finnish summer night in Mathildedal','Summer evening by the harbour in Mathildedal',ARRAY['salo','mathildedal','summer','night'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;
END $$;
