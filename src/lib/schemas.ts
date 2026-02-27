import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.enum(["web", "mobile", "cloud", "ai", "not-sure"], { message: "Please select a service" }),
  budget: z.enum(["under-10k", "10k-25k", "25k-50k", "50k-plus", "not-sure"]).optional(),
  message: z.string().min(10, "Please provide at least 10 characters about your project"),
  referral: z.enum(["referral", "google", "social", "other"]).optional(),
  // Honeypot — must be empty
  website: z.string().max(0, "Bot detected").optional(),
  // Timestamp — form must be open > 3 seconds
  _timestamp: z.number(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface WorkPost {
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  discipline: "web" | "mobile" | "cloud" | "ai";
  tags: string[];
  featured: boolean;
  metrics: { value: string; label: string; context?: string }[];
  thumbnail?: string;
  challenge: string;
  approach: string;
  solution: string;
  stack: { category: string; technologies: string[] }[];
  timeline: { label: string; duration: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
  learnings: { title: string; body: string }[];
}

export interface InsightPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "performance" | "architecture" | "cloud" | "ai-llm" | "engineering";
  author: { name: string; role: string };
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}
