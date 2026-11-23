'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, CheckCircle2, Clock, MapPin, ShieldAlert } from 'lucide-react';
import {
  ADDIS_SUBCITIES,
  AVAILABLE_TIME_SLOTS,
  validateBookingInput,
} from '@/lib/booking/schedule';
import type {
  BookingInput,
  BookingRecord,
  PropertyType,
} from '@/lib/commerce/types';
import {
  getLandmarkLabel,
  getLandmarksForSubCity,
  getSubCityLabel,
  getWoredaLabel,
  getWoredasForSubCity,
} from '@/lib/data/addis-addresses';
import { SERVICES } from '@/lib/data/catalog';
import {
  getLocalizedSeededLandmark,
  getLocalizedSeededName,
  getLocalizedServiceTitle,
  getLocalizedTimeSlot,
} from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

interface BookingSectionProps {
  selectedServiceId: string;
  onChangeServiceId: (serviceId: string) => void;
  preferredDate: string;
  onChangePreferredDate: (date: string) => void;
  timeSlot: string;
  onChangeTimeSlot: (slot: string) => void;
  bookings: BookingRecord[];
  onBookingCreated: (booking: BookingRecord) => void;
}

const PROPERTY_TYPE_IDS: PropertyType[] = [
  'RESIDENTIAL',
  'COMMERCIAL',
  'INDUSTRIAL',
];

function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function getTomorrowIsoDate(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return tomorrow.toISOString().slice(0, 10);
}

