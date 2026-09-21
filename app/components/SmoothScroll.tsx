'use client';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentY   = useRef(0);
  const targetY    = useRef(0);
  const raf        = useRef<number>(0);
  const isTouch    = useRef(false);

  useEffect(() => {
    // Detect touch / small screen — skip native-feel devices
    isTouch.current = window.matchMedia('(hover: none)').matches;
    if (isTouch.current) return;

    const wrap    = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;

    // Fixed wrapper
    wrap.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;';

    const setHeight = () => {
      document.body.style.height = content.getBoundingClientRect().height + 'px';
    };
    setHeight();

    const ro = new ResizeObserver(setHeight);
    ro.observe(content);

    const onWheel = (e: WheelEvent) => {
      const panel = (e.target as HTMLElement | null)?.closest('.scrollable-panel') as HTMLElement | null;

      if (panel) {
        const atTop = panel.scrollTop <= 0 && e.deltaY < 0;
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1 && e.deltaY > 0;

        if (!atTop && !atBottom) return;
      }

      e.preventDefault();
      targetY.current += e.deltaY * 0.6;
      const max = content.getBoundingClientRect().height - window.innerHeight;
      targetY.current = Math.max(0, Math.min(targetY.current, max));
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.085);
      const rounded = parseFloat(currentY.current.toFixed(2));
      content.style.transform = `translate3d(0, -${rounded}px, 0)`;

      // Sync window.scrollY for IntersectionObserver-based reveals
      window.scrollTo({ top: rounded, behavior: 'instant' as ScrollBehavior });

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    // Anchor link support
    const handleAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('href')!.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      targetY.current = el.offsetTop - 80;
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('click', handleAnchor);
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      document.body.style.height = '';
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <div ref={contentRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
