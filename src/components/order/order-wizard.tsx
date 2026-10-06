"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Loader2,
  MessageCircle,
  Package,
  QrCode,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { formatPrice, whatsappLink, whatsappMessages } from "@/lib/config";
import { cn } from "@/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface ConfirmedOrder {
  orderId: string;
  deliveryLabel: string;
  total: number;
  items: Array<{ name: string; quantity: number; lineTotal: number }>;
}

type Step = "form" | "payment" | "confirmed";

const inputBase =
  "w-full rounded-2xl border border-input bg-white px-4 py-3 text-[14.5px] text-forest placeholder:text-inkbody/45 transition-colors focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/25";

const labelBase = "mb-1.5 block text-[13px] font-bold text-forest";

/* ── Component ──────────────────────────────────────────────────────────── */

export function OrderWizard() {
  const params = useSearchParams();
  const { toast } = useToast();

  const preselected = params.get("product");
  const preQty = Math.min(20, Math.max(1, Number(params.get("qty")) || 1));

  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [utr, setUtr] = useState("");
  const [utrSubmitting, setUtrSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);
  const [copied, setCopied] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrs, setFieldErrs] = useState<Record<string, string>>({});

  const [productId, setProductId] = useState(
    () => products.find((p) => p.slug === preselected && p.available)?.id ?? products[0].id,
  );
  const [qty, setQty] = useState(preQty);
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    note: "",
    company: "", // honeypot — must stay empty
  });

  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? products[0],
    [productId],
  );
  const total = product.price * qty;
  const upiId = process.env.NEXT_PUBLIC_UPI_ID_DISPLAY ?? "ignitewax@upi";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  /* ── Step 1: submit order ─────────────────────────────────────────────── */

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setFieldErrs({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: form.fullName,
            mobile: form.mobile,
            email: form.email,
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          items: [{ productId, quantity: qty }],
          note: form.note,
          company: form.company,
        }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setServerError(
          "You're ordering a little too quickly. Please wait a moment and try again.",
        );
        return;
      }
      if (res.status === 400 && data?.errors) {
        setFieldErrs(data.errors);
        setServerError("Please review the highlighted fields below.");
        return;
      }
      if (!res.ok) {
        setServerError(
          "We couldn't submit your order right now. Please try again in a moment or contact us on WhatsApp.",
        );
        return;
      }

      setConfirmed({
        orderId: data.orderId,
        deliveryLabel: data.deliveryLabel,
        total: data.total,
        items: data.items,
      });
      setStep("payment");
      toast({
        title: "Order received",
        description: `Your order ID is ${data.orderId}. A confirmation email is on its way.`,
      });
    } catch {
      setServerError(
        "We couldn't reach the server. Please check your connection and try again, or contact us on WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Step 2: payment ─────────────────────────────────────────────────── */

  async function copyUpi() {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Couldn't copy", description: `UPI ID: ${upiId}` });
    }
  }

  async function submitUtr(): Promise<boolean> {
    const trimmed = utr.trim();
    if (!trimmed) return true; // optional
    if (trimmed.length < 6) {
      setFieldErrs({ utr: "Reference looks too short." });
      return false;
    }
    setUtrSubmitting(true);
    try {
      const res = await fetch("/api/order/payment-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: confirmed?.orderId, utr: trimmed }),
      });
      if (res.ok) {
        toast({
          title: "Payment reference received",
          description: "We'll match it with your payment shortly.",
        });
        return true;
      }
      // Non-blocking: UTR is optional metadata; confirmation continues either way.
      toast({
        title: "Reference couldn't be submitted",
        description: "No problem — share it with us on WhatsApp instead.",
      });
      return true;
    } catch {
      return true; // optional field, never block confirmation
    } finally {
      setUtrSubmitting(false);
    }
  }

  async function confirmPayment() {
    const ok = await submitUtr();
    if (ok) setStep("confirmed");
  }

  /* ── Render ───────────────────────────────────────────────────────────── */

  if (step === "confirmed" && confirmed) {
    return <Confirmation order={confirmed} />;
  }

  if (step === "payment" && confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto max-w-2xl"
      >
        <OrderSummaryCard confirmed={confirmed} />

        <div className="mt-5 rounded-[26px] bg-white p-7 soft-shadow sm:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-olive">
              <QrCode className="h-5.5 w-5.5" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-[22px] font-bold text-forest">Complete Your Payment</h2>
              <p className="text-[13px] text-inkbody">
                Amount due: <b className="text-clay-deep">{formatPrice(confirmed.total)}</b>
              </p>
            </div>
          </div>

          <div className="mt-7 grid items-center gap-7 sm:grid-cols-[auto_1fr]">
            {/* QR */}
            <div className="mx-auto rounded-3xl border border-border bg-white p-4 soft-shadow">
              { }
              <img
                src="/images/site/upi-qr-placeholder.png"
                alt="UPI QR code for Ignite Wax payment (placeholder — scan with any UPI app)"
                className="h-40 w-40"
              />
              <p className="mt-2 text-center text-[11px] text-inkbody/60">
                Scan with any UPI app
              </p>
            </div>

            {/* UPI details */}
            <div>
              <p className={labelBase}>UPI ID</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-2xl border border-input bg-sand/60 px-4 py-3 text-[15px] font-bold tracking-wide text-forest">
                  {upiId}
                </code>
                <button
                  type="button"
                  onClick={copyUpi}
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-input bg-white text-forest transition-colors hover:bg-sage",
                    copied && "border-olive bg-sage text-olive",
                  )}
                  aria-label={copied ? "UPI ID copied" : "Copy UPI ID"}
                >
                  {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-[12px] text-inkbody/70">
                Pay to <b>{upiId}</b> (Google Pay, PhonePe, Paytm or any UPI app),
                then confirm below.
              </p>

              {/* UTR */}
              <p className={cn(labelBase, "mt-6")}>
                Payment Reference / UTR{" "}
                <span className="font-normal text-inkbody/60">(optional)</span>
              </p>
              <input
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                placeholder="e.g. 402512345678"
                inputMode="numeric"
                className={inputBase}
                aria-label="UPI Transaction ID / UTR (optional)"
                aria-invalid={Boolean(fieldErrs.utr)}
              />
              {fieldErrs.utr && (
                <p className="mt-1.5 text-[12.5px] font-semibold text-destructive">
                  {fieldErrs.utr}
                </p>
              )}
              <p className="mt-2 text-[12px] leading-relaxed text-inkbody/70">
                Helps us match your payment faster — find it in your UPI app&apos;s
                transaction details. Completely optional.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={confirmPayment}
              disabled={utrSubmitting}
              className="group inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-olive px-8 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-olive-deep hover:shadow-lg hover:shadow-olive/25 disabled:opacity-60"
            >
              {utrSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  I&apos;ve Made the Payment
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep("confirmed")}
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-forest/15 bg-white px-7 text-[14.5px] font-semibold text-forest transition-colors hover:bg-sand"
            >
              I&apos;ll pay shortly
            </button>
          </div>

          <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-inkbody/75">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
            Payments are verified manually by our team (usually within a few
            hours) before your candles are dispatched. You&apos;ll receive a
            confirmation once verified.
          </p>
        </div>
      </motion.div>
    );
  }

  /* ── Step 1: order form ───────────────────────────────────────────────── */

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.5fr_1fr]"
    >
      {/* Form */}
      <form onSubmit={submitOrder} noValidate className="rounded-[26px] bg-white p-7 soft-shadow sm:p-9">
        <h2 className="text-[22px] font-bold text-forest">Your details</h2>
        <p className="mt-1 text-[13.5px] text-inkbody">
          Tell us where to send your candles. We&apos;ll take care of the rest.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className={labelBase}>Full name</label>
            <input id="fullName" required autoComplete="name" value={form.fullName} onChange={set("fullName")}
              className={inputBase} placeholder="Aarav Sharma" aria-invalid={Boolean(fieldErrs["customer.fullName"])} />
            <FieldError msg={fieldErrs["customer.fullName"]} />
          </div>

          <div>
            <label htmlFor="mobile" className={labelBase}>Mobile number</label>
            <input id="mobile" required type="tel" inputMode="numeric" autoComplete="tel" value={form.mobile} onChange={set("mobile")}
              className={inputBase} placeholder="98765 43210" aria-invalid={Boolean(fieldErrs["customer.mobile"])} />
            <FieldError msg={fieldErrs["customer.mobile"]} />
          </div>

          <div>
            <label htmlFor="email" className={labelBase}>Email address</label>
            <input id="email" required type="email" autoComplete="email" value={form.email} onChange={set("email")}
              className={inputBase} placeholder="you@example.com" aria-invalid={Boolean(fieldErrs["customer.email"])} />
            <FieldError msg={fieldErrs["customer.email"]} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className={labelBase}>Full delivery address</label>
            <textarea id="address" required rows={3} autoComplete="street-address" value={form.address} onChange={set("address")}
              className={cn(inputBase, "resize-none")} placeholder="Flat / house no., street, landmark…" aria-invalid={Boolean(fieldErrs["customer.address"])} />
            <FieldError msg={fieldErrs["customer.address"]} />
          </div>

          <div>
            <label htmlFor="city" className={labelBase}>City</label>
            <input id="city" required autoComplete="address-level2" value={form.city} onChange={set("city")}
              className={inputBase} placeholder="Mumbai" aria-invalid={Boolean(fieldErrs["customer.city"])} />
            <FieldError msg={fieldErrs["customer.city"]} />
          </div>

          <div>
            <label htmlFor="state" className={labelBase}>State</label>
            <input id="state" required autoComplete="address-level1" value={form.state} onChange={set("state")}
              className={inputBase} placeholder="Maharashtra" aria-invalid={Boolean(fieldErrs["customer.state"])} />
            <FieldError msg={fieldErrs["customer.state"]} />
          </div>

          <div>
            <label htmlFor="pincode" className={labelBase}>PIN code</label>
            <input id="pincode" required inputMode="numeric" autoComplete="postal-code" value={form.pincode} onChange={set("pincode")}
              className={inputBase} placeholder="400001" maxLength={6} aria-invalid={Boolean(fieldErrs["customer.pincode"])} />
            <FieldError msg={fieldErrs["customer.pincode"]} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="note" className={labelBase}>
              Note <span className="font-normal text-inkbody/60">(optional)</span>
            </label>
            <textarea id="note" rows={2} value={form.note} onChange={set("note")}
              className={cn(inputBase, "resize-none")}
              placeholder="Gift wrap requests, delivery instructions…" />
          </div>

          {/* Honeypot — hidden from humans, irresistible to bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
          </div>
        </div>

        {serverError && (
          <p role="alert" className="mt-5 rounded-2xl bg-destructive/8 px-4 py-3 text-[13.5px] font-semibold text-destructive">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-olive px-8 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-olive-deep hover:shadow-lg hover:shadow-olive/25 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Placing your order…
            </>
          ) : (
            <>
              Place Order — {formatPrice(total)}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </>
          )}
        </button>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-[12px] text-inkbody/70">
          <ShieldCheck className="h-4 w-4 text-olive" aria-hidden="true" />
          Free to order · Pay after ordering via UPI · Delivery in 7–14 days
        </p>
      </form>

      {/* Order summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[26px] bg-white p-7 soft-shadow">
          <h2 className="flex items-center gap-2.5 text-[17px] font-bold text-forest">
            <Package className="h-5 w-5 text-olive" />
            Your order
          </h2>

          <label htmlFor="product-select" className={cn(labelBase, "mt-5")}>Candle</label>
          <select
            id="product-select"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={cn(inputBase, "appearance-none")}
          >
            {products.filter((p) => p.available).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.fragrance} ({formatPrice(p.price)})
              </option>
            ))}
          </select>

          <div className="mt-4 flex items-center justify-between">
            <span className={cn(labelBase, "mb-0")}>Quantity</span>
            <div className="flex items-center gap-1 rounded-full border border-input bg-white p-1">
              <button type="button" aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-forest hover:bg-sage disabled:opacity-35"
                disabled={qty <= 1}>−</button>
              <span className="w-8 text-center text-[14px] font-bold text-forest">{qty}</span>
              <button type="button" aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-forest hover:bg-sage disabled:opacity-35"
                disabled={qty >= 20}>+</button>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl">
            { }
            <img src={product.image} alt={`${product.name} candle`} className="aspect-[16/9] w-full object-cover" />
          </div>
          <p className="mt-3 text-[13px] text-inkbody">{product.description}</p>

          <div className="mt-5 space-y-2 border-t border-border pt-4 text-[14px]">
            <p className="flex justify-between text-inkbody">
              <span>{product.name} × {qty}</span>
              <span>{formatPrice(product.price * qty)}</span>
            </p>
            <p className="flex justify-between text-inkbody">
              <span>Delivery</span>
              <span className="font-semibold text-olive">Calculated at dispatch</span>
            </p>
            <p className="flex justify-between border-t border-border pt-3 text-[16px] font-bold text-forest">
              <span>Total</span>
              <span className="text-clay-deep">{formatPrice(total)}</span>
            </p>
          </div>

          <p className="mt-5 flex items-start gap-2 rounded-2xl bg-sand/70 p-3.5 text-[12px] leading-relaxed text-inkbody">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
            Estimated delivery window is calculated when you place the order —
            currently 7–14 days.
          </p>
        </div>
      </aside>
    </motion.div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 text-[12.5px] font-semibold text-destructive">
      {msg}
    </p>
  );
}

function OrderSummaryCard({ confirmed }: { confirmed: ConfirmedOrder }) {
  return (
    <div className="rounded-[26px] bg-forest p-6 text-cream soft-shadow sm:p-7">
      <p className="flex items-center gap-2.5 text-[13px] font-semibold text-cream/80">
        <CheckCircle2 className="h-5 w-5 text-clay" />
        Order placed — pending payment
      </p>
      <p className="mt-2 text-[26px] font-bold">
        {confirmed.orderId}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[13.5px] text-cream/80">
        {confirmed.items.map((i) => (
          <span key={i.name}>
            {i.name} × {i.quantity} — {formatPrice(i.lineTotal)}
          </span>
        ))}
        <span className="font-bold text-clay">Total {formatPrice(confirmed.total)}</span>
      </div>
    </div>
  );
}

function Confirmation({ order }: { order: ConfirmedOrder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto max-w-2xl"
    >
      <div className="overflow-hidden rounded-[28px] bg-white soft-shadow-lg">
        <div className="bg-forest px-8 py-12 text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 220 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay text-white"
          >
            <CheckCircle2 className="h-8 w-8" />
          </motion.span>
          <h1 className="mt-5 text-3xl font-bold text-cream sm:text-[34px]">
            Order Received!
          </h1>
          <p className="mt-2 text-[14.5px] text-cream/75">
            Thank you for choosing Ignite Wax. Your candles are being prepared
            with care.
          </p>
        </div>

        <div className="px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-sand/70 p-5 text-center">
              <p className="text-[11px] font-bold tracking-[0.16em] text-inkbody/70 uppercase">
                Order ID
              </p>
              <p className="mt-1.5 text-[21px] font-bold text-forest">{order.orderId}</p>
            </div>
            <div className="rounded-2xl bg-sand/70 p-5 text-center">
              <p className="text-[11px] font-bold tracking-[0.16em] text-inkbody/70 uppercase">
                Estimated Delivery
              </p>
              <p className="mt-1.5 flex items-center justify-center gap-2 text-[17px] font-bold text-forest">
                <Truck className="h-5 w-5 text-olive" aria-hidden="true" />
                {order.deliveryLabel}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border p-5">
            <p className="text-[13px] font-bold text-forest">Items</p>
            <ul className="mt-2 space-y-1.5 text-[13.5px] text-inkbody">
              {order.items.map((i) => (
                <li key={i.name} className="flex justify-between">
                  <span>{i.name} × {i.quantity}</span>
                  <span>{formatPrice(i.lineTotal)}</span>
                </li>
              ))}
              <li className="flex justify-between border-t border-border pt-2 font-bold text-forest">
                <span>Total</span>
                <span className="text-clay-deep">{formatPrice(order.total)}</span>
              </li>
            </ul>
          </div>

          <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-sage/60 p-4 text-[13.5px] leading-relaxed text-forest">
            <MailIcon />
            We&apos;ve sent your order details to your email. Payment is
            verified manually — we&apos;ll confirm once it&apos;s matched.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(whatsappMessages.orderHelp(order.orderId))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-olive px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-olive-deep"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              Need help? Chat on WhatsApp
            </a>
            <Link
              href="/shop"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full border border-forest/15 px-6 text-[14.5px] font-semibold text-forest transition-colors hover:bg-sand"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue browsing
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-olive" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </svg>
  );
}
