"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/ActivityCard";
import { CATEGORIES } from "@/lib/seed";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";

export default function SeniorBrowsePage() {
  const { activities } = useStore();
  const [category, setCategory] = useState<Category | "all">("all");
  const filtered = useMemo(
    () => (category === "all" ? activities : activities.filter((item) => item.category === category)),
    [activities, category],
  );

  return (
    <main>
      <h1 className="font-serif text-5xl font-semibold">What sounds good?</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            "min-h-14 rounded-full px-5 text-lg font-semibold",
            category === "all" ? "bg-sage text-paper" : "bg-paper text-ink",
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
              "min-h-14 rounded-full px-5 text-lg font-semibold",
              category === item.id ? "bg-sage text-paper" : "bg-paper text-ink",
            )}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {filtered.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            href={`/senior/activities/${activity.id}`}
            large
            featured={activity.featured}
          />
        ))}
      </div>
    </main>
  );
}
