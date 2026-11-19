import { NextRequest, NextResponse } from 'next/server';
import { validateBookingInput } from '@/lib/booking/schedule';
import type { BookingInput } from '@/lib/commerce/types';
import { SERVICES } from '@/lib/data/catalog';
import { createBooking, listBookings } from '@/lib/store';

export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json(
      { error: 'ቀጠሮዎችን ማንበብ አልተቻለም።' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BookingInput>;
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
      notes: body.notes ?? '',
    };

    const todayIso = new Date().toISOString().slice(0, 10);
    const validation = validateBookingInput(input, todayIso);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'እባክዎ የቀጠሮ መረጃዎችን በትክክል ይሙሉ።',
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const booking = await createBooking(input);
    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'ቀጠሮ ማስመዝገብ አልተቻለም፤ እባክዎ እንደገና ይሞክሩ።' },
      { status: 500 }
    );
  }
}
