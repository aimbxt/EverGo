import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-3xl border border-line bg-paper p-5 shadow-[0_1px_0_rgba(27,36,25,0.04)]", className)}
      {...props}
    />
  );
}
