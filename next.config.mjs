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
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn-datahub.visitfinland.com" },
      { protocol: "https", hostname: "kohteet.visitsalo.fi" },
      { protocol: "https", hostname: "matrihouse.fi" },
      { protocol: "https", hostname: "visitnaantali.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "le-de.cdn-website.com" },
      { protocol: "https", hostname: "www.storfinnhova.com" },
      { protocol: "https", hostname: "cdn.johku.com" },
      { protocol: "https", hostname: "visitsalo.fi" },
      { protocol: "https", hostname: "visitmathildedal.fi" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      ...(supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname }] : []),
    ],
  },
};

export default withNextIntl(nextConfig);
