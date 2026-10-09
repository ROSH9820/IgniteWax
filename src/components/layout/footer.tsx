import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { siteConfig, whatsappLink, whatsappMessages } from "@/lib/config";

const shopLinks = [
  { href: "/shop", label: "All Candles" },
  { href: "/shop?filter=Floral", label: "Floral" },
  { href: "/shop?filter=Woody", label: "Woody" },
  { href: "/shop?filter=Warm", label: "Warm" },
  { href: "/shop?filter=Fresh", label: "Fresh" },
] as const;

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
] as const;

const helpLinks = [
  { href: "/order", label: "Place an Order" },
  { href: "/contact", label: "Shipping & Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-sage text-softwhite">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-softwhite/15">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5" aria-hidden="true">
                  <path d="M12 3.2c1.1 1.5 2.3 2.9 2.3 4.5a2.3 2.3 0 1 1-4.6 0c0-1.6 1.2-3 2.3-4.5Z" />
                  <path d="M7.5 12.5h9v5.2a2.3 2.3 0 0 1-2.3 2.3H9.8a2.3 2.3 0 0 1-2.3-2.3v-5.2Z" />
                  <path d="M9.3 15.4h5.4" />
                </svg>
              </span>
              <span className="font-display text-[19px] font-bold tracking-tight">Ignite Wax</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-softwhite/75">
              {siteConfig.description}
            </p>
            <a
              href={whatsappLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-softwhite/10 px-4 py-2 text-sm font-medium text-softwhite transition-colors hover:bg-softwhite/20"
            >
              <Heart className="h-4 w-4 text-peach" strokeWidth={1.6} />
              Chat with us
            </a>
          </div>

          {/* Link columns */}
          <nav aria-label="Shop">
            <h3 className="text-[13px] font-bold tracking-[0.18em] text-softwhite/60 uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-softwhite/85 transition-colors hover:text-peach">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-[13px] font-bold tracking-[0.18em] text-softwhite/60 uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-softwhite/85 transition-colors hover:text-peach">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help">
            <h3 className="text-[13px] font-bold tracking-[0.18em] text-softwhite/60 uppercase">
              Help
            </h3>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-softwhite/85 transition-colors hover:text-peach">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-softwhite/15 pt-6 sm:flex-row">
          <p className="text-xs text-softwhite/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-softwhite/60">
            Handmade with
            <Heart className="h-3.5 w-3.5 fill-peach text-peach" aria-hidden="true" />
            and intention
          </p>
        </div>
      </div>
    </footer>
  );
}
