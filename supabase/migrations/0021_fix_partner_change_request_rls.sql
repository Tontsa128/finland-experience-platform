-- Fix the partner change request RLS predicate for databases where 0019 is already applied.
DROP POLICY IF EXISTS "provider members can read own change requests"
  ON public.provider_change_requests;

CREATE POLICY "provider members can read own change requests"
  ON public.provider_change_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.provider_members m
      WHERE m.provider_id = public.provider_change_requests.provider_id
        AND m.user_id = auth.uid()
        AND m.active = true
    )
  );
