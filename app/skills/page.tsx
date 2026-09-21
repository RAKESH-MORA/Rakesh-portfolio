'use client';
import CustomCursor from '../components/CustomCursor';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { SkillCard, CoreStrengths } from '../components/Skills';
import { useApiData } from '../hooks/useApiData';
import type { SkillCategoryDTO } from '@/types/portfolio';

function SkillGroupSkeleton({ index }: { index: number }) {
  return (
    <div className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div className="skeleton" style={{ width: '110px', height: '15px', animationDelay: `${index * 60}ms` }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton" style={{ width: '64px', height: '26px', borderRadius: '8px', animationDelay: `${index * 60}ms` }} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const { data, loading, error } = useApiData<SkillCategoryDTO[]>('/api/skills');
  const allSkillGroups = data ?? [];

  return (
    <>
      <CustomCursor />
      <div className="page-shell">
        <PageHeader />

        <main className="page-main">
          {/* Page header */}
          <div style={{ marginBottom: 'clamp(36px, 6vw, 56px)' }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>— Complete Toolkit</p>
            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(34px, 6vw, 80px)',
              fontWeight: 400, letterSpacing: '-0.03em',
              color: 'var(--text)', lineHeight: 1.0, marginBottom: '20px',
            }}>
              Skills &amp; Technologies
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '15px',
              color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '500px',
            }}>
              Everything I work with — from frontend frameworks to databases, DevOps, AI/ML and beyond.
            </p>
          </div>

          {!loading && error && (
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '14px',
              color: 'var(--text-muted)', padding: '32px 0', textAlign: 'center',
            }}>
              Couldn&apos;t load skills right now. Please try again shortly.
            </p>
          )}

          {!loading && !error && allSkillGroups.length === 0 && (
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '14px',
              color: 'var(--text-muted)', padding: '32px 0', textAlign: 'center',
            }}>
              Skills coming soon.
            </p>
          )}

          <div className="skills-grid-3" style={{ marginBottom: '32px' }}>
            {loading && [0, 1, 2, 3, 4, 5].map(i => <SkillGroupSkeleton key={i} index={i} />)}
            {!loading && !error && allSkillGroups.map((g, gi) => (
              <Reveal key={g.id ?? g.cat} direction="up" delay={gi * 50} style={{ height: '100%' }}>
                <SkillCard group={g} showCount />
              </Reveal>
            ))}
          </div>

          {/* Core Strengths — identical component to the homepage section */}
          <Reveal direction="up" delay={120}>
            <CoreStrengths />
          </Reveal>
        </main>
      </div>
    </>
  );
}
