"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function RouteTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.set(overlay, { yPercent: 100, autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
    tl.to(overlay, {
      yPercent: 0,
      autoAlpha: 0.65,
      duration: 0.28,
      ease: 'power2.out',
    }).to(overlay, {
      yPercent: -100,
      autoAlpha: 0,
      duration: 0.54,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999] bg-gradient-to-t from-black/85 via-purple-950/45 to-black/80"
    />
  );
}
