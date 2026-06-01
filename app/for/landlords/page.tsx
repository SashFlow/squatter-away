import type { Metadata } from "next";
import {
  AudiencePage,
  createAudienceMetadata,
} from "@/components/marketing/AudiencePage";

export const metadata: Metadata = createAudienceMetadata({
  title: "Tenant Screening for Individual Landlords",
  description:
    "AI tenant screening for independent landlords — verify employment, bank statements, and identity without enterprise pricing. Pay per report, no setup fees.",
  path: "/for/landlords",
});

export default function LandlordsPage() {
  return (
    <AudiencePage
      title="Individual Landlords"
      path="/for/landlords"
      h1="Serious tenant screening for independent landlords"
      description=""
      intro="You don't need a 500-unit portfolio to run a professional screening process. Squatter Away gives individual landlords consulate-grade verification — identity, employment, banking, and social signals — in a single report you can actually defend in court."
      sections={[
        {
          heading: "Why credit scores aren't enough",
          body: "A 720 FICO tells you how someone handles revolving debt. It doesn't tell you whether they'll pay rent on time, whether their stated income is real, or whether their employment history checks out. Independent landlords lose an average of $7,500 on a bad tenant — and most of that damage happens before eviction filings show up on any report.",
        },
        {
          heading: "One link, one report",
          body: "Generate a secure screening link and send it by text, email, or your listing platform. Your applicant submits documents through an encrypted form. Our AI agent cross-checks every signal and delivers a decision-ready report — often in under an hour. No phone tag with employers. No guessing at bank statement PDFs.",
        },
        {
          heading: "Pay per report, not per month",
          body: "Enterprise screening platforms charge monthly minimums that don't make sense when you're leasing one or two units a year. Squatter Away is pay-per-report with no setup fees — built for landlords who want professional diligence without professional overhead.",
        },
      ]}
      faqs={[
        {
          q: "Do I need an LLC or property management company?",
          a: "No. Squatter Away is built for individual landlords screening applicants for their own rental properties.",
        },
        {
          q: "Is this FCRA compliant?",
          a: "You remain responsible for obtaining applicant consent and complying with federal and state screening laws. Our platform is designed to support compliant workflows.",
        },
        {
          q: "How fast will I get a report?",
          a: "Most complete applications return the same day. Edge cases requiring human review typically resolve within 24 hours.",
        },
      ]}
    />
  );
}
