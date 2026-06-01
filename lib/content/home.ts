export const howItWorks = {
  headline: "Two ways to get a screening report",
  subhead:
    "Send a link to your applicant or upload documents yourself — same AI report either way.",
  paths: [
    {
      id: "link",
      label: "Share a screening link",
      steps: [
        {
          title: "Generate a public link",
          description:
            "Create a shareable screening link from your dashboard in seconds.",
        },
        {
          title: "Applicant completes intake",
          description:
            "They submit ID, employment, bank statements, and references through an encrypted form — no app install.",
        },
        {
          title: "Pay your way, get the report",
          description:
            "Cover the report yourself or have the applicant pay at checkout. You receive a decision-ready report when verification finishes.",
        },
      ],
    },
    {
      id: "upload",
      label: "Upload documents",
      steps: [
        {
          title: "Upload for a client or yourself",
          description:
            "Add applicant files on their behalf, or upload your own documents if you are the one being screened.",
        },
        {
          title: "AI analyzes your documents",
          description:
            "Our agent cross-checks identity, employment, banking, and more — building your report in the background.",
        },
        {
          title: "Pay to reveal the full report",
          description:
            "Complete checkout to unlock the full decision-ready report. Cover the fee yourself or pass it to your client.",
        },
      ],
    },
  ],
} as const;

export const features = [
  {
    title: "Social footprint analysis",
    description:
      "Cross-reference public social profiles to surface identity matches, red flags, and behavioral signals.",
  },
  {
    title: "Bank statement intelligence",
    description:
      "Income consistency, recurring obligations, NSF events, and rent-to-income ratios — extracted automatically.",
  },
  {
    title: "Employment verification",
    description:
      "Validate employer, role, and tenure against authoritative sources without long email chains.",
  },
  {
    title: "AI underwriting agent",
    description:
      "Every applicant gets a consistent, bias-aware review built on the same playbook your underwriters would use.",
  },
  {
    title: "Consulate-grade TAT",
    description:
      "Most reports return in hours, not days — so you stop losing good tenants to slower landlords.",
  },
  {
    title: "SOC-minded by design",
    description:
      "Encrypted-in-transit, encrypted-at-rest, and access-controlled. Applicant data is never sold or reused.",
  },
] as const;

export const audiences = [
  {
    slug: "landlords",
    title: "Individual landlords",
    description:
      "List a unit, run a serious check, and pick the right tenant — without paying enterprise prices.",
    href: "/for/landlords",
  },
  {
    slug: "property-managers",
    title: "Property managers",
    description:
      "Standardize screening across every door you manage. One link, one report, one decision.",
    href: "/for/property-managers",
  },
  {
    slug: "smb-operators",
    title: "SMB operators",
    description:
      "Co-living, short-stay, sublets, and roommate matching. Consistent diligence at scale.",
    href: "/for/smb-operators",
  },
] as const;

export const stats = [
  { value: "17M+", label: "eviction filings yearly in the US" },
  { value: "~$7,500", label: "average cost of a bad tenant" },
  { value: "<1 hr", label: "typical screening turnaround" },
  { value: "12+", label: "verification signals per report" },
] as const;
