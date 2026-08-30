# Destination CMS MVP

This document describes the Destination CMS MVP implemented as part of the Finland Experience Platform.

Features implemented:
- File-backed Destination repository (src/repositories/FileDestinationRepository.ts)
- Admin API: app/api/admin/destinations/route.ts (GET/POST/PUT/DELETE)
- Admin UI pages:
  - /admin/destinations (list)
  - /admin/destinations/new (create)
  - /admin/destinations/[id] (edit)
- DestinationForm supports ES/FI content, slug, region, best_season and SEO (basic)
- Data model: src/types/destination.ts

Integration notes:
- Destinations are referenced by experiences via experience.destination_id. Deleting a destination removes the reference from experiences in mockDB.json.
- To replace with Supabase adapter, implement same repository interface and swap in API route.

Testing:
- Run: node ./scripts/test-destination.js

