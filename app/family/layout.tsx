"use client";

import { RoleNav } from "@/components/RoleNav";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  const { setRole } = useStore();
  useEffect(() => {
    setRole("family");
  }, [setRole]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <RoleNav
        items={[
          { href: "/family", label: "Home" },
          { href: "/family/discover", label: "Discover" },
          { href: "/family/track", label: "Track" },
          { href: "/family/circle", label: "Care Circle" },
          { href: "/family/plan", label: "Plan the week" },
        ]}
      />
      <div className="mt-6">{children}</div>
    </div>
  );
}
