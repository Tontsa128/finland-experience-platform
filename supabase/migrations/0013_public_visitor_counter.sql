-- Public aggregate visit counter. Counts one visit per browser session, not verified unique people.
CREATE TABLE IF NOT EXISTS public.public_visitor_counter (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  total_visits bigint NOT NULL DEFAULT 0 CHECK (total_visits >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.public_visitor_counter (id, total_visits)
VALUES (true, 0)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.public_visitor_counter ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.public_visitor_counter FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.increment_public_visitor_counter()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE new_total bigint;
BEGIN
  INSERT INTO public.public_visitor_counter (id, total_visits, updated_at)
  VALUES (true, 1, now())
  ON CONFLICT (id) DO UPDATE
    SET total_visits = public.public_visitor_counter.total_visits + 1,
        updated_at = now()
  RETURNING total_visits INTO new_total;
  RETURN new_total;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_public_visitor_counter() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_public_visitor_counter() TO service_role;
