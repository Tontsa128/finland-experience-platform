-- Admin user management and audit trail.
-- Supabase Auth remains the source of truth for authentication.
-- public.profiles stores the application role.

CREATE TABLE IF NOT EXISTS public.admin_user_role_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  old_role text,
  new_role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_user_role_audit_user_idx
  ON public.admin_user_role_audit(user_id, created_at DESC);

ALTER TABLE public.admin_user_role_audit ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin role audit read" ON public.admin_user_role_audit;
CREATE POLICY "admin role audit read"
  ON public.admin_user_role_audit
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('SUPER_ADMIN','ADMIN')
    )
  );

DROP POLICY IF EXISTS "admin role audit insert" ON public.admin_user_role_audit;
CREATE POLICY "admin role audit insert"
  ON public.admin_user_role_audit
  FOR INSERT TO authenticated
  WITH CHECK (changed_by = auth.uid());
