'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Film, Play } from 'lucide-react';
import { FEATURED_VIDEOS_CONFIG } from '@/lib/data/media';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

export default function FeaturedVideoSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMedia =
    FEATURED_VIDEOS_CONFIG[activeIndex] ?? FEATURED_VIDEOS_CONFIG[0];
  const activeCopy =
    t.videoShowcase.items[activeIndex] ?? t.videoShowcase.items[0];

  return (
    <section
      id="videos"
      data-testid="featured-video-section"
      className="overflow-x-clip border-b border-[rgba(212,175,55,0.22)] bg-[#0E1217] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.06em] text-[#D4AF37]">
            {t.videoShowcase.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            {t.videoShowcase.heading}
          </h2>
          <p className="mt-4 text-sm leading-[1.8] tracking-[0.01em] text-[#A1A8B3]">
            {t.videoShowcase.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#12161C] shadow-2xl shadow-black/50">
            {/* Main Website & Job-Site Video Player */}
            <div className="relative aspect-video w-full bg-[#0B0D10]">
              <video
                key={activeMedia.src}
                data-testid="featured-video-player"
                src={activeMedia.src}
                poster={activeMedia.poster}
                autoPlay
                controls
                playsInline
                muted
                loop
                preload="auto"
                aria-label={activeCopy.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Active Video Details Bar */}
            <div className="flex flex-col gap-3 border-t border-[rgba(212,175,55,0.2)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A8B3]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#D4AF37]">
                    <Film className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.videoShowcase.nowPlayingLabel}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeCopy.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {activeCopy.duration}
                  </span>
                </div>
                <h3
                  data-testid="featured-video-title"
                  className="mt-1.5 text-base font-bold text-[#F8FAFC] sm:text-lg"
                >
                  {activeCopy.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#A1A8B3] sm:text-sm">
                  {activeCopy.summary}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Clickable Thumbnails Underneath */}
        <div
          role="group"
          aria-label={t.videoShowcase.selectVideoLabel}
          className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {FEATURED_VIDEOS_CONFIG.map((media, idx) => {
            const copy = t.videoShowcase.items[idx];
            if (!copy) return null;
            const isSelected = activeIndex === idx;

            return (
              <ScrollReveal key={media.id} delay={idx * 0.08}>
                <button
                  type="button"
                  data-testid={`video-thumb-${idx}`}
                  aria-pressed={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#161B22] ring-1 ring-[#D4AF37]/40'
                      : 'border-[rgba(212,175,55,0.2)] bg-[#12161C] hover:border-[#D4AF37]/60'
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0B0D10]">
                    <Image
                      src={media.poster}
                      alt={copy.title}
                      fill
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/20" />
                    <span
                      className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B0D10]'
                          : 'border-[#F8FAFC]/40 bg-[#0B0D10]/80 text-[#F8FAFC] group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]'
                      }`}
                    >
                      <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#A1A8B3]">
                      <span className="font-semibold text-[#D4AF37]">
                        {copy.category}
                      </span>
                      <span className="font-mono tabular-nums">
                        {copy.duration}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-[#F8FAFC]">
                      {copy.title}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
