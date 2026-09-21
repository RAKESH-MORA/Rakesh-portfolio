'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const tick = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(tick);
    };

    /*
     * Hover state is handled with two DELEGATED listeners on `document`
     * instead of attaching a pair of listeners to every matching element.
     *
     * The previous approach used `document.querySelectorAll('a, button,
     * [data-hover]')` plus a `MutationObserver` that re-ran that same query
     * and re-attached fresh listeners (without ever removing the old ones)
     * on every DOM mutation anywhere in <body>. This page mutates the DOM
     * on a running timer (LogoCarousel swaps a logo node every 1.5s) and on
     * every theme toggle (the Sun/Moon icon is a conditionally-rendered
     * node, not a class swap) — so listeners were being duplicated
     * continuously for as long as the tab stayed open. That's a genuine,
     * worsening-over-time leak: it explains a stall right when you toggle
     * the theme (a mutation just fired) and a general, creeping scroll/UI
     * sluggishness the longer the page sits open — both browser-timing
     * dependent, which matches "feels stuck," "not liquid."
     *
     * Delegation needs exactly two listeners for the page's entire
     * lifetime, requires no MutationObserver, and needs no cleanup beyond
     * removing those two listeners.
     */
    const over = (e: Event) => {
      if ((e.target as Element)?.closest?.('a, button, [data-hover]')) {
        ring.classList.add('expand');
      }
    };
    const out = (e: Event) => {
      if ((e.target as Element)?.closest?.('a, button, [data-hover]')) {
        ring.classList.remove('expand');
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    // `mouseover`/`mouseout` bubble (unlike `mouseenter`/`mouseleave`), which
    // is what makes delegation from a single ancestor listener possible.
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}
