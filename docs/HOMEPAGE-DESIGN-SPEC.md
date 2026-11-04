# Finland Experience homepage — approved design baseline

Status: approved visual direction; implementation in progress.
Reference: final homepage concept approved in the project conversation on 2026-11-04.

## Product direction
Finland Experience is a premium Finnish travel discovery and service-finding platform, not a conventional destination brochure. Extend the existing Next.js application and Supabase CMS. Do not create a parallel site, duplicate the catalog, or introduce demo/mock business records.

## Visual direction
- Premium Nordic travel editorial style.
- Bright, authentic Finnish coastal, archipelago, lake and village photography.
- Natural off-white, sand, forest-green and deep-green palette.
- Clear editorial typography, restrained spacing, rounded image cards and subtle shadows.
- Responsive, mobile-first layout.
- Finnish, Spanish and English are first-class locales: fi, es and en.

## Approved homepage section order
1. Global header: brand, primary navigation, FI / ES / EN switch, planning shortcut and account access.
2. Hero: large Finnish landscape photography and concise destination-led headline.
3. Prominent unified search: free-text query, service type and destination/area.
4. Four visual service categories: accommodation, food, experiences and attractions.
5. Popular destinations: compact photo cards with name and location.
6. Embedded AI travel assistant: full-width, directly usable search card after the four service-category cards and immediately before popular destinations. The user explicitly requested this placement between the search experience and popular destinations.
7. Recommended accommodation: real photo, service name, location, sourced price only, and existing detail/provider link.
8. Recommended experiences: real photo, service name, location, concise description and existing detail/provider link.
9. Inspiration and current information: events, area guides and trip planning.
10. Existing site footer.

## AI travel assistant
- Embed the existing verified-catalog assistant after the service-category cards and before popular destinations. Its search input must be visible on initial page load, not hidden behind a launcher.
- Keep the existing travel-advisor API integration.
- Quick prompts populate the assistant question input.
- Recommendations must resolve to real catalog records. Never invent providers, availability, prices, reviews or booking links.
- Keep FI/ES/EN responses.

## Search and content integrity
- Search published Supabase records first and use the existing curated local catalog only as its safe fallback.
- Search results link to canonical destination, accommodation and experience pages.
- Do not display fabricated prices or imply live availability without source data.
- Provider booking, payment and contracts remain on the provider's own site.
- Preserve existing CMS, destination hierarchy, provider records, source attribution and image rights.
- If a category has no published records, do not create fake cards to fill the layout.

## Acceptance criteria
- Homepage structure follows the approved order at desktop and mobile widths.
- AI assistant appears between popular destinations and accommodation, not as floating-only UI on the homepage.
- Search submits query, type and area and displays matching catalog records.
- All visible copy and controls work in Finnish, Spanish and English; no Finnish text leaks into ES/EN.
- Every card opens the correct canonical route and displays the correct image for its record.
- No dead links, invented providers, placeholder prices or broken images.
- Existing CMS/admin, provider pages, destination pages and mobile navigation remain operational.
- Run lint, typecheck, tests and production build; inspect the preview in all three locales before merging or deploying.