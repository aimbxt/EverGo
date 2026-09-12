"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

const DEFAULT_PROMPT =
  "My mom likes gardening, walking, museums, and meeting people.";

export default function PlanPage() {
  const { activities } = useStore();
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [planned, setPlanned] = useState(false);

  const week = useMemo(() => {
    const ids = ["community-garden", "senior-yoga", "museum-tour", "garden-walk"];
    return ids
      .map((id) => activities.find((item) => item.id === id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [activities]);

  return (
    <main className="max-w-3xl">
      <h1 className="font-serif text-4xl font-semibold">Plan Margaret&apos;s week</h1>
      <p className="mt-2 text-lg text-muted">
        Tell EverGo what she likes. This prototype maps the note to a seeded week — in production it
        would weigh location, budget, and accessibility.
      </p>
      <Card className="mt-6">
        <label htmlFor="prompt" className="font-semibold">
          What does she enjoy?
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="mt-2 min-h-28 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-lg"
        />
        <Button size="lg" className="mt-4" onClick={() => setPlanned(true)}>
          Plan the week
        </Button>
      </Card>
      {planned && (
        <section className="mt-8">
          <h2 className="font-serif text-3xl font-semibold">Margaret&apos;s week</h2>
          <div className="mt-4 grid gap-4">
            {week.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                href={`/family/activities/${activity.id}`}
                featured={activity.id === "garden-walk"}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
