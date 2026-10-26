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
- Prefer official provider or destination image assets for which usage permission is confirmed.
- Record the image URL/source, rights or permission status, and any required photographer/owner credit.
- Display required credits in the UI; storing a credit in data is not enough.
- Do not publish an image until the right to use it on FINNEXPRIENCE has been confirmed.
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

Apply this standard to Mathildedal first, then reuse it for every subsequent destination guide.
