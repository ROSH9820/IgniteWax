import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/** Small uppercase kicker used above section titles. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11.5px] font-bold tracking-[0.28em] text-clay-deep uppercase", className)}>
      {children}
    </p>
  );
}

/** Section title block — kicker + big rounded-sans heading + optional lede. */
export function SectionHeading({
  kicker,
  title,
  accent,
  lede,
  align = "center",
}: {
  kicker: string;
  title: string;
  accent?: string;
  lede?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-forest sm:text-[40px] sm:leading-[1.12]">
        {title}{" "}
        {accent && <span className="text-clay">{accent}</span>}
      </h2>
      {lede && <p className="mt-4 text-[15px] leading-relaxed text-inkbody">{lede}</p>}
    </div>
  );
}

/** Primary pill button (dark olive, arrow chip) — mirrors the mockup CTA. */
export function PillButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "clay";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive disabled:cursor-not-allowed disabled:opacity-60";
  const styles = {
    primary: "bg-olive text-white hover:bg-olive-deep hover:shadow-lg hover:shadow-olive/25",
    clay: "bg-clay-deep text-white hover:bg-clay hover:shadow-lg hover:shadow-clay/25",
    ghost:
      "border border-forest/15 bg-white text-forest hover:border-forest/30 hover:bg-sand",
  } as const;
  const icon =
    variant === "ghost" ? (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-forest transition-colors group-hover:bg-sage">
        <Play className="h-3.5 w-3.5 fill-current" />
      </span>
    ) : (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" />
      </span>
    );

  if (href) {
    return (
      <Link href={href} className={cn(base, styles[variant], className)}>
        {children}
        {icon}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cn(base, styles[variant], className)}>
      {children}
      {icon}
    </button>
  );
}

/** Circular arrow link ("View All →") used in section headers. */
export function ViewAllLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 text-[15px] font-semibold text-forest transition-colors hover:text-olive"
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 transition-all duration-200 group-hover:border-olive group-hover:bg-sage">
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Thin-line icon inside a circle — the mockup's trust-badge motif. */
export function CircleIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/15 bg-white/70 text-forest",
        className,
      )}
    >
      {children}
    </span>
  );
}
