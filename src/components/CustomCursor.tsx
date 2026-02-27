'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HOVER_TARGETS = 'a, button, p, h1, h2, h3, span, .cursor-hover';

const FOLLOW_DURATION = 0.24;
const DEFAULT_SCALE = 1;
const HOVER_SCALE = 2.6;
const DEFAULT_OPACITY = 0.28;
const HOVER_OPACITY = 0.42;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        force3D: true,
        opacity: DEFAULT_OPACITY,
        scale: DEFAULT_SCALE,
        mixBlendMode: 'normal',
      });

      const moveCursorX = gsap.quickTo(cursor, 'x', {
        duration: FOLLOW_DURATION,
        ease: 'power3.out',
      });
      const moveCursorY = gsap.quickTo(cursor, 'y', {
        duration: FOLLOW_DURATION,
        ease: 'power3.out',
      });

      const handleMouseMove = (event: MouseEvent) => {
        moveCursorX(event.clientX);
        moveCursorY(event.clientY);
      };

      const setHoverState = (isHovering: boolean) => {
        gsap.to(cursor, {
          scale: isHovering ? HOVER_SCALE : DEFAULT_SCALE,
          opacity: isHovering ? HOVER_OPACITY : DEFAULT_OPACITY,
          duration: 0.28,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.set(cursor, { mixBlendMode: isHovering ? 'difference' : 'normal' });
      };

      const handleMouseOver = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        if (target.closest(HOVER_TARGETS)) {
          setHoverState(true);
        }
      };

      const handleMouseOut = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        const leavingHoverTarget = target.closest(HOVER_TARGETS);
        if (!leavingHoverTarget) {
          return;
        }

        const next = event.relatedTarget;
        if (next instanceof Element && next.closest(HOVER_TARGETS)) {
          return;
        }

        setHoverState(false);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseover', handleMouseOver, { passive: true });
      document.addEventListener('mouseout', handleMouseOut, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    }, cursorRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-white/75"
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
}