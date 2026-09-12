"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/ActivityCard";
import { CATEGORIES } from "@/lib/seed";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";
import Link from "next/link";

export default function DiscoverPage() {
  const { activities } = useStore();
  const [category, setCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const list = category === "all" ? activities : activities.filter((a) => a.category === category);
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [activities, category]);

  return (
    <main>
      <p className="text-sm font-semibold uppercase tracking-wide text-sage">Discover</p>
      <h1 className="mt-1 font-serif text-4xl font-semibold">What does Margaret want to do?</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        Start with an activity, not a destination. Transportation follows.
      </p>
      <p className="mt-3">
        <Link href="/family/plan" className="font-semibold text-sage">
          Or plan her week from her interests
        </Link>
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            "min-h-11 rounded-full px-4 font-semibold",
            category === "all" ? "bg-sage text-paper" : "bg-paper text-muted",
          )}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "min-h-11 rounded-full px-4 font-semibold",
              category === item.id ? "bg-sage text-paper" : "bg-paper text-muted",
            )}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            href={`/family/activities/${activity.id}`}
            featured={activity.featured}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-lg text-muted">Nothing in this category yet. Try All or another chip.</p>
      )}
    </main>
  );
}
