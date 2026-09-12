"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, RotateCcw, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { RoleSwitcher, roleFromPath } from "./RoleSwitcher";
import { Button } from "./ui/Button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { demoClock, unreadCount, toast, dismissToast, resetDemo, role, setRole } =
    useStore();
  const isLanding = pathname === "/";
  const view = roleFromPath(pathname) ?? role;

  useEffect(() => {
    const next = roleFromPath(pathname);
    if (next && next !== role) setRole(next);
  }, [pathname, role, setRole]);

  return (
    <div className={cn("min-h-full", view === "senior" && "senior-ui")}>
      <header className="sticky top-0 z-30 border-b border-line/80 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Logo />
          <p className="hidden text-sm font-medium text-muted sm:block">{demoClock}</p>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {!isLanding && (
              <>
                <button
                  type="button"
                  className="hidden min-h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-sage hover:bg-leaf md:inline-flex"
                  onClick={() => {
                    setRole("family");
                    router.push("/family/activities/garden-walk");
                  }}
                >
                  <Sparkles className="size-4" />
                  Jump to demo
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-sm font-medium text-muted hover:bg-paper"
                  onClick={() => {
                    resetDemo();
                    router.push("/");
                  }}
                >
                  <RotateCcw className="size-4" />
                  Reset
                </button>
                {view === "family" && (
                  <Link
                    href="/family/notifications"
                    className="relative grid size-11 place-items-center rounded-full border border-line bg-paper"
                    aria-label="Notifications"
                  >
                    <Bell className="size-5" />
                    {unreadCount > 0 && (
                      <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-clay text-[11px] font-bold text-paper">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                )}
              </>
            )}
            <RoleSwitcher />
          </div>
        </div>
      </header>

      <div>{children}</div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-40 w-[min(92vw,28rem)] -translate-x-1/2">
          <div className="flex items-start justify-between gap-3 rounded-2xl bg-sage-deep px-4 py-3 text-paper shadow-lg">
            <p className="font-semibold">{toast}</p>
            <Button variant="ghost" size="md" className="min-h-9 border-0 bg-white/10 px-3 text-paper" onClick={dismissToast}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
