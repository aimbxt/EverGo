"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/seed";
import { useStore } from "@/lib/store";
import type { Category } from "@/lib/types";

export default function CreateActivityPage() {
  const router = useRouter();
  const { createActivity } = useStore();
  const [name, setName] = useState("Twilight Conservatory Stroll");
  const [description, setDescription] = useState(
    "A slower evening walk through the glasshouse with tea at the end.",
  );
  const [category, setCategory] = useState<Category>("outdoors");
  const [day, setDay] = useState("Sunday");
  const [time, setTime] = useState("4:00 PM");
  const [location, setLocation] = useState("Botanical Garden, Conservatory");
  const [price, setPrice] = useState("Free with garden admission");
  const [spots, setSpots] = useState(16);
  const [hasTransport, setHasTransport] = useState(true);

  return (
    <main className="max-w-2xl">
      <h1 className="font-serif text-4xl font-semibold">Create an activity</h1>
      <p className="mt-2 text-lg text-muted">Published activities appear in family and senior discovery.</p>
      <Card className="mt-6 space-y-4">
        <Field label="Name" id="name">
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Description" id="description">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} min-h-24`}
          />
        </Field>
        <Field label="Category" id="category">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={inputClass}
          >
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Day" id="day">
            <input id="day" value={day} onChange={(e) => setDay(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Time" id="time">
            <input id="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
          </Field>
        </div>
        <Field label="Location" id="location">
          <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Price" id="price">
          <input id="price" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Spots" id="spots">
          <input
            id="spots"
            type="number"
            min={1}
            value={spots}
            onChange={(e) => setSpots(Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <label className="flex min-h-12 items-center gap-3 text-lg">
          <input
            type="checkbox"
            checked={hasTransport}
            onChange={(e) => setHasTransport(e.target.checked)}
            className="size-5"
          />
          Transportation available
        </label>
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            createActivity({
              name,
              description,
              category,
              day,
              time,
              location,
              price,
              spots,
              hasTransport,
            });
            router.push("/business/activities");
          }}
        >
          Publish activity
        </Button>
      </Card>
    </main>
  );
}

const inputClass =
  "mt-1 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-lg";

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}
