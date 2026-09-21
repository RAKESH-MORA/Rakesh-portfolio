'use client';
import { useEffect, useState } from 'react';

interface UseApiDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches data from one of the portfolio API routes (`/api/projects`,
 * `/api/skills`, etc.) and exposes loading / error / data state for use in
 * client components. Always requests fresh data — no client-side caching —
 * so visitors see whatever is currently in the database.
 */
export function useApiData<T>(url: string): UseApiDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Reset to a fresh loading state whenever the URL changes, without
    // synchronously calling setState from the render path.
    Promise.resolve().then(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
    });

    fetch(url, { cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(json?.error || `Request failed with status ${res.status}`);
        }
        return json?.data as T;
      })
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load data.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
