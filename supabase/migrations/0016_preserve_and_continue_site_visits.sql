-- Keep the legacy 50,000+ site-visit baseline distinct from the visitor count.
-- Continue increasing it as new browser sessions are counted.
ALTER TABLE public.public_site_metrics
  ADD COLUMN IF NOT EXISTS total_site_visits bigint NOT NULL DEFAULT 50000
  CHECK (total_site_visits >= 0);

UPDATE public.public_site_metrics AS metrics
SET total_site_visits = GREATEST(
  metrics.total_site_visits,
  50000,
  COALESCE((
    SELECT legacy.total_visits
    FROM public.public_visitor_counter AS legacy
    WHERE legacy.id = true
  ), 0)
),
updated_at = now()
WHERE metrics.id = true;

-- PostgreSQL cannot change a function's OUT/RETURNS TABLE shape with CREATE OR REPLACE.
DROP FUNCTION IF EXISTS public.increment_public_site_metrics();

CREATE FUNCTION public.increment_public_site_metrics()
RETURNS TABLE(
  total_visitors bigint,
  month_visitors bigint,
  month_key text,
  total_site_visits bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_month text := to_char(now() AT TIME ZONE 'Europe/Helsinki', 'YYYY-MM');
BEGIN
  UPDATE public.public_site_metrics AS metrics
  SET
    total_visitors = metrics.total_visitors + 1,
    total_site_visits = metrics.total_site_visits + 1,
    month_visitors = CASE
      WHEN metrics.month_key = current_month THEN metrics.month_visitors + 1
      ELSE 1
    END,
    month_key = current_month,
    updated_at = now()
  WHERE metrics.id = true;

  RETURN QUERY
  SELECT metrics.total_visitors, metrics.month_visitors,
         metrics.month_key, metrics.total_site_visits
  FROM public.public_site_metrics AS metrics
  WHERE metrics.id = true;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_public_site_metrics() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_public_site_metrics() TO service_role;
