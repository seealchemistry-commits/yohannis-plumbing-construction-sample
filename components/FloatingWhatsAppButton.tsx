'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { useLanguage } from '@/lib/i18n/context';

interface FloatingWhatsAppButtonProps {
  hidden?: boolean;
}

export default function FloatingWhatsAppButton({
  hidden = false,
}: FloatingWhatsAppButtonProps) {
  const { t } = useLanguage();

  if (hidden) return null;

  const whatsappHref = `${COMPANY_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
    t.whatsapp.prefillText
  )}`;

  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      data-testid="floating-whatsapp-button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group fixed bottom-5 right-5 z-40 inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-2.5 rounded-2xl border border-[#F59E0B]/45 bg-[#111214]/95 p-2.5 text-[#F8FAFC] shadow-[0_18px_42px_-10px_rgba(0,0,0,0.85)] backdrop-blur-md transition-colors hover:border-[#F59E0B] hover:bg-[#16181D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] sm:bottom-7 sm:right-7 sm:px-4 sm:py-2.5"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-[#0A0A0B] shadow-sm transition-transform duration-150 group-hover:scale-105">
        <MessageCircle className="h-4.5 w-4.5 fill-current" aria-hidden="true" />
      </span>
      <span className="hidden text-xs font-bold tracking-wide text-[#F8FAFC] transition-colors group-hover:text-[#F59E0B] sm:inline">
        {t.whatsapp.buttonLabel}
      </span>
    </motion.a>
  );
}
