import type { Metadata } from "next";
import { Smartphone, TabletSmartphone, Apple, Bot, Wifi, Bell, MonitorSmartphone, ShieldCheck, Bug } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Mobile Development",
  description: "iOS, Android, and cross-platform apps — built for offline resilience, smooth animations, and real user retention.",
};

const capabilities = [
  { icon: TabletSmartphone, title: "Cross-Platform (React Native)", description: "One codebase, two platforms, native performance." },
  { icon: Apple, title: "Native iOS (Swift)", description: "For apps that demand platform-specific depth." },
  { icon: Bot, title: "Native Android (Kotlin)", description: "Material Design 3, Jetpack Compose, background processing." },
  { icon: Wifi, title: "Offline-First Architecture", description: "Local-first data sync. Works in tunnels, planes, and elevators." },
  { icon: Bell, title: "Push & Real-Time", description: "Notifications, live updates, WebSocket channels." },
  { icon: MonitorSmartphone, title: "App Store Optimization", description: "Metadata, screenshots, review strategy. Ship and rank." },
];

const quality = [
  { icon: Smartphone, title: "Device testing matrix", description: "12+ real devices per release. No emulator-only QA." },
  { icon: ShieldCheck, title: "OTA updates", description: "Critical fixes without App Store review cycles." },
  { icon: Bug, title: "Crash monitoring", description: "Sentry + custom alerting. < 0.1% crash-free rate target." },
];

const stack = [
  { category: "Cross-Platform", techs: ["React Native", "Expo"] },
  { category: "Native", techs: ["Swift", "Kotlin", "Jetpack Compose"] },
  { category: "Backend", techs: ["Firebase", "Supabase", "RevenueCat"] },
];

export default function MobilePage() {
  return (
    <>
      <Hero
        headline="Apps that feel native because they are"
        subheadline="iOS, Android, and cross-platform — built for offline resilience, smooth animations, and real user retention."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Mobile Work", href: "/work" }}
      />

      <section className="py-16 md:py-20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight text-center mb-10">What we deliver</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <Card key={c.title} variant="default">
                <c.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-medium text-neutral-50 mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-300">{c.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-t border-neutral-700/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-neutral-50 tracking-tight mb-4">Tools we reach for</h2>
              <p className="text-neutral-300 leading-relaxed">
                We default to React Native for speed and code sharing. We go native when the UX demands it — AR, complex gestures, heavy background processing.
              </p>
            </div>
            <div className="space-y-6">
              {stack.map((group) => (
                <div key={group.category}>
                  <p className="text-sm text-neutral-500 mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-t border-neutral-700/50">
        <Container>
          <h2 className="text-2xl font-bold text-neutral-50 tracking-tight text-center mb-10">How we keep quality high</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quality.map((q) => (
              <Card key={q.title} variant="default">
                <q.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-medium text-neutral-50 mb-1">{q.title}</h3>
                <p className="text-sm text-neutral-300">{q.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner headline="Let's ship your next app." />
    </>
  );
}
