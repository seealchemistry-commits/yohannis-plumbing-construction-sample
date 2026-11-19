'use client';

import { useState } from 'react';
import { Globe, Menu, ShoppingBag, X } from 'lucide-react';
import { LOCALE_OPTIONS, type Locale } from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n/context';

interface SiteHeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export default function SiteHeader({
  cartItemCount,
  onOpenCart,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { href: '#home', label: t.header.home },
    { href: '#services', label: t.header.services },
    { href: '#about', label: t.header.about },
    { href: '#shop', label: t.header.shop },
    { href: '#blog', label: t.header.blog },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#home"
          className="whitespace-nowrap shrink-0 text-base font-bold tracking-tight text-[#F8FAFC] transition-colors hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:text-lg"
        >
          {t.brand.name}
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label={t.header.navAriaLabel}
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#A1A8B3]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#F8FAFC] hover:underline hover:decoration-[#D4AF37] hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Cart + Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0 sm:gap-3">
          {/* Desktop / Tablet 4-Language Switcher */}
          <div
            role="group"
            aria-label={t.header.languageLabel}
            className="hidden md:inline-flex items-center rounded-xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] p-1"
          >
            {LOCALE_OPTIONS.map((opt) => {
              const active = locale === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  data-testid={`lang-btn-${opt.code}`}
                  title={opt.nativeName}
                  aria-label={opt.nativeName}
                  aria-pressed={active}
                  onClick={() => setLocale(opt.code)}
                  className={`min-h-[32px] rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D4AF37] text-[#0B0D10]'
                      : 'text-[#A1A8B3] hover:bg-[#161B22] hover:text-[#F8FAFC]'
                  }`}
                >
                  {opt.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Mobile compact language selector */}
          <div className="relative flex items-center md:hidden">
            <Globe
              className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[#D4AF37]"
              aria-hidden="true"
            />
            <select
              aria-label={t.header.languageLabel}
              data-testid="mobile-lang-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="min-h-[40px] appearance-none rounded-xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] py-1.5 pl-7 pr-2.5 text-xs font-bold text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
            >
              {LOCALE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.shortLabel}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={t.header.cartAriaLabel(cartItemCount)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] px-3 py-2 text-xs font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37]/60 hover:bg-[#161B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0 sm:min-h-[42px] sm:px-3.5"
          >
            <ShoppingBag className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="hidden sm:inline">{t.header.cart}</span>
            <span
              data-testid="header-cart-count"
              className="font-mono tabular-nums font-bold text-[#D4AF37]"
            >
              {cartItemCount}
            </span>
          </button>

          <a
            href="#booking"
            className="hidden sm:inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0 lg:px-5"
          >
            {t.header.bookNow}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={mobileMenuOpen}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-[rgba(212,175,55,0.28)] bg-[#12161C] text-[#F5F2EB] lg:hidden hover:border-[#D4AF37]/60 hover:bg-[#161B22]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label={t.header.mobileNavAriaLabel}
          className="border-t border-[rgba(212,175,55,0.2)] bg-[#12161C] px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            <div className="mb-2 grid grid-cols-4 gap-1.5 rounded-xl border border-[rgba(212,175,55,0.22)] bg-[#0B0D10] p-1 md:hidden">
              {LOCALE_OPTIONS.map((opt) => {
                const active = locale === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLocale(opt.code)}
                    className={`min-h-[34px] rounded-lg px-2 py-1 text-xs font-bold transition-colors ${
                      active
                        ? 'bg-[#D4AF37] text-[#0B0D10]'
                        : 'text-[#A1A8B3] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {opt.shortLabel}
                  </button>
                );
              })}
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium text-[#A1A8B3] hover:bg-[#161B22] hover:text-[#F8FAFC]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-xl bg-[#D4AF37] px-4 text-sm font-bold text-[#0B0D10] hover:bg-[#E5C158]"
            >
              {t.header.bookNow}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium text-[#A1A8B3] hover:bg-[#161B22] hover:text-[#F8FAFC]"
            >
              {t.header.contactLink}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
