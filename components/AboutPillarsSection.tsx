'use client';

import { Award, CheckCircle2, Users } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

const PILLAR_ICONS = [Users, Award, CheckCircle2] as const;

export default function AboutPillarsSection() {
  const { t } = useLanguage();
  const copy = t.contractor.aboutPillars;

  return (
    <section
      id="about"
      className="border-b border-white/[0.08] bg-[#0B0D10] py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 text-balance text-2xl font-bold leading-[1.22] tracking-tight text-[#F8FAFC] sm:text-3xl">
            {copy.headline}
          </h2>
          <p className="mt-3 text-sm leading-[1.68] text-[#A1A8B3]">
            {copy.intro}
          </p>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {copy.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx] ?? Users;
            return (
              <ScrollReveal key={pillar.title} delay={idx * 0.03}>
                <div
                  data-testid={`pillar-card-${idx}`}
                  className="h-full rounded-xl border border-white/[0.08] bg-[#111214] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 hover:shadow-[0_12px_28px_-14px_rgba(212,175,55,0.22)]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#F59E0B]/25 bg-[#F59E0B]/10">
                      <Icon className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-[#F8FAFC] sm:text-[15px]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-[1.55] text-[#A1A8B3]">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
