'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  getTranslations,
  isSupportedLocale,
  type Locale,
  type TranslationDictionary,
} from './index';

const LOCALE_STORAGE_KEY = 'yohannes_plumbing_locale_v1';
const LOCALE_CHANGE_EVENT = 'yohannes-locale-change';

function subscribeLocaleStore(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isSupportedLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: getTranslations(DEFAULT_LOCALE),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocaleStore,
    getLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const t = getTranslations(locale);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', t.meta.description);
    }
  }, [locale, t.meta.title, t.meta.description]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
