'use client';

import { Quote, Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

const STAR_INDEXES = [0, 1, 2, 3, 4] as const;

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="overflow-x-clip border-b border-[rgba(212,175,55,0.22)] bg-[#0E1217] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            {t.testimonials.heading}
          </h2>
          <p className="mt-4 text-sm leading-[1.8] tracking-[0.01em] text-[#A1A8B3]">
            {t.testimonials.description}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.09} className="h-full">
              <article
                data-testid={`testimonial-card-${item.id}`}
                className="flex h-full flex-col justify-between rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-7 transition-colors duration-150 hover:border-[#D4AF37]/55"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-1"
                      aria-label="5 out of 5 stars"
                    >
                      {STAR_INDEXES.map((starIdx) => (
                        <Star
                          key={starIdx}
                          className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <Quote
                      className="h-5 w-5 text-[#D4AF37]/60"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-5 text-sm leading-[1.8] text-[#F5F2EB]/95">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-[#2A2416] pt-4">
                  <p className="text-sm font-bold text-[#F8FAFC]">
                    {item.author}
                  </p>
                  <p className="mt-1 text-xs text-[#A1A8B3]">
                    {item.district} ·{' '}
                    <span className="font-medium text-[#D4AF37]">
                      {item.projectTag}
                    </span>
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
