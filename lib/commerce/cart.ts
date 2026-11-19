import {
  isValidSubCityLandmark,
  isValidSubCityWoreda,
} from '../data/addis-addresses';
import {
  DEFAULT_LOCALE,
  formatLocalizedEtb,
  getTranslations,
  type Locale,
} from '../i18n';
import type { CartItem, CheckoutInput, Product, ProductSize } from './types';

export const FREE_DELIVERY_THRESHOLD_ETB = 15000;
export const STANDARD_DELIVERY_FEE_ETB = 450;

export interface CartSummary {
  itemCount: number;
  subtotalEtb: number;
  deliveryFeeEtb: number;
  totalEtb: number;
  freeDeliveryRemainingEtb: number;
  qualifiesForFreeDelivery: boolean;
}

export function getProductPriceForSize(
  product: Product,
  size: ProductSize
): number {
  return product.sizePricesEtb[size] ?? product.priceEtb;
}

export function addItemToCart(
  cart: CartItem[],
  product: Product,
  size: ProductSize = '1/2"',
  quantityToAdd: number = 1
): CartItem[] {
  if (!product.inStock || quantityToAdd <= 0) {
    return cart;
  }

  const existingIndex = cart.findIndex(
    (entry) => entry.product.id === product.id && entry.size === size
  );

  if (existingIndex === -1) {
    const cappedQty = Math.min(quantityToAdd, product.stockCount);
    return [...cart, { product, size, quantity: cappedQty }];
  }

  return cart.map((entry, idx) => {
    if (idx !== existingIndex) return entry;
    const nextQty = Math.min(
      entry.quantity + quantityToAdd,
      entry.product.stockCount
    );
    return { ...entry, quantity: nextQty };
  });
}

export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  size: ProductSize,
  nextQuantity: number
): CartItem[] {
  if (nextQuantity <= 0) {
    return removeItemFromCart(cart, productId, size);
  }

  return cart.map((entry) => {
    if (entry.product.id !== productId || entry.size !== size) return entry;
    const cappedQty = Math.min(nextQuantity, entry.product.stockCount);
    return { ...entry, quantity: cappedQty };
  });
}

export function removeItemFromCart(
  cart: CartItem[],
  productId: string,
  size: ProductSize
): CartItem[] {
  return cart.filter(
    (entry) => !(entry.product.id === productId && entry.size === size)
  );
}

export function calculateCartSummary(cart: CartItem[]): CartSummary {
  const itemCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotalEtb = cart.reduce(
    (sum, entry) =>
      sum + getProductPriceForSize(entry.product, entry.size) * entry.quantity,
    0
  );

  if (itemCount === 0) {
    return {
      itemCount: 0,
      subtotalEtb: 0,
      deliveryFeeEtb: 0,
      totalEtb: 0,
      freeDeliveryRemainingEtb: FREE_DELIVERY_THRESHOLD_ETB,
      qualifiesForFreeDelivery: false,
    };
  }

  const qualifiesForFreeDelivery = subtotalEtb >= FREE_DELIVERY_THRESHOLD_ETB;
  const deliveryFeeEtb = qualifiesForFreeDelivery
    ? 0
    : STANDARD_DELIVERY_FEE_ETB;
  const freeDeliveryRemainingEtb = qualifiesForFreeDelivery
    ? 0
    : FREE_DELIVERY_THRESHOLD_ETB - subtotalEtb;

  return {
    itemCount,
    subtotalEtb,
    deliveryFeeEtb,
    totalEtb: subtotalEtb + deliveryFeeEtb,
    freeDeliveryRemainingEtb,
    qualifiesForFreeDelivery,
  };
}

export function isValidEthiopianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(?:\+?251|0)(?:9|7)\d{8}$/.test(cleaned);
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutInput | 'cart', string>>;
}

export function validateCheckoutInput(
  input: CheckoutInput,
  cart: CartItem[],
  locale: Locale = DEFAULT_LOCALE
): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const v = getTranslations(locale).validation;

  if (cart.length === 0) {
    errors.cart = v.cartEmpty;
  }
  if (!input.customerName || input.customerName.trim().length < 2) {
    errors.customerName = v.customerNameRequired;
  }
  if (!input.phone || !isValidEthiopianPhone(input.phone)) {
    errors.phone = v.invalidPhone;
  }
  if (!input.subCity || input.subCity.trim().length < 2) {
    errors.subCity = v.subCityRequired;
  }
  if (!input.woreda || !isValidSubCityWoreda(input.subCity, input.woreda)) {
    errors.woreda = v.invalidWoreda;
  }
  if (
    !input.neighborhood ||
    !isValidSubCityLandmark(input.subCity, input.neighborhood)
  ) {
    errors.neighborhood = v.invalidNeighborhood;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatEtb(
  amount: number,
  locale: Locale = DEFAULT_LOCALE
): string {
  return formatLocalizedEtb(amount, locale);
}
