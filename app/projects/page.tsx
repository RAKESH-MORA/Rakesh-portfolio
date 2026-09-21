'use client';
import { useMemo, useState } from 'react';
import CustomCursor from '../components/CustomCursor';
import PageHeader from '../components/PageHeader';
import { useApiData } from '../hooks/useApiData';
import type { ProjectDTO } from '@/types/portfolio';

function ProjectCardSkeleton({ index }: { index: number }) {
  return (
    <div style={{
      padding: 'clamp(20px, 4vw, 28px)', border: '1px solid var(--border)',
      borderRadius: 'var(--card-radius)', background: 'var(--surface)',
      animation: `fadeUp 0.5s ${index * 60}ms both`, minWidth: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div className="skeleton" style={{ width: '20px', height: '14px' }} />
        <div className="skeleton" style={{ width: '60px', height: '18px', borderRadius: '100px' }} />
      </div>
      <div className="skeleton" style={{ width: '70%', height: '24px', marginBottom: '10px' }} />
      <div className="skeleton" style={{ width: '90%', height: '13px', marginBottom: '8px' }} />
      <div className="skeleton" style={{ width: '80%', height: '13px', marginBottom: '20px' }} />
      <div style={{ display: 'flex', gap: '6px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="skeleton" style={{ width: '50px', height: '18px', borderRadius: '100px' }} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectDTO; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(20px, 4vw, 28px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--card-radius)',
        background: 'var(--surface)',
        minWidth: 0,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'none',
        borderColor: hovered ? 'var(--border-mid)' : 'var(--border)',
        animation: `fadeUp 0.5s ${index * 60}ms both`,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontStyle: 'italic', fontSize: '12px', color: 'var(--text-dim)',
          }}>
            {project.num}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 500,
            color: 'var(--text-dim)', padding: '2px 8px',
            border: '1px solid var(--border)', borderRadius: '100px',
          }}>
            {project.category}
          </span>
          <span style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontStyle: 'italic', fontSize: '12px', color: 'var(--text-dim)',
          }}>
            {project.year}
          </span>
        </div>
      </div>

      <h3 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(22px, 2.5vw, 28px)',
        fontWeight: 400, letterSpacing: '-0.02em',
        color: 'var(--text)', lineHeight: 1.1, marginBottom: '6px',
        overflowWrap: 'anywhere',
      }}>
        {project.title}
      </h3>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '12px',
        color: 'var(--text-dim)', marginBottom: '12px', fontStyle: 'italic',
      }}>
        {project.subtitle}
      </p>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '13px',
        color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px',
      }}>
        {project.desc}
      </p>

      {/* Highlights */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {project.highlights.map(h => (
          <span key={h} style={{
            fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 500,
            color: 'var(--accent-green)', background: 'var(--accent-green-bg)',
            padding: '2px 8px', borderRadius: '100px',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{ width: '3px', height: '3px', background: 'var(--accent-green)', borderRadius: '50%' }} />
            {h}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {project.tags.map(t => (
          <span key={t} className="chip" style={{ fontSize: '10px' }}>{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} className="proj-links">
        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          padding: '9px 0',
          border: '1px solid var(--border)', borderRadius: '10px',
          color: 'var(--text-muted)', textDecoration: 'none',
          fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500,
          transition: 'all 0.2s ease',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-mid)'; el.style.color = 'var(--text)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)'; }}
        >
          GitHub
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '9px 0',
            background: 'var(--text)', borderRadius: '10px',
            color: 'var(--bg)', textDecoration: 'none',
            fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600,
            transition: 'opacity 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.82'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            Live Demo
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { data, loading, error } = useApiData<ProjectDTO[]>('/api/projects');
  const allProjects = useMemo(() => data ?? [], [data]);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allProjects.map(p => p.category)))],
    [allProjects]
  );

  const filtered = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <>
      <CustomCursor />
      <div className="page-shell">
        <PageHeader />

        <main className="page-main">

          {/* Page header */}
          <div style={{ marginBottom: 'clamp(36px, 6vw, 56px)' }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>— All Projects</p>
            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(34px, 6vw, 80px)',
              fontWeight: 400, letterSpacing: '-0.03em',
              color: 'var(--text)', lineHeight: 1.0, marginBottom: '20px',
            }}>
              Everything I&apos;ve Built
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '15px',
              color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '500px',
            }}>
              A complete view of my projects — from full-stack web apps to mobile and AI/ML work.
            </p>
          </div>

          {/* Category filter */}
          {!loading && !error && allProjects.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '7px 16px',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--border-mid)' : 'var(--border)',
                borderRadius: '100px',
                background: activeCategory === cat ? 'var(--text)' : 'transparent',
                color: activeCategory === cat ? 'var(--bg)' : 'var(--text-muted)',
                fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}>
                {cat}
                {cat !== 'All' && (
                  <span style={{ marginLeft: '6px', opacity: 0.6 }}>
                    {allProjects.filter(p => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          )}

          {!loading && error && (
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '14px',
              color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center',
            }}>
              Couldn&apos;t load projects right now. Please try again shortly.
            </p>
          )}

          {!loading && !error && allProjects.length === 0 && (
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '14px',
              color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center',
            }}>
              Projects coming soon.
            </p>
          )}

          {/* Projects grid */}
          {(loading || (!error && filtered.length > 0)) && (
            <div className="proj-grid">
              {loading
                ? [0, 1, 2, 3, 5, 6].map(i => <ProjectCardSkeleton key={i} index={i} />)
                : filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

      `}</style>
    </>
  );
}
