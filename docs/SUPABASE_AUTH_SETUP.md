# Supabase Auth – admin setup

The admin area now uses Supabase Auth instead of the old demo session cookie.

## 1. Configure environment variables

Set these in Vercel and local development:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

The service-role key is server-only and must never be exposed to the browser.

## 2. Apply migrations

Run the migrations in order:

```bash
supabase db push
```

The auth hardening migration creates a profile automatically for every new Supabase Auth user.

## 3. Create the first admin

Create a user in **Supabase Dashboard → Authentication → Users**.

The new account starts with role `EDITOR`. Promote the intended administrator from the SQL editor:

```sql
update public.profiles
set role = 'SUPER_ADMIN', updated_at = now()
where id = '<AUTH_USER_UUID>';
```

Supported roles:

- `SUPER_ADMIN`
- `ADMIN`
- `CONTENT_MANAGER`
- `BOOKING_MANAGER`
- `EDITOR`

## 4. Admin access model

- Read access: all five roles.
- Write access: SUPER_ADMIN, ADMIN, CONTENT_MANAGER and BOOKING_MANAGER.
- EDITOR can sign in and read the admin area but cannot call write endpoints.
- The API routes continue to use the server-only service-role client after the middleware has authenticated and authorized the request.
- Public Supabase queries remain protected by RLS.

## 5. Remove the old demo session

No production admin flow should depend on `demo_session`. Existing browser cookies from older builds can simply expire; the current middleware ignores them.
