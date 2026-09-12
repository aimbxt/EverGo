export type Role = "senior" | "family" | "business";

export type TripStatus =
  | "scheduled"
  | "driver_arriving"
  | "picked_up"
  | "in_transit"
  | "arrived"
  | "returning"
  | "completed";

export type Category =
  | "fun"
  | "exercise"
  | "social"
  | "outdoors"
  | "shopping"
  | "healthcare"
  | "errands";

export type WeekTone = "sage" | "gold" | "sky";

export type WeekItemStatus = "completed" | "recommended" | "confirmed" | "today";

export interface Driver {
  name: string;
  years: number;
  vehicle: string;
  plate: string;
  photoInitials: string;
}

export interface Activity {
  id: string;
  name: string;
  summary: string;
  description: string;
  businessId: string;
  businessName: string;
  category: Category;
  day: string;
  time: string;
  location: string;
  neighborhood: string;
  price: string;
  seniorDiscount?: string;
  accessibility: string[];
  attendeeCount: number;
  spots: number;
  featured?: boolean;
  hasTransport: boolean;
  busId?: string;
}

export interface SeniorBus {
  id: string;
  number: string;
  activityId: string;
  destination: string;
  pickupTime: string;
  returnTime: string;
  capacity: number;
  booked: number;
  driver: Driver;
}

export interface Booking {
  id: string;
  activityId: string;
  busId?: string;
  seniorId: string;
  bookedBy: string;
  createdLabel: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timeLabel: string;
  unread: boolean;
}

export interface CareCircleMember {
  id: string;
  name: string;
  relationship: string;
  city: string;
  initials: string;
  tone: WeekTone;
}

export interface WeekItem {
  day: string;
  weekday: string;
  label: string;
  activityId: string;
  tone: WeekTone;
  status: WeekItemStatus;
}

export interface BusinessProfile {
  id: string;
  name: string;
  kind: string;
  visitorsThisWeek: number;
  transportBookings: number;
  repeatVisitorsPct: number;
}

export interface Trip {
  activityId: string;
  busId: string;
  status: TripStatus;
}

export interface AppState {
  role: Role;
  activities: Activity[];
  buses: SeniorBus[];
  bookings: Booking[];
  notifications: AppNotification[];
  week: WeekItem[];
  businesses: BusinessProfile[];
  trip: Trip | null;
  demoClock: string;
  toast: string | null;
}
