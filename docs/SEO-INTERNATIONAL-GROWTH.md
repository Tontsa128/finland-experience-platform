# Finnexprience — International SEO & European Growth Standard

Status: implementation standard and audit findings, 30 October 2026
Scope: production website, FI/ES/EN content, provider directory, destination hubs, and future European market expansion.
This is a delivery specification, not a claim that every item is already implemented or that rankings/traffic are guaranteed.

## 1. Business and market strategy

Finnexprience is a multilingual travel-discovery, marketing and customer-guidance platform. In the initial model, travellers discover a destination or provider on Finnexprience and complete booking, payment and the service contract directly with the provider. Do not present the platform as a tour operator or bundle travel services unless the business model and legal assessment are deliberately changed.

### Market rollout

- Primary launch market: Spain. Spanish is a core acquisition language, not a secondary machine-translated version.
- Initial languages: Finnish (fi), Spanish (es-ES), English (en-GB/en). Maintain equivalent core information and user journeys across all three.
- Next markets to validate with Search Console, analytics and provider referrals: Germany, United Kingdom, France, Netherlands, Sweden and Italy. These are test priorities, not a commitment to launch every language at once.
- Visit Finland's Spain market report records 216,400 Spanish overnight stays in Finland in 2025 (+10% year-on-year and +25% over pre-pandemic levels). Visit Finland's 2025 market outlook also describes cultural experiences, gastronomy and living like a local as relevant themes.
- Visit Finland's autumn 2025 market outlook lists Germany, UK, France, Netherlands and Italy among the largest intra-European source markets. Statistics Finland and Visit Finland market data should be refreshed before budgets or market order are set.
- Do not target the whole of Europe with one generic campaign. Run country/language-specific landing pages and campaigns, compare qualified provider click-outs and enquiries, and expand only when the economics justify it.

### Positioning and editorial themes

Use genuine coastal, archipelago, rural, food, sauna, nature, culture and local-life experiences. Sell authentic Finland and regional discovery rather than generic "visit Finland" copy. Describe seasonality honestly: show only services and experiences available for the selected season. Never imply winter, year-round opening, availability or a feature without verification.

## 2. Technical SEO baseline

### International URLs and indexing

- Keep locale-specific, crawlable URLs under the existing locale folders: /fi/, /es/ and /en/. Do not rely on cookies, browser language, IP geolocation or JavaScript-only text swaps to expose language versions.
- Every indexable translated page must have a self-referencing canonical and reciprocal hreflang references for the actual equivalent pages. Include x-default only where a deliberate default landing page exists.
- Do not emit hreflang links to missing, unpublished, noindex or materially different pages. Verify the locale URL exists before adding it to alternates.
- Use stable, human-readable URLs. Preserve established URLs; use permanent redirects when changing slugs.
- XML sitemap must contain only canonical, indexable, published URLs returning 200. Exclude admin, API, preview, duplicate, redirected, noindex and unpublished routes.
- Use truthful last-modified dates from source records. Never set every URL's lastmod to the current time on every sitemap request.
- robots.txt must allow public pages and block private/admin/API paths without blocking assets required for rendering.
- Submit sitemap in Google Search Console and Bing Webmaster Tools. Verify domain ownership and monitor indexing, canonical selection, hreflang and crawl errors.
- HTTPS only, one preferred hostname, consistent redirects and no mixed content.

### Page metadata and content structure

- Unique title and description for every locale and page. Write natural search snippets, not keyword stuffing. The title/description length is an editorial guideline; assess actual SERP truncation rather than enforcing a rigid character count.
- One clear page H1, meaningful H2/H3 hierarchy, descriptive internal link text and breadcrumb navigation where useful.
- Use localized keywords based on real search research in Spain (Spanish from Spain), Finland and English-speaking markets. Map one primary search intent to each page; avoid creating near-duplicate thin landing pages.
- Add Open Graph/social preview metadata and a relevant, rights-cleared share image.
- Add structured data only when the page visibly supports it: Organization, WebSite, BreadcrumbList, Article, Event, TouristAttraction/LocalBusiness/Hotel/Restaurant as appropriate. Do not fabricate aggregate ratings, review counts, prices, availability, addresses, opening hours or booking offers. Validate schema and comply with Google's specific rich-result policies.
- Use internal links between destination hubs, categories, provider profiles and genuinely related editorial guides. Ensure important pages are reachable through crawlable links, not only client-side controls.

### Images and media

