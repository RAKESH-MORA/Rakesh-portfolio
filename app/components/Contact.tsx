'use client';
import { useState } from 'react';
import Reveal from './Reveal';

const socials = [
  { label: 'Email', value: 'rakeshmora65@gmail.com', href: 'mailto:rakeshmora65@gmail.com' },
  { label: 'Phone', value: '+91 9121410510', href: 'tel:+919121410510' },
  { label: 'Location', value: 'Khammam, Telangana, India', href: null },
  { label: 'GitHub', value: 'github.com/RAKESH-MORA', href: 'https://github.com/RAKESH-MORA' },
  { label: 'LinkedIn', value: 'linkedin.com/in/rakesh-mora', href: 'https://linkedin.com/in/rakesh-mora-78809a2b7' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const buildMessage = () => {
    const subject = form.subject ? `\nSubject: ${form.subject}` : '';
    return `Hello Rakesh,\n\nName: ${form.name}\nEmail: ${form.email}${subject}\n\nMessage:\n${form.message}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:rakeshmora65@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Enquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const handleWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const formEl = e.currentTarget.form;
    if (!formEl || !formEl.reportValidity()) return;

    const encodedText = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/919121410510?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: 'var(--input-bg)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    display: 'block',
  };

  return (
    <section id="contact" style={{ background: 'var(--surface)', paddingBottom: 0 }}>
      <div className="container">

        {/* Header */}
        <Reveal direction="up">
          <p className="section-label" style={{ marginBottom: '14px' }}>— Contact</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(32px, 6vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            lineHeight: 0.92,
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}>
            Get In Touch
          </h2>
        </Reveal>

        <div className="contact-grid">

          {/* Left: info */}
          <Reveal direction="left">
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px', fontWeight: 400,
              color: 'var(--text-muted)', lineHeight: 1.75,
              marginBottom: '40px',
            }}>
              I&apos;m open to new opportunities, collaborations and exciting projects. Feel free to reach out — I&apos;ll get back to you promptly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {socials.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: i < socials.length - 1 ? '1px solid var(--border)' : 'none',
                  gap: '12px',
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px', fontWeight: 500,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    flexShrink: 0, minWidth: '72px',
                  }}>{s.label}</span>
                  {s.href ? (
                    <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px', color: 'var(--text)', fontWeight: 500,
                        textDecoration: 'none',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        transition: 'color 0.2s',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                    >
                      {s.value}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{s.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="right">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="contact-name-email">
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Name</label>
                  <input
                    type="text" placeholder="Rakesh Mora" required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={fieldStyle}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--border-mid)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Email</label>
                  <input
                    type="email" placeholder="you@email.com" required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={fieldStyle}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--border-mid)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject</label>
                <input
                  type="text" placeholder="Project enquiry / Collaboration / Job opportunity"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={fieldStyle}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--border-mid)'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Message</label>
                <textarea
                  placeholder="Tell me about your project or idea..."
                  rows={5} required
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...fieldStyle, resize: 'none', lineHeight: 1.6 }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--border-mid)'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button type="submit" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px 20px',
                  background: sent ? 'var(--accent-green)' : 'var(--text)',
                  color: sent ? '#fff' : 'var(--bg)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px', fontWeight: 600,
                  border: 'none', borderRadius: '100px',
                  flex: '1 1 auto',
                  minWidth: 0,
                  transition: 'opacity 0.2s, background 0.4s, transform 0.2s',
                }}
                  onMouseEnter={e => {
                    if (!sent) (e.currentTarget as HTMLElement).style.opacity = '0.84';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {sent ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7l4 4L13 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      Message Redirecting...
                    </>
                  ) : (
                    <>
                      Send Mail 
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  aria-label="Send message on WhatsApp"
                  title="Send on WhatsApp"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 0,
                    background: '#25D366',
                    color: '#fff',
                    border: 'none', borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    minWidth: '50px',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.9';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.59 2 2.17 6.41 2.17 11.86c0 2.08.61 4.11 1.76 5.88L2 22l4.45-1.67a9.82 9.82 0 0 0 5.6 1.8h.01c5.45 0 9.87-4.41 9.87-9.86S17.49 2 12.04 2Zm0 17.99h-.01a8.12 8.12 0 0 1-4.14-1.12l-.3-.18-2.64.99.9-2.55-.2-.3A8.11 8.11 0 0 1 3.9 11.86c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.2.84 5.73 2.37A8.08 8.08 0 0 1 20.18 11.86c0 4.49-3.65 8.13-8.14 8.13Zm4.46-6.08c-.25-.13-1.48-.73-1.71-.81-.23-.08-.39-.13-.55.13-.16.26-.62.81-.76.98-.14.17-.28.19-.53.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.52.11-.11.25-.28.38-.42.13-.14.17-.25.26-.42.08-.17.04-.32-.02-.45-.06-.13-.55-1.34-.75-1.84-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.32-.22.26-.85.83-.85 2.02s.88 2.34.99 2.5c.12.17 1.72 2.63 4.16 3.69.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.06-.1-.22-.17-.47-.3Z"/>
                  </svg>
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Footer */}
        <Reveal direction="up" delay={200}>
          <footer style={{
            marginTop: 'clamp(56px, 8vw, 80px)',
            paddingTop: '32px',
            paddingBottom: '36px',
            borderTop: '1px solid var(--border)',
          }}>
            {/* Top row: name + nav */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '24px',
            }}>
              <p style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '18px',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                color: 'var(--text)',
                lineHeight: 1,
              }}>
                Rakesh Mora
              </p>

              <nav className="footer-nav" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                {['Home', 'Projects', 'About', 'Skills', 'Certificates', 'Contact'].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    letterSpacing: '0.01em',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                  >{l}</a>
                ))}
              </nav>
            </div>

            {/* Bottom row: copyright + socials */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }} className="footer-bottom">
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                color: 'var(--text-dim)',
                letterSpacing: '0.01em',
              }}>
                © 2026 Rakesh Mora. All rights reserved.
              </p>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {[
                  { href: 'https://github.com/RAKESH-MORA', label: 'GitHub' },
                  { href: 'https://linkedin.com/in/rakesh-mora-78809a2b7', label: 'LinkedIn' },
                  { href: 'mailto:rakeshmora65@gmail.com', label: 'Email' },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      color: 'var(--text-dim)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </footer>
        </Reveal>
      </div>


    </section>
  );
}