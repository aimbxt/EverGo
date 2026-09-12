"use client";

import { Card } from "@/components/ui/Card";
import { CARE_CIRCLE, SENIOR } from "@/lib/seed";
import { cn } from "@/lib/cn";

const TONE = {
  sage: "bg-leaf text-sage-deep",
  gold: "bg-gold-soft text-gold",
  sky: "bg-sky-soft text-sky",
};

export default function CareCirclePage() {
  return (
    <main>
      <h1 className="font-serif text-4xl font-semibold">{SENIOR.firstName}&apos;s Care Circle</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        Trusted people who can discover activities, book transportation, and follow trips.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {CARE_CIRCLE.map((person) => (
          <Card key={person.id} className="p-6">
            <span className={cn("grid size-14 place-items-center rounded-full font-serif text-xl font-semibold", TONE[person.tone])}>
              {person.initials}
            </span>
            <h2 className="mt-4 font-serif text-2xl font-semibold">{person.name}</h2>
            <p className="text-lg">{person.relationship}</p>
            <p className="text-muted">{person.city}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
