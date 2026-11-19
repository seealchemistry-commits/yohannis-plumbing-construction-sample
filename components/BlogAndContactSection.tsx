'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { isValidEthiopianPhone } from '@/lib/commerce/cart';
import type { BlogArticle, ContactInput } from '@/lib/commerce/types';
import { BLOG_ARTICLES, COMPANY_INFO } from '@/lib/data/catalog';
import { MEDIA_ASSETS } from '@/lib/data/media';
import { useLanguage } from '@/lib/i18n/context';
import OfficeGoogleMap from './OfficeGoogleMap';

interface BlogAndContactSectionProps {
  mapsApiKey: string;
}

export default function BlogAndContactSection({
  mapsApiKey,
}: BlogAndContactSectionProps) {
  const { locale, t } = useLanguage();
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
    if (fullName.trim().length < 2)
      errs.fullName = t.validation.customerNameRequired;
    if (!isValidEthiopianPhone(phone))
      errs.phone = t.validation.invalidPhone;
    if (subject.trim().length < 3) errs.subject = t.validation.subjectRequired;
    if (message.trim().length < 6) errs.message = t.validation.messageRequired;

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
        body: JSON.stringify({ fullName, phone, subject, message, locale }),
      });
      const data = (await res.json()) as {
        contact?: { id: string };
        error?: string;
        fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      };

      if (!res.ok || !data.contact) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error ?? t.contact.genericError);
        return;
      }

      setSentRefId(data.contact.id);
      setFullName('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setSubmitError(t.contact.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  const activeArticleCopy = activeArticle
    ? t.blog.articles[activeArticle.id as keyof typeof t.blog.articles]
    : null;

  return (
    <>
      {/* Blog & News Section */}
      <section
        id="blog"
        className="border-b border-[rgba(212,175,55,0.22)] bg-[#12161C] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
              {t.blog.eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              {t.blog.heading}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
            {BLOG_ARTICLES.map((article) => {
              const localized =
                t.blog.articles[article.id as keyof typeof t.blog.articles];
              const title = localized?.title ?? article.titleAm;
              const category = localized?.category ?? article.categoryAm;
              const publishedDate =
                localized?.publishedDate ?? article.publishedDateAm;
              const readTime = localized?.readTime ?? article.readTimeAm;
              const excerpt = localized?.excerpt ?? article.excerptAm;

              return (
                <article
                  key={article.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#161B22] transition-colors duration-150 hover:border-[#D4AF37]/55"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[rgba(212,175,55,0.16)] bg-[#0B0D10]">
                      <Image
                        src={MEDIA_ASSETS[article.imageKey]}
                        alt={title}
                        fill
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#161B22]/55 to-transparent"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A8B3]">
                        <span className="font-medium text-[#D4AF37]">
                          {category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{publishedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{readTime}</span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-[#F8FAFC]">
                        {title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-[1.75] text-[#A1A8B3]">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#2A2416] px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-bold text-[#D4AF37] transition-colors hover:text-[#E5C158]"
                    >
                      <span>{t.blog.readMoreBtn}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="border-b border-[rgba(212,175,55,0.22)] bg-[#0B0D10] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
                {t.contact.eyebrow}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
                {t.contact.heading}
              </h2>
              <p className="mt-4 text-sm leading-[1.8] text-[#A1A8B3]">
                {t.contact.description}
              </p>

              <dl className="mt-8 space-y-5 border-t border-[rgba(212,175,55,0.22)] pt-7 text-sm">
                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.phoneLabel}
                    </dt>
                    <dd className="mt-0.5 font-mono tabular-nums font-bold text-[#F8FAFC]">
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="hover:text-[#D4AF37] hover:underline"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Send
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.telegramLabel}
                    </dt>
                    <dd className="mt-0.5 font-mono">
                      <a
                        href={COMPANY_INFO.telegramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] hover:text-[#E5C158] hover:underline"
                      >
                        <span>{COMPANY_INFO.telegramHandle}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.officeLabel}
                    </dt>
                    <dd className="mt-0.5 text-[#F5F2EB]">
                      {t.brand.officeAddress}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.emailLabel}
                    </dt>
                    <dd className="mt-0.5 font-mono text-[#F5F2EB]">
                      {COMPANY_INFO.email}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#A1A8B3]">
                      {t.contact.hoursLabel}
                    </dt>
                    <dd className="mt-0.5 text-[#F5F2EB]">{t.brand.hours}</dd>
                  </div>
                </div>
              </dl>

              {/* Office Location Map Card */}
              <div
                data-testid="office-map-card"
                className="mt-8 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#12161C]"
              >
                <OfficeGoogleMap apiKey={mapsApiKey} />

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                  <span className="text-xs text-[#A1A8B3]">
                    {t.brand.mapNearby}
                  </span>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[rgba(212,175,55,0.4)] bg-[#161B22] px-3.5 py-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#D4AF37] hover:text-[#0B0D10] whitespace-nowrap shrink-0 group"
                  >
                    <span>{t.contact.openGoogleMapsBtn}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-[#D4AF37] transition-colors group-hover:text-[#0B0D10]"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#12161C] p-7 sm:p-8 lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                noValidate
                className="space-y-5"
              >
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  {t.contact.formTitle}
                </h3>

                {submitError && (
                  <p className="rounded-xl border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs text-red-200">
                    {submitError}
                  </p>
                )}

                {sentRefId && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-xs text-[#F5F2EB]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>
                      {t.contact.successMessagePrefix} (
                      <strong className="font-mono text-[#D4AF37]">
                        {sentRefId}
                      </strong>
                      ){t.contact.successMessageSuffix}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#F5F2EB]"
                    >
                      {t.contact.fullNameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.contact.fullNamePlaceholder}
                      className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#F5F2EB]"
                    >
                      {t.contact.phoneInputLabel}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.contact.phoneInputPlaceholder}
                      className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 font-mono text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-400">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#F5F2EB]"
                  >
                    {t.contact.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.contact.subjectPlaceholder}
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                  {fieldErrors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#F5F2EB]"
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#2A2416] bg-[#0B0D10] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#A1A8B3]/50 focus:border-[#D4AF37] focus:outline-none"
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0B0D10] transition-colors hover:bg-[#E5C158] disabled:opacity-60"
                >
                  {submitting ? t.contact.sendingBtn : t.contact.sendBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Obsidian & Gold Footer */}
      <footer className="bg-[#08090C] py-14 text-[#A1A8B3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div>
            <p className="text-base font-bold text-[#F8FAFC]">
              {t.brand.name}
            </p>
            <p className="mt-1.5 text-xs text-[#A1A8B3]">{t.brand.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#home" className="transition-colors hover:text-[#D4AF37]">
              {t.header.home}
            </a>
            <a
              href="#services"
              className="transition-colors hover:text-[#D4AF37]"
            >
              {t.header.services}
            </a>
            <a href="#about" className="transition-colors hover:text-[#D4AF37]">
              {t.header.about}
            </a>
            <a href="#shop" className="transition-colors hover:text-[#D4AF37]">
              {t.header.shop}
            </a>
            <a
              href="#booking"
              className="transition-colors hover:text-[#D4AF37]"
            >
              {t.footer.bookingLink}
            </a>
            <a href="#blog" className="transition-colors hover:text-[#D4AF37]">
              {t.header.blog}
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-[#D4AF37]"
            >
              {t.footer.contactLink}
            </a>
          </div>

          <p className="text-xs text-[#A1A8B3]">
            {t.footer.copyright('2026', t.brand.name, t.brand.city)}
          </p>
        </div>
      </footer>

      {/* Blog Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D10]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeArticleCopy?.title ?? activeArticle.titleAm}
        >
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#12161C] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2A2416] bg-[#12161C] px-6 py-4">
              <span className="text-xs font-semibold text-[#D4AF37]">
                {activeArticleCopy?.category ?? activeArticle.categoryAm} ·{' '}
                {activeArticleCopy?.readTime ?? activeArticle.readTimeAm}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label={t.blog.closeArticleAriaLabel}
                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-xl border border-[#2A2416] bg-[#161B22] text-[#A1A8B3] hover:border-[#D4AF37]/60 hover:text-[#F8FAFC]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold leading-snug text-[#F8FAFC]">
                {activeArticleCopy?.title ?? activeArticle.titleAm}
              </h3>
              <p className="mt-2 text-xs text-[#A1A8B3]">
                {activeArticleCopy?.author ?? activeArticle.authorAm} ·{' '}
                {activeArticleCopy?.publishedDate ??
                  activeArticle.publishedDateAm}
              </p>

              <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#2A2416] bg-[#0B0D10]">
                <Image
                  src={MEDIA_ASSETS[activeArticle.imageKey]}
                  alt={activeArticleCopy?.title ?? activeArticle.titleAm}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>

              <div className="mt-6 space-y-4 text-sm leading-[1.8] text-[#F5F2EB]/90">
                {(
                  activeArticleCopy?.paragraphs ?? activeArticle.paragraphsAm
                ).map((para, idx) => (
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
