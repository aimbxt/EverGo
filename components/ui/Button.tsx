import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "lg" | "xl";

function buttonClass(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    size === "md" && "min-h-12 px-5 text-base",
    size === "lg" && "min-h-14 px-6 text-lg",
    size === "xl" && "min-h-16 px-8 text-xl",
    variant === "primary" && "bg-sage text-paper hover:bg-sage-deep",
    variant === "secondary" && "bg-leaf text-sage-deep hover:bg-[#cfdcbc]",
    variant === "ghost" && "border border-line bg-paper text-ink hover:bg-leaf/60",
    variant === "danger" && "bg-clay text-paper hover:bg-[#9a401c]",
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  href?: string;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  href,
  ...props
}: ButtonProps) {
  const cls = buttonClass(variant, size, className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {props.children}
      </Link>
    );
  }
  return <button type={type} className={cls} {...props} />;
}
