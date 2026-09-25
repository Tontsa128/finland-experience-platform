-- CMS storage and additional publishing controls.
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE TABLE IF NOT EXISTS public.site_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), location TEXT NOT NULL DEFAULT 'header',
  locale TEXT NOT NULL CHECK (locale IN ('fi','es','en')), label TEXT NOT NULL, href TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(location, locale, href)
);
CREATE TABLE IF NOT EXISTS public.site_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), locale TEXT NOT NULL CHECK (locale IN ('fi','es','en')),
  title TEXT NOT NULL, text TEXT, cta_label TEXT, cta_url TEXT, image_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true, start_at TIMESTAMPTZ, end_at TIMESTAMPTZ, sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), slug TEXT NOT NULL UNIQUE,
  status public.property_status NOT NULL DEFAULT 'draft', cover_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
  author_name TEXT, published_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.blog_post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('fi','es','en')), title TEXT NOT NULL, excerpt TEXT, content TEXT,
  seo_title TEXT, seo_description TEXT, UNIQUE(post_id, locale)
);
ALTER TABLE public.site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public active navigation" ON public.site_navigation FOR SELECT USING (active = true);
CREATE POLICY "public active banners" ON public.site_banners FOR SELECT USING (active = true);
CREATE POLICY "public published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "public blog translations" ON public.blog_post_translations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = post_id AND p.status = 'published')
);
CREATE INDEX IF NOT EXISTS idx_site_navigation_location_locale ON public.site_navigation(location, locale, sort_order);
CREATE INDEX IF NOT EXISTS idx_site_banners_active_dates ON public.site_banners(active, start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
