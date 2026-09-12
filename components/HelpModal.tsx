"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { CARE_CIRCLE } from "@/lib/seed";

export function HelpModal({ large = false, label = "Help" }: { large?: boolean; label?: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <>
      <Button variant="danger" size={large ? "xl" : "lg"} className="w-full" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="font-serif text-3xl font-semibold">Need a hand?</h2>
            {sent ? (
              <p className="mt-3 text-lg text-muted">
                Sarah, Michael, and Emily have been notified. This is a prototype — no real dispatch.
              </p>
            ) : (
              <p className="mt-3 text-lg text-muted">
                Alert Margaret&apos;s Care Circle. In a full product this would also reach EverGo support.
              </p>
            )}
            <ul className="mt-4 space-y-2 text-base">
              {CARE_CIRCLE.map((person) => (
                <li key={person.id} className="rounded-2xl bg-cream px-3 py-2">
                  {person.name} · {person.relationship}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              {!sent && (
                <Button size="lg" onClick={() => setSent(true)}>
                  Notify Care Circle
                </Button>
              )}
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  setOpen(false);
                  setSent(false);
                }}
              >
                I&apos;m okay
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
