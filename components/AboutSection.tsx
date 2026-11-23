'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import aboutPlumbingMaterialsImg from '@/src/assets/images/about_plumbing_materials_1795186074742.jpg';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-20 lg:py-28"
    >
      {/* Plumbing materials ambient backdrop */}
      <div
        aria-hidden="true"
        data-testid="about-ambient-backdrop"
        className="pointer-events-none absolute inset-0 select-none"
      >
        <Image
          src={aboutPlumbingMaterialsImg}
          alt=""
          fill
          referrerPolicy="no-referrer"
          sizes="100vw"
          className="object-cover object-center opacity-[0.20]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0B0D10]/85 via-[#0B0D10]/78 to-[#0B0D10]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10]/75 via-transparent to-[#0B0D10]/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal variant="fade-left" className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div
              data-testid="about-photo-1"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#12161C] shadow-lg shadow-black/60"
            >
              <Image
                src="/assets/aistudio/photo_2026-11-19_03-39-11_400c319a.jpg"
                alt={t.about.photo1Alt}
                fill
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="rounded-2xl object-cover object-top"
              />
            </div>
            <div
              data-testid="about-photo-2"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#12161C] shadow-lg shadow-black/60"
            >
              <Image
                src="/assets/aistudio/photo_2026-11-19_03-37-24_305f48e9.jpg"
                alt={t.about.photo2Alt}
                fill
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="rounded-2xl object-cover object-center"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={0.1} className="flex flex-col lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
                {t.about.eyebrow}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
                {t.about.heading}
              </h2>
              <p className="mt-5 text-sm leading-[1.85] tracking-[0.01em] text-[#A1A8B3]">
                {t.about.description}
              </p>
            </div>

            <div className="mt-10 border-t border-[rgba(212,175,55,0.22)] pt-7">
              <h3 className="text-sm font-bold text-[#F8FAFC]">
                {t.about.projectsHeading}
              </h3>
              <div className="mt-4 divide-y divide-[#2A2416] border-y border-[#2A2416]">
                {t.about.projects.map((project, idx) => (
                  <div
                    key={`${idx}-${project.name}`}
                    className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#F5F2EB]">
                        {project.name}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#A1A8B3]">
                        {project.scope}
                      </p>
                    </div>
                    <p className="shrink-0 font-mono tabular-nums text-xs font-semibold text-[#D4AF37]">
                      {project.metric}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Section-End CTA Bar */}
        <div
          data-testid="about-section-cta"
          className="mt-14 flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#12161C]/90 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-semibold text-[#F8FAFC]">
            {t.about.sectionCtaTitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#booking"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] whitespace-nowrap"
            >
              <span>{t.about.sectionCtaBookingBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.35)] bg-[#161B22] px-4 py-2 text-xs font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] whitespace-nowrap"
            >
              {t.about.sectionCtaContactBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
