# EverGo

Hackathon prototype for a three-sided platform that helps seniors stay independent: **discover something to do, get there on a shared Senior Bus, and let family see they arrived safely.**

Transportation is the infrastructure. The product starts with *what do you want to do?* — not *where do you want to go?*

## The loop

Discover → book activity → reserve a Senior Bus seat → track the trip → **Margaret arrived safely** → the venue gained a customer.

## Users

| Role | Who in the demo | What they get |
| --- | --- | --- |
| Senior | Margaret Johnson, 72 | Simple home screen, next outing, large type |
| Family | Sarah Johnson, daughter | Book and track for Mom, notifications, Care Circle |
| Business | Botanical Garden | Visitors, transport bookings, publish activities |

Demo week is pinned to **Saturday, Sep 19**. Featured outing: **Senior Walking Group** at 1:00 PM, **Senior Bus #102** (pickup 12:15 PM, return 3:00 PM).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is taken, Next.js will pick another (this repo has been run on **3010**).

```bash
npm run build
npm start
```

## Demo (about four minutes)

1. If the garden trip is already booked, click **Reset**, then the EverGo logo so you land on **Who are you?**
2. Do **not** start with the big **Senior** button. Point at it (that’s Margaret’s entry), then click **Family member**.
3. On Sarah’s home, open **See activity** for the Botanical Garden walking group.
4. **Reserve seat** → **Confirm reservation**.
5. On Track, click **Play pickup** and let it run until **Margaret arrived safely.**
6. Open the **bell**, then switch to **Business** (header tabs).
7. Switch to **Senior** to show Margaret’s large-type view of the same trip.

Header **Jump to demo** skips to the garden activity. **Family / Senior / Business** tabs are for judges after you leave the home screen; they are hidden on the landing page so seniors don’t tap the wrong role.

## What’s real vs mocked

**In the prototype**

- Role picker (no login)
- Activity discovery and seeded catalog
- Booking Bus #102 for the garden walk (session + `localStorage`)
- Simulated trip statuses and family notifications
- Care Circle, parent profile, Plan the week (seeded recommendations)
- Business dashboard counters that bump after a booking
- Create activity (in-memory list)

**Not built (on purpose)**

- Auth, payments, GPS, SMS, driver onboarding, route optimization

Only the Botanical Garden walk has a full book → track path. Other activities are there to make discovery feel real.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) + TypeScript
- Tailwind CSS 4
- Client store in `lib/store.tsx`, seed data in `lib/seed.ts`

## Layout

```
app/
  page.tsx              # Who are you?
  family/               # Sarah
  senior/               # Margaret
  business/             # Botanical Garden
lib/                    # types, seed, store
components/             # chrome, cards, trip UI
```

## Pitch in one line

Seniors lose the outing because the trip is the hard part. EverGo makes the outing the starting point, the ride shared, and arrival visible to the people who care.
