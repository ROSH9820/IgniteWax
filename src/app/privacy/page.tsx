import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ignite Wax collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20">
      <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-forest">Privacy Policy</h1>
      <p className="mt-3 text-[13.5px] text-inkbody/70">Last updated: October 2026</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-inkbody [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:text-forest">
        <section>
          <h2>1. What we collect</h2>
          <p className="mt-2">
            When you place an order with Ignite Wax, we collect only the
            information needed to fulfil it: your full name, mobile number,
            email address, delivery address (street, city, state and PIN code),
            the products and quantities you order, any note you choose to add,
            and — if you provide one — your UPI payment reference (UTR). We do
            not collect payment credentials: UPI payments happen entirely
            within your payment app.
          </p>
        </section>

        <section>
          <h2>2. How we use it</h2>
          <p className="mt-2">
            Your information is used to process and deliver your order, send
            order confirmations and updates by email, contact you on WhatsApp
            or by phone if we need to coordinate delivery, and match your UPI
            payment to your order. That&apos;s it — we do not sell, rent or
            trade your personal information to anyone.
          </p>
        </section>

        <section>
          <h2>3. Who can see it</h2>
          <p className="mt-2">
            Order details are shared with the Ignite Wax team member fulfilling
            your order, with our delivery partner (only your name, address and
            mobile), and with our email service provider (Resend) purely to
            deliver transactional email. Payment references are matched
            manually by our team.
          </p>
        </section>

        <section>
          <h2>4. What we store, and for how long</h2>
          <p className="mt-2">
            We keep the minimum necessary: order records are retained for up to
            24 months for warranty, support and accounting purposes, after
            which they are deleted. We do not store card numbers, UPI PINs or
            passwords — we never ask for them.
          </p>
        </section>

        <section>
          <h2>5. Cookies & analytics</h2>
          <p className="mt-2">
            This website stores nothing on your device except what&apos;s
            strictly technical (for example, keeping your language or cart
            preferences during a visit). We do not run advertising trackers.
          </p>
        </section>

        <section>
          <h2>6. Your choices</h2>
          <p className="mt-2">
            You may request a copy, correction or deletion of your personal
            information at any time by emailing us or messaging us on WhatsApp.
            We&apos;ll action verified requests within 30 days.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p className="mt-2">
            Questions about this policy? Email us or use the WhatsApp chat on
            any page — see the{" "}
            <a href="/contact" className="font-semibold text-olive underline underline-offset-4">
              contact page
            </a>{" "}
            for details.
          </p>
        </section>
      </div>
    </div>
  );
}
