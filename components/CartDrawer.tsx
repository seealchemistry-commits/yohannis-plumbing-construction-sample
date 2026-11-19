'use client';

import { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { ADDIS_SUBCITIES } from '@/lib/booking/schedule';
import {
  calculateCartSummary,
  formatEtb,
  FREE_DELIVERY_THRESHOLD_ETB,
  validateCheckoutInput,
} from '@/lib/commerce/cart';
import type {
  CartItem,
  CheckoutInput,
  OrderRecord,
  PaymentMethod,
} from '@/lib/commerce/types';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, nextQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderConfirmed: (order: OrderRecord) => void;
}

const PAYMENT_OPTIONS: Array<{ id: PaymentMethod; label: string }> = [
  { id: 'TELEBIRR', label: 'ቴሌብር (Telebirr)' },
  { id: 'CBE_BIRR', label: 'ሲቢኢ ብር (CBE Birr)' },
  { id: 'CASH_ON_DELIVERY', label: 'እቃው ሲደርስ በጥሬ ገንዘብ' },
];

export default function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onOrderConfirmed,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [subCity, setSubCity] = useState<string>(ADDIS_SUBCITIES[0]);
  const [addressDetail, setAddressDetail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('TELEBIRR');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof CheckoutInput | 'cart', string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(
    null
  );

  if (!open) return null;

  const summary = calculateCartSummary(cart);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const checkoutPayload: CheckoutInput = {
      customerName,
      phone,
      subCity,
      addressDetail,
      paymentMethod,
    };

    const clientCheck = validateCheckoutInput(checkoutPayload, cart);
    if (!clientCheck.valid) {
      setFieldErrors(clientCheck.errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkout: checkoutPayload,
          items: cart.map((entry) => ({
            productId: entry.product.id,
            quantity: entry.quantity,
          })),
        }),
      });

      const data = (await res.json()) as {
        order?: OrderRecord;
        error?: string;
        fieldErrors?: Partial<Record<keyof CheckoutInput | 'cart', string>>;
      };

      if (!res.ok || !data.order) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error ?? 'ትዕዛዝዎን ማረጋገጥ አልተቻለም።');
        return;
      }

      setConfirmedOrder(data.order);
      onOrderConfirmed(data.order);
      setCustomerName('');
      setPhone('');
      setAddressDetail('');
    } catch {
      setSubmitError('ከሰርቨር ጋር መገናኘት አልተቻለም፤ እባክዎ እንደገና ይሞክሩ።');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="የግብይት ጋሪ እና ክፍያ"
    >
      <div className="flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-slate-800" aria-hidden="true" />
            <h2 className="text-base font-bold text-slate-900">
              የግብይት ጋሪ ({summary.itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label="ጋሪውን ዝጋ"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {confirmedOrder ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    ትዕዛዝዎ በተሳካ ሁኔታ ተመዝግቧል
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-emerald-800">
                    የትዕዛዝ መለያ፡ {confirmedOrder.id}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-emerald-200 pt-4 text-xs text-slate-700">
                <p>
                  ደንበኛ፡ <span className="font-semibold">{confirmedOrder.customerName}</span> ({confirmedOrder.phone})
                </p>
                <p>
                  አድራሻ፡ {confirmedOrder.subCity} · {confirmedOrder.addressDetail}
                </p>
                <p>
                  ጠቅላላ ክፍያ፡{' '}
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {formatEtb(confirmedOrder.totalEtb)}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="mt-5 inline-flex min-h-[40px] w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                ወደ መደብሩ ተመለስ
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-sm font-medium text-slate-900">
                ጋሪዎ በአሁኑ ጊዜ ባዶ ነው
              </p>
              <p className="mt-1 text-xs text-slate-500">
                ከመደብራችን የPPR ቧንቧዎችን፣ ብራስ ቫልቮችን ወይም ፓምፖችን ይምረጡ።
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                እቃዎችን ይመልከቱ
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Free delivery hint */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                {summary.qualifiesForFreeDelivery ? (
                  <span className="font-medium text-emerald-700">
                    ትዕዛዝዎ ከ{formatEtb(FREE_DELIVERY_THRESHOLD_ETB)} በላይ ስለሆነ በአዲስ አበባ ነጻ ትራንስፖርት ያገኛሉ።
                  </span>
                ) : (
                  <span>
                    ለነጻ ትራንስፖርት ተጨማሪ{' '}
                    <strong className="font-mono tabular-nums text-slate-900">
                      {formatEtb(summary.freeDeliveryRemainingEtb)}
                    </strong>{' '}
                    ብቻ ይቀርዎታል።
                  </span>
                )}
              </div>

              {/* Itemized list */}
              <ul className="divide-y divide-slate-200 border-y border-slate-200">
                {cart.map((entry) => (
                  <li
                    key={entry.product.id}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {entry.product.nameAm}
                      </p>
                      <p className="mt-0.5 font-mono tabular-nums text-xs text-slate-500">
                        {formatEtb(entry.product.priceEtb)} × {entry.quantity} ={' '}
                        <span className="font-semibold text-slate-900">
                          {formatEtb(entry.product.priceEtb * entry.quantity)}
                        </span>
                      </p>

                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(entry.product.id, entry.quantity - 1)
                          }
                          aria-label={`ብዛት ቀንስ — ${entry.product.nameAm}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-mono tabular-nums text-xs font-semibold text-slate-900">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(entry.product.id, entry.quantity + 1)
                          }
                          aria-label={`ብዛት ጨምር — ${entry.product.nameAm}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(entry.product.id)}
                      aria-label={`አስወግድ — ${entry.product.nameAm}`}
                      className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>የእቃዎች ድምር</span>
                  <span className="font-mono tabular-nums">
                    {formatEtb(summary.subtotalEtb)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>የትራንስፖርት ዋጋ</span>
                  <span className="font-mono tabular-nums">
                    {summary.deliveryFeeEtb === 0
                      ? 'ነጻ'
                      : formatEtb(summary.deliveryFeeEtb)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                  <span>ጠቅላላ ክፍያ</span>
                  <span className="font-mono tabular-nums">
                    {formatEtb(summary.totalEtb)}
                  </span>
                </div>
              </div>

              {/* Checkout form */}
              <form
                onSubmit={handleSubmitOrder}
                noValidate
                className="space-y-4 border-t border-slate-200 pt-5"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  የማድረሻ እና የክፍያ መረጃ
                </h3>

                {submitError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {submitError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-medium text-slate-700"
                  >
                    ሙሉ ስም
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="ለምሳሌ፡ ዳዊት በቀለ"
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.customerName && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.customerName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-xs font-medium text-slate-700"
                    >
                      ስልክ ቁጥር
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0911234567"
                      className="mt-1 min-h-[40px] w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-subcity"
                      className="block text-xs font-medium text-slate-700"
                    >
                      ክፍለ ከተማ
                    </label>
                    <select
                      id="checkout-subcity"
                      value={subCity}
                      onChange={(e) => setSubCity(e.target.value)}
                      className="mt-1 min-h-[40px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
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
                    htmlFor="checkout-address"
                    className="block text-xs font-medium text-slate-700"
                  >
                    ዝርዝር አድራሻ (ሰፈር / ህንጻ)
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="ለምሳሌ፡ ቦሌ ቡልቡላ 93 ማዞሪያ ሳይት"
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.addressDetail && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.addressDetail}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-payment"
                    className="block text-xs font-medium text-slate-700"
                  >
                    የክፍያ ዘዴ
                  </label>
                  <select
                    id="checkout-payment"
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as PaymentMethod)
                    }
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  >
                    {PAYMENT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                >
                  {submitting
                    ? 'ትዕዛዝዎ በመመዝገብ ላይ...'
                    : `ትዕዛዙን አረጋግጥ (${formatEtb(summary.totalEtb)})`}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
