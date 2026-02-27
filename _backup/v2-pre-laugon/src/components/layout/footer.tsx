import Link from "next/link";
import { Container } from "./container";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services/web" },
      { label: "Mobile Development", href: "/services/mobile" },
      { label: "Cloud & Infrastructure", href: "/services/cloud" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Approach", href: "/approach" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "X / Twitter", href: "https://x.com", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-700 bg-neutral-950" role="contentinfo">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="text-lg font-semibold text-neutral-50">
              Arinit
            </Link>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              Build sharp. Scale calm.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-neutral-50 mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                        style={{ transitionDuration: "var(--duration-normal)" }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                        style={{ transitionDuration: "var(--duration-normal)" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Arinit Solutions SRL. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Cookies
            </Link>
            <Link href="/legal/ai-use" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              AI Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
