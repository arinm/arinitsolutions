import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-800 text-neutral-300",
  accent: "bg-accent-700/20 text-accent-300",
  success: "bg-emerald-500/15 text-success",
  warning: "bg-amber-500/15 text-warning",
};

export function Badge({ variant = "default", size = "sm", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
