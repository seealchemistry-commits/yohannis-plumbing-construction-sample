'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bell, Calendar, Check, CheckCircle2, Clock, X } from 'lucide-react';
import { validateNotifyInput } from '@/lib/booking/schedule';
import type {
  ComingSoonService,
  NotifyRequestInput,
  NotifyRequestRecord,
} from '@/lib/commerce/types';
import {
  COMING_SOON_SERVICES,
  SERVICES,
} from '@/lib/data/catalog';
import { useLanguage } from '@/lib/i18n/context';

interface AboutAndServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function AboutAndServicesSection({
  onSelectServiceForBooking,
}: AboutAndServicesSectionProps) {
  const { locale, t } = useLanguage();
  const [notifyTarget, setNotifyTarget] = useState<ComingSoonService | null>(
    null
  );
  const [notifyName, setNotifyName] = useState('');
  const [notifyPhone, setNotifyPhone] = useState('');
  const [notifyErrors, setNotifyErrors] = useState<
    Partial<Record<keyof NotifyRequestInput, string>>
  >({});
  const [notifySubmitError, setNotifySubmitError] = useState<string | null>(
    null
  );
  const [notifySubmitting, setNotifySubmitting] = useState(false);
  const [notifySuccess, setNotifySuccess] =
    useState<NotifyRequestRecord | null>(null);

  const openNotifyModal = (service: ComingSoonService) => {
    setNotifyTarget(service);
    setNotifyName('');
    setNotifyPhone('');
    setNotifyErrors({});
    setNotifySubmitError(null);
    setNotifySuccess(null);
  };

  const closeNotifyModal = () => {
    setNotifyTarget(null);
    setNotifySuccess(null);
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyTarget) return;

    setNotifySubmitError(null);

    const payload: NotifyRequestInput = {
      serviceId: notifyTarget.id,
      serviceTitleAm: notifyTarget.titleAm,
      customerName: notifyName,
      phone: notifyPhone,
    };

    const check = validateNotifyInput(payload, locale);
    if (!check.valid) {
      setNotifyErrors(check.errors);
      return;
    }

    setNotifyErrors({});
    setNotifySubmitting(true);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      });

      const data = (await res.json()) as {
        notifyRequest?: NotifyRequestRecord;
        error?: string;
        fieldErrors?: Partial<Record<keyof NotifyRequestInput, string>>;
      };

      if (!res.ok || !data.notifyRequest) {
        if (data.fieldErrors) setNotifyErrors(data.fieldErrors);
        setNotifySubmitError(
          data.error ?? t.servicesSection.notifyModal.genericError
        );
        return;
      }

      setNotifySuccess(data.notifyRequest);
      setNotifyName('');
      setNotifyPhone('');
    } catch {
      setNotifySubmitError(t.servicesSection.notifyModal.networkError);
    } finally {
      setNotifySubmitting(false);
    }
  };

  const activeNotifyCopy = notifyTarget
    ? t.servicesSection.comingSoonItems[
        notifyTarget.id as keyof typeof t.servicesSection.comingSoonItems
      ]
    : null;

  return (
    <>
      {/* Services Section */}
      <section
        id="services"
        className="border-b border-[rgba(212,175,55,0.22)] bg-[#12161C] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
              {t.servicesSection.eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              {t.servicesSection.heading}
            </h2>
            <p className="mt-4 text-sm leading-[1.8] tracking-[0.01em] text-[#A1A8B3]">
              {t.servicesSection.description}
            </p>
          </div>

          <div
            data-testid="active-services-grid"
            className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-12"
          >
            {SERVICES.map((service, idx) => {
              const isFullRow = idx === SERVICES.length - 1;
              const localized =
                t.servicesSection.items[
                  service.id as keyof typeof t.servicesSection.items
                ];
              const title = localized?.title ?? service.titleAm;
              const summary = localized?.summary ?? service.summaryAm;
              const deliverables =
                localized?.deliverables ?? service.deliverablesAm;
              const duration =
                localized?.estimatedDuration ?? service.estimatedDurationAm;

              return (
                <article
                  key={service.id}
                  data-testid={`service-card-${service.id}`}
                  className={`flex flex-col justify-between rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-8 transition-colors duration-150 hover:border-[#D4AF37]/55 ${
                    isFullRow ? 'lg:col-span-12' : 'lg:col-span-6'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-[rgba(212,175,55,0.18)] pb-4">
                      <h3 className="text-lg font-semibold leading-snug text-[#F8FAFC]">
                        <span className="mr-2 font-mono tabular-nums text-sm font-bold text-[#D4AF37]">
                          {service.number}.
                        </span>{' '}
                        {title}
                      </h3>
                    </div>

                    <p className="mt-5 text-sm leading-[1.75] text-[#A1A8B3]">
                      {summary}
                    </p>

                    <ul
                      className={`mt-6 gap-3 ${
                        isFullRow
                          ? 'grid grid-cols-1 sm:grid-cols-3'
                          : 'space-y-3'
                      }`}
                    >
                      {deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[#F5F2EB]"
                        >
                          <Check
                            className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2416] pt-5">
                    <span className="text-xs text-[#A1A8B3]">
                      {t.servicesSection.durationPrefix} · {duration}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.35)] bg-[#12161C] px-4 py-2 text-xs font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0D10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0 group"
                    >
                      <Calendar
                        className="h-3.5 w-3.5 text-[#D4AF37] transition-colors group-hover:text-[#0B0D10]"
                        aria-hidden="true"
                      />
                      <span>{t.servicesSection.bookServiceBtn}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Coming Soon Section */}
          <div
            id="coming-soon"
            data-testid="coming-soon-section"
            className="mt-20 border-t border-[rgba(212,175,55,0.22)] pt-16"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
                {t.servicesSection.comingSoonEyebrow}
              </p>
              <h3 className="mt-3 text-balance text-xl font-bold tracking-tight text-[#F8FAFC] sm:text-2xl">
                {t.servicesSection.comingSoonHeading}
              </h3>
              <p className="mt-3 text-sm leading-[1.8] text-[#A1A8B3]">
                {t.servicesSection.comingSoonDescription}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
              {COMING_SOON_SERVICES.map((item) => {
                const localized =
                  t.servicesSection.comingSoonItems[
                    item.id as keyof typeof t.servicesSection.comingSoonItems
                  ];
                return (
                  <article
                    key={item.id}
                    data-testid={`coming-soon-card-${item.id}`}
                    className="flex flex-col justify-between rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-8 transition-colors hover:border-[#D4AF37]/50"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 border-b border-[#2A2416] pb-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#D4AF37]">
                          <Clock
                            className="h-3.5 w-3.5 text-[#D4AF37]"
                            aria-hidden="true"
                          />
                          <span>{t.servicesSection.comingSoonBadge}</span>
                        </span>
                        <span className="text-xs text-[#A1A8B3]">
                          {localized?.subtitle ?? item.subtitleEn}
                        </span>
                      </div>

                      <h4 className="mt-5 text-lg font-semibold text-[#F8FAFC]">
                        {localized?.title ?? item.titleAm}
                      </h4>
                      <p className="mt-3 text-sm leading-[1.75] text-[#A1A8B3]">
                        {localized?.summary ?? item.summaryAm}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2416] pt-5">
                      <span className="text-xs font-medium text-[#A1A8B3]">
                        {localized?.expectedLaunch ?? item.expectedLaunchAm}
                      </span>
                      <button
                        type="button"
                        onClick={() => openNotifyModal(item)}
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.42)] bg-[#12161C] px-4 py-2 text-xs font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0D10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0 group"
                      >
                        <Bell
                          className="h-3.5 w-3.5 text-[#D4AF37] transition-colors group-hover:text-[#0B0D10]"
                          aria-hidden="true"
                        />
                        <span>{t.servicesSection.notifyMeBtn}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About & Proof Section */}
      <section
        id="about"
        className="border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="grid grid-cols-2 gap-4 lg:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]">
                <Image
                  src="/assets/aistudio/photo_2026-11-19_03-39-11_400c319a.jpg"
                  alt={t.about.photo1Alt}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]">
                <Image
                  src="/assets/aistudio/photo_2026-11-19_03-37-24_305f48e9.jpg"
                  alt={t.about.photo2Alt}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-col lg:col-span-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* Notify Me Modal for Coming Soon Services */}
      {notifyTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D10]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${t.servicesSection.notifyModal.ariaPrefix} — ${
            activeNotifyCopy?.title ?? notifyTarget.titleAm
          }`}
        >
          <div className="w-full max-w-md rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#12161C] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#2A2416] pb-4">
              <div>
                <p className="font-mono text-xs font-semibold text-[#D4AF37]">
                  {t.servicesSection.comingSoonBadge} ·{' '}
                  {activeNotifyCopy?.subtitle ?? notifyTarget.subtitleEn}
                </p>
                <h3 className="mt-1 text-base font-bold text-[#F8FAFC]">
                  {activeNotifyCopy?.title ?? notifyTarget.titleAm}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeNotifyModal}
                aria-label={t.servicesSection.notifyModal.closeAriaLabel}
                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-xl border border-[#2A2416] bg-[#161B22] text-[#A1A8B3] hover:border-[#D4AF37]/60 hover:text-[#F8FAFC]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {notifySuccess ? (
              <div className="mt-5 rounded-xl border border-emerald-500/35 bg-emerald-950/40 p-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#F8FAFC]">
                      {t.servicesSection.notifyModal.successTitle}
                    </p>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#D4AF37]">
                      {t.servicesSection.notifyModal.refLabel}: {notifySuccess.id}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#A1A8B3]">
                      {t.servicesSection.notifyModal.successDetail(
                        notifySuccess.phone
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeNotifyModal}
                  className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#0B0D10] hover:bg-[#E5C158]"
                >
                  {t.servicesSection.notifyModal.backBtn}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleNotifySubmit}
                noValidate
                className="mt-5 space-y-4"
              >
                <p className="text-xs leading-relaxed text-[#A1A8B3]">
                  {t.servicesSection.notifyModal.intro}
                </p>

                {notifySubmitError && (
                  <p className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-200">
                    {notifySubmitError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="notify-name"
                    className="block text-xs font-medium text-[#F5F2EB]"
                  >
                    {t.servicesSection.notifyModal.fullNameLabel}
                  </label>
                  <input
                    id="notify-name"
                    type="text"
                    value={notifyName}
                    onChange={(e) => setNotifyName(e.target.value)}
                    placeholder={
                      t.servicesSection.notifyModal.fullNamePlaceholder
                    }
                    className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                  {notifyErrors.customerName && (
                    <p className="mt-1 text-xs text-red-400">
                      {notifyErrors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="notify-phone"
                    className="block text-xs font-medium text-[#F5F2EB]"
                  >
                    {t.servicesSection.notifyModal.phoneLabel}
                  </label>
                  <input
                    id="notify-phone"
                    type="tel"
                    value={notifyPhone}
                    onChange={(e) => setNotifyPhone(e.target.value)}
                    placeholder={t.servicesSection.notifyModal.phonePlaceholder}
                    className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 font-mono text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                  {notifyErrors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {notifyErrors.phone}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeNotifyModal}
                    className="inline-flex min-h-[40px] items-center rounded-xl border border-[#2A2416] bg-[#161B22] px-4 py-2 text-xs font-medium text-[#A1A8B3] hover:text-[#F8FAFC]"
                  >
                    {t.servicesSection.notifyModal.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    disabled={notifySubmitting}
                    className="inline-flex min-h-[40px] items-center rounded-xl bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0B0D10] hover:bg-[#E5C158] disabled:opacity-60"
                  >
                    {notifySubmitting
                      ? t.servicesSection.notifyModal.submittingBtn
                      : t.servicesSection.notifyModal.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
