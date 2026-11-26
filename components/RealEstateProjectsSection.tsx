'use client';

import {
  Building2,
  CheckCircle2,
  Clock3,
  Gauge,
  HardHat,
  Home,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

const PROJECT_ICONS = {
  'RE-01': Building2,
  'RE-02': Home,
  'RE-03': HardHat,
  'RE-04': Gauge,
} as const;

export default function RealEstateProjectsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="real-estate-projects"
      data-testid="real-estate-projects-section"
      className="overflow-x-clip border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
            {t.realEstateProjects.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
            {t.realEstateProjects.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#A1A8B3]">
            {t.realEstateProjects.description}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {t.realEstateProjects.items.map((project, idx) => {
            const Icon = PROJECT_ICONS[project.id];
            const isCompleted = project.status === 'completed';

            return (
              <ScrollReveal key={project.id} delay={idx * 0.08} className="h-full">
                <article
                  data-testid={`real-estate-card-${project.id}`}
                  className="group flex h-full flex-col items-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#12161C]/80 p-6 text-center transition-colors hover:border-[rgba(212,175,55,0.48)] hover:bg-[#161B22]"
                >
                  <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[rgba(212,175,55,0.45)] bg-[#161B22] text-[#D4AF37] shadow-[0_14px_34px_-12px_rgba(212,175,55,0.28)] transition-all duration-200 group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B0D10]">
                    <Icon className="h-9 w-9" aria-hidden="true" />
                  </span>

                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide ${
                      isCompleted ? 'text-[#D4AF37]' : 'text-[#F59E0B]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    )}
                    <span>{project.statusLabel}</span>
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[#F8FAFC] transition-colors group-hover:text-[#D4AF37]">
                    {project.name}
                  </h3>

                  <p className="mt-2 max-w-[26ch] text-xs leading-relaxed text-[#A1A8B3]">
                    {project.scope}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
