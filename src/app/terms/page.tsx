import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Order Policy",
  description:
    "Ignite Wax order, delivery, payment and cancellation policy.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20">
      <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-forest">Terms & Order Policy</h1>
      <p className="mt-3 text-[13.5px] text-inkbody/70">Last updated: October 2026</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-inkbody [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:text-forest">
        <section>
          <h2>1. Placing an order</h2>
          <p className="mt-2">
            Orders are placed through the order form on this website. After you
            submit, you receive a unique order ID (e.g. IW-2026-00001) and an
            email acknowledgement. An order is confirmed once your payment is
            received and manually verified by our team.
          </p>
        </section>

        <section>
          <h2>2. Pricing</h2>
          <p className="mt-2">
            Prices shown are in Indian Rupees (INR) and include GST where
            applicable. The total for your order is calculated from our current
            catalogue at the time you order. We may change prices at any time,
            but changes never affect orders already placed.
          </p>
        </section>

        <section>
          <h2>3. Payment</h2>
          <p className="mt-2">
            We currently accept UPI payments. After placing an order you&apos;ll
            receive a payment reference (UPI ID and QR code). Payment
            verification is manual and usually completed within a few hours
            during business hours — you&apos;ll receive a confirmation once
            your payment is matched. Sharing your UTR (UPI transaction
            reference) helps us match faster.
          </p>
        </section>

        <section>
          <h2>4. Delivery</h2>
          <p className="mt-2">
            Estimated delivery is 7–14 days from your order date. The exact
            window is shown on your confirmation page and email. Delivery
            timelines may extend during festivals, weather disruptions or
            unforeseen logistics delays — we&apos;ll always keep you informed.
          </p>
        </section>

        <section>
          <h2>5. Cancellation</h2>
          <p className="mt-2">
            You may cancel an unpaid order any time by contacting us. For paid
            orders, cancellation requests are accepted within 24 hours of
            payment verification, and refunds are issued to the originating
            UPI account within 5–7 business days. After dispatch, orders cannot
            be cancelled.
          </p>
        </section>

        <section>
          <h2>6. Returns & damages</h2>
          <p className="mt-2">
            If a candle arrives damaged, send us a photo within 48 hours of
            delivery and we&apos;ll replace it or refund you in full — your
            choice. Because candles are personal-care items, we can&apos;t
            accept returns for change of mind once the seal is broken.
          </p>
        </section>

        <section>
          <h2>7. Candle safety</h2>
          <p className="mt-2">
            Never leave a burning candle unattended. Keep away from children,
            pets, curtains and drafts. Trim the wick to 5 mm before each light
            and stop burning when 10 mm of wax remains.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p className="mt-2">
            For anything at all, reach us via the{" "}
            <a href="/contact" className="font-semibold text-olive underline underline-offset-4">
              contact page
            </a>{" "}
            — WhatsApp is fastest.
          </p>
        </section>
      </div>
    </div>
  );
}
