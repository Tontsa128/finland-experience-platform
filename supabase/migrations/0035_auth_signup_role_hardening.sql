-- Security fix: ordinary Supabase sign-ups must never receive an admin/CMS role.
-- Migration 0004 accidentally replaced the safer CUSTOMER trigger from 0012 with EDITOR.
-- Keep all existing role assignments unchanged; audit existing profiles separately before changing them.

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
