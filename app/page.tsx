import AbayApp from '@/components/AbayApp';
import { listBookings, listOrders } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [orders, bookings] = await Promise.all([
    listOrders(),
    listBookings(),
  ]);
  const mapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
    process.env.GOOGLE_MAPS_API_KEY ??
    '';

  return (
    <AbayApp
      initialOrders={orders}
      initialBookings={bookings}
      mapsApiKey={mapsApiKey}
    />
  );
}
