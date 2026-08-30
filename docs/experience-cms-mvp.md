## Experience CMS MVP

This commit implements the Experience CMS MVP using a file-based mock repository (data/mockDB.json). The goal is to provide a fully functional admin CRUD for experiences without connecting external services.

What to test locally:
1. Start dev server: npm ci && npm run dev
2. Open Admin login: /admin/login — use DEMO credentials in docs/DEMO_CREDENTIALS.md
3. Navigate to /admin/experiences — view list of experiences
4. Create a new experience (/admin/experiences/new) — fill form and save
5. Edit an experience (/admin/experiences/:id) — change fields and save
6. Duplicate an experience via the Duplicate button
7. Delete via API using POST action delete (not yet wired to UI)

Implementation notes:
- Storage: data/mockDB.json holds organizations, destinations, categories, experiences, media, addons.
- Repository: src/repositories/FileExperienceRepository.ts provides the CRUD operations (read/write to mockDB.json). Replaceable with a SupabaseRepository later.
- API: app/api/admin/experiences/route.ts exposes GET/POST/PUT/DELETE behavior for admin UI.
- Admin UI: under app/admin/experiences with list, new and edit pages.
- Form: src/components/ExperienceForm.tsx is a client component that handles create/update/duplicate.

Next steps:
- Media Library MVP
- Destination CMS MVP
- PricingService implementation

