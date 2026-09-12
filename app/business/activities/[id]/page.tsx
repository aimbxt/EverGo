"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

export default function BusinessActivityPage() {
  const { id } = useParams<{ id: string }>();
  const { activities, isGardenBooked } = useStore();
  const activity = activities.find((item) => item.id === id);

  if (!activity) return <p>Activity not found.</p>;

  return (
    <main className="max-w-2xl">
      <Link href="/business/activities" className="font-semibold text-sage">
        Back
      </Link>
      <h1 className="mt-3 font-serif text-4xl font-semibold">{activity.name}</h1>
      <p className="mt-2 text-lg">
        {activity.day} · {activity.time} · {activity.location}
      </p>
      <Card className="mt-6">
        <p className="text-muted">Booked through EverGo</p>
        <p className="font-serif text-5xl font-semibold">{activity.attendeeCount}</p>
        <p className="mt-2">{activity.spots} spots total</p>
      </Card>
      {activity.id === "garden-walk" && isGardenBooked && (
        <Card className="mt-4 border-sage/40">
          <p className="font-semibold">Latest booking</p>
          <p className="mt-1 text-lg">Margaret Johnson · Senior Bus #102 · booked by Sarah Johnson</p>
        </Card>
      )}
    </main>
  );
}
