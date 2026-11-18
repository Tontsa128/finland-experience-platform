-- Allow the public website to read only the homepage-facing fields.
-- The remaining site_settings columns (contact details, analytics IDs and
-- internal configuration) stay unavailable to anon/authenticated clients.
begin;

alter table public.site_settings enable row level security;

revoke select on table public.site_settings from anon, authenticated;

grant select (
  singleton,
  hero_image_url,
  hero_eyebrow_fi,
  hero_eyebrow_es,
  hero_eyebrow_en,
  hero_title_fi,
  hero_title_es,
  hero_title_en,
  hero_description_fi,
  hero_description_es,
  hero_description_en,
  hero_cta_label_fi,
  hero_cta_label_es,
  hero_cta_label_en,
  hero_cta_url,
  hero_secondary_label_fi,
  hero_secondary_label_es,
  hero_secondary_label_en,
  hero_secondary_url,
  homepage_featured_destination_ids,
  homepage_featured_property_ids,
  homepage_featured_experience_ids,
  homepage_slides
) on table public.site_settings to anon, authenticated;

drop policy if exists "Public can read homepage settings" on public.site_settings;

create policy "Public can read homepage settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (singleton is true);

commit;
