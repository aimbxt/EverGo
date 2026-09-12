import { cn } from "@/lib/cn";
import type { TripStatus, WeekItemStatus } from "@/lib/types";

const TRIP_LABELS: Record<TripStatus, string> = {
  scheduled: "Confirmed",
  driver_arriving: "Driver arriving",
  picked_up: "Picked up",
  in_transit: "On the way",
  arrived: "Arrived safely",
  returning: "Returning",
  completed: "Completed",
};

export function StatusBadge({
  status,
  className,
}: {
  status: TripStatus | WeekItemStatus | "available";
  className?: string;
}) {
  const label =
    status === "available"
      ? "Transportation available"
      : status in TRIP_LABELS
        ? TRIP_LABELS[status as TripStatus]
        : status === "recommended"
          ? "Recommended"
          : status === "today"
            ? "Today"
            : status === "confirmed"
              ? "Confirmed"
              : "Done";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize",
        (status === "scheduled" || status === "confirmed" || status === "available") &&
          "bg-leaf text-sage-deep",
        (status === "driver_arriving" || status === "picked_up" || status === "in_transit" || status === "today") &&
          "bg-gold-soft text-gold",
        status === "arrived" && "bg-leaf text-sage",
        (status === "returning" || status === "completed") && "bg-sky-soft text-sky",
        status === "recommended" && "bg-gold-soft text-gold",
        className,
      )}
    >
      {label}
    </span>
  );
}
