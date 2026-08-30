import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Phosphoros — openbare misdaaddossiers",
    template: "%s | Phosphoros",
  },
  description: SITE_DESCRIPTION,
  verification: {
    google: "uHaORBiirQoaPnKD4KjE5xG_cHSpSdn7-bV60hVyuLo",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "/",
    siteName: SITE_NAME,
    title: "Phosphoros — openbare misdaaddossiers",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Phosphoros — openbare misdaaddossiers",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
