# Salo area coverage audit

Last updated: 2026-11-02  
Working branch: `feat/salo-village-category-hierarchy`

## Current coverage baseline

The Salo directory contains 18 localized area guides and 82 provider/place listings mapped to those areas. Overall category distribution: 3 tourism information resources, 30 accommodation listings, 21 experiences, 9 nature/outdoor listings and 19 food listings. The count is a verified implementation baseline, not a claim that every category is complete in every village.

| Area | Total | Tourism | Stay | Experience | Nature | Food | Categories still missing |
|---|---:|---:|---:|---:|---:|---:|---|
| Mathildedal | 11 | 1 | 7 | 0 | 0 | 3 | Experience, nature |
| Teijo | 8 | 0 | 3 | 4 | 1 | 0 | Tourism, food |
| Särkisalo | 17 | 0 | 9 | 3 | 2 | 3 | Tourism |
| Perniö | 3 | 0 | 2 | 1 | 0 | 0 | Tourism, nature, food |
| Halikko | 1 | 0 | 1 | 0 | 0 | 0 | Tourism, experience, nature, food |
| Vaskio | 1 | 0 | 1 | 0 | 0 | 0 | Tourism, experience, nature, food |
| Suomusjärvi | 4 | 0 | 4 | 0 | 0 | 0 | Tourism, experience, nature, food |
| Salo | 4 | 1 | 1 | 2 | 0 | 0 | Nature, food |
| Kisko | 6 | 0 | 0 | 2 | 0 | 4 | Tourism, stay, nature |
| Kuusjoki | 4 | 0 | 0 | 1 | 0 | 3 | Tourism, stay, nature |
| Kiikala | 5 | 0 | 0 | 1 | 2 | 2 | Tourism, stay |
| Pertteli | 4 | 0 | 0 | 2 | 1 | 1 | Tourism, stay |
| Muurla | 3 | 0 | 1 | 0 | 0 | 2 | Tourism, experience, nature |
| Märynummi | 3 | 0 | 0 | 1 | 2 | 0 | Tourism, stay, food |
| Hajala | 2 | 0 | 0 | 2 | 0 | 0 | Tourism, stay, nature, food |
| Angelniemi | 3 | 0 | 0 | 1 | 1 | 1 | Tourism, stay |
| Kirjakkala | 1 | 0 | 1 | 0 | 0 | 0 | Tourism, experience, nature, food |
| Mutainen | 2 | 1 | 0 | 1 | 0 | 0 | Stay, nature, food |

## Added in this work

- Kiikala: Ilolan Arboretum, Rinteen luomutila, Kängin tila, Hyyppärä-Kultalähde trail and Juurevasti juurista guided tours.
- Pertteli: Kurjen maatila, Korpiaho Design, Pertteli Church and Koirametsä Rymy.
- Muurla: Muurlan Opisto, Muurla store/café-restaurant and Ilolan raspberry farm.
- Märynummi: swimming beach, disc golf course and fitness/outdoor area.
- Mutainen: its own localized village guide and Galleria Tuulitunneli. Lohenrengas is mapped to Teijo, following the official service directory's location grouping.
- Official Visit Salo/provider images have source attribution and translated alt text where a matching image was published.
- Provider details link to the provider's own website or official destination record; the platform does not take bookings or payments.

## Remaining work — not yet production-approved

1. **Category coverage:** the five directory categories (tourism, stay, experience, nature, food) are not evenly represented in every area. Continue provider research for Perniö, Halikko, Vaskio, Suomusjärvi, Kirjakkala, Hajala, Angelniemi and the smaller villages. Do not create artificial listings just to fill a category.
2. **Provider verification:** verify each provider's current official URL, contact details, seasonal operation, accessibility and booking route before exposing those fields as current facts.
3. **Image verification:** check every primary image and gallery image against its provider/source page in the actual rendered site. Do not repeat a gallery image already used as the hero image. Keep image credits and source links visible.
4. **Translation QA:** proofread FI first, then EN, then ES. Confirm names, route warnings, seasonal statements, accessibility wording and CTA labels.
5. **Navigation QA:** test landing page → area → category → provider detail → official provider link in all three locales.
6. **Technical QA:** run lint, typecheck, unit tests, production build and Cloudflare OpenNext build; inspect generated static routes and sitemap.
7. **Production QA:** test the deployed Cloudflare Worker on mobile and desktop. Do not merge or deploy until CI is green and route/image checks pass.

## Kansakoulu photo/content boundary

The currently accessible official Kansakoulu website publishes restaurant and local-food photographs, but no guest-room photographs. The accommodation page may show those images only in a clearly labelled shared-venue/food section. They must not be presented as room imagery. Request room-specific images directly from the provider if they are required.

The supplied `majatalokansakoulu.fi` address was not accessible during this audit. The current public content and image references used in the implementation are on `https://www.kansakouluun.fi/`.

## Primary sources

- Visit Salo destination listings: https://kohteet.visitsalo.fi/
- Kiikala: https://kohteet.visitsalo.fi/location/kiikala/
- Pertteli: https://kohteet.visitsalo.fi/location/pertteli/
- Muurla: https://kohteet.visitsalo.fi/muurla/
- Märynummi: https://kohteet.visitsalo.fi/marynummen-uimaranta/
- Mutainen: https://www.teijo.fi/tervetuloakyliin/mutainen/
- Teijo Ironworks Villages service directory: https://www.teijo.fi/palveluja/erikoisliikkeita-ja-palveluita/
- Kansakoulu: https://www.kansakouluun.fi/
