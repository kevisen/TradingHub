"use client";

import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedGridBackground from './AnimatedGridBackground';
import MarketGlowLayer, { MarketState } from './MarketGlowLayer';
import { getMotionProfile } from './motionIntensity';

type GsapPageEffectsProps = {
  children: ReactNode;
  className?: string;
  marketState?: MarketState;
  streak?: number;
};

export default function GsapPageEffects({
  children,
  className = '',
  marketState = 'neutral',
  streak = 0,
}: GsapPageEffectsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const blobRef = useRef<HTMLDivElement | null>(null);
  const profile = useMemo(() => getMotionProfile(streak), [streak]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
        },
      );

      const revealItems = gsap.utils.toArray<HTMLElement>('[data-gsap-reveal]');
      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8 / profile.multiplier,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });

      const staggerGroups = gsap.utils.toArray<HTMLElement>('[data-gsap-stagger]');
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-gsap-stagger-item]');
        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55 / profile.multiplier,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true,
            },
          },
        );
      });

      const buttons = gsap.utils.toArray<HTMLElement>('[data-gsap-button]');
      const cleanups: Array<() => void> = [];

      buttons.forEach((button) => {
        const onEnter = () => {
          gsap.to(button, {
            scale: profile.hoverScale,
            duration: 0.2 / profile.multiplier,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        const onLeave = () => {
          gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        };

        button.addEventListener('pointerenter', onEnter);
        button.addEventListener('pointerleave', onLeave);

        cleanups.push(() => {
          button.removeEventListener('pointerenter', onEnter);
          button.removeEventListener('pointerleave', onLeave);
        });
      });

      const tiltCards = gsap.utils.toArray<HTMLElement>('.tilt-card');

      tiltCards.forEach((card) => {
        const rotateXTo = gsap.quickTo(card, 'rotationX', {
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        const rotateYTo = gsap.quickTo(card, 'rotationY', {
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        const glow = card.querySelector<HTMLElement>('[data-tilt-glow]');
        const glowXTo = glow
          ? gsap.quickTo(glow, 'xPercent', { duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
          : null;
        const glowYTo = glow
          ? gsap.quickTo(glow, 'yPercent', { duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
          : null;

        gsap.set(card, {
          transformPerspective: 900,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        });

        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const relativeX = (event.clientX - rect.left) / rect.width;
          const relativeY = (event.clientY - rect.top) / rect.height;
          const rotateY = (relativeX - 0.5) * profile.tiltMaxDeg * 2;
          const rotateX = (0.5 - relativeY) * profile.tiltMaxDeg * 2;

          rotateXTo(Math.max(-profile.tiltMaxDeg, Math.min(profile.tiltMaxDeg, rotateX)));
          rotateYTo(Math.max(-profile.tiltMaxDeg, Math.min(profile.tiltMaxDeg, rotateY)));

          if (glow && glowXTo && glowYTo) {
            glowXTo((relativeX - 0.5) * 50);
            glowYTo((relativeY - 0.5) * 50);
            gsap.to(glow, {
              autoAlpha: 0.25 * profile.multiplier,
              duration: 0.2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        };

        const onLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          if (glow) {
            gsap.to(glow, {
              autoAlpha: 0,
              xPercent: 0,
              yPercent: 0,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        };

        card.addEventListener('pointermove', onMove, { passive: true });
        card.addEventListener('pointerleave', onLeave);

        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(blob, 'x', {
      duration: profile.blobDuration,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const yTo = gsap.quickTo(blob, 'y', {
      duration: profile.blobDuration,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX - 160);
      yTo(event.clientY - 160);
    };

    gsap.set(blob, { x: 120, y: 120 });
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
    };
  }, [profile.blobDuration]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <AnimatedGridBackground />
      <MarketGlowLayer marketState={marketState} streak={streak} />
      <div
        ref={blobRef}
        aria-hidden
        className="fixed top-0 left-0 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-blue-500/20 blur-3xl pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
