-- The existing hosting/server statistics report more than 50,000 historical visits.
-- The exact historical total has not yet been exported, so preserve a conservative lower bound
-- rather than resetting the public counter to zero or claiming an unverified exact total.
UPDATE public.public_visitor_counter
SET total_visits = GREATEST(total_visits, 50000),
    updated_at = now()
WHERE id = true;
