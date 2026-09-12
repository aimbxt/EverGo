"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

export default function BusinessHomePage() {
  const { businesses, activities, isGardenBooked } = useStore();
  const garden = businesses.find((item) => item.id === "botanical-garden");
  const walking = activities.find((item) => item.id === "garden-walk");

  if (!garden) return null;

  return (
    <main>
      <p className="text-lg text-muted">{garden.kind}</p>
      <h1 className="font-serif text-4xl font-semibold">{garden.name}</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        EverGo sends seniors to your gates — and a shared bus so families can say yes.
      </p>
      {isGardenBooked && (
        <p className="mt-4 rounded-2xl bg-leaf px-4 py-3 font-semibold text-sage-deep">
          New visitor through EverGo: Margaret Johnson booked today&apos;s walking group.
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-6">
          <p className="text-muted">Senior visitors this week</p>
          <p className="mt-2 font-serif text-5xl font-semibold">{garden.visitorsThisWeek}</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted">Transportation bookings</p>
          <p className="mt-2 font-serif text-5xl font-semibold">{garden.transportBookings}</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted">Repeat visitors</p>
          <p className="mt-2 font-serif text-5xl font-semibold">{garden.repeatVisitorsPct}%</p>
        </Card>
      </div>
      {walking && (
        <Card className="mt-6 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sage">Today&apos;s activity</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">{walking.name}</h2>
          <p className="mt-2 text-lg">
            {walking.day} · {walking.time} · {walking.attendeeCount} booked of {walking.spots} spots
          </p>
          <Link href="/business/activities/garden-walk" className="mt-4 inline-block font-semibold text-sage">
            View activity
          </Link>
        </Card>
      )}
    </main>
  );
}
