-- Image and provider-routing quality corrections for the Salo experience guide.
-- Idempotent: safe to run after 0037-0043.

DO $$
DECLARE
  mid UUID;
BEGIN
  -- Meri-Teijo Bike Park: use the provider's current, place-specific image.
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:meri-teijo-bike-park');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags)
  VALUES(
    mid,
    'meri-teijo-bike-park.jpg',
    'https://meriteijobikepark.com/media/alamakipyorailya_teijolla.jpg',
    'Meri-Teijo Bike Park',
    'Mountain biker riding down the Meri-Teijo Bike Park landscape in Teijo',
    ARRAY['salo','teijo','bike','bike-park']
  )
  ON CONFLICT(id) DO UPDATE SET
    url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;

  INSERT INTO public.experience_media(experience_id,media_id,sort_order)
  SELECT e.id,mid,0 FROM public.experiences e WHERE e.slug='meri-teijo-bike-park'
  ON CONFLICT(experience_id,media_id) DO UPDATE SET sort_order=0;

  -- Kullanpuu: use the previously verified Visit Finland image rather than the unrelated Storfinnhova crop.
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:kullanpuu-farm-experience');
  UPDATE public.media
  SET
    url='https://cdn-datahub.visitfinland.com/images/6ea6c060-f008-11ed-8225-2341bac177e9.jpeg?s=1280',
    title='Kullanpuu farm experience',
    alt_text='Kullanpuu farm experience in the Teijo area of Salo',
    tags=ARRAY['salo','teijo','farm','kullanpuu']
  WHERE id=mid;

  -- Öyrilän Isontalon lammastila: current VisitSalo sheep photo and direct provider website.
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:oyrilan-isontalon-lammastila');
  INSERT INTO public.media(id,filename,url,title,alt_text,tags)
  VALUES(
    mid,
    'oyrilan-sheep.jpg',
    'https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/Oyrila1-1366x741.jpg',
    'Öyrilän Isontalon lammastila',
    'Sheep grazing in a sunny meadow at Öyrilän Isontalon sheep farm in Perniö',
    ARRAY['salo','pernio','farm','sheep','local-food']
  )
  ON CONFLICT(id) DO UPDATE SET
    url=EXCLUDED.url,title=EXCLUDED.title,alt_text=EXCLUDED.alt_text,tags=EXCLUDED.tags;

  UPDATE public.experiences
  SET
    provider_direct_url='https://www.irmelinurminen.com/',
    source_url='https://kohteet.visitsalo.fi/oyrilan-isontalon-lammastila/',
    address='Isontalontie 42, 25540 Knaapila',
    updated_at=now()
  WHERE slug='oyrilan-isontalon-lammastila';

  INSERT INTO public.experience_media(experience_id,media_id,sort_order)
  SELECT e.id,mid,0 FROM public.experiences e WHERE e.slug='oyrilan-isontalon-lammastila'
  ON CONFLICT(experience_id,media_id) DO UPDATE SET sort_order=0;

  -- Ylöstalo: current official fishing image and current direct provider page.
  mid := uuid_generate_v5(uuid_ns_url(),'finnexprience:media:ylostalo-fishing');
  UPDATE public.media
  SET
    url='https://www.ylostalo.fi/wp-content/uploads/2026/04/HeroKalastus-4-1024x768.webp',
    title='Ylöstalo archipelago fishing',
    alt_text='Fishing boat on the Baltic Sea at sunset near Ylöstalo in Särkisalo',
    tags=ARRAY['salo','sarkisalo','fishing','archipelago','ylostalo']
  WHERE id=mid;

  UPDATE public.experiences
  SET
    provider_direct_url='https://www.ylostalo.fi/en/fishing-and-boats/',
    source_url='https://www.ylostalo.fi/en/fishing-and-boats/',
    updated_at=now()
  WHERE slug='ylostalo-fishing';
END $$;
