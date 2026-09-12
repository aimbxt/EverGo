import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <Link href="/" className="flex items-center gap-2 text-ink">
      <span
        className={cn(
          "grid place-items-center rounded-full bg-sage text-paper",
          size === "sm" && "size-8",
          size === "md" && "size-9",
          size === "lg" && "size-12",
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className={size === "lg" ? "size-7" : "size-5"} fill="none">
          <path
            d="M4 16c4-9 12-9 16 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="8" r="2.2" fill="currentColor" />
        </svg>
      </span>
      <span
        className={cn(
          "font-serif font-semibold tracking-tight",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-3xl",
        )}
      >
        EverGo
      </span>
    </Link>
  );
}
