import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Invalid form data." },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check — website field must be empty
    if (data.website && data.website.length > 0) {
      // Silently accept but don't process (don't reveal bot detection)
      return NextResponse.json({ success: true });
    }

    // Timestamp check — form must be open for at least 3 seconds
    const formAge = Date.now() - data._timestamp;
    if (formAge < 3000) {
      // Too fast, likely a bot
      return NextResponse.json({ success: true });
    }

    // In production, you would send an email here via Resend/Postmark/etc.
    // For now, log to server console
    console.log("--- Contact Form Submission ---");
    console.log(`Name: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Company: ${data.company || "N/A"}`);
    console.log(`Service: ${data.service}`);
    console.log(`Budget: ${data.budget || "N/A"}`);
    console.log(`Message: ${data.message}`);
    console.log(`Referral: ${data.referral || "N/A"}`);
    console.log("-------------------------------");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
