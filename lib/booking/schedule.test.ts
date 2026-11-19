import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AVAILABLE_TIME_SLOTS,
  generateReferenceCode,
  validateBookingInput,
  validateNotifyInput,
} from './schedule';

test('validateBookingInput rejects past dates, invalid phones, invalid woreda, and mismatched neighborhood', () => {
  const res = validateBookingInput(
    {
      serviceId: 'SRV-01',
      serviceTitleAm: 'የንጹህ ውሃ መስመር ዝርጋታ (PPR, PVC, Copper)',
      propertyType: 'RESIDENTIAL',
      preferredDate: '2026-11-10',
      timeSlot: AVAILABLE_TIME_SLOTS[0],
      customerName: 'አበበ',
      phone: '1234',
      subCity: 'አራዳ',
      woreda: 'ወረዳ 14', // አራዳ only has 10 woredas
      neighborhood: 'መገናኛ', // መገናኛ belongs to የካ, not አራዳ
    },
    '2026-11-19'
  );

  assert.equal(res.valid, false);
  assert.ok(res.errors.preferredDate);
  assert.ok(res.errors.phone);
  assert.ok(res.errors.woreda);
  assert.ok(res.errors.neighborhood);
});

test('validateBookingInput accepts complete 3-stage cascading address booking with optional specificLandmark', () => {
  const res = validateBookingInput(
    {
      serviceId: 'SRV-05',
      serviceTitleAm: 'የውሃ ፍሳሽ መለየትና አስቸኳይ ጥገና (24/7 Emergency Leak Repair)',
      propertyType: 'COMMERCIAL',
      preferredDate: '2026-11-20',
      timeSlot: AVAILABLE_TIME_SLOTS[4],
      customerName: 'ሰላም ታደሰ',
      phone: '0912453752',
      subCity: 'የካ',
      woreda: 'ወረዳ 05',
      neighborhood: 'መገናኛ',
      specificLandmark: 'ከዘፍመሽ ሞል 100 ሜትር ገባ ብሎ ቤት ቁጥር 12',
      notes: 'የ2ኛ ፎቅ የመታጠቢያ ቤት መስመር ፍሳሽ አለው',
    },
    '2026-11-19'
  );

  assert.equal(res.valid, true);
  assert.deepEqual(res.errors, {});
});

test('validateNotifyInput validates Coming Soon service notification form', () => {
  const bad = validateNotifyInput({
    serviceId: 'CS-01',
    serviceTitleAm: 'የህንጻ ግንባታ',
    customerName: 'A',
    phone: '0911',
  });
  assert.equal(bad.valid, false);

  const ok = validateNotifyInput({
    serviceId: 'CS-01',
    serviceTitleAm: 'የህንጻ ግንባታ',
    customerName: 'ዳዊት በቀለ',
    phone: '0912453752',
  });
  assert.equal(ok.valid, true);
});

test('generateReferenceCode formats prefixed identifiers including NTF', () => {
  const apt = generateReferenceCode('APT');
  const ntf = generateReferenceCode('NTF');
  assert.match(apt, /^APT-\d{7}$/);
  assert.match(ntf, /^NTF-\d{7}$/);
});
