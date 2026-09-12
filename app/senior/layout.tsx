"use client";

import { RoleNav } from "@/components/RoleNav";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

export default function SeniorLayout({ children }: { children: React.ReactNode }) {
  const { setRole } = useStore();
  useEffect(() => {
    setRole("senior");
  }, [setRole]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <RoleNav
        items={[
          { href: "/senior", label: "Home" },
          { href: "/senior/browse", label: "Find something" },
          { href: "/senior/trip", label: "My trip" },
        ]}
      />
      <div className="mt-6">{children}</div>
    </div>
  );
}
