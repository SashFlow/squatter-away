export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  {
    q: "Is this available in the United States?",
    a: "Yes — Tenant Radar is built for the U.S. rental market first, with workflows and data sources tuned to U.S. landlords, property managers, and SMB operators.",
  },
  {
    q: "How is this different from a credit check?",
    a: "Credit scores are one input. We synthesize identity, social footprint, employment, banking behavior, and prior tenancy signals into a single decision-ready report — closer to a consulate-style verification than a one-number pull.",
  },
  {
    q: "How fast is turnaround?",
    a: "Most complete applications come back the same day. Edge cases that need human review typically resolve within 24 hours.",
  },
  {
    q: "Is applicant data secure?",
    a: "Applicants submit through an encrypted intake form. Data is encrypted at rest, access-scoped, and never sold or shared with third parties.",
  },
];
