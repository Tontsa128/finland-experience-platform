# Salo provider directory → existing Supabase CMS integration

Status: **schema reconnaissance complete; live database verification and migration are blocked pending an authenticated Supabase connection.**

This is an integration plan for the existing CMS, not a proposal to create a second CMS.

## Verified in the repository migration history

The repository already defines the following production-oriented building blocks:

- `public.providers` (migration `0014_provider_network_and_leads.sql`): canonical provider record, unique slug, provider type, FI/ES/EN descriptions, website and booking URLs, contact details, address, region, languages, category array, verification and publication/feature flags.
- `public.provider_members` and `public.provider_verification_checks` (migration `0017_provider_portal_foundation.sql`): provider account membership and an editorial/business verification checklist.
- Provider directory tables have RLS enabled and direct public reads are deliberately removed by `0030_protect_provider_directory.sql`. Public provider content must continue to be served through trusted server-side application paths.
- `public.media` already has localized alt/caption fields, storage path and MIME type (migration `0003_cms_properties_seo.sql`).
- The media library has `source_url`, `license`, `rights_status`, `location_tag`, `category_tag` and archive metadata (migration `20261028102729_cms_event_management.sql`). Allowed rights states are `unknown`, `licensed`, `permission_granted` and `public_domain`.
- `public.cms_revisions` supports revision history for the visual CMS (migration `0033_visual_cms_page_builder.sql`).
- Existing admin provider endpoint is `src/app/api/admin/providers/route.ts` and restricts reads to authenticated admin/content roles.

These are repository facts. They do not prove that the currently connected Supabase project has successfully applied every migration.

## Integration design

### Canonical record and ownership

1. Keep one canonical provider in `public.providers`; never create a second parallel provider catalogue.
2. Preserve existing IDs and slugs if a matching provider already exists. Import is keyed by stable slug and must be idempotent.
3. Keep business contact details, verification flags and commercial terms private. Do not expose the raw provider table directly to anonymous clients.
4. Use existing `provider_verification_checks` for company/contact/pricing/booking/Spanish-content/photo review.
5. Extend the existing admin provider UI/API rather than creating a new CMS or a second set of admin roles.

### Multilingual content

- Retain existing `description_fi`, `description_en`, `description_es` fields and `categories` array.
- Add localized display-name and short-description fields only if the live schema and current content requirements confirm they are needed.
- Validate FI, EN and ES content independently. A missing translation must be visible to editors and must not silently publish a fabricated translation.
- Store locale-specific SEO fields only where the existing destination/provider routing actually consumes them.

### Images and rights

- Reuse `public.media` as the media source of truth.
- Associate provider profiles with media through a provider-media relation with stable ordering and role (hero/gallery/logo); do not overload a raw external image URL as the media record.
- Require source URL and a valid rights status before a provider image can be published.
- Keep pending/unknown rights assets out of public rendering. The current source-data guard withholds Meri-Teijo Golf, but the other 89 image assets do not yet have explicit verified rights status; a credit string is not a licence. See `docs/SALO-IMAGE-RIGHTS-AUDIT.md`. The CMS version must require asset-level rights evidence and enforce the rule server-side.
- Store localized alt text and captions in existing media fields.
- Do not copy image files from third-party websites unless the applicable permission/license allows it.

### Audit trail and publication

- Record every material provider/content/media change in `cms_revisions` using the existing revision mechanism.
- Keep provider activation/verification separate from commercial featured placement.
- Public output must be server-side filtered to active and verified/approved content according to the existing publication rules.
- Admin writes must validate role, locale, slug, category values, URLs, media ownership and rights status server-side.

## Required live-schema checks before writing or applying SQL

After Supabase is connected, inspect (read-only first):

- Exact columns, constraints, indexes, triggers and RLS policies for `providers`, `provider_members`, `provider_verification_checks`, `media` and `cms_revisions`.
- Whether migrations `0014`, `0017`, `0030`, `0033` and `20261028102729` have been applied in the target project.
- Existing provider records and slug collisions against the 101 Salo source profiles.
- Existing media records, storage bucket policies and source/rights metadata.
- Current admin API contracts and any partner portal write paths.

Do not infer live schema state from repository files alone.

## Migration sequence (not yet executed)

1. Export and securely retain a read-only snapshot of the relevant provider/media rows and schema.
2. Produce a collision report mapping every Salo profile to an existing provider ID/slug or a proposed new slug. Human-review ambiguous matches.
3. Prepare additive, reversible SQL only after the live schema diff is reviewed. Do not drop/rename existing columns.
4. Add the provider-media relation and only the missing locale/editorial fields; include constraints, indexes, updated-at trigger and RLS policies.
5. Import canonical provider rows in a transaction using stable slugs and `ON CONFLICT` rules that do not overwrite admin-maintained or verified fields.
6. Link only existing media records whose source and rights metadata have been verified.
7. Write migration/import audit records and revisions; verify row counts, uniqueness, localized completeness, category coverage and media-rights rules.
8. Deploy the application code and migration through the controlled release process; test admin and public access with least-privilege roles.
9. Keep rollback instructions and a pre-migration backup. Never apply this to production without explicit authorization and a tested recovery plan.

## Release blockers

- Supabase connection unavailable in the current tool session; target project and live migration state are not verified.
- The 101 Salo catalogue profiles have not yet been reconciled against the live provider table.
- Image rights are a production blocker: 90 image assets have source credits, but none currently has complete verified evidence. The source-data gate now fails closed and withholds all 90; see `docs/SALO-IMAGE-RIGHTS-AUDIT.md`. FI/EN/ES editorial checks also remain in progress.
- Latest rights-control code commits need a fresh CI run; the previously verified CI run belongs to baseline `56402b0`, not the latest head.
- Do not merge or deploy production until these gates are closed.
