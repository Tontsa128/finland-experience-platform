-- Public pages use server-side service-role helpers for CMS/provider data.
-- Do not expose internal provider, provider-link, or CMS configuration rows
-- through the public Supabase client.
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_property_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_experience_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public site settings" ON public.site_settings;
DROP POLICY IF EXISTS "public active providers" ON public.providers;
DROP POLICY IF EXISTS "public provider property links" ON public.provider_property_links;
DROP POLICY IF EXISTS "public provider experience links" ON public.provider_experience_links;

-- Intentionally no public SELECT/INSERT/UPDATE/DELETE policies remain on these tables.
-- Server-side service-role code is the only application path that needs full access.
