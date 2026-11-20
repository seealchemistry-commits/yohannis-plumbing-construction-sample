'use client';

import { useState } from 'react';
import { ChevronDown, PhoneCall } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { useLanguage } from '@/lib/i18n/context';

export default function FaqAccordionSection() {
  const { t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>('FAQ-01');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      data-testid="faq-section"
      aria-labelledby="faq-heading"
      className="border-b border-[rgba(212,175,55,0.22)] bg-[#0E1217] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Sticky Editorial Intro & Direct Emergency Callout */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
              {t.faq.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl"
            >
              {t.faq.heading}
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-[#A1A8B3]">
              {t.faq.description}
            </p>

            <div className="mt-8 rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#161B22] p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.3)] bg-[#0B0D10] text-[#D4AF37]">
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8FAFC]">
                    {t.faq.emergencyCardTitle}
                  </h3>
                  <p className="mt-1.5 text-xs leading-[1.7] text-[#A1A8B3]">
                    {t.faq.emergencyCardBody}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#2A2416] pt-4">
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#D4AF37] px-4 py-2 font-mono text-xs font-bold tabular-nums text-[#0B0D10] transition-colors hover:bg-[#E5C158]"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-[rgba(212,175,55,0.35)] bg-[#0B0D10] px-4 py-2 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  {t.faq.askQuestionBtn}
                </a>
              </div>
            </div>
          </div>

          {/* Right Interactive Accordion List */}
          <div className="space-y-3.5 lg:col-span-8">
            {t.faq.items.map((item) => {
              const isOpen = openFaqId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  data-testid={`faq-item-${item.id}`}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-150 ${
                    isOpen
                      ? 'border-[#D4AF37]/60 bg-[#161B22]'
                      : 'border-[rgba(212,175,55,0.22)] bg-[#12161C] hover:border-[rgba(212,175,55,0.45)]'
                  }`}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(item.id)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <div className="flex items-start gap-3.5 sm:items-center sm:gap-4">
                        <span className="mt-0.5 shrink-0 font-mono text-xs font-bold tabular-nums text-[#D4AF37] sm:mt-0">
                          {item.number}
                        </span>
                        <div>
                          <span className="block text-[11px] font-semibold tracking-wide text-[#D4AF37]">
                            {item.topicLabel}
                          </span>
                          <span className="mt-1 block text-sm font-semibold leading-snug text-[#F8FAFC] sm:text-base">
                            {item.question}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 ${
                          isOpen
                            ? 'border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37]'
                            : 'border-[#2A2416] bg-[#0B0D10] text-[#A1A8B3]'
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#2A2416] px-5 pb-5 pt-4 sm:px-6 sm:pl-14 sm:pb-6">
                          <p className="text-sm leading-[1.8] text-[#A1A8B3]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
