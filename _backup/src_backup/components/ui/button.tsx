import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-white hover:bg-accent-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] focus-visible:outline-accent-400",
  secondary:
    "border border-neutral-700 text-neutral-100 hover:bg-neutral-800 focus-visible:outline-accent-400",
  ghost:
    "text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 focus-visible:outline-accent-400",
  danger:
    "bg-error text-white hover:bg-red-500 focus-visible:outline-error",
  link:
    "text-accent-400 hover:text-accent-300 underline-offset-4 hover:underline p-0 h-auto focus-visible:outline-accent-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-md gap-2",
  lg: "h-12 px-6 text-base rounded-md gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        style={{ transitionDuration: "var(--duration-normal)" }}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
