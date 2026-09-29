-- Public CMS pages must be both published and indexable.
-- Draft pages must never be readable through the public Supabase policy.
DROP POLICY IF EXISTS "public site pages" ON public.site_pages;

CREATE POLICY "public published site pages"
  ON public.site_pages
  FOR SELECT
  USING (published = true AND noindex = false);
