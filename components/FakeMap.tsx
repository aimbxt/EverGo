import type { TripStatus } from "@/lib/types";

const POSITION: Record<TripStatus, number> = {
  scheduled: 6,
  driver_arriving: 14,
  picked_up: 28,
  in_transit: 58,
  arrived: 88,
  returning: 58,
  completed: 8,
};

export function FakeMap({ status }: { status: TripStatus }) {
  const x = POSITION[status];
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-[#e7eedd] p-4">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage">Trip map</p>
      <svg viewBox="0 0 100 46" className="h-40 w-full" role="img" aria-label="Illustrated route from home to the garden">
        <path
          d="M8 38 C 22 38, 24 10, 40 12 S 62 40, 78 14"
          fill="none"
          stroke="#2f5d3a"
          strokeWidth="1.6"
          strokeDasharray="2 2"
        />
        <circle cx="8" cy="38" r="3.2" fill="#2f5d3a" />
        <text x="8" y="45" textAnchor="middle" fontSize="3.4" fill="#21432b">
          Home
        </text>
        <circle cx="88" cy="12" r="3.2" fill="#9a6b14" />
        <text x="88" y="8" textAnchor="middle" fontSize="3.4" fill="#21432b">
          Garden
        </text>
        <rect x={x - 4} y="20" width="10" height="6" rx="1.5" fill="#21432b" />
        <circle cx={x - 1} cy="27" r="1.4" fill="#efe6d6" />
        <circle cx={x + 4} cy="27" r="1.4" fill="#efe6d6" />
      </svg>
      <p className="text-sm text-muted">Simulated location for the prototype — not live GPS.</p>
    </div>
  );
}
