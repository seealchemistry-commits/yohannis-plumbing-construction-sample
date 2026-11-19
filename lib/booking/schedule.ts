import { isValidEthiopianPhone } from '../commerce/cart';
import type { BookingInput, NotifyRequestInput } from '../commerce/types';
import {
  ADDIS_SUBCITY_DATA,
  isValidSubCityLandmark,
  isValidSubCityWoreda,
} from '../data/addis-addresses';
import { DEFAULT_LOCALE, getTranslations, type Locale } from '../i18n';

export const AVAILABLE_TIME_SLOTS = [
  '03:00 ጠዋት (09:00 AM)',
  '05:00 ጠዋት (11:00 AM)',
  '08:00 ከሰዓት (02:00 PM)',
  '10:00 ከሰዓት (04:00 PM)',
  'ድንገተኛ / አስቸኳይ ጥገና (24/7)',
] as const;

export const ADDIS_SUBCITIES = ADDIS_SUBCITY_DATA.map((c) => c.nameAm);

export interface BookingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingInput, string>>;
}

export function validateBookingInput(
  input: BookingInput,
  todayIsoDate?: string,
  locale: Locale = DEFAULT_LOCALE
): BookingValidationResult {
  const errors: BookingValidationResult['errors'] = {};
  const v = getTranslations(locale).validation;

  if (!input.serviceId || !input.serviceTitleAm.trim()) {
    errors.serviceId = v.serviceRequired;
  }

  if (!input.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.preferredDate)) {
    errors.preferredDate = v.invalidDate;
  } else if (todayIsoDate && input.preferredDate < todayIsoDate) {
    errors.preferredDate = v.pastDate;
  }

  if (!input.timeSlot || !input.timeSlot.trim()) {
    errors.timeSlot = v.timeSlotRequired;
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

export interface NotifyValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof NotifyRequestInput, string>>;
}

export function validateNotifyInput(
  input: NotifyRequestInput,
  locale: Locale = DEFAULT_LOCALE
): NotifyValidationResult {
  const errors: NotifyValidationResult['errors'] = {};
  const v = getTranslations(locale).validation;

  if (!input.serviceId || !input.serviceTitleAm.trim()) {
    errors.serviceId = v.notifyServiceRequired;
  }
  if (!input.customerName || input.customerName.trim().length < 2) {
    errors.customerName = v.customerNameRequired;
  }
  if (!input.phone || !isValidEthiopianPhone(input.phone)) {
    errors.phone = v.invalidPhone;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateReferenceCode(
  prefix: 'APT' | 'ORD' | 'MSG' | 'NTF'
): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const timeSuffix = Date.now().toString().slice(-3);
  return `${prefix}-${randomDigits}${timeSuffix}`;
}
