'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { ADDIS_SUBCITIES } from '@/lib/booking/schedule';
import {
  calculateCartSummary,
  formatEtb,
  FREE_DELIVERY_THRESHOLD_ETB,
  getProductPriceForSize,
  validateCheckoutInput,
} from '@/lib/commerce/cart';
import type {
  CartItem,
  CheckoutInput,
  OrderRecord,
  PaymentMethod,
  ProductSize,
} from '@/lib/commerce/types';
import {
  getLandmarkLabel,
  getLandmarksForSubCity,
  getSubCityLabel,
  getWoredaLabel,
  getWoredasForSubCity,
} from '@/lib/data/addis-addresses';
import { getLocalizedProductName } from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n/context';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, size: ProductSize, nextQty: number) => void;
  onRemoveItem: (productId: string, size: ProductSize) => void;
  onOrderConfirmed: (order: OrderRecord) => void;
}

const PAYMENT_METHOD_IDS: PaymentMethod[] = [
  'TELEBIRR',
  'CBE_BIRR',
  'CASH_ON_DELIVERY',
];

export default function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onOrderConfirmed,
}: CartDrawerProps) {
  const { locale, t } = useLanguage();
  const defaultSubCity = ADDIS_SUBCITIES[0];
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [subCity, setSubCity] = useState<string>(defaultSubCity);
  const [woreda, setWoreda] = useState<string>(
    () => getWoredasForSubCity(defaultSubCity)[0]
  );
  const [neighborhood, setNeighborhood] = useState<string>(
    () => getLandmarksForSubCity(defaultSubCity)[0] ?? ''
  );
  const [specificLandmark, setSpecificLandmark] = useState('');
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
  const availableWoredas = getWoredasForSubCity(subCity);
  const availableLandmarks = getLandmarksForSubCity(subCity);

  const handleSubCityChange = (nextSubCity: string) => {
    setSubCity(nextSubCity);
    const nextWoredas = getWoredasForSubCity(nextSubCity);
    const nextLandmarks = getLandmarksForSubCity(nextSubCity);
    setWoreda(nextWoredas[0] ?? '');
    setNeighborhood(nextLandmarks[0] ?? '');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const checkoutPayload: CheckoutInput = {
      customerName,
      phone,
      subCity,
      woreda,
      neighborhood,
      specificLandmark,
      paymentMethod,
    };

    const clientCheck = validateCheckoutInput(checkoutPayload, cart, locale);
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
          locale,
          checkout: checkoutPayload,
          items: cart.map((entry) => ({
            productId: entry.product.id,
            size: entry.size,
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
        setSubmitError(data.error ?? t.cart.genericError);
        return;
      }

      setConfirmedOrder(data.order);
      onOrderConfirmed(data.order);
      setCustomerName('');
      setPhone('');
      setSpecificLandmark('');
    } catch {
      setSubmitError(t.cart.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0B0D10]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.dialogAriaLabel}
    >
      <div className="flex h-full w-full max-w-lg flex-col border-l border-[rgba(212,175,55,0.3)] bg-[#12161C] text-[#F5F2EB] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A2416] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
            <h2 className="text-base font-bold text-[#F8FAFC]">
              {t.cart.title(summary.itemCount)}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label={t.cart.closeAriaLabel}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-[#2A2416] bg-[#161B22] text-[#A1A8B3] hover:border-[#D4AF37]/60 hover:text-[#F8FAFC]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {confirmedOrder ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-[#F8FAFC]">
                    {t.cart.orderConfirmedTitle}
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-[#D4AF37]">
                    {t.cart.orderIdLabel}: {confirmedOrder.id}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-emerald-500/25 pt-4 text-xs text-[#F5F2EB]">
                <p>
                  {t.cart.customerLabel}:{' '}
                  <span className="font-semibold">
                    {confirmedOrder.customerName}
                  </span>{' '}
                  ({confirmedOrder.phone})
                </p>
                <p className="text-[#A1A8B3]">
                  {t.cart.addressLabel}:{' '}
                  {getSubCityLabel(confirmedOrder.subCity, locale)} ·{' '}
                  {getWoredaLabel(confirmedOrder.woreda, locale)} ·{' '}
                  {getLandmarkLabel(confirmedOrder.neighborhood, locale)}
                  {confirmedOrder.specificLandmark
                    ? ` (${confirmedOrder.specificLandmark})`
                    : ''}
                </p>
                <p>
                  {t.cart.totalPaidLabel}:{' '}
                  <span className="font-mono tabular-nums font-bold text-[#D4AF37]">
                    {formatEtb(confirmedOrder.totalEtb, locale)}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="mt-5 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#0B0D10] hover:bg-[#E5C158]"
              >
                {t.cart.backToShopBtn}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-8 text-center">
              <p className="text-sm font-semibold text-[#F8FAFC]">
                {t.cart.emptyTitle}
              </p>
              <p className="mt-1.5 text-xs text-[#A1A8B3]">{t.cart.emptyHint}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 inline-flex min-h-[42px] items-center rounded-xl bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0B0D10] hover:bg-[#E5C158]"
              >
                {t.cart.browseProductsBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Free delivery hint */}
              <div className="rounded-xl border border-[#2A2416] bg-[#161B22] px-4 py-3 text-xs text-[#A1A8B3]">
                {summary.qualifiesForFreeDelivery ? (
                  <span className="font-medium text-emerald-400">
                    {t.cart.freeDeliveryQualified(
                      formatEtb(FREE_DELIVERY_THRESHOLD_ETB, locale)
                    )}
                  </span>
                ) : (
                  <span>
                    {t.cart.freeDeliveryRemainingPrefix}{' '}
                    <strong className="font-mono tabular-nums text-[#D4AF37]">
                      {formatEtb(summary.freeDeliveryRemainingEtb, locale)}
                    </strong>{' '}
                    {t.cart.freeDeliveryRemainingSuffix}
                  </span>
                )}
              </div>

              {/* Itemized list */}
              <ul className="divide-y divide-[#2A2416] border-y border-[#2A2416]">
                {cart.map((entry) => {
                  const unitPrice = getProductPriceForSize(
                    entry.product,
                    entry.size
                  );
                  const productName = getLocalizedProductName(
                    entry.product.id,
                    entry.product.nameAm,
                    locale
                  );
                  return (
                    <li
                      key={`${entry.product.id}-${entry.size}`}
                      className="flex items-start justify-between gap-4 py-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#F8FAFC]">
                          {productName}
                        </p>
                        <p className="mt-0.5 text-xs text-[#A1A8B3]">
                          {t.cart.sizeLabel}{' '}
                          <span className="font-mono font-semibold text-[#D4AF37]">
                            {entry.size}
                          </span>
                        </p>
                        <p className="mt-0.5 font-mono tabular-nums text-xs text-[#A1A8B3]">
                          {formatEtb(unitPrice, locale)} × {entry.quantity} ={' '}
                          <span className="font-semibold text-[#F8FAFC]">
                            {formatEtb(unitPrice * entry.quantity, locale)}
                          </span>
                        </p>

                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(
                                entry.product.id,
                                entry.size,
                                entry.quantity - 1
                              )
                            }
                            aria-label={t.cart.decreaseQtyAria(
                              productName,
                              entry.size
                            )}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2416] bg-[#161B22] text-[#F5F2EB] hover:border-[#D4AF37]/60"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center font-mono tabular-nums text-xs font-semibold text-[#F8FAFC]">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(
                                entry.product.id,
                                entry.size,
                                entry.quantity + 1
                              )
                            }
                            aria-label={t.cart.increaseQtyAria(
                              productName,
                              entry.size
                            )}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2416] bg-[#161B22] text-[#F5F2EB] hover:border-[#D4AF37]/60"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onRemoveItem(entry.product.id, entry.size)
                        }
                        aria-label={t.cart.removeItemAria(
                          productName,
                          entry.size
                        )}
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-[#A1A8B3] hover:bg-red-950/50 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#A1A8B3]">
                  <span>{t.cart.subtotalLabel}</span>
                  <span className="font-mono tabular-nums">
                    {formatEtb(summary.subtotalEtb, locale)}
                  </span>
                </div>
                <div className="flex justify-between text-[#A1A8B3]">
                  <span>{t.cart.deliveryFeeLabel}</span>
                  <span className="font-mono tabular-nums">
                    {summary.deliveryFeeEtb === 0
                      ? t.cart.freeLabel
                      : formatEtb(summary.deliveryFeeEtb, locale)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#2A2416] pt-2.5 text-base font-bold text-[#F8FAFC]">
                  <span>{t.cart.totalLabel}</span>
                  <span className="font-mono tabular-nums text-[#D4AF37]">
                    {formatEtb(summary.totalEtb, locale)}
                  </span>
                </div>
              </div>

              {/* Checkout form with 3-stage cascading Addis Ababa address */}
              <form
                onSubmit={handleSubmitOrder}
                noValidate
                className="space-y-4 border-t border-[#2A2416] pt-5"
              >
                <h3 className="text-sm font-semibold text-[#F8FAFC]">
                  {t.cart.checkoutHeading}
                </h3>

                {submitError && (
                  <p className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-200">
                    {submitError}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-xs font-medium text-[#F5F2EB]"
                    >
                      {t.cart.fullNameLabel}
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.cart.fullNamePlaceholder}
                      className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                    />
                    {fieldErrors.customerName && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-xs font-medium text-[#F5F2EB]"
                    >
                      {t.cart.phoneLabel}
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.cart.phonePlaceholder}
                      className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 font-mono text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3-Stage Cascading Address Dropdowns + Specific Landmark */}
                <div className="space-y-3.5 rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-4">
                  <p className="text-xs font-bold text-[#D4AF37]">
                    {t.cart.deliveryAddressTitle}
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="checkout-subcity"
                        className="block text-xs font-medium text-[#A1A8B3]"
                      >
                        {t.booking.step1SubCity}
                      </label>
                      <select
                        id="checkout-subcity"
                        value={subCity}
                        onChange={(e) => handleSubCityChange(e.target.value)}
                        className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {ADDIS_SUBCITIES.map((city) => (
                          <option key={city} value={city}>
                            {getSubCityLabel(city, locale)}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.subCity && (
                        <p className="mt-1 text-xs text-red-400">
                          {fieldErrors.subCity}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-woreda"
                        className="block text-xs font-medium text-[#A1A8B3]"
                      >
                        {t.booking.step2Woreda}
                      </label>
                      <select
                        id="checkout-woreda"
                        value={woreda}
                        onChange={(e) => setWoreda(e.target.value)}
                        className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {availableWoredas.map((w) => (
                          <option key={w} value={w}>
                            {getWoredaLabel(w, locale)}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.woreda && (
                        <p className="mt-1 text-xs text-red-400">
                          {fieldErrors.woreda}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-neighborhood"
                      className="block text-xs font-medium text-[#A1A8B3]"
                    >
                      {t.booking.step3Neighborhood}
                    </label>
                    <select
                      id="checkout-neighborhood"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                    >
                      {availableLandmarks.map((landmark) => (
                        <option key={landmark} value={landmark}>
                          {getLandmarkLabel(landmark, locale)}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.neighborhood && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.neighborhood}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-specific-landmark"
                      className="block text-xs font-medium text-[#A1A8B3]"
                    >
                      {t.booking.specificLandmarkLabel}
                    </label>
                    <input
                      id="checkout-specific-landmark"
                      type="text"
                      value={specificLandmark}
                      onChange={(e) => setSpecificLandmark(e.target.value)}
                      placeholder={t.booking.specificLandmarkPlaceholder}
                      className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-payment"
                    className="block text-xs font-medium text-[#F5F2EB]"
                  >
                    {t.cart.paymentMethodLabel}
                  </label>
                  <select
                    id="checkout-payment"
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as PaymentMethod)
                    }
                    className="mt-1 min-h-[40px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none"
                  >
                    {PAYMENT_METHOD_IDS.map((methodId) => (
                      <option key={methodId} value={methodId}>
                        {t.cart.paymentMethods[methodId]}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] disabled:opacity-60"
                >
                  {submitting
                    ? t.cart.submittingBtn
                    : t.cart.confirmOrderBtn(
                        formatEtb(summary.totalEtb, locale)
                      )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
