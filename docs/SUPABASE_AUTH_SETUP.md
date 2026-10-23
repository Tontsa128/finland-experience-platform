# Supabase Auth – admin setup

The admin area uses Supabase Auth. Do not use demo sessions or trust role values supplied by the browser.

## 1. Configure environment variables

Set these in Vercel and local development:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (recommended)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy alias, also supported)
- `SUPABASE_SERVICE_ROLE_KEY`

The service-role key is server-only and must never be exposed to the browser or committed to Git.

## 2. Apply migrations

Run the migrations in order:

```bash
supabase db push
```

Migration `0035_auth_signup_role_hardening.sql` ensures new Auth users receive the `CUSTOMER` role. Apply and verify it in the intended Supabase project before treating this fix as live.

## 3. Audit existing editor roles before changing users

Migration `0004_supabase_auth_hardening.sql` previously assigned `EDITOR` to newly created users. Do not bulk-downgrade every editor: some may be legitimate content editors. First run this read-only query in the Supabase SQL Editor and review the results:

```sql
SELECT
  p.id AS user_id,
  u.email,
  p.full_name,
  p.role
FROM public.profiles AS p
LEFT JOIN auth.users AS u ON u.id = p.id
WHERE p.role = 'EDITOR'
ORDER BY u.email NULLS LAST;
```

Promote only verified administrators explicitly; downgrade only accounts confirmed not to need CMS access. Never grant admin access based solely on a matching email address.

## 4. Create the first admin

Create or verify the intended user under **Supabase Dashboard → Authentication → Users**. Copy that user's Auth UUID and use it in the SQL below only after confirming the identity:

```sql
UPDATE public.profiles
SET role = 'SUPER_ADMIN', updated_at = now()
WHERE id = '<AUTH_USER_UUID>';
```

Check that exactly one intended profile was updated.

Supported roles:

- `SUPER_ADMIN`
- `ADMIN`
- `CONTENT_MANAGER`
- `BOOKING_MANAGER`
- `EDITOR`
- `CUSTOMER`

## 5. Admin access model

- Read access: `SUPER_ADMIN`, `ADMIN`, `CONTENT_MANAGER`, `BOOKING_MANAGER`, and `EDITOR`.
- Write access through admin API routes: `SUPER_ADMIN`, `ADMIN`, `CONTENT_MANAGER`, and `BOOKING_MANAGER`.
- `EDITOR` can read the admin area but cannot call write endpoints.
- Server-side privileged operations use the service-role client only after authentication and role checks.
- Public Supabase queries must remain protected by Row Level Security (RLS).

## 6. Remove the old demo session

No production admin flow should depend on `demo_session`. The current middleware ignores legacy demo cookies.

## 7. Verification checklist

- [ ] Confirm the Vercel project has the correct Supabase URL and publishable/anon key.
- [ ] Confirm `SUPABASE_SERVICE_ROLE_KEY` is configured server-side only.
- [ ] Apply migration `0035_auth_signup_role_hardening.sql` to the intended Supabase project.
- [ ] Verify a newly created test user receives `CUSTOMER`, not `EDITOR`.
- [ ] Verify a `CUSTOMER` cannot open `/admin` or call `/api/admin/*`.
- [ ] Verify a legitimate admin can sign in and access only the routes allowed by their role.
- [ ] Verify sign-out invalidates access to protected routes.
- [ ] Review existing `EDITOR` accounts before making role changes.
