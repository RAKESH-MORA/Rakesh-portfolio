'use client';
import { useState, useEffect, useCallback } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact',  label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = links
      .map(l => document.getElementById(l.href.slice(1)))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveLink('#' + e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  // Close menu on outside tap
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // While the drawer is open: trap scroll and allow Escape to dismiss it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close the drawer as soon as the viewport grows back to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => { if (mq.matches) setMenuOpen(false); };
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        paddingInline: 'var(--container-pad)',
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '12px',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.6)' : 'none',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.6)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}>

        {/* Logo */}
        <a href="#home" style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(19px, 4.4vw, 25px)',
          color: 'var(--text)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          lineHeight: 1,
          flexShrink: 0,
        }}>
          Rakesh Mora
        </a>

        {/* Desktop nav links */}
        <nav className="desk-nav" style={{ display: 'flex', gap: '2px', minWidth: 0 }}>
          {links.map(link => {
            const active = activeLink === link.href;
            return (
              <a key={link.href} href={link.href} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px', fontWeight: 500,
                color: active ? 'var(--text)' : 'var(--text-muted)',
                textDecoration: 'none',
                padding: '6px clamp(8px, 1.1vw, 14px)',
                whiteSpace: 'nowrap',
                borderRadius: '8px',
                background: active ? 'var(--tag-bg)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <ThemeToggle />

          {/* Hire Me — desktop */}
          <a href="#contact" className="desk-nav" style={{
            padding: '8px 18px',
            background: 'var(--text)',
            color: 'var(--bg)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px', fontWeight: 600,
            textDecoration: 'none',
            borderRadius: '100px',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.82'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="mob-nav"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '14px 10px',
              display: 'flex', flexDirection: 'column', gap: '4px',
              cursor: 'pointer',
            }}
          >
            <span style={{
              width: '18px', height: '1.5px',
              background: 'var(--text)', display: 'block',
              transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }} />
            <span style={{
              width: '18px', height: '1.5px',
              background: 'var(--text)', display: 'block',
              transition: 'opacity 0.2s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '18px', height: '1.5px',
              background: 'var(--text)', display: 'block',
              transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="mob-nav"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          top: 'calc(var(--nav-h) + 8px)', left: '12px', right: '12px',
          maxHeight: 'calc(100dvh - var(--nav-h) - 24px)',
          overflowY: 'auto',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '8px',
          zIndex: 99,
          boxShadow: 'var(--shadow)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)',
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px',
              color: activeLink === link.href ? 'var(--text)' : 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '15px', fontWeight: 500,
              borderRadius: '10px',
              fontFamily: "'Inter', sans-serif",
              background: activeLink === link.href ? 'var(--tag-bg)' : 'transparent',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--tag-bg)'}
            onMouseLeave={e => {
              if (activeLink !== link.href)
                (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            {link.label}
            {activeLink === link.href && (
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: 'var(--accent-green)',
                boxShadow: '0 0 0 2px var(--accent-green-bg)',
              }} />
            )}
          </a>
        ))}

        {/* Hire Me inside mobile drawer */}
        <div style={{ padding: '8px 8px 4px', borderTop: '1px solid var(--border)', marginTop: '4px' }}>
          <a href="#contact" onClick={closeMenu} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '12px 16px',
            background: 'var(--text)', color: 'var(--bg)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', borderRadius: '10px',
            transition: 'opacity 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.84'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="mob-nav"
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0, zIndex: 98,
            background: 'transparent',
          }}
        />
      )}


    </>
  );
}