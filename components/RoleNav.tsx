"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function RoleNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-4 text-base font-semibold",
              active ? "bg-sage text-paper" : "bg-paper text-muted hover:text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
