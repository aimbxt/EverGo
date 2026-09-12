import { Card } from "./ui/Card";
import type { Driver } from "@/lib/types";

export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-wide text-sage">Driver</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid size-14 place-items-center rounded-full bg-leaf font-serif text-xl font-semibold text-sage-deep">
          {driver.photoInitials}
        </span>
        <div>
          <p className="text-xl font-semibold">{driver.name}</p>
          <p className="text-muted">{driver.years} years with EverGo · verified</p>
        </div>
      </div>
      <p className="mt-4 text-base">
        {driver.vehicle} · {driver.plate}
      </p>
    </Card>
  );
}
