import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink, whatsappMessages } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ignite Wax — WhatsApp, email and business details. We usually reply within a few hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-forest sm:text-[46px]">
          We&apos;d love to <span className="text-clay">hear from you.</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-inkbody">
          Questions about a scent, an order, or a custom gift? The fastest way
          to reach us is WhatsApp — but we read every email too.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        {/* WhatsApp */}
        <a
          href={whatsappLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl bg-white p-8 soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
        >
          <span className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366]/12 text-[#1da851]">
            <MessageCircle className="h-6.5 w-6.5" strokeWidth={1.8} />
          </span>
          <h2 className="mt-5 text-[19px] font-bold text-forest">WhatsApp</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-inkbody">
            Quick questions, order updates and everything in between.
          </p>
          <p className="mt-4 text-[14px] font-bold text-olive group-hover:underline">
            Start a chat →
          </p>
          <p className="mt-2 text-[11.5px] text-inkbody/60">
            [WHATSAPP NUMBER — configured via NEXT_PUBLIC_WHATSAPP_NUMBER]
          </p>
        </a>

        {/* Email */}
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="group rounded-3xl bg-white p-8 soft-shadow transition-shadow duration-300 hover:soft-shadow-lg"
        >
          <span className="flex h-13 w-13 items-center justify-center rounded-full bg-sage text-olive">
            <Mail className="h-6.5 w-6.5" strokeWidth={1.8} />
          </span>
          <h2 className="mt-5 text-[19px] font-bold text-forest">Email</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-inkbody">
            For orders, collaborations and detailed enquiries.
          </p>
          <p className="mt-4 text-[14px] font-bold text-olive group-hover:underline">
            {siteConfig.contactEmail}
          </p>
          <p className="mt-2 text-[11.5px] text-inkbody/60">
            [BUSINESS EMAIL — configured via BUSINESS_EMAIL]
          </p>
        </a>

        {/* Business info */}
        <div className="rounded-3xl bg-white p-8 soft-shadow md:col-span-2">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-peach text-clay-deep">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-3.5 text-[15px] font-bold text-forest">Studio</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-inkbody">
                [BUSINESS ADDRESS — placeholder]
                <br />
                India
              </p>
            </div>
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-olive">
                <Clock3 className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-3.5 text-[15px] font-bold text-forest">Hours</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-inkbody">
                Monday – Saturday
                <br />
                10:00 – 19:00 IST
              </p>
            </div>
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-clay-deep">
                <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-3.5 text-[15px] font-bold text-forest">Order support</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-inkbody">
                Have your order ID ready (e.g. IW-2026-00001) so we can help
                you fastest.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-[13px] text-inkbody/70">
        Prefer to place an order right away?{" "}
        <a href="/order" className="font-bold text-olive underline underline-offset-4 hover:text-forest">
          Use the order form
        </a>{" "}
        — no account needed.
      </p>
    </div>
  );
}
