import { cn } from "@/lib/utils";

/**
 * Ignite Wax logo — circular deep-green badge with a candle glyph.
 * Inline SVG recreation of the reference mockup's mark; swap for the real
 * logo asset in /public when available.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-forest text-cream",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" className="h-[58%] w-[58%]">
        {/* flame */}
        <path d="M12 3.2c1.1 1.5 2.3 2.9 2.3 4.5a2.3 2.3 0 1 1-4.6 0c0-1.6 1.2-3 2.3-4.5Z" />
        {/* jar */}
        <path d="M7.5 12.5h9v5.2a2.3 2.3 0 0 1-2.3 2.3H9.8a2.3 2.3 0 0 1-2.3-2.3v-5.2Z" />
        {/* wax line */}
        <path d="M9.3 15.4h5.4" />
      </svg>
    </span>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      {!compact && (
        <span className="font-display text-[19px] font-bold tracking-tight text-forest">
          Ignite Wax
        </span>
      )}
    </span>
  );
}
