# Homepage carousel content audit

**Scope:** read-only audit of the 10 enabled `site_settings.homepage_slides` records in the production CMS, reviewed against the current source URLs, Wikimedia Commons file descriptions and provider source pages.

**Important limitation:** the current CMS JSON was read back directly from the live `site_settings.homepage_slides` record. Source-page descriptions were checked, but this is not a full visual QA of every rendered image in the deployed browser. Do not mark an image as visually approved based only on its filename or source-page description. No production CMS records were changed.

## Slide-by-slide findings

| CMS slide | Current image/source evidence | Copy fit | Recommendation | Status |
|---|---|---|---|---|
| `summer` | Wikimedia Commons file `Turku_archipelago_house.jpg`; the source categories place it among Ruissalo summer houses, in the Turku area. | Live CMS still uses “Suomen kesä alkaa rannikon pienistä paikoista” / “El verano finlandés empieza en la costa” / “Finnish summer begins in the small places on the coast”, with the old `Hidden Coastal Finland` eyebrow in all locales. This conflicts with the new nationwide homepage positioning. | Suggested copy should identify the photographed summer house and its Ruissalo setting rather than making a broad claim about every Finnish coastal village. Use FI eyebrow “Ruissalo · Turku”, title “Kesähuvila Ruissalossa”, text “Ruissalon kesähuvilat ja merellinen ympäristö kertovat Turun saariston kesäperinteestä.” ES eyebrow “Ruissalo · Turku”, title “Una casa de verano en Ruissalo”, text “Las casas de verano de Ruissalo y su entorno marítimo forman parte de la tradición estival del archipiélago de Turku.” EN eyebrow “Ruissalo · Turku”, title “A summer house in Ruissalo”, text “Ruissalo’s summer houses and seaside setting are part of the Turku Archipelago’s summer tradition.” | Copy update required; image visual check pending |
| `cottage` | Wikimedia Commons source page identifies a Finnish summer cottage in Keuruu beside a lake. | Live copy also claims a private sauna and jetty; those features are not established by the image source and should not be described as pictured. | Keep the cottage-and-lake pairing, but remove the unsupported sauna/jetty claims from the slide copy. | Core subject match; copy needs tightening |
| `archipelago` | Wikimedia Commons file description explicitly identifies a small wooden house in the middle of the Turku Archipelago. | Live copy talks about blue water and sun-warmed rocks, but does not describe the house that is the documented subject. | Rewrite the copy to describe the small wooden house in the Turku Archipelago; avoid claims about rocks/trees unless confirmed in the crop. | Copy update required |
| `hanko` | Wikimedia Commons source page identifies the photo as an aerial view of the Hanko Peninsula. | Live copy focuses on beaches, wooden houses and sea breeze; it does not tell the visitor that the photograph is an aerial view. | Suggested title: FI “Hanko ylhäältä – meri ja niemi”, ES “Hanko desde el aire: mar y península”, EN “Hanko from above: sea and peninsula”. Describe only the aerial view, peninsula and shoreline; do not promise wooden houses unless confirmed in the crop. | Copy refinement recommended; visual check pending |
| `naantali` | Wikimedia Commons source page identifies the image as Naantali harbour and church. | Live copy focuses on colourful wooden houses and the gateway to the archipelago; the photo's documented subjects are the harbour and church. | Suggested title: FI “Naantalin vanha satama ja kirkko”, ES “El puerto antiguo y la iglesia de Naantali”, EN “Naantali’s old harbour and church”. The description should mention the harbour and church; mention wooden houses only if clearly visible in the crop. | Copy refinement recommended; visual check pending |
| `mathildedal` | Wikimedia Commons source page identifies Anttipoffi, a former workers’ housing building from 1852 at Mathildedal Bruk. | Live CMS copy describes crafts, cafés, sea and forest trails around the historic ironworks village. It fits the destination generally but does not identify the building pictured. | Align copy more closely with the historic workers’ quarters, while keeping the village context. Do not state a specific date in the visible copy unless verified against the source page. | Copy refinement recommended; visual check pending |
| `aland` | Wikimedia Commons source page identifies the photo as a landscape/viewpoint near Kastelholm in Sund, Åland (Lillnäsberget / Tjudnäsvägen). | The current live CMS text is generic: sea, rocky islands and Nordic summer light. It does **not** claim that Kastelholm Castle is pictured. The earlier audit incorrectly described the current copy as a castle claim. | For a closer match, optionally name the Kastelholm area/viewpoint in all locales. Do not label the image as a castle photograph unless a castle is visually confirmed. | Broad thematic match; exact visual check pending |
| `porvoo` | Wikimedia Commons source page identifies the image as Porvoo Old Town viewed from a hot-air balloon. | Live copy describes red riverside warehouses, historic streets and the old town, but does not explain the elevated viewpoint. | Consider making the aerial viewpoint explicit while retaining only details that are visible in the image. | Metadata match; visual check pending |
| `hankoBeach` | Wikimedia Commons source file is explicitly named Regattanranta beach in central Hanko. | Copy describes a sunny sandy beach and open sea in Hanko. Direct match. | Keep; visually confirm the crop. | Metadata match; visual check pending |
| `herrankukkaro` | The CMS URL ends in `Kuva8-8066abf8-1920w.jpg`. Herrankukkaro’s official English sauna page exposes the same asset filename at a smaller size and identifies it as the interior of its underground smoke sauna. | The image does match the smoke-sauna subject. The current title “Smoke sauna by the sea” suggests an exterior/sea view, while the actual image is an indoor sauna photograph. | Keep the provider-owned image and credit. Change the title to identify the underground smoke sauna and describe the interior, while mentioning the archipelago setting only as location context. | Exact asset identified; subject match; title refinement required |

