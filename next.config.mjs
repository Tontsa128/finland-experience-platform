import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : null;

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  images: {
    // OpenNext on Cloudflare does not provide Next.js's default image optimizer.
    // Load approved remote photos directly so the carousel does not depend on /_next/image.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.uwasa.fi" },
      { protocol: "https", hostname: "www.rantapallo.fi" },
      { protocol: "https", hostname: "visitaland.wntr.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn-datahub.visitfinland.com" },
      { protocol: "https", hostname: "www.visitfinland.com" },
      { protocol: "https", hostname: "kohteet.visitsalo.fi" },
      { protocol: "https", hostname: "matrihouse.fi" },
      { protocol: "https", hostname: "visitnaantali.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "thumb.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "le-de.cdn-website.com" },
      { protocol: "https", hostname: "www.storfinnhova.com" },
      { protocol: "https", hostname: "cdn.johku.com" },
      { protocol: "https", hostname: "visitsalo.fi" },
      { protocol: "https", hostname: "visitmathildedal.fi" },
      { protocol: "https", hostname: "mail.visitmathildedal.fi" },
      { protocol: "https", hostname: "www.visitmathildedal.fi" },
      { protocol: "https", hostname: "ruukinkehraamo.fi" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "cbaul-cdnwnd.com" },
      { protocol: "https", hostname: "www.ylostalo.fi" },
      { protocol: "https", hostname: "www.kansakouluun.fi" },
      { protocol: "https", hostname: "www.lomalaperla.com" },
      { protocol: "https", hostname: "www.kruuvanmokit.fi" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "www.visitkimitoon.fi" },
      { protocol: "https", hostname: "visitkimitoon.fi" },
      { protocol: "https", hostname: "ksg.fi" },
      { protocol: "https", hostname: "launokorpi.com" },
      { protocol: "https", hostname: "golf-pass.brightspotcdn.com" },
      { protocol: "https", hostname: "meriteijobikepark.com" },
      { protocol: "https", hostname: "elamys-group2.imgix.net" },
      { protocol: "https", hostname: "bookingenginecdn.hostaway.com" },
      { protocol: "https", hostname: "img0.oastatic.com" },
      { protocol: "https", hostname: "katjaroue.kuvat.fi" },
      { protocol: "https", hostname: "static.esquire.de" },
      { protocol: "https", hostname: "www.hertzpageo.com" },
      { protocol: "https", hostname: "lmrprodstorageaccount.blob.core.windows.net" },
      ...(supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname }] : []),
    ],
  },
};

export default withNextIntl(nextConfig);
