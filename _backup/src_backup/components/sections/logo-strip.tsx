import { Container } from "@/components/layout/container";

const placeholderLogos = [
  "TechCorp", "Finova", "GreenGrid", "DataFlow",
  "CloudPeak", "Nextera", "Synthetix", "Buildify",
];

export function LogoStrip() {
  return (
    <section className="py-10 border-b border-neutral-700/50">
      <Container>
        <p className="text-sm text-neutral-500 text-center mb-6">Trusted by</p>
      </Container>
      <div className="relative overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...placeholderLogos, ...placeholderLogos].map((name, i) => (
            <span
              key={i}
              className="text-neutral-500/40 hover:text-neutral-500/70 transition-opacity text-lg font-semibold tracking-wide select-none shrink-0"
              style={{ transitionDuration: "var(--duration-normal)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
