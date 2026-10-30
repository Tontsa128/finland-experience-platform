# Kimitoön provider inventory and implementation audit

Audit date: 30 October 2026 (updated after targeted link audit)  
Scope: Kemiö, Kimitoön, Rosala, Bengtskär, Kasnäs, Västanfjärd, Dalsbruk and the surrounding archipelago.  
Implementation branch: `feat/kansakoulu-featured-kimitoon`  
Status: expanded source-based directory; further source/image verification remains in progress.

## Required visitor journey

Homepage → Kimitoön destination → theme/category → provider card → provider's own localized FI/EN/ES detail page → provider's official website, booking or contact channel.

Every provider has one canonical detail route. A provider can appear in several relevant themes without creating duplicate provider profiles. Where a provider offers separate visitor services, category-specific card photography can be used while retaining the same provider detail page.

## Official sources used

- Visit Kemiönsaari destination catalogue: https://www.visitkimitoon.fi/fi/kohteet/
- Visit Kemiönsaari accommodation: https://www.visitkimitoon.fi/fi/syo_ja_majoitu/majoitu/
- Visit Kemiönsaari restaurants and cafés: https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/
- Kemiönsaaren palveluopas / Kimitoöns Serviceguide: https://ksg.fi/fi/

The KSG directory organises local providers into business sectors including experiences, culture and leisure; crafts and art; shops; transport; accommodation; food and drink; health and beauty; venues; and boat/archipelago services. Its homepage currently indicates 27 accommodation listings, 24 food-and-drink listings and 29 transport/vehicle listings. Those counts include some non-tourism services and should not be treated as the number of providers published on FINNEXPRIENCE.

The accommodation model remains direct-to-provider. FINNEXPRIENCE does not take bookings, payments or responsibility for provider contracts.

## Implemented provider directory

The current source-backed directory contains **175 unique provider, service, public-place and official-resource profiles** in `src/lib/kimitoon-providers.ts`. One provider may appear under multiple themes; category totals below are therefore not additive.

| Theme | Provider cards |
|---|---:|
| Accommodation | 45 |
| Restaurants, cafés and food | 41 |
| Activities and experiences | 48 |
| Archipelago and harbours | 39 |
| Culture and sights | 23 |
| Nature and outdoors | 24 |
| Wellbeing and health | 13 |
| Event and celebration venues | 25 |
| Shopping and local products | 21 |
| Events and festivals | 10 |
| Transport and connections | 31 |
| Other visitor services | 45 |
| Winter escapes | 8 |

The directory includes provider, public-place and resource entries sourced from Visit Kemiönsaari and KSG, including accommodation operators, restaurants and cafés, local shops, guides, activity operators, marinas, water taxis, local taxi and bus services, boat services, event venues, museums, theatres, sports facilities, nature trails, ski tracks, winter swimming and the official activity map. The activity map itself lists 277 mapped places; the project includes a curated set of individually described places and links to the complete official map rather than inventing a separate 277-card dataset.

Examples of additional providers and public places included in the expanded KSG-backed inventory:
- Labbnäsin Lomakoti, Storfinnhova Gård, Ragnar Antonin Lomakylä, Bjärkas Golf, Ullman's Villa, Strandhotellet, Björkbodan Ruukinkartano, Hotel Galaxy, Saariloma.net, DB Hostel and other cottage/hostel listings.
- Café DaCapo, Backom Café & Pub, Cafe Kompass, Bistro Marita, Bistro & Bar Road Cafe Yttis, Kasnäs Paviljong, Laituri Grilli, Restaurant Portside, Rigges Thai, Mac Daniel's Grill, Café Adéle, Konditori Mazarin, Terrassn Restaurant and other food providers.
- Rosala Viking Centre, Örö Fortress Island, Hitis Rodd- och Kanotklubb, Arkipelag Workshop, Festival Norpas, Finlandia Sailing, Kalkholmen Marina, Kimitoön Guides, Uppgårds Fotisgolf and other activity providers.
- Anttis Taxi, Luddes Taxi, Taxi Suominen Kjell, Nickes Taxi, Thomas Sjöblom Taxi, Taxi Friberg, Taxi Hellsberg, Taxi Jan Wallenius, Taxi Kim Gustafsson, Taxi Sahlgren, Rosala Taxi, water taxis, Wilson Charter, Vainion Liikenne, Seutu+ and group transport providers.
- Public outdoor places include Ekniemi, Biskopsö, Kasnäs, Lammala, Högland and Yxskär nature trails; Dalsbruk and Långdalen ski tracks; and winter-swimming locations at Labbnäs and Söderlångvik.
- Holmströms Lanthandel, Kasnäs Handel, K-Knallis, K-Market Kompis, K-Supermarket Kompass, Antikvariat Kojan, Aanmaa, Ateljé Rosenblad, Öns Pärlor and other local shops.

## Page and card implementation

