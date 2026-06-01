import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Join the Founding Batch",
  description:
    "Help shape Tenant Radar — the AI tenant screening platform built for U.S. landlords. Eight quick sections, your answers go straight to the team.",
  path: "/early-access",
  noIndex: true,
});

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
