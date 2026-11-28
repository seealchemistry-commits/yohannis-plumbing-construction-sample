'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { isValidEthiopianPhone } from '@/lib/commerce/cart';
import type { ContactInput } from '@/lib/commerce/types';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { useLanguage } from '@/lib/i18n/context';
import tiratLogoMark from '../public/assets/tirat-logo-mark.png';
import OfficeGoogleMap from './OfficeGoogleMap';
import ScrollReveal from './ScrollReveal';

export interface QuotePreset {
  version: number;
  serviceOption: string;
  subject: string;
  message: string;
}

interface EmergencyAndContactSectionProps {
  mapsApiKey: string;
  quotePreset: QuotePreset | null;
  onEmergencyDispatch: () => void;
  onRequestQuoteFocus: () => void;
}

interface QuoteFormInnerProps {
  initialService: string;
  initialSubject: string;
  initialMessage: string;
  fullName: string;
  phone: string;
  onChangeFullName: (val: string) => void;
  onChangePhone: (val: string) => void;
  onResetSharedFields: () => void;
}

function QuoteFormInner({
  initialService,
  initialSubject,
  initialMessage,
  fullName,
  phone,
  onChangeFullName,
  onChangePhone,
  onResetSharedFields,
}: QuoteFormInnerProps) {
  const { locale, t } = useLanguage();
  const formCopy = t.contractor.quoteForm;
  const serviceOptions = [
    t.contractor.services.unifiedTitle,
    formCopy.emergencySubjectDefault,
    formCopy.realEstateInquiryOption,
  ];

  const [selectedService, setSelectedService] = useState(
    initialService || serviceOptions[0]
  );
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactInput, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sentRefId, setSentRefId] = useState<string | null>(null);

  const handleServiceSelectChange = (nextService: string) => {
    setSelectedService(nextService);
    if (!subject.trim()) {
      setSubject(`${formCopy.quoteSubjectPrefix}: ${nextService}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSentRefId(null);

    const effectiveSubject =
      subject.trim() || `${formCopy.quoteSubjectPrefix}: ${selectedService}`;

    const errs: Partial<Record<keyof ContactInput, string>> = {};
    if (fullName.trim().length < 2) {
      errs.fullName = t.validation.customerNameRequired;
    }
    if (!isValidEthiopianPhone(phone)) {
      errs.phone = t.validation.invalidPhone;
    }
    if (effectiveSubject.length < 3) {
      errs.subject = t.validation.subjectRequired;
    }
    if (message.trim().length < 6) {
      errs.message = t.validation.messageRequired;
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          subject: effectiveSubject,
          message: `[${selectedService}] ${message.trim()}`,
          locale,
        }),
      });
      const data = (await res.json()) as {
        contact?: { id: string };
        error?: string;
        fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      };

      if (!res.ok || !data.contact) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error ?? t.contact.genericError);
        return;
      }

      setSentRefId(data.contact.id);
      onResetSharedFields();
      setSubject('');
      setMessage('');
    } catch {
      setSubmitError(t.contact.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <h3 className="text-lg font-bold text-[#F8FAFC]">
        {t.contact.formTitle}
      </h3>

      {submitError && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs text-red-200"
        >
          {submitError}
        </p>
      )}

      {sentRefId && (
        <div
          data-testid="quote-success-banner"
          className="flex items-start gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-xs text-[#F5F2EB]"
        >
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
            aria-hidden="true"
          />
          <span>
            {t.contact.successMessagePrefix} (
            <strong className="font-mono text-[#F59E0B]">{sentRefId}</strong>)
            {t.contact.successMessageSuffix}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-[#F5F2EB]"
          >
            {t.contact.fullNameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            value={fullName}
            onChange={(e) => onChangeFullName(e.target.value)}
            placeholder={t.contact.fullNamePlaceholder}
            className="mt-2 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#F59E0B] focus:outline-none"
          />
          {fieldErrors.fullName && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold text-[#F5F2EB]"
          >
            {t.contact.phoneInputLabel}
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder={t.contact.phoneInputPlaceholder}
            className="mt-2 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0A0A0B] px-3.5 py-2 font-mono text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#F59E0B] focus:outline-none"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="quote-service-select"
          className="block text-xs font-semibold text-[#F5F2EB]"
        >
          {formCopy.serviceFieldLabel}
        </label>
        <select
          id="quote-service-select"
          value={selectedService}
          onChange={(e) => handleServiceSelectChange(e.target.value)}
          className="mt-2 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[#F8FAFC] focus:border-[#F59E0B] focus:outline-none"
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-xs font-semibold text-[#F5F2EB]"
        >
          {t.contact.subjectLabel}
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t.contact.subjectPlaceholder}
          className="mt-2 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#F59E0B] focus:outline-none"
        />
        {fieldErrors.subject && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-[#F5F2EB]"
        >
          {t.contact.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.contact.messagePlaceholder}
          className="mt-2 w-full rounded-xl border border-white/[0.12] bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#F59E0B] focus:outline-none"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        data-testid="quote-submit-btn"
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-7 py-3 text-sm font-bold text-[#0A0A0B] transition-colors hover:bg-[#D97706] disabled:opacity-60"
      >
        <span>{submitting ? t.contact.sendingBtn : t.contact.sendBtn}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}

export default function EmergencyAndContactSection({
  mapsApiKey,
  quotePreset,
  onEmergencyDispatch,
  onRequestQuoteFocus,
}: EmergencyAndContactSectionProps) {
  const { t } = useLanguage();
  const emergencyCopy = t.contractor.emergencyBanner;
  const closingCopy = t.contractor.closingCta;
  const navCopy = t.contractor.nav;
  const footerCopy = t.contractor.footer;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const formKey = quotePreset?.version ?? 0;

  return (
    <>
      {/* Section 7: Interactive Quote Request Form, Office Contact & Map */}
      <section
        id="contact"
        className="border-b border-white/[0.08] bg-[#0B0D10] py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Closing CTA Intro */}
          <ScrollReveal className="flex flex-col gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
                {closingCopy.eyebrow}
              </p>
              <h2 className="mt-2.5 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
                {closingCopy.headline}
              </h2>
              <p className="mt-3.5 text-sm leading-[1.75] text-[#A1A8B3] sm:text-base">
                {closingCopy.subcopy}
              </p>
            </div>

            <button
              type="button"
              onClick={onRequestQuoteFocus}
              className="inline-flex min-h-[48px] shrink-0 items-center gap-2 self-start rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] lg:self-end whitespace-nowrap"
            >
              <span>{closingCopy.primaryBtn}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </ScrollReveal>

          {/* Two-Column Office Contact + Quote Form */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <ScrollReveal variant="fade-left" className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
                {t.contact.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#F8FAFC]">
                {t.contact.heading}
              </h3>
              <p className="mt-3 text-sm leading-[1.75] text-[#A1A8B3]">
                {t.contact.description}
              </p>

              <dl className="mt-6 space-y-4 border-t border-white/[0.08] pt-6 text-sm">
                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.phoneLabel}
                    </dt>
                    <dd className="mt-0.5 font-mono tabular-nums font-bold text-[#F8FAFC]">
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="hover:text-[#D4AF37] hover:underline"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Send
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.telegramLabel}
                    </dt>
                    <dd className="mt-0.5 font-mono">
                      <a
                        href={COMPANY_INFO.telegramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] hover:text-[#E5C158] hover:underline"
                      >
                        <span>{COMPANY_INFO.telegramHandle}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.officeLabel}
                    </dt>
                    <dd className="mt-0.5 text-[#F5F2EB]">
                      {t.brand.officeAddress}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.emailLabel}
                    </dt>
                    <dd className="mt-0.5 font-mono text-[#F5F2EB]">
                      {COMPANY_INFO.email}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.hoursLabel}
                    </dt>
                    <dd className="mt-0.5 text-[#F5F2EB]">{t.brand.hours}</dd>
                  </div>
                </div>
              </dl>

              {/* Office Location Map Card */}
              <div
                data-testid="office-map-card"
                className="mt-7 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111214]"
              >
                <OfficeGoogleMap apiKey={mapsApiKey} />

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                  <span className="text-xs text-[#A1A8B3]">
                    {t.brand.mapNearby}
                  </span>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#D4AF37]/40 bg-[#16181D] px-3.5 py-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#D4AF37] hover:text-[#0B0D10] whitespace-nowrap shrink-0"
                  >
                    <span>{t.contact.openGoogleMapsBtn}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-[#D4AF37] transition-colors group-hover:text-[#0B0D10]"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="fade-right"
              className="rounded-2xl border border-white/[0.1] bg-[#111214] p-7 sm:p-8 lg:col-span-7"
            >
              <div id="contact-form">
                <QuoteFormInner
                  key={formKey}
                  initialService={quotePreset?.serviceOption ?? ''}
                  initialSubject={quotePreset?.subject ?? ''}
                  initialMessage={quotePreset?.message ?? ''}
                  fullName={fullName}
                  phone={phone}
                  onChangeFullName={setFullName}
                  onChangePhone={setPhone}
                  onResetSharedFields={() => {
                    setFullName('');
                    setPhone('');
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 8: Lower Trust & Emergency Callout Parallax Section Landing Directly Into Footer */}
      <section
        id="emergency"
        data-testid="emergency-parallax-section"
        className="relative overflow-hidden border-b border-white/[0.08] bg-[#0B0D10] py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          data-testid="emergency-parallax-bg"
          className="pointer-events-none absolute inset-0 select-none parallax-emergency-bg bg-cover bg-[center_65%] bg-fixed"
        />
        <div
          aria-hidden="true"
          data-testid="emergency-parallax-overlay"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B0D10]/70 via-[#0B0D10]/25 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                <span>{emergencyCopy.eyebrow}</span>
              </p>
              <h2 className="mt-2.5 text-balance text-2xl font-bold tracking-tight text-[#F8FAFC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-3xl lg:text-4xl">
                {emergencyCopy.headline}
              </h2>
              <p className="mt-3 text-sm leading-[1.75] text-[#F1F5F9] drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-base">
                {emergencyCopy.subcopy}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0B0D10] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.8)] transition-colors hover:bg-[#E5C158] whitespace-nowrap"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="tabular-nums">{emergencyCopy.callNowBtn}</span>
              </a>
              <button
                type="button"
                data-testid="emergency-dispatch-btn"
                onClick={onEmergencyDispatch}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[#D4AF37]/60 bg-[#0B0D10]/85 px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] whitespace-nowrap"
              >
                <span>{emergencyCopy.dispatchBtn}</span>
                <ArrowRight className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Brand & Contracting Footer */}
      <footer className="bg-[#070708] pt-14 pb-24 text-[#A1A8B3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Brand Summary */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5">
                <Image
                  src={tiratLogoMark}
                  alt="ጥራት ፕላምቢንግ"
                  referrerPolicy="no-referrer"
                  className="h-9 w-auto object-contain mix-blend-lighten"
                />
                <span className="text-base font-bold text-[#F8FAFC]">
                  ጥራት ፕላምቢንግ
                </span>
              </div>
              <p className="mt-3.5 max-w-md text-xs leading-[1.75] text-[#A1A8B3]">
                {footerCopy.summary}
              </p>
            </div>

            {/* Contact & Hours */}
            <div className="md:col-span-4">
              <p className="text-xs font-bold tracking-wide text-[#F8FAFC] uppercase">
                {footerCopy.contactHeading}
              </p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="font-mono tabular-nums font-semibold text-[#F59E0B] hover:underline"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="font-mono text-[#CBD5E1]">
                  {COMPANY_INFO.email}
                </li>
                <li>{t.brand.officeAddress}</li>
                <li>
                  <span className="text-[#CBD5E1]">{footerCopy.hoursLabel}:</span>{' '}
                  {t.brand.hours}
                </li>
              </ul>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-3">
              <p className="text-xs font-bold tracking-wide text-[#F8FAFC] uppercase">
                {footerCopy.navigationHeading}
              </p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <a
                    href="#services"
                    className="transition-colors hover:text-[#F59E0B]"
                  >
                    {navCopy.services}
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="transition-colors hover:text-[#F59E0B]"
                  >
                    {navCopy.process}
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="transition-colors hover:text-[#F59E0B]"
                  >
                    {navCopy.projects}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="transition-colors hover:text-[#F59E0B]"
                  >
                    {navCopy.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2.5 border-t border-white/[0.08] pt-6 text-xs text-[#A1A8B3] sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.copyright('2026', 'ጥራት ፕላምቢንግ', t.brand.city)}</p>
            <p data-testid="footer-developer-credit">
              {t.footer.builtByPrefix}{' '}
              <a
                href={t.footer.developerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F5F2EB] underline decoration-[#F59E0B]/45 underline-offset-4 transition-colors hover:text-[#F59E0B] hover:decoration-[#F59E0B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
              >
                {t.footer.developerName}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
