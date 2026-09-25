# Finland Experience – production roadmap

## Delivered in the CMS foundation

- FI/ES/EN property model with translations.
- Property status, seasonal pricing and daily availability tables.
- Media alt/caption fields for all three languages.
- Inquiry, review, certification and admin profile tables.
- Site-wide design/contact/SEO settings.
- RLS policies for public published content.
- Canonical, hreflang and Open Graph metadata helper.
- Dynamic sitemap and robots routes.
- Destination soft-delete compatibility column.

## Next hardening steps

1. Replace the current demo admin cookie with Supabase Auth and profile-role checks.
2. Add Supabase Storage binary uploads and WebP/AVIF transformations.
3. Connect public accommodation pages to the new properties tables.
4. Add dynamic database-backed sitemap entries.
5. Add JSON-LD for LodgingBusiness, TouristAttraction, Review and BreadcrumbList.
6. Add GDPR consent management before analytics/marketing scripts.
7. Add email and WhatsApp notifications for inquiries.
8. Run Lighthouse/Core Web Vitals and accessibility audits in production.
9. Upgrade Next.js in a separate controlled migration.
