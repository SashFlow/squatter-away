import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Tenant Radar collects, uses, and protects applicant and landlord data during tenant screening.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        <strong>Last updated:</strong> June 1, 2026
      </p>
      <p>
        Tenant Radar (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
        provides AI-powered tenant screening services for U.S. landlords,
        property managers, and rental operators. This Privacy Policy explains
        how we collect, use, disclose, and safeguard information when you use
        our website and screening platform.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        Information we collect
      </h2>
      <p>
        We collect information you provide directly (account details, survey
        responses, contact information) and information submitted by rental
        applicants through screening links (identity documents, employment
        details, bank statements, and social profile references). We also
        collect standard usage data such as IP address, browser type, and pages
        visited.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        How we use information
      </h2>
      <p>
        We use collected information to provide tenant screening reports,
        improve our verification models, communicate with you about early access
        and product updates, prevent fraud, and comply with legal obligations.
        Applicant data is used solely to generate screening reports for the
        requesting landlord or operator.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        Data sharing
      </h2>
      <p>
        We do not sell applicant or landlord data. We may share information with
        service providers who assist in verification, hosting, and analytics,
        subject to contractual confidentiality obligations. We may disclose
        information when required by law or to protect rights and safety.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">Security</h2>
      <p>
        Data is encrypted in transit and at rest. Access to screening data is
        restricted to authorized personnel and the requesting party. We review
        our security practices regularly and design our platform with SOC-minded
        controls.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">
        Your rights
      </h2>
      <p>
        Depending on your state of residence, you may have rights to access,
        correct, or delete personal information we hold about you. Contact us at
        growth@sashflow.com to submit a request.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-4">Contact</h2>
      <p>Questions about this policy? Email growth@sashflow.com.</p>
    </LegalPage>
  );
}
