'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

const INITIAL_BY_VARIANT: Record<RevealVariant, { opacity: number; x?: number; y?: number }> = {
  'fade-up': { opacity: 0, y: 24 },
  'fade-left': { opacity: 0, x: -16 },
  'fade-right': { opacity: 0, x: 16 },
};

const VISIBLE_STATE = { opacity: 1, x: 0, y: 0 };
const VIEWPORT_CONFIG = { once: true, amount: 0.1 } as const;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={INITIAL_BY_VARIANT[variant]}
      whileInView={VISIBLE_STATE}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.52, delay, ease: REVEAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
