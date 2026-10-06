import { Heart } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { ViewAllLink } from "@/components/site/ui";
import { getBestsellers } from "@/data/products";

/** "Shop Our Bestsellers" — the horizontal card row from the reference. */
export function Bestsellers() {
  const items = getBestsellers().slice(0, 4);

  return (
    <section className="px-5 pt-14 sm:px-8 sm:pt-16" aria-labelledby="bestsellers-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <h2 id="bestsellers-heading" className="text-[26px] font-bold text-forest sm:text-[30px]">
            Shop Our Bestsellers
          </h2>
          <ViewAllLink href="/shop">View All</ViewAllLink>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
    { title: "Clean Ingredients", sub: "Always" },
    { title: "Mindful Moments", sub: "Every Day" },
    { title: "Made with Love", sub: "& Intention" },
  ] as const;

  return (
    <section className="px-5 pt-12 sm:px-8" aria-label="Our values">
      <div className="mx-auto max-w-6xl rounded-[26px] bg-sand/80 px-6 py-7 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-8">
          <p className="flex items-center gap-3.5 text-[17px] leading-snug font-semibold text-forest">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
              <Heart className="h-5 w-5 fill-cream" />
            </span>
            More than a candle.
            <br className="hidden lg:block" />
            <span className="text-olive lg:ml-1.5">It&apos;s a moment for you.</span>
          </p>
          {values.map((v, i) => (
            <div key={v.title} className="contents">
              <span aria-hidden="true" className="hidden lg:block lg:h-10 lg:w-px lg:bg-forest/12" />
              <p className="flex items-center gap-3 lg:pl-2">
                <span className="text-2xl" aria-hidden="true">
                  {["🫶", "🧘", "🤍"][i]}
                </span>
                <span className="text-[14px] leading-tight">
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
