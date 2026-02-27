import type { Metadata } from "next";
import { Cloud, ArrowRightLeft, GitBranch, Container as ContainerIcon, Activity, DollarSign, Lock, Network, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Cloud & Infrastructure",
  description: "Architecture, migration, and DevOps on AWS and GCP. Observable, cost-aware, and built for operational maturity.",
};

const capabilities = [
  { icon: Cloud, title: "Cloud Architecture", description: "Right-sized infrastructure design. No over-provisioning." },
  { icon: ArrowRightLeft, title: "Migration", description: "Lift-and-shift, re-platform, or re-architect. We assess, then move." },
  { icon: GitBranch, title: "DevOps & CI/CD", description: "Terraform, GitHub Actions, ArgoCD. Infrastructure as code, always." },
  { icon: ContainerIcon, title: "Kubernetes Operations", description: "Cluster setup, Helm charts, autoscaling, cost optimization." },
  { icon: Activity, title: "Observability", description: "Datadog, Grafana, custom dashboards. Know before your users do." },
  { icon: DollarSign, title: "Cost Optimization", description: "FinOps reviews. We've saved clients 40%+ on monthly cloud spend." },
];

const security = [
  { icon: Lock, title: "Secrets management", description: "Vault, AWS Secrets Manager. No .env files in prod." },
  { icon: Network, title: "Network isolation", description: "VPC design, private subnets, WAF, DDoS mitigation." },
  { icon: ShieldCheck, title: "Compliance readiness", description: "SOC 2, GDPR-aware architectures. Audit trails built in." },
];

const stack = [
  { category: "AWS", techs: ["ECS", "EKS", "Lambda", "RDS", "S3", "CloudFront"] },
  { category: "GCP", techs: ["Cloud Run", "GKE", "BigQuery"] },
  { category: "Tooling", techs: ["Terraform", "Pulumi", "Docker", "Kubernetes", "Helm"] },
  { category: "Observability", techs: ["Datadog", "Grafana", "PagerDuty", "Sentry"] },
];

export default function CloudPage() {
  return (
    <>
      <Hero
        headline="Infrastructure that scales without drama"
        subheadline="Architecture, migration, and DevOps on AWS and GCP. Observable, cost-aware, and built so your on-call engineers can sleep."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Cloud Work", href: "/work" }}
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
                We default to AWS unless you have existing GCP infrastructure. Every resource is Terraform-managed. No click-ops, ever.
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
          <h2 className="text-2xl font-bold text-neutral-50 tracking-tight text-center mb-10">Security by default</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {security.map((s) => (
              <Card key={s.title} variant="default">
                <s.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-medium text-neutral-50 mb-1">{s.title}</h3>
                <p className="text-sm text-neutral-300">{s.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner headline="Let's make your infrastructure boring — in the best way." />
    </>
  );
}
