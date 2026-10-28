# Supabase Auth – admin setup

The admin area now uses Supabase Auth instead of the old demo session cookie.

## 1. Configure environment variables

Set these in Vercel and local development:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (recommended)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy alias, also supported)
- `SUPABASE_SERVICE_ROLE_KEY`
- `CMS_SUPER_ADMIN_EMAIL` (the exact verified email allowed to become the CMS super admin through Google/GitHub OAuth)

The service-role key is server-only and must never be exposed to the browser.

## 2. Apply migrations

Run the migrations in order with `npm run db:push`. This command downloads the pinned Supabase CLI only when run locally; the CLI is not installed during the Cloudflare application build.

```bash
npm run db:push
```

The auth hardening migration creates a profile automatically for every new Supabase Auth user.

## 3. Enable Google and GitHub sign-in

Create OAuth applications for Google and GitHub, then enable each provider under **Supabase Dashboard → Authentication → Sign In / Providers**. Store their client IDs and client secrets in Supabase; never add provider secrets to this repository.

Use this Supabase callback URL in both provider applications:

```text
https://pxazouraakldvwbswwtg.supabase.co/auth/v1/callback
```

Add the following application URLs to **Supabase Dashboard → Authentication → URL Configuration → Redirect URLs**:

```text
https://www.finlandexperience.fi/auth/callback
http://localhost:3000/auth/callback
```

In Google OAuth, add the production site origin as an authorized JavaScript origin. Set `CMS_SUPER_ADMIN_EMAIL` to the owner's verified email in the server environment. The OAuth callback accepts only Google or GitHub identities whose verified email matches that value, and promotes that profile to `SUPER_ADMIN`. Other OAuth accounts are signed out and denied CMS access.

## 4. Create the first admin

The first admin can sign in at `/admin/login` with the configured Google or GitHub account. The callback promotes only the configured verified email.

Public account registration creates a `CUSTOMER` account and never grants admin access. The OAuth promotion only applies to the exact verified email configured in `CMS_SUPER_ADMIN_EMAIL`.

Supported roles:

- `SUPER_ADMIN`
- `ADMIN`
- `CONTENT_MANAGER`
- `BOOKING_MANAGER`
- `EDITOR`

## 5. Admin access model

- Read access: all five roles.
- Write access: SUPER_ADMIN, ADMIN, CONTENT_MANAGER and BOOKING_MANAGER.
- EDITOR can sign in and read the admin area but cannot call write endpoints.
- The API routes continue to use the server-only service-role client after the middleware has authenticated and authorized the request.
- Public Supabase queries remain protected by RLS.

## 6. Remove the old demo session

No production admin flow should depend on `demo_session`. Existing browser cookies from older builds can simply expire; the current middleware ignores them.

