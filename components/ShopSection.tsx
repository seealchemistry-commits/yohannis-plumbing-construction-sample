'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Check, Plus, Search, ShoppingBag } from 'lucide-react';
import { formatEtb, getProductPriceForSize } from '@/lib/commerce/cart';
import {
  PRODUCT_SIZES,
  type OrderRecord,
  type Product,
  type ProductCategory,
  type ProductSize,
} from '@/lib/commerce/types';
import {
  getLandmarkLabel,
  getSubCityLabel,
  getWoredaLabel,
} from '@/lib/data/addis-addresses';
import { PRODUCTS } from '@/lib/data/catalog';
import { MEDIA_ASSETS } from '@/lib/data/media';
import {
  getLocalizedProductName,
  getLocalizedSeededLandmark,
  getLocalizedSeededName,
} from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n/context';

interface ShopSectionProps {
  onAddToCart: (product: Product, size: ProductSize) => void;
  onOpenCart: () => void;
  cartItemCount: number;
  recentOrders: OrderRecord[];
}

const CATEGORY_IDS: ProductCategory[] = [
  'ALL',
  'PIPES',
  'VALVES',
  'PUMPS',
  'SANITARY',
];

export default function ShopSection({
  onAddToCart,
  onOpenCart,
  cartItemCount,
  recentOrders,
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

  const handleAdd = (product: Product) => {
    const size = getSelectedSize(product.id);
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
      className="border-b border-[rgba(212,175,55,0.22)] bg-[#12161C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
              {t.shop.eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              {t.shop.heading}
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-[#A1A8B3]">
              {t.shop.description}
            </p>
          </div>

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

        {/* Search & Segmented Category Filter */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                <article
                  key={product.id}
                  data-testid={`product-card-${product.id}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#D4AF37]/60"
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
              );
            })}
          </div>
        )}

        {/* Recent Confirmed Orders List */}
        {recentOrders.length > 0 && (
          <div className="mt-16 rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2416] pb-4">
              <h3 className="text-sm font-bold text-[#F8FAFC]">
                {t.shop.recentOrdersHeading}
              </h3>
              <span className="text-xs text-[#A1A8B3]">
                {t.shop.totalOrdersLabel} ·{' '}
                <span className="font-mono tabular-nums text-[#D4AF37]">
                  {recentOrders.length}
                </span>
              </span>
            </div>

            <div className="mt-2 divide-y divide-[#2A2416]">
              {recentOrders.slice(0, 4).map((order) => {
                const landmarkNote = getLocalizedSeededLandmark(
                  order.specificLandmark,
                  locale
                );
                return (
                  <div
                    key={order.id}
                    className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#F8FAFC]">
                        <span className="font-mono text-xs font-semibold text-[#D4AF37]">
                          {order.id}
                        </span>
                        <span
                          className="mx-1.5 text-[#A1A8B3]/40"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                        <span>
                          {getLocalizedSeededName(order.customerName, locale)}
                        </span>
                      </p>
                      <p className="text-xs text-[#A1A8B3]">
                        {getSubCityLabel(order.subCity, locale)} ·{' '}
                        {getWoredaLabel(order.woreda, locale)} ·{' '}
                        {getLandmarkLabel(order.neighborhood, locale)}
                        {landmarkNote ? ` (${landmarkNote})` : ''}
                      </p>
                      <p className="mt-1 text-xs text-[#F5F2EB]/80">
                        {order.items
                          .map(
                            (item) =>
                              `${getLocalizedProductName(
                                item.productId,
                                item.nameAm,
                                locale
                              )} (${t.shop.sizeTag(item.size)}) × ${
                                item.quantity
                              }`
                          )
                          .join(' · ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs shrink-0">
                      <span className="font-medium text-emerald-400">
                        {t.shop.confirmedStatus}
                      </span>
                      <span className="font-mono tabular-nums font-bold text-[#F8FAFC]">
                        {formatEtb(order.totalEtb, locale)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
