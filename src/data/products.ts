/**
 * Centralized product catalog.
 *
 * ── HOW TO ADD A NEW CANDLE ──────────────────────────────────────────────
 * 1. Drop the product photo into /public/images/products/<slug>.jpg
 * 2. Copy any object below, give it a unique `id` + `slug`, and update the
 *    fields. The shop grid, product pages, search and order form pick it up
 *    automatically — no other code changes required.
 *
 * Products sourced from the reference mockup (Serenity, Bloom, Forest Walk,
 * Vanilla Cloud, Sunset) carry the mockup's copy. The remaining entries are
 * clearly-marked PLACEHOLDER products — replace names, descriptions, prices
 * and photos with real data when available.
 */

export type ProductCategory = "Candles" | "Wellness" | "Gifting";

export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Short one-liner shown on cards */
  description: string;
  /** Longer story shown on the product page */
  details: string;
  /** Price in whole rupees (INR) */
  price: number;
  /** Path under /public */
  image: string;
  category: ProductCategory;
  /** Scent notes line, e.g. "Eucalyptus + Mint" */
  fragrance: string;
  available: boolean;
  /** Card image-well tint — keeps product cards cohesive with the mockup */
  tint: "sage" | "blush" | "peach" | "cream" | "lilac";
  weight: string;
  burnTime: string;
  bestseller?: boolean;
  rating?: number;
  reviewCount?: number;
}

export const products: Product[] = [
  {
    id: "candle-001",
    name: "Serenity",
    slug: "serenity",
    description: "A refreshing blend that clears the mind and soothes the soul.",
    details:
      "Our bestselling signature candle. Cool eucalyptus and crisp mint unfold over a clean soy-wax base, filling the room with the calm of a morning spa ritual. Hand-poured in small batches with a cotton wick and a reusable frosted-glass vessel.",
    price: 799,
    image: "/images/products/serenity.jpg",
    category: "Candles",
    fragrance: "Eucalyptus + Mint",
    available: true,
    tint: "sage",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    bestseller: true,
    rating: 4.9,
    reviewCount: 126,
  },
  {
    id: "candle-002",
    name: "Bloom",
    slug: "bloom",
    description: "A soft, floral embrace that brings comfort and joy.",
    details:
      "Garden peonies and damask rose warmed by a whisper of soft musk. Bloom is a gentle floral that never overwhelms — think fresh sheets, morning light and a vase of just-opened roses.",
    price: 799,
    image: "/images/products/bloom.jpg",
    category: "Candles",
    fragrance: "Peony + Rose",
    available: true,
    tint: "blush",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    bestseller: true,
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "candle-003",
    name: "Forest Walk",
    slug: "forest-walk",
    description: "Earthy and grounding, like a peaceful walk in the woods.",
    details:
      "Crushed pine needles, cedarwood and damp earth. Forest Walk brings the quiet of a woodland trail indoors — grounding, resinous and deeply restorative after a long day.",
    price: 799,
    image: "/images/products/forest-walk.jpg",
    category: "Candles",
    fragrance: "Pine + Cedarwood",
    available: true,
    tint: "sage",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    bestseller: true,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: "candle-004",
    name: "Vanilla Cloud",
    slug: "vanilla-cloud",
    description: "Warm, creamy, and dreamy. Pure relaxation.",
    details:
      "Madagascan vanilla folded into coconut cream and a touch of tonka. Vanilla Cloud is comfort in candle form — mellow, sweet and impossibly cozy.",
    price: 799,
    image: "/images/products/vanilla-cloud.jpg",
    category: "Candles",
    fragrance: "Vanilla + Coconut",
    available: true,
    tint: "cream",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    bestseller: true,
    rating: 4.9,
    reviewCount: 112,
  },
  {
    id: "candle-005",
    name: "Sunset",
    slug: "sunset",
    description: "A warm, soothing glow to end your day beautifully.",
    details:
      "Golden sandalwood and soft amber glow like the last light of dusk. Sunset is our warmest blend — mellow, resinous and made for slow evenings.",
    price: 799,
    image: "/images/products/sunset.jpg",
    category: "Candles",
    fragrance: "Sandalwood + Amber",
    available: true,
    tint: "peach",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    bestseller: true,
    rating: 4.7,
    reviewCount: 76,
  },
  {
    // ── PLACEHOLDER PRODUCT — replace with real details when available ──
    id: "candle-006",
    name: "Lavender Dream",
    slug: "lavender-dream",
    description: "Lavender fields at dusk, distilled into stillness.",
    details:
      "French lavender softened with chamomile and a dusting of sweet balsam. Light it an hour before bed and let the day dissolve. (Placeholder product — details to be confirmed.)",
    price: 849,
    image: "/images/products/lavender-dream.jpg",
    category: "Wellness",
    fragrance: "Lavender + Chamomile",
    available: true,
    tint: "lilac",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    rating: 4.8,
    reviewCount: 54,
  },
  {
    // ── PLACEHOLDER PRODUCT — replace with real details when available ──
    id: "candle-007",
    name: "Amber Dusk",
    slug: "amber-dusk",
    description: "Golden amber and warm musk for slow golden hours.",
    details:
      "Rich golden amber wrapped in warm musk and a hint of smoked vanilla. Amber Dusk glows beautifully on winter evenings. (Placeholder product — details to be confirmed.)",
    price: 899,
    image: "/images/products/amber-dusk.jpg",
    category: "Candles",
    fragrance: "Golden Amber + Musk",
    available: true,
    tint: "peach",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    rating: 4.7,
    reviewCount: 41,
  },
  {
    // ── PLACEHOLDER PRODUCT — replace with real details when available ──
    id: "candle-008",
    name: "Morning Calm",
    slug: "morning-calm",
    description: "Bright lemongrass and ginger to greet the day gently.",
    details:
      "Zesty lemongrass lifted with fresh ginger and a squeeze of sweet orange. Morning Calm is sunshine in a jar — clean, uplifting and never sharp. (Placeholder product — details to be confirmed.)",
    price: 749,
    image: "/images/products/morning-calm.jpg",
    category: "Wellness",
    fragrance: "Lemongrass + Ginger",
    available: true,
    tint: "cream",
    weight: "8 oz / 226 g",
    burnTime: "~45 hours",
    rating: 4.6,
    reviewCount: 33,
  },
];

/** Lookup by slug — O(1) via index map. */
const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getAvailable(): Product[] {
  return products.filter((p) => p.available);
}

export const categories: Array<ProductCategory | "All"> = [
  "All",
  "Candles",
  "Wellness",
  "Gifting",
];
