import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Arinit Solutions. Book a 30-minute call or send us a project brief — we respond within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Arinit Solutions",
    description:
      "Book a call or send a brief. We respond within 24 hours on business days.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
