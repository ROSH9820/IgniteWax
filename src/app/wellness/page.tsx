import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Flower2, HeartHandshake, Leaf, Moon, Sun } from "lucide-react";
import { PillButton } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Wellness",
  description:
    "Candle rituals for calmer days — mindful lighting practices, scent pairing for mood, and slow-living inspiration from Ignite Wax.",
  alternates: { canonical: "/wellness" },
};

const rituals = [
  {
    icon: Sun,
    title: "Morning Clarity",
    scent: "Eucalyptus + Mint",
    body: "Begin the day with ten unhurried minutes. Light a crisp, herbal candle while you stretch or journal — the cool menthol notes sharpen focus and clear mental fog before the noise begins.",
  },
  {
    icon: Moon,
    title: "Evening Unwind",
    scent: "Sandalwood + Amber",
    body: "Dim the lights and let warm, resinous notes signal the end of the day. A steady burn and a slow exhale help the body release the hours behind you — no screens, just softness.",
  },
  {
    icon: Flower2,
    title: "Weekend Reset",
    scent: "Peony + Rose",
    body: "Turn an ordinary afternoon into a small ceremony. Fresh florals paired with tidy spaces, linen, and a warm drink reset the nervous system and make home feel new again.",
  },
] as const;

const principles = [
  {
    icon: Leaf,
    title: "Clean ingredients",
    body: "100% natural soy wax, lead-free cotton wicks, and phthalate-free fragrance oils — kind to your air and your calm.",
  },
  {
    icon: Flame,
    title: "Mindful burning",
    body: "Trim the wick to 5 mm before each burn and allow a full melt pool on first light. Small habits, a longer, lovelier life for every candle.",
  },
  {
    icon: HeartHandshake,
    title: "Intentional gifting",
    body: "Every candle is hand poured in small batches and wrapped with intention — a quiet way to tell someone they matter.",
  },
] as const;

export default function WellnessPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14">
      <header className="max-w-2xl">
        <p className="text-[12px] font-bold tracking-[0.22em] text-clay-deep uppercase">
          More than a candle
        </p>
        <h1 className="mt-3 font-display text-[34px] leading-[1.1] font-bold text-forest sm:text-[44px]">
          Small rituals, <span className="text-clay">calmer days</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-inkbody">
          At Ignite Wax, wellness is not a product — it is a practice. A lit
          wick is a gentle cue to slow down, breathe deeper, and be where you
          are. These are the rituals we build our fragrances around.
        </p>
      </header>

      {/* Rituals */}
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {rituals.map((r) => (
          <article
            key={r.title}
            className="rounded-[20px] bg-[#fffef9] p-6 soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/30 bg-white text-olive">
              <r.icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <h2 className="mt-4 font-display text-[19px] font-bold text-forest">{r.title}</h2>
            <p className="mt-0.5 text-[12.5px] font-semibold text-clay-deep">{r.scent}</p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-inkbody">{r.body}</p>
          </article>
        ))}
      </div>

      {/* Principles band */}
      <section
        className="mt-10 rounded-[22px] bg-sage-strip px-6 py-7 sm:px-10"
        aria-label="Our wellness principles"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="flex items-start gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-forest">
                <p.icon className="h-4.5 w-4.5" strokeWidth={1.7} />
              </span>
              <span>
                <span className="block text-[14px] font-bold text-forest">{p.title}</span>
                <span className="mt-1 block text-[13px] leading-relaxed text-inkbody">
                  {p.body}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center text-center">
        <h2 className="font-display text-[26px] font-bold text-forest sm:text-[32px]">
          Ready to begin your ritual?
        </h2>
        <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-inkbody">
          Choose the fragrance that matches your moment — or gift one to
          someone who needs a little calm today.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3.5">
          <PillButton href="/shop">Shop All Candles</PillButton>
          <PillButton href="/order" variant="ghost">
            Place an Order
          </PillButton>
        </div>
      </div>
    </div>
  );
}
