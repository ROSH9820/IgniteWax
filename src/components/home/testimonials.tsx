"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/site/ui";

/**
 * Testimonials — PLACEHOLDER reviews, clearly marked.
 * Replace with real customer reviews as they come in; never present these as
 * genuine customer feedback.
 */
const testimonials = [
  {
    quote:
      "It smells like sunlight through curtains — I genuinely plan my evenings around lighting it now.",
    name: "Meera S.",
    detail: "Serenity · Placeholder review",
  },
  {
    quote:
      "The candle smells so clean and warm. The packaging is beautiful, and shipping was quick too.",
    name: "Ananya P.",
    detail: "Bloom · Placeholder review",
  },
  {
    quote:
      "Beautifully handcrafted — you can feel the care in every detail, from the pour to the packaging.",
    name: "Rohan K.",
    detail: "Forest Walk · Placeholder review",
  },
] as const;

export function Testimonials() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Kind Words"
          title="Moments our candles"
          accent="made warmer."
          lede="A few words from our early community. (Sample reviews shown while our store is new — real customer stories coming soon.)"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col rounded-3xl bg-white p-7 soft-shadow"
            >
              <span className="text-[13px] font-semibold tracking-wide text-clay" aria-label="5 out of 5 stars">
                {"★★★★★"}
              </span>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-forest">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block text-[14px] font-bold text-forest">{t.name}</span>
                <span className="block text-[12px] text-inkbody/70">{t.detail}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mx-auto mt-8 flex items-center justify-center gap-2 text-[12.5px] text-inkbody/70">
          <Star className="h-4 w-4 fill-clay text-clay" aria-hidden="true" />
          Placeholder testimonials — replaced with verified reviews as orders begin.
        </p>
      </div>
    </section>
  );
}
