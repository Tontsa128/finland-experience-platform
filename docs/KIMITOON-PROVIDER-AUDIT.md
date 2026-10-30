# Kimitoön provider inventory and implementation audit

Audit date: 30 October 2026  
Scope: Kemiö, Kimitoön, Rosala and the surrounding archipelago  
Status: initial official-directory inventory; **not a complete provider audit**

## Purpose

This file tracks the gap between the official destination directory and the FINNEXPRIENCE provider journey. It prevents a small number of featured cards from being presented as a complete regional directory.

Required visitor journey:

Homepage → Kimitoön destination → category → provider card → provider's own FI/EN/ES detail page → provider's official booking/contact channel.

A provider is not complete merely because an external link exists. Its own localized detail page, matching gallery, verified content, credits, responsive layout and metadata must be checked.

## Official destination directory sources

- Accommodation: https://www.visitkimitoon.fi/fi/syo_ja_majoitu/majoitu/
- Restaurants and cafés: https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/
- General destination catalogue: https://www.visitkimitoon.fi/fi/kohteet/

The municipality's accommodation page explicitly directs visitors to the provider's own website for booking. FINNEXPRIENCE should preserve that model: no platform-side booking, payment or service contract.

## Accommodation — identified providers

The current official accommodation landing page highlights the following providers. These are an initial inventory, not an exhaustive list.

| Provider | Official source / booking channel | FINNEXPRIENCE status |
|---|---|---|
| Spa Hotel Kasnäs | https://www.kasnas.com/ and https://book.kasnas.com/fi/accommodation/list | Detail page and official image gallery require implementation and verification |
| Söderlångvik Glamping | https://soderlangvik.fi/fi/glamping/ | Detail page and official gallery require implementation; official page currently publishes 2026 season, amenities and prices |
| Bengtskär Lighthouse accommodation | https://bengtskar.fi/ | Separate accommodation-specific provider detail and current season/booking verification required |
| Sebbholmen EcoCamp | https://sebbholmen.fi/ and https://rosala.johku.com/en_US/sebbholmen-ecocamp | Detail page and gallery require implementation; official contact/booking details are available |
| Hotel & Restaurant Merikruunu | https://www.merikruunu.fi/hotelli | Detail page and room gallery require implementation; official page describes 13 rooms and hotel facilities |

Additional provider candidates are visible in the official destination catalogue and current regional material, including Villa Ekbladh, Dals Inn, Ullman's Villa, Strandhotellet, Labbnäs Lomakoti and other cottage/glamping operators. Each must be checked against the current official catalogue and its own source before publication.

## Restaurants and cafés — identified providers

The current official restaurants-and-cafés landing page highlights:

| Provider | Official source | FINNEXPRIENCE status |
|---|---|---|
| Holmbergs Fisk & Café Four C | https://www.visitkimitoon.fi/fi/syo_ja_majoitu/ravintolat_ja_kahvilat/ | Dedicated provider source, image set and current opening details to verify |
| Restaurant Amos Krog | https://soderlangvik.fi/ | Dedicated provider detail and current menu/season to verify |
| Stall's Bar & Food | Official provider URL to verify from its listing | Do not publish guessed menu/hours |
| Farmors Café | Official provider URL to verify from its listing | Dedicated provider detail and seasonal hours to verify |
| Rumpan Bar | Official provider URL to verify from its listing | Dedicated provider detail and seasonal hours to verify |
| Hotel & Restaurant Merikruunu | https://www.merikruunu.fi/ | Restaurant and accommodation must have clearly separated service details |
| Kansakoulu Restaurant | https://www.kansakouluun.fi/ravintolat/ | Localized detail page exists in this PR; menu and current hours are not verified |

The official list may contain further providers beyond its featured entries. Continue pagination/catalogue review before describing the directory as complete.

## Current FINNEXPRIENCE implementation gaps

- The Kimitoön accommodation category currently highlights Kansakoulu only, while the official destination page highlights multiple other accommodation providers.
- The Kimitoön food category currently highlights Kansakoulu only, while the official destination page highlights several restaurants and cafés.
- The Rosala, Bengtskär and general attraction pages are destination/place guides; they do not automatically replace the individual provider pages required for accommodation operators, restaurants, cafés and activity operators.
- The Kansakoulu accommodation page correctly avoids presenting restaurant photos as room photos, but currently has no accommodation gallery. Add a gallery only from suitable, authorized images that actually show the rooms/accommodation.
- Provider card image and title navigation is being corrected so internal destination cards open their detail route.

## Publication rules

1. Use provider-owned official pages and assets where available; the project owner has confirmed the general image and business-information authorization for Salo and Kemiö/Kimitoön businesses.
2. Match every image to the exact provider and service. The authorization does not make an unrelated image accurate or cover a specific third-party restriction.
3. Keep restaurant, accommodation, activity and venue imagery separated where it could mislead visitors.
4. Do not copy old prices, opening hours, menus, room details or seasonal dates as current without a current official source.
5. If a provider's current information is unavailable, state that visitors should confirm it directly rather than inventing details.
6. Every provider detail page must have FI/EN/ES content, its own relevant gallery, visible source credits where required, a direct official CTA, a return path, and localized SEO metadata.
7. Continue using the existing Supabase CMS and authorization model. Do not introduce mock providers or a parallel CMS.

## Source notes

- Official accommodation directory and English equivalent were checked on 30 October 2026.
- Official restaurant directory was checked on 30 October 2026.
- Provider-specific details must be verified again at implementation time; this inventory does not certify current opening, availability or pricing.
