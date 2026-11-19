'use client';

import { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';
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
import { SERVICES } from '@/lib/data/catalog';

interface BookingSectionProps {
  selectedServiceId: string;
  onChangeServiceId: (serviceId: string) => void;
  bookings: BookingRecord[];
  onBookingCreated: (booking: BookingRecord) => void;
}

const PROPERTY_TYPES: Array<{ id: PropertyType; label: string }> = [
  { id: 'RESIDENTIAL', label: 'መኖሪያ ቤት' },
  { id: 'COMMERCIAL', label: 'የንግድ ህንጻ' },
  { id: 'INDUSTRIAL', label: 'ፋብሪካ / መጋዘን' },
];

function getTomorrowIsoDate(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return tomorrow.toISOString().slice(0, 10);
}

export default function BookingSection({
  selectedServiceId,
  onChangeServiceId,
  bookings,
  onBookingCreated,
}: BookingSectionProps) {
  const [propertyType, setPropertyType] = useState<PropertyType>('RESIDENTIAL');
  const [preferredDate, setPreferredDate] = useState(getTomorrowIsoDate);
  const [timeSlot, setTimeSlot] = useState<string>(AVAILABLE_TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [subCity, setSubCity] = useState<string>(ADDIS_SUBCITIES[0]);
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof BookingInput, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingRecord | null>(null);

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
      notes,
    };

    const todayIso = new Date().toISOString().slice(0, 10);
    const check = validateBookingInput(payload, todayIso);
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
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        booking?: BookingRecord;
        error?: string;
        fieldErrors?: Partial<Record<keyof BookingInput, string>>;
      };

      if (!res.ok || !data.booking) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error ?? 'ቀጠሮ ማስመዝገብ አልተቻለም።');
        return;
      }

      setConfirmedBooking(data.booking);
      onBookingCreated(data.booking);
      setCustomerName('');
      setPhone('');
      setNotes('');
    } catch {
      setSubmitError('ከሰርቨር ጋር መገናኘት አልተቻለም፤ እባክዎ እንደገና ይሞክሩ።');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="border-b border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-sky-800">ቀጠሮና የሳይት ፍተሻ</p>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            የባለሙያ ጉብኝት እና የስራ ቀጠሮ ያስይዙ
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            የቧንቧ መስመር ዝርጋታ፣ የፍሳሽ ምርመራ ወይም የህንጻ ግንባታ ምክክር በሚመችዎ ቀንና ሰዓት
            ይምረጡ።
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Booking Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {submitError}
                </p>
              )}

              {confirmedBooking && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        ቀጠሮዎ ተመዝግቧል ·{' '}
                        <span className="font-mono text-emerald-800">
                          {confirmedBooking.id}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        {confirmedBooking.serviceTitleAm} ·{' '}
                        <span className="font-mono">
                          {confirmedBooking.preferredDate}
                        </span>{' '}
                        · {confirmedBooking.timeSlot}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-xs font-medium text-slate-700"
                >
                  የአገልግሎት አይነት
                </label>
                <select
                  id="booking-service"
                  value={selectedServiceId}
                  onChange={(e) => {
                    setConfirmedBooking(null);
                    onChangeServiceId(e.target.value);
                  }}
                  className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                >
                  {SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.number}. {srv.titleAm}
                    </option>
                  ))}
                </select>
                {fieldErrors.serviceId && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.serviceId}
                  </p>
                )}
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-700">
                  የህንጻ / የቦታ አይነት
                </span>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {PROPERTY_TYPES.map((pt) => {
                    const active = propertyType === pt.id;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setPropertyType(pt.id)}
                        className={`min-h-[40px] rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                          active
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-medium text-slate-700"
                  >
                    የሚመችዎ ቀን
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.preferredDate && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-xs font-medium text-slate-700"
                  >
                    የቀጠሮ ሰዓት
                  </label>
                  <select
                    id="booking-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  >
                    {AVAILABLE_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-medium text-slate-700"
                  >
                    ሙሉ ስም
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="ሙሉ ስም"
                    className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.customerName && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-medium text-slate-700"
                  >
                    ስልክ ቁጥር
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911234567"
                    className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-subcity"
                    className="block text-xs font-medium text-slate-700"
                  >
                    ክፍለ ከተማ
                  </label>
                  <select
                    id="booking-subcity"
                    value={subCity}
                    onChange={(e) => setSubCity(e.target.value)}
                    className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  >
                    {ADDIS_SUBCITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-medium text-slate-700"
                >
                  የችግሩ ወይም የፕሮጀክቱ አጭር መግለጫ (አማራጭ)
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ለምሳሌ፡ በ2ኛ ፎቅ የመታጠቢያ ቤት የሞቀ ውሃ መስመር ግፊት ቀንሷል..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
              >
                {submitting ? 'ቀጠሮ በመመዝገብ ላይ...' : 'ቀጠሮውን አረጋግጥ'}
              </button>
            </form>
          </div>

          {/* Scheduled Bookings List */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  የተያዙ የሳይት ቀጠሮዎች
                </h3>
                <span className="font-mono tabular-nums text-xs text-slate-500">
                  {bookings.length}
                </span>
              </div>

              {bookings.length === 0 ? (
                <p className="mt-6 text-xs text-slate-500">
                  እስካሁን የተመዘገበ ቀጠሮ የለም።
                </p>
              ) : (
                <ul
                  data-testid="bookings-list"
                  className="mt-4 divide-y divide-slate-200"
                >
                  {bookings.slice(0, 5).map((item) => (
                    <li key={item.id} className="py-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold text-sky-800">
                          {item.id}
                        </span>
                        <span className="text-xs font-medium text-emerald-700">
                          ተይዟል
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {item.serviceTitleAm}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span className="font-mono tabular-nums">
                            {item.preferredDate}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span>{item.timeSlot}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span>{item.subCity}</span>
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        ደንበኛ · {item.customerName}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-600">
              ለአዲስ አበባ የሳይት ፍተሻ ቀጠሮ ሲያስይዙ መሐንዲሳችን ከመምጣቱ 1 ሰዓት በፊት በስልክ
              ያረጋግጥልዎታል።
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
