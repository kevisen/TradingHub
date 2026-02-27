"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function DragInteractionShell({ children, className = '' }: Props) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const dimRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const dim = dimRef.current;
    if (!shell || !dim) return;

    let dragging = false;

    const start = () => {
      dragging = true;
      gsap.to(shell, {
        boxShadow: '0 16px 48px rgba(0,0,0,0.28)',
        scale: 1.006,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(dim, {
        autoAlpha: 0.08,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      shell.style.cursor = 'grabbing';
    };

    const end = () => {
      if (!dragging) return;
      dragging = false;
      gsap.to(shell, {
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        scale: 1,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(dim, {
        autoAlpha: 0,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      shell.style.cursor = 'grab';
    };

    shell.style.cursor = 'grab';
    shell.addEventListener('pointerdown', start);
    window.addEventListener('pointerup', end);
    shell.addEventListener('pointerleave', end);

    return () => {
      shell.removeEventListener('pointerdown', start);
      window.removeEventListener('pointerup', end);
      shell.removeEventListener('pointerleave', end);
      shell.style.cursor = '';
    };
  }, []);

  return (
    <div ref={shellRef} className={`relative ${className}`}>
      <div ref={dimRef} aria-hidden className="pointer-events-none absolute inset-0 bg-black opacity-0 rounded-inherit" />
      {children}
    </div>
  );
}
