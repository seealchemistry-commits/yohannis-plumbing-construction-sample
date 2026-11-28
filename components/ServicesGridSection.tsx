'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

interface ServicesGridSectionProps {
  onSelectServiceQuote: (serviceTitle: string) => void;
}

export default function ServicesGridSection({
  onSelectServiceQuote,
}: ServicesGridSectionProps) {
  const { t } = useLanguage();
  const copy = t.contractor.services;

  return (
    <section
      id="services"
      data-testid="unified-service-block"
      className="border-b border-white/[0.08] bg-[#0E1014] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-3xl border-l-2 border-[#D4AF37]/75 pl-5 sm:pl-7">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#D4AF37]"
              />
              <p className="text-xs font-semibold tracking-[0.1em] text-[#D4AF37] uppercase">
                {copy.eyebrow}
              </p>
            </div>

            <h2 className="mt-3 text-balance text-2xl font-bold leading-[1.22] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              {copy.headline}
            </h2>

            <p
              data-testid="unified-service-summary"
              className="mt-4 max-w-2xl text-sm leading-[1.85] text-[#A1A8B3] sm:text-base"
            >
              {copy.unifiedSummary}
            </p>
          </div>

          <div className="shrink-0 pl-5 sm:pl-7 lg:pl-0">
            <button
              type="button"
              data-testid="unified-service-quote-btn"
              onClick={() => onSelectServiceQuote(copy.unifiedTitle)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap"
            >
              <span>{copy.requestQuoteBtn}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
