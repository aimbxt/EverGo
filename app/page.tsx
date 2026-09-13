import Link from "next/link";

export default function HomePage() {
  return (
    <main className="senior-ui flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <span
          className="grid size-20 place-items-center rounded-[1.75rem] bg-sage text-paper shadow-[0_8px_24px_rgba(47,93,58,0.18)]"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="size-11" fill="none">
            <path
              d="M4 16c4-9 12-9 16 0"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="8" r="2.2" fill="currentColor" />
          </svg>
        </span>

        <h1 className="mt-8 font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
          Ever<span className="text-sage">Go</span>
        </h1>
        <p className="mt-4 max-w-md text-xl leading-relaxed text-muted sm:text-2xl">
          Help seniors keep going.
          <br />
          Activities, a shared ride, and family along the way.
        </p>

        <div className="mt-10 w-full rounded-[2rem] border border-line bg-paper p-5 shadow-[0_1px_0_rgba(27,36,25,0.04)] sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Who are you?</p>

          <Link
            href="/senior"
            className="mt-5 flex min-h-40 w-full flex-col items-center justify-center rounded-[1.6rem] bg-sage px-6 py-8 text-paper transition-colors hover:bg-sage-deep focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">I am a</span>
            <span className="mt-1 font-serif text-5xl font-semibold leading-none sm:text-6xl">Senior</span>
          </Link>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <Link
              href="/family"
              className="flex min-h-24 flex-col items-center justify-center rounded-[1.4rem] border-2 border-line bg-cream px-3 py-4 text-ink transition-colors hover:border-sage/40 hover:bg-leaf/50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">I am a</span>
              <span className="mt-1 font-serif text-2xl font-semibold leading-tight sm:text-[1.7rem]">
                Family
                <br />
                member
              </span>
            </Link>
            <Link
              href="/business"
              className="flex min-h-24 flex-col items-center justify-center rounded-[1.4rem] border-2 border-line bg-cream px-3 py-4 text-ink transition-colors hover:border-sage/40 hover:bg-leaf/50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">I am a</span>
              <span className="mt-1 font-serif text-2xl font-semibold leading-tight sm:text-[1.7rem]">
                Business
              </span>
            </Link>
          </div>
        </div>

        <p className="mt-8 text-lg text-muted">
          Questions? Call us at{" "}
          <a href="tel:1800383746" className="font-semibold text-ink">
            1-800-EVER-GO
          </a>
        </p>
        <p className="mt-1 text-base text-muted">Mon–Sat · 7:00 AM – 7:00 PM</p>
      </div>
    </main>
  );
}
