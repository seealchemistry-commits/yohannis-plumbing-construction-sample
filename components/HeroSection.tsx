'use client';

import Image from 'next/image';
import { ArrowUpRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { useLanguage } from '@/lib/i18n/context';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.07),transparent_58%)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6 lg:pr-4">
            <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-[1.75rem] font-bold leading-[1.3] tracking-[0.012em] text-[#F8FAFC] sm:text-4xl lg:text-[2.65rem]">
              <span className="block">{t.hero.headlineLine1}</span>
              <span className="mt-1 block text-[#F5F2EB]">
                {t.hero.headlineLine2}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.78] tracking-[0.012em] text-[#A1A8B3] sm:text-base">
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
                className="inline-flex min-h-[50px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.42)] bg-[#12161C] px-6 py-3.5 text-sm font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37] hover:bg-[#161B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0"
              >
                <span>{t.hero.secondaryCta}</span>
                <ArrowUpRight className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[#A1A8B3]">
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
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4] lg:min-h-[440px]">
              <Image
                src="/assets/aistudio/image_e54a7d54.png"
                alt={t.hero.imageAlt}
                fill
                priority
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(11,13,16,0.34),transparent_12%,transparent_88%,rgba(11,13,16,0.34)),linear-gradient(to_bottom,rgba(11,13,16,0.24),transparent_12%,transparent_88%,rgba(11,13,16,0.38))]"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column editorial proof strip */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[rgba(212,175,55,0.22)] pt-10 lg:grid-cols-4 lg:gap-10">
          {t.hero.stats.map((stat, idx) => (
            <div
              key={`${idx}-${stat.value}`}
              className={
                idx > 0
                  ? 'lg:border-l lg:border-[rgba(212,175,55,0.22)] lg:pl-8'
                  : ''
              }
            >
              <p className="font-mono tabular-nums text-2xl font-bold tracking-tight text-[#D4AF37]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#A1A8B3]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
