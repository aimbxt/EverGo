import Link from "next/link";
import { Card } from "./ui/Card";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/cn";
import type { Activity } from "@/lib/types";

const CATEGORY_MARK: Record<Activity["category"], string> = {
  fun: "Fun",
  exercise: "Move",
  social: "Social",
  outdoors: "Outdoors",
  shopping: "Shop",
  healthcare: "Care",
  errands: "Errands",
};

export function ActivityCard({
  activity,
  href,
  large = false,
  featured = false,
}: {
  activity: Activity;
  href: string;
  large?: boolean;
  featured?: boolean;
}) {
  return (
    <Link href={href} className="block">
      <Card
        className={cn(
          "h-full transition-transform hover:-translate-y-0.5",
          featured && "border-sage/40 bg-[linear-gradient(180deg,#fffdf8_0%,#eef5e8_100%)]",
          large && "p-6",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-sage">
            {CATEGORY_MARK[activity.category]}
          </p>
          {activity.hasTransport && <StatusBadge status="available" />}
        </div>
        <h3 className={cn("mt-3 font-serif font-semibold text-ink", large ? "text-3xl" : "text-2xl")}>
          {activity.name}
        </h3>
        <p className="mt-1 text-base font-medium text-muted">{activity.businessName}</p>
        <p className={cn("mt-3 text-muted", large ? "text-lg" : "text-base")}>{activity.summary}</p>
        <p className="mt-4 text-lg font-semibold text-ink">
          {activity.day} · {activity.time}
        </p>
        <p className="mt-1 text-base text-muted">
          {activity.attendeeCount} seniors attending
          {activity.hasTransport ? " · transportation ready" : ""}
        </p>
      </Card>
    </Link>
  );
}
