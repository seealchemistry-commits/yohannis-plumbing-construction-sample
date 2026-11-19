'use client';

import Image from 'next/image';
import { ArrowUpRight, Phone, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';

const KEY_STATS = [
  {
    value: '14+ ዓመት',
    label: 'የቧንቧ መስመርና የህንጻ ግንባታ ልምድ',
  },
  {
    value: '320+',
    label: 'በአዲስ አበባና አካባቢው የተጠናቀቁ ፕሮጀክቶች',
  },
  {
    value: '24/7',
    label: 'የድንገተኛ የውሃ ፍሳሽ ጥገና አገልግሎት',
  },
  {
    value: '2 ዓመት',
    label: 'በሁሉም የቧንቧ ስራዎቻችን ላይ የጽሁፍ ዋስትና',
  },
] as const;

export default function HeroSection() {
  return (
    <section
      id="home"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-medium text-sky-800">
              አዲስ አበባ · {COMPANY_INFO.brandNameAm} · የቧንቧ ኢንጂነሪንግና ግንባታ
            </p>
            <h1 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              ዘመናዊ የቧንቧ መስመር ዝርጋታ እና አስተማማኝ የህንጻ ግንባታ
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              {COMPANY_INFO.brandNameAm} ለመኖሪያ ቤቶች፣ ለንግድ ህንጻዎች እና ለፋብሪካዎች የውሃና
              የፍሳሽ ቧንቧ ስርዓትን በግፊት መለኪያ በመፈተሽ በከፍተኛ ጥራት ይዘረጋል፤ የቧንቧ
              እቃዎችንም በቀጥታ ያቀርባል።
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 whitespace-nowrap shrink-0"
              >
                የሳይት ፍተሻ ቀጠሮ ያስይዙ
              </a>
              <a
                href="#shop"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 whitespace-nowrap shrink-0"
              >
                <span>የቧንቧ እቃዎች መደብር</span>
                <ArrowUpRight className="h-4 w-4 text-slate-500" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-sky-700" aria-hidden="true" />
              <span>ቀጥታ ስልክ፡</span>
              <a
                href={COMPANY_INFO.phoneHref}
                className="font-mono tabular-nums font-semibold text-slate-900 hover:text-sky-800 hover:underline"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 lg:h-full lg:aspect-auto lg:min-h-[440px]">
              <Image
                src="/assets/aistudio/photo_2026-11-19_03-37-24_305f48e9.jpg"
                alt="የዮሐንስ Plumbing ባለሙያ በሳይት ላይ የPPR የውሃ ቧንቧ መስመር እና ቫልቮችን ሲገጥም"
                fill
                priority
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-4 pt-10">
                <div className="flex items-center gap-2 text-xs font-medium text-white">
                  <Wrench className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
                  <span>በሳይት ላይ የተሰራ የPPR ማከፋፈያ መስመርና የብራስ ቫልቭ ዝርጋታ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column proof strip below the hero split */}
        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 lg:grid-cols-4 lg:gap-8">
          {KEY_STATS.map((stat, idx) => (
            <div
              key={stat.value}
              className={
                idx > 0 ? 'lg:border-l lg:border-slate-200 lg:pl-6' : ''
              }
            >
              <p className="font-mono tabular-nums text-2xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
