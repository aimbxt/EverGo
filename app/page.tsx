import Link from "next/link";
import { Card } from "@/components/ui/Card";

const ROLES = [
  {
    href: "/family",
    eyebrow: "Adult children",
    title: "Peace of mind from anywhere",
    body: "Find something for Mom. Book the Senior Bus. Watch her arrive safely.",
    cta: "Enter as Sarah",
  },
  {
    href: "/senior",
    eyebrow: "Seniors",
    title: "Your next outing, made simple",
    body: "Large type, one next activity, and a ride that shows up.",
    cta: "Enter as Margaret",
  },
  {
    href: "/business",
    eyebrow: "Businesses",
    title: "Welcome more senior visitors",
    body: "Publish an activity. EverGo brings the people — and the transportation.",
    cta: "Enter as Botanical Garden",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
          More places. More connections. More life.
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
          Help seniors keep going.
        </h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">
          EverGo connects seniors with things they want to do, a shared ride to get there, and
          a family who can see they arrived safely.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {ROLES.map((role) => (
          <Link key={role.href} href={role.href} className="block h-full">
            <Card className="flex h-full flex-col p-6 transition-transform hover:-translate-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-sage">{role.eyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold">{role.title}</h2>
              <p className="mt-3 flex-1 text-lg text-muted">{role.body}</p>
              <span className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-sage px-5 text-base font-semibold text-paper">
                {role.cta}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
