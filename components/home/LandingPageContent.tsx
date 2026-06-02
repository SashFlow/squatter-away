import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Bot,
  Banknote,
  Briefcase,
  AtSign,
  Clock,
  Lock,
  Sparkles,
  Building2,
  Users,
  Home,
  CheckCircle2,
} from "lucide-react";
import { TenantRadarLogo } from "@/components/logo";
import { ScreeningSourcesIllustration } from "@/components/home/ScreeningSourcesIllustration";
import { HowItWorksPaths } from "@/components/home/HowItWorksIllustrations";
import { LandingNav } from "@/components/home/LandingNav";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { faqs } from "@/lib/content/faqs";
import { howItWorks, features, audiences, stats } from "@/lib/content/home";
import { SiteFooter } from "@/components/site/SiteFooter";

const featureIcons = [AtSign, Banknote, Briefcase, Bot, Clock, Lock];
const audienceIcons = [Home, Building2, Users];

export function LandingPageContent() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      <main>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-[200px] right-[10%] h-[600px] w-[600px] rounded-full bg-lavender/[0.18] blur-[100px]" />
            <div className="absolute -top-[100px] -left-[200px] h-[500px] w-[500px] rounded-full bg-[oklch(0.65_0.20_350)]/[0.08] blur-[80px]" />
            <div className="absolute top-[60%] left-[40%] h-[300px] w-[300px] rounded-full bg-lavender/[0.10] blur-[80px]" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <section className="relative">
            <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:px-10 sm:pt-24 sm:pb-16 md:pt-32">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
                <div className="flex-1 max-w-xl">
                  <div className="mb-8">
                    <TenantRadarLogo size="lg" variant="light" />
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 px-3 py-1 text-xs font-semibold text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-lavender" />
                    AI tenant screening · US market
                  </div>

                  <h1 className="mt-5 text-3xl font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-4xl md:text-5xl lg:text-[58px]">
                    Know your tenant{" "}
                    <span className="text-lavender">before</span> they sign.
                  </h1>

                  <p className="mt-6 max-w-md text-base leading-[1.6] text-muted-foreground sm:mt-7 sm:text-lg">
                    Tenant Radar is a consulate-grade tenant screening platform
                    for individual landlords and SMBs. Share a link, let our AI
                    agent verify socials, bank statements, and employment, and
                    get a decision-ready report — fast.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <Link
                      href="/early-access"
                      className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-foreground px-7 py-3 text-base font-semibold text-background transition-all hover:opacity-90"
                    >
                      Join the founding batch{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                      href="#how-it-works"
                      className="inline-flex items-center justify-center rounded-[10px] border border-border bg-white px-7 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      See how it works
                    </a>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-lavender" /> No
                      setup fees
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-lavender" /> Pay
                      per report
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-lavender" />{" "}
                      US-built workflows
                    </span>
                  </div>
                </div>

                <div className="w-full max-w-md lg:max-w-xl flex-shrink-0">
                  <ScreeningSourcesIllustration />
                </div>
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="mx-auto max-w-6xl px-6 sm:px-10">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-border bg-border md:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-background px-5 py-6 sm:px-7 sm:py-8"
                  >
                    <p className="text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-[13px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
                The hook
              </p>
              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[44px]">
                Credit pulls tell you a number.
                <br />
                We tell you a <span className="text-lavender">story</span>.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground sm:text-lg">
                A bad tenant costs the average US landlord upwards of $7,500 in
                unpaid rent, legal fees, and repairs. Yet most screening tools
                still hand you a one-line score and a thumbs up. Tenant Radar
                treats every applicant the way a consulate treats a visa:
                identity, history, income, and intent — verified,
                cross-referenced, and delivered as one report you can actually
                defend.{" "}
                <Link
                  href="/compare/credit-checks"
                  className="text-foreground underline underline-offset-2 hover:text-lavender"
                >
                  See how we compare to credit checks
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="relative pb-20 sm:pb-28">
            <div className="mx-auto max-w-6xl px-6 sm:px-10">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
                    What you receive
                  </p>
                  <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl">
                    A decision-ready report.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-[1.7] text-muted-foreground sm:text-lg">
                    Identity, employment, and banking signals — summarized into a
                    single verdict with clear supporting evidence.
                  </p>
                </div>

                <div className="rounded-[18px] border border-border bg-secondary/30 p-3 sm:p-4">
                  <div className="relative overflow-hidden rounded-[14px] bg-background">
                    <Image
                      src="/d16deccedacf4928b0cc1b67400028a5.jpg"
                      alt="Example Tenant Radar screening report output"
                      width={1024}
                      height={576}
                      className="h-auto w-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="relative">
            <div className="mx-6 rounded-[24px] bg-foreground text-background sm:mx-10">
              <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
                <div className="mb-14 max-w-2xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
                    How it works
                  </p>
                  <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.01em] sm:text-4xl">
                    {howItWorks.headline}
                  </h2>
                  <p className="mt-4 text-base leading-[1.6] text-white/70">
                    {howItWorks.subhead}
                  </p>
                </div>

                <HowItWorksPaths />
              </div>
            </div>
          </section>

          <section id="features" className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6 sm:px-10">
              <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
                <div className="lg:w-80 lg:flex-shrink-0">
                  <div className="lg:sticky lg:top-24">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
                      What you get
                    </p>
                    <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl">
                      Twelve signals. One verdict.
                    </h2>
                    <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
                      Every report combines public, financial, and behavioral
                      data into a single underwriter-grade verdict — so you can
                      say yes (or no) with confidence.
                    </p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {features.map((feature, i) => {
                    const Icon = featureIcons[i];
                    return (
                      <div
                        key={feature.title}
                        className="group rounded-[16px] border border-border p-7 transition-all hover:border-lavender/40 hover:shadow-lg hover:shadow-lavender/5 sm:p-8"
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-lavender/15 transition-colors group-hover:bg-lavender/25">
                          <Icon className="h-5 w-5 text-foreground" />
                        </div>
                        <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-6 sm:px-10">
              <div className="mb-12 max-w-2xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
                  Built for
                </p>
                <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl">
                  Whoever holds the keys
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {audiences.map((a, i) => {
                  const Icon = audienceIcons[i];
                  return (
                    <Link
                      key={a.slug}
                      href={a.href}
                      className="rounded-[16px] border border-border bg-secondary/40 p-7 transition-all hover:bg-secondary/60 hover:border-lavender/40"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-foreground text-background">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                        {a.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="faq" className="py-20 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 sm:px-10">
              <div className="mb-12 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
                  FAQ
                </p>
                <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl">
                  Questions, answered
                </h2>
              </div>
              <FaqAccordion faqs={faqs} />
            </div>
          </section>

          <section id="cta-section" className="relative">
            <div className="mx-6 mb-4 rounded-[24px] bg-foreground px-6 py-16 sm:mx-10 sm:px-12 sm:py-24 md:py-28">
              <div className="relative mx-auto max-w-2xl text-center">
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-[12px] bg-lavender">
                  <ShieldCheck className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.01em] text-white sm:text-4xl">
                  Stop screening on vibes.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-[1.6] text-white/60">
                  We're hand-picking a founding batch of U.S. landlords and
                  operators to shape the next industry-leading tenant screening
                  platform. Eight quick sections — your answers go straight to
                  the team building it.
                </p>
                <Link
                  href="/early-access"
                  className="group mt-10 inline-flex items-center justify-center gap-2 rounded-[10px] bg-lavender px-8 py-3 text-base font-semibold text-foreground transition-all hover:shadow-lg hover:shadow-lavender/25"
                >
                  Join the founding batch{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </section>

          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