export default function BookingSection({
  selectedServiceId,
  onChangeServiceId,
  preferredDate,
  onChangePreferredDate,
  timeSlot,
  onChangeTimeSlot,
  bookings,
  onBookingCreated,
}: BookingSectionProps) {
  const { locale, t } = useLanguage();
  const defaultSubCity = ADDIS_SUBCITIES[0];
  const [propertyType, setPropertyType] = useState<PropertyType>('RESIDENTIAL');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [subCity, setSubCity] = useState<string>(defaultSubCity);
  const [woreda, setWoreda] = useState<string>(
    () => getWoredasForSubCity(defaultSubCity)[0]
  );
  const [neighborhood, setNeighborhood] = useState<string>(
    () => getLandmarksForSubCity(defaultSubCity)[0] ?? ''
  );
  const [specificLandmark, setSpecificLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof BookingInput, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingRecord | null>(null);

  const availableWoredas = getWoredasForSubCity(subCity);
  const availableLandmarks = getLandmarksForSubCity(subCity);
  const emergencyTimeSlot = AVAILABLE_TIME_SLOTS[4];
  const isEmergencyMode = timeSlot === emergencyTimeSlot;

  const handleSelectVisitMode = (mode: 'scheduled' | 'emergency') => {
    setConfirmedBooking(null);
    if (mode === 'emergency') {
      onChangePreferredDate(getTodayIsoDate());
      onChangeTimeSlot(emergencyTimeSlot);
    } else {
      onChangePreferredDate(getTomorrowIsoDate());
      if (timeSlot === emergencyTimeSlot) {
        onChangeTimeSlot(AVAILABLE_TIME_SLOTS[0]);
      }
    }
  };

  const handleSubCityChange = (nextSubCity: string) => {
    setSubCity(nextSubCity);
    const nextWoredas = getWoredasForSubCity(nextSubCity);
    const nextLandmarks = getLandmarksForSubCity(nextSubCity);
    setWoreda(nextWoredas[0] ?? '');
    setNeighborhood(nextLandmarks[0] ?? '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setConfirmedBooking(null);

    const activeService =
      SERVICES.find((s) => s.id === selectedServiceId) ?? SERVICES[0];

    const payload: BookingInput = {
      serviceId: activeService.id,
      serviceTitleAm: activeService.titleAm,
      propertyType,
      preferredDate,
      timeSlot,
      customerName,
      phone,
      subCity,
      woreda,
      neighborhood,
      specificLandmark,
      notes,
    };

    const todayIso = new Date().toISOString().slice(0, 10);
    const check = validateBookingInput(payload, todayIso, locale);
    if (!check.valid) {
      setFieldErrors(check.errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      });

      const data = (await res.json()) as {
        booking?: BookingRecord;
        error?: string;
        fieldErrors?: Partial<Record<keyof BookingInput, string>>;
      };

      if (!res.ok || !data.booking) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error ?? t.booking.genericError);
        return;
      }

      setConfirmedBooking(data.booking);
      onBookingCreated(data.booking);
      setCustomerName('');
      setPhone('');
      setSpecificLandmark('');
      setNotes('');
    } catch {
      setSubmitError(t.booking.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      className="overflow-x-clip border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
            {t.booking.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            {t.booking.heading}
          </h2>
          <p className="mt-4 text-sm leading-[1.8] text-[#A1A8B3]">
            {t.booking.description}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Booking Form */}
          <ScrollReveal variant="fade-left" className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#12161C] p-7 sm:p-8 lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {submitError && (
                <p className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs text-red-200">
                  {submitError}
                </p>
              )}

              {confirmedBooking && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#F8FAFC]">
                        {t.booking.confirmedTitle} ·{' '}
                        <span className="font-mono text-[#D4AF37]">
                          {confirmedBooking.id}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-[#F5F2EB]">
                        {getLocalizedServiceTitle(
                          confirmedBooking.serviceId,
                          confirmedBooking.serviceTitleAm,
                          locale
                        )}{' '}
                        ·{' '}
                        <span className="font-mono">
                          {confirmedBooking.preferredDate}
                        </span>{' '}
                        · {getLocalizedTimeSlot(confirmedBooking.timeSlot, locale)}
                      </p>
                      <p className="mt-1 text-xs text-[#A1A8B3]">
                        {t.booking.addressPrefix}:{' '}
                        {getSubCityLabel(confirmedBooking.subCity, locale)} ·{' '}
                        {getWoredaLabel(confirmedBooking.woreda, locale)} ·{' '}
                        {getLandmarkLabel(confirmedBooking.neighborhood, locale)}
                        {confirmedBooking.specificLandmark
                          ? ` (${confirmedBooking.specificLandmark})`
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Urgency Mode Selector: Scheduled Visit vs 24/7 Emergency */}
              <div>
                <span className="block text-xs font-semibold text-[#F5F2EB]">
                  {t.booking.visitModeLabel}
                </span>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    data-testid="booking-mode-scheduled"
                    aria-pressed={!isEmergencyMode}
                    onClick={() => handleSelectVisitMode('scheduled')}
                    className={`flex min-h-[54px] items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      !isEmergencyMode
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F8FAFC]'
                        : 'border-[#2A2416] bg-[#0B0D10] text-[#A1A8B3] hover:border-[#D4AF37]/45 hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Calendar
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        !isEmergencyMode ? 'text-[#D4AF37]' : 'text-[#A1A8B3]'
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#F8FAFC]">
                        {t.booking.scheduledVisitBtn}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[#A1A8B3]">
                        {t.booking.scheduledVisitHint}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    data-testid="booking-mode-emergency"
                    aria-pressed={isEmergencyMode}
                    onClick={() => handleSelectVisitMode('emergency')}
                    className={`flex min-h-[54px] items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      isEmergencyMode
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B0D10]'
                        : 'border-[#2A2416] bg-[#0B0D10] text-[#A1A8B3] hover:border-[#D4AF37]/45 hover:text-[#F8FAFC]'
                    }`}
                  >
                    <ShieldAlert
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        isEmergencyMode ? 'text-[#0B0D10]' : 'text-[#D4AF37]'
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <span
                        className={`block text-xs font-bold ${
                          isEmergencyMode ? 'text-[#0B0D10]' : 'text-[#F8FAFC]'
                        }`}
                      >
                        {t.booking.emergencyVisitBtn}
                      </span>
                      <span
                        className={`mt-0.5 block text-[11px] ${
                          isEmergencyMode ? 'text-[#0B0D10]/80' : 'text-[#A1A8B3]'
                        }`}
                      >
                        {t.booking.emergencyVisitHint}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-xs font-semibold text-[#F5F2EB]"
                >
                  {t.booking.serviceTypeLabel}
                </label>
                <select
                  id="booking-service"
                  value={selectedServiceId}
                  onChange={(e) => {
                    setConfirmedBooking(null);
                    onChangeServiceId(e.target.value);
                  }}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                >
                  {SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.number}.{' '}
                      {getLocalizedServiceTitle(srv.id, srv.titleAm, locale)}
                    </option>
                  ))}
                </select>
                {fieldErrors.serviceId && (
                  <p className="mt-1 text-xs text-red-400">
                    {fieldErrors.serviceId}
                  </p>
                )}
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#F5F2EB]">
                  {t.booking.propertyTypeLabel}
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2.5">
                  {PROPERTY_TYPE_IDS.map((ptId) => {
                    const active = propertyType === ptId;
                    return (
                      <button
                        key={ptId}
                        type="button"
                        onClick={() => setPropertyType(ptId)}
                        className={`min-h-[42px] rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                          active
                            ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B0D10]'
                            : 'border-[#2A2416] bg-[#0B0D10] text-[#A1A8B3] hover:border-[#D4AF37]/50 hover:text-[#F8FAFC]'
                        }`}
                      >
                        {t.booking.propertyTypes[ptId]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-semibold text-[#F5F2EB]"
                  >
                    {t.booking.preferredDateLabel}
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => onChangePreferredDate(e.target.value)}
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 font-mono text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                  />
                  {fieldErrors.preferredDate && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-xs font-semibold text-[#F5F2EB]"
                  >
                    {t.booking.timeSlotLabel}
                  </label>
                  <select
                    id="booking-time"
                    value={timeSlot}
                    onChange={(e) => onChangeTimeSlot(e.target.value)}
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                  >
                    {AVAILABLE_TIME_SLOTS.map((slot, idx) => (
                      <option key={slot} value={slot}>
                        {t.booking.timeSlots[idx] ?? slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-semibold text-[#F5F2EB]"
                  >
                    {t.booking.fullNameLabel}
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.booking.fullNamePlaceholder}
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                  {fieldErrors.customerName && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-semibold text-[#F5F2EB]"
                  >
                    {t.booking.phoneLabel}
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.booking.phonePlaceholder}
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 font-mono text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* 3-Stage Cascading Address Dropdowns + Specific Landmark */}
              <div className="space-y-4 rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-5">
                <p className="text-xs font-bold text-[#D4AF37]">
                  {t.booking.addressBoxTitle}
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-subcity"
                      className="block text-xs font-medium text-[#A1A8B3]"
                    >
                      {t.booking.step1SubCity}
                    </label>
                    <select
                      id="booking-subcity"
                      value={subCity}
                      onChange={(e) => handleSubCityChange(e.target.value)}
                      className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                    >
                      {ADDIS_SUBCITIES.map((city) => (
                        <option key={city} value={city}>
                          {getSubCityLabel(city, locale)}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.subCity && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.subCity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-woreda"
                      className="block text-xs font-medium text-[#A1A8B3]"
                    >
                      {t.booking.step2Woreda}
                    </label>
                    <select
                      id="booking-woreda"
                      value={woreda}
                      onChange={(e) => setWoreda(e.target.value)}
                      className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                    >
                      {availableWoredas.map((w) => (
                        <option key={w} value={w}>
                          {getWoredaLabel(w, locale)}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.woreda && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.woreda}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-neighborhood"
                    className="block text-xs font-medium text-[#A1A8B3]"
                  >
                    {t.booking.step3Neighborhood}
                  </label>
                  <select
                    id="booking-neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                  >
                    {availableLandmarks.map((landmark) => (
                      <option key={landmark} value={landmark}>
                        {getLandmarkLabel(landmark, locale)}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.neighborhood && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.neighborhood}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-specific-landmark"
                    className="block text-xs font-medium text-[#A1A8B3]"
                  >
                    {t.booking.specificLandmarkLabel}
                  </label>
                  <input
                    id="booking-specific-landmark"
                    type="text"
                    value={specificLandmark}
                    onChange={(e) => setSpecificLandmark(e.target.value)}
                    placeholder={t.booking.specificLandmarkPlaceholder}
                    className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-semibold text-[#F5F2EB]"
                >
                  {t.booking.notesLabel}
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.booking.notesPlaceholder}
                  className="mt-2 w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] disabled:opacity-60"
              >
                {submitting ? t.booking.submittingBtn : t.booking.submitBtn}
              </button>
            </form>
          </ScrollReveal>

          {/* Scheduled Bookings List */}
          <ScrollReveal variant="fade-right" delay={0.1} className="flex flex-col justify-between rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-7 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-[#2A2416] pb-4">
                <h3 className="text-sm font-bold text-[#F8FAFC]">
                  {t.booking.scheduledHeading}
                </h3>
                <span className="font-mono tabular-nums text-xs font-semibold text-[#D4AF37]">
                  {bookings.length}
                </span>
              </div>

              {bookings.length === 0 ? (
                <p className="mt-6 text-xs text-[#A1A8B3]">
                  {t.booking.noBookings}
                </p>
              ) : (
                <ul
                  data-testid="bookings-list"
                  className="mt-4 divide-y divide-[#2A2416]"
                >
                  {bookings.slice(0, 5).map((item) => {
                    const landmarkNote = getLocalizedSeededLandmark(
                      item.specificLandmark,
                      locale
                    );
                    return (
                      <li key={item.id} className="py-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-[#D4AF37]">
                            {item.id}
                          </span>
                          <span className="text-xs font-medium text-emerald-400">
                            {t.booking.scheduledStatus}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-[#F8FAFC]">
                          {getLocalizedServiceTitle(
                            item.serviceId,
                            item.serviceTitleAm,
                            locale
                          )}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#A1A8B3]">
                          <span className="inline-flex items-center gap-1">
                            <Calendar
                              className="h-3.5 w-3.5 text-[#D4AF37]"
                              aria-hidden="true"
                            />
                            <span className="font-mono tabular-nums">
                              {item.preferredDate}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock
                              className="h-3.5 w-3.5 text-[#D4AF37]"
                              aria-hidden="true"
                            />
                            <span>
                              {getLocalizedTimeSlot(item.timeSlot, locale)}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin
                              className="h-3.5 w-3.5 text-[#D4AF37]"
                              aria-hidden="true"
                            />
                            <span>
                              {getSubCityLabel(item.subCity, locale)} ·{' '}
                              {getWoredaLabel(item.woreda, locale)} ·{' '}
                              {getLandmarkLabel(item.neighborhood, locale)}
                              {landmarkNote ? ` (${landmarkNote})` : ''}
                            </span>
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-[#A1A8B3]/80">
                          {t.booking.clientPrefix} ·{' '}
                          {getLocalizedSeededName(item.customerName, locale)}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="mt-6 border-t border-[#2A2416] pt-5 text-xs leading-relaxed text-[#A1A8B3]">
              {t.booking.footerNote}
            </div>
          </ScrollReveal>
        </div>

        {/* Section-End CTA Bar */}
        <div
          data-testid="booking-section-cta"
          className="mt-12 flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-semibold text-[#F8FAFC]">
            {t.booking.sectionCtaTitle}
          </p>
          <a
            href="#contact"
            className="inline-flex min-h-[42px] items-center gap-2 self-start rounded-xl border border-[rgba(212,175,55,0.4)] bg-[#161B22] px-5 py-2 text-xs font-bold text-[#F8FAFC] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0D10] whitespace-nowrap shrink-0 sm:self-auto"
          >
            <span>{t.booking.sectionCtaContactBtn}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
