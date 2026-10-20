# FINNEXPRIENCE public visitor metrics

The public header metrics are a display of separate measures. Do not combine them into one number.

- **Visitors this month**: counted browser sessions since the current Helsinki calendar month began tracking. This is not a retroactive analytics export or a verified count of unique people.
- **Total visitors**: owner-provided starting baseline of 17,558; incremented when a browser session is counted by the new endpoint.
- **Total downloads**: owner-provided historical baseline of 53,547. This remains a baseline until download events are connected to a reliable source.
- **Total site visits**: preserves the legacy 50,000+ lower bound separately from visitors and downloads; future counted sessions increment it.

## Database setup

Apply Supabase migrations in numeric order, including:

1. `0013_public_visitor_counter.sql`
2. `0014_preserve_legacy_visitor_floor.sql`
3. `0015_public_site_metrics.sql`
4. `0016_preserve_and_continue_site_visits.sql`

Use the project's normal Supabase migration workflow (for example, `supabase db push`) against the intended project. Confirm the target project before applying production migrations. The legacy floor is a conservative lower bound, not a verified exact historical total.

## Vercel environment

The server-side API requires:

- `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_SERVICE_ROLE_KEY`

The service-role key must remain server-side and must never use a `NEXT_PUBLIC_` prefix. Configure the values in the Vercel project's Environment Variables for the relevant deployment environments, then redeploy.

## Verification

After deployment, request `/api/visitor-count`. A successful response should contain numeric `monthVisitors`, `totalVisitors`, `totalDownloads`, `totalSiteVisits` and `configured: true`.

If the response contains `configured: false` or returns HTTP 503, verify the environment variables, applied migrations, and Supabase project URL. Do not present the counter as live until the endpoint is verified. The current-month figure starts at zero when the new metrics table is first initialized; it is not inferred from the historical total.
