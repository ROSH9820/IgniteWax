"use client";

import { PillButton } from "@/components/site/ui";
import { motion } from "framer-motion";

/** Final call-to-action band before the footer. */
export function FinalCta() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="cta-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-forest px-6 py-14 text-center sm:px-12 sm:py-16"
      >
        {/* Soft glow accents */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-olive/25 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-clay/25 blur-3xl"
        />

        <div className="relative">
          <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay uppercase">
            Ready when you are
          </p>
          <h2
            id="cta-heading"
            className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight text-balance text-cream sm:text-[40px] sm:leading-[1.12]"
          >
            Light something beautiful tonight.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-cream/75">
            Browse the collection, find your scent, and place your order in
            minutes — we&apos;ll take care of the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <PillButton href="/shop" variant="clay">
              Explore the Collection
            </PillButton>
            <PillButton
              href="/order"
              variant="ghost"
              className="border-white/25 bg-white/10 text-cream hover:bg-white/20"
            >
              Place an Order
            </PillButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
