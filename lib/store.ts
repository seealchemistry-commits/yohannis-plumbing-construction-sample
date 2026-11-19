import { promises as fs } from 'node:fs';
import path from 'node:path';
import type {
  BookingInput,
  BookingRecord,
  CartItem,
  CheckoutInput,
  ContactInput,
  ContactRecord,
  NotifyRequestInput,
  NotifyRequestRecord,
  OrderRecord,
} from './commerce/types';
import { calculateCartSummary, getProductPriceForSize } from './commerce/cart';
import { generateReferenceCode } from './booking/schedule';

interface PersistedData {
  orders: OrderRecord[];
  bookings: BookingRecord[];
  contacts: ContactRecord[];
  notifyRequests: NotifyRequestRecord[];
}

const DEFAULT_SEED_DATA: PersistedData = {
  orders: [
    {
      id: 'ORD-4821902',
      customerName: 'ዮሐንስ ገብረመድህን',
      phone: '0912453752',
      subCity: 'ቦሌ',
      woreda: 'ወረዳ 03',
      neighborhood: 'ቦሌ ሚካኤል / ቦሌ ቡልቡላ',
      specificLandmark: 'ከሩዋንዳ ድልድይ 150 ሜትር ወደ ቡልቡላ',
      paymentMethod: 'TELEBIRR',
      items: [
        {
          productId: 'PRD-101',
          nameAm: 'PPR የንጹህ ውሃ ቧንቧ (PN20)',
          size: '3/4"',
          quantity: 6,
          unitPriceEtb: 1250,
          lineTotalEtb: 7500,
        },
        {
          productId: 'PRD-102',
          nameAm: 'ፎርጅድ ብራስ ቦል ቫልቭ (Brass Ball Valve)',
          size: '1"',
          quantity: 4,
          unitPriceEtb: 2100,
          lineTotalEtb: 8400,
        },
      ],
      subtotalEtb: 15900,
      deliveryFeeEtb: 0,
      totalEtb: 15900,
      status: 'CONFIRMED',
      createdAt: '2026-11-19T08:30:00.000Z',
    },
  ],
  bookings: [
    {
      id: 'APT-7310401',
      serviceId: 'SRV-05',
      serviceTitleAm:
        'የውሃ ፍሳሽ መለየትና አስቸኳይ ጥገና (24/7 Emergency Leak Repair)',
      propertyType: 'RESIDENTIAL',
      preferredDate: '2026-11-20',
      timeSlot: '03:00 ጠዋት (09:00 AM)',
      customerName: 'ትግስት አሰፋ',
      phone: '0913556677',
      subCity: 'የካ',
      woreda: 'ወረዳ 05',
      neighborhood: 'መገናኛ',
      notes: 'የኩሽና መስመር ግድግዳ ስር እርጥበት ይታያል',
      status: 'SCHEDULED',
      createdAt: '2026-11-19T09:15:00.000Z',
    },
  ],
  contacts: [],
  notifyRequests: [],
};

function resolveStorePath(): string {
  return path.join(process.cwd(), '.data', 'yohannes-plumbing-store.json');
}

const MEMORY_FALLBACK: { data: PersistedData | null } = { data: null };

async function readStore(): Promise<PersistedData> {
  const filePath = resolveStorePath();
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as PersistedData;
    if (!Array.isArray(parsed.notifyRequests)) {
      parsed.notifyRequests = [];
    }
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
      // Read-only fallback
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
    // Graceful no-op
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
    woreda: checkout.woreda.trim(),
    neighborhood: checkout.neighborhood.trim(),
    specificLandmark: checkout.specificLandmark?.trim() || undefined,
    paymentMethod: checkout.paymentMethod,
    items: cart.map((entry) => {
      const unitPriceEtb = getProductPriceForSize(entry.product, entry.size);
      return {
        productId: entry.product.id,
        nameAm: entry.product.nameAm,
        size: entry.size,
        quantity: entry.quantity,
        unitPriceEtb,
        lineTotalEtb: unitPriceEtb * entry.quantity,
      };
    }),
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
    woreda: input.woreda.trim(),
    neighborhood: input.neighborhood.trim(),
    specificLandmark: input.specificLandmark?.trim() || undefined,
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

export async function createNotifyRequest(
  input: NotifyRequestInput
): Promise<NotifyRequestRecord> {
  const store = await readStore();
  const record: NotifyRequestRecord = {
    ...input,
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    id: generateReferenceCode('NTF'),
    createdAt: new Date().toISOString(),
  };

  store.notifyRequests = [record, ...store.notifyRequests];
  await writeStore(store);
  return record;
}
