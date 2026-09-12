"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SeniorBusCard } from "@/components/SeniorBusCard";
import { useStore } from "@/lib/store";

export default function SeniorActivityPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { activities, buses, isGardenBooked, setRole } = useStore();
  const activity = activities.find((item) => item.id === id);
  const bus = activity?.busId ? buses.find((item) => item.id === activity.busId) : undefined;

  if (!activity) {
    return <p className="text-xl">We could not find that activity.</p>;
  }

  return (
    <main>
      <Link href="/senior/browse" className="text-lg font-semibold text-sage">
        Back
      </Link>
      <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight">{activity.name}</h1>
      <p className="mt-3 text-2xl">
        {activity.day} at {activity.time}
      </p>
      <p className="mt-2 text-xl text-muted">{activity.location}</p>
      <p className="mt-6 text-xl leading-relaxed">{activity.description}</p>
      {bus && (
        <div className="mt-6">
          <SeniorBusCard bus={bus} />
        </div>
      )}
      <Card className="mt-4">
        <p className="text-xl">{activity.attendeeCount} people are going</p>
      </Card>
      {activity.id === "garden-walk" ? (
        isGardenBooked ? (
          <Button href="/senior/trip" size="xl" className="mt-6 w-full">
            View my trip
          </Button>
        ) : (
          <>
            <p className="mt-6 text-xl text-muted">
              Sarah can reserve this seat from her family view.
            </p>
            <Button
              size="xl"
              className="mt-4 w-full"
              onClick={() => {
                setRole("family");
                router.push("/family/activities/garden-walk");
              }}
            >
              Ask Sarah to book this
            </Button>
          </>
        )
      ) : null}
    </main>
  );
}
