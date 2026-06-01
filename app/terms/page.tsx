import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing use of Squatter Away's tenant screening platform for U.S. landlords and property managers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        <strong>Last updated:</strong> June 1, 2026
      </p>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of
        Squatter Away&apos;s website, early access program, and tenant screening
        platform. By using our services, you agree to these Terms.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">Eligibility</h2>
      <p>
        Our services are intended for landlords, property managers, and rental
        operators conducting lawful tenant screening in the United States. You
        must comply with all applicable federal, state, and local housing and
        fair-housing laws when using screening reports.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">The service</h2>
      <p>
        Squatter Away provides AI-assisted tenant verification reports based on
        applicant-submitted information and authorized data sources. Reports are
        decision-support tools — you remain responsible for final leasing
        decisions and compliance with applicable screening regulations.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        Applicant consent
      </h2>
      <p>
        You agree to obtain all required applicant consent before sharing a
        screening link, including disclosures required under the Fair Credit
        Reporting Act (FCRA) and state-specific screening laws where applicable.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        Acceptable use
      </h2>
      <p>
        You may not use our platform for unlawful discrimination, harassment,
        unauthorized surveillance, or any purpose that violates fair-housing
        protections. We may suspend access for violations of these Terms.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        Limitation of liability
      </h2>
      <p>
        To the maximum extent permitted by law, Squatter Away is not liable for
        indirect, incidental, or consequential damages arising from use of
        screening reports. Our total liability is limited to fees paid for the
        specific report giving rise to the claim.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">Contact</h2>
      <p>
        Questions about these Terms? Email legal@squatteraway.com.
      </p>
    </LegalPage>
  );
}
