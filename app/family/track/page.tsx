"use client";

import { DriverCard } from "@/components/DriverCard";
import { FakeMap } from "@/components/FakeMap";
import { HelpModal } from "@/components/HelpModal";
import { StatusBadge } from "@/components/StatusBadge";
import { TripTimeline } from "@/components/TripTimeline";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SENIOR } from "@/lib/seed";
import { useStore } from "@/lib/store";

export default function TrackPage() {
  const { trip, activities, buses, isGardenBooked, advanceTrip, playTripToArrived } = useStore();
  const activity = activities.find((item) => item.id === "garden-walk");
  const bus = buses.find((item) => item.id === "bus-102");

  if (!isGardenBooked || !trip || !activity || !bus) {
    return (
      <main>
        <h1 className="font-serif text-4xl font-semibold">No trip to track yet</h1>
        <p className="mt-3 text-lg text-muted">
          Reserve Margaret a seat on Senior Bus #102 to watch pickup, transit, and arrival.
        </p>
        <Button href="/family/activities/garden-walk" size="lg" className="mt-6">
          See the garden walk
        </Button>
      </main>
    );
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-sage">{SENIOR.firstName}&apos;s trip</p>
        <h1 className="mt-1 font-serif text-4xl font-semibold">{activity.businessName}</h1>
        <div className="mt-3">
          <StatusBadge status={trip.status} />
        </div>
        <p className="mt-3 text-lg">
          Pickup {bus.pickupTime} · {activity.day} · {activity.time} · return {bus.returnTime}
        </p>
        <div className="mt-6">
          <FakeMap status={trip.status} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button size="lg" onClick={playTripToArrived} disabled={trip.status !== "scheduled"}>
            Play pickup
          </Button>
          <Button variant="secondary" size="lg" onClick={advanceTrip} disabled={trip.status === "completed"}>
            Advance status
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <Card>
          <h2 className="font-serif text-2xl font-semibold">Status</h2>
          <div className="mt-4">
            <TripTimeline status={trip.status} />
          </div>
        </Card>
        <DriverCard driver={bus.driver} />
        <HelpModal label="Alert Care Circle" />
      </div>
    </main>
  );
}
