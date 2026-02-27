import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Arinit Solutions uses cookies on this website.",
};

export default function CookiesPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-[720px]">
        <h1 className="text-3xl font-bold text-neutral-50 tracking-tight mb-2">Cookie Policy</h1>
        <p className="text-sm text-neutral-500 mb-10">Last updated: February 2026</p>

        <div className="space-y-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-neutral-50 [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:text-neutral-300 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul>li]:text-neutral-300 [&>ul>li]:pl-4 [&>ul>li]:relative [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-accent-400">
          <h2>What are cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the site function and can provide usage analytics.</p>

          <h2>How we use cookies</h2>
          <p>We use a minimal number of cookies, limited to what&apos;s necessary for the site to function and to understand aggregate traffic patterns.</p>

          <h2>Types of cookies we use</h2>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the website to function (e.g., cookie consent preference). Always active.</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use the site. Only activated with your consent.</li>
          </ul>

          <h2>Third-party cookies</h2>
          <p>We do not use third-party advertising cookies. If we embed a calendar booking widget, it may set its own cookies as described in its privacy policy.</p>

          <h2>How to manage cookies</h2>
          <p>You can manage cookies through your browser settings. You can also update your preferences using the cookie banner that appears on your first visit.</p>

          <h2>Contact</h2>
          <p>Questions about cookies? Contact us at hello@arinitsolutions.com.</p>
        </div>
      </Container>
    </section>
  );
}
