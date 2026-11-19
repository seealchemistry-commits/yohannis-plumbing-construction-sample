'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Check, Plus, Search, ShoppingBag } from 'lucide-react';
import { formatEtb } from '@/lib/commerce/cart';
import type { OrderRecord, Product, ProductCategory } from '@/lib/commerce/types';
import { PRODUCTS } from '@/lib/data/catalog';
import { MEDIA_ASSETS } from '@/lib/data/media';

interface ShopSectionProps {
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
  cartItemCount: number;
  recentOrders: OrderRecord[];
}

const CATEGORIES: Array<{ id: ProductCategory; label: string }> = [
  { id: 'ALL', label: 'ሁሉም እቃዎች' },
  { id: 'PIPES', label: 'ቧንቧዎች' },
  { id: 'VALVES', label: 'ቫልቮች' },
  { id: 'PUMPS', label: 'ፓምፕና ታንከር' },
  { id: 'SANITARY', label: 'የመታጠቢያ እቃዎች' },
];

export default function ShopSection({
  onAddToCart,
  onOpenCart,
  cartItemCount,
  recentOrders,
}: ShopSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'ALL' || product.category === selectedCategory;
      const matchesSearch =
        !q ||
        product.nameAm.toLowerCase().includes(q) ||
        product.specAm.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  return (
    <section id="shop" className="border-b border-slate-200 bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-sky-800">ኦንላይን ግብይት</p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              የቧንቧና የግንባታ እቃዎች መደብር
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              ኦሪጅናል የPPR ቧንቧዎች፣ ብራስ ቫልቮችና ፓምፖች በቀጥታ ይዘዙ። ከ15,000 ብር በላይ
              በአዲስ አበባ ነጻ ትራንስፖርት አለን።
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>ጋሪ ይመልከቱ</span>
            <span className="font-mono tabular-nums text-sky-300">
              ({cartItemCount})
            </span>
          </button>
        </div>

        {/* Search & Segmented Category Filter */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="የእቃ ምድቦች"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="shop-search" className="sr-only">
              የቧንቧ እቃዎችን ይፈልጉ
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="shop-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="በስም ወይም በSKU ይፈልጉ..."
              className="min-h-[40px] w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-slate-900">
              ከፍለጋዎ ጋር የሚዛመድ እቃ አልተገኘም።
            </p>
            <p className="mt-1 text-xs text-slate-500">
              ሌላ ቃል ይሞክሩ ወይም ሁሉንም እቃዎች ይመልከቱ።
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
            >
              ማጣሪያውን አጽዳ
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const justAdded = recentlyAddedId === product.id;
              return (
                <article
                  key={product.id}
                  data-testid={`product-card-${product.id}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-100 bg-slate-100">
                      <Image
                        src={MEDIA_ASSETS[product.imageKey]}
                        alt={product.nameAm}
                        fill
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{product.categoryLabelAm}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{product.sku}</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold text-slate-900">
                        {product.nameAm}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {product.specAm}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                    <div>
                      <p className="font-mono tabular-nums text-base font-bold text-slate-900">
                        {formatEtb(product.priceEtb)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {product.unitAm} · በመጋዘን {product.stockCount} አለ
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        justAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>ተጨምሯል</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>ወደ ጋሪ ጨምር</span>
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
          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <h3 className="text-sm font-semibold text-slate-900">
                በቅርቡ የተረጋገጡ የእቃ ትዕዛዞች
              </h3>
              <span className="text-xs text-slate-500">
                ጠቅላላ ትዕዛዞች · <span className="font-mono tabular-nums">{recentOrders.length}</span>
              </span>
            </div>

            <div className="mt-2 divide-y divide-slate-100">
              {recentOrders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-mono text-xs font-semibold text-sky-800">
                        {order.id}
                      </span>
                      <span className="mx-1.5 text-slate-300" aria-hidden="true">·</span>
                      <span>{order.customerName}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.subCity} · {order.items.length} አይነት እቃዎች
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-medium text-emerald-700">
                      ተረጋግጧል
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {formatEtb(order.totalEtb)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
