"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/site/product-card";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";

export function ShopGrid() {
  const params = useSearchParams();
  const initial = params.get("category");
  const [active, setActive] = useState<string>(
    categories.includes(initial as never) ? (initial as string) : "All",
  );

  const select = (c: string) => {
    setActive(c);
    const url = c === "All" ? "/shop" : `/shop?category=${encodeURIComponent(c)}`;
    window.history.replaceState(null, "", url);
  };

  const visible = products.filter(
    (p) => p.available && (active === "All" || p.category === active),
  );

  return (
    <div>
      {/* Category pills */}
      <div
        role="tablist"
        aria-label="Filter products by category"
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => select(c)}
            className={cn(
              "min-h-10 rounded-full border border-forest/12 bg-white px-5 text-[13.5px] font-semibold text-forest/70 transition-all duration-200 hover:border-olive/40 hover:text-forest",
              active === c && "border-olive bg-olive text-white hover:text-white",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} variant="grid" />
        ))}
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-[15px] text-inkbody">
          Nothing in this category yet — new candles are pouring soon.
        </p>
      )}
    </div>
  );
}
