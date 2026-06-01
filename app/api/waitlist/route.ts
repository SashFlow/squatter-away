import WelcomeTemplate from "@/template/welcome";
import { flattenObject } from "@/lib/flatten";
import { appendFlattenedRow } from "@/lib/google-sheets";
import { siteConfig } from "@/lib/site";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"),
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NAME_KEYS = ["name", "firstName", "user.name", "profile.name"];

function findEmail(flattened: Record<string, string>): string | undefined {
  if (flattened.email) return flattened.email;
  const nestedEmail = Object.entries(flattened).find(
    ([key]) => key === "email" || key.endsWith(".email"),
  );
  return nestedEmail?.[1];
}

function findName(flattened: Record<string, string>): string {
  for (const key of NAME_KEYS) {
    if (flattened[key]) return flattened[key];
  }
  return "there";
}

export async function POST(request: NextRequest) {
  const xForwardedForHeader = request.headers.get("x-forwarded-for");
  const ip =
    xForwardedForHeader?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "127.0.0.1";

  const results = await ratelimit.limit(ip);

  if (!results.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 },
    );
  }

  body.submittedAt = new Date().toISOString();
  const flattened = flattenObject(body);

  try {
    await appendFlattenedRow(flattened);
  } catch (error) {
    console.error("Failed to save waitlist entry:", error);
    return NextResponse.json(
      { error: "Failed to save to waitlist" },
      { status: 500 },
    );
  }

  const email = findEmail(flattened);
  if (email && EMAIL_REGEX.test(email)) {
    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <no-reply@sashflow.com>`,
      to: email,
      subject: `You're on the ${siteConfig.name} waitlist`,
      react: WelcomeTemplate({ userFirstName: findName(flattened) }),
    });

    if (error) {
      console.error("Failed to send waitlist welcome email:", error);
    }
  }

  return NextResponse.json(
    { message: "Successfully joined the waitlist" },
    { status: 200 },
  );
}
