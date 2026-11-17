import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: { default: "Finland Experience", template: "%s | Finland Experience" },
  description: "Discover destinations, accommodation, saunas, local food, nature, culture and events across Finland. Contact and book directly with local providers.",
  keywords: ["Finland travel","Finland destinations","Finnish accommodation","Finnish sauna","local food Finland","Finnish nature","Finnish culture","Finland events","Mathildedal","Salo","Naantali","Åland"],
  openGraph: { type: "website", locale: "en_IE", siteName: "Finland Experience" },
  manifest: "/manifest.json",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Resolve the active route locale on the server so the document language is
  // correct before the page is rendered (including crawlers and assistive tech).
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
