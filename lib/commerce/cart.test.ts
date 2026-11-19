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
  sku: 'PPR-PN20',
  nameAm: 'PPR የንጹህ ውሃ ቧንቧ (PN20)',
  specAm: '4 ሜትር ዘንግ · ለሙቅና ቀዝቃዛ ውሃ',
  category: 'PIPES',
  categoryLabelAm: 'PPR/PVC ቧንቧዎች',
  unitAm: 'በዘንግ',
  priceEtb: 1250,
  sizePricesEtb: {
    '1/2"': 950,
    '3/4"': 1250,
    '1"': 1680,
  },
  availableSizes: ['1/2"', '3/4"', '1"'],
  inStock: true,
  stockCount: 20,
  imageKey: 'ppr_pipes',
};

const samplePump: Product = {
  id: 'PRD-103',
  sku: 'PMP-SS-750',
  nameAm: 'አውቶማቲክ Booster Pump (750W)',
  specAm: 'ስቴንለስ ስቲል · ዝቅተኛ ድምጽ',
  category: 'PUMPS',
  categoryLabelAm: 'የውሃ ፓምፖች',
  unitAm: 'በፍሬ',
  priceEtb: 18500,
  sizePricesEtb: {
    '1/2"': 17900,
    '3/4"': 18500,
    '1"': 19800,
  },
  availableSizes: ['1/2"', '3/4"', '1"'],
  inStock: true,
  stockCount: 5,
  imageKey: 'water_pump',
};

test('addItemToCart treats distinct sizes as separate line items and caps stock', () => {
  let cart = addItemToCart([], samplePipe, '1/2"', 2);
  cart = addItemToCart(cart, samplePipe, '3/4"', 1);
  assert.equal(cart.length, 2);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cart[1].size, '3/4"');

  cart = addItemToCart(cart, samplePipe, '1/2"', 25);
  assert.equal(cart[0].quantity, 20);
});

test('calculateCartSummary uses size-specific prices and waives delivery above threshold', () => {
  const smallCart = addItemToCart([], samplePipe, '3/4"', 4); // 4 * 1250 = 5,000 ETB
  const smallSummary = calculateCartSummary(smallCart);
  assert.equal(smallSummary.subtotalEtb, 5000);
  assert.equal(smallSummary.deliveryFeeEtb, STANDARD_DELIVERY_FEE_ETB);
  assert.equal(smallSummary.totalEtb, 5000 + STANDARD_DELIVERY_FEE_ETB);
  assert.equal(
    smallSummary.freeDeliveryRemainingEtb,
    FREE_DELIVERY_THRESHOLD_ETB - 5000
  );

  const largeCart = addItemToCart(smallCart, samplePump, '1"', 1); // +19,800 = 24,800 ETB
  const largeSummary = calculateCartSummary(largeCart);
  assert.equal(largeSummary.qualifiesForFreeDelivery, true);
  assert.equal(largeSummary.deliveryFeeEtb, 0);
  assert.equal(largeSummary.totalEtb, 24800);
});

test('updateCartItemQuantity removes specific size line when set to zero', () => {
  let cart = addItemToCart([], samplePipe, '1/2"', 3);
  cart = addItemToCart(cart, samplePipe, '1"', 1);
  cart = updateCartItemQuantity(cart, samplePipe.id, '1/2"', 0);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].size, '1"');

  cart = removeItemFromCart(cart, samplePipe.id, '1"');
  assert.equal(cart.length, 0);
});

test('isValidEthiopianPhone accepts 09, 07, and +251 formats', () => {
  assert.equal(isValidEthiopianPhone('0912453752'), true);
  assert.equal(isValidEthiopianPhone('0712345678'), true);
  assert.equal(isValidEthiopianPhone('+251912453752'), true);
  assert.equal(isValidEthiopianPhone('09112'), false);
});

test('validateCheckoutInput validates cascading Sub-City, Woreda, and Neighborhood', () => {
  const badWoredaAndLandmark = validateCheckoutInput(
    {
      customerName: 'ዳዊት በቀለ',
      phone: '0912453752',
      subCity: 'ጉለሌ',
      woreda: 'ወረዳ 14', // ጉለሌ only has Woreda 01-10
      neighborhood: 'ቦሌ መድኃኔዓለም', // Belongs to ቦሌ, not ጉለሌ
      paymentMethod: 'TELEBIRR',
    },
    addItemToCart([], samplePipe, '1/2"', 2)
  );
  assert.equal(badWoredaAndLandmark.valid, false);
  assert.ok(badWoredaAndLandmark.errors.woreda);
  assert.ok(badWoredaAndLandmark.errors.neighborhood);

  const okRes = validateCheckoutInput(
    {
      customerName: 'ዳዊት በቀለ',
      phone: '0912453752',
      subCity: 'ለሚ ኩራ',
      woreda: 'ወረዳ 08',
      neighborhood: 'አያት (Ayat)',
      specificLandmark: 'አያት ዞን 3 ቤት ቁጥር B-14',
      paymentMethod: 'TELEBIRR',
    },
    addItemToCart([], samplePipe, '1/2"', 2)
  );
  assert.equal(okRes.valid, true);
});
