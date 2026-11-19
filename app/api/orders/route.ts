import { NextRequest, NextResponse } from 'next/server';
import { validateCheckoutInput } from '@/lib/commerce/cart';
import {
  PRODUCT_SIZES,
  type CartItem,
  type CheckoutInput,
  type ProductSize,
} from '@/lib/commerce/types';
import { PRODUCTS } from '@/lib/data/catalog';
import { DEFAULT_LOCALE, getTranslations, isSupportedLocale } from '@/lib/i18n';
import { createOrder, listOrders } from '@/lib/store';

export async function GET() {
  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json(
      { error: getTranslations(DEFAULT_LOCALE).cart.genericError },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      locale?: string;
      checkout?: CheckoutInput;
      items?: Array<{
        productId: string;
        size?: ProductSize;
        quantity: number;
      }>;
    };

    const locale = isSupportedLocale(body.locale) ? body.locale : DEFAULT_LOCALE;
    const t = getTranslations(locale);

    const checkout: CheckoutInput = {
      customerName: body.checkout?.customerName ?? '',
      phone: body.checkout?.phone ?? '',
      subCity: body.checkout?.subCity ?? '',
      woreda: body.checkout?.woreda ?? '',
      neighborhood: body.checkout?.neighborhood ?? '',
      specificLandmark: body.checkout?.specificLandmark ?? '',
      paymentMethod: body.checkout?.paymentMethod ?? 'TELEBIRR',
    };

    const resolvedCart: CartItem[] = [];
    for (const row of body.items ?? []) {
      const product = PRODUCTS.find((p) => p.id === row.productId);
      const qty = Number(row.quantity);
      const size: ProductSize = PRODUCT_SIZES.includes(
        row.size as ProductSize
      )
        ? (row.size as ProductSize)
        : '1/2"';
      if (product && Number.isInteger(qty) && qty > 0) {
        resolvedCart.push({
          product,
          size,
          quantity: Math.min(qty, product.stockCount),
        });
      }
    }

    const validation = validateCheckoutInput(checkout, resolvedCart, locale);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: t.validation.fillAllRequired,
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const order = await createOrder(checkout, resolvedCart);
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: getTranslations(DEFAULT_LOCALE).cart.genericError },
      { status: 500 }
    );
  }
}
