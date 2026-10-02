import type { Metadata, Viewport } from "next";
import { lang } from "next/root-params";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "flag-icons/css/flag-icons.min.css";
import Reveal from "@/components/Reveal";
import { languages, locales } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary();
  const path = `/${locale}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: SITE_NAME,
    keywords: dict.meta.keywords,
    authors: [{ name: "Unbit" }],
    creator: "Unbit",
    alternates: {
      canonical: path,
      // hreflang alternates for every locale, plus x-default pointing to English.
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    icons: { icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }], apple: "/apple-touch-icon.png" },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: dict.meta.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.twitterDescription,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Hide scroll-reveal elements only when JS runs and the user hasn't asked for reduced motion.
// If the Reveal component doesn't mount within 3 s, show everything again.
const revealBootstrap = `(function(){try{var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-reveal");setTimeout(function(){if(!d.classList.contains("reveal-ready"))d.classList.remove("js-reveal")},3000)}catch(e){}})();`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <html lang={await lang()} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        {children}
        <Reveal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
