'use client';

import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';

interface SiteHeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'መነሻ' },
  { href: '#about', label: 'ስለ እኛ' },
  { href: '#services', label: 'አገልግሎቶች' },
  { href: '#shop', label: 'መደብር' },
  { href: '#blog', label: 'ብሎግ' },
] as const;

export default function SiteHeader({
  cartItemCount,
  onOpenCart,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#home"
          className="whitespace-nowrap shrink-0 text-lg font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
        >
          {COMPANY_INFO.brandNameAm}
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="ዋና ማውጫ"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-slate-900 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart trigger + Primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`የግብይት ጋሪ (${cartItemCount} እቃዎች)`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-4 w-4 text-slate-700" aria-hidden="true" />
            <span>ጋሪ</span>
            <span
              data-testid="header-cart-count"
              className="font-mono tabular-nums text-sky-800 font-semibold"
            >
              {cartItemCount}
            </span>
          </button>

          <a
            href="#booking"
            className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 whitespace-nowrap shrink-0"
          >
            ቀጠሮ ያስይዙ
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'ማውጫ ዝጋ' : 'ማውጫ ክፈት'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden hover:bg-slate-50"
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
          aria-label="የሞባይል ማውጫ"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white"
            >
              ቀጠሮ ያስይዙ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              አድራሻ እና መገኛ
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