## Priority corrections before production publication

1. Remove the old coastal branding and coastal wording from the `summer` slide in FI/ES/EN; identify the house and Ruissalo setting rather than making a generic nationwide coastal claim.
2. Align the `hanko` slide copy with the documented aerial view of the peninsula.
3. Align the `naantali` slide copy with the documented harbour-and-church image.
4. Consider tightening the `mathildedal` and `porvoo` copy to name the documented building/viewpoint.
5. Keep the `aland` text factual and generic or explicitly describe the landscape near Kastelholm; the current copy does not claim that the castle is pictured.
6. Refine the Herrankukkaro title so it describes the confirmed indoor underground smoke-sauna image, not a sea view.
7. Perform a browser-level review of all ten slides on desktop and mobile, including crop, text contrast, attribution visibility, image load and carousel timing.

## Publishing safeguards

- Keep the image and its localized FI/ES/EN copy as one inseparable content record.
- The CMS editor now requires an explicit per-slide visual review checkbox before an enabled slide can be saved. Changing the image, eyebrow, title or description clears that approval. The API repeats the same approval, HTTPS image, link and localized-copy checks server-side.
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

### `herrankukkaro` — use the verified smoke-sauna interior copy

The exact CMS image filename is the same asset identified on Herrankukkaro’s official English sauna page as the interior of its underground smoke sauna. The current title “Smoke sauna by the sea” does not describe what the photo shows.

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Rymättylä · Naantali | Herrankukkaron maasavusauna | Kuva näyttää Herrankukkaron perinteisen maasavusaunan sisätilaa. Savusaunaperinne on osa saariston ainutlaatuista vierailukokemusta. |
| ES | Rymättylä · Naantali | La sauna de humo subterránea de Herrankukkaro | La imagen muestra el interior de la tradicional sauna de humo subterránea de Herrankukkaro, una parte singular de la experiencia del archipiélago. |
| EN | Rymättylä · Naantali | Herrankukkaro’s underground smoke sauna | The image shows the interior of Herrankukkaro’s traditional underground smoke sauna, a distinctive part of the archipelago experience. |

Keep the provider-owned image, provider credit and direct provider link.

### `cottage` — keep the copy to the cottage and lake

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Keuruu · Järvi-Suomi | Kesämökki järven rannalla | Keuruulla sijaitseva suomalainen kesämökki kutsuu nauttimaan järvimaisemasta ja kesän rauhasta. |
| ES | Keuruu · región de los lagos | Una cabaña junto al lago | Esta cabaña finlandesa en Keuruu invita a disfrutar del paisaje lacustre y la tranquilidad del verano. |
| EN | Keuruu · Lakeland Finland | A summer cottage by the lake | This Finnish summer cottage in Keuruu invites you to enjoy the lake scenery and the calm of summer. |

### `archipelago` — describe the small wooden house

| Locale | Eyebrow | Title | Text |
|---|---|---|---|
| FI | Turun saaristo | Pieni puutalo saariston keskellä | Pieni puutalo sijaitsee keskellä Turun saaristoa, saarten ja merimaisemien ympäröimänä. |
| ES | Archipiélago de Turku | Una pequeña casa de madera entre las islas | Una pequeña casa de madera se encuentra en el archipiélago de Turku, rodeada de islas y mar. |
| EN | Turku Archipelago | A small wooden house among the islands | A small wooden house sits in the Turku Archipelago, surrounded by islands and sea views. |
