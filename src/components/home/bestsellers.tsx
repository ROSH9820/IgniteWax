import { Heart, HandHeart, Droplets, Flower2 } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { ViewAllLink } from "@/components/site/ui";
import { getBestsellers } from "@/data/products";

/** "Shop Our Bestsellers" — the horizontal card row from the reference. */
export function Bestsellers() {
  const items = getBestsellers().slice(0, 4);

  return (
    <section className="px-5 pt-12 sm:px-8 sm:pt-14" aria-labelledby="bestsellers-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <h2 id="bestsellers-heading" className="font-display text-[24px] font-bold text-forest sm:text-[28px]">
            Shop Our Bestsellers
          </h2>
          <ViewAllLink href="/shop">View All</ViewAllLink>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} variant="wide" />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Manifesto strip — "More than a candle. It's a moment for you." */
export function Manifesto() {
  const values = [
    { icon: HandHeart, title: "Clean Ingredients", sub: "Always" },
    { icon: Droplets, title: "Mindful Moments", sub: "Every Day" },
    { icon: Flower2, title: "Made with Love", sub: "& Intention" },
  ] as const;

  return (
    <section className="px-5 pt-12 sm:px-8" aria-label="Our values">
      <div className="mx-auto max-w-6xl rounded-[22px] bg-sage-strip px-6 py-5 sm:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.5fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-7">
          <p className="flex items-center gap-3 text-[13.5px] leading-snug font-bold text-forest">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-forest">
              <Heart className="h-4.5 w-4.5 fill-forest/15" />
            </span>
            More than a candle. It&apos;s a moment for you.
          </p>
          {values.map((v, i) => (
            <div key={v.title} className="contents">
              <span aria-hidden="true" className="hidden lg:block lg:h-9 lg:w-px lg:bg-forest/15" />
              <p className="flex items-center gap-3 lg:pl-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-forest">
                  <v.icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                <span className="text-[12.5px] leading-tight">
                  <span className="block font-bold text-forest">{v.title}</span>
                  <span className="block text-inkbody/80">{v.sub}</span>
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
