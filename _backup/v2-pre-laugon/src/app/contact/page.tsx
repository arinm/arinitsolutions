"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";

const serviceOptions = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "cloud", label: "Cloud & Infrastructure" },
  { value: "not-sure", label: "Not sure yet" },
];

const budgetOptions = [
  { value: "under-10k", label: "Under €10,000" },
  { value: "10k-25k", label: "€10,000 – €25,000" },
  { value: "25k-50k", label: "€25,000 – €50,000" },
  { value: "50k-plus", label: "€50,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const referralOptions = [
  { value: "referral", label: "Referral" },
  { value: "google", label: "Google" },
  { value: "social", label: "Social Media" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formTimestamp] = useState(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { website: "", _timestamp: formTimestamp },
  });

  async function onSubmit(data: ContactFormData) {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _timestamp: formTimestamp }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight mb-4">
              Let&apos;s talk about your project
            </h1>
            <p className="text-neutral-300 max-w-md mx-auto">
              Book a 30-minute call or send us a brief. We respond within 24 hours on business days.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Calendar placeholder */}
            <Card variant="elevated" className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-50 mb-2">Book a Call</h2>
                <p className="text-sm text-neutral-300 mb-6 max-w-xs">
                  A quick 30-minute conversation to understand your goals and see if we&apos;re a fit.
                </p>
                <p className="text-xs text-neutral-500">
                  Calendar integration available on production deployment.
                </p>
              </div>
            </Card>

            {/* Contact form */}
            <Card variant="elevated">
              {submitted ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <CheckCircle className="h-12 w-12 text-success mb-4" />
                  <h2 className="text-xl font-semibold text-neutral-50 mb-2">Brief received</h2>
                  <p className="text-sm text-neutral-300">
                    We&apos;ll respond within 24 hours. Check your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h2 className="text-xl font-semibold text-neutral-50 mb-4">Send a Brief</h2>

                  {/* Honeypot — hidden field */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <input {...register("website")} tabIndex={-1} autoComplete="off" />
                  </div>
                  <input type="hidden" {...register("_timestamp", { valueAsNumber: true })} />

                  <Input id="name" label="Name *" placeholder="Your name" error={errors.name?.message} {...register("name")} />
                  <Input id="email" label="Email *" type="email" placeholder="you@company.com" error={errors.email?.message} {...register("email")} />
                  <Input id="company" label="Company" placeholder="Company name" {...register("company")} />
                  <Select id="service" label="Service interest *" placeholder="Select a service" options={serviceOptions} error={errors.service?.message} {...register("service")} />
                  <Select id="budget" label="Budget range" placeholder="Select budget" options={budgetOptions} {...register("budget")} />
                  <Textarea id="message" label="Project details *" placeholder="Tell us about your project, goals, and timeline..." error={errors.message?.message} {...register("message")} />
                  <Select id="referral" label="How did you find us?" placeholder="Select" options={referralOptions} {...register("referral")} />

                  {error && (
                    <p className="text-sm text-error" role="alert">{error}</p>
                  )}

                  <Button type="submit" size="lg" className="w-full" loading={isSubmitting} icon={<Send className="h-4 w-4" />}>
                    Send Brief
                  </Button>

                  <p className="text-xs text-neutral-500 text-center">
                    We&apos;ll respond within 24 hours. Your data is handled per our{" "}
                    <a href="/legal/privacy" className="text-accent-400 hover:underline">privacy policy</a>.
                  </p>
                </form>
              )}
            </Card>
          </div>

          {/* Direct info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@arinitsolutions.com" className="hover:text-neutral-300 transition-colors">
                hello@arinitsolutions.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Bucharest, Romania</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Response within 24h</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
