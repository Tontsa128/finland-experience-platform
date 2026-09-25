-- Homepage merchandising selections.
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS homepage_featured_destination_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS homepage_featured_property_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS homepage_featured_experience_ids JSONB NOT NULL DEFAULT '[]'::jsonb;
