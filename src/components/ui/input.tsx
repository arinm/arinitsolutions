import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm text-neutral-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-12 w-full rounded-md bg-neutral-800 border px-4 text-base text-neutral-100 placeholder:text-neutral-500 transition-all focus:outline-none focus:ring-[3px]",
            error
              ? "border-error focus:border-error focus:ring-error/15"
              : "border-neutral-700 focus:border-accent-500 focus:ring-accent-500/15",
            className
          )}
          style={{ transitionDuration: "var(--duration-normal)" }}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
