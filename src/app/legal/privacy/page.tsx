import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Arinit Solutions handles your personal data.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-[720px]">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-50 tracking-tight leading-[1] mb-3">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 mb-12">Last updated: February 2026</p>

        <div className="space-y-8 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-neutral-50 [&>h2]:mt-12 [&>h2]:mb-3 [&>p]:text-neutral-400 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul>li]:text-neutral-400 [&>ul>li]:pl-4 [&>ul>li]:relative [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-accent-400">
          <h2>Who we are</h2>
          <p>Arinit Solutions SRL is an IT services company registered in Romania. We operate the website arinitsolutions.com.</p>

          <h2>What data we collect</h2>
          <ul>
            <li>Contact form submissions: name, email, company, project details</li>
            <li>Analytics: anonymized usage data via privacy-first analytics</li>
            <li>Cookies: essential cookies only, unless you opt in to analytics</li>
          </ul>

          <h2>Why we collect it</h2>
          <p>We collect data to respond to your inquiries (contractual basis), improve our website (legitimate interest), and send communications you&apos;ve opted into (consent).</p>

          <h2>How we use your data</h2>
          <p>Your data is used solely to respond to your inquiry, scope potential projects, and improve our website experience. We never sell your data.</p>

          <h2>Who we share it with</h2>
          <p>We use the following processors: hosting provider (Vercel), email service (for form notifications), and privacy-first analytics. No data is shared with third parties for marketing.</p>

          <h2>How long we keep it</h2>
          <p>Contact form submissions are retained for 24 months. Analytics data is aggregated and anonymized. You can request deletion at any time.</p>

          <h2>Your rights</h2>
          <p>Under GDPR, you have the right to access, rectify, delete, port, and object to processing of your personal data. Contact us at arin@arinitsolutions.com to exercise these rights.</p>

          <h2>Contact</h2>
          <p>For privacy-related questions, contact us at arin@arinitsolutions.com.</p>

          <h2>Changes</h2>
          <p>We may update this policy. Changes will be reflected by the &quot;Last updated&quot; date above.</p>
        </div>
      </Container>
    </section>
  );
}
