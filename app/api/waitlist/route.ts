import WelcomeTemplate from "@/template/welcome";
import { flattenObject } from "@/lib/flatten";
import { appendFlattenedRow } from "@/lib/google-sheets";
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
  let ip: string;
  const xForwardedForHeader = request.headers.get("x-forwarded-for");
  if (xForwardedForHeader) {
    ip = xForwardedForHeader.split(",")[0]?.trim();
  } else {
    ip = request.headers.get("x-real-ip")?.trim() || "127.0.0.1";
  }

  const results = await ratelimit.limit(ip);

  if (!results.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
    const body: Record<string, string> = await request.json();


  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 },
    );
  }

  body.submittedAt = new Date().toISOString();

  try {
    await appendFlattenedRow(body);
  } catch {
    return NextResponse.json(
      { error: "Failed to save to waitlist" },
      { status: 500 },
    );
  }

  const { error } = await resend.emails.send({
    from: "Waitlist Template <no-reply@sashflow.com>",
    to: body.email,
    subject: "Welcome to the platform",
    react: WelcomeTemplate({ userFirstName: body.name }),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Successfully joined the waitlist" },
    { status: 200 },
  );
}
