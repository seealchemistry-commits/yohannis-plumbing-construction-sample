'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  addItemToCart,
  calculateCartSummary,
  removeItemFromCart,
  updateCartItemQuantity,
} from '@/lib/commerce/cart';
import {
  PRODUCT_SIZES,
  type BookingRecord,
  type CartItem,
  type OrderRecord,
  type Product,
  type ProductSize,
} from '@/lib/commerce/types';
import {
  AVAILABLE_TIME_SLOTS,
} from '@/lib/booking/schedule';
import { PRODUCTS, SERVICES } from '@/lib/data/catalog';
import { LanguageProvider } from '@/lib/i18n/context';
import AboutSection from './AboutSection';
import BlogAndContactSection from './BlogAndContactSection';
import BookingSection from './BookingSection';
import CartDrawer from './CartDrawer';
import FeaturedVideoSection from './FeaturedVideoSection';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import HeroSection from './HeroSection';
import { installGmpQuotaTap } from './OfficeGoogleMap';
import QuickActionsSection from './QuickActionsSection';
import ServicesSection from './ServicesSection';
import ShopSection from './ShopSection';
import SiteHeader from './SiteHeader';
import TestimonialsSection from './TestimonialsSection';
import TrustStatsParallaxBanner from './TrustStatsParallaxBanner';

interface AbayAppProps {
  initialOrders: OrderRecord[];
  initialBookings: BookingRecord[];
  mapsApiKey: string;
}

const CART_STORAGE_KEY = 'yohannes_plumbing_cart_v1';
const EMPTY_CART_JSON = '[]';
const CART_CHANGE_EVENT = 'yohannes-cart-change';

function subscribeCartStore(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(CART_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

function getCartSnapshot(): string {
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY) ?? EMPTY_CART_JSON;
  } catch {
    return EMPTY_CART_JSON;
  }
}

function getServerCartSnapshot(): string {
  return EMPTY_CART_JSON;
}

function writeCartToStorage(nextCart: CartItem[]): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
    window.dispatchEvent(new Event(CART_CHANGE_EVENT));
  } catch {
    // Ignore storage errors
  }
}

function parseCartSafely(rawJson: string): CartItem[] {
  try {
    const parsed = JSON.parse(rawJson) as unknown;
    if (!Array.isArray(parsed)) return [];
    const safeItems: CartItem[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue;
      const candidate = item as {
        product?: { id?: unknown };
        size?: unknown;
        quantity?: unknown;
      };
      const catalogProduct = PRODUCTS.find(
        (p) => p.id === candidate.product?.id
      );
      const validSize = PRODUCT_SIZES.includes(candidate.size as ProductSize)
        ? (candidate.size as ProductSize)
        : '1/2"';
      const qty = Number(candidate.quantity);
      if (catalogProduct && Number.isInteger(qty) && qty > 0) {
        safeItems.push({
          product: catalogProduct,
          size: validSize,
          quantity: Math.min(qty, catalogProduct.stockCount),
        });
      }
    }
    return safeItems;
  } catch {
    return [];
  }
}

function AbayAppContent({
  initialBookings,
  mapsApiKey,
}: AbayAppProps) {
  const cartJson = useSyncExternalStore(
    subscribeCartStore,
    getCartSnapshot,
    getServerCartSnapshot
  );

  const cart = parseCartSafely(cartJson);

  const [cartOpen, setCartOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    SERVICES[0].id
  );
  const [preferredDate, setPreferredDate] = useState<string>(() =>
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [timeSlot, setTimeSlot] = useState<string>(AVAILABLE_TIME_SLOTS[0]);

  useEffect(() => {
    installGmpQuotaTap();
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const summary = calculateCartSummary(cart);

  const handleAddToCart = (product: Product, size: ProductSize) => {
    writeCartToStorage(addItemToCart(cart, product, size, 1));
  };

  const handleUpdateQty = (
    productId: string,
    size: ProductSize,
    nextQty: number
  ) => {
    writeCartToStorage(updateCartItemQuantity(cart, productId, size, nextQty));
  };

  const handleRemoveItem = (productId: string, size: ProductSize) => {
    writeCartToStorage(removeItemFromCart(cart, productId, size));
  };

  const handleOrderConfirmed = () => {
    writeCartToStorage([]);
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmergencyQuickAction = () => {
    setSelectedServiceId('SRV-05');
    setPreferredDate(new Date().toISOString().slice(0, 10));
    setTimeSlot(AVAILABLE_TIME_SLOTS[4]);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F2EB]">
      {quotaExceeded && (
        <div
          role="alert"
          className="relative z-50 border-b border-[#D4AF37]/40 bg-[#161B22] px-4 py-2.5 text-center text-xs text-[#F5F2EB] shadow-sm md:text-sm"
        >
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D4AF37] underline hover:text-[#E5C158]"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <SiteHeader
        cartItemCount={summary.itemCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <HeroSection />

        <QuickActionsSection
          onEmergencyQuickAction={handleEmergencyQuickAction}
        />

        <TrustStatsParallaxBanner />

        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        <FeaturedVideoSection />

        <BookingSection
          selectedServiceId={selectedServiceId}
          onChangeServiceId={setSelectedServiceId}
          preferredDate={preferredDate}
          onChangePreferredDate={setPreferredDate}
          timeSlot={timeSlot}
          onChangeTimeSlot={setTimeSlot}
          bookings={bookings}
          onBookingCreated={(newBooking) =>
            setBookings((prev) => [newBooking, ...prev])
          }
        />

        <ShopSection
          onAddToCart={handleAddToCart}
          onOpenCart={() => setCartOpen(true)}
          cartItemCount={summary.itemCount}
        />

        <AboutSection />

        <TestimonialsSection />

        <BlogAndContactSection mapsApiKey={mapsApiKey} />
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <FloatingWhatsAppButton hidden={cartOpen} />
    </div>
  );
}

export default function AbayApp(props: AbayAppProps) {
  return (
    <LanguageProvider>
      <AbayAppContent {...props} />
    </LanguageProvider>
  );
}
