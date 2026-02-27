import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

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

    const serviceLabels: Record<string, string> = {
      web: "Web Development",
      mobile: "Mobile Development",
      cloud: "Cloud & Infrastructure",
      ai: "AI & LLM Solutions",
      "not-sure": "Not sure yet",
    };

    const budgetLabels: Record<string, string> = {
      "under-10k": "Under €10,000",
      "10k-25k": "€10,000 – €25,000",
      "25k-50k": "€25,000 – €50,000",
      "50k-plus": "€50,000+",
      "not-sure": "Not sure yet",
    };

    const { error: emailError } = await getResend().emails.send({
      from: "Arinit Website <noreply@arinitsolutions.com>",
      to: "arin@arinitsolutions.com",
      replyTo: data.email,
      subject: `New inquiry from ${data.name} — ${serviceLabels[data.service] || data.service}`,
      html: `
        <h2>New project inquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:140px;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Company</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.company || "—"}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Service</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${serviceLabels[data.service] || data.service}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Budget</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.budget ? budgetLabels[data.budget] || data.budget : "—"}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Referral</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.referral || "—"}</td></tr>
        </table>
        <h3 style="margin-top:24px;">Message</h3>
        <p style="white-space:pre-wrap;background:#f9f9f9;padding:16px;border-radius:8px;font-family:sans-serif;">${data.message}</p>
      `,
    });

    if (emailError) {
      console.error("[Contact] Resend error:", emailError);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
