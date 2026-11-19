import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ADDIS_SUBCITIES,
  validateBookingInput,
  validateNotifyInput,
} from '../booking/schedule';
import { validateCheckoutInput } from '../commerce/cart';
import { ADDIS_SUBCITY_DATA, getSubCityLabel, getWoredaLabel, getLandmarkLabel } from '../data/addis-addresses';
import { PRODUCTS, SERVICES, BLOG_ARTICLES, COMING_SOON_SERVICES } from '../data/catalog';
import {
  DEFAULT_LOCALE,
  getLocalizedProductName,
  getLocalizedServiceTitle,
  getLocalizedTimeSlot,
  getTranslations,
  LOCALE_OPTIONS,
  TRANSLATIONS,
  type Locale,
} from './index';

const ALL_LOCALES: Locale[] = ['en', 'am', 'om', 'ti'];

function assertNoEmptyStrings(obj: unknown, path: string): void {
  if (typeof obj === 'string') {
    assert.ok(obj.trim().length > 0, `Empty string at ${path}`);
    return;
  }
  if (Array.isArray(obj)) {
    assert.ok(obj.length > 0, `Empty array at ${path}`);
    obj.forEach((item, index) => assertNoEmptyStrings(item, `${path}[${index}]`));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'function') continue;
      assertNoEmptyStrings(value, `${path}.${key}`);
    }
  }
}

