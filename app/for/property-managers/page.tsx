import type { Metadata } from "next";
import {
  AudiencePage,
  createAudienceMetadata,
} from "@/components/marketing/AudiencePage";

export const metadata: Metadata = createAudienceMetadata({
  title: "Tenant Screening for Property Managers",
  description:
    "Standardize tenant screening across every door you manage. One link, one AI-powered report, consistent decisions at scale for U.S. property managers.",
  path: "/for/property-managers",
});

export default function PropertyManagersPage() {
  return (
    <AudiencePage
      title="Property Managers"
      path="/for/property-managers"
      h1="Consistent screening across every door you manage"
      description=""
      intro="When you're running applications across dozens of units, inconsistency is expensive. Tenant Radar standardizes your screening playbook — same verification signals, same AI underwriter, same report format — whether you're leasing a studio or a four-bedroom."
      sections={[
        {
          heading: "One playbook, every applicant",
          body: "Different leasing agents screening different ways creates liability and bad outcomes. Tenant Radar applies the same verification framework to every applicant: identity cross-checks, employment validation, bank statement analysis, and social footprint review — delivered as a single underwriter-grade report.",
        },
        {
          heading: "Speed without cutting corners",
          body: "Good tenants don't wait around. Most Tenant Radar reports return in hours, not days — so you can move qualified applicants through your pipeline before they sign elsewhere. Faster turnaround without skipping the signals that matter.",
        },
        {
          heading: "Audit-ready documentation",
          body: "Every report documents the verification signals checked and the reasoning behind the recommendation. When a fair-housing question arises or an owner asks why you approved an applicant, you have a defensible paper trail — not a one-line credit score.",
        },
      ]}
      faqs={[
        {
          q: "Can I use this across multiple properties?",
          a: "Yes. Generate screening links per application regardless of which property or owner portfolio the unit belongs to.",
        },
        {
          q: "Does it integrate with property management software?",
          a: "Integrations are on our roadmap. Early access members help prioritize which platforms we connect first.",
        },
        {
          q: "How does pricing work at scale?",
          a: "Pay per report with volume pricing for managers running high application counts. Join the founding batch for early pricing details.",
        },
      ]}
    />
  );
}
