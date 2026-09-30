import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Reveal from "@/components/Reveal";
import { DESCRIPTION, SITE_NAME, SITE_URL, TITLE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "open BitLocker on Mac",
    "BitLocker reader for Mac",
    "read BitLocker USB drive macOS",
    "BitLocker To Go Mac",
    "unlock BitLocker drive Mac",
    "BitLocker recovery key Mac",
  ],
  authors: [{ name: "Emil Holmgaard" }],
  creator: "Emil Holmgaard",
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }], apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "Unbit – Open BitLocker drives on your Mac",
    description: "Read BitLocker-encrypted USB drives on macOS with your password or recovery key. Read-only, no drivers, runs locally.",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Unbit – Open BitLocker drives on your Mac" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unbit – Open BitLocker drives on your Mac",
    description: "Read BitLocker-encrypted USB drives on macOS. Read-only, no drivers, runs locally.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Hide scroll-reveal elements only when JS runs and the user hasn't asked for reduced motion.
// If the Reveal component doesn't mount within 3 s, show everything again.
const revealBootstrap = `(function(){try{var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-reveal");setTimeout(function(){if(!d.classList.contains("reveal-ready"))d.classList.remove("js-reveal")},3000)}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
