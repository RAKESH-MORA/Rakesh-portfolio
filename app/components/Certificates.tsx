'use client';
import Reveal from './Reveal';
import { useApiData } from '../hooks/useApiData';
import type { CertificateDTO, AchievementDTO } from '@/types/portfolio';

/* ── Shared bits ─────────────────────────────────────────────────────────── */

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }} aria-hidden>
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CardSkeleton({ index }: { index: number }) {
  const delay = `${index * 60}ms`;
  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
        <div className="skeleton" style={{ width: '64px', height: '18px', borderRadius: '100px', animationDelay: delay }} />
        <div className="skeleton" style={{ width: '58px', height: '12px', animationDelay: delay }} />
      </div>
      <div className="skeleton" style={{ width: '80%', height: '16px', marginBottom: '10px', animationDelay: delay }} />
      <div className="skeleton" style={{ width: '55%', height: '13px', animationDelay: delay }} />
    </div>
  );
}

function StateMessage({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif", fontSize: '14px',
      color: 'var(--text-muted)', padding: '24px 0', textAlign: 'center',
    }}>
      {children}
    </p>
  );
}

function Badge({ label, tone }: { label: string; tone: 'green' | 'blue' | 'muted' }) {
  const isGreen = tone === 'green';
  const isBlue = tone === 'blue';

  return (
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '11px', fontWeight: 600,
      color: isGreen ? 'var(--accent-green)' : isBlue ? 'var(--accent-blue)' : 'var(--text-muted)',
      background: isGreen ? 'var(--accent-green-bg)' : isBlue ? 'var(--accent-blue-bg)' : 'var(--tag-bg)',
      padding: '3px 10px', borderRadius: '100px',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

function DateLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "'DM Serif Display', Georgia, serif",
      fontStyle: 'italic', fontSize: '12px',
      color: 'var(--text-dim)', whiteSpace: 'nowrap',
      flexShrink: 0, paddingTop: '2px',
    }}>
      {children}
    </span>
  );
}

function VerifyLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        marginTop: '14px',
        padding: '6px 12px',
        border: '1px solid var(--border)', borderRadius: '100px',
        color: 'var(--text-muted)', textDecoration: 'none',
        fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500,
        transition: 'all 0.2s ease', alignSelf: 'flex-start',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-mid)';
        e.currentTarget.style.color = 'var(--text)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.color = 'var(--text-muted)';
      }}
    >
      {label}
      <ExternalIcon />
    </a>
  );
}

/* ── Cards ───────────────────────────────────────────────────────────────── */

function CertificateCard({ cert }: { cert: CertificateDTO }) {
  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <Badge label="Certificate" tone="blue" />
        <DateLabel>{cert.date}</DateLabel>
      </div>

      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '15px', fontWeight: 600,
        color: 'var(--text)', marginBottom: '4px',
        letterSpacing: '-0.01em', overflowWrap: 'anywhere',
      }}>
        {cert.name}
      </h3>

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '13px',
        color: 'var(--text-muted)', lineHeight: 1.6, overflowWrap: 'anywhere',
      }}>
        {cert.org}
      </p>

      {cert.link && <VerifyLink href={cert.link} label="View credential" />}
    </div>
  );
}

function AchievementCard({ item }: { item: AchievementDTO }) {
  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <Badge label="Achievement" tone="green" />
        <DateLabel>{item.date}</DateLabel>
      </div>

      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '15px', fontWeight: 600,
        color: 'var(--text)', marginBottom: '4px',
        letterSpacing: '-0.01em', overflowWrap: 'anywhere',
      }}>
        {item.title}
      </h3>

      {item.issuer && (
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '13px',
          color: 'var(--text-muted)', marginBottom: '8px', overflowWrap: 'anywhere',
        }}>
          {item.issuer}
        </p>
      )}

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '13px',
        color: 'var(--text-muted)', lineHeight: 1.65, overflowWrap: 'anywhere',
      }}>
        {item.description}
      </p>

      {item.link && <VerifyLink href={item.link} label="Read more" />}
    </div>
  );
}

