import type { CartItem, CheckoutInput, Product } from './types';

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

export function addItemToCart(
  cart: CartItem[],
  product: Product,
  quantityToAdd: number = 1
): CartItem[] {
  if (!product.inStock || quantityToAdd <= 0) {
    return cart;
  }

  const existingIndex = cart.findIndex(
    (entry) => entry.product.id === product.id
  );

  if (existingIndex === -1) {
    const cappedQty = Math.min(quantityToAdd, product.stockCount);
    return [...cart, { product, quantity: cappedQty }];
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
  nextQuantity: number
): CartItem[] {
  if (nextQuantity <= 0) {
    return removeItemFromCart(cart, productId);
  }

  return cart.map((entry) => {
    if (entry.product.id !== productId) return entry;
    const cappedQty = Math.min(nextQuantity, entry.product.stockCount);
    return { ...entry, quantity: cappedQty };
  });
}

export function removeItemFromCart(
  cart: CartItem[],
  productId: string
): CartItem[] {
  return cart.filter((entry) => entry.product.id !== productId);
}

export function calculateCartSummary(cart: CartItem[]): CartSummary {
  const itemCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotalEtb = cart.reduce(
    (sum, entry) => sum + entry.product.priceEtb * entry.quantity,
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
  cart: CartItem[]
): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (cart.length === 0) {
    errors.cart = 'ጋሪዎ ባዶ ነው፤ እባክዎ መጀመሪያ እቃ ይምረጡ።';
  }
  if (!input.customerName || input.customerName.trim().length < 2) {
    errors.customerName = 'እባክዎ ሙሉ ስምዎን ያስገቡ።';
  }
  if (!input.phone || !isValidEthiopianPhone(input.phone)) {
    errors.phone = 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (ለምሳሌ 0911234567)።';
  }
  if (!input.subCity || input.subCity.trim().length < 2) {
    errors.subCity = 'እባክዎ ክፍለ ከተማ ይምረጡ።';
  }
  if (!input.addressDetail || input.addressDetail.trim().length < 4) {
    errors.addressDetail = 'እባክዎ የመላኪያ አድራሻ ዝርዝር ያስገቡ።';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatEtb(amount: number): string {
  return `${amount.toLocaleString('en-US')} ብር`;
}
