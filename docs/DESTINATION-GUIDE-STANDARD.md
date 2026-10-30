# FINNEXPRIENCE destination guide standard

This is the required editorial and implementation standard for all destination guides, starting with Mathildedal. Reuse the same quality bar and information architecture for every future destination.

## 1. Purpose and visitor journey
- Help international and Finnish visitors plan a destination visit from inspiration to practical provider discovery.
- Guide the visitor through: story and atmosphere → categories → individual providers → provider's own website.
- FINNEXPRIENCE is a discovery and inspiration platform, not a tour operator. Do not combine bookings, collect payments, or imply that FINNEXPRIENCE owns the provider's service contract.
- Make booking, prices, opening hours, availability, and service terms clear as the provider's responsibility.

## 2. Languages and writing
- Every public destination page and category page must support Finnish (fi), English (en), and Spanish (es).
- Write natural, polished destination copy in each language; do not translate word-for-word when it sounds unnatural.
- Never invent facts, providers, opening hours, prices, events, facilities, awards, or sustainability claims.
- Avoid generic filler. Explain what a visitor can actually discover and why the destination is worth time.
- Have language-specific metadata, page title, description, meaningful image alt text, and internal links.

## 3. Information architecture
Create a destination landing page and individual category pages where relevant:
- Accommodation
- Restaurants and cafés
- Activities and outdoor experiences
- Culture and local heritage
- Shopping, crafts and design
- Events and seasonal programme
- Add other categories only when reliable local information supports them.

Each provider should have an individual card with:
- Correct provider name
- A concise, useful description
- A photograph that genuinely represents that provider or clearly represents the destination rather than falsely implying it is the provider's own image
- Visible image/source credit where required
- A direct external link to the provider or authoritative organiser
- Clear category assignment and accessible alt text

## 4. Research and verification
- Start with the official destination tourism website, then verify provider details on each provider's own website.
- Keep a record of source URLs and what each source supports.
- Check every external link and image URL before release; do not assume that a link works because it appears in a directory.
- Events are time-sensitive: show upcoming events only after checking dates and status with the organiser. Do not keep expired events as upcoming.
- Mark unverified information for review instead of publishing it as fact.
- Avoid presenting a directory as complete unless every official category and listing has been audited.

## 5. Image and rights policy
- Match the image to the actual provider/category. Do not use an unrelated image of a village, harbour, forest, or another business as if it showed the provider.
- The project owner has explicitly confirmed that FINNEXPRIENCE has permission to use images and business information for businesses throughout the Salo area and Kemiö/Kimitoön. Treat this as the project-wide authorization scope for those areas; do not block work by requesting the same permission from every provider again.
- Use the authorized businesses' own relevant images and information where available. Confirm that each asset actually depicts the provider/service being presented; permission does not make an unrelated image accurate.
- Record image/source URLs and any known photographer/owner credit or attribution requirement. Preserve required credits in the UI.
- If a specific asset has a conflicting rights notice, a third-party restriction, or an unclear origin outside the confirmed authorization scope, flag that asset for review rather than assuming the blanket permission covers it.
- Use bright, sharp, authentic, high-quality photography; avoid dark, blurry, unrelated, animated, or misleading visuals.

## 6. Design and accessibility
- Premium Nordic travel editorial style: authentic, welcoming, calm, high-quality, not generic SaaS.
- Mobile-first responsive layout, readable contrast, semantic headings, keyboard-friendly links, meaningful alt text, and fast-loading imagery.
- Use a consistent card system, spacing, typography, image ratios, and CTA style across destinations.
- Avoid unnecessary motion and avoid hiding essential content behind animation.

## 7. SEO and technical quality
- Include destination and category pages in the sitemap and ensure canonical/hreflang metadata works for fi/en/es.
- Verify locale routing and metadata for every page.
- Use stable, descriptive URL slugs and internal links between destination and category pages.
- Run lint, typecheck, tests, and production build where available; review CI results before merge.
- Verify the deployed site on mobile and desktop, all three languages, image loading, external links, and sitemap after deployment.
- Do not merge or publish an unverified change to production.

