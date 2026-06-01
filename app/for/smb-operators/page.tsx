import type { Metadata } from "next";
import {
  AudiencePage,
  createAudienceMetadata,
} from "@/components/marketing/AudiencePage";

export const metadata: Metadata = createAudienceMetadata({
  title: "Tenant Screening for SMB Rental Operators",
  description:
    "Consistent tenant diligence for co-living, short-stay, sublets, and roommate matching operators. AI screening at scale for U.S. SMB rental businesses.",
  path: "/for/smb-operators",
});

export default function SmbOperatorsPage() {
  return (
    <AudiencePage
      title="SMB Operators"
      path="/for/smb-operators"
      h1="Consistent diligence for co-living, sublets, and short-stay"
      description=""
      intro="Co-living operators, roommate-matching platforms, and short-stay managers face a unique challenge: high turnover, shared spaces, and applicants who don't fit traditional screening molds. Squatter Away delivers the same rigorous verification at the speed your business demands."
      sections={[
        {
          heading: "Screening beyond the standard lease",
          body: "Roommate matching, co-living, and furnished sublets often involve applicants with non-traditional income, shorter intended stays, or limited credit history. Squatter Away synthesizes employment, banking behavior, identity, and social signals — giving you a fuller picture than a credit pull alone.",
        },
        {
          heading: "Scale without hiring underwriters",
          body: "Growing from 20 beds to 200 shouldn't mean hiring a screening team. Our AI underwriting agent applies a consistent playbook to every applicant, so your ops team can focus on move-ins and community — not parsing bank statements.",
        },
        {
          heading: "Protect shared spaces",
          body: "When multiple tenants share a home, one bad fit affects everyone. Deep verification — not just a background check — helps you place compatible residents and reduce conflict, turnover, and property damage.",
        },
      ]}
      faqs={[
        {
          q: "Does this work for roommate matching?",
          a: "Yes. Generate screening links for each applicant in a shared housing arrangement and review reports independently or as a group.",
        },
        {
          q: "Can we screen international applicants?",
          a: "Squatter Away is optimized for the U.S. rental market. International applicant support is on our roadmap — founding batch members help shape priority.",
        },
        {
          q: "What verification signals are included?",
          a: "Each report combines 12+ signals including identity, employment, bank statement analysis, social footprint, and more.",
        },
      ]}
    />
  );
}
