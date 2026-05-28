import type { Metadata } from "next";
import {
  Cinzel,
  Inter,
  Playfair_Display,
  JetBrains_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/src/seo/JsonLd";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Linum Core — Software Development & Consulting",
    template: "%s | Linum Core",
  },
  description:
    "Linum Core delivers custom software development, systems consulting, and API integration. We restore the unseen connections in your business.",
  keywords: [
    "software development",
    "consulting",
    "API integration",
    "Next.js",
    "TypeScript",
    "Gabriel Gomes",
    "Linum Core",
  ],
  authors: [{ name: "Gabriel Gomes", url: "https://linumcore.com" }],
  creator: "Gabriel Gomes",
  metadataBase: new URL("https://linumcore.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linumcore.com",
    siteName: "Linum Core",
    title: "Linum Core — Software Development & Consulting",
    description: "We restore the unseen connections in your business.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Linum Core" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linum Core — Software Development & Consulting",
    description: "We restore the unseen connections in your business.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${inter.variable} ${playfair.variable} ${jetbrains.variable} ${cormorant.variable}`}>
      <body className="bg-bg-1 text-ink-0 antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
