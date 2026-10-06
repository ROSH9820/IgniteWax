import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Flame, Droplets, Clock3, Tag } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/config";
import { ProductActions } from "@/components/shop/product-actions";
import { ProductCard } from "@/components/site/product-card";
import { Kicker } from "@/components/site/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.fragrance}`,
    description: `${product.description} Hand-poured soy candle, ${product.weight}. ${formatPrice(product.price)}.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${product.fragrance} · Ignite Wax`,
      description: product.description,
      images: [{ url: product.image, width: 1024, height: 1024, alt: `${product.name} candle` }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.fragrance}`,
    image: [product.image],
    description: product.description,
    brand: { "@type": "Brand", name: "Ignite Wax" },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const specs = [
    { icon: Droplets, label: "Fragrance", value: product.fragrance },
    { icon: Flame, label: "Wax & wick", value: "Natural soy · cotton wick" },
    { icon: Tag, label: "Size", value: product.weight },
    { icon: Clock3, label: "Burn time", value: product.burnTime },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 sm:px-8 sm:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-inkbody transition-colors hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-[28px] soft-shadow-lg">
            { }
            <img
              src={product.image}
              alt={`${product.name} — ${product.fragrance} hand-poured soy candle by Ignite Wax`}
              className="aspect-square w-full object-cover"
              fetchPriority="high"
            />
          </div>
          {product.bestseller && (
            <span className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-[12px] font-bold text-forest backdrop-blur-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <Kicker>{product.category}</Kicker>
          <h1 className="mt-2.5 text-4xl font-bold tracking-tight text-forest sm:text-[44px]">
            {product.name}
          </h1>
          <p className="mt-2 text-[15px] font-semibold text-clay-deep">{product.fragrance}</p>

          {product.rating && (
            <p className="mt-2.5 flex items-center gap-2 text-[14px]">
              <span className="text-clay" aria-hidden="true">★★★★★</span>
              <span className="text-inkbody">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </p>
          )}

          <p className="mt-5 text-[27px] font-bold text-clay-deep">
            {formatPrice(product.price)}
          </p>

          <p className="mt-4 text-[15.5px] leading-relaxed text-inkbody">{product.details}</p>

          {/* Specs */}
          <dl className="mt-7 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="flex items-start gap-3 rounded-2xl bg-white/80 p-3.5">
                <s.icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-olive" strokeWidth={1.8} />
                <div>
                  <dt className="text-[11px] font-bold tracking-[0.12em] text-inkbody/70 uppercase">
                    {s.label}
                  </dt>
                  <dd className="text-[13.5px] font-semibold text-forest">{s.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <ProductActions product={product} />
        </div>
      </div>

      {/* Related */}
      <section className="mt-20" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-[26px] font-bold text-forest">
          You may also love
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} variant="wide" />
          ))}
        </div>
      </section>
    </div>
  );
}