function SubHeading({ title, count }: { title: string; count: number | null }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <h3 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(22px, 3.2vw, 32px)',
        fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em',
      }}>
        {title}
      </h3>
      {count !== null && count > 0 && (
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: '12px',
          color: 'var(--text-dim)', fontWeight: 500,
        }}>
          {count}
        </span>
      )}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export default function Certificates() {
  const {
    data: certData,
    loading: certLoading,
    error: certError,
  } = useApiData<CertificateDTO[]>('/api/certificates');
  const certificates = certData ?? [];
  const showCertScroll = certificates.length > 3;

  const {
    data: achData,
    loading: achLoading,
    error: achError,
  } = useApiData<AchievementDTO[]>('/api/achievements');
  const achievements = achData ?? [];
  const showAchievementScroll = achievements.length > 3;

  // Achievements are an optional collection — if it's empty and healthy,
  // the block is hidden entirely rather than showing a dead heading.
  const showAchievements = achLoading || !!achError || achievements.length > 0;

  return (
    <section id="certificates" style={{ background: 'var(--surface)' }}>
      <div className="container">

        {/* Section header */}
        <Reveal direction="up">
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 'clamp(40px, 6vw, 72px)', flexWrap: 'wrap', gap: '24px',
          }}>
            <div style={{ minWidth: 0 }}>
              <p className="section-label" style={{ marginBottom: '14px' }}>— Credentials</p>
              <h2 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(32px, 5.5vw, 64px)',
                fontWeight: 400, letterSpacing: '-0.03em',
                color: 'var(--text)', lineHeight: 1.0,
              }}>
                Certificates &amp; Achievements
              </h2>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', color: 'var(--text-muted)',
              maxWidth: '320px', lineHeight: 1.7,
            }}>
              Certifications I&apos;ve earned and milestones I&apos;m proud of along the way.
            </p>
          </div>
        </Reveal>

        {/* ── Certificates ── */}
        <Reveal direction="up">
          <SubHeading title="Certifications" count={certLoading ? null : certificates.length} />
        </Reveal>

        {!certLoading && certError && (
          <StateMessage>Couldn&apos;t load certifications right now. Please try again shortly.</StateMessage>
        )}

        {!certLoading && !certError && certificates.length === 0 && (
          <StateMessage>Certifications coming soon.</StateMessage>
        )}

        {(certLoading || (!certError && certificates.length > 0)) && (
          <div
            className={showCertScroll && !certLoading ? 'scrollable-panel' : undefined}
            style={
              showCertScroll && !certLoading
                ? {
                    paddingRight: '8px',
                    overflowY: 'auto',
                    overscrollBehavior: 'auto',
                    marginBottom: showAchievements ? 'clamp(48px, 7vw, 80px)' : 0,
                    scrollbarGutter: 'stable',
                  }
                : { marginBottom: showAchievements ? 'clamp(48px, 7vw, 80px)' : 0 }
            }
          >
            <div className="cert-grid">
              {certLoading
                ? [0, 1, 2].map(i => <CardSkeleton key={i} index={i} />)
                : certificates.map((c, i) => (
                    <Reveal key={c.id} direction="up" delay={i * 60} style={{ height: '100%' }}>
                      <CertificateCard cert={c} />
                    </Reveal>
                  ))}
            </div>

            {!certLoading && showCertScroll && (
              <div style={{
                display: 'flex', justifyContent: 'center',
                marginTop: '10px', paddingTop: '8px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--surface) 40%)',
                color: 'var(--text-dim)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                position: 'sticky', bottom: 0,
              }}>
                Scroll for more ↓
              </div>
            )}
          </div>
        )}

        {/* ── Achievements ── */}
        {showAchievements && (
          <>
            <Reveal direction="up">
              <SubHeading title="Achievements" count={achLoading ? null : achievements.length} />
            </Reveal>

            {!achLoading && achError && (
              <StateMessage>Couldn&apos;t load achievements right now. Please try again shortly.</StateMessage>
            )}

            {(achLoading || (!achError && achievements.length > 0)) && (
              <div
                className={showAchievementScroll && !achLoading ? 'scrollable-panel' : undefined}
                style={
                  showAchievementScroll && !achLoading
                    ? {
                        paddingRight: '8px',
                        overflowY: 'auto',
                        overscrollBehavior: 'auto',
                        scrollbarGutter: 'stable',
                      }
                    : undefined
                }
              >
                <div className="cert-grid">
                  {achLoading
                    ? [0, 1, 2].map(i => <CardSkeleton key={i} index={i} />)
                    : achievements.map((a, i) => (
                        <Reveal key={a.id} direction="up" delay={i * 60} style={{ height: '100%' }}>
                          <AchievementCard item={a} />
                        </Reveal>
                      ))}
                </div>

                {!achLoading && showAchievementScroll && (
                  <div style={{
                    display: 'flex', justifyContent: 'center',
                    marginTop: '10px', paddingTop: '8px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--surface) 40%)',
                    color: 'var(--text-dim)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    position: 'sticky', bottom: 0,
                  }}>
                    Scroll for more ↓
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
