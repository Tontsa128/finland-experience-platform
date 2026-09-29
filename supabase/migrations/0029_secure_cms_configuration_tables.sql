-- CMS configuration is server-managed. Public pages read it through service-role
-- server helpers, so no direct anon/authenticated table access is required.
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_banners ENABLE ROW LEVEL SECURITY;

-- Intentionally no public SELECT/INSERT/UPDATE/DELETE policies.
-- The server-side Supabase service role remains able to manage these records.
