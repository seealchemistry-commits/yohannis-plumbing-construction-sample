'use client';

import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

export default function TrustStatsParallaxBanner() {
  const { t } = useLanguage();

  return (
    <section
      id="stats-banner"
      data-testid="stats-parallax-banner"
      className="relative overflow-hidden border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-20 lg:py-24"
    >
      {/* Fixed Parallax Background Layer */}
      <div
        aria-hidden="true"
        data-testid="stats-parallax-bg"
        className="pointer-events-none absolute inset-0 select-none parallax-stats-bg bg-fixed bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        data-testid="stats-parallax-overlay"
        className="pointer-events-none absolute inset-0 bg-black/30"
      />

      {/* Foreground Content Gliding Over Fixed Background */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37] drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            {t.trustBanner.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-3xl">
            {t.trustBanner.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {t.hero.stats.map((stat, idx) => (
            <ScrollReveal key={`${idx}-${stat.value}`} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-[rgba(212,175,55,0.32)] bg-[#0B0D10]/85 p-6">
                <p className="font-mono tabular-nums text-2xl font-bold tracking-tight text-[#D4AF37] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-[#F5F2EB]/90 sm:text-[13px]">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
