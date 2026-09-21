'use client';
import { useEffect, useRef, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  style?: React.CSSProperties;
  /** Reveal once and never hide again. Used for above-the-fold content. */
  once?: boolean;
}

const HIDDEN: Record<Direction, string> = {
  up:    'translate3d(0, 40px, 0)',
  down:  'translate3d(0, -40px, 0)',
  left:  'translate3d(-36px, 0, 0)',
  right: 'translate3d(36px, 0, 0)',
  scale: 'scale(0.92)',
  fade:  'translate3d(0, 0, 0)',
};

const SHOWN: Record<Direction, string> = {
  up: 'translate3d(0, 0, 0)',
  down: 'translate3d(0, 0, 0)',
  left: 'translate3d(0, 0, 0)',
  right: 'translate3d(0, 0, 0)',
  scale: 'scale(1)',
  fade: 'translate3d(0, 0, 0)',
};

export default function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.12,
  style,
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: render the final state immediately.
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const show = () => {
      el.style.opacity = '1';
      el.style.transform = SHOWN[direction];
    };

    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const hide = () => {
      el.style.opacity = '0';
      el.style.transform = HIDDEN[direction];
    };

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      // A zero-sized box (fonts still loading, display:none ancestor) counts as
      // "visible" so it can never get stuck at opacity 0.
      if (rect.width === 0 && rect.height === 0) return true;
      return rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
    };

    el.style.transition =
      `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, ` +
      `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    hide();

    let revealed = false;
    let observer: IntersectionObserver | null = null;

    // Paint the hidden state once, then immediately reveal anything that is
    // already on screen. This is what guarantees above-the-fold content (the
    // hero name) always appears on first load, even if the IntersectionObserver
    // callback is delayed or never fires because the layout shifted while
    // fonts were still loading.
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (inViewport()) {
          revealed = true;
          show();
        }
      });
    });

    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealed = true;
              show();
            } else if (!once && revealed) {
              hide();
            }
          });
        },
        { threshold, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
    } else {
      // No IntersectionObserver support — just show the content.
      show();
    }

    // Last-resort failsafe. If anything above went wrong, never leave content
    // invisible to the user.
    const failsafe = window.setTimeout(() => {
      if (!revealed && inViewport()) show();
    }, 1500);

    // Fonts finishing loading can move elements into view without a scroll
    // event; re-check when that happens.
    const onFontsReady = () => {
      if (!revealed && inViewport()) {
        revealed = true;
        show();
      }
    };
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(onFontsReady).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(failsafe);
      observer?.disconnect();
    };
  }, [direction, delay, duration, threshold, once]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
