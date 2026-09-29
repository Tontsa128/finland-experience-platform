-- Restrict provider records to server-side/admin access.
-- Public provider presentation must use an explicit safe API/view later;
-- internal commercial fields must never be exposed through the base table.
DROP POLICY IF EXISTS "public active providers" ON public.providers;

-- Keep public link tables unavailable until a safe provider projection/API is added.
DROP POLICY IF EXISTS "public provider property links" ON public.provider_property_links;
DROP POLICY IF EXISTS "public provider experience links" ON public.provider_experience_links;

COMMENT ON TABLE public.providers IS 'Verified local travel service providers. Base table is private; public presentation must expose only explicitly safe fields. Provider contracts and customer service remain with the provider unless separately agreed.';
