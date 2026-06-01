import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SquatterAwayLogo } from "@/components/logo";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";

type AudiencePageProps = {
  title: string;
  description: string;
  path: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export function createAudienceMetadata({
  title,
  description,
  path,
}: Pick<AudiencePageProps, "title" | "description" | "path">): Metadata {
  return createPageMetadata({ title, description, path });
}

export function AudiencePage({
  title,
  path,
  h1,
  intro,
  sections,
  faqs,
}: AudiencePageProps) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
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
            Built for
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            {h1}
          </h1>
          <p className="mt-6 text-base leading-[1.7] text-muted-foreground sm:text-lg">
            {intro}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
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

          <div className="mt-14 rounded-[16px] bg-foreground px-8 py-10 text-center">
            <h2 className="text-xl font-bold text-white">
              Start screening with confidence
            </h2>
            <p className="mt-3 text-sm leading-[1.6] text-white/60">
              Join the founding batch and get early access to AI tenant screening
              built for your workflow.
            </p>
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
