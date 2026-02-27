import { Container } from "@/components/layout/container";

const industries = [
  "FinTech",
  "E-Commerce",
  "HealthTech",
  "SaaS",
  "Logistics",
  "Real Estate",
  "EdTech",
  "Energy",
];

export function LogoStrip() {
  return (
    <section className="py-12 border-b border-neutral-700/30">
      <Container>
        <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">
          Industries we&apos;ve shipped in
        </p>
      </Container>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="flex items-center gap-16 animate-marquee logo-strip-track whitespace-nowrap">
          {[...industries, ...industries].map((name, i) => (
            <span
              key={i}
              className="text-neutral-500/30 hover:text-accent-400/70 transition-all duration-300 text-lg font-semibold tracking-wide select-none shrink-0 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
