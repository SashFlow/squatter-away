import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SquatterAwayLogo } from "@/components/logo";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Tenant Screening vs Credit Checks",
  description:
    "Credit scores are one input — not a full tenant screening strategy. Learn how Squatter Away compares to traditional credit checks for U.S. landlords.",
  path: "/compare/credit-checks",
});

const faqs = [
  {
    q: "Should I still run a credit check?",
    a: "Credit history remains a useful data point. Squatter Away complements credit checks by adding employment verification, bank statement analysis, identity cross-checks, and social footprint review — giving you a fuller picture for leasing decisions.",
  },
  {
    q: "Is a credit score enough for tenant screening?",
    a: "For most landlords, no. Credit scores measure debt repayment behavior, not rent payment reliability, income stability, or identity verification. A high score doesn't guarantee a good tenant, and a lower score doesn't always indicate risk.",
  },
  {
    q: "How is Squatter Away different from SmartMove or RentSpree?",
    a: "Traditional platforms center on credit and background pulls. Squatter Away synthesizes 12+ verification signals — including bank statements and employment — into a single AI-generated report designed for decision-ready screening.",
  },
];

export default function CompareCreditChecksPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tenant Screening vs Credit Checks", path: "/compare/credit-checks" },
          ]),
          faqPageSchema(faqs),
        ]}
      />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/60 px-6 py-4 sm:px-10">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <SquatterAwayLogo size="sm" variant="light" />
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-lavender">
            Comparison
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Tenant screening vs credit checks: which matters more?
          </h1>
          <p className="mt-6 text-base leading-[1.7] text-muted-foreground sm:text-lg">
            Credit pulls tell you a number. Comprehensive tenant screening tells
            you a story — identity, income, employment, banking behavior, and
            intent verified and cross-referenced into one report.
          </p>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground">
              What credit checks actually measure
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
              A credit report summarizes how someone manages revolving debt,
              installment loans, and payment history with creditors. It does not
              verify current employment, analyze bank statements for income
              consistency, or cross-reference identity across multiple sources.
              Many responsible renters — especially young professionals,
              immigrants, and cash-income workers — have thin or non-traditional
              credit files that tell you little about their ability to pay rent.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground">
              What comprehensive screening adds
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
              Squatter Away treats every applicant like a consulate treats a visa
              application: multiple independent signals verified and
              cross-referenced. Employment validation confirms role and tenure.
              Bank statement intelligence extracts income patterns, recurring
              obligations, and rent-to-income ratios. Social footprint analysis
              surfaces identity matches and behavioral red flags. The result is
              a decision-ready report — not a single number with a thumbs up.
            </p>
          </section>

          <section className="mt-10 overflow-hidden rounded-[16px] border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Signal
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Credit check
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Squatter Away
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Payment history", "Debt accounts only", "Rent-relevant banking patterns"],
                  ["Income verification", "Not included", "Bank statement + employment"],
                  ["Employment validation", "Not included", "Employer, role, tenure"],
                  ["Identity cross-check", "Limited", "Multi-source verification"],
                  ["Social footprint", "Not included", "Public profile analysis"],
                  ["Turnaround", "Minutes", "Hours, not days"],
                ].map(([signal, credit, squatter]) => (
                  <tr key={signal} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{signal}</td>
                    <td className="px-4 py-3">{credit}</td>
                    <td className="px-4 py-3">{squatter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <article key={faq.q}>
                  <h3 className="text-base font-semibold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">
                    {faq.a}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <p className="mt-10 text-sm text-muted-foreground">
            Read more:{" "}
            <Link href="/blog/tenant-screening-vs-credit-check" className="underline">
              Tenant screening vs credit check: a deep dive
            </Link>
          </p>

          <div className="mt-10 rounded-[16px] bg-foreground px-8 py-10 text-center">
            <h2 className="text-xl font-bold text-white">
              Go beyond the credit score
            </h2>
            <Link
              href="/early-access"
              className="group mt-6 inline-flex items-center gap-2 rounded-[10px] bg-lavender px-6 py-3 text-sm font-semibold text-foreground"
            >
              Join the founding batch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
