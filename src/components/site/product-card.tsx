"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { formatPrice, whatsappLink, whatsappMessages } from "@/lib/config";
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

  if (variant === "grid") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25), ease: "easeOut" }}
        className="group flex flex-col overflow-hidden rounded-3xl bg-white soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
      >
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center overflow-hidden",
              tintBg[product.tint],
            )}
          >
            { }
            <img
              src={product.image}
              alt={`${product.name} — ${product.fragrance} scented candle`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </span>
          {!product.available && (
            <span className="absolute top-3 left-3 rounded-full bg-forest/85 px-3 py-1 text-[11px] font-semibold text-cream">
              Sold out
            </span>
          )}
          {product.bestseller && product.available && (
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold tracking-wide text-forest backdrop-blur-sm">
              Bestseller
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col gap-1.5 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[17px] font-bold text-forest">
                <Link href={`/product/${product.slug}`}>{product.name}</Link>
              </h3>
              <p className="text-[12.5px] text-inkbody/80">{product.fragrance}</p>
            </div>
            <WhatsAppHeart href={whatsappHref} />
          </div>
          <p className="line-clamp-2 text-[13.5px] leading-relaxed text-inkbody">
            {product.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="text-[16px] font-bold text-clay-deep">
              {formatPrice(product.price)}
            </span>
            <Link
              href={`/product/${product.slug}`}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105",
                tintPlus[product.tint],
              )}
              aria-label={`View and order ${product.name}`}
            >
              <Plus className="h-5 w-5" />
            </Link>
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
      className="group flex gap-4 rounded-3xl bg-white p-4 soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
    >
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          "relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32",
          tintBg[product.tint],
        )}
        aria-label={`View ${product.name}`}
      >
        { }
        <img
          src={product.image}
          alt={`${product.name} — ${product.fragrance} scented candle`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[16.5px] font-bold text-forest">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="truncate text-[12.5px] text-inkbody/80">{product.fragrance}</p>
          </div>
          <WhatsAppHeart href={whatsappHref} />
        </div>

        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-inkbody">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
          <span className="text-[15.5px] font-bold text-clay-deep">
            {formatPrice(product.price)}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105",
              tintPlus[product.tint],
            )}
            aria-label={`View and order ${product.name}`}
          >
            <Plus className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function WhatsAppHeart({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ask about this candle on WhatsApp"
      className="rounded-full p-1.5 text-clay transition-colors hover:bg-blush"
      title="Ask about this candle on WhatsApp"
    >
      <Heart className="h-4.5 w-4.5" />
    </a>
  );
}