- Prioritize authentic provider-owned or properly licensed photos. Record owner, source URL, permission/licence, permitted channels, expiry/attribution requirements and date checked in the CMS or asset record.
- Each provider page should have a useful gallery, ideally multiple distinct photos that represent the actual service: rooms for accommodation, dishes/interiors for restaurants, equipment/activity for experiences, and real destination views for places.
- Never substitute unrelated images or use the same image to imply a different service. If the provider has not supplied enough verified images, show fewer images and request an approved image set.
- Write accurate localized alt text that describes the image, not keyword lists. Decorative images use empty alt text.
- Generate responsive AVIF/WebP derivatives, use correctly sized responsive image sources, set intrinsic dimensions/aspect ratios, lazy-load below-the-fold images, and prioritize only the actual hero/LCP image.
- Current repository configuration sets Next.js images to unoptimized because the Cloudflare OpenNext deployment does not provide the default Next image optimizer. Therefore image compression/resizing must be handled by an approved image CDN or a build/CMS media pipeline; do not assume Next/Image is optimizing the bytes automatically.
- Use video only when it adds value; provide poster images, captions/transcripts where needed, and avoid autoplay with sound.

## 3. Performance and Core Web Vitals

Production targets at the 75th percentile of real-user visits:
- LCP <= 2.5 seconds
- INP < 200 milliseconds
- CLS < 0.1

Measure field data in Search Console/CrUX and diagnose with Lighthouse/PageSpeed Insights. Track mobile and desktop separately. Optimize the largest image, fonts, third-party scripts, JavaScript bundles, map widgets and CMS requests. Use CDN caching with correct cache invalidation for published content. Avoid layout shifts from images, banners, fonts and late-loaded widgets.

## 4. Accessibility and UX

- Target WCAG 2.2 AA as the engineering baseline, while checking which legal accessibility requirements apply to the actual business and service.
- Keyboard navigation, visible focus, semantic landmarks, accessible labels, sufficient contrast, screen-reader announcements, captions/transcripts and reduced-motion support.
- Mobile-first layouts with no horizontal overflow, usable touch targets, readable type and a language switcher that remains easy to find.
- Clear CTAs such as "Visit provider", "Book directly with the provider" and their natural Finnish/Spanish equivalents. State clearly that the provider handles the booking and payment.
- Show the information a traveller needs before clicking out: location, what is included, season, verified opening hours/prices when available, accessibility, contact, language availability and last verification date.
- Avoid dark patterns, false urgency, fake scarcity, misleading sponsored placement or unclear commercial relationships.

## 5. Trust, legal and data governance in Europe

- GDPR: document purposes, lawful bases, data minimisation, retention, data-subject rights, processor agreements, international transfers and security controls.
- Cookie/ePrivacy: block non-essential analytics/advertising tags until valid consent where required; offer equally clear accept/reject and preference controls; retain and respect consent records. Essential functionality must not be bundled with marketing consent.
- Analytics: configure GA4 or an equivalent privacy-conscious analytics tool with consent-aware tagging. Do not send personal data or sensitive data in URLs/events.
- Advertising: label sponsored content clearly; identify advertiser and explain targeting where required. Do not target ads using special-category personal data or profile minors. Review platform-specific EU/EEA advertising settings and rules before each campaign.
- DSA and consumer transparency: assess whether platform obligations apply to Finnexprience's actual intermediary functions, provider listings, reviews and any user-generated content. Provide a way to report illegal content and a clear process for complaints/corrections where legally required.
- European Accessibility Act has applied since 28 June 2025 to covered products and services. A microenterprise providing services may be exempt if it meets the legal definition (fewer than 10 employees and annual turnover or balance-sheet total within the applicable EUR 2 million threshold); do not assume exemption without checking the legal entity and service. Accessibility remains the quality baseline regardless.
- Copyright and photo rights: written provider/photographer permissions, model releases where needed, attribution and takedown process.
- Reviews: use genuine reviews with platform/source, checked date and accurate scope. Do not invent, rewrite as direct quotes, selectively misrepresent or combine a property-wide score with restaurant-only feedback.
- Keep provider data freshness: owner/source, verified_at, expires_at/review_due_at and approval status. Expired critical facts should be hidden or marked for confirmation.

## 6. Analytics, measurement and conversion

Set up and verify:
- Google Search Console: impressions, clicks, CTR, average position, page indexing, Core Web Vitals, sitemaps, manual actions and country/query/page breakdown.
- Bing Webmaster Tools: indexing and search performance.
- GA4 or privacy-conscious alternative: acquisition channel, landing page, locale, country, device, engagement and consent state.
- Events: provider_profile_view, provider_outbound_click, booking_link_click, phone_click, email_click, map/directions_click, language_change, search_used and contact_submit. Keep event names consistent and avoid personal data.
- B2B dashboard: provider referrals, qualified leads (only when explicitly defined), paying partners, churn, partner revenue, campaign spend and cost per qualified referral.
- Use UTMs for paid/social/email campaigns; maintain a naming convention by country, language, channel, campaign and creative.
- Report weekly during campaign tests and monthly for business decisions. Separate vanity metrics (views/followers) from qualified provider click-outs and partner value.

