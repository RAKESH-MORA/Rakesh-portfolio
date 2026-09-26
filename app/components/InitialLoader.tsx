'use client';
import { useEffect, useState } from 'react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startedAt = performance.now();
    let frame = 0;
    let hideTimer: number | undefined;

    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = reducedMotion ? 100 : Math.min(100, Math.round((elapsed / 950) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      setLeaving(true);
      hideTimer = window.setTimeout(() => setVisible(false), reducedMotion ? 0 : 650);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`site-loader${leaving ? ' site-loader-leaving' : ''}`} aria-label="Loading portfolio" role="status">
      <div className="site-loader-mark" aria-hidden="true">RM</div>
      <div className="site-loader-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="site-loader-meta">
        <span>Rakesh Mora</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}
