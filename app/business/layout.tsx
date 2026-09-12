"use client";

import { RoleNav } from "@/components/RoleNav";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const { setRole } = useStore();
  useEffect(() => {
    setRole("business");
  }, [setRole]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <RoleNav
        items={[
          { href: "/business", label: "Dashboard" },
          { href: "/business/activities", label: "Activities" },
          { href: "/business/create", label: "Create activity" },
        ]}
      />
      <div className="mt-6">{children}</div>
    </div>
  );
}
