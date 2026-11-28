'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Menu, X } from 'lucide-react';
import { LOCALE_OPTIONS, type Locale } from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n/context';
import tiratLogoMark from '../public/assets/tirat-logo-mark.png';

interface SiteHeaderProps {
  onRequestQuote?: () => void;
}

export default function SiteHeader({ onRequestQuote }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const navCopy = t.contractor.nav;
  const isHome = pathname === '/';

  useEffect(() => {
    if (pathname !== '/maintenance') {
      router.prefetch('/maintenance');
    }
  }, [pathname, router]);

  const navLinks = [
    { href: isHome ? '#services' : '/#services', label: navCopy.services, isRoute: false },
    { href: isHome ? '#process' : '/#process', label: navCopy.process, isRoute: false },
    { href: isHome ? '#projects' : '/#projects', label: navCopy.projects, isRoute: false },
    { href: '/maintenance', label: navCopy.maintenance, isRoute: true },
    { href: isHome ? '#contact' : '/#contact', label: navCopy.contact, isRoute: false },
  ] as const;

  const handleQuoteClick = () => {
    if (onRequestQuote) {
      onRequestQuote();
      return;
    }
    router.push('/#contact-form');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0A0A0B]/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Brand Logo & Wordmark */}
        {isHome ? (
          <a
            href="#home"
            data-testid="navbar-logo-link"
            aria-label="ጥራት ፕላምቢንግ"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] sm:gap-3"
          >
            <Image
              src={tiratLogoMark}
              alt="ጥራት ፕላምቢንግ"
              priority
              referrerPolicy="no-referrer"
              data-testid="navbar-logo-img"
              className="h-8 w-auto shrink-0 object-contain mix-blend-lighten sm:h-9 lg:h-10"
            />
            <span className="text-sm font-bold tracking-tight text-[#F8FAFC] transition-colors group-hover:text-[#F59E0B] sm:text-base lg:text-lg whitespace-nowrap">
              ጥራት ፕላምቢንግ
            </span>
          </a>
        ) : (
          <Link
            href="/"
            data-testid="navbar-logo-link"
            aria-label="ጥራት ፕላምቢንግ"
            className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] sm:gap-3"
          >
            <Image
              src={tiratLogoMark}
              alt="ጥራት ፕላምቢንግ"
              priority
              referrerPolicy="no-referrer"
              data-testid="navbar-logo-img"
              className="h-8 w-auto shrink-0 object-contain mix-blend-lighten sm:h-9 lg:h-10"
            />
            <span className="text-sm font-bold tracking-tight text-[#F8FAFC] transition-colors group-hover:text-[#F59E0B] sm:text-base lg:text-lg whitespace-nowrap">
              ጥራት ፕላምቢንግ
            </span>
          </Link>
        )}

        {/* Desktop Single-Line Navigation */}
        <nav
          aria-label={navCopy.navAriaLabel}
          className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-[#A1A8B3]"
        >
          {navLinks.map((link) => {
            const activeRoute = link.isRoute && pathname === link.href;
            const linkClass = `whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#F8FAFC] hover:underline hover:decoration-[#F59E0B] hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] ${
              activeRoute
                ? 'text-[#F59E0B] underline decoration-[#F59E0B] underline-offset-8'
                : ''
            }`;

            return link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                scroll={false}
                data-testid="nav-maintenance-link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className={linkClass.replace('transition-colors ', '')}
              >
                {link.label}
              </Link>
            ) : (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Language Switcher + Primary Quote CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0 sm:gap-3">
          {/* Desktop / Tablet 4-Language Switcher */}
          <div
            role="group"
            aria-label={navCopy.languageLabel}
            className="hidden md:inline-flex items-center rounded-xl border border-white/[0.1] bg-[#111214] p-1"
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
                      ? 'bg-[#F59E0B] text-[#0A0A0B]'
                      : 'text-[#A1A8B3] hover:bg-[#16181D] hover:text-[#F8FAFC]'
                  }`}
                >
                  {opt.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Mobile Compact Language Selector */}
          <div className="relative flex items-center md:hidden">
            <Globe
              className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[#F59E0B]"
              aria-hidden="true"
            />
            <select
              aria-label={navCopy.languageLabel}
              data-testid="mobile-lang-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="min-h-[40px] appearance-none rounded-xl border border-white/[0.12] bg-[#111214] py-1.5 pl-7 pr-2.5 text-xs font-bold text-[#F5F2EB] focus:border-[#F59E0B] focus:outline-none"
            >
              {LOCALE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.shortLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Quote CTA */}
          <button
            type="button"
            onClick={handleQuoteClick}
            data-testid="header-quote-cta"
            className="hidden sm:inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#F59E0B] px-4 py-2 text-xs font-bold text-[#0A0A0B] transition-colors hover:bg-[#D97706] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] whitespace-nowrap shrink-0 lg:px-5"
          >
            {navCopy.quoteCta}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? navCopy.closeMenu : navCopy.openMenu}
            aria-expanded={mobileMenuOpen}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-white/[0.12] bg-[#111214] text-[#F5F2EB] lg:hidden hover:border-[#F59E0B]/60 hover:bg-[#16181D]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label={navCopy.mobileNavAriaLabel}
          className="border-t border-white/[0.08] bg-[#111214] px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            <div className="mb-2 grid grid-cols-4 gap-1.5 rounded-xl border border-white/[0.08] bg-[#0A0A0B] p-1 md:hidden">
              {LOCALE_OPTIONS.map((opt) => {
                const active = locale === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLocale(opt.code)}
                    className={`min-h-[34px] rounded-lg px-2 py-1 text-xs font-bold transition-colors ${
                      active
                        ? 'bg-[#F59E0B] text-[#0A0A0B]'
                        : 'text-[#A1A8B3] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {opt.shortLabel}
                  </button>
                );
              })}
            </div>

            {navLinks.map((link) => {
              const activeRoute = link.isRoute && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={link.isRoute ? true : undefined}
                  scroll={link.isRoute ? false : undefined}
                  data-testid={link.isRoute ? 'mobile-nav-maintenance-link' : undefined}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.isRoute) {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  }}
                  className={`flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium ${
                    activeRoute
                      ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                      : 'text-[#A1A8B3] hover:bg-[#16181D] hover:text-[#F8FAFC]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleQuoteClick();
              }}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#F59E0B] px-4 text-sm font-bold text-[#0A0A0B] hover:bg-[#D97706]"
            >
              {navCopy.quoteCta}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
