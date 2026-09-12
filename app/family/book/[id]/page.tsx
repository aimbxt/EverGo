"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SeniorBusCard } from "@/components/SeniorBusCard";
import { FAMILY, SENIOR } from "@/lib/seed";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { activities, buses, bookGardenTrip, isGardenBooked } = useStore();
  const activity = activities.find((item) => item.id === id);
  const bus = activity?.busId ? buses.find((item) => item.id === activity.busId) : undefined;

  if (!activity) {
    return <p>Activity not found.</p>;
  }

  const canBookGarden = activity.id === "garden-walk";

  return (
    <main className="mx-auto max-w-2xl">
      <Link href={`/family/activities/${activity.id}`} className="font-semibold text-sage">
        Back
      </Link>
      <h1 className="mt-3 font-serif text-4xl font-semibold">Confirm for {SENIOR.firstName}</h1>
      <p className="mt-2 text-lg text-muted">
        {FAMILY.firstName} is booking this with the Care Circle. Payment is mocked for the prototype.
      </p>

      <Card className="mt-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-sage">{activity.businessName}</p>
        <p className="font-serif text-3xl font-semibold">{activity.name}</p>
        <p className="text-lg">
          {activity.day} · {activity.time}
        </p>
        <p className="text-muted">{activity.location}</p>
      </Card>

      {bus && (
        <div className="mt-4">
          <SeniorBusCard bus={bus} />
        </div>
      )}

      <Card className="mt-4">
        <p className="font-semibold">Pay with</p>
        <p className="mt-1 text-lg">{FAMILY.name}&apos;s card ··4242</p>
        <p className="mt-2 text-muted">$8 round trip on Senior Bus #{bus?.number ?? "—"}</p>
      </Card>

      <Button
        size="lg"
        className="mt-6 w-full"
        disabled={!canBookGarden}
        onClick={() => {
          bookGardenTrip();
          router.push("/family/track");
        }}
      >
        {isGardenBooked ? "Already reserved — view trip" : "Confirm reservation"}
      </Button>
      {!canBookGarden && (
        <p className="mt-3 text-muted">
          This prototype books the Botanical Garden trip so the demo stays focused.
        </p>
      )}
    </main>
  );
}
