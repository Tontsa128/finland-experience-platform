ALTER TABLE public.site_pages ADD COLUMN IF NOT EXISTS blocks JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS homepage_slides JSONB NOT NULL DEFAULT '[]'::jsonb;
CREATE TABLE IF NOT EXISTS public.cms_revisions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_type text NOT NULL, entity_id text NOT NULL,
 locale text, payload jsonb NOT NULL, created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cms_revisions_entity_idx ON public.cms_revisions(entity_type,entity_id,created_at DESC);
ALTER TABLE public.cms_revisions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cms revisions admin read" ON public.cms_revisions;
CREATE POLICY "cms revisions admin read" ON public.cms_revisions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id=auth.uid() AND p.role IN ('SUPER_ADMIN','ADMIN','CONTENT_MANAGER','EDITOR')));
DROP POLICY IF EXISTS "cms revisions admin insert" ON public.cms_revisions;
CREATE POLICY "cms revisions admin insert" ON public.cms_revisions FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id=auth.uid() AND p.role IN ('SUPER_ADMIN','ADMIN','CONTENT_MANAGER','EDITOR')));
