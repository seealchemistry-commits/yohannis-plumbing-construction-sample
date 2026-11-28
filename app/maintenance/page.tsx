import type { Metadata } from 'next';
import MaintenancePageClient from '@/components/MaintenancePageClient';

export const metadata: Metadata = {
  title: 'Maintenance & Dedicated Technician Staffing | ጥራት ፕላምቢንግ',
  description:
    'Request vetted permanent plumbing maintenance technicians or monthly contracts for buildings, apartments, and hotels, or apply as a qualified technician with Tirat Plumbing.',
};

export default function MaintenancePage() {
  return <MaintenancePageClient />;
}
