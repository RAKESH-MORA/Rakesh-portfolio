'use client';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import InitialLoader from './components/InitialLoader';

/**
 * Root client-side provider tree. Kept as its own file (rather than in
 * layout.tsx, which is a server component) so the root layout itself can
 * stay a server component while still wrapping every route in the
 * providers client components need.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioDataProvider>
      <InitialLoader />
      {children}
    </PortfolioDataProvider>
  );
}
