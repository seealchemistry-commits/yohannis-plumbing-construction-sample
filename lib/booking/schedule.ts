import { isValidEthiopianPhone } from '../commerce/cart';
import type { BookingInput } from '../commerce/types';

export const AVAILABLE_TIME_SLOTS = [
  '03:00 ጠዋት (09:00 AM)',
  '05:00 ጠዋት (11:00 AM)',
  '08:00 ከሰዓት (02:00 PM)',
  '10:00 ከሰዓት (04:00 PM)',
] as const;

export const ADDIS_SUBCITIES = [
  'ቦሌ',
  'የካ',
  'ቂርቆስ',
  'አራዳ',
  'ለሚ ኩራ',
  'ንፋስ ስልክ ላፍቶ',
  'ኮልፌ ቀራኒዮ',
  'ጉለሌ',
  'ልደታ',
  'አዲስ ከተማ',
  'አቃቂ ቃሊቲ',
] as const;

export interface BookingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingInput, string>>;
}

export function validateBookingInput(
  input: BookingInput,
  todayIsoDate?: string
): BookingValidationResult {
  const errors: BookingValidationResult['errors'] = {};

  if (!input.serviceId || !input.serviceTitleAm.trim()) {
    errors.serviceId = 'እባክዎ የሚፈልጉትን አገልግሎት ይምረጡ።';
  }

  if (!input.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.preferredDate)) {
    errors.preferredDate = 'እባክዎ ትክክለኛ የቀጠሮ ቀን ይምረጡ።';
  } else if (todayIsoDate && input.preferredDate < todayIsoDate) {
    errors.preferredDate = 'ያለፈ ቀን መምረጥ አይቻልም፤ እባክዎ የዛሬን ወይም የወደፊት ቀን ይምረጡ።';
  }

  if (!input.timeSlot || !input.timeSlot.trim()) {
    errors.timeSlot = 'እባክዎ የቀጠሮ ሰዓት ይምረጡ።';
  }

  if (!input.customerName || input.customerName.trim().length < 2) {
    errors.customerName = 'እባክዎ ሙሉ ስምዎን ያስገቡ።';
  }

  if (!input.phone || !isValidEthiopianPhone(input.phone)) {
    errors.phone = 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (ለምሳሌ 0911234567)።';
  }

  if (!input.subCity || input.subCity.trim().length < 2) {
    errors.subCity = 'እባክዎ አካባቢ / ክፍለ ከተማ ይምረጡ።';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateReferenceCode(prefix: 'APT' | 'ORD' | 'MSG'): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const timeSuffix = Date.now().toString().slice(-3);
  return `${prefix}-${randomDigits}${timeSuffix}`;
}
