import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogCta() {
  return (
    <div className="mt-12 rounded-[16px] border border-border bg-secondary/40 p-8 text-center">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
        Ready to screen smarter?
      </h2>
      <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
        Join the Tenant Radar founding batch and help shape AI tenant screening
        built for U.S. landlords.
      </p>
      <Link
        href="/early-access"
        className="group mt-6 inline-flex items-center gap-2 rounded-[10px] bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:opacity-90"
      >
        Lets solve your problems
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
