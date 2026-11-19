import { am } from './locales/am';
import { en } from './locales/en';
import { om } from './locales/om';
import { ti } from './locales/ti';
import {
  DEFAULT_LOCALE,
  LOCALE_OPTIONS,
  type Locale,
  type TranslationDictionary,
} from './types';

export type { Locale, TranslationDictionary };
export { DEFAULT_LOCALE, LOCALE_OPTIONS };

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en,
  am,
  om,
  ti,
};

export function isSupportedLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'am' || value === 'om' || value === 'ti';
}

export function getTranslations(locale: Locale = DEFAULT_LOCALE): TranslationDictionary {
  return TRANSLATIONS[locale] ?? TRANSLATIONS[DEFAULT_LOCALE];
}

export function formatLocalizedEtb(
  amount: number,
  locale: Locale = DEFAULT_LOCALE
): string {
  const unit = getTranslations(locale).shop.currencyLabel;
  return `${amount.toLocaleString('en-US')} ${unit}`;
}

const CANONICAL_TIME_SLOTS = [
  '03:00 ጠዋት (09:00 AM)',
  '05:00 ጠዋት (11:00 AM)',
  '08:00 ከሰዓት (02:00 PM)',
  '10:00 ከሰዓት (04:00 PM)',
  'ድንገተኛ / አስቸኳይ ጥገና (24/7)',
] as const;

export function getLocalizedTimeSlot(
  canonicalSlot: string,
  locale: Locale
): string {
  const idx = CANONICAL_TIME_SLOTS.indexOf(
    canonicalSlot as (typeof CANONICAL_TIME_SLOTS)[number]
  );
  if (idx === -1) return canonicalSlot;
  return getTranslations(locale).booking.timeSlots[idx] ?? canonicalSlot;
}

export function getLocalizedServiceTitle(
  serviceId: string,
  fallbackTitle: string,
  locale: Locale
): string {
  const items = getTranslations(locale).servicesSection.items;
  if (serviceId in items) {
    return items[serviceId as keyof typeof items].title;
  }
  return fallbackTitle;
}

export function getLocalizedProductName(
  productId: string,
  fallbackName: string,
  locale: Locale
): string {
  const products = getTranslations(locale).shop.products;
  if (productId in products) {
    return products[productId as keyof typeof products].name;
  }
  return fallbackName;
}

const SEEDED_NAMES: Record<string, Record<Locale, string>> = {
  'ዮሐንስ ገብረመድህን': {
    en: 'Yohannis Gebremedhin',
    am: 'ዮሐንስ ገብረመድህን',
    om: 'Yohannis Gabramadhin',
    ti: 'ዮሃንስ ገብረመድህን',
  },
  'ትግስት አሰፋ': {
    en: 'Tigist Assefa',
    am: 'ትግስት አሰፋ',
    om: 'Tigist Asaffaa',
    ti: 'ትግስት ኣሰፋ',
  },
  'ሳራ መኮንን': {
    en: 'Sara Mekonnen',
    am: 'ሳራ መኮንን',
    om: 'Saaraa Mokonnon',
    ti: 'ሳራ መኮንን',
  },
  'አበበ ከበደ': {
    en: 'Abebe Kebede',
    am: 'አበበ ከበደ',
    om: 'Ababaa Kabbadaa',
    ti: 'ኣበበ ከበደ',
  },
};

const SEEDED_NOTES: Record<string, Record<Locale, string>> = {
  'ከሩዋንዳ ድልድይ 150 ሜትር ወደ ቡልቡላ': {
    en: '150m from Rwanda Bridge toward Bulbula',
    am: 'ከሩዋንዳ ድልድይ 150 ሜትር ወደ ቡልቡላ',
    om: 'Riicha Ruwaandaa irraa meetira 150 gara Bulbulaa',
    ti: 'ካብ ድልድል ሩዋንዳ 150 ሜትር ናብ ቡልቡላ',
  },
  'ከዩኤንኢሲኤ ጎን ህንጻ ቁጥር 3': {
    en: 'Building No. 3 beside UNECA',
    am: 'ከዩኤንኢሲኤ ጎን ህንጻ ቁጥር 3',
    om: 'UNECA cinaa Gamoo Lakk. 3',
    ti: 'ጎኒ UNECA ህንጻ ቁጽሪ 3',
  },
  'ቤት ቁጥር 204፣ ከፍየል ቤት 200 ሜትር': {
    en: 'House No. 204, 200m from Fiyel Bet',
    am: 'ቤት ቁጥር 204፣ ከፍየል ቤት 200 ሜትር',
    om: 'Mana Lakk. 204, Fiyel Beet irraa meetira 200',
    ti: 'ገዛ ቁጽሪ 204፣ ካብ ፍየል ቤት 200 ሜትር',
  },
};

export function getLocalizedSeededName(name: string, locale: Locale): string {
  return SEEDED_NAMES[name]?.[locale] ?? name;
}

export function getLocalizedSeededLandmark(
  landmark: string | undefined,
  locale: Locale
): string | undefined {
  if (!landmark) return undefined;
  return SEEDED_NOTES[landmark]?.[locale] ?? landmark;
}
