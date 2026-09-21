'use client';
import Link from 'next/link';
import Reveal from './Reveal';
import { allStrengths } from '../data/projects';
import { useApiData } from '../hooks/useApiData';
import type { SkillCategoryDTO } from '@/types/portfolio';

function SkillGroupSkeleton({ index }: { index: number }) {
  return (
    <div className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div className="skeleton" style={{ width: '110px', height: '15px', animationDelay: `${index * 60}ms` }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton" style={{ width: '64px', height: '26px', borderRadius: '8px', animationDelay: `${index * 60}ms` }} />
        ))}
      </div>
    </div>
  );
}

/**
 * Shared card used by both this section and the /skills page so the two
 * stay visually identical. `showCount` adds the per-category tally used on
 * the dedicated page.
 */
export function SkillCard({ group, showCount = false }: { group: SkillCategoryDTO; showCount?: boolean }) {
  return (
    <div className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px', fontWeight: 600,
          color: 'var(--text)', letterSpacing: '-0.01em',
          minWidth: 0, overflowWrap: 'anywhere',
        }}>
          {group.cat}
        </h3>
        {showCount && (
          <span style={{
            marginLeft: 'auto', flexShrink: 0,
            fontFamily: "'Inter', sans-serif", fontSize: '11px',
            color: 'var(--text-dim)', fontWeight: 500,
          }}>
            {group.skills.length}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {group.skills.map(s => (
          <span key={s} className="skill-chip">{s}</span>
        ))}
      </div>
    </div>
  );
}

/** Shared "Core Strengths" panel — identical markup on both surfaces. */
export function CoreStrengths({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      padding: '24px 28px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--card-radius)',
      background: 'var(--surface)',
      ...style,
    }}>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px', fontWeight: 600,
        color: 'var(--text-dim)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '16px',
      }}>
        Core Strengths
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {allStrengths.map(s => (
          <span key={s} className="skill-chip">{s}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { data, loading, error } = useApiData<SkillCategoryDTO[]>('/api/skills?limit=4');
  const featuredGroups = data ?? [];

  return (
    <section id="skills">
      <div className="container">

        {/* Header */}
        <Reveal direction="up">
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 'clamp(40px, 6vw, 72px)', flexWrap: 'wrap', gap: '24px',
          }}>
            <div style={{ minWidth: 0 }}>
              <p className="section-label" style={{ marginBottom: '14px' }}>— Expertise</p>
              <h2 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(32px, 5.5vw, 64px)',
                fontWeight: 400, letterSpacing: '-0.03em',
                color: 'var(--text)', lineHeight: 1.0,
              }}>
                Skills &amp; Technologies
              </h2>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', color: 'var(--text-muted)',
              maxWidth: '320px', lineHeight: 1.7,
            }}>
              A full-stack skill set spanning from pixel-perfect interfaces to robust back-end systems and mobile apps.
            </p>
          </div>
        </Reveal>

        {!loading && error && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', padding: '24px 0', textAlign: 'center',
          }}>
            Couldn&apos;t load skills right now. Please try again shortly.
          </p>
        )}

        {!loading && !error && featuredGroups.length === 0 && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', padding: '24px 0', textAlign: 'center',
          }}>
            Skills coming soon.
          </p>
        )}

        <div className="skills-grid" style={{ marginBottom: '24px' }}>
          {loading && [0, 1, 2, 3].map(i => <SkillGroupSkeleton key={i} index={i} />)}
          {!loading && !error && featuredGroups.map((g, gi) => (
            <Reveal key={g.id ?? g.cat} direction="up" delay={gi * 60} style={{ height: '100%' }}>
              <SkillCard group={g} />
            </Reveal>
          ))}
        </div>

        {/* Core Strengths */}
        <Reveal direction="up" delay={120}>
          <CoreStrengths style={{ marginBottom: '48px' }} />
        </Reveal>

        {/* Explore All Skills CTA */}
        <Reveal direction="up" delay={180}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/skills" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              padding: '18px clamp(24px, 5vw, 40px)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              color: 'var(--text)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(14px, 1.6vw, 15px)', fontWeight: 600,
              textDecoration: 'none',
              background: 'var(--surface)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              letterSpacing: '-0.01em',
              textAlign: 'center',
              maxWidth: '100%',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border-mid)';
                el.style.background = 'var(--text)';
                el.style.color = 'var(--bg)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border)';
                el.style.background = 'var(--surface)';
                el.style.color = 'var(--text)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }} aria-hidden>
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              Explore All Skill Areas
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }} aria-hidden>
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
