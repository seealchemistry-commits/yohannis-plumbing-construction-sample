import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addItemToCart,
  calculateCartSummary,
  FREE_DELIVERY_THRESHOLD_ETB,
  isValidEthiopianPhone,
  removeItemFromCart,
  STANDARD_DELIVERY_FEE_ETB,
  updateCartItemQuantity,
  validateCheckoutInput,
} from './cart';
import type { Product } from './types';

const samplePipe: Product = {
  id: 'PRD-101',
  sku: 'PPR-32-PN20',
  nameAm: 'PPR የውሃ ቧንቧ (32mm PN20)',
  specAm: '4 ሜትር ርዝመት · ከፍተኛ ግፊት የሚቋቋም',
  category: 'PIPES',
  categoryLabelAm: 'ቧንቧዎች',
  unitAm: 'በዘንግ',
  priceEtb: 1250,
  inStock: true,
  stockCount: 20,
  imageKey: 'ppr_pipes',
};

const samplePump: Product = {
  id: 'PRD-103',
  sku: 'PUMP-SS-750',
  nameAm: 'አውቶማቲክ የውሃ ፓምፕ (750W)',
  specAm: 'ስቴንለስ ስቲል · ዝቅተኛ ድምጽ',
  category: 'PUMPS',
  categoryLabelAm: 'ፓምፕና ታንከር',
  unitAm: 'በፍሬ',
  priceEtb: 18500,
  inStock: true,
  stockCount: 5,
  imageKey: 'water_pump',
};

test('addItemToCart increments quantities and caps at stockCount', () => {
  let cart = addItemToCart([], samplePipe, 2);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  cart = addItemToCart(cart, samplePipe, 25);
  assert.equal(cart[0].quantity, 20);
});

test('calculateCartSummary charges delivery below threshold and waives above threshold', () => {
  const smallCart = addItemToCart([], samplePipe, 4); // 5,000 ETB
  const smallSummary = calculateCartSummary(smallCart);
  assert.equal(smallSummary.subtotalEtb, 5000);
  assert.equal(smallSummary.deliveryFeeEtb, STANDARD_DELIVERY_FEE_ETB);
  assert.equal(smallSummary.totalEtb, 5000 + STANDARD_DELIVERY_FEE_ETB);
  assert.equal(
    smallSummary.freeDeliveryRemainingEtb,
    FREE_DELIVERY_THRESHOLD_ETB - 5000
  );

  const largeCart = addItemToCart(smallCart, samplePump, 1); // 23,500 ETB
  const largeSummary = calculateCartSummary(largeCart);
  assert.equal(largeSummary.qualifiesForFreeDelivery, true);
  assert.equal(largeSummary.deliveryFeeEtb, 0);
  assert.equal(largeSummary.totalEtb, 23500);
});

test('updateCartItemQuantity removes item when set to zero', () => {
  let cart = addItemToCart([], samplePipe, 3);
  cart = updateCartItemQuantity(cart, samplePipe.id, 0);
  assert.equal(cart.length, 0);

  cart = addItemToCart([], samplePipe, 1);
  cart = removeItemFromCart(cart, samplePipe.id);
  assert.equal(cart.length, 0);
});

test('isValidEthiopianPhone accepts 09, 07, and +251 formats', () => {
  assert.equal(isValidEthiopianPhone('0911234567'), true);
  assert.equal(isValidEthiopianPhone('0712345678'), true);
  assert.equal(isValidEthiopianPhone('+251911234567'), true);
  assert.equal(isValidEthiopianPhone('09112'), false);
  assert.equal(isValidEthiopianPhone('1234567890'), false);
});

test('validateCheckoutInput flags missing fields and empty cart', () => {
  const emptyRes = validateCheckoutInput(
    {
      customerName: 'A',
      phone: '123',
      subCity: '',
      addressDetail: '',
      paymentMethod: 'TELEBIRR',
    },
    []
  );
  assert.equal(emptyRes.valid, false);
  assert.ok(emptyRes.errors.cart);
  assert.ok(emptyRes.errors.customerName);
  assert.ok(emptyRes.errors.phone);

  const okRes = validateCheckoutInput(
    {
      customerName: 'ዳዊት በቀለ',
      phone: '0911456789',
      subCity: 'ቦሌ',
      addressDetail: 'ቦሌ መድኃኔዓለም ከሴሉ ህንጻ ጀርባ',
      paymentMethod: 'TELEBIRR',
    },
    addItemToCart([], samplePipe, 2)
  );
  assert.equal(okRes.valid, true);
});
