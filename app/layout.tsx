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
  title: 'ጥራት ፕላምቢንግ | Tirat Plumbing — Reliable Plumbing & Real Estate Contracting',
  description:
    'Reliable residential, commercial, and real estate plumbing services in Addis Ababa. Leak detection, drain cleaning, pipe replacement, water heaters, 24/7 emergency dispatch, and certified project handovers.',
  openGraph: {
    title: 'ጥራት ፕላምቢንግ | Tirat Plumbing — Reliable Plumbing & Real Estate Contracting',
    description:
      'Reliable residential, commercial, and real estate plumbing services in Addis Ababa with certified handover documentation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ጥራት ፕላምቢንግ | Tirat Plumbing — Reliable Plumbing & Real Estate Contracting',
    description:
      'Reliable residential, commercial, and real estate plumbing services in Addis Ababa with certified handover documentation.',
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
      <body suppressHydrationWarning className="min-h-screen bg-[#0A0A0B] text-[#F5F2EB]">
        {children}
      </body>
    </html>
  );
}
