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
  title: 'ዮሐንስ Plumbing | የቧንቧ ስራ፣ ግንባታ እና ኦንላይን መደብር',
  description:
    'ዘመናዊ የቧንቧ መስመር ዝርጋታ፣ የህንጻ ግንባታ፣ የቧንቧ እቃዎች ኦንላይን ግብይት፣ የቀጠሮ ማስያዣ እና የቴክኒክ ዜናዎች።',
  openGraph: {
    title: 'ዮሐንስ Plumbing | የቧንቧ ስራ፣ ግንባታ እና ኦንላይን መደብር',
    description:
      'ዘመናዊ የቧንቧ መስመር ዝርጋታ፣ የህንጻ ግንባታ፣ የቧንቧ እቃዎች ኦንላይን ግብይት፣ የቀጠሮ ማስያዣ እና የቴክኒክ ዜናዎች።',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ዮሐንስ Plumbing | የቧንቧ ስራ፣ ግንባታ እና ኦንላይን መደብር',
    description:
      'ዘመናዊ የቧንቧ መስመር ዝርጋታ፣ የህንጻ ግንባታ፣ የቧንቧ እቃዎች ኦንላይን ግብይት፣ የቀጠሮ ማስያዣ እና የቴክኒክ ዜናዎች።',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="am"
      className={`${ethiopic.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
