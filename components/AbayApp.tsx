'use client';

import { useEffect, useState } from 'react';
import type { BookingRecord, OrderRecord } from '@/lib/commerce/types';
import { LanguageProvider, useLanguage } from '@/lib/i18n/context';
import AboutPillarsSection from './AboutPillarsSection';
import EmergencyAndContactSection, {
  type QuotePreset,
} from './EmergencyAndContactSection';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import HeroSection from './HeroSection';
import { installGmpQuotaTap } from './OfficeGoogleMap';
import ProcessSection from './ProcessSection';
import ProjectsAndCertificatesSection from './ProjectsAndCertificatesSection';
import ServicesGridSection from './ServicesGridSection';
import SiteHeader from './SiteHeader';
import WhyChooseUsSection from './WhyChooseUsSection';

interface AbayAppProps {
  initialOrders: OrderRecord[];
  initialBookings: BookingRecord[];
  mapsApiKey: string;
}

function AbayAppContent({ mapsApiKey }: AbayAppProps) {
  const { t } = useLanguage();
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [quotePreset, setQuotePreset] = useState<QuotePreset | null>(null);

  useEffect(() => {
    installGmpQuotaTap();
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const scrollToQuoteForm = () => {
    const el = document.getElementById('contact-form') ?? document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      const nameInput = document.getElementById('contact-name');
      if (nameInput instanceof HTMLInputElement) {
        nameInput.focus({ preventScroll: true });
      }
    }, 350);
  };

  const applyQuotePreset = (
    serviceOption: string,
    subject: string,
    message: string
  ) => {
    setQuotePreset((prev) => ({
      version: (prev?.version ?? 0) + 1,
      serviceOption,
      subject,
      message,
    }));
    scrollToQuoteForm();
  };

  const handleRequestGeneralQuote = () => {
    const defaultService = t.contractor.services.items[0].title;
    applyQuotePreset(
      defaultService,
      t.contractor.quoteForm.quoteSubjectPrefix,
      ''
    );
  };

  const handleSelectServiceQuote = (serviceTitle: string) => {
    applyQuotePreset(
      serviceTitle,
      `${t.contractor.quoteForm.quoteSubjectPrefix}: ${serviceTitle}`,
      ''
    );
  };

  const handleEmergencyAction = () => {
    const emergencyService = t.contractor.services.items[5].title;
    applyQuotePreset(
      emergencyService,
      t.contractor.quoteForm.emergencySubjectDefault,
      ''
    );
  };

  const handleRequestProjectQuote = (
    projectTitle: string,
    projectCode: string
  ) => {
    applyQuotePreset(
      t.contractor.quoteForm.realEstateInquiryOption,
      `${t.contractor.quoteForm.similarProjectPrefix}: ${projectTitle} (${projectCode})`,
      ''
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F2EB]">
      {quotaExceeded && (
        <div
          role="alert"
          className="relative z-50 border-b border-[#F59E0B]/40 bg-[#111214] px-4 py-2.5 text-center text-xs text-[#F5F2EB] shadow-sm md:text-sm"
        >
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#F59E0B] underline hover:text-[#FBBF24]"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <SiteHeader onRequestQuote={handleRequestGeneralQuote} />

      <main>
        <HeroSection
          onGetFreeQuote={handleRequestGeneralQuote}
          onEmergencyPlumbing={handleEmergencyAction}
        />

        <AboutPillarsSection />

        <ServicesGridSection onSelectServiceQuote={handleSelectServiceQuote} />

        <WhyChooseUsSection />

        <ProcessSection />

        <ProjectsAndCertificatesSection
          onRequestProjectQuote={handleRequestProjectQuote}
        />

        <EmergencyAndContactSection
          mapsApiKey={mapsApiKey}
          quotePreset={quotePreset}
          onEmergencyDispatch={handleEmergencyAction}
          onRequestQuoteFocus={scrollToQuoteForm}
        />
      </main>

      <FloatingWhatsAppButton />
    </div>
  );
}

export default function AbayApp(props: AbayAppProps) {
  return (
    <LanguageProvider>
      <AbayAppContent {...props} />
    </LanguageProvider>
  );
}
