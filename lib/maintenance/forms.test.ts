import assert from 'node:assert/strict';
import test from 'node:test';
import { getTranslations } from '../i18n';
import {
  buildTelegramHandoffUrl,
  buildWhatsAppHandoffUrl,
  formatClientMaintenanceSummary,
  formatTechnicianApplicationSummary,
  validateClientMaintenanceInput,
  validateTechnicianApplicationInput,
} from './forms';

test('validateClientMaintenanceInput catches missing location, name, and invalid phone across locales', () => {
  const am = getTranslations('am');
  const invalid = validateClientMaintenanceInput(
    {
      facilityType: am.maintenancePage.clientForm.facilityTypes[0],
      engagementType: am.maintenancePage.clientForm.engagementTypes[0],
      location: '',
      contactName: 'A',
      phone: '123',
      notes: '',
    },
    am
  );
  assert.equal(invalid.valid, false);
  assert.equal(invalid.errors.contactName, am.validation.customerNameRequired);
  assert.equal(invalid.errors.phone, am.validation.invalidPhone);
  assert.equal(
    invalid.errors.location,
    am.maintenancePage.validation.locationRequired
  );

  const valid = validateClientMaintenanceInput(
    {
      facilityType: am.maintenancePage.clientForm.facilityTypes[0],
      engagementType: am.maintenancePage.clientForm.engagementTypes[0],
      location: 'Bole Medhanialem',
      contactName: 'Dawit Bekele',
      phone: '0912453752',
      notes: '24/7 hotel shift coverage',
    },
    am
  );
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateTechnicianApplicationInput validates technician name, phone, experience, and specialty', () => {
  const en = getTranslations('en');
  const invalid = validateTechnicianApplicationInput(
    {
      fullName: '',
      experience: '',
      specialty: '',
      phone: '0811111111',
      area: '',
    },
    en
  );
  assert.equal(invalid.valid, false);
  assert.equal(invalid.errors.fullName, en.validation.customerNameRequired);
  assert.equal(invalid.errors.phone, en.validation.invalidPhone);
  assert.equal(
    invalid.errors.experience,
    en.maintenancePage.validation.experienceRequired
  );
  assert.equal(
    invalid.errors.specialty,
    en.maintenancePage.validation.specialtyRequired
  );

  const valid = validateTechnicianApplicationInput(
    {
      fullName: 'Abebe Tadesse',
      experience: en.maintenancePage.technicianForm.experienceOptions[1],
      specialty: en.maintenancePage.technicianForm.specialtyOptions[0],
      phone: '+251912453752',
      area: 'CMC',
    },
    en
  );
  assert.equal(valid.valid, true);
});

test('handoff link formatters encode Telegram and WhatsApp messages cleanly', () => {
  const clientMsg = formatClientMaintenanceSummary({
    facilityType: 'Hotel',
    engagementType: 'Dedicated On-Site Technician',
    location: 'Bole',
    contactName: 'Hanna Girma',
    phone: '0912453752',
    notes: '',
  });
  assert.ok(clientMsg.includes('Facility: Hotel'));
  assert.ok(
    buildWhatsAppHandoffUrl('https://wa.me/251912453752', clientMsg).includes(
      encodeURIComponent('Facility: Hotel')
    )
  );
  assert.ok(
    buildTelegramHandoffUrl('https://t.me/TiratPlumbing', clientMsg).includes(
      encodeURIComponent('Location: Bole')
    )
  );

  const techMsg = formatTechnicianApplicationSummary({
    fullName: 'Samuel Hailu',
    experience: '3–5 Years',
    specialty: 'Booster Pumps & Tanks',
    phone: '0912453752',
    area: 'Yeka',
  });
  assert.ok(techMsg.includes('Specialty: Booster Pumps & Tanks'));
});
