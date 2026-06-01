export const siteConfig = {
  name: "Tenant Radar",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Tenant Radar is a consulate-grade AI tenant screening platform for U.S. landlords and property managers. Verify identity, employment, bank statements, and social profiles — get a decision-ready report in under an hour.",
  tagline: "Know your tenant before they sign.",
  locale: "en_US",
  author: "Tenant Radar",
  keywords: [
    "tenant screening",
    "AI tenant screening",
    "landlord tenant verification",
    "tenant background check",
    "property manager screening",
    "employment verification renters",
    "bank statement verification rental",
    "tenant screening platform",
  ],
} as const;

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
