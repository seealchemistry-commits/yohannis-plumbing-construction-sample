'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { HERO_CAROUSEL_SLIDES } from '@/lib/data/media';
import { useLanguage } from '@/lib/i18n/context';

const SLIDE_INTERVAL_MS = 4000;

export default function HeroSection() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="home"
      data-active-slide={activeSlide}
      className="relative overflow-hidden border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10]"
    >
      {/* Full-bleed auto-sliding fixed-background parallax carousel */}
      <div
        aria-hidden="true"
        data-testid="hero-ambient-backdrop"
        className="pointer-events-none absolute inset-0 select-none"
      >
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
          const isCurrent = activeSlide === idx;
          return (
            <div
              key={slide.id}
              data-testid={`hero-slide-bg-${idx}`}
              className={`absolute inset-0 ${slide.cssClass} bg-fixed bg-cover bg-center transition-opacity duration-1000 ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}

        {/* Directional dark gradient overlay: strong on left for text legibility, transparent on right so photos shine clearly */}
        <div
          data-testid="hero-dark-overlay"
          className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/85 via-[#0B0D10]/50 to-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10]/25 via-transparent to-[#0B0D10]/45" />
      </div>

      {/* Stationary Hero content layer on left side; right side stays completely open */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-[1.85rem] font-bold leading-[1.28] tracking-[0.012em] text-[#F8FAFC] drop-shadow-sm sm:text-4xl lg:text-[2.75rem]">
            <span className="block">{t.hero.headlineLine1}</span>
            <span className="mt-1 block text-[#F5F2EB]">
              {t.hero.headlineLine2}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.78] tracking-[0.012em] text-[#E2E8F0] sm:text-base">
            {t.hero.subtext}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex min-h-[50px] items-center justify-center rounded-xl bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0B0D10] shadow-[0_12px_32px_-12px_rgba(212,175,55,0.45)] transition-colors hover:bg-[#E5C158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#shop"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.48)] bg-[#12161C]/90 px-6 py-3.5 text-sm font-semibold text-[#F5F2EB] backdrop-blur-sm transition-colors hover:border-[#D4AF37] hover:bg-[#161B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0"
            >
              <span>{t.hero.secondaryCta}</span>
              <ArrowUpRight className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 space-y-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[#E2E8F0]">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                <span>{t.hero.hotlineLabel}</span>
              </span>
              <a
                href={COMPANY_INFO.phoneHref}
                className="font-mono tabular-nums font-bold text-[#F8FAFC] transition-colors hover:text-[#D4AF37] hover:underline hover:decoration-[#D4AF37]"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
            <p
              data-testid="hero-coverage-note"
              className="text-xs leading-relaxed text-[#CBD5E1] sm:text-[13px]"
            >
              {t.hero.coverageNote}
            </p>
          </div>
        </div>

        {/* Auto-sliding Carousel Status & Manual Selector Row */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(212,175,55,0.22)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p
            data-testid="hero-active-slide-label"
            className="text-xs font-medium text-[#A1A8B3]"
          >
            <span className="font-mono tabular-nums font-bold text-[#D4AF37]">
              0{activeSlide + 1} / 0{HERO_CAROUSEL_SLIDES.length}
            </span>{' '}
            <span aria-hidden="true">·</span>{' '}
            <span>{t.hero.slideLabels[activeSlide]}</span>
          </p>

          <div
            role="group"
            aria-label="Hero Carousel Slides"
            className="flex items-center gap-2"
          >
            {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
              const selected = activeSlide === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  data-testid={`hero-slide-dot-${idx}`}
                  aria-label={t.hero.slideLabels[idx]}
                  aria-pressed={selected}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                    selected
                      ? 'w-9 bg-[#D4AF37]'
                      : 'w-2.5 bg-[#A1A8B3]/35 hover:bg-[#D4AF37]/70'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
