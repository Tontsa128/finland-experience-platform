-- Experience discovery metadata used by the public guide filters.
ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS audience_tags TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS season_tags TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS experience_tags TEXT[] NOT NULL DEFAULT '{}';

UPDATE public.experiences
SET
  audience_tags = CASE
    WHEN slug IN ('ketolan-animal-farm','pohjolan-farm','kullanpuu-farm-experience') THEN ARRAY['family','groups']
    WHEN slug IN ('meri-teijo-bike-park','teijo-action-park','mathildedal-keskuspuisto','meri-teijo-golf') THEN ARRAY['couples','friends','groups']
    WHEN slug LIKE '%fishing%' OR slug LIKE '%ylostalo%' THEN ARRAY['adults','friends','groups']
    ELSE ARRAY['couples','friends','families']
  END,
  season_tags = CASE
    WHEN slug IN ('teijo-national-park','mathildedal-ironworks','ruukkipolku-mathildedal','sarkisalo-archipelago-route') THEN ARRAY['spring','summer','autumn']
    WHEN slug LIKE '%snowshoe%' THEN ARRAY['winter']
    ELSE ARRAY['spring','summer','autumn','winter']
  END,
  experience_tags = CASE
    WHEN slug LIKE '%farm%' OR slug IN ('ketolan-animal-farm','alaspaa-farm','kurjen-farm','leipyoli-farm','peltosaari-farm','oyrilan-isontalon-lammastila') THEN ARRAY['local','rural','family']
    WHEN slug LIKE '%sauna%' OR slug LIKE '%yoga%' OR slug LIKE '%bathing%' THEN ARRAY['sauna','wellness','slow']
    WHEN slug LIKE '%golf%' THEN ARRAY['golf','active','outdoors']
    WHEN slug LIKE '%bike%' OR slug LIKE '%route%' THEN ARRAY['cycling','active','coast']
    WHEN slug LIKE '%water%' OR slug LIKE '%kayak%' OR slug LIKE '%cruise%' THEN ARRAY['sea','water','archipelago']
    WHEN slug LIKE '%culture%' OR slug LIKE '%ironworks%' OR slug LIKE '%masuuni%' OR slug LIKE '%ruukki%' THEN ARRAY['history','culture','local']
    ELSE ARRAY['nature','local','slow']
  END
WHERE editorial_verified = true;
