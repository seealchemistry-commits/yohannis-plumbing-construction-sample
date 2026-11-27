'use client';

import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

export default function WhyChooseUsSection() {
  const { t } = useLanguage();
  const copy = t.contractor.whyChooseUs;

  return (
    <section
      id="why-us"
      className="border-b border-white/[0.08] bg-[#0B0D10] py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 text-balance text-2xl font-bold leading-[1.22] tracking-tight text-[#F8FAFC] sm:text-3xl">
            {copy.headline}
          </h2>
          <p className="mt-2.5 text-sm leading-[1.65] text-[#A1A8B3]">
            {copy.subcopy}
          </p>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, idx) => (
            <ScrollReveal key={item.number} delay={idx * 0.02}>
              <div
                data-testid={`why-card-${item.number}`}
                className="flex h-full items-start gap-3 rounded-xl border border-white/[0.08] bg-[#111214] p-3.5 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 hover:shadow-[0_12px_28px_-14px_rgba(212,175,55,0.22)]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#F59E0B]/30 bg-[#F59E0B]/10 font-mono tabular-nums text-[11px] font-bold text-[#F59E0B]">
                  {item.number}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-snug text-[#F8FAFC]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-[1.5] text-[#A1A8B3]">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
