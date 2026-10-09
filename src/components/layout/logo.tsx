import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Ignite Wax logo badge — the client's actual artwork (sage circular badge
 * with the white candle glyph), rendered from their supplied logo file.
 * Circular-alpha PNG, so it sits cleanly on any background.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-sage",
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src="/images/site/logo-emblem.png"
        alt=""
        fill
        sizes="(max-width: 640px) 40px, 48px"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </span>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      {!compact && (
        <span className="font-display text-[19px] font-bold tracking-tight text-ink">
          Ignite Wax
        </span>
      )}
    </span>
  );
}
