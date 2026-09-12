"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HelpModal } from "@/components/HelpModal";
import { StatusBadge } from "@/components/StatusBadge";
import { SENIOR } from "@/lib/seed";
import { useStore } from "@/lib/store";

export default function SeniorHomePage() {
  const { activities, buses, trip, isGardenBooked } = useStore();
  const garden = activities.find((item) => item.id === "garden-walk");
  const bus = buses.find((item) => item.id === "bus-102");

  return (
    <main>
      <p className="text-xl text-muted">Good morning, {SENIOR.firstName}</p>
      <h1 className="mt-2 font-serif text-5xl font-semibold leading-tight">Your next activity</h1>

      <Card className="mt-6 p-7">
        {garden && bus && (
          <>
            <p className="text-lg font-semibold text-sage">{garden.businessName}</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold">{garden.name}</h2>
            <p className="mt-4 text-2xl">
              {garden.day}
              <br />
              {garden.time}
            </p>
            <p className="mt-4 text-2xl font-semibold">Pickup {bus.pickupTime}</p>
            {isGardenBooked && trip && (
              <div className="mt-4">
                <StatusBadge status={trip.status} className="text-base" />
              </div>
            )}
            <Button href={isGardenBooked ? "/senior/trip" : "/senior/activities/garden-walk"} size="xl" className="mt-8 w-full">
              {isGardenBooked ? "View trip" : "See this activity"}
            </Button>
          </>
        )}
      </Card>

      <Button href="/senior/browse" variant="secondary" size="xl" className="mt-6 w-full">
        Find something to do
      </Button>
      <div className="mt-4">
        <HelpModal large />
      </div>
    </main>
  );
}
