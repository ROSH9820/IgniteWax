import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { siteConfig } from "@/lib/config";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
  themeColor: "#faf6ef",
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
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <div className="page-glow flex min-h-screen flex-col">
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppFloat />
        <Toaster />
      </body>
    </html>
  );
}
