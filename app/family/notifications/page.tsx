"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export default function NotificationsPage() {
  const { notifications, markNotificationsRead } = useStore();

  useEffect(() => {
    markNotificationsRead();
  }, [markNotificationsRead]);

  return (
    <main>
      <h1 className="font-serif text-4xl font-semibold">Notifications</h1>
      <p className="mt-2 text-lg text-muted">Pickup, arrival, and activity reminders for Margaret.</p>
      <ul className="mt-6 space-y-3">
        {notifications.map((item) => (
          <li key={item.id}>
            <Card className={cn(item.unread && "border-sage/40")}>
              <p className="text-sm font-semibold text-muted">{item.timeLabel}</p>
              <p className="mt-1 text-xl font-semibold">{item.title}</p>
              <p className="mt-1 text-muted">{item.body}</p>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
