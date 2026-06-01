import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SquatterAwayLogo } from "@/components/logo";
import { SiteFooter } from "@/components/site/SiteFooter";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
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
        <h1 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
          {title}
        </h1>
        <div className="prose-legal mt-8 space-y-4 text-sm leading-[1.7] text-muted-foreground sm:text-base">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
