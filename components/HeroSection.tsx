'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { HERO_CAROUSEL_SLIDES } from '@/lib/data/media';
import { useLanguage } from '@/lib/i18n/context';

const SLIDE_INTERVAL_MS = 4500;

interface HeroSectionProps {
  onGetFreeQuote: () => void;
  onEmergencyPlumbing: () => void;
}

const TRUST_ICONS = [ShieldCheck, Zap, Wrench, BadgeCheck] as const;

export default function HeroSection({
  onGetFreeQuote,
  onEmergencyPlumbing,
}: HeroSectionProps) {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const heroCopy = t.contractor.hero;

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
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0B0D10]"
    >
      {/* Mobile Visual Header Frame: clean non-overlapping framing keeping engineer/technician face sharp */}
      <div
        aria-hidden="true"
        data-testid="hero-mobile-visual"
        className="relative h-64 w-full overflow-hidden border-b border-white/[0.08] bg-[#0B0D10] md:hidden"
      >
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
          const isCurrent = activeSlide === idx;
          const isEngineerSlide = slide.id === 'SLIDE-04';
          return (
            <Image
              key={slide.id}
              src={slide.imageUrl}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 1px"
              priority={idx === 0}
              referrerPolicy="no-referrer"
              className={`object-cover transition-opacity duration-1000 ease-out ${
                isEngineerSlide ? 'object-[75%_15%]' : 'object-center'
              } ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
            />
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B0D10]/85 via-[#0B0D10]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0D10] to-transparent" />
      </div>

      {/* Desktop / Tablet Fixed Auto-Sliding Plumbing Photography (zero blur) */}
      <div
        aria-hidden="true"
        data-testid="hero-ambient-backdrop"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden select-none md:block"
      >
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
          const isCurrent = activeSlide === idx;
          const isEngineerSlide = slide.id === 'SLIDE-04';
          return (
            <div
              key={slide.id}
              data-testid={`hero-slide-bg-${idx}`}
              className={`absolute inset-0 ${slide.cssClass} bg-cover bg-fixed transition-opacity duration-1000 ease-out ${
                isEngineerSlide ? 'bg-[72%_18%]' : 'bg-center'
              } ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
            />
          );
        })}

        {/* Directional gradient overlay keeping left copy crisp while right photo shines brightly */}
        <div
          data-testid="hero-dark-overlay"
          className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/85 via-[#0B0D10]/30 to-transparent"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-7 pb-12 sm:px-6 md:pt-18 lg:px-10 lg:pt-24 lg:pb-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
            {heroCopy.eyebrow}
          </p>

          <h1 className="mt-4 text-balance text-3xl font-bold leading-[1.14] tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-[3.25rem]">
            {heroCopy.headline}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-[1.7] tracking-[0.01em] text-[#E2E8F0] sm:text-base">
            {heroCopy.subcopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={onGetFreeQuote}
              data-testid="hero-primary-cta"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-bold text-[#0A0A0B] shadow-[0_14px_34px_-12px_rgba(245,158,11,0.5)] transition-colors hover:bg-[#D97706] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] whitespace-nowrap shrink-0"
            >
              <span>{heroCopy.primaryCta}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onEmergencyPlumbing}
              data-testid="hero-emergency-cta"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-xl border border-[#F59E0B]/45 bg-[#111214]/90 px-6 py-3 text-sm font-semibold text-[#F5F2EB] transition-colors hover:border-[#F59E0B] hover:bg-[#16181D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] whitespace-nowrap shrink-0"
            >
              <AlertTriangle className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              <span>{heroCopy.secondaryCta}</span>
            </button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[#E2E8F0]">
            <span className="inline-flex items-center gap-2 text-[#CBD5E1]">
              <Phone className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              <span>{heroCopy.hotlineLabel}:</span>
            </span>
            <a
              href={COMPANY_INFO.phoneHref}
              className="font-mono tabular-nums font-bold text-[#F8FAFC] transition-colors hover:text-[#F59E0B] hover:underline"
            >
              {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Slide indicator strip */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            data-testid="hero-active-slide-label"
            className="text-xs font-medium text-[#A1A8B3]"
          >
            <span className="font-mono tabular-nums font-bold text-[#F59E0B]">
              0{activeSlide + 1} / 0{HERO_CAROUSEL_SLIDES.length}
            </span>{' '}
            <span aria-hidden="true">·</span>{' '}
            <span>{heroCopy.slideLabels[activeSlide]}</span>
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
                  aria-label={heroCopy.slideLabels[idx]}
                  aria-pressed={selected}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] ${
                    selected
                      ? 'w-8 bg-[#F59E0B]'
                      : 'w-2 bg-white/30 hover:bg-[#F59E0B]/70'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* 4-Column Trust Strip */}
        <div
          data-testid="hero-trust-strip"
          className="mt-8 grid grid-cols-1 gap-3 border-t border-white/[0.1] pt-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {heroCopy.trustStrip.map((label, idx) => {
            const Icon = TRUST_ICONS[idx] ?? ShieldCheck;
            return (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#111214]/90 px-4 py-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#F59E0B]/25 bg-[#F59E0B]/10">
                  <Icon className="h-4.5 w-4.5 text-[#F59E0B]" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold leading-snug text-[#F8FAFC] sm:text-sm">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
