import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "glass" | "interactive" | "bento";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-neutral-900 border border-neutral-700",
  elevated: "bg-neutral-850 border border-neutral-700/50",
  glass: "glass",
  interactive:
    "bg-neutral-900 border border-neutral-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:border-accent-500/30 transition-all cursor-pointer",
  bento: "bg-neutral-800 border border-neutral-700",
};

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  className,
  as: Component = "div",
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      style={{ transitionDuration: "var(--duration-normal)" }}
      {...props}
    >
      {children}
    </Component>
  );
}
