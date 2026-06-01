"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Loader2,
  Mail,
} from "lucide-react";
import { TenantRadarLogo } from "@/components/logo";
import { toast } from "sonner";

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
const MONTHLY_APPS = ["1-10", "11-25", "26-50", "51-100", "100+"];
const METHODS = [
  "Credit Reports",
  "Background Checks",
  "Employment Verification",
  "Income Verification",
  "Reference Checks",
  "Manual Review",
  "Third-Party Screening Service",
  "I don't have a formal process",
];
const PROVIDERS = [
  "None",
  "Zillow",
  "Apartments.com",
  "TransUnion SmartMove",
  "RentSpree",
  "Avail",
  "Buildium",
  "AppFolio",
  "Other",
];
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
const BAD_WHAT = [
  "Stopped paying rent",
  "Property damage",
  "Fraudulent application",
  "Eviction",
  "Unauthorized occupants",
  "Other",
];
const VERIFICATIONS = [
  "Identity Verification",
  "Income Verification",
  "Employment Verification",
  "Bank Statement Analysis",
  "Rental History Verification",
  "Social Media Review",
  "Fraud Detection",
  "Risk Score",
  "Reference Verification",
  "Eviction History",
];
const SPENDS = ["$0", "$1-$10", "$11-$25", "$26-$50", "$50+"];
const PAY_MORE = ["Yes", "No", "Depends"];
const PRICES = ["Under $10", "$10-$20", "$20-$40", "$40-$75", "$75+"];
const CAPABILITIES = [
  "Fraud Detection",
  "Income Verification",
  "Employment Verification",
  "Bank Statement Analysis",
  "Identity Verification",
  "Rental Reference Verification",
  "AI Risk Report",
  "Same-Day Turnaround",
  "Bulk Screening",
  "Property Management Software Integration",
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
  monthly_apps: string | null;
  current_methods: string[];
  current_provider: string | null;
  biggest_pain: string | null;
  had_bad_tenant: boolean | null;
  bad_tenant_what: string[];
  verification_ratings: Record<string, number>;
  automate_one: string;
  current_spend: string | null;
  pay_more: string | null;
  reasonable_price: string | null;
  top_capabilities: string[]; // ordered top 3
  try_likelihood: number;
  timeline: string | null;
  wants_sample: boolean | null;
  name: string;
  email: string;
  notes: string;
  skip_reason: string;
};

