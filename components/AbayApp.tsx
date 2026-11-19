'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  addItemToCart,
  calculateCartSummary,
  removeItemFromCart,
  updateCartItemQuantity,
} from '@/lib/commerce/cart';
import type {
  BookingRecord,
  CartItem,
  OrderRecord,
  Product,
} from '@/lib/commerce/types';
import { SERVICES } from '@/lib/data/catalog';
import AboutAndServicesSection from './AboutAndServicesSection';
import BlogAndContactSection from './BlogAndContactSection';
import BookingSection from './BookingSection';
import CartDrawer from './CartDrawer';
import HeroSection from './HeroSection';
import ShopSection from './ShopSection';
import SiteHeader from './SiteHeader';

interface AbayAppProps {
  initialOrders: OrderRecord[];
  initialBookings: BookingRecord[];
}

const CART_STORAGE_KEY = 'abay_construction_cart_v1';
const EMPTY_CART_JSON = '[]';
const CART_CHANGE_EVENT = 'abay-cart-change';

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

export default function AbayApp({
  initialOrders,
  initialBookings,
}: AbayAppProps) {
  const cartJson = useSyncExternalStore(
    subscribeCartStore,
    getCartSnapshot,
    getServerCartSnapshot
  );

  let cart: CartItem[] = [];
  try {
    const parsed = JSON.parse(cartJson) as CartItem[];
    if (Array.isArray(parsed)) {
      cart = parsed;
    }
  } catch {
    cart = [];
  }

  const [cartOpen, setCartOpen] = useState(false);

  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    SERVICES[0].id
  );

  const summary = calculateCartSummary(cart);

  const handleAddToCart = (product: Product) => {
    writeCartToStorage(addItemToCart(cart, product, 1));
  };

  const handleUpdateQty = (productId: string, nextQty: number) => {
    writeCartToStorage(updateCartItemQuantity(cart, productId, nextQty));
  };

  const handleRemoveItem = (productId: string) => {
    writeCartToStorage(removeItemFromCart(cart, productId));
  };

  const handleOrderConfirmed = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    writeCartToStorage([]);
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader
        cartItemCount={summary.itemCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <HeroSection />

        <AboutAndServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        <ShopSection
          onAddToCart={handleAddToCart}
          onOpenCart={() => setCartOpen(true)}
          cartItemCount={summary.itemCount}
          recentOrders={orders}
        />

        <BookingSection
          selectedServiceId={selectedServiceId}
          onChangeServiceId={setSelectedServiceId}
          bookings={bookings}
          onBookingCreated={(newBooking) =>
            setBookings((prev) => [newBooking, ...prev])
          }
        />

        <BlogAndContactSection />
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onOrderConfirmed={handleOrderConfirmed}
      />
    </div>
  );
}
