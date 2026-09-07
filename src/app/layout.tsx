import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
const poppins=Poppins({subsets:["latin"],weight:["400","500","600","700","800"],variable:"--font-poppins",display:"swap"});
export const metadata:Metadata={title:{default:"Nordic Escape | Discover Finland",template:"%s | Nordic Escape"},description:"Book authentic Finnish experiences: Northern Lights, glass igloos, saunas, husky safaris and more. Perfect for Spanish and international travelers.",keywords:["Finland travel","Northern Lights","Lapland","glass igloo","Finnish sauna","husky safari","viajes a Finlandia","auroras boreales"],openGraph:{type:"website",locale:"en_EU",siteName:"Nordic Escape"},manifest:"/manifest.json"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>{children}</body></html>}
