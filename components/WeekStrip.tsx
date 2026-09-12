import { cn } from "@/lib/cn";
import type { WeekItem } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

const TONE: Record<WeekItem["tone"], string> = {
  sage: "border-l-sage",
  gold: "border-l-gold",
  sky: "border-l-sky",
};

export function WeekStrip({ items }: { items: WeekItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.activityId}
          className={cn("rounded-2xl border border-line bg-paper px-4 py-3 border-l-4", TONE[item.tone])}
        >
          <p className="text-sm font-semibold text-muted">{item.weekday}</p>
          <p className="mt-1 font-serif text-xl font-semibold">{item.label}</p>
          <div className="mt-2">
            <StatusBadge status={item.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
