'use client';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const latestScrollY = useRef(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateScrollMotion = () => {
      frame.current = null;
      latestScrollY.current = window.scrollY;
      content.style.setProperty('--scroll-y', `${latestScrollY.current}px`);
      content.style.setProperty('--scroll-progress', `${Math.min(latestScrollY.current / 1000, 1)}`);
    };

    const onScroll = () => {
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(updateScrollMotion);
      }
    };

    updateScrollMotion();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
}