## 8. Provider monetisation readiness
- Build the directory so provider records can later be managed through the existing CMS rather than hard-coded in page components.
- Keep provider data structured: name, category, localized descriptions, external URL, image, image credit/rights status, location, source, and verification status.
- Future paid listings must be clearly distinguished from editorial listings and must not be sold as verified recommendations without appropriate checks.
- Do not build a second CMS. Extend the existing Supabase CMS and preserve role/security boundaries.

## 9. Completion checklist
- [ ] Official destination pages and categories audited
- [ ] Provider names, URLs, and categories checked
- [ ] Each card has a useful FI/EN/ES description
- [ ] Each image matches the card and its usage permission is confirmed
- [ ] Required image credits are visible
- [ ] Expired events are excluded or clearly archived
- [ ] Mobile and desktop checked
- [ ] Metadata, sitemap, locale routes, and links checked
- [ ] CI/build checks pass
- [ ] Deployment verified before declaring the work complete

Apply this standard across every destination guide in FINNEXPRIENCE. The active repair sequence starts with Kemiö and Kimitoön, then continues to the other areas.

## 10. Mandatory provider-page journey and content standard

This section applies to every destination and provider across the entire FINNEXPRIENCE project, not only the first pilot areas.

### Required navigation hierarchy

1. Homepage → destination/area landing page.
2. Destination/area page → relevant service category.
3. Category page → provider card/listing.
4. Provider card image and title → that provider's own localized detail page.
5. Provider detail page → the provider's own official website or booking/contact channel.

A category listing is not a substitute for the provider's detail page. Do not send a visitor directly from a discovery card to an unrelated external page when a provider detail page is required. Keep the provider's external booking or website link clearly visible on the detail page. Provide a working return path to the category and destination.

### Required provider detail page

Every accommodation, restaurant, café, sauna, cottage, activity and other listed provider must have its own canonical detail page with equivalent Finnish, English and Spanish content. The page must use the provider's real identity and verified information, not a generic copied description.

Include where applicable:
- Provider name, category, destination and verified location/contact information.
- A concise, attractive introduction and a useful fuller description of the actual service.
- A gallery of multiple distinct images that genuinely show that provider and the relevant service.
- Visible image credits where required; image use is covered by the project owner's confirmed authorization for Salo-area and Kemiö/Kimitoön businesses, subject to any specific third-party restrictions.
- A clear external provider website, booking, reservation or contact CTA.
- Relevant practical details and accessibility information when verified.
- Category-specific information: accommodation room types/facilities and booking terms; restaurant menu or a clear notice when no current menu is published, plus verified opening hours; sauna facilities and booking channel; cottage capacity/facilities and rental terms; activity content, season and operator.
- Localized metadata, meaningful image alt text, canonical/hreflang and internal links.

The provider card's image must also match the provider and category. An image of a restaurant must never be used to represent accommodation rooms. If a suitable image cannot be found among the authorized material, do not substitute another service's image or misleading stock imagery. Keep the page truthful and flag the missing asset for targeted sourcing; do not repeatedly request blanket permission already confirmed by the project owner.

### Editorial and data integrity

- Verify content against the provider's own current website or written confirmation; use the official destination site for area context.
- Do not invent menu items, opening hours, prices, availability, review scores, contact details, amenities, awards or accessibility claims.
- If current details cannot be verified, state that the visitor should confirm them directly with the provider; do not present stale information as current.
- Keep review platform, score, review count, scope and checked date distinct. Never present a whole-property rating as a restaurant-only rating.
- Keep the same provider identity and canonical URL across FI/EN/ES; translated pages must not point to a different provider.
- Manage provider content through the existing Supabase CMS and existing authorization model wherever the current schema supports it. Do not create a parallel CMS or bypass security/RLS. Any missing structured CMS capability must be documented and implemented as a reviewed schema/API change, not hidden in hard-coded page components.
- A provider page is complete only when its content, links, photos/rights, language versions, mobile layout, accessibility, metadata and route behavior have all been checked.

Apply this standard to existing pages during repairs as well as all new destination and provider work.
