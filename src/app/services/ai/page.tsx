import type { Metadata } from "next";
import { Workflow, BrainCircuit, FileSearch, Bot, Activity, ScanText, ShieldCheck, Eye, FlaskConical } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "AI & LLM Solutions",
  description:
    "Workflow automation, LLM integration, RAG pipelines, and copilot interfaces — engineered for measurable efficiency, not hype.",
  alternates: { canonical: "/services/ai" },
};

const capabilities = [
  { icon: Workflow, title: "Workflow Automation", description: "n8n, Make, and custom pipelines. Automate repetitive processes across your entire stack." },
  { icon: BrainCircuit, title: "LLM Integration", description: "OpenAI, Anthropic, open-source models. Structured outputs, function calling, streaming." },
  { icon: FileSearch, title: "RAG Pipelines", description: "Document Q&A, knowledge bases, semantic search. Your data, your models, zero hallucination tolerance." },
  { icon: Bot, title: "Copilot & Assistant UIs", description: "Embedded AI in existing products. Chat interfaces, inline suggestions, contextual help." },
  { icon: Activity, title: "Eval & Monitoring", description: "Evaluation frameworks, cost tracking, quality gates. Know when your AI drifts before users do." },
  { icon: ScanText, title: "Data Extraction", description: "Invoice processing, email routing, content tagging. Structured data from unstructured inputs." },
];

const trust = [
  { icon: ShieldCheck, title: "Data privacy by design", description: "On-prem options, PII redaction, EU-hosted inference. Your data never trains third-party models." },
  { icon: Eye, title: "Full observability", description: "Every prompt logged, every response scored. Cost dashboards and latency budgets from day one." },
  { icon: FlaskConical, title: "Automated eval pipelines", description: "Regression tests on every model swap. Catch quality drops before they reach production." },
];

const stack = [
  { category: "LLM Providers", techs: ["OpenAI", "Anthropic", "Mistral", "Ollama"] },
  { category: "Orchestration", techs: ["n8n", "LangChain", "LangGraph", "CrewAI"] },
  { category: "Vector & Search", techs: ["Pinecone", "Weaviate", "pgvector", "Elasticsearch"] },
  { category: "Evaluation", techs: ["LangSmith", "Braintrust", "Phoenix", "Custom"] },
];

export default function AiPage() {
  return (
    <>
      <Hero
        headline="AI that works, not AI that demos"
        subheadline="Workflow automation, LLM integration, and intelligent pipelines — built for production reliability, cost control, and measurable business impact."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See AI Work", href: "/work" }}
      />

      <section className="py-24 md:py-32">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">What we deliver</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <Card key={c.title} variant="default">
                <c.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-semibold text-neutral-50 mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-400">{c.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight leading-[1.1] mb-5">Tools we reach for</h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                We pick the right model for the job — not the most expensive one. Every integration includes fallback paths, cost controls, and evaluation from day zero.
              </p>
            </div>
            <div className="space-y-6">
              {stack.map((group) => (
                <div key={group.category}>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">Trust & governance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trust.map((s) => (
              <Card key={s.title} variant="default">
                <s.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-semibold text-neutral-50 mb-1">{s.title}</h3>
                <p className="text-sm text-neutral-400">{s.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner headline="Let's make your workflows intelligent." />
    </>
  );
}
