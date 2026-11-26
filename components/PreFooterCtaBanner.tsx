'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

export default function PreFooterCtaBanner() {
  const { t } = useLanguage();

  return (
    <section
      id="pre-footer-cta"
      data-testid="pre-footer-cta-banner"
      className="relative overflow-hidden border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-20 lg:py-24"
    >
      {/* Fixed Parallax Background Layer */}
      <div
        aria-hidden="true"
        data-testid="pre-footer-cta-parallax-bg"
        className="pointer-events-none absolute inset-0 select-none parallax-cta-bg bg-fixed bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        data-testid="pre-footer-cta-overlay"
        className="pointer-events-none absolute inset-0 bg-black/30"
      />

      {/* Foreground CTA Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-10">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {t.preFooterCta.eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-3xl lg:text-4xl">
            {t.preFooterCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.8] text-[#F5F2EB] drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-base">
            {t.preFooterCta.subtext}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#booking"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-xl bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0B0D10] shadow-[0_12px_32px_-12px_rgba(212,175,55,0.45)] transition-colors hover:bg-[#E5C158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0"
            >
              <span>{t.preFooterCta.primaryBtn}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#shop"
              className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-[rgba(212,175,55,0.45)] bg-[#12161C]/90 px-6 py-3.5 text-sm font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37] hover:bg-[#161B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0"
            >
              {t.preFooterCta.secondaryBtn}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
