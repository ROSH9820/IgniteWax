import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Moon, Sparkles, Sunrise, Wind } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Wellness",
  description:
    "Candles as ritual — small daily practices with scent that steady your mornings, focus your work and soften your evenings.",
  alternates: { canonical: "/wellness" },
};

const rituals = [
  {
    icon: Sunrise,
    title: "Morning intention",
    text: "Light Morning Calm while the kettle boils. Ten minutes of quiet with a single flame sets the tone for everything that follows.",
    product: { name: "Morning Calm", slug: "morning-calm" },
  },
  {
    icon: Wind,
    title: "Midday reset",
    text: "Between meetings, burn Serenity for one hour. Eucalyptus and mint clear mental fog the way open windows clear a room.",
    product: { name: "Serenity", slug: "serenity" },
  },
  {
    icon: Moon,
    title: "Evening unwind",
    text: "An hour before bed, light Lavender Dream and dim the lights. Let the day dissolve instead of carrying it to your pillow.",
    product: { name: "Lavender Dream", slug: "lavender-dream" },
  },
] as const;

export default function WellnessPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[12px] font-bold tracking-[0.22em] text-peach-deep uppercase">
          Wellness
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-balance text-ink sm:text-5xl">
          Scent, as a daily ritual
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          A candle is more than fragrance — it&apos;s a small, repeatable act of
          care. Here are three rituals our community swears by.
        </p>
      </header>

      {/* Rituals */}
      <StaggerGroup className="mt-14 grid gap-5 lg:grid-cols-3">
        {rituals.map((r) => (
          <StaggerItem key={r.title}>
            <div className="flex h-full flex-col rounded-[1.5rem] bg-softwhite p-7 soft-shadow">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-soft text-sage">
                <r.icon className="h-5.5 w-5.5" strokeWidth={1.6} />
              </span>
              <h2 className="mt-4 font-serif text-xl font-semibold text-ink">{r.title}</h2>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-body">{r.text}</p>
              <Link
                href={`/shop/${r.product.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage transition-colors hover:text-sage-deep"
              >
                Pair with {r.product.name}
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Principles band */}
      <Reveal className="mt-16">
        <div className="rounded-[2.5rem] bg-sage px-8 py-12 text-center text-softwhite sm:px-12">
          <Sparkles className="mx-auto h-6 w-6 text-peach" strokeWidth={1.6} aria-hidden="true" />
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            Clean ingredients are a wellness choice — not a luxury.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-softwhite/80">
            Paraffin-free soy wax, lead-free cotton wicks and phthalate-free
            fragrance oils, in every single blend we make. What you breathe
            matters as much as what you smell.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-softwhite px-7 py-3.5 text-[15px] font-semibold text-sage transition-colors hover:bg-sage-soft"
          >
            Shop Clean Candles
            <ArrowRight className="h-4.5 w-4.5" strokeWidth={1.8} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
