"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { formatPrice, whatsappLink, whatsappMessages } from "@/lib/config";
import { addToBag } from "@/lib/bag";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const tintBg: Record<Product["tint"], string> = {
  sage: "bg-sage",
  blush: "bg-blush",
  peach: "bg-peach",
  cream: "bg-[#f7f1e6]",
  lilac: "bg-[#efe9f4]",
};

const tintPlus: Record<Product["tint"], string> = {
  sage: "bg-olive",
  blush: "bg-clay",
  peach: "bg-clay",
  cream: "bg-olive",
  lilac: "bg-clay",
};

interface ProductCardProps {
  product: Product;
  index?: number;
  /** "wide" = horizontal card from the mockup bestseller row; "grid" = vertical shop card */
  variant?: "wide" | "grid";
}

export function ProductCard({ product, index = 0, variant = "wide" }: ProductCardProps) {
  const whatsappHref = whatsappLink(whatsappMessages.product(product.name));

  /* Bestseller row mirrors the mockup: coral / sage alternating + buttons */
  const plusClass =
    variant === "wide" ? (index % 2 === 0 ? "bg-clay-deep" : "bg-olive") : tintPlus[product.tint];

  /* Heart chip — WhatsApp enquiry, overlaid on the photo (sibling of the
     product Link so anchors are never nested). */
  const heartChip = (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ask about ${product.name} on WhatsApp`}
      title="Ask about this candle on WhatsApp"
      className="absolute top-2.5 left-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-forest/70 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-clay-deep"
    >
      <Heart className="h-3.5 w-3.5" />
    </a>
  );

  if (variant === "grid") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25), ease: "easeOut" }}
        className="group flex flex-col overflow-hidden rounded-[20px] bg-[#fffef9] soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
      >
        <div className="relative">
          <Link
            href={`/product/${product.slug}`}
            className={cn(
              "relative block aspect-square overflow-hidden",
              tintBg[product.tint],
            )}
            aria-label={`View ${product.name}`}
          >
            <img
              src={product.image}
              alt={`${product.name} — ${product.fragrance} scented candle`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </Link>
          {product.available ? (
            product.bestseller && (
              <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold tracking-wide text-forest backdrop-blur-sm">
                Bestseller
              </span>
            )
          ) : (
            <span className="absolute top-3 right-3 rounded-full bg-forest/85 px-3 py-1 text-[11px] font-semibold text-cream">
              Sold out
            </span>
          )}
          {heartChip}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-5">
          <div>
            <h3 className="font-display text-[17px] font-bold text-forest">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="text-[12.5px] text-mutedink">{product.fragrance}</p>
          </div>
          <p className="line-clamp-2 text-[13.5px] leading-relaxed text-inkbody">
            {product.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="text-[16px] font-bold text-forest">
              {formatPrice(product.price)}
            </span>
            {!product.available ? (
              <span className="rounded-full bg-sand px-4 py-2 text-[12px] font-semibold text-inkbody">
                Unavailable
              </span>
            ) : (
              <button
                type="button"
                onClick={() => addToBag(1)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105",
                  plusClass,
                )}
                aria-label={`Add ${product.name} to bag`}
              >
                <Plus className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  /* "wide" — horizontal card matching the reference bestseller row */
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.28), ease: "easeOut" }}
      className="group flex gap-3.5 rounded-[18px] bg-[#fffef9] p-3.5 soft-shadow transition-shadow duration-300 hover:soft-shadow-lg sm:gap-4 sm:p-4"
    >
      <div className="relative h-30 w-28 shrink-0 sm:h-34 sm:w-30">
        <Link
          href={`/product/${product.slug}`}
          className={cn(
            "block h-full w-full overflow-hidden rounded-[14px]",
            tintBg[product.tint],
          )}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={`${product.name} — ${product.fragrance} scented candle`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        </Link>
        {heartChip}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="min-w-0">
          <h3 className="truncate font-display text-[16px] font-bold text-forest">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="truncate text-[12px] text-mutedink">{product.fragrance}</p>
        </div>

        <p className="mt-1 line-clamp-3 text-[12px] leading-relaxed text-inkbody">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <span className="pb-0.5 text-[14.5px] font-bold text-forest">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addToBag(1)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105",
              plusClass,
            )}
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
