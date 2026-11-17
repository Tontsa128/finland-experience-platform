# Homepage carousel content audit

**Scope:** read-only audit of the 10 enabled `site_settings.homepage_slides` records in the production CMS, reviewed against the current source URLs, Wikimedia Commons file descriptions and provider source pages.

**Important limitation:** the current CMS JSON was read back directly from the live `site_settings.homepage_slides` record. Source-page descriptions were checked, but this is not a full visual QA of every rendered image in the deployed browser. Do not mark an image as visually approved based only on its filename or source-page description. No production CMS records were changed.

## Slide-by-slide findings

| CMS slide | Current image/source evidence | Copy fit | Recommendation | Status |
|---|---|---|---|---|
| `summer` | Wikimedia Commons file `Turku_archipelago_house.jpg`; the source identifies an archipelago-house subject. | Live CMS still uses “Suomen kesä alkaa rannikon pienistä paikoista” / “El verano finlandés empieza en la costa” / “Finnish summer begins in the small places on the coast”, with the old `Hidden Coastal Finland` eyebrow in all locales. This conflicts with the new nationwide homepage positioning. | Suggested copy: FI title “Kesäpäiviä Turun saariston pienissä paikoissa”, text “Saariston kylät, merimaisemat ja kesän rauhallinen rytmi kutsuvat viipymään.” ES title “Días de verano en los pequeños pueblos del archipiélago de Turku”, text “Pueblos isleños, paisajes marinos y el ritmo tranquilo del verano invitan a quedarse.” EN title “Summer days in the small places of the Turku Archipelago”, text “Island villages, sea views and the slower rhythm of summer invite you to stay a little longer.” Set eyebrow to “Turun saaristo” / “Archipiélago de Turku” / “Turku Archipelago”. | Copy update required; image visual check pending |
| `cottage` | Wikimedia Commons source page identifies the image as a Finnish summer cottage in Keuruu. | Cottage, lake and summer accommodation copy is a direct match. | Keep the subject pairing; visually confirm crop and image quality in the live carousel. | Metadata match; visual check pending |
| `archipelago` | Wikimedia Commons source page describes a small wooden house in the Turku Archipelago. | Copy describes a small wooden house among the islands. Strong subject match. | Keep; visually confirm crop and quality. | Metadata match; visual check pending |
| `hanko` | Wikimedia Commons source page identifies the photo as an aerial view of the Hanko Peninsula. | Live copy focuses on beaches, wooden houses and sea breeze; it does not tell the visitor that the photograph is an aerial view. | Suggested title: FI “Hanko ylhäältä – meri ja niemi”, ES “Hanko desde el aire: mar y península”, EN “Hanko from above: sea and peninsula”. Describe only the aerial view, peninsula and shoreline; do not promise wooden houses unless confirmed in the crop. | Copy refinement recommended; visual check pending |
| `naantali` | Wikimedia Commons source page identifies the image as Naantali harbour and church. | Live copy focuses on colourful wooden houses and the gateway to the archipelago; the photo's documented subjects are the harbour and church. | Suggested title: FI “Naantalin vanha satama ja kirkko”, ES “El puerto antiguo y la iglesia de Naantali”, EN “Naantali’s old harbour and church”. The description should mention the harbour and church; mention wooden houses only if clearly visible in the crop. | Copy refinement recommended; visual check pending |
| `mathildedal` | Wikimedia Commons source page identifies Anttipoffi, a former workers’ housing building from 1852 at Mathildedal Bruk. | Live CMS copy describes crafts, cafés, sea and forest trails around the historic ironworks village. It fits the destination generally but does not identify the building pictured. | Align copy more closely with the historic workers’ quarters, while keeping the village context. Do not state a specific date in the visible copy unless verified against the source page. | Copy refinement recommended; visual check pending |
| `aland` | Wikimedia Commons source page identifies the photo as a landscape/viewpoint near Kastelholm in Sund, Åland (Lillnäsberget / Tjudnäsvägen). | The current live CMS text is generic: sea, rocky islands and Nordic summer light. It does **not** claim that Kastelholm Castle is pictured. The earlier audit incorrectly described the current copy as a castle claim. | For a closer match, optionally name the Kastelholm area/viewpoint in all locales. Do not label the image as a castle photograph unless a castle is visually confirmed. | Broad thematic match; exact visual check pending |
| `porvoo` | Wikimedia Commons source page identifies the image as Porvoo Old Town viewed from a hot-air balloon. | Live copy describes red riverside warehouses, historic streets and the old town, but does not explain the elevated viewpoint. | Consider making the aerial viewpoint explicit while retaining only details that are visible in the image. | Metadata match; visual check pending |
| `hankoBeach` | Wikimedia Commons source file is explicitly named Regattanranta beach in central Hanko. | Copy describes a sunny sandy beach and open sea in Hanko. Direct match. | Keep; visually confirm the crop. | Metadata match; visual check pending |
| `herrankukkaro` | CMS points to a provider-hosted image on Herrankukkaro’s CDN and credits Herrankukkaro. | Copy describes smoke sauna by the sea. The image URL is provider-owned, but the exact CDN asset has not yet been visually verified against the copy. | Prefer a verified image from Herrankukkaro’s own sauna gallery that clearly depicts the smoke sauna named in the copy. Keep the provider credit and direct provider link. | Provider source; exact image visual check pending |

## Priority corrections before production publication

