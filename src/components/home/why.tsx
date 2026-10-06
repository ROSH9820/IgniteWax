"use client";

import { motion } from "framer-motion";
import { Droplets, Flame, HeartHandshake, Leaf, Package, Timer } from "lucide-react";
import { SectionHeading } from "@/components/site/ui";

/**
 * "Why Ignite Wax" — benefits grid.
 * Only claims consistent with the reference mockup are used (natural
 * ingredients, hand-poured, long-lasting, thoughtful packaging).
 */
const benefits = [
  {
    icon: Leaf,
    title: "Premium Natural Wax",
    body: "Clean-burning natural soy wax, cotton wicks and thoughtfully sourced fragrance — nothing you wouldn't want in your home.",
    tint: "bg-sage",
  },
  {
    icon: Flame,
    title: "Hand-Poured, Small Batch",
    body: "Every candle is blended, poured and finished by hand. Small batches mean care in every pour — never factory output.",
    tint: "bg-peach",
  },
  {
    icon: Timer,
    title: "A Long-Lasting Experience",
    body: "Slow, even burns and well-balanced scent throw designed to fill your space gently for hour after quiet hour.",
    tint: "bg-blush",
  },
  {
    icon: Package,
    title: "Thoughtful Packaging",
    body: "Beautifully packed, gift-ready and kind to the planet — because the unboxing should feel as good as the first light.",
    tint: "bg-sand",
  },
] as const;

export function Why() {
  return (
    <section className="bg-sand/60 py-20 sm:py-24" aria-labelledby="why-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Why Ignite Wax"
          title="Warmth you can"
          accent="feel good about."
          lede="From the first pour to the final flicker, everything we make is guided by craft, calm and care."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="flex flex-col rounded-3xl bg-white p-6 soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
            >
              <span
                className={`flex h-13 w-13 items-center justify-center rounded-full ${b.tint} text-forest`}
              >
                <b.icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-forest">{b.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-inkbody">{b.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2.5 text-center text-[14px] text-inkbody"
        >
          <Droplets className="h-4.5 w-4.5 text-olive" aria-hidden="true" />
          <HeartHandshake className="h-4.5 w-4.5 text-clay" aria-hidden="true" />
          Clean ingredients, mindful making, and a promise to keep both.
        </motion.p>
      </div>
    </section>
  );
}
