"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo, LogoMark } from "@/components/site/logo";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/config";
import { useBagCount } from "@/lib/bag";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About Us" },
  { href: "/wellness", label: "Wellness" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bagCount = useBagCount();
  const [open, setOpen] = useState(false); // mobile menu
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  // Lock body scroll while an overlay is open (DOM sync only — no setState).
  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  const results =
    query.trim().length > 0
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.fragrance.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  /** A link is active when its path matches AND its query matches (exact link wins). */
  const isActive = (href: string) => {
    if (href.includes("#")) return false; // hash links never auto-highlight
    const [base, queryString] = href.split("?");
    if (base === "/") return pathname === "/";
    if (pathname !== base) return false;
    if (!queryString) {
      // Plain /shop link stays active only when no specific category is chosen.
      return !searchParams.get("category");
    }
    const linkParams = new URLSearchParams(queryString);
    return [...linkParams.entries()].every(
      ([k, v]) => searchParams.get(k) === v,
    );
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full bg-[#f4f2e6]/90 px-4 soft-shadow backdrop-blur-md sm:h-16 sm:px-6"
      >
        <Link href="/" aria-label="Ignite Wax — home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[14.5px] font-medium text-forest/75 transition-colors hover:bg-sage hover:text-forest",
                  isActive(l.href) && "bg-sage font-semibold text-forest",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2.5 text-forest/80 transition-colors hover:bg-sage hover:text-forest"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/contact"
            aria-label="Account and contact"
            className="rounded-full p-2.5 text-forest/80 transition-colors hover:bg-sage hover:text-forest"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/order"
            aria-label={`Shopping bag, ${bagCount} item${bagCount === 1 ? "" : "s"}`}
            className="relative rounded-full p-2.5 text-forest/80 transition-colors hover:bg-sage hover:text-forest"
          >
            <ShoppingBag className="h-5 w-5" />
            {bagCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-clay-deep text-[10px] font-bold text-white">
                {bagCount > 9 ? "9+" : bagCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2.5 text-forest/80 hover:bg-sage"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2.5 text-forest hover:bg-sage"
          >
            {open ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl bg-white/95 p-3 soft-shadow backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-[15px] font-medium text-forest/80 transition-colors hover:bg-sage",
                      isActive(l.href) && "bg-sage font-semibold text-forest",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              <Link
                href="/order"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-olive px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-olive-deep"
              >
                Order Now
              </Link>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-forest/20 px-5 py-3 text-center text-sm font-semibold text-forest transition-colors hover:bg-sand"
              >
                Shop All
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-forest/30 px-4 pt-20 backdrop-blur-sm sm:pt-28"
            onClick={() => setSearchOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-white soft-shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Search className="h-5 w-5 shrink-0 text-inkbody" />
                <input
                  ref={(el) => {
                    searchInput.current = el;
                    if (searchOpen) el?.focus();
                  }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                    if (e.key === "Enter" && results[0]) {
                      router.push(`/product/${results[0].slug}`);
                      setSearchOpen(false);
                    }
                  }}
                  placeholder="Search candles, scents…"
                  aria-label="Search candles"
                  className="w-full bg-transparent text-[15px] text-forest outline-none placeholder:text-inkbody/50"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-1.5 text-inkbody hover:bg-sand"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {query.trim() === "" ? (
                  <p className="px-4 py-6 text-center text-sm text-inkbody/70">
                    Try “serenity”, “vanilla” or “floral”…
                  </p>
                ) : results.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-inkbody/70">
                    No candles found for “{query}”.
                  </p>
                ) : (
                  results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-sage/60"
                    >
                      { }
                      <img
                        src={p.image}
                        alt=""
                        className="h-12 w-12 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-forest">
                          {p.name}
                        </span>
                        <span className="block truncate text-xs text-inkbody">
                          {p.fragrance}
                        </span>
                      </span>
                      <span className="text-sm font-bold text-clay-deep">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { LogoMark };
