'use client';

import {
  CalendarCheck,
  PhoneCall,
  ShieldAlert,
  ShoppingBag,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

interface QuickActionsSectionProps {
  onEmergencyQuickAction: () => void;
}

const ACTION_CONFIG = [
  { id: 'QA-01', href: '#booking', Icon: ShieldAlert, isEmergency: true },
  { id: 'QA-02', href: '#booking', Icon: CalendarCheck, isEmergency: false },
  { id: 'QA-03', href: '#shop', Icon: ShoppingBag, isEmergency: false },
  { id: 'QA-04', href: '#contact', Icon: PhoneCall, isEmergency: false },
] as const;

export default function QuickActionsSection({
  onEmergencyQuickAction,
}: QuickActionsSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="quick-actions"
      data-testid="quick-actions-section"
      className="overflow-x-clip border-b border-[rgba(212,175,55,0.22)] bg-[#0E1217] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
            {t.quickActions.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
            {t.quickActions.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {ACTION_CONFIG.map(({ id, href, Icon, isEmergency }, idx) => {
            const copy = t.quickActions.items[idx];
            if (!copy) return null;

            const cardContent = (
              <>
                <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[rgba(212,175,55,0.45)] bg-[#161B22] text-[#D4AF37] shadow-[0_14px_34px_-12px_rgba(212,175,55,0.28)] transition-all duration-200 group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B0D10]">
                  <Icon className="h-9 w-9" aria-hidden="true" />
                </span>
                <span className="mt-5 text-base font-bold text-[#F8FAFC] transition-colors group-hover:text-[#D4AF37]">
                  {copy.title}
                </span>
                <span className="mt-1.5 max-w-[20ch] text-xs leading-relaxed text-[#A1A8B3]">
                  {copy.subtitle}
                </span>
              </>
            );

            return (
              <ScrollReveal key={id} delay={idx * 0.08}>
                {isEmergency ? (
                  <button
                    type="button"
                    data-testid={`quick-action-${id}`}
                    onClick={onEmergencyQuickAction}
                    className="group flex w-full flex-col items-center rounded-2xl border border-transparent p-4 text-center transition-colors hover:border-[rgba(212,175,55,0.24)] hover:bg-[#12161C]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                  >
                    {cardContent}
                  </button>
                ) : (
                  <a
                    href={href}
                    data-testid={`quick-action-${id}`}
                    className="group flex w-full flex-col items-center rounded-2xl border border-transparent p-4 text-center transition-colors hover:border-[rgba(212,175,55,0.24)] hover:bg-[#12161C]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                  >
                    {cardContent}
                  </a>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
