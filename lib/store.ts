import { promises as fs } from 'node:fs';
import path from 'node:path';
import type {
  BookingInput,
  BookingRecord,
  CheckoutInput,
  CartItem,
  ContactInput,
  ContactRecord,
  OrderRecord,
} from './commerce/types';
import { calculateCartSummary } from './commerce/cart';
import { generateReferenceCode } from './booking/schedule';

interface PersistedData {
  orders: OrderRecord[];
  bookings: BookingRecord[];
  contacts: ContactRecord[];
}

const DEFAULT_SEED_DATA: PersistedData = {
  orders: [
    {
      id: 'ORD-4821902',
      customerName: 'ዮሐንስ ገብረመድህን',
      phone: '0911223344',
      subCity: 'ቦሌ',
      addressDetail: 'ቦሌ ቡልቡላ 93 ማዞሪያ',
      paymentMethod: 'TELEBIRR',
      items: [
        {
          productId: 'PRD-101',
          nameAm: 'PPR የግፊት ውሃ ቧንቧ (32mm PN20)',
          quantity: 6,
          unitPriceEtb: 1250,
          lineTotalEtb: 7500,
        },
        {
          productId: 'PRD-102',
          nameAm: 'ፎርጅድ ብራስ ቦል ቫልቭና መለኪያ ሴት',
          quantity: 3,
          unitPriceEtb: 2850,
          lineTotalEtb: 8550,
        },
      ],
      subtotalEtb: 16050,
      deliveryFeeEtb: 0,
      totalEtb: 16050,
      status: 'CONFIRMED',
      createdAt: '2026-11-18T08:30:00.000Z',
    },
  ],
  bookings: [
    {
      id: 'APT-7310401',
      serviceId: 'SRV-02',
      serviceTitleAm: 'የድንገተኛ ፍሳሽ መለየትና ጥገና',
      propertyType: 'RESIDENTIAL',
      preferredDate: '2026-11-20',
      timeSlot: '03:00 ጠዋት (09:00 AM)',
      customerName: 'ትግስት አሰፋ',
      phone: '0913556677',
      subCity: 'የካ',
      notes: 'የኩሽና መስመር ግድግዳ ስር እርጥበት ይታያል',
      status: 'SCHEDULED',
      createdAt: '2026-11-18T09:15:00.000Z',
    },
  ],
  contacts: [],
};

function resolveStorePath(): string {
  return path.join(process.cwd(), '.data', 'abay-store.json');
}

const MEMORY_FALLBACK: { data: PersistedData | null } = { data: null };

async function readStore(): Promise<PersistedData> {
  const filePath = resolveStorePath();
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as PersistedData;
    MEMORY_FALLBACK.data = parsed;
    return parsed;
  } catch {
    if (MEMORY_FALLBACK.data) {
      return MEMORY_FALLBACK.data;
    }
    const seeded = structuredClone(DEFAULT_SEED_DATA);
    MEMORY_FALLBACK.data = seeded;
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(seeded, null, 2), 'utf-8');
    } catch {
      // Read-only serverless fallback keeps memory store active
    }
    return seeded;
  }
}

async function writeStore(data: PersistedData): Promise<void> {
  MEMORY_FALLBACK.data = data;
  const filePath = resolveStorePath();
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Graceful no-op on read-only file systems
  }
}

export async function listOrders(): Promise<OrderRecord[]> {
  const store = await readStore();
  return store.orders;
}

export async function createOrder(
  checkout: CheckoutInput,
  cart: CartItem[]
): Promise<OrderRecord> {
  const store = await readStore();
  const summary = calculateCartSummary(cart);

  const order: OrderRecord = {
    id: generateReferenceCode('ORD'),
    customerName: checkout.customerName.trim(),
    phone: checkout.phone.trim(),
    subCity: checkout.subCity.trim(),
    addressDetail: checkout.addressDetail.trim(),
    paymentMethod: checkout.paymentMethod,
    items: cart.map((entry) => ({
      productId: entry.product.id,
      nameAm: entry.product.nameAm,
      quantity: entry.quantity,
      unitPriceEtb: entry.product.priceEtb,
      lineTotalEtb: entry.product.priceEtb * entry.quantity,
    })),
    subtotalEtb: summary.subtotalEtb,
    deliveryFeeEtb: summary.deliveryFeeEtb,
    totalEtb: summary.totalEtb,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  };

  store.orders = [order, ...store.orders];
  await writeStore(store);
  return order;
}

export async function listBookings(): Promise<BookingRecord[]> {
  const store = await readStore();
  return store.bookings;
}

export async function createBooking(
  input: BookingInput
): Promise<BookingRecord> {
  const store = await readStore();
  const record: BookingRecord = {
    ...input,
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    subCity: input.subCity.trim(),
    notes: input.notes?.trim() || undefined,
    id: generateReferenceCode('APT'),
    status: 'SCHEDULED',
    createdAt: new Date().toISOString(),
  };

  store.bookings = [record, ...store.bookings];
  await writeStore(store);
  return record;
}

export async function createContactMessage(
  input: ContactInput
): Promise<ContactRecord> {
  const store = await readStore();
  const record: ContactRecord = {
    ...input,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    id: generateReferenceCode('MSG'),
    createdAt: new Date().toISOString(),
  };

  store.contacts = [record, ...store.contacts];
  await writeStore(store);
  return record;
}