1. Remove the old coastal branding and coastal wording from the `summer` slide in FI/ES/EN; align the copy with the Turku Archipelago house image.
2. Align the `hanko` slide copy with the documented aerial view of the peninsula.
3. Align the `naantali` slide copy with the documented harbour-and-church image.
4. Consider tightening the `mathildedal` and `porvoo` copy to name the documented building/viewpoint.
5. Keep the `aland` text factual and generic or explicitly describe the landscape near Kastelholm; the current copy does not claim that the castle is pictured.
6. Confirm the exact Herrankukkaro CDN image visually; if it does not show the smoke sauna described, replace it with an approved provider-owned sauna photo or keep the slide disabled until verified.
7. Perform a browser-level review of all ten slides on desktop and mobile, including crop, text contrast, attribution visibility, image load and carousel timing.

## Publishing safeguards

- Keep the image and its localized FI/ES/EN copy as one inseparable content record.
- Prefer current provider-owned photos for provider/service slides, with permission/source recorded.
- For destination inspiration, use destination-specific photos and factual descriptions.
- Never substitute an unrelated image when an asset fails to load.
- Do not mark the carousel production-ready until the visual review is complete.
- Changes to production `site_settings.homepage_slides` require an explicit content approval and a post-write read-back verification.

## Source references

- [Keuruu summer cottage — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg)
- [Turku Archipelago — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Turku_Archipelago.jpg)
- [Hanko aerial — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hanko_aerial_1.jpg)
- [Naantali harbour and church — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Naantali_harbour_and_church.jpg)
- [Anttipoffi workers’ quarters — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg)
- [Kastelholm 2026-08-09 image12 — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg)
- [Porvoo Old Town from a hot-air balloon — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg)
- [Herrankukkaro sauna and baths — official provider page](https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt)


## Ready-to-enter copy proposals for the CMS

These are editorial proposals based on the current CMS JSON and the documented source subjects. They are **not yet written to production**.

### `summer` — replace the old coastal campaign wording

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Turun saaristo | Kesäpäiviä Turun saariston pienissä paikoissa | Saariston kylät, merimaisemat ja kesän rauhallinen rytmi kutsuvat viipymään. |
| ES | Archipiélago de Turku | Días de verano en los pequeños pueblos del archipiélago de Turku | Pueblos isleños, paisajes marinos y el ritmo tranquilo del verano invitan a quedarse. |
| EN | Turku Archipelago | Summer days in the small places of the Turku Archipelago | Island villages, sea views and the slower rhythm of summer invite you to stay a little longer. |

### `hanko` — make the aerial viewpoint explicit

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Hanko · Suomen eteläkärki | Hanko ylhäältä – meri ja niemi | Ilmakuva näyttää Hangon niemen, meren ja pitkän rantaviivan. |
| ES | Hanko · sur de Finlandia | Hanko desde el aire: mar y península | La vista aérea muestra la península de Hanko, el mar y su extensa línea costera. |
| EN | Hanko · southern Finland | Hanko from above: sea and peninsula | The aerial view reveals the Hanko Peninsula, the sea and its long shoreline. |

### `naantali` — match the harbour and church

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Naantali | Naantalin vanha satama ja kirkko | Satamanäkymä ja Naantalin kirkko kertovat kaupungin pitkästä historiasta meren äärellä. |
| ES | Naantali | El puerto antiguo y la iglesia de Naantali | El puerto y la iglesia de Naantali reflejan la larga historia de la ciudad junto al mar. |
| EN | Naantali | Naantali’s old harbour and church | The harbour and Naantali Church reflect the town’s long history by the sea. |

### `aland` — describe the documented landscape, not the castle

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Ahvenanmaa · Sund | Maisema Kastelholmin lähistöllä | Kallioinen saaristomaisema avautuu Sundissa Kastelholmin seudulla. |
| ES | Åland · Sund | Paisaje cerca de Kastelholm | Un paisaje rocoso del archipiélago se abre en la zona de Kastelholm, en Sund. |
| EN | Åland · Sund | A landscape near Kastelholm | A rocky archipelago landscape opens up near Kastelholm in Sund. |

### `mathildedal` — make the historic building subject clearer

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Mathildedal · Salo | Mathildedalin historiallista ruukkikylää | Anttipoffi ja vanhat työväenasunnot kertovat Mathildedalin ruukkikylän historiasta. |
| ES | Mathildedal · Salo | El histórico pueblo industrial de Mathildedal | Anttipoffi y las antiguas viviendas obreras cuentan la historia de este pueblo industrial. |
| EN | Mathildedal · Salo | The historic ironworks village of Mathildedal | Anttipoffi and the former workers’ quarters tell the story of this historic ironworks village. |

### `porvoo` — name the elevated viewpoint

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Porvoo | Porvoon vanha kaupunki yläilmoista | Ylhäältä avautuu näkymä Porvoon historialliseen jokirantaan ja vanhaan kaupunkiin. |
| ES | Porvoo | El casco antiguo de Porvoo desde el aire | Desde las alturas se abre una vista del histórico río y del casco antiguo de Porvoo. |
| EN | Porvoo | Porvoo Old Town from above | The elevated view opens over Porvoo’s historic riverside and old town. |

### `herrankukkaro` — image verification required

Do not approve or rewrite this slide as a smoke-sauna image until the exact CDN asset has been visually checked against the provider’s official sauna gallery. If the current image is not clearly the smoke sauna, replace it with a provider-approved image or leave the slide disabled. Keep the provider credit and external provider link.

### `cottage` and `archipelago` — avoid details not visible in the selected crop

The cottage image source identifies a Finnish summer cottage by a lake. Before claiming a private sauna or jetty, verify that those features are visible in the selected image or clearly label them as destination context rather than pictured details. For the archipelago slide, keep the wording broad enough to fit the actual selected photograph; do not describe specific rocks, trees or buildings unless visible in the crop.
