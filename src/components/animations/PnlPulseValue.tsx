"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Props = {
  value: number;
  children: ReactNode;
  className?: string;
};

export default function PnlPulseValue({ value, children, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prevRef = useRef<number>(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const delta = value - prevRef.current;
    prevRef.current = value;

    if (delta === 0) return;

    const isPositive = delta > 0;
    const glowColor = isPositive ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)';

    const tl = gsap.timeline();
    tl.to(el, {
      scale: 1.03,
      duration: 0.14,
      color: isPositive ? '#86efac' : '#fca5a5',
      textShadow: `0 0 14px ${glowColor}`,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (!isPositive) {
      tl.to(el, { x: 1.5, duration: 0.04, ease: 'power1.out' })
        .to(el, { x: -1.5, duration: 0.04, ease: 'power1.out' })
        .to(el, { x: 0, duration: 0.05, ease: 'power1.out' });
    }

    tl.to(el, {
      scale: 1,
      color: 'inherit',
      textShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.24,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
