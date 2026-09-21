'use client';
import { useState } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { useApiData } from '../hooks/useApiData';
import type { ProjectDTO } from '@/types/portfolio';

function ProjectRowSkeleton({ index }: { index: number }) {
  return (
    <div style={{
      alignItems: 'start', padding: '28px 0', borderBottom: '1px solid var(--border)',
    }} className="proj-row">
      <div className="skeleton" style={{ width: '24px', height: '16px', animationDelay: `${index * 80}ms` }} />
      <div>
        <div className="skeleton" style={{ width: '45%', height: '26px', marginBottom: '12px', animationDelay: `${index * 80}ms` }} />
        <div className="skeleton" style={{ width: '85%', height: '14px', marginBottom: '8px', animationDelay: `${index * 80}ms` }} />
        <div className="skeleton" style={{ width: '60%', height: '14px', marginBottom: '16px', animationDelay: `${index * 80}ms` }} />
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="skeleton" style={{ width: '60px', height: '22px', borderRadius: '100px', animationDelay: `${index * 80}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: ProjectDTO; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 60} direction="up">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          alignItems: 'start',
          padding: '28px 0',
          borderBottom: '1px solid var(--border)',
          transition: 'all 0.3s ease',
          cursor: 'default',
        }}
        className="proj-row"
      >
        {/* Number */}
        <div style={{ paddingTop: '4px' }}>
          <span style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontStyle: 'italic', fontSize: '13px',
            color: 'var(--text-dim)', transition: 'color 0.3s',
          }}>
            {project.num}
          </span>
        </div>

        {/* Content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(20px, 3vw, 30px)',
              fontWeight: 400, letterSpacing: '-0.02em',
              color: 'var(--text)', lineHeight: 1.1,
            }}>
              {project.title}
            </h3>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
              color: 'var(--text-dim)', padding: '3px 10px',
              border: '1px solid var(--border)', borderRadius: '100px',
            }}>
              {project.category}
            </span>
            <span style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontStyle: 'italic', fontSize: '13px', color: 'var(--text-dim)',
              marginLeft: 'auto',
            }}>
              {project.year}
            </span>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', lineHeight: 1.7,
            maxWidth: '600px', marginBottom: '14px',
          }}>
            {project.desc}
          </p>

          {/* Highlights — always visible on mobile, hover on desktop */}
          <div
            className="proj-highlights"
            style={{
              display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px',
              maxHeight: hovered ? '80px' : '0',
              overflow: 'hidden',
              opacity: hovered ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {project.highlights.map(h => (
              <span key={h} style={{
                fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
                color: 'var(--accent-green)', background: 'var(--accent-green-bg)',
                padding: '3px 10px', borderRadius: '100px',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span style={{ width: '4px', height: '4px', background: 'var(--accent-green)', borderRadius: '50%' }} />
                {h}
              </span>
            ))}
          </div>

          {/* Tags + links */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {project.tags.slice(0, 4).map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
              {project.tags.length > 4 && (
                <span className="chip">+{project.tags.length - 4}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 12px',
                border: '1px solid var(--border)', borderRadius: '100px',
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
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '6px 12px',
                  background: 'var(--text)', borderRadius: '100px',
                  color: 'var(--bg)', textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600,
                  transition: 'opacity 0.2s ease',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.82'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                >
                  Live
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const { data, loading, error } = useApiData<ProjectDTO[]>('/api/projects?featured=true&limit=3');
  const featuredProjects = data ?? [];

  return (
    <section id="projects">
      <div className="container">
        {/* Header */}
        <Reveal direction="up">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(40px, 6vw, 64px)', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '14px' }}>— My Work</p>
              <h2 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(32px, 5.5vw, 64px)',
                fontWeight: 400, letterSpacing: '-0.03em',
                color: 'var(--text)', lineHeight: 1.0,
              }}>
                Featured Projects
              </h2>
            </div>
            <a href="https://github.com/RAKESH-MORA?tab=repositories" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500,
              color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
            >
              All on GitHub
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </a>
          </div>
        </Reveal>

        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '0' }} />

        {loading && [0, 1, 2].map(i => <ProjectRowSkeleton key={i} index={i} />)}

        {!loading && error && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', padding: '32px 0', textAlign: 'center',
          }}>
            Couldn&apos;t load projects right now. Please try again shortly.
          </p>
        )}

        {!loading && !error && featuredProjects.length === 0 && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', padding: '32px 0', textAlign: 'center',
          }}>
            Projects coming soon.
          </p>
        )}

        {!loading && !error && featuredProjects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}

        {/* Explore All Projects CTA */}
        <Reveal direction="up" delay={200}>
          <div style={{ marginTop: 'clamp(40px, 6vw, 56px)', display: 'flex', justifyContent: 'center' }}>
            <Link href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
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
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-mid)';
                el.style.background = 'var(--text)';
                el.style.color = 'var(--bg)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.background = 'var(--surface)';
                el.style.color = 'var(--text)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              Explore All Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>


    </section>
  );
}