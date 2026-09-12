"use client";

import { Card } from "@/components/ui/Card";
import { SENIOR } from "@/lib/seed";

export default function ParentPage() {
  return (
    <main className="max-w-2xl">
      <h1 className="font-serif text-4xl font-semibold">{SENIOR.name}</h1>
      <p className="mt-2 text-lg text-muted">
        Age {SENIOR.age} · {SENIOR.neighborhood}
      </p>
      <Card className="mt-6">
        <h2 className="font-serif text-2xl font-semibold">Interests</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SENIOR.interests.map((item) => (
            <li key={item} className="rounded-full bg-leaf px-3 py-1 font-semibold text-sage-deep">
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="mt-4">
        <h2 className="font-serif text-2xl font-semibold">Getting around</h2>
        <ul className="mt-3 space-y-2 text-lg">
          {SENIOR.accessibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
      <Card className="mt-4">
        <h2 className="font-serif text-2xl font-semibold">Emergency contact</h2>
        <p className="mt-2 text-lg">{SENIOR.emergencyContact}</p>
      </Card>
    </main>
  );
}
