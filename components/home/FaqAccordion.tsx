"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content/faqs";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <article
          key={faq.q}
          className="rounded-[16px] border border-border bg-background"
        >
          <button
            type="button"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            aria-expanded={openFaq === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
              {faq.q}
            </h3>
            <span
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-transform ${openFaq === i ? "rotate-45" : ""}`}
              aria-hidden
            >
              <span className="text-lg leading-none">+</span>
            </span>
          </button>
          <div
            className={`px-6 pb-5 text-sm leading-[1.7] text-muted-foreground ${openFaq === i ? "block" : "hidden"}`}
          >
            {faq.a}
          </div>
        </article>
      ))}
    </div>
  );
}
