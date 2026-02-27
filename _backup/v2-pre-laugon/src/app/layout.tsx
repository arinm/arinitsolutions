import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arinitsolutions.com"),
  title: {
    default: "Arinit Solutions — Build Sharp. Scale Calm.",
    template: "%s | Arinit Solutions",
  },
  description:
    "Web, mobile, and cloud systems engineered for performance, clarity, and long-term ROI. Boutique IT studio delivering production-grade software.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arinit Solutions",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <CookieBanner />

        {/* JSON-LD: Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://arinitsolutions.com/#organization",
                  name: "Arinit Solutions",
                  url: "https://arinitsolutions.com",
                  description:
                    "Boutique IT studio — web, mobile, and cloud engineering.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "hello@arinitsolutions.com",
                    contactType: "sales",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://arinitsolutions.com/#website",
                  url: "https://arinitsolutions.com",
                  name: "Arinit Solutions",
                  publisher: {
                    "@id": "https://arinitsolutions.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