describe('4-language i18n dictionary and transliteration', () => {
  it('sets English (en) as the default locale and exposes all 4 language options', () => {
    assert.equal(DEFAULT_LOCALE, 'en');
    assert.deepEqual(
      LOCALE_OPTIONS.map((o) => o.code),
      ['en', 'am', 'om', 'ti']
    );
  });

  it('has 100% populated non-empty strings across en, am, om, and ti dictionaries', () => {
    for (const locale of ALL_LOCALES) {
      const dict = TRANSLATIONS[locale];
      assertNoEmptyStrings(dict, `TRANSLATIONS.${locale}`);

      assert.equal(dict.hero.stats.length, 4);
      assert.equal(dict.about.projects.length, 3);
      assert.equal(dict.booking.timeSlots.length, 5);

      for (const srv of SERVICES) {
        assert.ok(
          srv.id in dict.servicesSection.items,
          `Missing service ${srv.id} in ${locale}`
        );
      }
      for (const cs of COMING_SOON_SERVICES) {
        assert.ok(
          cs.id in dict.servicesSection.comingSoonItems,
          `Missing coming soon ${cs.id} in ${locale}`
        );
      }
      for (const prd of PRODUCTS) {
        assert.ok(
          prd.id in dict.shop.products,
          `Missing product ${prd.id} in ${locale}`
        );
      }
      for (const art of BLOG_ARTICLES) {
        assert.ok(
          art.id in dict.blog.articles,
          `Missing article ${art.id} in ${locale}`
        );
      }
    }
  });

  it('transliterates proper nouns without translating meanings and keeps technical terms in English', () => {
    assert.equal(TRANSLATIONS.en.brand.name, 'Tirat Plumbing');
    assert.equal(TRANSLATIONS.om.brand.name, 'Tirat Plumbing');
    assert.equal(TRANSLATIONS.am.brand.name, 'ጥራት ፕላምቢንግ');
    assert.equal(TRANSLATIONS.ti.brand.name, 'ጥራት ፕላምቢንግ');

    assert.equal(TRANSLATIONS.en.brand.city, 'Addis Ababa');
    assert.equal(TRANSLATIONS.am.brand.city, 'አዲስ አበባ');
    assert.equal(TRANSLATIONS.om.brand.city, 'Addis Ababaa');
    assert.equal(TRANSLATIONS.ti.brand.city, 'ኣዲስ ኣበባ');

    // Ensure "Finfinne" or semantic translations like "Quality Plumbing" or old names are not used
    for (const locale of ALL_LOCALES) {
      const serialized = JSON.stringify(TRANSLATIONS[locale]);
      assert.ok(!serialized.includes('Finfinne'));
      assert.ok(!serialized.includes('Quality Plumbing'));
      assert.ok(!serialized.includes('Yohannis Plumbing'));
      assert.ok(!serialized.includes('ዮሐንስ Plumbing'));
      assert.ok(!serialized.includes('ዮሃንስ Plumbing'));
    }

    // Technical terms remain in English across all locales
    for (const locale of ALL_LOCALES) {
      const serialized = JSON.stringify(TRANSLATIONS[locale]);
      assert.ok(serialized.includes('PPR'), `${locale} missing PPR`);
      assert.ok(serialized.includes('PVC'), `${locale} missing PVC`);
      assert.ok(serialized.includes('Copper'), `${locale} missing Copper`);
      assert.ok(
        serialized.includes('Booster Pump'),
        `${locale} missing Booster Pump`
      );
      assert.ok(
        serialized.includes('Emergency Leak Repair'),
        `${locale} missing Emergency Leak Repair`
      );
    }
  });

  it('covers all 11 Addis Ababa sub-cities, woredas, and landmarks across all 4 locales', () => {
    assert.equal(ADDIS_SUBCITIES.length, 11);
    for (const city of ADDIS_SUBCITY_DATA) {
      assert.ok(city.landmarks.length > 0, `${city.id} has landmarks`);
      for (const locale of ALL_LOCALES) {
        assert.ok(
          getSubCityLabel(city.id, locale).trim().length > 0,
          `Missing subcity label for ${city.id} in ${locale}`
        );
        assert.ok(
          getWoredaLabel('ወረዳ 01', locale).includes('01'),
          `Woreda label formatting failed in ${locale}`
        );
        for (const lm of city.landmarks) {
          assert.ok(
            getLandmarkLabel(lm.id, locale).trim().length > 0,
            `Missing landmark label ${lm.id} in ${locale}`
          );
        }
      }
    }
  });

  it('resolves localized helpers and localized validation error messages per locale', () => {
    assert.equal(
      getLocalizedServiceTitle('SRV-01', 'fallback', 'en'),
      TRANSLATIONS.en.servicesSection.items['SRV-01'].title
    );
    assert.equal(
      getLocalizedProductName('PRD-101', 'fallback', 'om'),
      TRANSLATIONS.om.shop.products['PRD-101'].name
    );
    assert.equal(
      getLocalizedTimeSlot('ድንገተኛ / አስቸኳይ ጥገና (24/7)', 'ti'),
      TRANSLATIONS.ti.booking.timeSlots[4]
    );

    for (const locale of ALL_LOCALES) {
      const dict = getTranslations(locale);
      const bookingRes = validateBookingInput(
        {
          serviceId: '',
          serviceTitleAm: '',
          propertyType: 'RESIDENTIAL',
          preferredDate: '2020-01-01',
          timeSlot: '',
          customerName: 'A',
          phone: '123',
          subCity: '',
          woreda: '',
          neighborhood: '',
        },
        '2026-11-19',
        locale
      );
      assert.equal(bookingRes.valid, false);
      assert.equal(
        bookingRes.errors.customerName,
        dict.validation.customerNameRequired
      );
      assert.equal(bookingRes.errors.phone, dict.validation.invalidPhone);

      const checkoutRes = validateCheckoutInput(
        {
          customerName: '',
          phone: '123',
          subCity: '',
          woreda: '',
          neighborhood: '',
          paymentMethod: 'TELEBIRR',
        },
        [],
        locale
      );
      assert.equal(checkoutRes.valid, false);
      assert.equal(checkoutRes.errors.cart, dict.validation.cartEmpty);

      const notifyRes = validateNotifyInput(
        {
          serviceId: '',
          serviceTitleAm: '',
          customerName: '',
          phone: '000',
        },
        locale
      );
      assert.equal(notifyRes.valid, false);
      assert.equal(notifyRes.errors.phone, dict.validation.invalidPhone);
    }
  });
});
