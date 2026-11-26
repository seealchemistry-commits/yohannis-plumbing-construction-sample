'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Bath,
  Droplets,
  Flame,
  Siren,
  Waves,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

interface ServicesGridSectionProps {
  onSelectServiceQuote: (serviceTitle: string) => void;
}

const SERVICE_ICONS = [
  Droplets,
  Waves,
  Wrench,
  Bath,
  Flame,
  Siren,
] as const;

export default function ServicesGridSection({
  onSelectServiceQuote,
}: ServicesGridSectionProps) {
  const { t } = useLanguage();
  const copy = t.contractor.services;
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCard = (cardNumber: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardNumber]: !prev[cardNumber],
    }));
  };

  return (
    <section
      id="services"
      className="border-b border-white/[0.08] bg-[#0D0E11] py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#F59E0B] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-1.5 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl">
            {copy.headline}
          </h2>
          <p className="mt-2 text-sm leading-[1.6] text-[#A1A8B3]">
            {copy.subcopy}
          </p>
        </ScrollReveal>

        <div className="mt-7 grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, idx) => {
            const Icon = SERVICE_ICONS[idx] ?? Wrench;
            const isExpanded = Boolean(expandedCards[item.number]);

            return (
              <ScrollReveal key={item.number} delay={idx * 0.025}>
                <article
                  data-testid={`service-card-${item.number}`}
                  className="rounded-xl border border-white/[0.08] bg-[#111214] p-3.5 transition-colors hover:border-[#F59E0B]/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#F59E0B]/25 bg-[#F59E0B]/10">
                        <Icon className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                      </div>
                      <h3 className="truncate text-sm font-bold leading-tight text-[#F8FAFC]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="shrink-0 font-mono tabular-nums text-[11px] font-bold tracking-wider text-[#F59E0B]/90">
                      {item.number}
                    </span>
                  </div>

                  <p
                    className={`mt-1.5 text-xs leading-[1.45] text-[#A1A8B3] ${
                      isExpanded ? '' : 'line-clamp-1'
                    }`}
                  >
                    {item.description}
                  </p>

                  {isExpanded && (
                    <div
                      data-testid={`service-details-${item.number}`}
                      className="mt-2 border-t border-white/[0.06] pt-2"
                    >
                      <p className="text-xs leading-[1.5] text-[#CBD5E1]">
                        {item.details}
                      </p>
                    </div>
                  )}

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      data-testid={`service-toggle-${item.number}`}
                      aria-expanded={isExpanded}
                      onClick={() => toggleCard(item.number)}
                      className="inline-flex items-center text-[11px] font-semibold tracking-wide text-[#F59E0B] transition-colors hover:text-[#FBBF24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                    >
                      {isExpanded ? copy.seeLessLabel : copy.seeMoreLabel}
                    </button>

                    {isExpanded && (
                      <button
                        type="button"
                        data-testid={`service-quote-${item.number}`}
                        onClick={() => onSelectServiceQuote(item.title)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F59E0B] transition-colors hover:text-[#FBBF24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                      >
                        <span>{copy.requestQuoteBtn}</span>
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
