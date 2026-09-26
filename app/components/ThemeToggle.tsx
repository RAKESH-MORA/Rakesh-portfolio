'use client';
import { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

/** localStorage throws in Safari private mode / when site data is blocked. */
function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null;
  }
}

function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* Storage unavailable — the theme still applies for this session. */
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  try {
    root.style.colorScheme = theme;
  } catch {
    /* Ignore — purely cosmetic for native form controls. */
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Adopt whatever the pre-paint script already decided, so the button icon
  // always matches what is actually on screen.
  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    const initial: Theme =
      attr === 'dark' || attr === 'light' ? attr : readStoredTheme() ?? 'dark';
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'theme') return;
      const next = e.newValue === 'dark' || e.newValue === 'light' ? e.newValue : null;
      if (!next) return;
      setTheme(next);
      applyTheme(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    // Applied directly — no View Transitions API. This page's smooth-scroll
    // layer continuously mutates a `transform` on the content wrapper via
    // requestAnimationFrame (see SmoothScroll.tsx). Starting a View
    // Transition snapshot while that's running is a race: depending on
    // exactly which frame the browser captures mid-mutation, the crossfade
    // can stall or only complete in one direction — which is consistent with
    // "dark works, light doesn't" being browser- and timing-dependent rather
    // than a real difference between the two themes. The global CSS rule in
    // globals.css already crossfades every color on every element in
    // `0.4s ease` on its own, identically in every browser, with nothing to
    // race against.
    setTheme(next);
    applyTheme(next);
    writeStoredTheme(next);

    window.setTimeout(() => setAnimating(false), 500);
  }, [animating, theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--tag-bg)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        color: 'var(--text-muted)',
        transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        WebkitTapHighlightColor: 'transparent',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--text)';
        e.currentTarget.style.borderColor = 'var(--border-mid)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text-muted)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
          transform: animating ? 'rotate(180deg) scale(0.6)' : 'rotate(0deg) scale(1)',
          opacity: animating ? 0.4 : 1,
        }}
      >
        {/* Render a stable icon until mounted so SSR and client markup match. */}
        {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
      </span>
    </button>
  );
}
