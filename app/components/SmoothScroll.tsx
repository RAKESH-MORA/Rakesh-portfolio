'use client';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentY   = useRef(0);
  const targetY    = useRef(0);
  const lastTime   = useRef(0);
  const running    = useRef(false);
  const raf        = useRef<number>(0);
  const isTouch    = useRef(false);

    useEffect(() => {
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'smooth';

      return () => {
        html.style.scrollBehavior = previousBehavior;
      };
    }, []);

    return <div>{children}</div>;

  return (
    <div ref={wrapRef}>
      <div ref={contentRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
