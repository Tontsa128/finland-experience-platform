# Media Library MVP

This document describes the Media Library MVP implementation (mock storage) for the Finland Experience Platform.

Architecture
- File-backed mock database: data/mockDB.json stores media items in an array under `media`.
- Repository abstraction:
  - src/repositories/MediaRepository.ts — TypeScript interface defining methods list/get/create/update/delete/reorder.
  - src/repositories/FileMediaRepository.ts — implementation reading/writing data/mockDB.json.
- API routes under app/api/admin/media/route.ts provide REST-like endpoints (GET, POST, PUT, DELETE, PATCH for reorder/set_hero).
- Admin UI components:
  - app/admin/media — Media listing page (src/components/MediaList.tsx)
  - app/admin/media/upload — Mock upload page (src/components/MediaUpload.tsx)
- Experiences reference media by id: experience.media is an array of media ids.

Data model
- MediaItem (src/types/media.ts): id, filename, url, alt_text, title, type, size_bytes, width, height, tags, created_at, is_hero, sort_order, metadata
- Experiences contain media references (array of media ids): e.g., experiences[0].media = ["media-001", "media-002"]

API
- GET /api/admin/media — list all media
- GET /api/admin/media?id={id} — get single item
- POST /api/admin/media — create (body: filename, url, type, optional metadata)
- PUT /api/admin/media — update (body must include id)
- DELETE /api/admin/media?id={id} — delete
- PATCH /api/admin/media — actions: { action: 'reorder', ids: [..] } or { action: 'set_hero', id, value }

Validation
- Server-side validation is implemented in FileMediaRepository and API route: filename and url required for create; type must be provided; updates require id.
- Deleting media also removes references from experiences in mockDB.json to avoid dangling references.

Testing
- scripts/test-media.js runs a sequence of tests using the FileMediaRepository:
  - create
  - read
  - update
  - reorder
  - hero selection (update)
  - delete
- Run: npm run test

Replacing mock storage with Supabase/S3
- Implement a new repository that adheres to MediaRepository interface, e.g.:
  - src/repositories/SupabaseMediaRepository.ts
  - src/repositories/S3MediaRepository.ts
- Replace usage in API routes to instantiate the production repository based on environment variable (STORAGE_PROVIDER). The admin UI and pages do not need to change.

Notes & security
- This MVP does not upload binary files to the repository. Upload is mocked by providing a URL (placehold.co) in the upload form.
- Do NOT commit real media files to git.
- RBAC enforcement is not yet enforced server-side; ensure to add middleware for authentication and role checks before exposing media administration endpoints in production.

