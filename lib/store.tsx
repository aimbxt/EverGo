"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createInitialState,
  FAMILY,
  SENIOR,
  TRIP_COPY,
  TRIP_ORDER,
} from "./seed";
import type {
  Activity,
  AppState,
  Role,
  TripStatus,
} from "./types";

const STORAGE_KEY = "evergo-demo-v1";

type Store = AppState & {
  hydrated: boolean;
  setRole: (role: Role) => void;
  dismissToast: () => void;
  bookGardenTrip: () => boolean;
  advanceTrip: () => void;
  playTripToArrived: () => void;
  stopPlayback: () => void;
  markNotificationsRead: () => void;
  createActivity: (input: {
    name: string;
    description: string;
    category: Activity["category"];
    day: string;
    time: string;
    location: string;
    price: string;
    spots: number;
    hasTransport: boolean;
  }) => void;
  resetDemo: () => void;
  isGardenBooked: boolean;
  unreadCount: number;
};

const StoreContext = createContext<Store | null>(null);

function persist(state: AppState) {
  try {
    const { toast, ...rest } = state;
    void toast;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch {
    /* ignore quota */
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const playback = useRef<number | null>(null);

  const stopPlayback = useCallback(() => {
    if (playback.current) {
      window.clearInterval(playback.current);
      playback.current = null;
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as AppState;
        setState({ ...createInitialState(), ...saved, toast: null });
      }
    } catch {
      /* keep seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!state.toast) return;
    const timer = window.setTimeout(() => {
      setState((prev) => ({ ...prev, toast: null }));
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [state.toast]);

  useEffect(() => {
    if (hydrated) persist(state);
  }, [state, hydrated]);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  const setRole = useCallback((role: Role) => {
    setState((prev) => ({ ...prev, role }));
  }, []);

  const dismissToast = useCallback(() => {
    setState((prev) => ({ ...prev, toast: null }));
  }, []);

  const bookGardenTrip = useCallback(() => {
    let booked = false;
    setState((prev) => {
      if (prev.bookings.some((b) => b.activityId === "garden-walk")) {
        return prev;
      }
      booked = true;
      return {
        ...prev,
        activities: prev.activities.map((activity) =>
          activity.id === "garden-walk"
            ? { ...activity, attendeeCount: activity.attendeeCount + 1 }
            : activity,
        ),
        buses: prev.buses.map((bus) =>
          bus.id === "bus-102" ? { ...bus, booked: bus.booked + 1 } : bus,
        ),
        businesses: prev.businesses.map((biz) =>
          biz.id === "botanical-garden"
            ? {
                ...biz,
                visitorsThisWeek: biz.visitorsThisWeek + 1,
                transportBookings: biz.transportBookings + 1,
              }
            : biz,
        ),
        bookings: [
          {
            id: "b-garden",
            activityId: "garden-walk",
            busId: "bus-102",
            seniorId: SENIOR.id,
            bookedBy: FAMILY.name,
            createdLabel: "Just now",
          },
          ...prev.bookings,
        ],
        week: prev.week.map((item) =>
          item.activityId === "garden-walk"
            ? { ...item, status: "today" }
            : item,
        ),
        trip: {
          activityId: "garden-walk",
          busId: "bus-102",
          status: "scheduled",
        },
        demoClock: TRIP_COPY.scheduled.clock,
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Seat reserved on Senior Bus #102",
            body: "Margaret is booked for the Botanical Garden walking group. Pickup 12:15 PM.",
            timeLabel: "Just now",
            unread: true,
          },
          ...prev.notifications,
        ],
        toast: "Seat reserved for Margaret",
      };
    });
    return booked;
  }, []);

  const advanceTrip = useCallback(() => {
    setState((prev) => {
      if (!prev.trip) return prev;
      const index = TRIP_ORDER.indexOf(prev.trip.status);
      if (index < 0 || index >= TRIP_ORDER.length - 1) return prev;
      const nextStatus = TRIP_ORDER[index + 1] as TripStatus;
      const copy = TRIP_COPY[nextStatus];
      return {
        ...prev,
        trip: { ...prev.trip, status: nextStatus },
        demoClock: copy.clock,
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: copy.title,
            body: copy.body,
            timeLabel: "Just now",
            unread: true,
          },
          ...prev.notifications,
        ],
        toast: copy.title,
      };
    });
  }, []);

  const playTripToArrived = useCallback(() => {
    stopPlayback();
    setState((prev) => {
      if (!prev.trip) return prev;
      if (prev.trip.status === "scheduled") {
        const copy = TRIP_COPY.driver_arriving;
        return {
          ...prev,
          trip: { ...prev.trip, status: "driver_arriving" },
          demoClock: copy.clock,
          notifications: [
            {
              id: `n-${Date.now()}`,
              title: copy.title,
              body: copy.body,
              timeLabel: "Just now",
              unread: true,
            },
            ...prev.notifications,
          ],
          toast: copy.title,
        };
      }
      return prev;
    });
    playback.current = window.setInterval(() => {
      setState((prev) => {
        if (!prev.trip) return prev;
        const arrivedIndex = TRIP_ORDER.indexOf("arrived");
        const index = TRIP_ORDER.indexOf(prev.trip.status);
        if (index >= arrivedIndex) {
          stopPlayback();
          return prev;
        }
        const nextStatus = TRIP_ORDER[index + 1] as TripStatus;
        const copy = TRIP_COPY[nextStatus];
        if (nextStatus === "arrived") stopPlayback();
        return {
          ...prev,
          trip: { ...prev.trip, status: nextStatus },
          demoClock: copy.clock,
          notifications: [
            {
              id: `n-${Date.now()}`,
              title: copy.title,
              body: copy.body,
              timeLabel: "Just now",
              unread: true,
            },
            ...prev.notifications,
          ],
          toast: copy.title,
        };
      });
    }, 1800);
  }, [stopPlayback]);

  const markNotificationsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, unread: false })),
    }));
  }, []);

  const createActivity = useCallback<Store["createActivity"]>((input) => {
    const id = `custom-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      activities: [
        {
          id,
          name: input.name,
          summary: input.description.slice(0, 90),
          description: input.description,
          businessId: "botanical-garden",
          businessName: "Botanical Garden",
          category: input.category,
          day: input.day,
          time: input.time,
          location: input.location,
          neighborhood: "Botanical Garden",
          price: input.price,
          accessibility: ["Paved paths"],
          attendeeCount: 0,
          spots: input.spots,
          hasTransport: input.hasTransport,
          busId: input.hasTransport ? "bus-102" : undefined,
        },
        ...prev.activities,
      ],
      toast: "Activity published",
    }));
  }, []);

  const resetDemo = useCallback(() => {
    stopPlayback();
    const next = createInitialState();
    setState(next);
    persist(next);
  }, [stopPlayback]);

  const value = useMemo<Store>(() => {
    const isGardenBooked = state.bookings.some((b) => b.activityId === "garden-walk");
    const unreadCount = state.notifications.filter((n) => n.unread).length;
    return {
      ...state,
      hydrated,
      setRole,
      dismissToast,
      bookGardenTrip,
      advanceTrip,
      playTripToArrived,
      stopPlayback,
      markNotificationsRead,
      createActivity,
      resetDemo,
      isGardenBooked,
      unreadCount,
    };
  }, [
    state,
    hydrated,
    setRole,
    dismissToast,
    bookGardenTrip,
    advanceTrip,
    playTripToArrived,
    stopPlayback,
    markNotificationsRead,
    createActivity,
    resetDemo,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
