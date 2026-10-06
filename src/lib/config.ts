/**
 * Central site configuration.
 *
 * All business-specific values come from environment variables so they can be
 * swapped at deploy time (Cloudflare dashboard / .env) without touching code.
 * Until real values are provided, clearly-identified PLACEHOLDER defaults are
 * used — replace them via the environment, never in code.
 */

function env(key: string, placeholder: string): string {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : placeholder;
}

export const siteConfig = {
  name: "Ignite Wax",
  tagline: "Handmade with intention",
  description:
    "Thoughtfully handcrafted candles using clean, natural ingredients to elevate your space, enhance your mood, and support your well-being.",
  /** PLACEHOLDER — replace NEXT_PUBLIC_SITE_URL at deployment */
  url: env("NEXT_PUBLIC_SITE_URL", "https://ignitewax.example.com"),

  /** PLACEHOLDER — set BUSINESS_EMAIL (server-only, never exposed to client) */
  businessEmail: env("BUSINESS_EMAIL", "orders@ignitewax.example.com"),
  /** PLACEHOLDER — set CONTACT_EMAIL if different from business email */
  contactEmail: env("CONTACT_EMAIL", "hello@ignitewax.example.com"),

  /** PLACEHOLDER — set NEXT_PUBLIC_WHATSAPP_NUMBER in international format, e.g. 919876543210 */
  whatsappNumber: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "919999999999"),

  /** PLACEHOLDER — set UPI_ID (server-only) */
  upiId: env("UPI_ID", "ignitewax@upi"),
  /** PLACEHOLDER — set UPI_PAYEE_NAME (server-only) */
  upiPayeeName: env("UPI_PAYEE_NAME", "Ignite Wax"),

  /** Delivery timeline in days (min/max) — used to compute the estimate server-side */
  deliveryDaysMin: 7,
  deliveryDaysMax: 14,

  currency: "USD",
  currencySymbol: "$",
} as const;

/** Formats a whole-dollar amount with cents, e.g. 28 -> $28.00 */
export function formatPrice(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toFixed(2)}`;
}

/** Builds a wa.me link with a pre-filled (URL-encoded) message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: "Hi Ignite Wax! I have a question about your candles.",
  product: (name: string) =>
    `Hi Ignite Wax! I'm interested in the ${name}. Could you tell me more about it?`,
  orderHelp: (orderId: string) =>
    `Hi Ignite Wax! I need help with my order ${orderId}.`,
} as const;
