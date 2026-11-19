import type { Metadata } from 'next';
import {
  Noto_Sans_Ethiopic,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const ethiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ethiopic',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tirat Plumbing | Pipe Installation, 24/7 Repair & Supplies',
  description:
    '24/7 Emergency Leak Repair, professional PPR, PVC and Copper pipe installation, Booster Pump setup, and original plumbing supplies in Addis Ababa.',
  openGraph: {
    title: 'Tirat Plumbing | Pipe Installation, 24/7 Repair & Supplies',
    description:
      '24/7 Emergency Leak Repair, professional PPR, PVC and Copper pipe installation, Booster Pump setup, and original plumbing supplies in Addis Ababa.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tirat Plumbing | Pipe Installation, 24/7 Repair & Supplies',
    description:
      '24/7 Emergency Leak Repair, professional PPR, PVC and Copper pipe installation, Booster Pump setup, and original plumbing supplies in Addis Ababa.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ethiopic.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-[#0B0D10] text-[#F5F2EB]">
        {children}
      </body>
    </html>
  );
}
