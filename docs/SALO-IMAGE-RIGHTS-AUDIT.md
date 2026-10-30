# Salo image-rights audit — 2026-10-30

## Executive finding

The Salo catalogue contains 90 provider image assets with source/credit strings. One asset (Meri-Teijo Golf) is explicitly marked pending and is withheld by the current application guard. The other 89 assets are not thereby rights-cleared: their source data currently has no explicit verified rights status. A credit string is provenance, not proof of a licence or permission.

**Release rule:** do not treat an image as approved for commercial publication until the specific image's rights holder, permitted purpose, territory/term where relevant, modification rights, attribution requirements and evidence are recorded. Keep unknown or pending assets out of production publication unless a documented licence or written permission supports the intended use.

This document is an operational rights audit, not legal advice.

## Source-credit inventory

The following counts were derived from the 90 `imageCredit` entries in `src/lib/salo.ts` on the branch at the time of this audit. Categories describe the recorded credit text, not confirmed copyright ownership.

| Recorded source-credit group | Assets | Required action |
|---|---:|---|
| Visit Finland DataHub named in credit | 18 | Confirm Finnexprience is an accepted DataHub Data User and that each exact asset is available for this use under the DataHub terms; retain creator attribution and do not modify without written consent |
| Visit Salo / Salon Kohteet named in credit | 46 | Obtain written permission or the applicable image-specific licence from the rights holder; a source credit alone is insufficient |
| Official provider website named in credit | 12 | Obtain explicit permission from the provider/photographer or verify a licence that covers commercial third-party reuse |
| Wikimedia / CC / public-domain wording | 3 | Verify the exact original Wikimedia file, licence/version, author, attribution text and any person/privacy restrictions; only two entries currently state a recognisable licence status (public domain and CC BY-SA 4.0), while the harbour credit only says “licensed” |
| Other named sources | 11 | Identify the actual rights holder and obtain written permission or a verifiable licence |

Total: 90 image assets. Of these, one is already marked `pending`; 89 are currently not explicitly marked `verified` in the source data. This count does not mean that all 89 are infringing or unusable; it means the repository does not yet contain sufficient rights evidence to classify them as approved.

## Relevant published terms checked

### Visit Finland DataHub

The DataHub Terms of Service (dated 23 April 2021) define Product Information to include text, pictures, videos and other material. Section 4.2 says DataHub Data Users may publish Product Information to their customers and others, but use is limited to marketing and communications related to the particular travel product, service or attraction for which the information was produced. The creator must be credited as originally identified, and content must not be modified without written consent. The terms also state that Business Finland accepts DataHub Data Users.

Implications:
- A DataHub source credit alone does not establish that Finnexprience has been accepted as a DataHub Data User.
- Even if accepted, confirm that the exact image is part of the relevant Product Information and that the intended provider listing is within the permitted product-related marketing purpose.
- Preserve the original creator attribution and do not crop, retouch or otherwise modify the asset unless the rights holder has given written consent.
- Do not infer that a photo found on Visit Finland's public website carries the same permissions as a DataHub API Product Information asset.

Source: https://datahub.visitfinland.com/documents/TermsOfService.pdf (sections 4.1–4.2, especially PDF pages 7–10).

### Visit Finland website

Visit Finland's public website Terms of Use grant a limited personal, non-commercial, informational use right and reserve commercial use and public redistribution of materials unless separately authorised. These website terms are not a blanket commercial image licence.

Source: https://www.visitfinland.com/en/terms-of-use/

### Salo / VisitSalo

Salon kaupungin kaupunkimarkkinointi page says images in the city's media bank may be used free of charge for Salo-related communications and non-commercial marketing, with source and photographer credit. This wording does not itself authorise commercial use by a paid travel directory.

VisitSalo's partner page explains how providers add destination information and how DataHub content is distributed, but the page does not provide a general licence allowing every third-party website to reuse all VisitSalo/Salon Kohteet photographs.

Sources:
- https://salo.fi/kaupunki-ja-paatoksenteko/viestinta-ja-markkinointi/kaupunkimarkkinointi/
- https://visitsalo.fi/yhteistyokumppaneille/

## Current application behaviour and gap

- `getSaloProviderImage()` currently hides the Meri-Teijo Golf image because its `imageRightsStatus` is `pending`.
- The other image entries have credit strings, but no explicit `imageRightsStatus: "verified"` evidence in `src/lib/salo.ts`.
- Therefore the current count of 89 images eligible under the code's narrow pending-only guard must not be described as 89 rights-cleared images.
- Before commercial production release, the CMS must require a verified rights state backed by evidence (licence URL/file or permission record, rights holder, scope, expiry/review date, attribution, modification permission). Unknown and pending assets must fail closed.

## Required work before production release

1. Confirm with Business Finland whether Finnexprience has DataHub Data User access and whether the exact images may be used on this commercial platform. Record the written answer and the applicable terms/version.
2. Ask Visit Salo / Salon city for written commercial reuse permission for the 46 entries credited to Visit Salo or Salon Kohteet, or obtain asset-level permission from the underlying photographers/rights holders.
3. Obtain explicit provider/photographer permission for official-site photos; merely linking to a public provider website is not a licence to copy its image.
4. Resolve the exact Wikimedia file pages and licence evidence for the three CC/public-domain-worded credits. Retain creator, licence URL/version and attribution.
5. Identify rights holders for the remaining 11 entries.
6. Add an asset-level rights register to the existing CMS media records. Require source URL, rights holder, licence/permission evidence, allowed use, modification permission, attribution, status, reviewer and review/expiry date.
7. Add tests that public image rendering requires `verified` rights status, and test the directory, provider detail, destination cards, galleries, OG/social images and any other image consumers.
8. Only then re-enable assets individually. Do not replace withheld photos with unrelated stock or generated images.

## Release decision

**Not cleared for commercial production publication yet.** The repository contains provenance credits for all 90 assets, but rights evidence is incomplete for the 89 assets that are not explicitly marked pending. This is a release blocker, not a reason to create a second CMS.
