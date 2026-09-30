import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Unbit – Open BitLocker drives on your Mac",
  description:
    "Unbit opens BitLocker-encrypted USB drives on your Mac. Read-only, no extra drivers, everything runs locally. Notarized by Apple.",
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "Meet Unbit – Open BitLocker drives on your Mac",
    description: "Read-only access to BitLocker-encrypted USB drives. No extra drivers. Everything runs locally.",
    images: ["/icon.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
