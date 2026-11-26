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
      className="border-b border-white/[0.08] bg-[#0A0A0B] py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#F59E0B] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-1.5 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl">
            {copy.headline}
          </h2>
          <p className="mt-2.5 text-sm leading-[1.65] text-[#A1A8B3]">
            {copy.intro}
          </p>
        </ScrollReveal>

        <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
          {copy.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx] ?? Users;
            return (
              <ScrollReveal key={pillar.title} delay={idx * 0.04}>
                <div
                  data-testid={`pillar-card-${idx}`}
                  className="h-full rounded-xl border border-white/[0.08] bg-[#111214] p-3.5 sm:p-4 transition-colors hover:border-[#F59E0B]/35"
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
