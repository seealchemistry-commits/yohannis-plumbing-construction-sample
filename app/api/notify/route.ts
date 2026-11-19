import { NextRequest, NextResponse } from 'next/server';
import { validateNotifyInput } from '@/lib/booking/schedule';
import type { NotifyRequestInput } from '@/lib/commerce/types';
import { COMING_SOON_SERVICES } from '@/lib/data/catalog';
import { DEFAULT_LOCALE, getTranslations, isSupportedLocale } from '@/lib/i18n';
import { createNotifyRequest } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<NotifyRequestInput> & {
      locale?: string;
    };
    const locale = isSupportedLocale(body.locale) ? body.locale : DEFAULT_LOCALE;
    const t = getTranslations(locale);
    const service = COMING_SOON_SERVICES.find((s) => s.id === body.serviceId);

    const input: NotifyRequestInput = {
      serviceId: service?.id ?? '',
      serviceTitleAm: service?.titleAm ?? '',
      customerName: body.customerName ?? '',
      phone: body.phone ?? '',
    };

    const validation = validateNotifyInput(input, locale);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: t.validation.fillAllRequired,
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const notifyRequest = await createNotifyRequest(input);
    return NextResponse.json({ notifyRequest }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: getTranslations(DEFAULT_LOCALE).servicesSection.notifyModal.genericError },
      { status: 500 }
    );
  }
}
