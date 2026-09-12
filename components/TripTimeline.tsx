import { cn } from "@/lib/cn";
import { TRIP_COPY, TRIP_ORDER } from "@/lib/seed";
import type { TripStatus } from "@/lib/types";

export function TripTimeline({ status }: { status: TripStatus }) {
  const current = TRIP_ORDER.indexOf(status);
  return (
    <ol className="space-y-3">
      {TRIP_ORDER.map((step, index) => {
        const done = index <= current;
        const active = index === current;
        return (
          <li key={step} className="flex gap-3">
            <span
              className={cn(
                "mt-1 size-4 shrink-0 rounded-full border-2",
                done ? "border-sage bg-sage" : "border-line bg-paper",
                active && "ring-4 ring-leaf",
              )}
            />
            <div>
              <p className={cn("font-semibold", done ? "text-ink" : "text-muted")}>
                {TRIP_COPY[step].label}
              </p>
              {active && <p className="text-base text-muted">{TRIP_COPY[step].body}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