## 7. European acquisition plan

### Phase 1 — establish the Spanish channel
- Build strong Spanish-language destination, provider and thematic pages for coastal Finland, archipelago, sauna, food, local culture, slow travel and authentic stays.
- Run small controlled campaigns in Spain, split by intent/theme and landing page. Test Meta/Instagram, Google Search and selected travel-content partnerships; use TikTok/YouTube/Pinterest for visual discovery when content capacity supports them.
- Produce Spanish-native short videos, carousel posts and editorial guides using real approved local photos/video.
- Create partner co-marketing packs so Finnish providers can share their multilingual profile.

### Phase 2 — validate high-potential European markets
- Germany (de-DE): nature, coastal/archipelago travel, sauna, outdoor activity and longer stays.
- United Kingdom (en-GB): authentic coastal/rural experiences, food, culture and short/long break planning.
- France (fr-FR): food, nature, design, sauna and local culture.
- Netherlands (nl-NL): road trips, cycling/outdoors, archipelago and sustainable stays.
- Sweden (sv-SE): nearby coastal/archipelago breaks and local experiences.
- Italy (it-IT): food, culture, nature and seasonal escapes.
These are hypotheses for market testing, not proven segment performance for Finnexprience. Commission native keyword research and validate demand before translating the full site or committing recurring ad spend.

### Phase 3 — scale what converts
- Expand only when country-specific organic traffic, provider click-outs, qualified enquiries and partner retention justify the cost.
- Add native-language content and customer support capacity before increasing ad spend.
- Develop partnerships with destination organisations, regional tourism bodies, travel creators and relevant niche publications. Seek editorial links earned through useful guides, photography and local expertise; avoid paid link schemes.

## 8. Release gates (enterprise standard)

A page or campaign is not considered complete until:
1. Provider facts, images, rights and source are checked and recorded.
2. FI/ES/EN content is reviewed for meaning, local phrasing and factual parity.
3. Metadata, canonical, hreflang, robots/indexability and internal links are verified.
4. Mobile, keyboard and screen-reader checks pass.
5. Images are optimized and Core Web Vitals are measured or scheduled for field validation.
6. Structured data matches visible page content and validates.
7. Analytics events and consent behavior are tested.
8. CI lint, typecheck, tests and production build pass.
9. Preview is visually checked; production deployment is confirmed separately.
10. No demo, mock, placeholder provider data, invented review, fake availability or unlicensed image is published.

## 9. Initial repository audit findings (30 October 2026)

Observed in the current feature branch:
- src/app/sitemap.ts exists and includes static and Supabase-backed entries, but static lastModified is currently set to new Date() for every URL on every generation. This creates misleading freshness signals and should be replaced with real content timestamps or omitted for static pages.
- Sitemap static paths are manually enumerated. They need an automated route/DB consistency audit so stale, unpublished or nonexistent routes do not enter the sitemap and newly published provider pages are not missed.
- src/app/robots.ts exists and disallows /admin/ and /api/, with a sitemap reference.
- src/lib/seo.ts builds canonical, Open Graph, Twitter and FI/ES/EN alternate metadata. Its alternate URLs reuse the same path for every locale; verify this only where route slugs and page existence truly match across languages.
- src/app/layout.tsx hardcodes html lang="en", while the site serves Finnish, Spanish and English. The document language must match the active locale for accessibility and reliable language signals. This requires a safe App Router/next-intl layout solution and a regression test, not a client-side visual language switch.
- next.config.mjs sets images.unoptimized: true for Cloudflare OpenNext. Do not assume Next's image optimizer creates WebP/AVIF derivatives; an explicit image delivery/optimization pipeline is needed.
- Locale-level metadata exists in src/app/[locale]/layout.tsx; page-level metadata coverage and unique titles/descriptions still need a route-by-route audit.
- No live Google Search Console, GA4 or Bing Webmaster verification was performed as part of this repository inspection. Do not claim those accounts are configured until verified.

## 10. Implementation order

P0 — correctness/indexability: active document language; sitemap accuracy; route existence; canonical/hreflang reciprocity; noindex/robots; unique page metadata.
P1 — conversion/trust: verified provider data, outbound event tracking, consent-safe analytics, provider image permissions and freshness workflows.
P2 — performance/accessibility: image pipeline, Core Web Vitals monitoring, WCAG 2.2 AA review, keyboard and screen-reader QA.
P3 — growth: Spain campaign experiments, Search Console keyword/query analysis, then controlled Germany/UK/France/Netherlands/Sweden/Italy market tests.
