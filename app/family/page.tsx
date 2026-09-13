"use client";

import Link from "next/link";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { WeekStrip } from "@/components/WeekStrip";
import { FAMILY, SENIOR } from "@/lib/seed";
import { useStore } from "@/lib/store";

export default function FamilyHomePage() {
  const { activities, buses, week, trip, isGardenBooked } = useStore();
  const garden = activities.find((a) => a.id === "garden-walk");
  const bus = buses.find((b) => b.id === "bus-102");

  return (
    <main>
      <p className="text-lg text-muted">Good morning, {FAMILY.firstName}</p>
      <h1 className="mt-1 font-serif text-4xl font-semibold sm:text-5xl">
        What&apos;s happening with {SENIOR.firstName}?
      </h1>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-serif text-2xl font-semibold">{SENIOR.firstName}&apos;s week</h2>
          <Link href="/family/parent" className="text-base font-semibold text-sage">
            View profile
          </Link>
        </div>
        <WeekStrip items={week} />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          {isGardenBooked && bus && garden ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-sage">Next trip</p>
              <h3 className="mt-2 font-serif text-3xl font-semibold">{garden.businessName}</h3>
              <p className="mt-2 text-lg">
                Pickup {bus.pickupTime} · {garden.day} · {garden.time}
              </p>
              <div className="mt-3">
                <StatusBadge status={trip?.status ?? "scheduled"} />
              </div>
              <Button href="/family/track" size="lg" className="mt-6 w-full sm:w-auto">
                Track trip
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold">Recommended for Margaret</p>
              <h3 className="mt-2 font-serif text-3xl font-semibold">Botanical Garden Senior Walking Group</h3>
              <p className="mt-2 text-lg text-muted">
                {garden
                  ? `${garden.day} · ${garden.time} · ${garden.attendeeCount} seniors attending`
                  : "Saturday, Sep 19 · 1:00 PM · 8 seniors attending"}
              </p>
              <p className="mt-3 text-lg">
                Senior Bus #102 · Pickup 12:15 PM · Return 3:00 PM · 8 / 12 seats filled
              </p>
              <Button href="/family/activities/garden-walk" size="lg" className="mt-6">
                See activity
              </Button>
            </>
          )}
        </Card>
        <Card className="p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sage">Care Circle</p>
          <p className="mt-2 font-serif text-2xl font-semibold">Three people helping Margaret</p>
          <p className="mt-2 text-muted">Sarah, Michael, and Emily can book, pay, and follow trips.</p>
          <Link href="/family/circle" className="mt-6 inline-block font-semibold text-sage">
            Manage Care Circle
          </Link>
        </Card>
      </section>

      {garden && (
        <section className="mt-8">
          <h2 className="mb-3 font-serif text-2xl font-semibold">Worth a look</h2>
          <ActivityCard activity={garden} href="/family/activities/garden-walk" featured />
        </section>
      )}
    </main>
  );
}
