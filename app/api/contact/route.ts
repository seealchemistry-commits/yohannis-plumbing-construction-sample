import { NextRequest, NextResponse } from 'next/server';
import { isValidEthiopianPhone } from '@/lib/commerce/cart';
import type { ContactInput } from '@/lib/commerce/types';
import { DEFAULT_LOCALE, getTranslations, isSupportedLocale } from '@/lib/i18n';
import { createContactMessage } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactInput> & {
      locale?: string;
    };
    const locale = isSupportedLocale(body.locale) ? body.locale : DEFAULT_LOCALE;
    const t = getTranslations(locale);

    const fullName = (body.fullName ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const subject = (body.subject ?? '').trim();
    const message = (body.message ?? '').trim();

    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    if (fullName.length < 2) {
      fieldErrors.fullName = t.validation.customerNameRequired;
    }
    if (!isValidEthiopianPhone(phone)) {
      fieldErrors.phone = t.validation.invalidPhone;
    }
    if (subject.length < 3) {
      fieldErrors.subject = t.validation.subjectRequired;
    }
    if (message.length < 6) {
      fieldErrors.message = t.validation.messageRequired;
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: t.validation.fillAllRequired,
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const record = await createContactMessage({
      fullName,
      phone,
      subject,
      message,
    });

    return NextResponse.json({ contact: record }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: getTranslations(DEFAULT_LOCALE).contact.genericError },
      { status: 500 }
    );
  }
}
