import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopGrid } from "@/components/shop/shop-grid";

export const metadata: Metadata = {
  title: "Shop All Candles",
  description:
    "Browse the full Ignite Wax collection — hand-poured soy candles in calm, considered scents. Eucalyptus + mint, peony + rose, vanilla + coconut and more.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">
          The Collection
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-forest sm:text-[46px]">
          Every candle, <span className="text-clay">poured with care.</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-inkbody">
          Hand-poured in small batches with clean-burning soy wax and cotton
          wicks. Find the scent that feels like home.
        </p>
      </header>

      <div className="mt-12">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/70" />
              ))}
            </div>
          }
        >
          <ShopGrid />
        </Suspense>
      </div>
    </div>
  );
}
