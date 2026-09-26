import { getPortfolioData, type PortfolioData } from '@/lib/services/portfolio.service';
import { ok, withErrorHandling } from '@/lib/api/response';

// The route itself always runs (no static/ISR caching of the route handler
// output) — freshness is handled by the in-memory cache below instead,
// which we control directly and can tune independently of Next's own
// caching layer.
export const dynamic = 'force-dynamic';

/**
 * How long a fetched payload is served from memory before we go back to
 * MongoDB. Portfolio content changes rarely (it's edited by hand in the
 * database), so a short TTL gives near-instant responses to every visitor
 * without ever showing stale-for-long data. Tune with an env var if needed.
 */
const CACHE_TTL_MS = Number(process.env.PORTFOLIO_CACHE_TTL_MS) || 60_000;

interface PortfolioCache {
  data: PortfolioData | null;
  expiresAt: number;
  /** De-dupes concurrent cache misses so a burst of simultaneous visitors
   *  triggers exactly one set of DB queries, not one per request. */
  inFlight: Promise<PortfolioData> | null;
}

// Cached on `global`, same pattern as lib/db/connectDB.ts, so the cache
// survives Next.js module reloads (dev Fast Refresh) and is shared across
// concurrent invocations of this route within the same server process.
declare global {
  var _portfolioCache: PortfolioCache | undefined;
}

const cache: PortfolioCache = global._portfolioCache ?? { data: null, expiresAt: 0, inFlight: null };
if (!global._portfolioCache) {
  global._portfolioCache = cache;
}

async function getCachedPortfolioData(): Promise<PortfolioData> {
  const now = Date.now();

  if (cache.data && now < cache.expiresAt) {
    return cache.data;
  }

  if (cache.inFlight) {
    return cache.inFlight;
  }

  cache.inFlight = getPortfolioData()
    .then((data) => {
      cache.data = data;
      cache.expiresAt = Date.now() + CACHE_TTL_MS;
      return data;
    })
    .catch((err) => {
      // Don't cache failures — the next request should retry against Mongo.
      throw err;
    })
    .finally(() => {
      cache.inFlight = null;
    });

  return cache.inFlight;
}

/**
 * GET /api/portfolio — every portfolio collection in one response:
 * { projects, skills, certificates, achievements, experience }.
 *
 * Replaces separately calling /api/projects, /api/skills,
 * /api/certificates, /api/achievements and /api/experience. Backed by a
 * short-lived in-memory cache (see above) plus a CDN-friendly
 * stale-while-revalidate header, so most requests never touch MongoDB at
 * all.
 */
export async function GET() {
  return withErrorHandling(async () => {
    const data = await getCachedPortfolioData();
    const res = ok(data);
    res.headers.set(
      'Cache-Control',
      `public, s-maxage=${Math.floor(CACHE_TTL_MS / 1000)}, stale-while-revalidate=300`
    );
    return res;
  });
}
