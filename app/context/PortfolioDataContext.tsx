'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import type {
  ProjectDTO,
  SkillCategoryDTO,
  CertificateDTO,
  AchievementDTO,
  ExperienceDTO,
} from '@/types/portfolio';

export interface PortfolioData {
  projects: ProjectDTO[];
  skills: SkillCategoryDTO[];
  certificates: CertificateDTO[];
  achievements: AchievementDTO[];
  experience: ExperienceDTO[];
}

interface PortfolioContextValue {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextValue>({
  data: null,
  loading: true,
  error: null,
});

/**
 * Fetches the ENTIRE portfolio (projects, skills, certificates,
 * achievements, experience) exactly once, in a single request to
 * `/api/portfolio`, and shares the result with every section on the page.
 *
 * This provider lives in the root layout (see app/providers.tsx), so it's
 * mounted once per visit and survives client-side navigation between `/`,
 * `/projects` and `/skills` — those routes read from this same cached
 * value instead of firing their own fetches, so navigating between pages
 * is instant and the database is never hit again for the rest of the
 * visit.
 */
export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioContextValue>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch('/api/portfolio', { cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(json?.error || `Request failed with status ${res.status}`);
        }
        return json?.data as PortfolioData;
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load data.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <PortfolioContext.Provider value={state}>{children}</PortfolioContext.Provider>;
}

/** Raw access to the full cached payload plus loading/error state. */
export function usePortfolioData(): PortfolioContextValue {
  return useContext(PortfolioContext);
}

/**
 * Scoped access to a single collection, shaped like the old per-endpoint
 * `useApiData` hook (`{ data, loading, error }`) so section components
 * barely change when switching over to the shared cache.
 */
export function usePortfolioSection<K extends keyof PortfolioData>(
  key: K
): { data: PortfolioData[K] | null; loading: boolean; error: string | null } {
  const { data, loading, error } = usePortfolioData();
  return {
    data: data ? data[key] : null,
    loading,
    error,
  };
}
