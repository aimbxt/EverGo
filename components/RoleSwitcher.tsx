"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";

const ROLES: { id: Role; label: string; home: string }[] = [
  { id: "family", label: "Family", home: "/family" },
  { id: "senior", label: "Senior", home: "/senior" },
  { id: "business", label: "Business", home: "/business" },
];

export function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith("/family")) return "family";
  if (pathname.startsWith("/senior")) return "senior";
  if (pathname.startsWith("/business")) return "business";
  return null;
}

export function RoleSwitcher() {
  const { role, setRole } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const pathRole = roleFromPath(pathname);

  return (
    <div className="flex rounded-full border border-line bg-paper p-1" role="tablist" aria-label="View as">
      {ROLES.map((item) => {
        const active = pathRole ? pathRole === item.id : role === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={cn(
              "min-h-10 rounded-full px-3 text-sm font-semibold sm:px-4",
              active ? "bg-sage text-paper" : "text-muted hover:text-ink",
            )}
            onClick={() => {
              setRole(item.id);
              if (!pathname.startsWith(item.home)) router.push(item.home);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
