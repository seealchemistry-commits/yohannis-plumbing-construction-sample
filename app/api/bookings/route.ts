import { NextRequest, NextResponse } from 'next/server';
import { validateBookingInput } from '@/lib/booking/schedule';
import type { BookingInput } from '@/lib/commerce/types';
import { SERVICES } from '@/lib/data/catalog';
import { DEFAULT_LOCALE, getTranslations, isSupportedLocale } from '@/lib/i18n';
import { createBooking, listBookings } from '@/lib/store';

export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json(
      { error: getTranslations(DEFAULT_LOCALE).booking.genericError },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BookingInput> & { locale?: string };
    const locale = isSupportedLocale(body.locale) ? body.locale : DEFAULT_LOCALE;
    const t = getTranslations(locale);
    const service = SERVICES.find((s) => s.id === body.serviceId);

    const input: BookingInput = {
      serviceId: service?.id ?? '',
      serviceTitleAm: service?.titleAm ?? '',
      propertyType: body.propertyType ?? 'RESIDENTIAL',
      preferredDate: body.preferredDate ?? '',
      timeSlot: body.timeSlot ?? '',
      customerName: body.customerName ?? '',
      phone: body.phone ?? '',
      subCity: body.subCity ?? '',
      woreda: body.woreda ?? '',
      neighborhood: body.neighborhood ?? '',
      specificLandmark: body.specificLandmark ?? '',
      notes: body.notes ?? '',
    };

    const todayIso = new Date().toISOString().slice(0, 10);
    const validation = validateBookingInput(input, todayIso, locale);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: t.validation.fillAllRequired,
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const booking = await createBooking(input);
    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: getTranslations(DEFAULT_LOCALE).booking.genericError },
      { status: 500 }
    );
  }
}
