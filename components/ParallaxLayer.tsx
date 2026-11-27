'use client';

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import {
  computeParallaxTranslateY,
  type ParallaxOffset,
} from '@/lib/parallax';

interface ParallaxLayerProps {
  targetRef: RefObject<HTMLElement | null>;
  range?: [number, number];
  offset?: ParallaxOffset;
  className?: string;
  children: ReactNode;
}

export default function ParallaxLayer({
  targetRef,
  range = [-20, 20],
  offset = ['start end', 'end start'],
  className = '',
  children,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const startRange = range[0];
  const endRange = range[1];
  const startOffset = offset[0];
  const endOffset = offset[1];

  useEffect(() => {
    const layerEl = layerRef.current;
    if (!layerEl) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId: number | null = null;

    const applyTransform = () => {
      rafId = null;
      const targetEl = targetRef.current;
      if (!targetEl || !layerRef.current) return;

      if (mediaQuery.matches) {
        layerRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
        return;
      }

      const rect = targetEl.getBoundingClientRect();
      const y = computeParallaxTranslateY({
        rectTop: rect.top,
        rectHeight: rect.height,
        viewportHeight: window.innerHeight,
        range: [startRange, endRange],
        offset: [startOffset, endOffset],
      });

      layerRef.current.style.transform = `translate3d(0px, ${y.toFixed(2)}px, 0px)`;
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(applyTransform);
      }
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    mediaQuery.addEventListener('change', scheduleUpdate);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      mediaQuery.removeEventListener('change', scheduleUpdate);
    };
  }, [targetRef, startRange, endRange, startOffset, endOffset]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-y-8 inset-x-0 select-none will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
