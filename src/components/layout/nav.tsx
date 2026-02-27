"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, Smartphone, Cloud, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/approach" },
  // { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

const serviceLinks = [
  { label: "Web Development", href: "/services/web", description: "Apps, platforms, headless commerce", icon: Globe },
  { label: "Mobile Development", href: "/services/mobile", description: "iOS, Android, cross-platform", icon: Smartphone },
  { label: "Cloud & Infrastructure", href: "/services/cloud", description: "AWS, GCP, DevOps, migration", icon: Cloud },
  { label: "AI & LLM Solutions", href: "/services/ai", description: "LLM, RAG, workflow automation", icon: BrainCircuit },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/services") return pathname.startsWith("/services");
    return pathname === href;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 transition-all",
          mobileOpen ? "z-[400]" : "z-[200]",
          scrolled ? "px-4 sm:px-6 lg:px-8" : "px-0"
        )}
        style={{ transitionDuration: "var(--duration-slow)" }}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between border transition-all",
            scrolled
              ? "mt-3 max-w-[1200px] h-14 px-6 rounded-full bg-neutral-950/70 backdrop-blur-xl border-neutral-700/40 shadow-lg shadow-black/20"
              : "mt-0 max-w-full h-16 px-8 lg:px-10 rounded-none bg-neutral-950/40 backdrop-blur-md border-transparent border-b-neutral-700/20"
          )}
          style={{ transitionDuration: "var(--duration-slow)" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-neutral-50 hover:text-accent-400 transition-colors"
            style={{ transitionDuration: "var(--duration-normal)" }}
          >
            Arinit
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasDropdown ? (
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors",
                      isActive(link.href) ? "text-accent-400" : "text-neutral-400 hover:text-neutral-50"
                    )}
                    style={{ transitionDuration: "var(--duration-normal)" }}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive(link.href) ? "text-accent-400" : "text-neutral-400 hover:text-neutral-50"
                    )}
                    style={{ transitionDuration: "var(--duration-normal)" }}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Services Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] glass rounded-xl p-4"
                        onMouseLeave={() => setServicesOpen(false)}
                        role="menu"
                      >
                        <div className="grid gap-1">
                          {serviceLinks.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-800"
                              role="menuitem"
                            >
                              <service.icon className="h-5 w-5 text-accent-400 mt-0.5 shrink-0" />
                              <div>
                                <div className="text-sm font-medium text-neutral-50">{service.label}</div>
                                <div className="text-xs text-neutral-500 mt-0.5">{service.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-neutral-700">
                          <Link
                            href="/services"
                            className="text-sm text-accent-400 hover:text-accent-300 transition-colors flex items-center gap-1 px-3 py-1.5"
                            role="menuitem"
                          >
                            View all services &rarr;
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center h-9 px-5 text-sm font-medium rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
              style={{ transitionDuration: "var(--duration-normal)" }}
            >
              Book a Call
            </Link>
            <button
              className="lg:hidden text-neutral-300 hover:text-neutral-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-neutral-950/80 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-8">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className={cn(
                            "flex items-center justify-between w-full text-3xl font-bold py-3 tracking-tight",
                            isActive(link.href) ? "text-accent-400" : "text-neutral-50"
                          )}
                          aria-expanded={servicesOpen}
                        >
                          {link.label}
                          <ChevronDown className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              {serviceLinks.map((service) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  className="block py-2 text-lg text-neutral-400 hover:text-neutral-100"
                                >
                                  {service.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "block text-3xl font-bold py-3 tracking-tight",
                          isActive(link.href) ? "text-accent-400" : "text-neutral-50"
                        )}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-14 w-full rounded-full bg-accent-500 text-white text-lg font-semibold hover:bg-accent-600 transition-colors"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
