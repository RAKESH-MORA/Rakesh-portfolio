'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

/**
 * Fixed header shared by /skills and /projects.
 *
 * Uses `position: fixed` (see `.page-header` in globals.css) rather than
 * `sticky`, because sticky silently stops working whenever an ancestor
 * establishes a scroll or transform context — which is exactly what the
 * page-level overflow guard used to do.
 */
export default function PageHeader() {
  return (
    <>
      <header className="page-header">
        <Link
          href="/"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(19px, 4.4vw, 25px)',
            letterSpacing: '0.05em',
            color: 'var(--text)',
            textDecoration: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Rakesh Mora
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 16px)', flexShrink: 0 }}>
          <ThemeToggle />
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500,
              color: 'var(--text-muted)', textDecoration: 'none',
              transition: 'color 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }} aria-hidden>
              <path d="M12 7H2M2 7L7 2M2 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ph-label">Back to Home </span>
          </Link>
        </div>
      </header>

      {/* Reserves the space the fixed header occupies. */}
      <div className="page-header-offset" aria-hidden />

      <style>{`
        @media (max-width: 420px) {
          .ph-label { display: none; }
        }
      `}</style>
    </>
  );
}
