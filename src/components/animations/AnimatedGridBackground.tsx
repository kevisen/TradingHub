"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Props = {
  parallax?: boolean;
};

export default function AnimatedGridBackground({ parallax = true }: Props) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const tween = gsap.to(grid, {
      y: -80,
      duration: 18,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });

    let cleanupParallax = () => {};

    if (parallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const xTo = gsap.quickTo(grid, 'x', { duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      const yTo = gsap.quickTo(grid, 'y', { duration: 0.9, ease: 'power2.out', overwrite: 'auto' });

      const onMove = (event: PointerEvent) => {
        const dx = (event.clientX / window.innerWidth - 0.5) * 12;
        const dy = (event.clientY / window.innerHeight - 0.5) * 12;
        xTo(dx);
        yTo(dy);
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      cleanupParallax = () => window.removeEventListener('pointermove', onMove);
    }

    return () => {
      tween.kill();
      cleanupParallax();
    };
  }, [parallax]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={gridRef}
        className="absolute inset-[-20%] opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
