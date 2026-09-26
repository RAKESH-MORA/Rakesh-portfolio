'use client';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section id="home" style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      position: 'relative', overflow: 'hidden',
      paddingTop: 'clamp(60px, 12vh, 120px)',
      paddingLeft: 'clamp(16px, 5vw, 40px)',
      paddingRight: 'clamp(16px, 5vw, 40px)',
      paddingBottom: 'clamp(28px, 5vh, 48px)',
      boxSizing: 'border-box',
    }}>
      <div
        className="hero-background"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.16,
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          transform: 'translate3d(0, calc(var(--scroll-y, 0px) * -0.28), 0) scale(1.22)',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />
      {/* ── Main content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', boxSizing: 'border-box' }}>

        {/* Status */}
        <Reveal delay={0} once>
          <div style={{ marginBottom: '28px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--accent-green)', display: 'inline-block',
                boxShadow: '0 0 0 3px var(--accent-green-bg)',
                animation: 'pulse-dot 2.4s ease-in-out infinite',
              }} />
              Available for opportunities
            </span>
          </div>
        </Reveal>

        {/* Greeting */}
        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
          <Reveal delay={80} direction="up" once>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 400, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Hello, I&apos;m
            </p>
          </Reveal>
        </div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
          <Reveal delay={120} direction="up" once>
            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, 'Times New Roman', serif",
              fontSize: 'clamp(44px, 10vw, 140px)',
              fontWeight: 400, lineHeight: 0.92,
              letterSpacing: '-0.03em', color: 'var(--text)',
              opacity: 1, visibility: 'visible',
            }}>
              Rakesh Mora
            </h1>
          </Reveal>
        </div>

        {/* Roles */}
        <Reveal delay={200} direction="up" once>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {['Software Engineer', 'Full Stack Developer', 'UI / UX'].map((role, i, arr) => (
              <span key={role} style={{ display: 'contents' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>{role}</span>
                {i < arr.length - 1 && <span style={{ width: '4px', height: '4px', background: 'var(--text-dim)', borderRadius: '50%', flexShrink: 0 }} />}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Bottom row */}
        <Reveal delay={280} direction="up" once>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 400, color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.75 }}>
              I build modern, responsive and scalable web applications with a focus on clean code, great UI/UX and real-world problem solving.
            </p>

            <div className="hero-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {/* Social icons */}
              {[
                { href: 'https://github.com/RAKESH-MORA', label: 'GitHub',
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> },
                { href: 'https://linkedin.com/in/rakesh-mora-78809a2b7', label: 'LinkedIn',
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: 'mailto:rakeshmora65@gmail.com', label: 'Email',
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: '38px', height: '38px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--border)', borderRadius: '10px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-mid)'; el.style.color = 'var(--text)'; el.style.background = 'var(--tag-bg)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)'; el.style.background = 'transparent'; }}
                >{s.svg}</a>
              ))}

              <a href="#projects" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px', background: 'var(--text)', color: 'var(--bg)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '100px', whiteSpace: 'nowrap', transition: 'opacity 0.2s ease, transform 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.84'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                View Projects
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </a>

              <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px', border: '1.5px solid var(--border)', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, textDecoration: 'none', borderRadius: '100px', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.background = 'var(--tag-bg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-5 11a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                Hire Me
              </a>

              <a href="#skills" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px', border: '1.5px solid var(--border)', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, textDecoration: 'none', borderRadius: '100px', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                Skills
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-ind" style={{
        position: 'absolute', bottom: 'clamp(22px, 5vh, 40px)', right: 'clamp(16px, 4vw, 40px)', transform: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        animation: 'fadeInUp 1s 1.2s both', zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ position: 'relative', width: '1px', height: '44px', background: 'var(--border)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', background: 'var(--text-muted)', animation: 'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px var(--accent-green-bg); }
          50%       { box-shadow: 0 0 0 6px var(--accent-green-bg); }
        }
        @keyframes scrollLine {
          0%   { height: 0;    top: 0; }
          50%  { height: 44px; top: 0; }
          100% { height: 0;    top: 44px; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          #home {
            padding-top: clamp(48px, 6vh, 80px) !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}