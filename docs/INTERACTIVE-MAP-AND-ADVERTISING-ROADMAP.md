# Finland Experience: interactive map and advertising roadmap

## Confirmed choices
- Interactive map.
- Timed advertising slide shows.
- Both recurring monthly visibility products and fixed-duration campaigns.
- Initial coverage: Salo, Perniö, Mathildedal and Teijo in Southwest Finland.
- Visitors continue to book directly with providers; the platform is a multilingual destination directory.

## Existing architecture to preserve
- Next.js App Router, React, TypeScript and FI/ES/EN routing.
- Existing Supabase CMS, authentication, role model, media library and cms-media bucket.
- Existing homepage homepage_slides remain editorial content and are not paid advertising.
- Existing site_banners remain intact. Paid campaigns use separate records and approval rules.
- Leaflet is already a dependency and its CSS is imported globally.

## Delivery sequence
1. Public map (current PR): localized /[locale]/map; four pilot destinations plus Turku/Helsinki reference points; client-only Leaflet initialization; OpenStreetMap attribution; no fabricated driving routes or journey times.
2. Advertising display: separate paid-ad slideshow; 3–5 slides; 5–7 second default dwell; pause/manual navigation; reduced-motion support; no autoplay audio; mobile-safe image crops; sponsored label; only approved, in-date and correctly targeted campaigns.
3. Supabase model: additive migrations for campaigns, slides, placements, orders and analytics. Keep files in cms-media; apply RLS so public reads are limited to approved active ads and writes require authorized CMS roles.
4. CMS management: campaign editor, provider selection, slide ordering, FI/ES/EN text, placement and region targeting, date scheduling, preview, approval and archive. Preserve SUPER_ADMIN, ADMIN, CONTENT_MANAGER, BOOKING_MANAGER and EDITOR.
5. Commercial orders and reports: monthly and fixed 7/14/30-day products; initially manual invoicing and order status, no checkout; real viewable impressions and outbound clicks only.
6. Validation: lint, typecheck, i18n, unit tests, production build, role/RLS tests, date-window and targeting tests, desktop/mobile and all locales.

## Non-goals
- No new CMS or destructive table changes.
- No repurposing or deleting editorial slides.
- No visitor booking checkout or travel-package sales.
- No auto-publishing unapproved ads.
- No invented provider information, routes, distances or analytics.
- No Google Maps dependency in the first release.
