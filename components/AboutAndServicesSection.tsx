'use client';

import Image from 'next/image';
import { Calendar, Check } from 'lucide-react';
import { COMPLETED_PROJECTS, COMPANY_INFO, SERVICES } from '@/lib/data/catalog';

interface AboutAndServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function AboutAndServicesSection({
  onSelectServiceForBooking,
}: AboutAndServicesSectionProps) {
  return (
    <>
      {/* Services Section */}
      <section id="services" className="border-b border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-sky-800">አገልግሎቶቻችን</p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              በቧንቧ ስራና በህንጻ ግንባታ የተሟላ የምህንድስና መፍትሄ
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              ከአነስተኛ የቤት ውስጥ ጥገና እስከ ትላልቅ ባለብዙ ፎቅ ህንጻዎች ሙሉ የሳኒተሪና የግንባታ
              ስራ ድረስ በባለሙያ መሐንዲሶች እንመራለን።
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className={`flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 ${
                  service.featured ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      <span className="mr-2 font-mono tabular-nums text-sm font-semibold text-sky-800">
                        {service.number}.
                      </span>{' '}
                      {service.titleAm}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {service.summaryAm}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.deliverablesAm.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">
                    የሚፈጀው ጊዜ · {service.estimatedDurationAm}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 whitespace-nowrap shrink-0"
                  >
                    <Calendar className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
                    <span>ቀጠሮ ይያዙ</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About & Proof Section */}
      <section id="about" className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 lg:h-full lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src="/assets/aistudio/photo_2026-11-19_03-39-11_400c319a.jpg"
                  alt="የዮሐንስ Plumbing መስራች እና ዋና ባለሙያ በግንባታ ሳይት ላይ"
                  fill
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-xs font-medium text-sky-800">ስለ ድርጅታችን</p>
                <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  በቧንቧ ስራና በግንባታ ጥራት የተገነባ መልካም ስም
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {COMPANY_INFO.brandNameAm} በአዲስ አበባ የተመሰረተ ሲሆን፣ በተለይ በዘመናዊ
                  የህንጻ የውሃና ፍሳሽ ቧንቧ (Sanitary & Plumbing) ስራዎች ከፍተኛ እውቅና ያተረፈ
                  ድርጅት ነው። የራሳችን የቧንቧ እቃዎች አቅርቦት ስላለን ደንበኞቻችን ኦሪጅናል PPR፣
                  ብራስ ቫልቮችና ፓምፖችን በተመጣጣኝ ዋጋ በአንድ ቦታ ያገኛሉ።
                </p>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  በቅርቡ የተጠናቀቁ ዋና ዋና ፕሮጀክቶች
                </h3>
                <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                  {COMPLETED_PROJECTS.map((project) => (
                    <div
                      key={project.nameAm}
                      className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {project.nameAm}
                        </p>
                        <p className="text-xs text-slate-600">
                          {project.scopeAm}
                        </p>
                      </div>
                      <p className="shrink-0 font-mono tabular-nums text-xs font-medium text-sky-800">
                        {project.metricAm}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
