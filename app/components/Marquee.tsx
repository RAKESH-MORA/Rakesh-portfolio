'use client';

const items = [
  'React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL',
  'Flutter', 'Neo4j', 'MongoDB', 'Python', 'Flask', 'UI/UX Design', 'REST APIs',
];
const sep = '—';

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
      background: 'var(--surface)',
    }}>
      <div
        className="marquee-inner"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: reverse ? '36s' : '28s',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            paddingRight: '28px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: i % 2 === 0 ? 'var(--text-muted)' : 'var(--text-dim)',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ marginLeft: '28px', color: 'var(--text-dim)' }}>{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
