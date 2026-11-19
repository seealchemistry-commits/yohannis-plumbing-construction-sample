import AbayApp from '@/components/AbayApp';
import { listBookings, listOrders } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [orders, bookings] = await Promise.all([
    listOrders(),
    listBookings(),
  ]);

  return <AbayApp initialOrders={orders} initialBookings={bookings} />;
}
