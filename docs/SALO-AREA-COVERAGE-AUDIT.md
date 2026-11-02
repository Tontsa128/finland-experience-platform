# Salo area coverage audit

Last updated: 2026-11-02  
Working branch: `feat/salo-village-category-hierarchy`

## Current coverage baseline

The Salo directory contains 18 localized area guides and 81 provider/place listings mapped to those areas. The count is a verified implementation baseline, not a claim that every category is complete in every village.

| Area | Mapped listings | Current focus |
|---|---:|---|
| Salo | 4 | Tourism information, guides, camping and fishing |
| Mathildedal | 11 | Accommodation, food, marina, experiences |
| Teijo | 7 | Ironworks, nature, golf, activities and accommodation |
| Mutainen | 2 | Recreational fishing and local art |
| Kirjakkala | 1 | Ironworks village and paddling |
| Särkisalo | 17 | Archipelago stays, marinas, food and fishing |
| Perniö | 3 | Farm and local experiences |
| Halikko | 1 | Local accommodation |
| Vaskio | 1 | Local accommodation |
| Suomusjärvi | 4 | Villa accommodation |
| Kisko | 6 | Farms, local food and heritage |
| Kuusjoki | 4 | Farms, food and heritage |
| Kiikala | 5 | Arboretum, farms, nature trail and guided tours |
| Pertteli | 4 | Farm, ceramics, church and dog forest |
| Muurla | 3 | Accommodation, store/restaurant and raspberry farm |
| Märynummi | 3 | Swimming, disc golf and outdoor trails |
| Hajala | 2 | Village heritage and local services |
| Angelniemi | 3 | Garden, beach and church |

## Added in this work

- Kiikala: Ilolan Arboretum, Rinteen luomutila, Kängin tila, Hyyppärä-Kultalähde trail and Juurevasti juurista guided tours.
- Pertteli: Kurjen maatila, Korpiaho Design, Pertteli Church and Koirametsä Rymy.
- Muurla: Muurlan Opisto, Muurla store/café-restaurant and Ilolan raspberry farm.
- Märynummi: swimming beach, disc golf course and fitness/outdoor area.
- Mutainen: its own localized village guide, Lohenrengas fishing venue and Galleria Tuulitunneli.
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
