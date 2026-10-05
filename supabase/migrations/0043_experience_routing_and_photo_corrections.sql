-- Final routing/photo corrections for the first Salo experience-guide release.
UPDATE public.experiences
SET provider_direct_url='https://www.luontoon.fi/en/destinations/teijo-national-park',
    source_url='https://www.visitfinland.com/en/product/4a07b463-4aed-4a37-b8f1-e8aaa494e1c4/teijo-national-park/'
WHERE slug='teijo-national-park';

UPDATE public.providers
SET website_url='https://www.luontoon.fi/en/destinations/teijo-national-park'
WHERE slug='teijon-kansallispuisto-provider';

UPDATE public.media
SET url='https://02c48f7ae5.cbaul-cdnwnd.com/4b1e4f0584d512bc0a027e1878c5e532/200000001-3c65a3d62c/peltosaari-lampaat-niitylla.JPG?ph=02c48f7ae5',
    title='Peltosaaren lammastila',
    alt_text='Sheep grazing in a sunny meadow at Peltosaaren lammastila in Perniö',
    tags=ARRAY['salo','pernio','farm','sheep','local-food']
WHERE id=uuid_generate_v5(uuid_ns_url(),'finnexprience:media:peltosaari-farm');

-- Keep the public provider link for Peltosaari on its current official site when available.
UPDATE public.experiences
SET provider_direct_url=COALESCE(provider_direct_url,'https://peltosaarenluomulammastila.fi/')
WHERE slug='peltosaari-farm';
