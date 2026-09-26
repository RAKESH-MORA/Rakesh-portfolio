'use client';
import Image from 'next/image';
import Reveal from './Reveal';
import { usePortfolioSection } from '../context/PortfolioDataContext';
import type { ExperienceDTO } from '@/types/portfolio';

function TimelineSkeleton() {
  return (
    <div className="about-timeline-columns">
      {['Experience', 'Education'].map(group => (
        <div key={group}>
          <h4 className="about-timeline-title">{group}</h4>
          <div className="about-timeline-scroll scrollable-panel">
            <div className="about-timeline-list">
              {[0, 1].map(i => (
                <div key={i} className="about-timeline-item">
                  <span className="about-timeline-dot" />
                  <div className="about-timeline-card">
                    <div className="skeleton" style={{ width: '80px', height: '12px', marginBottom: '12px' }} />
                    <div className="skeleton" style={{ width: '70%', height: '15px', marginBottom: '8px' }} />
                    <div className="skeleton" style={{ width: '50%', height: '13px', marginBottom: '12px' }} />
                    <div className="skeleton" style={{ width: '95%', height: '13px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineGroup({ title, items }: { title: string; items: ExperienceDTO[] }) {
  return (
    <div>
      <h4 className="about-timeline-title">{title}</h4>
      <div className="about-timeline-scroll scrollable-panel">
        <div className="about-timeline-list">
          {items.map((item, i) => (
            <Reveal key={item.id} direction={title === 'Experience' ? 'left' : 'right'} delay={i * 80}>
              <div className="about-timeline-item">
                <span className="about-timeline-dot" />
                <div
                  className={`about-timeline-card${item.type === 'edu' ? ' about-timeline-card-education' : ''}`}
                  onMouseEnter={e => {
                    if (item.type === 'work') (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)';
                  }}
                  onMouseLeave={e => {
                    if (item.type === 'work') (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px', fontWeight: 600,
                      color: item.type === 'work' ? 'var(--accent-green)' : 'var(--text-muted)',
                      background: item.type === 'work' ? 'var(--accent-green-bg)' : 'var(--tag-bg)',
                      padding: '3px 10px', borderRadius: '100px',
                    }}>
                      {item.type === 'work' ? 'Work' : 'Education'}
                    </span>
                    <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: 'italic', fontSize: '13px', color: 'var(--text-dim)', textAlign: 'right' }}>
                      {item.period}
                    </span>
                  </div>
                  <h5 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px', fontWeight: 600,
                    color: 'var(--text)', marginBottom: '4px',
                  }}>{item.role}</h5>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>{item.org}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const {
    data: timelineData,
    loading: timelineLoading,
    error: timelineError,
  } = usePortfolioSection('experience');
  const timeline = timelineData ?? [];
  const experience = timeline.filter(item => item.type === 'work');
  const education = timeline.filter(item => item.type === 'edu');

  return (
    <section id="about" style={{ background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          opacity: 0.10,
          backgroundImage: 'url("/about_image.jpg")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat',
          transform: 'translate3d(0, calc(var(--scroll-y, 0px) * -0.06), 0) scale(1.12)',
          willChange: 'transform',
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <Reveal direction="up">
          <p className="section-label" style={{ marginBottom: '14px' }}>— About Me</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(32px, 5.5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            lineHeight: 1.0,
            maxWidth: '700px',
            marginBottom: 'clamp(48px, 7vw, 80px)',
          }}>
            Turning Ideas into<br />
            <em style={{ color: 'var(--text-muted)' }}>Interactive Experiences</em>
          </h2>
        </Reveal>

        {/* Two-col: bio + stats */}
        <div className="about-grid" style={{ marginBottom: 'clamp(64px, 9vw, 100px)' }}>
          <Reveal className="about-bio-column" direction="left">
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px', fontWeight: 400,
              color: 'var(--text-muted)', lineHeight: 1.8,
              marginBottom: '24px',
            }}>
              I&apos;m Rakesh Mora, a Computer Science and Engineering graduate (2026) from Guru Nanak Institute of Technology, Hyderabad. I enjoy building web and mobile applications that are simple, useful and visually appealing.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px', fontWeight: 400,
              color: 'var(--text-muted)', lineHeight: 1.8,
              marginBottom: '36px',
            }}>
              I&apos;m passionate about clean code, modern UI/UX and solving real-world problems. I&apos;m always eager to learn new technologies and work on projects that make an impact.
            </p>

            {/* Info */}
            <div className="about-info-grid" style={{ marginBottom: '32px' }}>
              {[
                { label: 'Location', value: 'Khammam, Telangana, India' },
                { label: 'Degree', value: 'Bachelor of Technology (B.Tech)' },
                { label: 'Email', value: 'rakeshmora65@gmail.com' },
                { label: 'Status', value: 'Open to Work and Networking' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '14px 16px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <a href="/resume.pdf" download="Rakesh-Mora-Resume.pdf" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              color: 'var(--text)', textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v8M3 6.5l3.5 3.5L10 6.5M1 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </a>
          </Reveal>

          {/* Full image on the right on desktop */}
          <Reveal className="about-image-column" direction="right">
            <a className="about-image-link" href="#" aria-label="Open profile image">
              <Image
                className="about-image"
                src="/Professional%20Office%20Portrait.png"
                alt="Rakesh Mora"
                width={700}
                height={930}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </a>
          </Reveal>

          {/* Stats + languages */}
          <Reveal className="about-details-column" direction="right">
            <div className="about-stats-grid" style={{ background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', overflow: 'hidden', marginBottom: '24px' }}>
              {[
                { val: '6+', label: 'Projects Built' },
                { val: '7.98', label: 'CGPA' },
                { val: '2026', label: 'Graduate' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'var(--surface)',
                  padding: '20px 14px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: '32px', fontWeight: 400,
                    color: 'var(--text)', letterSpacing: '-0.03em',
                    lineHeight: 1, marginBottom: '6px',
                  }}>{s.val}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div style={{
              padding: '18px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              marginBottom: '16px',
            }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Languages</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {[
                  { lang: 'English', level: 'Professional', pct: 90 },
                  { lang: 'Telugu', level: 'Native', pct: 100 },
                  { lang: 'Hindi', level: 'Conversational', pct: 65 },
                ].map(l => (
                  <div key={l.lang}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{l.lang}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-muted)' }}>{l.level}</span>
                    </div>
                    <div style={{ height: '2px', background: 'var(--border)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${l.pct}%`, background: 'var(--text)', borderRadius: '2px', transition: 'width 1.2s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal direction="up">
          <h3 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(32px, 5.5vw, 64px)',
            fontWeight: 400, letterSpacing: '-0.03em',
            color: 'var(--text)', lineHeight: 1.0,
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}>
            Experience &amp; Education
          </h3>
        </Reveal>

        {timelineLoading && <TimelineSkeleton />}

        {!timelineLoading && timelineError && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', padding: '24px 0', textAlign: 'center',
          }}>
            Couldn&apos;t load experience & education right now. Please try again shortly.
          </p>
        )}

        {!timelineLoading && !timelineError && timeline.length === 0 && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px',
            color: 'var(--text-muted)', padding: '24px 0', textAlign: 'center',
          }}>
            Experience & education details coming soon.
          </p>
        )}

        {!timelineLoading && !timelineError && timeline.length > 0 && (
          <div className="about-timeline-columns">
            {experience.length > 0 && <TimelineGroup title="Experience" items={experience} />}
            {education.length > 0 && <TimelineGroup title="Education" items={education} />}
          </div>
        )}
      </div>


    </section>
  );
}
