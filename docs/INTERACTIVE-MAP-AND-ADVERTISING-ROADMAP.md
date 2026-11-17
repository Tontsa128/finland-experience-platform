# Finland Experience: interactive map and advertising roadmap

## Confirmed choices
- Interactive map.
- Timed advertising slide shows.
- Both recurring monthly visibility products and fixed-duration campaigns.
- Initial coverage: Salo, Perniö, Mathildedal and Teijo in Southwest Finland.
- Visitors continue to book directly with providers; the platform is a multilingual destination directory.

## Existing architecture to preserve
- Next.js App Router, React, TypeScript and FI/ES/EN routing.
- Existing Supabase CMS, authentication, role model, media library and `cms-media` bucket.
- Existing homepage `homepage_slides` remain editorial content and are not paid advertising.
- Existing `site_banners` remain intact. Paid campaigns use separate `ad_campaigns` and `ad_campaign_events` tables.
- Existing Leaflet dependency is reused for the map; OpenStreetMap attribution is retained.

## Current PR implementation
1. Localized interactive map at `/[locale]/map` with Salo, Perniö, Mathildedal and Teijo plus Turku/Helsinki reference points.
2. Discovery link from the destination directory to the map.
3. Additive Supabase migration `20261117093000_paid_advertising.sql` for separate paid campaigns and event metrics.
4. Paid slideshow component with 3–5 localized slides, 5/6/7-second timing, pause/manual controls, reduced-motion support, no audio, sponsored labeling and outbound links.
5. Display placements on the homepage, map, destination directory, accommodation directory and experience directory.
6. CMS campaign editor at `/admin/ad-campaigns`, linked from the existing CMS. Uses the existing media library and supports monthly/campaign billing models, scheduling, region/placement, drafts, approval and archive.
7. Protected campaign API with role checks. CONTENT_MANAGER can prepare campaigns; ADMIN/SUPER_ADMIN approval is required to publish.
8. Minimal event collection for slide impressions and outbound clicks; no user profiles, cookies or personal data are added. CMS shows event totals and event click rate.

## Remaining work before production
- Run and pass lint, TypeScript, unit tests and production build on the final PR head.
- Apply migration `20261117093000_paid_advertising.sql` to the connected Supabase project only after review/approval.
- Test all three locales, desktop/mobile image crops, keyboard controls, reduced motion, campaign scheduling and role permissions.
- Verify that campaign images are selected from the existing CMS media library and that all links lead to the intended provider.
- Validate analytics against actual rendered views and clicks; event click rate is not a unique-user conversion rate.
- Add provider onboarding, rate cards and manual invoice workflow before selling placements.

## Commercial boundaries
- Monthly and fixed-duration prices are editable campaign fields; no prices are pre-filled as agreed commercial terms.
- This implementation does not charge cards, create invoices or make bookings. Payment and provider booking remain outside the platform for now.
- No campaign appears publicly unless approved and within its scheduled window.
- The initial public audience is Southwest Finland only.

## Non-goals
- No new CMS or destructive table changes.
- No repurposing or deleting editorial slides or existing site banners.
- No visitor booking checkout or travel-package sales.
- No auto-publishing unapproved ads.
- No invented provider information, routes, distances or analytics.
- No Google Maps dependency in the first release.
