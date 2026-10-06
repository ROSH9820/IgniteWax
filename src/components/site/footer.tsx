import Link from "next/link";
import { Heart, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { siteConfig, whatsappLink, whatsappMessages } from "@/lib/config";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/shop", label: "Shop All" },
      { href: "/shop?category=Candles", label: "Collections" },
      { href: "/about", label: "Our Story" },
      { href: "/about#wellness", label: "Wellness" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/order", label: "Place an Order" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Order Policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-forest text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-3">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Thoughtfully handcrafted candles using clean, natural ingredients
              to elevate your space, enhance your mood, and support your
              well-being.
            </p>
            <div className="mt-5 flex gap-2.5">
              {/* Social placeholders — replace hrefs with real profiles */}
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`${siteConfig.name} on ${s} (coming soon)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-cream/80 transition-colors hover:bg-clay hover:text-white"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-cream/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/80 transition-colors hover:text-clay"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-cream/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li>
                <a
                  href={whatsappLink(whatsappMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 transition-colors hover:text-clay"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span>
                    WhatsApp
                    <span className="block text-xs text-cream/50">
                      [WHATSAPP NUMBER — set env]
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-clay"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span>
                    Email
                    <span className="block text-xs text-cream/50">
                      {siteConfig.contactEmail}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <span>
                  Studio
                  <span className="block text-xs text-cream/50">
                    [BUSINESS ADDRESS — placeholder]
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-cream/50">
            More than a candle. It&apos;s a moment for you.
            <Heart className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
