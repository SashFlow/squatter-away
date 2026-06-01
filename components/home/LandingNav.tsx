"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SquatterAwayLogo } from "@/components/logo";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 py-4 sm:px-8 md:px-12 transition-all duration-300 ${
        showNav
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl h-8 items-center justify-between">
        <SquatterAwayLogo size="md" variant="light" />

        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/early-access"
            className="rounded-[10px] bg-foreground px-5 py-1.5 text-sm font-semibold text-background transition-all hover:opacity-90"
          >
            Get early access
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        >
          {mobileNavOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="mx-auto max-w-6xl space-y-3 px-1 pt-4 sm:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className="block w-full py-2 text-left text-sm text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/early-access"
            className="block w-full rounded-[10px] bg-foreground px-4 py-2 text-center text-sm font-semibold text-background"
          >
            Get early access
          </Link>
        </div>
      )}
    </nav>
  );
}
