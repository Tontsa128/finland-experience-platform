# Homepage carousel content audit

**Scope:** read-only audit of the 10 enabled `site_settings.homepage_slides` records in the production CMS, reviewed against the current source URLs, Wikimedia Commons file descriptions and provider source pages.

**Important limitation:** this is a metadata/source audit, not a full visual QA of every rendered image in the deployed browser. Do not mark an image as visually approved based only on its filename or source-page description. No production CMS records were changed during this audit.

## Slide-by-slide findings

| CMS slide | Current image/source evidence | Copy fit | Recommendation | Status |
|---|---|---|---|---|
| `summer` | Wikimedia Commons file `Turku_archipelago_house.jpg`; archipelago-house subject indicated by the source filename and existing attribution. | Current Finnish title still says “Suomen kesä alkaa rannikon pienistä paikoista”; the same coastal positioning appears in the other locales. This conflicts with the nationwide homepage direction. | Rewrite all three locales around “Kesä löytyy Suomen pienistä paikoista” / “El verano se descubre en los pequeños lugares de Finlandia” / “Summer is found in Finland’s small places”. Keep the image only if its actual visual is confirmed to match the final copy. | Copy update required; image visual check pending |
| `cottage` | Wikimedia Commons source page identifies the image as a Finnish summer cottage in Keuruu. | Cottage, lake and summer accommodation copy is a direct match. | Keep the subject pairing; visually confirm crop and image quality in the live carousel. | Metadata match; visual check pending |
| `archipelago` | Wikimedia Commons source page describes a small wooden house in the Turku Archipelago. | Copy describes a small wooden house among the islands. Strong subject match. | Keep; visually confirm crop and quality. | Metadata match; visual check pending |
| `hanko` | Wikimedia Commons source page identifies the photo as an aerial view of the Hanko Peninsula. | Current copy mentions beaches, wooden houses and sea breeze. The broad Hanko setting fits, but the copy is more specific than the documented aerial subject. | Refocus copy on the aerial view, peninsula, shoreline and Hanko as a destination; do not promise visible wooden houses unless confirmed in the image. | Copy refinement recommended |
| `naantali` | Wikimedia Commons source page identifies the image as Naantali harbour and church. | Existing copy focuses on colourful wooden houses and the old town. Related location, but the image source explicitly identifies harbour and church. | Rewrite headline/description to name the old harbour and Naantali Church; use old-town houses only if they are clearly visible in the selected crop. | Copy refinement recommended |
| `mathildedal` | Wikimedia Commons source page identifies Anttipoffi, a former workers’ housing building from 1852 at Mathildedal Bruk. | Current copy explicitly mentions the 1852 Anttipoffi building and the village’s ironworks history. Direct match. | Keep; visually confirm the crop. | Metadata match; visual check pending |
| `aland` | Wikimedia Commons source page identifies the photo as Kastelholm, Sund, Åland, photographed from Lillnäsberget / Tjudnäsvägen. | Current copy says the image shows Kastelholm Castle. The source description does not identify the castle as the photographed subject; it identifies a viewpoint/landscape near Kastelholm. | Replace the image with a confirmed castle photograph, or rewrite all locales to describe the Kastelholm area/landscape without claiming the castle is pictured. | **Definite copy/image mismatch** |
| `porvoo` | Wikimedia Commons source page identifies the image as Porvoo Old Town viewed from a hot-air balloon. | Current copy says the old town is shown from above. Direct match. | Keep; visually confirm the crop. | Metadata match; visual check pending |
| `hankoBeach` | Wikimedia Commons source file is explicitly named Regattanranta beach in central Hanko. | Copy describes a sunny sandy beach and open sea in Hanko. Direct match. | Keep; visually confirm the crop. | Metadata match; visual check pending |
| `herrankukkaro` | CMS points to a provider-hosted image on Herrankukkaro’s CDN and credits Herrankukkaro. | Copy describes smoke sauna by the sea. The image URL is provider-owned, but the exact CDN asset has not yet been visually verified against the copy. | Prefer a verified image from Herrankukkaro’s own sauna gallery that clearly depicts the smoke sauna named in the copy. Keep the provider credit and direct provider link. | Provider source; exact image visual check pending |

## Priority corrections before production publication

1. Remove the old coastal framing from the `summer` slide in FI/ES/EN.
2. Correct the `aland` slide: the current source description does not support the claim that the castle itself is pictured.
3. Align the `hanko` slide copy with the documented aerial photograph.
4. Align the `naantali` slide copy with the documented harbour-and-church photograph.
5. Confirm the exact Herrankukkaro CDN image visually; if it does not show the smoke sauna described, replace it with an approved provider-owned sauna photo.
6. Perform a browser-level review of all ten slides on desktop and mobile, including crop, text contrast, attribution visibility, image load and carousel timing.

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
