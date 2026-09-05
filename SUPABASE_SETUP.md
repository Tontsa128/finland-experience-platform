# Supabase Integration Setup Guide

## ✅ Completed Steps

1. **✅ Dependencies installed**
   - `@supabase/supabase-js` - Supabase client SDK
   - `@supabase/ssr` - SSR utilities
   - `tsx` - TypeScript executor for Node.js scripts
   - `supabase` - Supabase CLI

2. **✅ PostgreSQL schema created**
   - File: `supabase/migrations/0001_initial_schema.sql`
   - Includes all tables: destinations, experiences, bookings, availability, etc.
   - Row-level security policies enabled
   - Indexes created for performance

3. **✅ Repository implementations created**
   - `src/repositories/experience.supabase.ts` - Experience repository
   - `src/repositories/destination.supabase.ts` - Destination repository
   - `src/repositories/availability.supabase.ts` - Availability repository
   - `src/repositories/booking.supabase.ts` - Booking repository
   - `src/repositories/pricing.supabase.ts` - Pricing repository
   - `src/repositories/media.supabase.ts` - Media repository

4. **✅ Configuration files**
   - `.env.example` - Environment variable template
   - `src/lib/supabase.ts` - Supabase client initialization
   - `src/repositories/factory.ts` - Repository factory pattern
   - `src/repositories/types.ts` - Repository interface definitions

5. **✅ Seeding script**
   - `scripts/seed.ts` - Database seeding with mock data

## 🚀 Next Steps

### 1. Set up Supabase Project
```bash
# Create Supabase account at https://supabase.com
# Create a new project
# Get your credentials from Project Settings > API Keys
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Change database mode (optional - default is 'mock')
DATABASE_MODE=supabase
```

### 3. Run Database Migrations
```bash
# Using Supabase CLI
supabase db push

# Or manually:
# 1. Copy SQL from supabase/migrations/0001_initial_schema.sql
# 2. Run in Supabase SQL Editor
# 3. Or use supabase/migrations folder with CLI
```

### 4. Seed the Database
```bash
npm run db:seed
# or
npm run seed
```

### 5. Update Your API Routes
Replace mock repository calls with factory pattern:
```typescript
import { getExperienceRepository } from '@/repositories/factory';

const experienceRepo = getExperienceRepository();
const experiences = await experienceRepo.getAll();
```

## 📋 Repository Interface Implementations

### Mock vs Supabase
- **Mock**: In-memory storage (development/testing)
- **Supabase**: Real PostgreSQL database (production)

Switch via `.env` variable:
```
DATABASE_MODE=mock      # Use mock repositories
DATABASE_MODE=supabase  # Use Supabase repositories
```

### Implemented Repositories
- ✅ Experience repository
- ✅ Destination repository
- ✅ Availability repository
- ✅ Booking repository
- ✅ Pricing repository
- ✅ Media repository

### Still Need Mock Implementation
- ⚠️ Booking mock repository
- ⚠️ Pricing mock repository
- ⚠️ Availability mock repository

## 🔒 Security Notes
- Service role key is only for server-side operations
- Anonymous key is for client-side operations
- Row-level security policies restrict access appropriately
- Never commit `.env` files with real credentials

## 📚 API Structure
All repositories implement the same interface, so switching implementations is as simple as changing the factory method return value.

Example:
```typescript
// Same interface, different implementation
const repo = getExperienceRepository(); // Returns Supabase or Mock based on env
await repo.getAll();    // Works the same way
await repo.getById(1);  // Same API
await repo.create(...); // Identical usage
```
