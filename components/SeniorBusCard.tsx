import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import type { SeniorBus } from "@/lib/types";

export function SeniorBusCard({
  bus,
  actionLabel,
  onAction,
  disabled,
}: {
  bus: SeniorBus;
  actionLabel?: string;
  onAction?: () => void;
  disabled?: boolean;
}) {
  const remaining = bus.capacity - bus.booked;
  return (
    <Card className="border-sage/30">
      <p className="text-sm font-semibold uppercase tracking-wide text-sage">Senior Bus</p>
      <h3 className="mt-1 font-serif text-3xl font-semibold">#{bus.number}</h3>
      <p className="mt-2 text-lg text-ink">{bus.destination}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-base">
        <div>
          <dt className="text-muted">Pickup</dt>
          <dd className="font-semibold">{bus.pickupTime}</dd>
        </div>
        <div>
          <dt className="text-muted">Return</dt>
          <dd className="font-semibold">{bus.returnTime}</dd>
        </div>
        <div>
          <dt className="text-muted">Seats</dt>
          <dd className="font-semibold">
            {bus.booked} / {bus.capacity} filled
          </dd>
        </div>
        <div>
          <dt className="text-muted">Open</dt>
          <dd className="font-semibold">{remaining} available</dd>
        </div>
      </dl>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-leaf">
        <div
          className="h-full rounded-full bg-sage"
          style={{ width: `${(bus.booked / bus.capacity) * 100}%` }}
        />
      </div>
      {actionLabel && (
        <Button className="mt-5 w-full" size="lg" onClick={onAction} disabled={disabled}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
