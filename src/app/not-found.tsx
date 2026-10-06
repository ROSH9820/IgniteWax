import Link from "next/link";
import { PillButton } from "@/components/site/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center sm:px-8">
      <span className="text-[64px]" aria-hidden="true">
        🕯️
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-forest">
        This page burned out.
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-inkbody">
        The page you&apos;re looking for doesn&apos;t exist — but there&apos;s
        plenty of warm light this way instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <PillButton href="/">Back to Home</PillButton>
        <PillButton href="/shop" variant="ghost">
          Browse Candles
        </PillButton>
      </div>
    </div>
  );
}
