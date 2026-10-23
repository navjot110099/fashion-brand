import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { BagProvider } from "@/components/bag/BagContext";
import { BagDrawer } from "@/components/bag/BagDrawer";
import { site } from "@/lib/site";
import { siteUrl, unsplash } from "@/lib/utils";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], display: "swap" });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Paris Fashion House · Nocturne AW26`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["Maison Noir", "Paris fashion house", "luxury tailoring", "eveningwear", "Nocturne collection", "silk velvet dress"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: unsplash("1770294759013-a5784266a817", 1200, 630), width: 1200, height: 630, alt: "Maison Noir Nocturne campaign — velvet dress on a red velvet chair" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#160f17" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <MotionProvider>
          <BagProvider>
            <Navbar />
            <main id="main" className="overflow-x-clip">
              {children}
            </main>
            <Footer />
            <BagDrawer />
          </BagProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
