import mongoose from 'mongoose';
import dns from 'dns';

/**
 * Prefer IPv4 when resolving DNS. Node.js 18+ changed its default DNS
 * result ordering, and on a number of networks/resolvers that causes the
 * SRV lookup `mongodb+srv://` URIs depend on (`_mongodb._tcp.<cluster>...`)
 * to time out or get refused (`querySrv ETIMEOUT` / `ECONNREFUSED`) even
 * though the cluster and credentials are fine. Forcing IPv4-first is the
 * standard fix and is safe everywhere — it only affects the order two
 * equally-valid answers are tried in.
 */
dns.setDefaultResultOrder('ipv4first');

/**
 * Optional escape hatch: if a host's default DNS resolver can't resolve
 * SRV records at all (some corporate networks / VPNs / restrictive
 * firewalls block them outright), set MONGODB_DNS_SERVERS to a
 * comma-separated list of resolvers known to work, e.g.
 *   MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
 */
const customDnsServers = process.env.MONGODB_DNS_SERVERS?.split(',').map((s) => s.trim()).filter(Boolean);
if (customDnsServers?.length) {
  dns.setServers(customDnsServers);
}

/**
 * A cached MongoDB connection.
 *
 * Next.js reloads modules on every request in dev (Fast Refresh) and can also
 * invoke serverless functions concurrently in production. Without caching,
 * every request would open a brand-new connection to MongoDB, quickly
 * exhausting the connection pool. We cache the connection (and the in-flight
 * connection promise) on the Node.js `global` object so it survives module
 * reloads and is reused across requests/invocations.
 */

// Read lazily, inside connectDB(), rather than captured once at module load.
// TypeScript always hoists `import` statements above other top-level code in
// the compiled output — so a caller that does
//   import { config } from 'dotenv'; config({ path: '.env.local' });
//   import connectDB from './connectDB';
// would still have this module's imports run (and, if read at module scope,
// this constant captured) *before* dotenv has injected anything. Reading it
// inside the function avoids that footgun entirely, regardless of import
// order in calling code.
function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Add it to .env.local (development) or your hosting provider\'s environment variables (production).'
    );
  }
  return uri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the NodeJS global type so TypeScript knows about our cache slot.
declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };

if (!global._mongooseCache) {
  global._mongooseCache = cache;
}

/**
 * Connects to MongoDB (or returns the existing connection) and returns the
 * mongoose instance. Safe to call from any server-side code (Route Handlers,
 * server components, scripts) — it never runs in the browser.
 *
 * Throws if `MONGODB_URI` is not configured or the connection attempt fails,
 * so callers should wrap usage in try/catch and translate the error into an
 * appropriate HTTP response.
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const MONGODB_URI = getMongoUri();
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        // Keep the pool small but non-trivial; tune via env if needed later.
        maxPoolSize: 10,
        // Atlas free/shared-tier clusters (M0/M2/M5) pause after a period
        // of inactivity and can take 30-60s to resume on the very first
        // connection after being idle — that's a "ReplicaSetNoPrimary /
        // could not connect to any servers" error that then succeeds on
        // its own a bit later, not a real outage or whitelist block. A
        // short timeout here would just fail that first request for no
        // reason, so we give it real room; override via env if you're on
        // an always-on cluster and want faster failures instead.
        serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 45000,
        connectTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 45000,
        bufferCommands: false,
        family: 4, // pair with dns.setDefaultResultOrder('ipv4first') above
      })
      .then((m) => m);
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    // Reset the promise so the next request can retry instead of getting
    // stuck on a permanently rejected promise.
    cache.promise = null;
    throw err;
  }

  return cache.conn;
}

export default connectDB;