import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { MotionProvider } from "@/components/ui/motion-provider";
import { siteConfig } from "@/lib/config";

/*
 * Typography per the reference design system:
 *   Headings — Playfair Display (serif, elegant)
 *   Body     — Inter (sans-serif, clean)
 */
const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ignite Wax — Premium Hand-Poured Soy Candles",
    template: "%s · Ignite Wax",
  },
  description: siteConfig.description,
  keywords: [
    "Ignite Wax",
    "scented candles",
    "soy candles",
    "handmade candles",
    "premium candles",
    "wellness candles",
    "hand-poured candles",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "Ignite Wax — Premium Hand-Poured Soy Candles",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/images/hero-serenity.jpg", width: 1344, height: 768, alt: "Ignite Wax Serenity candle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignite Wax — Premium Hand-Poured Soy Candles",
    description: siteConfig.description,
    images: ["/images/hero-serenity.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f0eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} font-sans antialiased`}>
        <MotionProvider>{children}</MotionProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
