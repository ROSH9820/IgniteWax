"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, whatsappLink, whatsappMessages } from "@/lib/config";
import type { Product } from "@/data/products";

/** Quantity + CTA block on the product page. */
export function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const max = 20;

  const orderHref = `/order?product=${product.slug}&qty=${qty}`;

  return (
    <div className="mt-8">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-[14px] font-semibold text-forest">Quantity</span>
        <div className="flex items-center gap-1 rounded-full border border-forest/12 bg-white p-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span
            aria-live="polite"
            className="w-9 text-center text-[15px] font-bold text-forest"
          >
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-[15px] font-bold text-clay-deep">
          {formatPrice(product.price * qty)}
        </span>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={orderHref}
          className="group inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-olive px-8 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-olive-deep hover:shadow-lg hover:shadow-olive/25 sm:flex-none sm:px-10"
        >
          Order This Candle
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
        <a
          href={whatsappLink(whatsappMessages.product(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-forest/15 bg-white px-8 text-[15px] font-semibold text-forest transition-colors hover:bg-sand"
        >
          <MessageCircle className="h-4.5 w-4.5" />
          Ask on WhatsApp
        </a>
      </div>

      {/* Reassurance */}
      <div className="mt-7 grid gap-3 text-[13px] text-inkbody sm:grid-cols-2">
        <p className="flex items-center gap-2.5">
          <Truck className="h-4.5 w-4.5 text-olive" aria-hidden="true" />
          Estimated delivery in 7–14 days from your order date.
        </p>
        <p className="flex items-center gap-2.5">
          <ShieldCheck className="h-4.5 w-4.5 text-olive" aria-hidden="true" />
          Secure manual UPI payment — confirmed by our team.
        </p>
      </div>
    </div>
  );
}
