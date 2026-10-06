-- Further individual Salo activities verified against current VisitSalo / provider listings.
-- Each entry is an individual discovery item; FINNEXPRIENCE does not sell combined packages.
DO $$
DECLARE did BIGINT; cid BIGINT; eid BIGINT; pid UUID; mid UUID;
BEGIN
  SELECT id INTO did FROM public.destinations WHERE slug='salo-mathildedal' LIMIT 1;

  -- Gicel
  SELECT id INTO cid FROM public.experience_categories WHERE slug='culture-history' LIMIT 1;
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,address,region,verified,verified_at,verified_notes,active)
  VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:rikalan-krouvi'),'Ravintola Rikalan Krouvi','rikalan-krouvi-provider','https://rikalankrouvi.fi/gicel-experience/','Rikalantie 74, 24800 Halikko, Salo','Salo',true,now(),'Current provider page checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,address=EXCLUDED.address,verified=true,verified_at=now(),active=true
  RETURNING id INTO pid;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'gicel-rikalanmaki','published',now(),'Rikalantie 74, 24800 Halikko, Salo','https://rikalankrouvi.fi/gicel-experience/','https://www.visitfinland.com/en/product/8956b302-2d04-427d-8bd3-f46b653e97c3/taste-the-gicel-experience-at-rikalanmaki/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer','autumn','winter'],ARRAY['history','food','local'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Gicelin elämys Rikalanmäellä','Rautakauden tarinaa, muinaisreitti ja paikallisia makuja.','Rikalanmäellä historia ja lähiruoka kohtaavat: muinaisreitti kertoo rautakauden kaupankäynnistä ja Ravintola Rikalan Krouvi tuo tarinan nykypäivään.'),
   (eid,'en','The Gicel Experience at Rikalanmäki','Iron Age stories, an ancient trail and local flavours.','At Rikalanmäki, Iron Age history and local food meet. Walk the ancient trail and discover the story behind the Gicel sword.'),
   (eid,'es','La experiencia Gicel en Rikalanmäki','Historia de la Edad del Hierro, ruta antigua y sabores locales.','En Rikalanmäki se unen la historia de la Edad del Hierro y la gastronomía local.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:gicel-rikalanmaki');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'gicel-rikalanmaki.jpg','https://cdn-datahub.visitfinland.com/images/fd2b4180-17a1-11f1-9828-55a63478511e.jpeg?s=1280','Gicel Experience at Rikalanmäki','Ancient trail and landscape at Rikalanmäki in Salo',ARRAY['salo','rikalanmaki','history'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Cinnamon buns
  SELECT id INTO cid FROM public.experience_categories WHERE slug='food-farm' LIMIT 1;
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,address,region,verified,verified_at,verified_notes,active)
  VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:hotel-mathildedal'),'Hotel Mathildedal','hotel-mathildedal-provider','https://www.mathildedal.fi/','Ruukinrannantie 6, 25660 Mathildedal','Salo',true,now(),'Current provider experience listing checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,address=EXCLUDED.address,verified=true,verified_at=now(),active=true
  RETURNING id INTO pid;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'cinnamon-bun-baking-mathildedal','published',now(),60.1660,22.9540,'Ruukinrannantie 6, 25660 Mathildedal','https://www.mathildedal.fi/','https://kohteet.visitsalo.fi/en/cinnamon-bun-baking-a-traditional-finnish-treat/',true,ARRAY['families','couples','friends','groups'],ARRAY['spring','summer','autumn','winter'],ARRAY['food','local','hands-on'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Korvapuustikurssi – suomalainen leivontaperinne','Opettele suomalaisen korvapuustin salat ja nauti tuoreista pullista kahvin kanssa.','Opastettu leivontahetki vie suomalaisen pullaperinteen äärelle: taikina, muotoilu, mausteet ja lopuksi tuoreet korvapuustit kahvin kanssa.'),
   (eid,'en','Cinnamon Bun Baking – a Finnish tradition','Learn the secrets of Finnish cinnamon buns and enjoy them fresh with coffee.','A guided hands-on baking session introduces Finnish cinnamon-bun tradition, dough, shaping and spices, followed by fresh buns and coffee.'),
   (eid,'es','Taller de bollos de canela – tradición finlandesa','Aprende a preparar bollos de canela finlandeses y disfrútalos recién hechos.','Una actividad guiada para conocer la tradición finlandesa de los bollos de canela, desde la masa hasta el horneado.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:cinnamon-bun-baking-mathildedal');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'cinnamon-buns.jpg','https://cdn-datahub.visitfinland.com/images/a7211560-bc55-11ef-9fcc-d37cec752366.jpeg?s=1280','Cinnamon buns in Mathildedal','Fresh Finnish cinnamon buns at Café Mathildedal',ARRAY['salo','mathildedal','food'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Fine dining
  SELECT id INTO cid FROM public.experience_categories WHERE slug='food-farm' LIMIT 1;
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,address,region,verified,verified_at,verified_notes,active)
  VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:teijo-cafe-bakery'),'Teijo Cafe & Bakery','teijo-cafe-bakery-provider','https://www.metsaravintola.fi/','Telakkatie 25, 25570 Teijo','Salo',true,now(),'Current VisitSalo / Visit Finland listing checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,address=EXCLUDED.address,verified=true,verified_at=now(),active=true
  RETURNING id INTO pid;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'fine-dining-finnish-forest','published',now(),60.2050,23.0000,'Teijon alue, Salo','https://www.metsaravintola.fi/','https://www.visitfinland.com/en/product/6b46dcd7-e6fb-4e39-8db8-74a30b556edc/fine-dining-experience-in-the-finnish-forest/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer','autumn'],ARRAY['food','forest','local'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Fine dining Suomen metsässä','Neljä ruokalajia luonnon keskellä Teijolla, paikallisia ja kauden raaka-aineita.','Metsäravintolan illallisella Suomen luonto, paikalliset raaka-aineet ja tarinat yhdistyvät rauhalliseksi ruokailuhetkeksi.'),
   (eid,'en','Fine Dining in the Finnish Forest','A four-course forest restaurant experience built around local seasonal ingredients.','A forest restaurant dinner in Teijo combines local seasonal ingredients, Finnish food culture and the atmosphere of the surrounding woodland.'),
   (eid,'es','Alta cocina en el bosque finlandés','Cuatro platos, ingredientes locales y naturaleza en Teijo.','Una cena en un restaurante del bosque combina ingredientes locales de temporada, cultura gastronómica finlandesa y naturaleza.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:fine-dining-finnish-forest');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'forest-dining.jpg','https://cdn-datahub.visitfinland.com/images/803f78a0-e7a8-11ef-a1a5-c5de292a73ba.jpeg','Finnish forest dining','Local food served by the water near Teijo National Park',ARRAY['salo','teijo','food'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Power of Steam
  SELECT id INTO cid FROM public.experience_categories WHERE slug='sauna-wellness' LIMIT 1;
  SELECT id INTO pid FROM public.providers WHERE slug='mathildan-marina-provider' LIMIT 1;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'power-of-steam-mathildan-marina','published',now(),60.1660,22.9590,'Ruukinrannantie 4, 25660 Mathildedal','https://mathildanmarina.fi/aktiviteetit/','https://www.visitfinland.com/en/product/c2b280b9-c2bd-4c19-802a-e5528df32946/the-power-of-steam-relax-in-sauna-at-mathildan-marina/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer','autumn','winter'],ARRAY['sauna','wellness','sea'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','The Power of Steam – sauna Mathildan Marinassa','Yksityinen saunahetki meren äärellä, ympäri vuoden.','Mathildan Marinan sauna yhdistää suomalaisen saunaperinteen, merellisen ympäristön ja rauhallisen oleskeluhetken.'),
   (eid,'en','The Power of Steam – Sauna at Mathildan Marina','A private seaside sauna moment available year-round.','Mathildan Marina combines Finnish sauna tradition with a calm seaside setting and a private moment to unwind.'),
   (eid,'es','The Power of Steam – sauna en Mathildan Marina','Una experiencia privada de sauna junto al mar durante todo el año.','La sauna de Mathildan Marina combina tradición finlandesa, mar y relajación.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:power-of-steam-mathildan-marina');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'power-of-steam.jpg','https://cdn-datahub.visitfinland.com/images/772bd980-c22e-11ed-8fb6-cd05a147400e.jpeg?s=1280','Mathildan Marina sauna and sea','Seaside sauna setting at Mathildan Marina',ARRAY['salo','mathildedal','sauna'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Forest yoga / sound bowls
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,address,region,verified,verified_at,verified_notes,active)
  VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:hoitola-kukkuvilla'),'Hoitola Kukkuvilla','hoitola-kukkuvilla-provider','https://hoitolakukkuvilla.fi/hoitola-kukkuvilla-in-english/','Kukkulinnantie 11, 25210 Vartsala, Salo','Salo',true,now(),'Current provider website and VisitSalo listing checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,address=EXCLUDED.address,verified=true,verified_at=now(),active=true
  RETURNING id INTO pid;
  SELECT id INTO cid FROM public.experience_categories WHERE slug='sauna-wellness' LIMIT 1;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'forest-yoga-sound-bowls-teijo','published',now(),60.1900,23.0200,'Teijon kansallispuisto, Matildanjärventie 86, 25660 Mathildedal','https://hoitolakukkuvilla.fi/hoitola-kukkuvilla-in-english/','https://kohteet.visitsalo.fi/en/forest-yoga-sound-bowl-relaxation-or-both/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer','autumn'],ARRAY['forest','yoga','wellness','slow'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Metsäjooga & äänimaljarentoutus','Joogaa järven ja mäntymetsän äärellä Teijon kansallispuistossa.','Luonnon keskellä tehtävä jooga ja äänimaljarentoutus antavat tilaa hengittää, hidastaa ja keskittyä ympäröivään metsään.'),
   (eid,'en','Forest Yoga & Sound Bowl Relaxation','Yoga and sound relaxation beside the lakes and pine forests of Teijo.','A restorative forest session combining gentle yoga and sound-bowl relaxation in the landscapes of Teijo National Park.'),
   (eid,'es','Yoga en el bosque y relajación con cuencos','Yoga y sonido junto a los lagos y bosques de pinos de Teijo.','Una sesión reparadora de yoga y relajación con cuencos sonoros en la naturaleza de Teijo.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:forest-yoga-sound-bowls-teijo');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'forest-yoga-sound-bowls.jpg','https://cdn-datahub.visitfinland.com/images/b565dda0-cac7-11f0-af1d-279dee19c89a.jpeg?s=1280','Forest yoga and sound bowls in Teijo','Forest yoga and singing bowl relaxation beside a lake in Teijo',ARRAY['salo','teijo','wellness'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Private outdoor skills
  SELECT id INTO cid FROM public.experience_categories WHERE slug='nature' LIMIT 1;
  INSERT INTO public.providers(id,name,slug,provider_type,website_url,address,region,verified,verified_at,verified_notes,active)
  VALUES(uuid_generate_v5(uuid_ns_url(),'finnexprience:provider:valla-outdoors'),'Valla Outdoors','valla-outdoors-provider','https://vallaoutdoors.com/','Kuivastontie 431, 25500 Perniö, Salo','Salo',true,now(),'Current VisitSalo listing checked; no commercial partnership claim.',true)
  ON CONFLICT(slug) DO UPDATE SET website_url=EXCLUDED.website_url,address=EXCLUDED.address,verified=true,verified_at=now(),active=true
  RETURNING id INTO pid;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'private-outdoor-skills-valla','published',now(),'Hamarijärventie 77, 25570 Salo','https://vallaoutdoors.johku.com/en_US/outdoor-life/outdoor-skills','https://kohteet.visitsalo.fi/en/private-outdoors-skills-group-activity/',true,ARRAY['friends','groups','families'],ARRAY['spring','summer','autumn'],ARRAY['outdoors','fire','crafts','local'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Erätaidot & vuolutyöpaja – Valla Outdoors','Tulenteko, suunnistus, retkeilytaidot ja oman puulusikan vuolu.','Opettele suomalaisia erätaitoja: suunnistusta, tulentekoa, nuotiokokkausta, riippumaton tai teltan pystytystä ja puulusikan vuolua pienryhmässä.'),
   (eid,'en','Outdoor Skills & Carving – Valla Outdoors','Fire making, navigation, outdoor skills and carving your own wooden spoon.','Learn practical Finnish outdoor skills including fire making, navigation, wild camping basics and wood carving in a small group.'),
   (eid,'es','Supervivencia suave y talla de madera','Fuego, orientación, acampada y talla de una cuchara de madera.','Aprende habilidades prácticas de naturaleza finlandesa: fuego, orientación, acampada y talla de madera en un grupo pequeño.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:private-outdoor-skills-valla');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'outdoor-skills.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg','Finnish outdoor skills','Finnish forest landscape near Teijo',ARRAY['salo','teijo','outdoors'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Private river kayaking and hike
  SELECT id INTO cid FROM public.experience_categories WHERE slug='water' LIMIT 1;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,latitude,longitude,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'kisko-river-kayaking-latokartanonkoski','published',now(),60.132354,23.157201,'Hästöntie 116, 25500 Salo','https://vallaoutdoors.johku.com/en_US/salo-kayaking/kisko-river-kayaking-latokartanonkoski-hike','https://kohteet.visitsalo.fi/en/private-river-kayaking-and-a-hike-in-salo/',true,ARRAY['couples','friends','groups'],ARRAY['spring','summer','autumn'],ARRAY['kayaking','hiking','river','history'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',latitude=EXCLUDED.latitude,longitude=EXCLUDED.longitude,address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Kiskojoen melonta & Latokartanonkosken luontoretki','Kevyt melonta yhdistyy historiaan ja metsäpolkuun yksityisellä retkellä.','Kolmen tunnin yksityisellä retkellä yhdistyvät Latokartanonkosken historiallinen ympäristö, opastettu kävely ja rauhallinen jokimelonta.'),
   (eid,'en','Kisko River Kayaking & Latokartanonkoski Hike','A gentle paddle combined with a nature walk and local history.','A private experience combining an easy river paddle with a guided nature walk and the historic Latokartanonkoski rapids.'),
   (eid,'es','Kayak por el río Kisko y senderismo','Paseo tranquilo en kayak, naturaleza e historia local.','Una experiencia privada que combina kayak suave, senderismo guiado e historia local en Latokartanonkoski.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:kisko-river-kayaking-latokartanonkoski');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'kisko-river-kayaking.jpg','https://cdn-datahub.visitfinland.com/images/5b8fb030-095c-11f0-88da-256e05b1f1a0.jpeg?s=1280','Salo coast and water experience','Finnish coastal water scenery in Salo',ARRAY['salo','water','outdoors'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES(pid,eid) ON CONFLICT DO NOTHING;

  -- Gentle beach yoga at Förby
  SELECT id INTO cid FROM public.experience_categories WHERE slug='sauna-wellness' LIMIT 1;
  INSERT INTO public.experiences(destination_id,category_id,slug,status,published_at,address,provider_direct_url,source_url,editorial_verified,audience_tags,season_tags,experience_tags)
  VALUES(did,cid,'gentle-beach-yoga-forby','published',now(),'Förby, 25640 Salo','https://hoitolakukkuvilla.fi/','https://www.visitfinland.com/en/product/f9a436f0-ec70-4097-94be-fe7ac81bea0a/gentle-beach-yoga-at-forby-marina/',true,ARRAY['couples','friends','adults'],ARRAY['summer'],ARRAY['sea','yoga','wellness','slow'])
  ON CONFLICT(slug) DO UPDATE SET category_id=EXCLUDED.category_id,status='published',address=EXCLUDED.address,provider_direct_url=EXCLUDED.provider_direct_url,source_url=EXCLUDED.source_url,editorial_verified=true,audience_tags=EXCLUDED.audience_tags,season_tags=EXCLUDED.season_tags,experience_tags=EXCLUDED.experience_tags,updated_at=now()
  RETURNING id INTO eid;
  INSERT INTO public.experience_translations(experience_id,language_code,title,short_description,full_description) VALUES
   (eid,'fi','Lempeä rantajooga Förbyssä','Aamujoogaa meren ja luonnon äärellä Särkisalon seudulla.','Lempeä joogatuokio meren läheisyydessä auttaa aloittamaan päivän rauhallisesti luonnon äänissä.'),
   (eid,'en','Gentle Beach Yoga at Förby','A gentle morning yoga session by the sea in the Särkisalo area.','Start your day with gentle movement and breathing in the fresh sea air at Förby.'),
   (eid,'es','Yoga suave en la playa de Förby','Yoga matinal junto al mar en la zona de Särkisalo.','Empieza el día con movimiento suave y respiración junto al mar.')
  ON CONFLICT(experience_id,language_code) DO UPDATE SET title=EXCLUDED.title,short_description=EXCLUDED.short_description,full_description=EXCLUDED.full_description,updated_at=now();
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:gentle-beach-yoga-forby');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags) VALUES(mid,'forby-yoga.jpg','https://cdn-datahub.visitfinland.com/images/5b8fb030-095c-11f0-88da-256e05b1f1a0.jpeg?s=1280','Förby Marina','Förby Marina pier by the sea in Salo',ARRAY['salo','forby','sea','wellness'])
  ON CONFLICT(id) DO UPDATE SET url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;
  INSERT INTO public.experience_media(experience_id,media_id,sort_order) VALUES(eid,mid,0) ON CONFLICT DO NOTHING;
  INSERT INTO public.provider_experience_links(provider_id,experience_id) VALUES((SELECT id FROM public.providers WHERE slug='hoitola-kukkuvilla-provider' LIMIT 1),eid) ON CONFLICT DO NOTHING;
END $$;
