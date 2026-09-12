"use client";

import { FakeMap } from "@/components/FakeMap";
import { HelpModal } from "@/components/HelpModal";
import { StatusBadge } from "@/components/StatusBadge";
import { TripTimeline } from "@/components/TripTimeline";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

export default function SeniorTripPage() {
  const { trip, activities, buses, isGardenBooked } = useStore();
  const activity = activities.find((item) => item.id === "garden-walk");
  const bus = buses.find((item) => item.id === "bus-102");

  if (!isGardenBooked || !trip || !activity || !bus) {
    return (
      <main>
        <h1 className="font-serif text-5xl font-semibold">No trip yet</h1>
        <p className="mt-4 text-xl text-muted">When a ride is booked, it will show up here in big print.</p>
        <Button href="/senior/browse" size="xl" className="mt-6 w-full">
          Find something to do
        </Button>
      </main>
    );
  }

  return (
    <main>
      <h1 className="font-serif text-5xl font-semibold leading-tight">{activity.businessName}</h1>
      <div className="mt-4">
        <StatusBadge status={trip.status} className="text-lg" />
      </div>
      <p className="mt-4 text-2xl font-semibold">Pickup {bus.pickupTime}</p>
      <p className="mt-1 text-xl">Return {bus.returnTime}</p>
      <div className="mt-6">
        <FakeMap status={trip.status} />
      </div>
      <Card className="mt-6">
        <TripTimeline status={trip.status} />
      </Card>
      <Card className="mt-4">
        <p className="text-lg text-muted">Driver</p>
        <p className="text-2xl font-semibold">{bus.driver.name}</p>
        <p className="text-xl">
          {bus.driver.vehicle} · {bus.driver.plate}
        </p>
      </Card>
      <div className="mt-4">
        <HelpModal large />
      </div>
    </main>
  );
}
