-- Provider records include private business contact details.
-- Public content is served through server-side helpers/API routes, so direct
-- anonymous/authenticated table reads are intentionally disabled.
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_property_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_experience_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public active providers" ON public.providers;
DROP POLICY IF EXISTS "public provider property links" ON public.provider_property_links;
DROP POLICY IF EXISTS "public provider experience links" ON public.provider_experience_links;

-- No public SELECT policies are created for provider records or their link tables.
-- The server-side Supabase service role remains able to read these records.
