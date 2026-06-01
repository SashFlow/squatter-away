import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TenantRadarLogo } from "@/components/logo";
import { SiteFooter } from "@/components/site/SiteFooter";

export function BlogLayout({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href: string }[];
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 px-6 py-4 sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog
          </Link>
          <TenantRadarLogo size="sm" variant="light" />
        </div>
      </header>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-3xl px-6 pt-6 text-sm text-muted-foreground sm:px-10"
        >
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-foreground">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <main className="mx-auto max-w-3xl px-6 py-10 pb-16 sm:px-10 sm:py-14">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
