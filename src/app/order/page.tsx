import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderWizard } from "@/components/order/order-wizard";

export const metadata: Metadata = {
  title: "Place an Order",
  description:
    "Order your Ignite Wax candles in minutes — fill in your details, pay via UPI after ordering, and receive your candles in 7–14 days.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">
          Order
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-forest sm:text-[46px]">
          Almost yours. <span className="text-clay">Let&apos;s make it official.</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-inkbody">
          Fill in your details and we&apos;ll send payment instructions. No
          account needed — your confirmation arrives by email in seconds.
        </p>
      </header>

      <div className="mt-12">
        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl">
              <div className="h-96 animate-pulse rounded-[26px] bg-white/70" />
            </div>
          }
        >
          <OrderWizard />
        </Suspense>
      </div>
    </div>
  );
}
