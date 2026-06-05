"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { TenantRadarLogo } from "@/components/logo";
import { toast } from "sonner";
import { trackEarlyAccess } from "@/lib/analytics";

// ---------- Data ----------

const SEGMENTS = [
  "Independent Landlord",
  "Property Manager",
  "Real Estate Investor",
  "Multifamily Operator",
  "Real Estate Agency",
  "Other",
];
const UNITS = ["1-5", "6-25", "26-100", "100-500", "500+"];
const PAINS = [
  "Fake income documents",
  "Fake employment records",
  "Fraudulent applications",
  "Slow verification",
  "Too much manual work",
  "Inconsistent screening process",
  "Legal / compliance concerns",
  "Other",
];
const TIMELINES = [
  "Immediately",
  "Within 30 Days",
  "Within 3 Months",
  "Within 6 Months",
  "Just Researching",
];

// ---------- Types ----------

type Answers = {
  segment: string | null;
  units: string | null;
  biggest_pain: string | null;
  try_likelihood: number;
  timeline: string | null;
  name: string;
  email: string;
};

const initial: Answers = {
  segment: null,
  units: null,
  biggest_pain: null,
  try_likelihood: 7,
  timeline: null,
  name: "",
  email: "",
};

// ---------- UI primitives ----------

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[10px] border px-4 py-2.5 text-left text-sm font-medium transition-all ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:border-foreground/40"
      }`}
    >
      <span className="flex items-center gap-2">
        {active && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
        <span>{children}</span>
      </span>
    </button>
  );
}

function SectionShell({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-lavender">
          {kicker}
        </p>
        <h2 className="text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm leading-[1.6] text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function QuestionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-foreground">{children}</p>;
}

// ---------- Survey ----------

export function EarlyAccessSurvey() {
  const [a, setA] = useState<Answers>(initial);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) =>
    setA((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    trackEarlyAccess("early_access_started");
    trackEarlyAccess("early_access_step", { step: 1, action: "view" });
  }, []);

  useEffect(() => {
    if (step === 0) return;
    trackEarlyAccess("early_access_step", { step: step + 1, action: "view" });
  }, [step]);

  const sections = useMemo(
    () => [
      {
        valid: !!a.segment && !!a.units,
        render: (
          <SectionShell
            kicker="Section 1 · About you"
            title="Where do you sit in the rental world?"
          >
            <div className="space-y-3">
              <QuestionLabel>What best describes you?</QuestionLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SEGMENTS.map((s) => (
                  <Chip
                    key={s}
                    active={a.segment === s}
                    onClick={() => set("segment", s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <QuestionLabel>
                How many rental units do you manage?
              </QuestionLabel>
              <div className="flex flex-wrap gap-2">
                {UNITS.map((s) => (
                  <Chip
                    key={s}
                    active={a.units === s}
                    onClick={() => set("units", s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          </SectionShell>
        ),
      },
      {
        valid: !!a.biggest_pain && !!a.timeline,
        render: (
          <SectionShell
            kicker="Section 2 · Intent"
            title="How ready are you, really?"
          >
            <div className="space-y-3">
              <QuestionLabel>
                Most frustrating part of tenant screening (pick one)
              </QuestionLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {PAINS.map((p) => (
                  <Chip
                    key={p}
                    active={a.biggest_pain === p}
                    onClick={() => set("biggest_pain", p)}
                  >
                    {p}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <QuestionLabel>
                If this existed today, how likely would you be to try it? (
                {a.try_likelihood}/10)
              </QuestionLabel>
              <input
                type="range"
                min={1}
                max={10}
                value={a.try_likelihood}
                onChange={(e) => set("try_likelihood", Number(e.target.value))}
                className="w-full accent-[oklch(0.55_0.18_290)]"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Probably not</span>
                <span>Sign me up</span>
              </div>
            </div>
            <div className="space-y-3">
              <QuestionLabel>
                How soon are you looking to improve your screening?
              </QuestionLabel>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((t) => (
                  <Chip
                    key={t}
                    active={a.timeline === t}
                    onClick={() => set("timeline", t)}
                  >
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </SectionShell>
        ),
      },
      {
        valid: a.email.trim().length > 3 && a.email.includes("@"),
        render: (
          <SectionShell
            kicker="Section 3 · Stay in the loop"
            title="Where do we send your founding-batch invite?"
            subtitle="We only contact you about Tenant Radar — early access and product updates."
          >
            <div className="space-y-3">
              <QuestionLabel>Name</QuestionLabel>
              <input
                value={a.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                className="w-full rounded-[10px] border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <QuestionLabel>Email *</QuestionLabel>
              <input
                type="email"
                value={a.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-[10px] border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
            </div>
          </SectionShell>
        ),
      },
    ],
    [a],
  );

  const total = sections.length;
  const current = sections[step];
  const isLast = step === total - 1;
  const progress = ((step + 1) / total) * 100;

  const goBack = () => {
    trackEarlyAccess("early_access_step", { step: step + 1, action: "back" });
    setStep((s) => Math.max(0, s - 1));
  };

  const goForward = () => {
    trackEarlyAccess("early_access_step", {
      step: step + 1,
      action: "continue",
    });
    setStep((s) => Math.min(total - 1, s + 1));
  };

  const submit = async () => {
    setSubmitting(true);
    let success = false;
    const payload = {
      segment: a.segment,
      units: a.units,
      biggest_pain: a.biggest_pain,
      try_likelihood: a.try_likelihood,
      timeline: a.timeline,
      name: a.name || null,
      email: a.email || null,
    };
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        success = true;
        setDone(true);
        return;
      }

      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      toast.error(data?.error ?? "Failed to submit survey");
    } catch {
      toast.error("Failed to submit survey");
    } finally {
      trackEarlyAccess("early_access_submit", {
        status: success ? "success" : "error",
      });
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[16px] bg-lavender">
            <ShieldCheck className="h-7 w-7 text-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            You're in !!!
          </h1>
          <p className="mt-4 max-w-md text-base leading-[1.6] text-muted-foreground">
            Thank you — every answer goes directly to the people building
            Tenant Radar. We'll be in touch soon.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-[10px] bg-foreground px-6 py-3 text-sm font-semibold text-background"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-xl sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />{" "}
            <span className="text-sm font-medium">Home</span>
          </Link>
          <TenantRadarLogo size="sm" variant="light" />
          <div className="hidden text-xs font-semibold text-muted-foreground sm:flex sm:items-center sm:gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-lavender" />
            Founding batch
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-3 sm:px-10">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>
              Step {step + 1} of {total}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-10 pb-32 sm:px-10 sm:py-14">
        {current.render}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-xl sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            {isLast ? (
              <button
                type="button"
                disabled={!current.valid || submitting}
                onClick={() => submit()}
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Join the batch
              </button>
            ) : (
              <button
                type="button"
                disabled={!current.valid}
                onClick={goForward}
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EarlyAccessSurvey;
