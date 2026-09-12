"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SeniorBusCard } from "@/components/SeniorBusCard";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/lib/store";

export default function FamilyActivityPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { activities, buses, bookings } = useStore();
  const activity = activities.find((item) => item.id === id);

  if (!activity) {
    return (
      <main>
        <h1 className="font-serif text-3xl font-semibold">Activity not found</h1>
        <Link href="/family/discover" className="mt-4 inline-block font-semibold text-sage">
          Back to discover
        </Link>
      </main>
    );
  }

  const bus = activity.busId ? buses.find((item) => item.id === activity.busId) : undefined;
  const isGarden = activity.id === "garden-walk";
  const isBooked = isGarden && bookings.some((item) => item.activityId === "garden-walk");

  return (
    <main className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <Link href="/family/discover" className="font-semibold text-sage">
          Back to discover
        </Link>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-sage">
          {activity.businessName}
        </p>
        <h1 className="mt-1 font-serif text-4xl font-semibold sm:text-5xl">{activity.name}</h1>
        <p className="mt-3 text-xl">
          {activity.day} · {activity.time}
        </p>
        <p className="mt-1 text-lg text-muted">
          {activity.location} · {activity.neighborhood}
        </p>
        <p className="mt-6 text-lg leading-relaxed">{activity.description}</p>
        <Card className="mt-6">
          <p className="font-semibold">{activity.attendeeCount} seniors attending</p>
          <p className="mt-2 text-muted">{activity.price}</p>
          {activity.seniorDiscount && <p className="text-muted">{activity.seniorDiscount}</p>}
          <ul className="mt-4 flex flex-wrap gap-2">
            {activity.accessibility.map((item) => (
              <li key={item} className="rounded-full bg-leaf px-3 py-1 text-sm font-semibold text-sage-deep">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="space-y-4">
        {bus ? (
          <SeniorBusCard
            bus={bus}
            actionLabel={isGarden ? (isBooked ? "View trip" : "Reserve seat") : undefined}
            onAction={
              isGarden
                ? () => {
                    if (isBooked) router.push("/family/track");
                    else router.push(`/family/book/${activity.id}`);
                  }
                : undefined
            }
          />
        ) : (
          <Card>
            <p className="font-semibold">No shared bus for this one yet</p>
            <p className="mt-2 text-muted">Margaret could still attend if someone nearby can drive.</p>
          </Card>
        )}
        {activity.hasTransport && <StatusBadge status="available" />}
      </div>
    </main>
  );
}