const initial: Answers = {
  segment: null,
  units: null,
  monthly_apps: null,
  current_methods: [],
  current_provider: null,
  biggest_pain: null,
  had_bad_tenant: null,
  bad_tenant_what: [],
  verification_ratings: {},
  automate_one: "",
  current_spend: null,
  pay_more: null,
  reasonable_price: null,
  top_capabilities: [],
  try_likelihood: 7,
  timeline: null,
  wants_sample: null,
  name: "",
  email: "",
  notes: "",
  skip_reason: "",
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
  const [showEmailNudge, setShowEmailNudge] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) =>
    setA((p) => ({ ...p, [k]: v }));
  const toggleArr = (k: "current_methods" | "bad_tenant_what", v: string) =>
    setA((p) => ({
      ...p,
      [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v],
    }));

  const toggleTopCap = (v: string) => {
    setA((p) => {
      if (p.top_capabilities.includes(v)) {
        return {
          ...p,
          top_capabilities: p.top_capabilities.filter((x) => x !== v),
        };
      }
      if (p.top_capabilities.length >= 3) return p;
      return { ...p, top_capabilities: [...p.top_capabilities, v] };
    });
  };

  const setRating = (item: string, val: number) =>
    setA((p) => ({
      ...p,
      verification_ratings: { ...p.verification_ratings, [item]: val },
    }));

  const sections = useMemo(
    () => [
      // 1 — Segmentation
      {
        canSkip: false,
        valid: !!a.segment && !!a.units && !!a.monthly_apps,
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
            <div className="space-y-3">
              <QuestionLabel>
                How many tenant applications do you review per month?
              </QuestionLabel>
              <div className="flex flex-wrap gap-2">
                {MONTHLY_APPS.map((s) => (
                  <Chip
                    key={s}
                    active={a.monthly_apps === s}
                    onClick={() => set("monthly_apps", s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          </SectionShell>
        ),
      },

      // 2 — Current process
      {
        canSkip: true,
        valid: a.current_methods.length > 0 && !!a.current_provider,
        render: (
          <SectionShell
            kicker="Section 2 · Your current process"
            title="How are you screening today?"
          >
            <div className="space-y-3">
              <QuestionLabel>
                How do you currently screen tenants? (Select all that apply)
              </QuestionLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {METHODS.map((m) => (
                  <Chip
                    key={m}
                    active={a.current_methods.includes(m)}
                    onClick={() => toggleArr("current_methods", m)}
                  >
                    {m}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <QuestionLabel>
                Which provider do you currently use?
              </QuestionLabel>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PROVIDERS.map((p) => (
                  <Chip
                    key={p}
                    active={a.current_provider === p}
                    onClick={() => set("current_provider", p)}
                  >
                    {p}
                  </Chip>
                ))}
              </div>
            </div>
          </SectionShell>
        ),
      },

      // 3 — Pain discovery
      {
        canSkip: true,
        valid: !!a.biggest_pain && a.had_bad_tenant !== null,
        render: (
          <SectionShell
            kicker="Section 3 · Where it hurts"
            title="What's the part of screening you wish you never had to do again?"
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
                Have you ever approved a tenant who later became a problem?
              </QuestionLabel>
              <div className="flex gap-2">
                <Chip
                  active={a.had_bad_tenant === true}
                  onClick={() => set("had_bad_tenant", true)}
                >
                  Yes
                </Chip>
                <Chip
                  active={a.had_bad_tenant === false}
                  onClick={() => set("had_bad_tenant", false)}
                >
                  No
                </Chip>
              </div>
            </div>
            {a.had_bad_tenant && (
              <div className="space-y-3">
                <QuestionLabel>
                  What happened? (Select all that apply)
                </QuestionLabel>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {BAD_WHAT.map((b) => (
                    <Chip
                      key={b}
                      active={a.bad_tenant_what.includes(b)}
                      onClick={() => toggleArr("bad_tenant_what", b)}
                    >
                      {b}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </SectionShell>
        ),
      },

      // 4 — Solution validation
      {
        canSkip: true,
        valid: Object.keys(a.verification_ratings).length >= 3,
        render: (
          <SectionShell
            kicker="Section 4 · What would help"
            title="What are you looking for?"
          >
            <div className="space-y-3 border-t border-border pt-6">
              <QuestionLabel>
                If you could automate ONE part of screening, what would it be?
              </QuestionLabel>
              <textarea
                value={a.automate_one}
                onChange={(e) => set("automate_one", e.target.value)}
                placeholder="In your own words…"
                rows={3}
                className="w-full rounded-[10px] border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
            </div>
          </SectionShell>
        ),
      },

      // 5 — Willingness to pay
      {
        canSkip: true,
        valid: !!a.current_spend && !!a.pay_more && !!a.reasonable_price,
        render: (
          <SectionShell
            kicker="Section 5 · Pricing"
            title="Let's talk dollars."
          >
            <div className="space-y-3">
              <QuestionLabel>
                What do you currently spend on screening per applicant?
              </QuestionLabel>
              <div className="flex flex-wrap gap-2">
                {SPENDS.map((s) => (
                  <Chip
                    key={s}
                    active={a.current_spend === s}
                    onClick={() => set("current_spend", s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <QuestionLabel>
                Would you pay more for a report that meaningfully reduced fraud
                risk?
              </QuestionLabel>
              <div className="flex flex-wrap gap-2">
                {PAY_MORE.map((s) => (
                  <Chip
                    key={s}
                    active={a.pay_more === s}
                    onClick={() => set("pay_more", s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <QuestionLabel>
                What's a reasonable price per screening?
              </QuestionLabel>
              <div className="flex flex-wrap gap-2">
                {PRICES.map((s) => (
                  <Chip
                    key={s}
                    active={a.reasonable_price === s}
                    onClick={() => set("reasonable_price", s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          </SectionShell>
        ),
      },

      // 6 — Feature prioritization
      {
        canSkip: true,
        valid: a.top_capabilities.length === 3,
        render: (
          <SectionShell
            kicker="Section 6 · What we build first"
            title="Pick your top 3 capabilities."
            subtitle={`Tap up to three. Order matters — whatever you pick first becomes your #1. (${a.top_capabilities.length}/3 selected)`}
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CAPABILITIES.map((c) => {
                const rank = a.top_capabilities.indexOf(c);
                const isActive = rank !== -1;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleTopCap(c)}
                    className={`flex items-center justify-between gap-3 rounded-[10px] border px-4 py-3 text-left text-sm font-medium transition-all ${
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-foreground hover:border-foreground/40"
                    }`}
                  >
                    <span>{c}</span>
                    {isActive && (
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lavender text-[11px] font-bold text-foreground">
                        {rank + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </SectionShell>
        ),
      },

      // 7 — Buying intent
      {
        canSkip: true,
        valid: !!a.timeline && a.wants_sample !== null,
        render: (
          <SectionShell
            kicker="Section 7 · Intent"
            title="How ready are you, really?"
          >
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
            <div className="space-y-3">
              <QuestionLabel>
                Would you like to review a sample report?
              </QuestionLabel>
              <div className="flex gap-2">
                <Chip
                  active={a.wants_sample === true}
                  onClick={() => set("wants_sample", true)}
                >
                  Yes, send me one
                </Chip>
                <Chip
                  active={a.wants_sample === false}
                  onClick={() => set("wants_sample", false)}
                >
                  No, thanks
                </Chip>
              </div>
            </div>
          </SectionShell>
        ),
      },

      // 8 — Contact
      {
        canSkip: false,
        valid: a.email.trim().length > 3 && a.email.includes("@"),
        render: (
          <SectionShell
            kicker="Section 8 · Stay in the loop"
            title="Where do we send your founding-batch invite?"
            subtitle="We only contact you about Tenant Radar — early access, your sample report, and a 1:1 if you opted into one."
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
            <div className="space-y-3">
              <QuestionLabel>Anything else we should know?</QuestionLabel>
              <textarea
                value={a.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={3}
                placeholder="Optional"
                className="w-full rounded-[10px] border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowEmailNudge(true)}
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
            >
              I'd rather not share my email
            </button>
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

  const submit = async (opts?: {
    skipEmail?: boolean;
    skipReason?: string;
  }) => {
    setSubmitting(true);
    const payload = {
      segment: a.segment,
      units: a.units,
      monthly_apps: a.monthly_apps,
      current_methods: a.current_methods.length ? a.current_methods : null,
      current_provider: a.current_provider,
      biggest_pain: a.biggest_pain,
      had_bad_tenant: a.had_bad_tenant,
      bad_tenant_what: a.bad_tenant_what.length ? a.bad_tenant_what : null,
      verification_ratings: Object.keys(a.verification_ratings).length
        ? a.verification_ratings
        : null,
      automate_one: a.automate_one || null,
      current_spend: a.current_spend,
      pay_more: a.pay_more,
      reasonable_price: a.reasonable_price,
      top_capabilities: a.top_capabilities.length ? a.top_capabilities : null,
      try_likelihood: a.try_likelihood,
      timeline: a.timeline,
      wants_sample: a.wants_sample,
      name: a.name || null,
      email: opts?.skipEmail ? null : a.email || null,
      notes: a.notes || null,
      skip_reason: opts?.skipReason ?? null,
    };
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
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
      setSubmitting(false);
    }
  };

  // ---------- Done state ----------
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

  // ---------- Email-nudge modal ----------
  const NudgeModal = () =>
    showEmailNudge ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-[20px] bg-background p-6 shadow-2xl sm:p-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-lavender/20">
            <Mail className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="text-lg font-bold tracking-[-0.02em] text-foreground sm:text-xl">
            Without an email, we can't bring you in.
          </h3>
          <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
            The founding batch is small on purpose — we hand-deliver early
            access, your sample report, and pricing offers by email. If you skip
            it, your answers help us, but we lose the only way to invite you in.
          </p>
          <textarea
            value={a.skip_reason}
            onChange={(e) => set("skip_reason", e.target.value)}
            placeholder="Optional: tell us why you'd rather not share it"
            rows={2}
            className="mt-5 w-full rounded-[10px] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowEmailNudge(false)}
              className="flex-1 rounded-[10px] bg-foreground px-4 py-2.5 text-sm font-semibold text-background"
            >
              OK, I'll add my email
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => {
                setShowEmailNudge(false);
                submit({
                  skipEmail: true,
                  skipReason: a.skip_reason || "declined",
                });
              }}
              className="flex-1 rounded-[10px] border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Submit without email
            </button>
          </div>
        </div>
      </div>
    ) : null;

  // ---------- Layout ----------
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Progress */}
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

      {/* Body */}
      <main className="mx-auto max-w-3xl px-6 py-10 pb-32 sm:px-10 sm:py-14">
        {current.render}
      </main>

      {/* Footer nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-xl sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            {current.canSkip && !isLast && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
                className="rounded-[10px] px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Skip
              </button>
            )}
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
                onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <NudgeModal />
    </div>
  );
}

export default EarlyAccessSurvey;
