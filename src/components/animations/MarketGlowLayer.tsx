"use client";

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { getMotionProfile } from './motionIntensity';

export type MarketState = 'bullish' | 'bearish' | 'neutral';

type Props = {
  marketState?: MarketState;
  streak?: number;
};

export default function MarketGlowLayer({ marketState = 'neutral', streak = 0 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bullRef = useRef<HTMLDivElement | null>(null);
  const bearRef = useRef<HTMLDivElement | null>(null);
  const neutralRef = useRef<HTMLDivElement | null>(null);

  const profile = useMemo(() => getMotionProfile(streak), [streak]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targetOpacity = profile.glowOpacity;

    const states = {
      bullish: bullRef.current,
      bearish: bearRef.current,
      neutral: neutralRef.current,
    } as const;

    Object.entries(states).forEach(([key, el]) => {
      if (!el) return;
      gsap.to(el, {
        autoAlpha: key === marketState ? targetOpacity : 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    return () => {
      gsap.killTweensOf([bullRef.current, bearRef.current, neutralRef.current]);
    };
  }, [marketState, profile.glowOpacity]);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={bullRef} className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl bg-green-500/60 opacity-0" />
      <div ref={bearRef} className="absolute -top-36 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl bg-red-500/60 opacity-0" />
      <div ref={neutralRef} className="absolute -top-44 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full blur-3xl bg-gradient-to-br from-blue-500/50 to-purple-500/50 opacity-0" />
    </div>
  );
}
