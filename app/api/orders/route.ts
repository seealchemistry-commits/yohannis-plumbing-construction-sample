import { NextRequest, NextResponse } from 'next/server';
import { validateCheckoutInput } from '@/lib/commerce/cart';
import type { CartItem, CheckoutInput } from '@/lib/commerce/types';
import { PRODUCTS } from '@/lib/data/catalog';
import { createOrder, listOrders } from '@/lib/store';

export async function GET() {
  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json(
      { error: 'ትዕዛዞችን ማንበብ አልተቻለም።' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      checkout?: CheckoutInput;
      items?: Array<{ productId: string; quantity: number }>;
    };

    const checkout: CheckoutInput = {
      customerName: body.checkout?.customerName ?? '',
      phone: body.checkout?.phone ?? '',
      subCity: body.checkout?.subCity ?? '',
      addressDetail: body.checkout?.addressDetail ?? '',
      paymentMethod: body.checkout?.paymentMethod ?? 'TELEBIRR',
    };

    const resolvedCart: CartItem[] = [];
    for (const row of body.items ?? []) {
      const product = PRODUCTS.find((p) => p.id === row.productId);
      const qty = Number(row.quantity);
      if (product && Number.isInteger(qty) && qty > 0) {
        resolvedCart.push({
          product,
          quantity: Math.min(qty, product.stockCount),
        });
      }
    }

    const validation = validateCheckoutInput(checkout, resolvedCart);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'እባክዎ የግብይት መረጃዎችን በትክክል ይሙሉ።',
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const order = await createOrder(checkout, resolvedCart);
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'ትዕዛዝዎን ማስመዝገብ አልተቻለም፤ እባክዎ እንደገና ይሞክሩ።' },
      { status: 500 }
    );
  }
}
