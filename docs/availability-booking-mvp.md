# Availability & Booking MVP

This document describes the Availability and Booking MVP implemented in mock/file-backed form.

Files added:
- src/types/booking.ts
- src/repositories/FileAvailabilityRepository.ts
- src/repositories/FileBookingRepository.ts
- src/services/BookingService.ts
- app/api/admin/availability/route.ts (admin CRUD)
- app/api/bookings/route.ts (public booking create/cancel)
- scripts/test-availability.js (tests)

Features:
- Availability CRUD (create, list, update, delete)
- Reserve seats with a simple file-lock-based mechanism to prevent overbooking in mock environment
- Booking creation via BookingService: reserves seats, calculates pricing via PricingService, creates booking record
- Booking cancellation: reduces booked capacity and updates booking status to cancelled/refunded

Notes:
- Locking: FileAvailabilityRepository.reserveSlot uses a lockfile (data/mockDB.json.lock) to prevent concurrent writes. It's a simple approach suitable for mock/testing only.
- Replace File-backed repos with DB-backed (Postgres/Supabase) and use DB transactions for production.

Testing:
- npm run test will now run media, pricing and availability tests (scripts/test-media.js, scripts/test-pricing.js, scripts/test-availability.js).

