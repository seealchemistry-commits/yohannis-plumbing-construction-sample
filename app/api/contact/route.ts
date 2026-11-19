import { NextRequest, NextResponse } from 'next/server';
import { isValidEthiopianPhone } from '@/lib/commerce/cart';
import type { ContactInput } from '@/lib/commerce/types';
import { createContactMessage } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactInput>;
    const fullName = (body.fullName ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const subject = (body.subject ?? '').trim();
    const message = (body.message ?? '').trim();

    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    if (fullName.length < 2) {
      fieldErrors.fullName = 'እባክዎ ሙሉ ስምዎን ያስገቡ።';
    }
    if (!isValidEthiopianPhone(phone)) {
      fieldErrors.phone = 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (ለምሳሌ 0911234567)።';
    }
    if (subject.length < 3) {
      fieldErrors.subject = 'እባክዎ የመልእክቱን ርዕስ ይግለጹ።';
    }
    if (message.length < 6) {
      fieldErrors.message = 'እባክዎ መልእክትዎን በዝርዝር ይጻፉ።';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: 'እባክዎ ሁሉንም አስፈላጊ ሳጥኖች በትክክል ይሙሉ።',
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
      { error: 'መልእክትዎን መላክ አልተቻለም።' },
      { status: 500 }
    );
  }
}
