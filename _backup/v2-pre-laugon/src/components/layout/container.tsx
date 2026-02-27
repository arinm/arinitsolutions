import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-10", className)}
    >
      {children}
    </Component>
  );
}
