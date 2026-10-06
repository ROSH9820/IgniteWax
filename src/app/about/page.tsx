import type { Metadata } from "next";
import { Droplets, Flame, Heart, Leaf, Moon, Recycle, Sparkles } from "lucide-react";
import { PillButton, SectionHeading } from "@/components/site/ui";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us — Our Story & Craft",
  description:
    "The story behind Ignite Wax — small-batch, hand-poured soy candles made with clean ingredients, mindful craft and a wellness-first philosophy.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: Leaf,
    title: "Clean by default",
    body: "Natural soy wax, cotton wicks and carefully chosen fragrance. If we wouldn't burn it in our own homes, we won't pour it into yours.",
  },
  {
    icon: Flame,
    title: "Craft over volume",
    body: "Small batches, blended and poured by hand. Every wick is centered, every pour is checked, every candle is finished with intention.",
  },
  {
    icon: Moon,
    title: "Designed for calm",
    body: "Scents are composed like quiet music — soft openings, warm middles, gentle endings — to help your space and mind settle.",
  },
  {
    icon: Recycle,
    title: "Kind to the planet",
    body: "Reusable vessels, recyclable packing and thoughtful sourcing. Beautiful today, considerate tomorrow.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="pb-4">
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">
            About Ignite Wax
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-forest sm:text-[48px] sm:leading-[1.1]">
            Light a candle.{" "}
            <span className="text-clay">Find your calm.</span>
          </h1>
          <p className="mt-5 text-[15.5px] leading-relaxed text-inkbody">
            {siteConfig.description} What began as a kitchen-table craft has
            grown into a small studio devoted to one thing: candles that make
            ordinary moments feel ceremonial.
          </p>
        </div>

        {/* Big image */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] soft-shadow-lg">
          { }
          <img
            src="/images/site/story-shelf.jpg"
            alt="Shelves of hand-poured Ignite Wax candles resting in the studio"
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="philosophy">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">
              Our Philosophy
            </p>
            <h2 id="philosophy" className="mt-3 text-3xl font-bold tracking-tight text-balance text-forest sm:text-[38px] sm:leading-[1.14]">
              More than a candle. <span className="text-clay">It&apos;s a moment for you.</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-inkbody">
              We live in a world that rarely slows down. A candle is a small,
              honest excuse to pause — a signal to your body that the day is
              softening. That&apos;s why everything at Ignite Wax starts with
              feeling first: how a room should feel at dusk, in the early
              morning, on a slow Sunday.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-inkbody">
              From that feeling we work backwards — choosing wax that burns
              clean, fragrance that never shouts, and vessels you&apos;ll want
              to keep long after the final light.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/images/site/pack-kraft.jpg"
              alt="Kraft packaging prepared with care"
              className="aspect-[4/3] w-full rounded-3xl object-cover soft-shadow"
              loading="lazy"
            />
            <img
              src="/images/site/edit-terra.jpg"
              alt="Warm terracotta still life with candlelight"
              className="aspect-[4/3] w-full translate-y-5 rounded-3xl object-cover soft-shadow sm:translate-y-8"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Craft pillars */}
      <section className="bg-sand/60 py-20 sm:py-24" aria-labelledby="craft">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            kicker="The Craft"
            title="Four things we"
            accent="never compromise."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {pillars.map((p) => (
              <article key={p.title} className="flex gap-4 rounded-3xl bg-white p-6 soft-shadow">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                  <p.icon className="h-5.5 w-5.5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-bold text-forest">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-inkbody">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness note */}
      <section id="wellness" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8" aria-labelledby="wellness-heading">
        <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-14 sm:px-12">
          <span aria-hidden="true" className="pointer-events-none absolute -top-20 right-10 h-56 w-56 rounded-full bg-olive/25 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-[11.5px] font-bold tracking-[0.28em] text-clay uppercase">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Wellness
            </p>
            <h2 id="wellness-heading" className="mt-3 text-3xl font-bold tracking-tight text-balance text-cream sm:text-[38px] sm:leading-[1.14]">
              Rituals for slower evenings
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/75">
              Trim the wick, let the wax pool, breathe deep. Pair your candle
              with a screen-free hour, a warm drink, or a long bath — small
              rituals that turn a house into a haven. Every Ignite Wax scent is
              composed to support those mindful moments, every day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PillButton href="/shop" variant="clay">
                Shop the Collection
              </PillButton>
              <PillButton
                href="/contact"
                variant="ghost"
                className="border-white/25 bg-white/10 text-cream hover:bg-white/20"
              >
                Talk to Us
              </PillButton>
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-[26px] bg-sand/80 px-8 py-6 text-[14px] font-semibold text-forest">
          <span className="flex items-center gap-2">
            <Leaf className="h-4.5 w-4.5 text-olive" /> Clean ingredients, always
          </span>
          <span className="flex items-center gap-2">
            <Droplets className="h-4.5 w-4.5 text-olive" /> Hand-poured, small batch
          </span>
          <span className="flex items-center gap-2">
            <Heart className="h-4.5 w-4.5 text-clay" /> Made with love & intention
          </span>
        </div>
      </section>
    </div>
  );
}
