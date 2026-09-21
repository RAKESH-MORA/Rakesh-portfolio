import { NextResponse } from 'next/server';
import type { ApiError, ApiSuccess } from '@/types/portfolio';

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ data }, { status });
}

export function fail(message: string, status = 500) {
  return NextResponse.json<ApiError>({ error: message }, { status });
}

/**
 * Wraps a Route Handler body, translating thrown errors into consistent
 * JSON error responses instead of letting Next.js return an opaque 500 HTML
 * page. Configuration errors (e.g. missing MONGODB_URI) surface as 500s
 * with a safe, generic message — details are logged server-side only.
 */
export async function withErrorHandling(handler: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await handler();
  } catch (err) {
    console.error('[api]', err);
    return fail('Something went wrong while fetching portfolio data. Please try again shortly.', 500);
  }
}

/** Parses and validates a `limit` query param, returning `undefined` if absent. */
export function parseLimit(searchParams: URLSearchParams): number | undefined | { error: string } {
  const raw = searchParams.get('limit');
  if (raw === null) return undefined;

  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0) {
    return { error: 'Query parameter "limit" must be a positive integer.' };
  }
  return n;
}
