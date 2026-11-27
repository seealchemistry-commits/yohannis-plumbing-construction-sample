'use client';

import type { ReactNode } from 'react';

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  className = '',
}: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
