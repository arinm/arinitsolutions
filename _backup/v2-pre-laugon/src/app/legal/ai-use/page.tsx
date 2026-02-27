import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "AI Use Policy",
  description: "How Arinit Solutions uses AI tools in our work and on this website.",
};

export default function AiUsePage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-[720px]">
        <h1 className="text-3xl font-bold text-neutral-50 tracking-tight mb-2">AI Use Policy</h1>
        <p className="text-sm text-neutral-500 mb-10">Last updated: February 2026</p>

        <div className="space-y-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-neutral-50 [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:text-neutral-300 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul>li]:text-neutral-300 [&>ul>li]:pl-4 [&>ul>li]:relative [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-accent-400">
          <h2>Our commitment</h2>
          <p>We believe in transparency about how AI tools are used in our work. This page outlines our practices.</p>

          <h2>AI in our engineering work</h2>
          <p>We use AI-assisted development tools (code completion, code review assistance) to improve productivity. All AI-generated code is reviewed by senior engineers before it enters any codebase. We never ship unreviewed AI output.</p>

          <h2>AI in content creation</h2>
          <p>Some content on this website may be drafted with AI assistance. All published content is reviewed, edited, and approved by our team for accuracy and alignment with our voice.</p>

          <h2>AI in client projects</h2>
          <p>When we build AI/LLM features for clients, we follow responsible AI practices:</p>
          <ul>
            <li>Clear labeling of AI-generated content in end-user interfaces</li>
            <li>Evaluation frameworks to measure quality and detect hallucinations</li>
            <li>Human-in-the-loop for high-stakes decisions</li>
            <li>Data privacy — client data is never used to train third-party models</li>
          </ul>

          <h2>Your data and AI</h2>
          <p>Your contact form submissions and project details are never fed to AI models for training purposes. We process your data only as described in our privacy policy.</p>

          <h2>Questions</h2>
          <p>Have questions about our AI practices? Reach out at hello@arinitsolutions.com.</p>
        </div>
      </Container>
    </section>
  );
}
