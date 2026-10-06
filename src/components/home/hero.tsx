"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Leaf, Flame, Flower2, Recycle } from "lucide-react";
import { CircleIcon } from "@/components/site/ui";
import { getBestsellers } from "@/data/products";
import { formatPrice } from "@/lib/config";

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
    <section className="px-3 pt-3 sm:px-5 sm:pt-4" aria-label="Welcome to Ignite Wax">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] soft-shadow-lg">
        {/* Ambient tint layer behind content */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#fdf9f1] via-[#f2efe3] to-[#f6e7d6]"
        />

        <div className="relative grid gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-6 lg:py-16">
          {/* ── Left: copy ── */}
          <div className="max-w-xl">
            <motion.p
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[13px] font-semibold text-forest backdrop-blur-sm"
            >
              <Heart className="h-4 w-4 fill-clay text-clay" aria-hidden="true" />
              Handmade with intention
            </motion.p>

            <motion.h1
              {...fade(0.08)}
              className="mt-5 text-[42px] leading-[1.05] font-extrabold tracking-tight text-balance sm:text-[56px]"
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
                className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-olive py-2 pr-2.5 pl-7 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-olive-deep hover:shadow-lg hover:shadow-olive/25"
              >
                Shop All Candles
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4.5 w-4.5" />
                </span>
              </Link>
              <Link
                href="/about"
                className="group inline-flex min-h-13 items-center gap-3 rounded-full border border-forest/10 bg-white/80 py-2 pr-2.5 pl-7 text-[15px] font-semibold text-forest backdrop-blur-sm transition-all duration-200 hover:bg-white"
              >
                Our Story
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand transition-colors group-hover:bg-sage">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.ul {...fade(0.34)} className="mt-9 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-3">
                  <CircleIcon className="h-10 w-10">
                    <t.icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                  </CircleIcon>
                  <span className="text-[12.5px] leading-tight">
                    <span className="block font-bold text-forest">{t.label}</span>
                    <span className="block text-inkbody/80">{t.sub}</span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Right: imagery + floating card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[22px]">
              { }
              <img
                src="/images/hero-serenity.jpg"
                alt="Serenity — a hand-poured eucalyptus and mint soy candle in a frosted green glass vessel, beside fresh eucalyptus sprigs"
                className="aspect-[4/3] w-full object-cover sm:aspect-[5/4] lg:aspect-[7/6]"
                fetchPriority="high"
              />
            </div>

            {/* Floating Best Seller glass card */}
            {featured && (
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="glass-card absolute -bottom-2 left-3 right-3 rounded-2xl p-4 soft-shadow sm:left-auto sm:right-4 sm:w-72 sm:-bottom-4"
                aria-label={`Best seller: ${featured.name}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full bg-clay text-white shadow-md"
                >
                  <Heart className="h-4.5 w-4.5 fill-current" />
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-[0.14em] text-clay-deep uppercase">
                    Best Seller
                  </span>
                </div>
                <p className="mt-1 text-[17px] font-bold text-forest">{featured.name}</p>
                <p className="text-[12.5px] text-inkbody/80">{featured.fragrance}</p>
                <p className="mt-1 text-[13px] font-semibold text-clay" aria-hidden="true">
                  ★★★★★{" "}
                  <span className="font-normal text-inkbody/70">({featured.reviewCount})</span>
                </p>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-inkbody">
                  {featured.description}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <Link
                    href={`/product/${featured.slug}`}
                    className="text-[14px] font-bold text-forest underline decoration-clay/60 decoration-2 underline-offset-4 transition-colors hover:text-olive"
                  >
                    Shop Now
                  </Link>
                  <span className="text-[13px] font-bold text-clay-deep">
                    {formatPrice(featured.price)}
                  </span>
                </div>
              </motion.aside>
            )}
          </motion.div>
        </div>

        {/* Carousel dots — decorative, mirrors the mockup */}
        <div aria-hidden="true" className="absolute right-5 bottom-4 flex gap-1.5 sm:right-7">
          <span className="h-1.5 w-5 rounded-full bg-forest/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-forest/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-forest/25" />
        </div>
      </div>
    </section>
  );
}
