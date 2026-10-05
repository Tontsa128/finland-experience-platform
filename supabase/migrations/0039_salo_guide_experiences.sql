-- Additional non-bookable discovery experiences from the Salo tourism catalogue.
DO $$
DECLARE
  did BIGINT;
  cid BIGINT;
  eid BIGINT;
  pid UUID;
  mid UUID;
BEGIN
  SELECT id INTO did FROM public.destinations WHERE slug='salo-mathildedal' LIMIT 1;

  -- Helper pattern repeated for editorial guide entries.
  -- Ruukkipolku
  SELECT id INTO cid FROM public.experience_categories WHERE slug='culture-history' LIMIT 1;
  pid := uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:ruukkipolku');
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
  VALUES(pid,'Visit Mathildedal','ruukkipolku-provider','guide','https://www.visitmathildedal.fi/fi','Salo',true,now(),'Editorial source checked; guide entry, not a commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,verified=true,verified_at=now(),active=true;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
  VALUES(did,cid,'ruukkipolku-mathildedal','published',now(),60.1660,22.9540,'Ruukinrannantie 6, 25660 Mathildedal','https://www.visitmathildedal.fi/fi','https://visitsalo.fi/aktiviteetit-ja-elamykset/',true)
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Ruukkipolku – Mathildedalin historia kävellen','Helppo tapa tutustua ruukkikylän rakennuksiin ja tarinoihin.','Ruukkipolku johdattaa Mathildedalin historiallisten rakennusten, meren ja kylämiljöön äärelle.'),
   (eid,'en','Ironworks Trail – discover Mathildedal on foot','A simple way to explore the historic village and its stories.','The Ironworks Trail connects historic buildings, the sea and the village atmosphere.'),
   (eid,'es','Ruta del pueblo siderúrgico de Mathildedal','Descubre el pueblo histórico a pie.','La ruta conecta edificios históricos, el mar y el ambiente del pueblo.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:ruukkipolku-mathildedal');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'ruukkipolku.jpg','https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg','Ruukkipolku Mathildedal','Ruukkipolku Mathildedal',ARRAY['salo','mathildedal','culture'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Forest yoga
  SELECT id INTO cid FROM public.experience_categories WHERE slug='sauna-wellness' LIMIT 1;
  pid := uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:forest-yoga-teijo');
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
  VALUES(pid,'Visit Mathildedal / local yoga providers','forest-yoga-teijo-provider','guide','https://www.visitmathildedal.fi/fi/aktiviteetit/herata-aistit-ja-hoivaa-kehoa','Salo',true,now(),'Editorial source checked; exact provider should be confirmed before a commercial partnership.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,verified=true,verified_at=now(),active=true;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
  VALUES(did,cid,'forest-yoga-teijo','published',now(),60.2050,23.0000,'Teijon kansallispuisto, Salo','https://www.visitmathildedal.fi/fi/aktiviteetit/herata-aistit-ja-hoivaa-kehoa','https://www.visitmathildedal.fi/fi/aktiviteetit/herata-aistit-ja-hoivaa-kehoa',true)
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Metsäjooga Teijon kansallispuistossa','Rauhallinen jooga luonnon keskellä.','Metsäjooga yhdistää suomalaisen metsän, rauhallisen liikkeen ja hiljaisuuden.'),
   (eid,'en','Forest Yoga in Teijo National Park','Slow yoga surrounded by Finnish nature.','Forest yoga combines Finnish woodland, mindful movement and quiet.'),
   (eid,'es','Yoga en el bosque de Teijo','Yoga tranquilo rodeado de naturaleza finlandesa.','El yoga en el bosque combina naturaleza, movimiento consciente y silencio.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:forest-yoga-teijo');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'forest-yoga.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','Forest yoga in Teijo','Forest yoga in Teijo',ARRAY['salo','teijo','wellness'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Särkisalo archipelago route
  SELECT id INTO cid FROM public.experience_categories WHERE slug='water' LIMIT 1;
  pid := uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:sarkisalo-archipelago-route');
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,region,verified,verified_at,verified_notes,active)
  VALUES(pid,'VisitSalo','sarkisalo-archipelago-route-provider','guide','https://visitsalo.fi/sarkisalo-ja-meri/','Salo',true,now(),'Editorial source checked; guide entry, not a commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,verified=true,verified_at=now(),active=true;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified)
  VALUES(did,cid,'sarkisalo-archipelago-route','published',now(),60.0800,22.9300,'Särkisalo, Salo','https://visitsalo.fi/sarkisalo-ja-meri/','https://visitsalo.fi/sarkisalo-ja-meri/',true)
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Särkisalon saaristokierros','Merellinen päivä saariston teillä, silloilla ja rannoilla.','Särkisalon saaristokierros yhdistää meren, kylät, rannat, sillat ja pienet pysähdyspaikat.'),
   (eid,'en','Särkisalo Archipelago Day','A maritime day among islands, bridges, villages and shores.','Explore Särkisalo by combining sea views, villages, bridges, beaches and local stops.'),
   (eid,'es','Ruta por el archipiélago de Särkisalo','Un día entre islas, puentes, pueblos y costa.','Descubre Särkisalo combinando mar, pueblos, puentes, playas y paradas locales.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:sarkisalo-archipelago-route');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'sarkisalo-route.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Ulkoluotosilta3.jpg','Särkisalo archipelago','Särkisalo archipelago',ARRAY['salo','sarkisalo','archipelago'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;
END $$;
