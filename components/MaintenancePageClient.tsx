'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { LanguageProvider, useLanguage } from '@/lib/i18n/context';
import {
  buildTelegramHandoffUrl,
  buildWhatsAppHandoffUrl,
  formatClientMaintenanceSummary,
  formatTechnicianApplicationSummary,
  validateClientMaintenanceInput,
  validateTechnicianApplicationInput,
  type ClientMaintenanceFormInput,
  type TechnicianApplicationInput,
} from '@/lib/maintenance/forms';
import tiratLogoMark from '../public/assets/tirat-logo-mark.png';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';

type MaintenanceTab = 'client' | 'technician';

const HIGHLIGHT_ICONS = [UserCheck, Building2, ShieldCheck] as const;

function MaintenancePageContent() {
  const { locale, t } = useLanguage();
  const copy = t.maintenancePage;
  const navCopy = t.contractor.nav;
  const footerCopy = t.contractor.footer;

  const [activeTab, setActiveTab] = useState<MaintenanceTab>('client');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Client Maintenance Request state
  const [facilityIdx, setFacilityIdx] = useState(0);
  const [engagementIdx, setEngagementIdx] = useState(0);
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<keyof ClientMaintenanceFormInput, string>>
  >({});
  const [clientSubmitError, setClientSubmitError] = useState<string | null>(null);
  const [clientSubmitting, setClientSubmitting] = useState(false);
  const [clientRefId, setClientRefId] = useState<string | null>(null);
  const [lastClientSummary, setLastClientSummary] = useState('');

  // Technician Staffing Application state
  const [techName, setTechName] = useState('');
  const [experienceIdx, setExperienceIdx] = useState(1);
  const [specialtyIdx, setSpecialtyIdx] = useState(0);
  const [techPhone, setTechPhone] = useState('');
  const [techArea, setTechArea] = useState('');
  const [techErrors, setTechErrors] = useState<
    Partial<Record<keyof TechnicianApplicationInput, string>>
  >({});
  const [techSubmitError, setTechSubmitError] = useState<string | null>(null);
  const [techSubmitting, setTechSubmitting] = useState(false);
  const [techRefId, setTechRefId] = useState<string | null>(null);
  const [lastTechSummary, setLastTechSummary] = useState('');

  const currentClientInput: ClientMaintenanceFormInput = {
    facilityType: copy.clientForm.facilityTypes[facilityIdx] ?? copy.clientForm.facilityTypes[0],
    engagementType:
      copy.clientForm.engagementTypes[engagementIdx] ?? copy.clientForm.engagementTypes[0],
    location,
    contactName,
    phone: clientPhone,
    notes,
  };

  const currentTechInput: TechnicianApplicationInput = {
    fullName: techName,
    experience:
      copy.technicianForm.experienceOptions[experienceIdx] ??
      copy.technicianForm.experienceOptions[0],
    specialty:
      copy.technicianForm.specialtyOptions[specialtyIdx] ??
      copy.technicianForm.specialtyOptions[0],
    phone: techPhone,
    area: techArea,
  };

  const liveClientSummary =
    lastClientSummary || formatClientMaintenanceSummary(currentClientInput);
  const liveTechSummary =
    lastTechSummary || formatTechnicianApplicationSummary(currentTechInput);

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientSubmitError(null);
    setClientRefId(null);

    const validation = validateClientMaintenanceInput(currentClientInput, t);
    if (!validation.valid) {
      setClientErrors(validation.errors);
      return;
    }

    setClientErrors({});
    setClientSubmitting(true);
    const summary = formatClientMaintenanceSummary(currentClientInput);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: contactName.trim(),
          phone: clientPhone.trim(),
          subject: `Maintenance Request: ${currentClientInput.facilityType} (${currentClientInput.location.trim()})`,
          message: summary,
          locale,
        }),
      });
      const data = (await res.json()) as {
        contact?: { id: string };
        error?: string;
      };

      if (!res.ok || !data.contact) {
        setClientSubmitError(data.error ?? t.contact.genericError);
        return;
      }

      setLastClientSummary(summary);
      setClientRefId(data.contact.id);
      setLocation('');
      setContactName('');
      setClientPhone('');
      setNotes('');
    } catch {
      setClientSubmitError(t.contact.networkError);
    } finally {
      setClientSubmitting(false);
    }
  };

  const handleTechSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTechSubmitError(null);
    setTechRefId(null);

    const validation = validateTechnicianApplicationInput(currentTechInput, t);
    if (!validation.valid) {
      setTechErrors(validation.errors);
      return;
    }

    setTechErrors({});
    setTechSubmitting(true);
    const summary = formatTechnicianApplicationSummary(currentTechInput);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: techName.trim(),
          phone: techPhone.trim(),
          subject: `Technician Staffing Application: ${currentTechInput.specialty}`,
          message: summary,
          locale,
        }),
      });
      const data = (await res.json()) as {
        contact?: { id: string };
        error?: string;
      };

      if (!res.ok || !data.contact) {
        setTechSubmitError(data.error ?? t.contact.genericError);
        return;
      }

      setLastTechSummary(summary);
      setTechRefId(data.contact.id);
      setTechName('');
      setTechPhone('');
      setTechArea('');
    } catch {
      setTechSubmitError(t.contact.networkError);
    } finally {
      setTechSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F2EB]">
      <SiteHeader />

      <main>
        {/* Top Intro & Overview */}
        <section className="border-b border-white/[0.08] bg-[#0B0D10] py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] transition-colors hover:text-[#F59E0B]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{copy.backHomeLabel}</span>
            </Link>

            <div className="mt-5 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#D4AF37] uppercase">
                {copy.eyebrow}
              </p>
              <h1 className="mt-2.5 text-balance text-3xl font-bold leading-[1.18] tracking-tight text-[#F8FAFC] sm:text-4xl">
                {copy.headline}
              </h1>
              <p className="mt-3.5 text-sm leading-[1.7] text-[#CBD5E1] sm:text-base">
                {copy.subcopy}
              </p>
            </div>

            {/* 3 Clean Value Pillars */}
            <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-3">
              {copy.highlights.map((item, idx) => {
                const Icon = HIGHLIGHT_ICONS[idx] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/[0.08] bg-[#111214] p-4 transition-colors hover:border-[#D4AF37]/45"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#F59E0B]/25 bg-[#F59E0B]/10">
                        <Icon className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                      </div>
                      <h2 className="text-sm font-bold text-[#F8FAFC]">{item.title}</h2>
                    </div>
                    <p className="mt-2 text-xs leading-[1.55] text-[#A1A8B3]">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Two-Tab Forms Section */}
        <section className="border-b border-white/[0.08] bg-[#0E1014] py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            {/* Clean Tabs */}
            <div
              role="tablist"
              aria-label={copy.eyebrow}
              className="grid grid-cols-1 gap-2.5 rounded-2xl border border-white/[0.08] bg-[#111214] p-2 sm:grid-cols-2"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'client'}
                data-testid="tab-client-maintenance"
                onClick={() => setActiveTab('client')}
                className={`flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                  activeTab === 'client'
                    ? 'bg-[#D4AF37] text-[#0B0D10]'
                    : 'text-[#CBD5E1] hover:bg-[#16181D] hover:text-[#F8FAFC]'
                }`}
              >
                <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{copy.tabClientLabel}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'technician'}
                data-testid="tab-technician-apply"
                onClick={() => setActiveTab('technician')}
                className={`flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                  activeTab === 'technician'
                    ? 'bg-[#D4AF37] text-[#0B0D10]'
                    : 'text-[#CBD5E1] hover:bg-[#16181D] hover:text-[#F8FAFC]'
                }`}
              >
                <Wrench className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{copy.tabTechnicianLabel}</span>
              </button>
            </div>

            {/* Active Tab Panel */}
            <div
              role="tabpanel"
              className="mt-6 rounded-2xl border border-white/[0.1] bg-[#111214] p-6 sm:p-8"
            >
              {activeTab === 'client' ? (
                <form
                  onSubmit={handleClientSubmit}
                  noValidate
                  data-testid="client-maintenance-form"
                  className="space-y-5"
                >
                  <div className="border-b border-white/[0.08] pb-4">
                    <h2 className="text-xl font-bold text-[#F8FAFC]">
                      {copy.clientForm.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-[1.65] text-[#A1A8B3] sm:text-sm">
                      {copy.clientForm.subtitle}
                    </p>
                  </div>

                  {clientSubmitError && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs text-red-200"
                    >
                      {clientSubmitError}
                    </p>
                  )}

                  {clientRefId && (
                    <div
                      role="status"
                      data-testid="client-maintenance-success"
                      className="rounded-xl border border-emerald-500/40 bg-emerald-950/35 p-4 text-xs text-emerald-100"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-bold text-[#F8FAFC]">
                            {copy.clientForm.successTitle} ·{' '}
                            <span className="font-mono text-[#D4AF37]">
                              {copy.clientForm.refPrefix}: {clientRefId}
                            </span>
                          </p>
                          <p className="mt-1 text-emerald-200/90">
                            {copy.clientForm.successBody}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="client-facility-type"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.clientForm.facilityTypeLabel}
                      </label>
                      <select
                        id="client-facility-type"
                        value={facilityIdx}
                        onChange={(e) => setFacilityIdx(Number(e.target.value))}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {copy.clientForm.facilityTypes.map((label, idx) => (
                          <option key={label} value={idx}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="client-engagement-type"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.clientForm.engagementTypeLabel}
                      </label>
                      <select
                        id="client-engagement-type"
                        value={engagementIdx}
                        onChange={(e) => setEngagementIdx(Number(e.target.value))}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {copy.clientForm.engagementTypes.map((label, idx) => (
                          <option key={label} value={idx}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="client-contact-name"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.clientForm.contactNameLabel}
                      </label>
                      <input
                        id="client-contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={copy.clientForm.contactNamePlaceholder}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                      />
                      {clientErrors.contactName && (
                        <p className="mt-1 text-xs text-red-400">
                          {clientErrors.contactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="client-phone"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.clientForm.phoneLabel}
                      </label>
                      <input
                        id="client-phone"
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder={copy.clientForm.phonePlaceholder}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 font-mono text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                      />
                      {clientErrors.phone && (
                        <p className="mt-1 text-xs text-red-400">
                          {clientErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="client-location"
                      className="block text-xs font-semibold text-[#F8FAFC]"
                    >
                      {copy.clientForm.locationLabel}
                    </label>
                    <input
                      id="client-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={copy.clientForm.locationPlaceholder}
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                    />
                    {clientErrors.location && (
                      <p className="mt-1 text-xs text-red-400">
                        {clientErrors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="client-notes"
                      className="block text-xs font-semibold text-[#F8FAFC]"
                    >
                      {copy.clientForm.notesLabel}
                    </label>
                    <textarea
                      id="client-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={copy.clientForm.notesPlaceholder}
                      className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={clientSubmitting}
                      data-testid="client-maintenance-submit"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-2.5 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {clientSubmitting
                          ? copy.clientForm.submittingBtn
                          : copy.clientForm.submitBtn}
                      </span>
                    </button>

                    <a
                      href={buildTelegramHandoffUrl(
                        COMPANY_INFO.telegramHref,
                        liveClientSummary
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="client-telegram-handoff"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-[#0B0D10] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                      <Send className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                      <span>{copy.clientForm.telegramBtn}</span>
                    </a>

                    <a
                      href={buildWhatsAppHandoffUrl(
                        COMPANY_INFO.whatsappBaseUrl,
                        liveClientSummary
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="client-whatsapp-handoff"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0B0D10] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#25D366]/60 hover:text-[#25D366]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" aria-hidden="true" />
                      <span>{copy.clientForm.whatsappBtn}</span>
                    </a>

                    <a
                      href={COMPANY_INFO.phoneHref}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0B0D10] px-4 py-2.5 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#D4AF37]/50 hover:text-[#F8FAFC]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                      <span className="tabular-nums">{copy.clientForm.callBtn}</span>
                    </a>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleTechSubmit}
                  noValidate
                  data-testid="technician-apply-form"
                  className="space-y-5"
                >
                  <div className="border-b border-white/[0.08] pb-4">
                    <h2 className="text-xl font-bold text-[#F8FAFC]">
                      {copy.technicianForm.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-[1.65] text-[#A1A8B3] sm:text-sm">
                      {copy.technicianForm.subtitle}
                    </p>
                  </div>

                  {techSubmitError && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs text-red-200"
                    >
                      {techSubmitError}
                    </p>
                  )}

                  {techRefId && (
                    <div
                      role="status"
                      data-testid="technician-apply-success"
                      className="rounded-xl border border-emerald-500/40 bg-emerald-950/35 p-4 text-xs text-emerald-100"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-bold text-[#F8FAFC]">
                            {copy.technicianForm.successTitle} ·{' '}
                            <span className="font-mono text-[#D4AF37]">
                              {copy.technicianForm.refPrefix}: {techRefId}
                            </span>
                          </p>
                          <p className="mt-1 text-emerald-200/90">
                            {copy.technicianForm.successBody}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="tech-full-name"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.technicianForm.fullNameLabel}
                      </label>
                      <input
                        id="tech-full-name"
                        type="text"
                        value={techName}
                        onChange={(e) => setTechName(e.target.value)}
                        placeholder={copy.technicianForm.fullNamePlaceholder}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                      />
                      {techErrors.fullName && (
                        <p className="mt-1 text-xs text-red-400">
                          {techErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="tech-phone"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.technicianForm.phoneLabel}
                      </label>
                      <input
                        id="tech-phone"
                        type="tel"
                        value={techPhone}
                        onChange={(e) => setTechPhone(e.target.value)}
                        placeholder={copy.technicianForm.phonePlaceholder}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 font-mono text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                      />
                      {techErrors.phone && (
                        <p className="mt-1 text-xs text-red-400">
                          {techErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="tech-experience"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.technicianForm.experienceLabel}
                      </label>
                      <select
                        id="tech-experience"
                        value={experienceIdx}
                        onChange={(e) => setExperienceIdx(Number(e.target.value))}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {copy.technicianForm.experienceOptions.map((label, idx) => (
                          <option key={label} value={idx}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="tech-specialty"
                        className="block text-xs font-semibold text-[#F8FAFC]"
                      >
                        {copy.technicianForm.specialtyLabel}
                      </label>
                      <select
                        id="tech-specialty"
                        value={specialtyIdx}
                        onChange={(e) => setSpecialtyIdx(Number(e.target.value))}
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {copy.technicianForm.specialtyOptions.map((label, idx) => (
                          <option key={label} value={idx}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="tech-area"
                      className="block text-xs font-semibold text-[#F8FAFC]"
                    >
                      {copy.technicianForm.areaLabel}
                    </label>
                    <input
                      id="tech-area"
                      type="text"
                      value={techArea}
                      onChange={(e) => setTechArea(e.target.value)}
                      placeholder={copy.technicianForm.areaPlaceholder}
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/[0.12] bg-[#0B0D10] px-3.5 text-sm text-[#F8FAFC] placeholder:text-[#6B7280] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={techSubmitting}
                      data-testid="technician-apply-submit"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-2.5 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {techSubmitting
                          ? copy.technicianForm.submittingBtn
                          : copy.technicianForm.submitBtn}
                      </span>
                    </button>

                    <a
                      href={buildTelegramHandoffUrl(
                        COMPANY_INFO.telegramHref,
                        liveTechSummary
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-[#0B0D10] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                      <Send className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                      <span>{copy.technicianForm.telegramBtn}</span>
                    </a>

                    <a
                      href={buildWhatsAppHandoffUrl(
                        COMPANY_INFO.whatsappBaseUrl,
                        liveTechSummary
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0B0D10] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#25D366]/60 hover:text-[#25D366]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" aria-hidden="true" />
                      <span>{copy.technicianForm.whatsappBtn}</span>
                    </a>

                    <a
                      href={COMPANY_INFO.phoneHref}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0B0D10] px-4 py-2.5 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#D4AF37]/50 hover:text-[#F8FAFC]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                      <span className="tabular-nums">{copy.technicianForm.callBtn}</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Clean Brand & Contracting Footer */}
      <footer className="bg-[#070708] pt-14 pb-24 text-[#A1A8B3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
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

            <div className="md:col-span-3">
              <p className="text-xs font-bold tracking-wide text-[#F8FAFC] uppercase">
                {footerCopy.navigationHeading}
              </p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link href="/#services" className="transition-colors hover:text-[#F59E0B]">
                    {navCopy.services}
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="transition-colors hover:text-[#F59E0B]">
                    {navCopy.process}
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="transition-colors hover:text-[#F59E0B]">
                    {navCopy.projects}
                  </Link>
                </li>
                <li>
                  <Link href="/maintenance" className="text-[#F59E0B] hover:underline">
                    {navCopy.maintenance}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="transition-colors hover:text-[#F59E0B]">
                    {navCopy.contact}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.copyright('2019', 'ጥራት ፕላምቢንግ', t.brand.city)}</p>
            <p>
              {t.footer.builtByPrefix}{' '}
              <a
                href={t.footer.developerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F8FAFC] transition-colors hover:text-[#F59E0B]"
              >
                {t.footer.developerName}
              </a>
            </p>
          </div>
        </div>
      </footer>

      <FloatingWhatsAppButton />
    </div>
  );
}

export default function MaintenancePageClient() {
  return (
    <LanguageProvider>
      <MaintenancePageContent />
    </LanguageProvider>
  );
}
