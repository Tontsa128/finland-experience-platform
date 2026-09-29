-- Publication and indexing are separate concerns.
-- Published CMS pages may be noindex, but draft pages must remain private.
DROP POLICY IF EXISTS "public published site pages" ON public.site_pages;
CREATE POLICY "public published site pages"
  ON public.site_pages
  FOR SELECT
  USING (published = true);
