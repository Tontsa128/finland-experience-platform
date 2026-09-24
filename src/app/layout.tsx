import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
const poppins=Poppins({subsets:["latin"],weight:["400","500","600","700","800"],variable:"--font-poppins",display:"swap"});
export const metadata:Metadata={title:{default:"Nordic Escape | Finnish Summer & Slow Travel",template:"%s | Nordic Escape"},description:"Discover peaceful Finnish summer stays: Mathildedal, Salo, Naantali, the archipelago, Åland and the western and southeastern coast. Accommodation and activities are booked directly with local providers.",keywords:["Finland summer","Mathildedal","Salo accommodation","Naantali cottages","Åland cottages","Finnish archipelago","Finnish sauna","glamping Finland"],openGraph:{type:"website",locale:"en_EU",siteName:"Nordic Escape"},manifest:"/manifest.json"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={\`\${inter.variable} \${poppins.variable} font-sans antialiased\`}>{children}</body></html>}