- The Kimitoön guide now presents 13 themes: accommodation; food; activities; archipelago; nature; culture; wellbeing; transport; shopping; winter activities; events; event venues; and other visitor services.
- The official activity map is linked as a resource and selected public places from it have their own localized destination pages.
- Each theme links to its own category route.
- Internal destination cards have clickable images and titles.
- Provider cards link to their own canonical localized provider detail route: `/[locale]/providers/kimitoon-[provider-id]`.
- Providers with several services can appear in several themes without duplicate profile records.
- Category-specific imagery is supported where one provider has different verified photos for different services.
- The provider detail page displays available contact information and distinguishes a direct provider site from a KSG directory listing.
- Provider routes and all Kimitoön theme routes are included in the sitemap.
- The existing Kansakoulu accommodation and restaurant pages remain separate service pages and continue to use their verified localized content.

## Image and source policy

The project owner has confirmed general permission to use business information and images for businesses in the Salo area and Kemiö/Kimitoön. This does not remove the need to match each image to the correct provider and service.

- Use provider-owned or official destination-directory images where available.
- Do not reuse restaurant photos as accommodation-room photos or unrelated provider images as a substitute.
- Preserve source/photographer credits where required.
- Where a provider-specific image has not been verified, show a clearly labelled no-photo state rather than a stock image, a guessed image or a fake gallery.
- Some KSG-only records currently link to the official local business directory because a direct provider website or booking URL was not confirmed. The detail page labels that destination as the local directory; these entries are not marked as direct-booking integrations.
- Do not publish unverified prices, opening hours, menus, seasonal dates, availability or amenities as current.

## Remaining verification work

1. Complete the remaining pages of the Visit Kemiönsaari destination catalogue and compare them with the KSG business sectors so that no relevant tourism provider is missed.
2. Verify direct provider websites, booking channels, phone numbers and email addresses for entries that currently link to the general KSG directory.
3. Add more provider-specific image galleries where the official provider source has additional suitable images.
4. Check current opening hours, seasonal operation, menu/price details and accessibility directly with providers before publishing those details.
5. Run the full CI/build on the latest PR head and verify the Cloudflare preview routes before merging.

## Publication rules

1. Use the existing Supabase CMS and current provider architecture; do not introduce a parallel CMS.
2. Do not create demo or mock providers, photos, ratings, prices, menus, hours or booking availability.
3. Keep every provider's FI/EN/ES content distinct and fact-based.
4. External provider channels handle booking, payment and service contracts.
5. Every provider page must have a working return path, localized metadata, source references and responsive accessible layout.


## Current completeness snapshot (30 October 2026)

The 175-profile count describes the directory inventory, not a claim that every profile is publication-complete. A code audit of the current branch found:

- 175 unique IDs; no duplicate profile IDs.
- 45 profiles have a primary card image in the current provider source file; 130 currently use the truthful no-photo state. This count excludes the separate provider-detail gallery map and must not be conflated with gallery coverage.
- 14 profiles have an additional provider-specific photo gallery (30 gallery assets in the detail-page gallery map). The remaining providers need source-by-source image discovery; never fill gaps with unrelated or generated provider photos.
- 41 profiles currently have structured phone/address contact fields; 134 do not yet have structured contact details. This is a data-completeness backlog, not proof that the provider has no public contact information.
- 19 profiles still point to a generic directory homepage rather than a provider-specific listing or official booking/contact page. Four generic links were corrected in the latest audit pass: DB Bistro Runda Munken, K-Supermarket Kompass, Café Våffelstugan and Catering Thomas Åhlberg. The remaining 19 records are listed in the current source audit and should be replaced only when their exact official destination is verified.
- All 175 profiles have FI/EN/ES names and descriptions, and the IDs are unique. This does not replace a human language and factual review.

Priority completion order:
1. Accommodation and food: verify direct provider channels, contact details, room/service facts, current menus and opening information.
2. Match and expand provider-specific image galleries, starting with the providers whose official pages publish multiple relevant images.
3. Transport, activity and event operators: verify direct booking/contact channels, seasonal operation and practical visitor information.
4. Complete reciprocal hreflang/canonical and metadata checks, then test every category and provider route in FI/EN/ES.
5. Migrate the curated provider catalogue into the existing protected Supabase provider CMS before claiming that the directory is fully CMS-managed. The current 175-profile source file is a code-backed catalogue; the existing providers table and admin verification interface are present, but the Kimitoön catalogue is not yet fully connected to that CMS.

## Navigation and CI repairs after the inventory expansion

- Provider cards now pass their originating category to the detail page, so visitors can return to the exact theme as well as the Kimitoön main guide.
- Related Kimitoön links are selected from the originating theme rather than always showing the first four records in the global catalogue.
- Cards distinguish photo credits from general information-source credits when a profile has no photo.
- Structured contacts have been added where current KSG source pages provided reliable phone/address details.
- The PR's previous TypeScript failure was traced to stale plural categories lookups in the Salo and luxury-directory provider branches; those two branches now use the actual singular category field. The latest workflow must pass before merge.
