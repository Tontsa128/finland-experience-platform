-- Customer accounts and publishable custom pages.
-- Customer sign-ups must never receive an admin role.

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'CUSTOMER';
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('SUPER_ADMIN','ADMIN','CONTENT_MANAGER','BOOKING_MANAGER','EDITOR','CUSTOMER'));

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    'CUSTOMER'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_customers_auth_user_id ON public.customers(auth_user_id);

ALTER TABLE public.site_pages
  ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT FALSE;

DROP POLICY IF EXISTS "public site pages" ON public.site_pages;
CREATE POLICY "public published site pages"
  ON public.site_pages
  FOR SELECT
  USING (published = true);

ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
