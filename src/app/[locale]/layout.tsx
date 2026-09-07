import { NextIntlClientProvider } from "next-intl";
import { getMessages,setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/utils";
import { Header } from "@/components/layout/Header"; import { Footer } from "@/components/layout/Footer"; import { AIChat } from "@/components/ai/AIChat"; import { Toaster } from "sonner";
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:{locale:string}}){const {locale}=params;if(!locales.includes(locale as any))notFound();setRequestLocale(locale);const messages=await getMessages();return <NextIntlClientProvider messages={messages}><div className="flex min-h-screen flex-col"><Header/><main className="flex-1">{children}</main><Footer/><AIChat/><Toaster position="top-center" richColors/></div></NextIntlClientProvider>}
