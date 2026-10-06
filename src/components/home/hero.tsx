"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Heart, Leaf, Flame, Flower2, Recycle } from "lucide-react";
import { CircleIcon } from "@/components/site/ui";
import { getBestsellers } from "@/data/products";

const trust = [
  { icon: Leaf, label: "100% Natural", sub: "Ingredients" },
  { icon: Flame, label: "Hand Poured", sub: "in Small Batches" },
  { icon: Flower2, label: "Wellness", sub: "Focused" },
  { icon: Recycle, label: "Sustainable", sub: "Eco-Friendly" },
] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export function Hero() {
  const featured = getBestsellers()[0];

  return (
    <section className="relative overflow-hidden" aria-label="Welcome to Ignite Wax">
      {/* ── Ambient background: warm cream fading into soft sage ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(105deg,#f6f0e3_0%,#f2eedd_38%,#e4e6d2_72%,#d8ddc4_100%)]"
      />

      {/* ── Hero photo, bleeding to the right edge with a soft mask ── */}
      <div aria-hidden="false" className="absolute inset-y-0 right-0 hidden w-[64%] lg:block">
        <img
          src="/images/hero-serenity.jpg"
          alt="Serenity — a hand-poured eucalyptus and mint soy candle in a frosted green glass vessel on a stone pedestal, beside fresh eucalyptus sprigs"
          className="h-full w-full object-cover [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.55)_22%,black_45%)]"
          fetchPriority="high"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 pt-6 pb-12 sm:pt-8 lg:grid-cols-[minmax(0,31.5rem)_1fr] lg:gap-6 lg:pt-10 lg:pb-16">
          {/* ── Left: copy ── */}
          <div className="max-w-xl">
            <motion.p
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[13px] font-semibold text-inkbody backdrop-blur-sm"
            >
              <Heart className="h-4 w-4 fill-clay-deep text-clay-deep" aria-hidden="true" />
              Handmade with intention
            </motion.p>

            <motion.h1
              {...fade(0.08)}
              className="mt-5 font-display text-[44px] leading-[1.06] font-bold tracking-[-0.01em] text-balance sm:text-[56px]"
            >
              <span className="text-forest">Light a candle.</span>
              <br />
              <span className="text-clay">Find your calm.</span>
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="mt-5 max-w-md text-[15.5px] leading-relaxed text-inkbody"
            >
              Thoughtfully handcrafted candles using clean, natural ingredients
              to elevate your space, enhance your mood, and support your
              well-being.
            </motion.p>

            <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/shop"
                className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-olive py-2 pr-2.5 pl-7 text-[15px] font-bold text-white transition-all duration-200 hover:bg-olive-deep hover:shadow-lg hover:shadow-olive/30"
              >
                Shop All Candles
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f4e8] text-forest transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4.5 w-4.5" />
                </span>
              </Link>
              <Link
                href="/about"
                className="group inline-flex min-h-13 items-center gap-3 rounded-full border border-forest/10 bg-white/75 py-2 pr-2.5 pl-7 text-[15px] font-bold text-forest backdrop-blur-sm transition-all duration-200 hover:bg-white"
              >
                Our Story
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef0e2] text-forest transition-colors group-hover:bg-sage">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── Right: floating Best Seller glass card (over the photo) ── */}
          <div className="relative hidden lg:block">
            {featured && (
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
                className="glass-card absolute top-16 right-0 w-[264px] rounded-[22px] p-5 soft-shadow-lg xl:right-4"
                aria-label={`Best seller: ${featured.name}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-clay-deep text-white shadow-md"
                >
                  <Heart className="h-4.5 w-4.5 fill-current" />
                </span>

                <div className="flex items-center gap-3">
                  <img
                    src="/images/hero-serenity.jpg"
                    alt=""
                    className="h-13 w-13 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-clay-deep">
                      Best Seller
                    </span>
                    <span className="block truncate font-display text-[17px] font-bold text-forest">
                      {featured.name}
                    </span>
                  </span>
                </div>

                <p className="mt-2.5 text-[13px] text-inkbody/85">{featured.fragrance}</p>
                <p className="mt-1 text-[13px] text-clay-deep" aria-label={`Rated 5 out of 5 from ${featured.reviewCount} reviews`}>
                  <span aria-hidden="true">★★★★★</span>{" "}
                  <span className="text-inkbody/70">({featured.reviewCount})</span>
                </p>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-inkbody">
                  {featured.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={`/product/${featured.slug}`}
                    className="text-[14px] font-bold text-forest underline decoration-forest/40 underline-offset-4 transition-colors hover:text-olive"
                  >
                    Shop Now
                  </Link>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-forest/70"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.aside>
            )}

            {/* Carousel dots — decorative, mirrors the mockup */}
            <div aria-hidden="true" className="absolute right-2 -bottom-6 flex items-center gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-forest/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-forest/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-forest/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-forest/30" />
            </div>
          </div>
        </div>

        {/* Trust row — spans the full width so all four fit on one line (lg+) */}
        <motion.ul
          {...fade(0.34)}
          className="mt-2 flex max-w-2xl flex-wrap gap-x-6 gap-y-3.5 pb-10 lg:max-w-none lg:pb-14"
        >
          {trust.map((t) => (
            <li key={t.label} className="flex items-center gap-2.5">
              <CircleIcon className="h-9 w-9 shrink-0 border-olive/30 bg-white/60 text-olive">
                <t.icon className="h-4 w-4" strokeWidth={1.7} />
              </CircleIcon>
              <span className="text-[11.5px] leading-tight">
                <span className="block font-bold text-forest">{t.label}</span>
                <span className="block text-inkbody/80">{t.sub}</span>
              </span>
            </li>
          ))}
        </motion.ul>

        {/* ── Mobile / tablet: stacked photo with overlapping card ── */}
        <div className="relative pb-2 lg:hidden">
          <div className="relative overflow-hidden rounded-[24px]">
            <img
              src="/images/hero-serenity.jpg"
              alt="Serenity — a hand-poured eucalyptus and mint soy candle in a frosted green glass vessel on a stone pedestal"
              className="aspect-[5/4] w-full object-cover sm:aspect-[16/9]"
              fetchPriority="high"
            />
          </div>
          {featured && (
            <aside
              className="glass-card relative mx-4 -mt-14 rounded-[20px] p-4 soft-shadow-lg sm:mx-auto sm:w-80"
              aria-label={`Best seller: ${featured.name}`}
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-clay-deep text-white shadow-md"
              >
                <Heart className="h-4.5 w-4.5 fill-current" />
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="/images/hero-serenity.jpg"
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold text-clay-deep">Best Seller</span>
                  <span className="block truncate font-display text-[16px] font-bold text-forest">
                    {featured.name}
                  </span>
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] text-inkbody/85">{featured.fragrance}</p>
              <p className="mt-1 text-[12.5px] text-clay-deep" aria-hidden="true">
                ★★★★★ <span className="text-inkbody/70">({featured.reviewCount})</span>
              </p>
              <Link
                href={`/product/${featured.slug}`}
                className="mt-2 inline-block text-[13.5px] font-bold text-forest underline decoration-forest/40 underline-offset-4"
              >
                Shop Now
              </Link>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
