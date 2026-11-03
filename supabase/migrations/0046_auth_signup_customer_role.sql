-- Ensure public Supabase Auth sign-ups never receive a CMS/editor role.
-- This is a new migration (0046) so it is applied after all existing migrations,
-- including the earlier CUSTOMER-role migration and later CMS changes.
-- Existing profiles are intentionally left unchanged for a separate audited review.

ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'CUSTOMER';

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

REVOKE ALL ON FUNCTION public.handle_new_auth_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.handle_new_auth_user() TO service_role;
