import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AVAILABLE_TIME_SLOTS,
  generateReferenceCode,
  validateBookingInput,
} from './schedule';

test('validateBookingInput rejects past dates and invalid phones', () => {
  const res = validateBookingInput(
    {
      serviceId: 'SRV-01',
      serviceTitleAm: 'የህንጻ የውሃና ፍሳሽ ቧንቧ ዝርጋታ',
      propertyType: 'RESIDENTIAL',
      preferredDate: '2026-11-10',
      timeSlot: AVAILABLE_TIME_SLOTS[0],
      customerName: 'አበበ',
      phone: '1234',
      subCity: 'ቦሌ',
    },
    '2026-11-18'
  );

  assert.equal(res.valid, false);
  assert.ok(res.errors.preferredDate);
  assert.ok(res.errors.phone);
});

test('validateBookingInput accepts complete future booking', () => {
  const res = validateBookingInput(
    {
      serviceId: 'SRV-02',
      serviceTitleAm: 'የድንገተኛ ፍሳሽ መለየትና ጥገና',
      propertyType: 'COMMERCIAL',
      preferredDate: '2026-11-20',
      timeSlot: AVAILABLE_TIME_SLOTS[1],
      customerName: 'ሰላም ታደሰ',
      phone: '0911887766',
      subCity: 'የካ',
      notes: 'የ2ኛ ፎቅ የመታጠቢያ ቤት መስመር ፍሳሽ አለው',
    },
    '2026-11-18'
  );

  assert.equal(res.valid, true);
  assert.deepEqual(res.errors, {});
});

test('generateReferenceCode formats prefixed identifiers', () => {
  const apt = generateReferenceCode('APT');
  assert.match(apt, /^APT-\d{7}$/);
});
