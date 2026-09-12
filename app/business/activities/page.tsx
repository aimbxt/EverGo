"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

export default function BusinessActivitiesPage() {
  const { activities } = useStore();
  const ours = activities.filter((item) => item.businessId === "botanical-garden");

  return (
    <main>
      <h1 className="font-serif text-4xl font-semibold">Activities</h1>
      <div className="mt-6 grid gap-4">
        {ours.map((activity) => (
          <Link key={activity.id} href={`/business/activities/${activity.id}`}>
            <Card className="p-6 transition-transform hover:-translate-y-0.5">
              <h2 className="font-serif text-2xl font-semibold">{activity.name}</h2>
              <p className="mt-1 text-lg">
                {activity.day} · {activity.time}
              </p>
              <p className="mt-2 text-muted">
                {activity.attendeeCount} booked · {activity.spots} spots
                {activity.hasTransport ? " · transportation listed" : ""}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
