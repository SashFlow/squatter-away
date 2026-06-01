import Link from "next/link";
import { TenantRadarLogo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TenantRadarLogo size="sm" variant="light" />
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link
              href="/early-access"
              className="hover:text-foreground transition-colors"
            >
              Early access
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} Tenant Radar. Built for U.S. landlords.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
