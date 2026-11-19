'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import { isValidEthiopianPhone } from '@/lib/commerce/cart';
import type { BlogArticle, ContactInput } from '@/lib/commerce/types';
import { BLOG_ARTICLES, COMPANY_INFO } from '@/lib/data/catalog';
import { MEDIA_ASSETS } from '@/lib/data/media';

export default function BlogAndContactSection() {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactInput, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sentRefId, setSentRefId] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSentRefId(null);

    const errs: Partial<Record<keyof ContactInput, string>> = {};
    if (fullName.trim().length < 2) errs.fullName = 'እባክዎ ሙሉ ስምዎን ያስገቡ።';
    if (!isValidEthiopianPhone(phone))
      errs.phone = 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (0911234567)።';
    if (subject.trim().length < 3) errs.subject = 'እባክዎ ርዕስ ይግለጹ።';
    if (message.trim().length < 6) errs.message = 'እባክዎ መልእክትዎን በዝርዝር ይጻፉ።';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, subject, message }),
      });
      const data = (await res.json()) as {
        contact?: { id: string };
        error?: string;
        fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      };

      if (!res.ok || !data.contact) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error ?? 'መልእክቱን መላክ አልተቻለም።');
        return;
      }

      setSentRefId(data.contact.id);
      setFullName('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setSubmitError('ከሰርቨር ጋር መገናኘት አልተቻለም።');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Blog & News Section */}
      <section id="blog" className="border-b border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-sky-800">ብሎግ እና ዜና</p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              የቧንቧ ምህንድስና ምክሮችና የድርጅታችን ዜናዎች
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {BLOG_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-100 bg-slate-100">
                    <Image
                      src={MEDIA_ASSETS[article.imageKey]}
                      alt={article.titleAm}
                      fill
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{article.categoryAm}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedDateAm}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTimeAm}</span>
                    </div>
                    <h3 className="mt-2.5 text-base font-semibold leading-snug text-slate-900">
                      {article.titleAm}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {article.excerptAm}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 px-5 py-3.5">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-sky-800 hover:text-sky-950"
                  >
                    <span>ሙሉውን ጽሁፍ ያንብቡ</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-sky-800">አድራሻ እና መገኛ</p>
              <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                ያግኙን ወይም የዋጋ ግምት ይጠይቁ
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                ለአዲስ ግንባታ የቧንቧ ስራ ጨረታ፣ ለጅምላ እቃ አቅርቦት ወይም ለድንገተኛ ጥገና
                በቀጥታ ይደውሉልን ወይም መልእክት ይላኩልን።
              </p>

              <dl className="mt-8 space-y-5 border-t border-slate-200 pt-6 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">ዋና ቢሮ</dt>
                    <dd className="mt-0.5 text-slate-900">
                      {COMPANY_INFO.addressAm}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">ስልክ</dt>
                    <dd className="mt-0.5 font-mono tabular-nums text-slate-900">
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="hover:text-sky-800 hover:underline"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">ኢሜይል</dt>
                    <dd className="mt-0.5 font-mono text-slate-900">
                      {COMPANY_INFO.email}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-slate-500">
                      የስራ ሰዓት
                    </dt>
                    <dd className="mt-0.5 text-slate-900">
                      {COMPANY_INFO.hoursAm}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                noValidate
                className="space-y-4"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  ቀጥታ መልእክት ይላኩ
                </h3>

                {submitError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {submitError}
                  </p>
                )}

                {sentRefId && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-slate-800">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <span>
                      መልእክትዎ በተሳካ ሁኔታ ደርሶናል (መለያ፡{' '}
                      <strong className="font-mono">{sentRefId}</strong>)። የደንበኛ
                      አገልግሎት ቡድናችን በቅርቡ ይደውልልዎታል።
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-slate-700"
                    >
                      ሙሉ ስም
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ስምዎን ያስገቡ"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-medium text-slate-700"
                    >
                      ስልክ ቁጥር
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0911234567"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-slate-700"
                  >
                    ርዕስ
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="ለምሳሌ፡ ለG+3 ህንጻ የቧንቧ ስራ ዋጋ ግምት"
                    className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.subject && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-slate-700"
                  >
                    መልእክት
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ስለሚፈልጉት ስራ ወይም የእቃ ትዕዛዝ ዝርዝር ይጻፉ..."
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none"
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                >
                  {submitting ? 'በመላክ ላይ...' : 'መልእክቱን ላክ'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-slate-900 py-10 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-base font-bold text-white">
              {COMPANY_INFO.brandNameAm}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {COMPANY_INFO.taglineAm}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <a href="#home" className="hover:text-white">
              መነሻ
            </a>
            <a href="#about" className="hover:text-white">
              ስለ እኛ
            </a>
            <a href="#services" className="hover:text-white">
              አገልግሎቶች
            </a>
            <a href="#shop" className="hover:text-white">
              መደብር
            </a>
            <a href="#booking" className="hover:text-white">
              ቀጠሮ
            </a>
            <a href="#blog" className="hover:text-white">
              ብሎግ
            </a>
          </div>

          <p className="text-xs text-slate-400">
            © 2019 ዓ.ም {COMPANY_INFO.brandNameAm} · አዲስ አበባ
          </p>
        </div>
      </footer>

      {/* Blog Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.titleAm}
        >
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <span className="text-xs font-medium text-sky-800">
                {activeArticle.categoryAm} · {activeArticle.readTimeAm}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="ጽሁፉን ዝጋ"
                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold leading-snug text-slate-900">
                {activeArticle.titleAm}
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                {activeArticle.authorAm} · {activeArticle.publishedDateAm}
              </p>

              <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <Image
                  src={MEDIA_ASSETS[activeArticle.imageKey]}
                  alt={activeArticle.titleAm}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
                {activeArticle.paragraphsAm.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
