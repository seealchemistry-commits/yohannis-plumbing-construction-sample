'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, Plus, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { formatEtb, getProductPriceForSize } from '@/lib/commerce/cart';
import {
  PRODUCT_SIZES,
  type Product,
  type ProductCategory,
  type ProductSize,
} from '@/lib/commerce/types';
import { PRODUCTS } from '@/lib/data/catalog';
import { MEDIA_ASSETS } from '@/lib/data/media';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

interface ShopSectionProps {
  onAddToCart: (product: Product, size: ProductSize) => void;
  onOpenCart: () => void;
  cartItemCount: number;
}

const CATEGORY_IDS: ProductCategory[] = [
  'ALL',
  'PIPES',
  'VALVES',
  'PUMPS',
  'SANITARY',
];

const FEATURED_PRODUCT_SPECS = [
  { id: 'PRD-101', tagKey: 'pprPipe' as const },
  { id: 'PRD-103', tagKey: 'boosterPump' as const },
  { id: 'PRD-104', tagKey: 'mixer' as const },
] as const;

export default function ShopSection({
  onAddToCart,
  onOpenCart,
  cartItemCount,
}: ShopSectionProps) {
  const { locale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, ProductSize>
  >({});
  const [recentlyAddedKey, setRecentlyAddedKey] = useState<string | null>(null);

  const localizedProducts = t.shop.products;

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'ALL' || product.category === selectedCategory;
      const localized =
        localizedProducts[product.id as keyof typeof localizedProducts];
      const matchesSearch =
        !q ||
        product.nameAm.toLowerCase().includes(q) ||
        product.specAm.toLowerCase().includes(q) ||
        (localized?.name.toLowerCase().includes(q) ?? false) ||
        (localized?.spec.toLowerCase().includes(q) ?? false) ||
        product.sku.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery, localizedProducts]);

  const getSelectedSize = (productId: string): ProductSize =>
    selectedSizes[productId] ?? '1/2"';

  const handleSelectSize = (productId: string, size: ProductSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product, explicitSize?: ProductSize) => {
    const size = explicitSize ?? getSelectedSize(product.id);
    onAddToCart(product, size);
    const feedbackKey = `${product.id}-${size}`;
    setRecentlyAddedKey(feedbackKey);
    setTimeout(() => {
      setRecentlyAddedKey((curr) => (curr === feedbackKey ? null : curr));
    }, 1200);
  };

  return (
    <section
      id="shop"
      className="overflow-x-clip border-b border-[rgba(212,175,55,0.22)] bg-[#12161C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <ScrollReveal className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
              {t.shop.eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              {t.shop.heading}
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-[#A1A8B3]">
              {t.shop.description}
            </p>
          </ScrollReveal>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[46px] items-center gap-2.5 self-start rounded-xl border border-[rgba(212,175,55,0.35)] bg-[#161B22] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] transition-colors hover:border-[#D4AF37] hover:bg-[#0B0D10] whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            <span>{t.shop.viewCartBtn}</span>
            <span className="font-mono tabular-nums text-[#D4AF37]">
              ({cartItemCount})
            </span>
          </button>
        </div>

        {/* Featured Supplies Spotlight (PPR Pipe, Booster Pump, Mixer) */}
        <div
          data-testid="featured-supplies"
          className="mt-10 rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#0B0D10] p-6"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              <h3 className="text-sm font-bold text-[#F8FAFC]">
                {t.shop.featuredHeading}
              </h3>
            </div>
            <p className="text-xs text-[#A1A8B3]">{t.shop.featuredSubtext}</p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {FEATURED_PRODUCT_SPECS.map(({ id, tagKey }) => {
              const product = PRODUCTS.find((p) => p.id === id);
              if (!product) return null;
              const localized =
                t.shop.products[product.id as keyof typeof t.shop.products];
              const productName = localized?.name ?? product.nameAm;
              const activeSize = getSelectedSize(product.id);
              const activePrice = getProductPriceForSize(product, activeSize);
              const justAdded =
                recentlyAddedKey === `${product.id}-${activeSize}`;

              return (
                <div
                  key={product.id}
                  data-testid={`featured-supply-${product.id}`}
                  className="flex items-center gap-3.5 rounded-xl border border-[#2A2416] bg-[#161B22] p-3.5 transition-colors hover:border-[#D4AF37]/50"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[rgba(212,175,55,0.22)] bg-[#0B0D10]">
                    <Image
                      src={MEDIA_ASSETS[product.imageKey]}
                      alt={productName}
                      fill
                      referrerPolicy="no-referrer"
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      {t.shop.featuredBadge} · {t.shop.featuredTags[tagKey]}
                    </span>
                    <p className="truncate text-xs font-semibold text-[#F8FAFC]">
                      {productName}
                    </p>
                    <p className="mt-0.5 font-mono tabular-nums text-xs font-bold text-[#D4AF37]">
                      {formatEtb(activePrice, locale)}{' '}
                      <span className="font-normal text-[#A1A8B3]">
                        ({activeSize})
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAdd(product, activeSize)}
                    aria-label={`${t.shop.addToCartBtn} — ${productName}`}
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      justAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#D4AF37] text-[#0B0D10] hover:bg-[#E5C158]'
                    }`}
                  >
                    {justAdded ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search & Segmented Category Filter */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label={t.shop.categoriesAriaLabel}
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#2A2416] bg-[#0B0D10] p-1.5"
          >
            {CATEGORY_IDS.map((categoryId) => {
              const active = selectedCategory === categoryId;
              return (
                <button
                  key={categoryId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(categoryId)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D4AF37] text-[#0B0D10]'
                      : 'text-[#A1A8B3] hover:bg-[#161B22] hover:text-[#F8FAFC]'
                  }`}
                >
                  {t.shop.categories[categoryId]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="shop-search" className="sr-only">
              {t.shop.searchLabel}
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]"
              aria-hidden="true"
            />
            <input
              id="shop-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.shop.searchPlaceholder}
              className="min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] py-2 pl-10 pr-3.5 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/55 focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-12 text-center">
            <p className="text-sm font-semibold text-[#F8FAFC]">
              {t.shop.emptyTitle}
            </p>
            <p className="mt-1.5 text-xs text-[#A1A8B3]">
              {t.shop.emptyHint}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex min-h-[40px] items-center rounded-xl border border-[rgba(212,175,55,0.4)] bg-[#12161C] px-5 py-2 text-xs font-semibold text-[#F8FAFC] hover:bg-[#D4AF37] hover:text-[#0B0D10]"
            >
              {t.shop.clearFilterBtn}
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const activeSize = getSelectedSize(product.id);
              const activePrice = getProductPriceForSize(product, activeSize);
              const justAdded =
                recentlyAddedKey === `${product.id}-${activeSize}`;
              const localized =
                t.shop.products[product.id as keyof typeof t.shop.products];
              const productName = localized?.name ?? product.nameAm;
              const productSpec = localized?.spec ?? product.specAm;
              const categoryLabel =
                localized?.categoryLabel ?? product.categoryLabelAm;
              const unitLabel = localized?.unit ?? product.unitAm;

              return (
                <ScrollReveal key={product.id} className="h-full">
                  <article
                    data-testid={`product-card-${product.id}`}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#D4AF37]/60"
                  >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[rgba(212,175,55,0.16)] bg-[#0B0D10]">
                      <Image
                        src={MEDIA_ASSETS[product.imageKey]}
                        alt={productName}
                        fill
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#161B22]/55 to-transparent"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#A1A8B3]">
                        <span className="font-medium text-[#D4AF37]">
                          {categoryLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{product.sku}</span>
                      </div>
                      <h3 className="mt-2.5 text-base font-semibold leading-snug text-[#F8FAFC]">
                        {productName}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#A1A8B3]">
                        {productSpec}
                      </p>

                      {/* Size Selector (1/2", 3/4", 1") */}
                      <div className="mt-5">
                        <span className="block text-xs font-medium text-[#A1A8B3]">
                          {t.shop.sizeLabel}
                        </span>
                        <div
                          role="group"
                          aria-label={t.shop.sizeGroupAriaLabel(productName)}
                          className="mt-2 grid grid-cols-3 gap-2"
                        >
                          {PRODUCT_SIZES.map((size) => {
                            const selected = activeSize === size;
                            return (
                              <button
                                key={size}
                                type="button"
                                aria-pressed={selected}
                                aria-label={t.shop.sizeAriaLabel(
                                  productName,
                                  size
                                )}
                                onClick={() =>
                                  handleSelectSize(product.id, size)
                                }
                                className={`min-h-[38px] rounded-lg border px-2 py-1 font-mono tabular-nums text-xs font-semibold transition-colors ${
                                  selected
                                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B0D10]'
                                    : 'border-[#2A2416] bg-[#0B0D10] text-[#A1A8B3] hover:border-[#D4AF37]/50 hover:text-[#F8FAFC]'
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#2A2416] px-6 py-4">
                    <div>
                      <p
                        data-testid={`product-price-${product.id}`}
                        className="font-mono tabular-nums text-base font-bold text-[#F8FAFC]"
                      >
                        {formatEtb(activePrice, locale)}
                      </p>
                      <p className="text-xs text-[#A1A8B3]">
                        <span className="font-mono text-[#D4AF37]">
                          {activeSize}
                        </span>{' '}
                        · {unitLabel} · {t.shop.inStockLabel(product.stockCount)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        justAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#D4AF37] text-[#0B0D10] hover:bg-[#E5C158]'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.shop.addedBtn}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.shop.addToCartBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Section-End CTA Bar */}
        <div
          data-testid="shop-section-cta"
          className="mt-14 flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#0B0D10] p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-semibold text-[#F8FAFC]">
            {t.shop.sectionCtaTitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#booking"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] whitespace-nowrap"
            >
              <span>{t.shop.sectionCtaBookingBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.35)] bg-[#161B22] px-4 py-2 text-xs font-semibold text-[#F5F2EB] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] whitespace-nowrap"
            >
              {t.shop.sectionCtaContactBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
