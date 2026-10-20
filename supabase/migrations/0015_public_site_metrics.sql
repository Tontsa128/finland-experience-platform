-- Public-facing historical baseline and live monthly visitor statistics.
-- Baselines were supplied by the site owner: 53,547 downloads and 17,558 visitors.
-- The monthly figure starts tracking from deployment onward; it is not a retroactive analytics export.
CREATE TABLE IF NOT EXISTS public.public_site_metrics (
  id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
  total_visitors bigint NOT NULL DEFAULT 17558 CHECK (total_visitors >= 0),
  total_downloads bigint NOT NULL DEFAULT 53547 CHECK (total_downloads >= 0),
  month_key text NOT NULL DEFAULT to_char(now() AT TIME ZONE 'Europe/Helsinki', 'YYYY-MM'),
  month_visitors bigint NOT NULL DEFAULT 0 CHECK (month_visitors >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.public_site_metrics (id, total_visitors, total_downloads, month_key, month_visitors)
VALUES (true, 17558, 53547, to_char(now() AT TIME ZONE 'Europe/Helsinki', 'YYYY-MM'), 0)
ON CONFLICT (id) DO UPDATE SET
  total_visitors = GREATEST(public.public_site_metrics.total_visitors, EXCLUDED.total_visitors),
  total_downloads = GREATEST(public.public_site_metrics.total_downloads, EXCLUDED.total_downloads),
  updated_at = now();

ALTER TABLE public.public_site_metrics ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.public_site_metrics FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.public_site_metrics TO service_role;

CREATE OR REPLACE FUNCTION public.increment_public_site_metrics()
RETURNS TABLE(total_visitors bigint, total_downloads bigint, month_visitors bigint, month_key text)
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
    month_visitors = CASE
      WHEN metrics.month_key = current_month THEN metrics.month_visitors + 1
      ELSE 1
    END,
    month_key = current_month,
    updated_at = now()
  WHERE metrics.id = true;

  RETURN QUERY
  SELECT metrics.total_visitors, metrics.total_downloads, metrics.month_visitors, metrics.month_key
  FROM public.public_site_metrics AS metrics
  WHERE metrics.id = true;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_public_site_metrics() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_public_site_metrics() TO service_role;
