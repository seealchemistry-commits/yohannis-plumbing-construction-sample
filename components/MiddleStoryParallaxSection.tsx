'use client';

import { ArrowRight, Quote, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

interface MiddleStoryParallaxSectionProps {
  onRequestQuote: () => void;
}

export default function MiddleStoryParallaxSection({
  onRequestQuote,
}: MiddleStoryParallaxSectionProps) {
  const { t } = useLanguage();
  const copy = t.contractor.storyBanner;

  return (
    <section
      id="story-highlight"
      data-testid="middle-story-parallax"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0B0D10] py-16 lg:py-20"
    >
      {/* Fixed background photo (zero blur) so only the story card & highlight box scroll over it */}
      <div
        aria-hidden="true"
        data-testid="story-parallax-bg"
        className="pointer-events-none absolute inset-0 select-none parallax-story-bg bg-cover bg-center bg-fixed"
      />
      <div
        aria-hidden="true"
        data-testid="story-parallax-overlay"
        className="pointer-events-none absolute inset-0 bg-black/30"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Left: Story & Quote */}
          <ScrollReveal className="lg:col-span-7">
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#0B0D10]/82 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/50">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
                <Quote className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{copy.eyebrow}</span>
              </div>

              <h2 className="mt-3 text-balance text-xl font-bold leading-[1.28] tracking-tight text-[#F8FAFC] sm:text-2xl lg:text-[1.75rem]">
                {copy.quoteHeadline}
              </h2>

              <p className="mt-3.5 text-sm leading-[1.7] tracking-[0.01em] text-[#E2E8F0]">
                {copy.storyBody}
              </p>

              <p className="mt-4 text-xs font-semibold tracking-wide text-[#D4AF37]">
                {copy.quoteAttribution}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Gold-accented Highlight Box */}
          <ScrollReveal delay={0.05} className="lg:col-span-5">
            <div
              data-testid="story-highlight-box"
              className="rounded-2xl border border-[#D4AF37]/45 bg-[#0B0D10]/88 p-5 sm:p-6 shadow-[0_18px_42px_-14px_rgba(0,0,0,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/65"
            >
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
                <ShieldCheck
                  className="h-4.5 w-4.5 shrink-0 text-[#D4AF37]"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-bold leading-snug tracking-tight text-[#F8FAFC]">
                  {copy.highlightTitle}
                </h3>
              </div>

              <dl className="mt-3.5 space-y-2.5">
                {copy.highlightItems.map((item) => (
                  <div
                    key={item.metric}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#111214]/95 px-3.5 py-2.5 transition-colors hover:border-[#D4AF37]/30"
                  >
                    <dt className="shrink-0 font-mono tabular-nums text-sm font-bold text-[#D4AF37]">
                      {item.metric}
                    </dt>
                    <dd className="text-xs leading-[1.55] text-[#CBD5E1]">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                data-testid="story-highlight-cta"
                onClick={onRequestQuote}
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <span>{copy.highlightCta}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
