"use client";

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/ui";

/** Lifestyle gallery — Instagram-style grid (social hrefs are placeholders). */
const shots = [
  { src: "/images/site/gal-reading.jpg", alt: "A quiet evening read beside a glowing candle" },
  { src: "/images/site/gal-golden.jpg", alt: "Golden hour light across a styled candle table" },
  { src: "/images/site/gal-nook.jpg", alt: "A cozy corner nook with soft candlelight" },
  { src: "/images/site/gal-library.jpg", alt: "Warm library shelves and a lit candle" },
  { src: "/images/site/gal-airy.jpg", alt: "Airy bright room with fresh linen and candles" },
  { src: "/images/site/gal-moment.jpg", alt: "A mindful moment with tea and candlelight" },
] as const;

export function Gallery() {
  return (
    <section className="bg-sand/60 py-20 sm:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="@ignitewax"
          title="Slow moments,"
          accent="every day."
          lede="Tag us on Instagram with #IgniteWaxMoments — we love seeing how you light up your space."
        />

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {shots.map((s, i) => (
            <motion.a
              key={s.src}
              href="#"
              aria-label={`${s.alt} (Instagram link coming soon)`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl"
            >
              { }
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-forest/0 transition-colors duration-300 group-hover:bg-forest/25">
                <Instagram className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
