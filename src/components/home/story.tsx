"use client";

import { motion } from "framer-motion";
import { PillButton } from "@/components/site/ui";

/** Brand story — editorial image collage + copy, in the reference's soft style. */
export function Story() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Collage */}
        <div className="relative mx-auto w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden rounded-[26px] soft-shadow-lg"
          >
            { }
            <img
              src="/images/site/story-warm.jpg"
              alt="A warm reading nook lit by a hand-poured Ignite Wax candle"
              loading="lazy"
              className="aspect-[4/3.4] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
            className="absolute -right-3 -bottom-8 w-36 overflow-hidden rounded-2xl border-4 border-white soft-shadow sm:-right-6 sm:w-44"
          >
            { }
            <img
              src="/images/site/pack-love.jpg"
              alt="An Ignite Wax parcel being wrapped by hand"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            aria-hidden="true"
            className="absolute -top-5 -left-3 flex h-16 w-16 rotate-[-8deg] items-center justify-center rounded-full bg-clay text-[10px] leading-tight font-bold tracking-[0.14em] text-white uppercase shadow-md sm:-left-6 sm:h-20 sm:w-20 sm:text-[11px]"
          >
            Hand
            <br />
            poured
          </motion.span>
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">
            Our Story
          </p>
          <h2
            id="story-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-balance text-forest sm:text-[40px] sm:leading-[1.12]"
          >
            Poured in small batches,{" "}
            <span className="text-clay">made for quiet moments.</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-inkbody">
            Ignite Wax began with a simple belief: the light you bring into a
            room changes how the room feels — and how you feel in it. Every
            candle is blended, poured and finished by hand in small batches,
            using clean-burning soy wax, cotton wicks and thoughtfully chosen
            fragrance.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-inkbody">
            We don&apos;t chase trends or mass-produce. We craft slow, deliberate
            rituals for your evening wind-down, your Sunday morning, your
            everything-in-between — the moments that deserve a little more
            warmth.
          </p>
          <div className="mt-8">
            <PillButton href="/about" variant="primary">
              Discover Our Craft
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
