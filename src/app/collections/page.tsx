import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, type ProductCategory } from "@/data/products";
import { formatPrice } from "@/lib/config";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Ignite Wax collections — hand-poured soy candles and wellness rituals, curated by mood and fragrance family.",
  alternates: { canonical: "/collections" },
};

const groups: { key: ProductCategory; title: string; lede: string }[] = [
  {
    key: "Candles",
    title: "Signature Candles",
    lede: "Small-batch soy candles in frosted glass vessels — clean-burning, phthalate-free fragrance, hand poured with intention.",
  },
  {
    key: "Wellness",
    title: "Wellness Rituals",
    lede: "Candle-care companions and calming extras that turn a quiet moment into a gentle daily ritual.",
  },
];

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14">
      <header className="max-w-2xl">
        <p className="text-[12px] font-bold tracking-[0.22em] text-clay-deep uppercase">
          Curated for calm
        </p>
        <h1 className="mt-3 font-display text-[34px] leading-[1.1] font-bold text-forest sm:text-[44px]">
          Explore our <span className="text-clay">collections</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-inkbody">
          Every Ignite Wax collection is built around a feeling — a quiet
          morning, a deep breath, a warm evening in. Find the one that fits
          your moment, or mix them to compose your own ritual.
        </p>
      </header>

      {groups.map((g) => {
        const items = products.filter((p) => p.category === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className="mt-12" aria-labelledby={`col-${g.key}`}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2
                  id={`col-${g.key}`}
                  className="font-display text-[24px] font-bold text-forest sm:text-[28px]"
                >
                  {g.title}
                </h2>
                <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-inkbody">
                  {g.lede}
                </p>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(g.key)}`}
                className="group hidden shrink-0 items-center gap-2 text-[14px] font-bold text-forest transition-colors hover:text-olive sm:inline-flex"
              >
                View in shop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group flex items-center gap-4 rounded-[18px] bg-[#fffef9] p-3.5 soft-shadow transition-all duration-300 hover:-translate-y-0.5 hover:soft-shadow-lg"
                >
                  <span className="h-20 w-20 shrink-0 overflow-hidden rounded-[12px]">
                    <img
                      src={p.image}
                      alt={`${p.name} — ${p.fragrance} scented candle`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[15.5px] font-bold text-forest">
                      {p.name}
                    </span>
                    <span className="block truncate text-[12px] text-mutedink">{p.fragrance}</span>
                    <span className="mt-1 block text-[13.5px] font-bold text-forest">
                      {formatPrice(p.price)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
