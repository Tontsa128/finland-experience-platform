-- Additional Salo pilot experiences: farm stay, golf and local sheep producer.
DO $$
DECLARE
  did BIGINT;
  cid BIGINT;
  eid BIGINT;
  pid UUID;
  mid UUID;
BEGIN
  SELECT id INTO did FROM public.destinations WHERE slug='salo-mathildedal' LIMIT 1;

  -- Kullanpuu
  SELECT id INTO cid FROM public.experience_categories WHERE slug='food-farm' LIMIT 1;
  pid := uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:kullanpuu');
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
  VALUES(pid,'Kullanpuu','kullanpuu-provider','experience','https://www.kullanpuu.fi/','Salo',true,now(),'Editorial source checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,verified=true,verified_at=now(),active=true;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
  VALUES(did,cid,'kullanpuu-farm-experience','published',now(),60.2240,23.0050,'Kirjakkalantie 71, 25570 Teijo','https://www.kullanpuu.fi/','https://www.kullanpuu.fi/en/activities',true)
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Kullanpuu – maatila, sauna ja luonto','200-vuotias hirsitalo, puusauna, lähiluonto ja aktiviteetit.','Kullanpuu yhdistää historiallisen maatilamiljöön, saunan, lähiluonnon ja paikalliset aktiviteetit.'),
   (eid,'en','Kullanpuu – farm, sauna & nature','A historic farm house, sauna, nature and local activities.','Kullanpuu combines a historic farm setting, sauna, nature and local activities.'),
   (eid,'es','Kullanpuu – granja, sauna y naturaleza','Una antigua granja, sauna, naturaleza y actividades locales.','Kullanpuu combina una granja histórica, sauna, naturaleza y actividades locales.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:kullanpuu-farm-experience');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'kullanpuu.jpg','https://www.storfinnhova.com/wp-content/uploads/2025/10/080925-Kemio-tilakuvat-web-117_cropped.jpg','Kullanpuu farm experience','Kullanpuu farm experience',ARRAY['salo','farm','teijo'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT(experience_id,media_id) DO UPDATE SET sort_order=0;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Meri-Teijo Golf
  SELECT id INTO cid FROM public.experience_categories WHERE slug='golf' LIMIT 1;
  pid := uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:meri-teijo-golf');
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,address,region,verified,verified_at,verified_notes,active)
  VALUES(pid,'Meri-Teijo Golf','meri-teijo-golf-provider','experience','https://meriteijogolf.com/','Lanskalantie 56, 25570 Teijo','Salo',true,now(),'Editorial source checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,address=EXCLUDED.address,verified=true,verified_at=now(),active=true;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
  VALUES(did,cid,'meri-teijo-golf','published',now(),60.2170,23.0050,'Lanskalantie 56, 25570 Teijo','https://meriteijogolf.com/','https://www.teijo.fi/yhdistystoimintaa/meri-teijo-golf/',true)
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Meri-Teijo Golf – 18 reikää meren ja kansallispuiston reunalla','Kaunis 18 reiän kenttä Teijon ruukkikylien ja kansallispuiston kupeessa.','Meri-Teijo Golf tarjoaa 18 reiän kentän, harjoittelualueet, klubiravintolan ja saunan.'),
   (eid,'en','Meri-Teijo Golf – 18 holes by the sea','An 18-hole course beside the sea and Teijo National Park.','Meri-Teijo Golf offers an 18-hole course, practice areas, clubhouse restaurant and sauna.'),
   (eid,'es','Meri-Teijo Golf – 18 hoyos junto al mar','Campo de 18 hoyos junto al mar y al Parque Nacional de Teijo.','Meri-Teijo Golf ofrece 18 hoyos, zonas de práctica, restaurante y sauna.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:meri-teijo-golf');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'meri-teijo-golf.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','Meri-Teijo Golf','Meri-Teijo Golf',ARRAY['salo','golf','teijo'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT(experience_id,media_id) DO UPDATE SET sort_order=0;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Öyrilän Isontalon sheep farm
  SELECT id INTO cid FROM public.experience_categories WHERE slug='food-farm' LIMIT 1;
  pid := uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:oyrilas-isontalon-lammastila');
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
  VALUES(pid,'Öyrilän Isontalon lammastila','oyrilas-isontalon-lammastila-provider','experience','https://kohteet.visitsalo.fi/oyrilan-isontalon-lammastila/','Salo',true,now(),'Editorial source checked through current VisitSalo listing; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,verified=true,verified_at=now(),active=true;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
  VALUES(did,cid,'oyrilan-isontalon-lammastila','published',now(),60.1800,23.1500,'Isontalontie 42, 25540 Knaapila','https://kohteet.visitsalo.fi/oyrilan-isontalon-lammastila/','https://kohteet.visitsalo.fi/oyrilan-isontalon-lammastila/',true)
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Öyrilän Isontalon lammastila','Perniöläistä lähiruokaa, villaa, taljoja ja maatilan elämää.','Pieni lammastila tarjoaa lähiruokaa, villalankoja, taljoja ja tilapuodin tunnelmaa.'),
   (eid,'en','Öyrilän Isontalon Sheep Farm','Local food, wool, hides and genuine farm life in Perniö.','A small sheep farm offering local food, wool products, hides and a glimpse of rural life.'),
   (eid,'es','Granja ovina Öyrilän Isontalon','Productos locales, lana, pieles y vida rural en Perniö.','Una pequeña granja ovina con productos locales, lana, pieles y vida rural.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:oyrilan-isontalon-lammastila');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'oyrilan-sheep.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg','Öyrilän Isontalon lammastila','Öyrilän Isontalon lammastila',ARRAY['salo','farm','sheep'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT(experience_id,media_id) DO UPDATE SET sort_order=0;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;
END $$;
