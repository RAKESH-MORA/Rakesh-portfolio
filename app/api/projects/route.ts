import { NextRequest } from 'next/server';
import { getProjects } from '@/lib/services/project.service';
import { ok, fail, withErrorHandling, parseLimit } from '@/lib/api/response';

// Always hit the database — portfolio content is edited directly in MongoDB
// and visitors should see the latest data on every request, never a stale
// build-time or route cache.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/projects
 * GET /api/projects?featured=true&limit=3
 *
 * Query params:
 *  - featured: "true" to return only projects flagged as featured (used by
 *    the homepage). Omit to return every project (used by /projects).
 *  - limit: caps the number of results, applied after sorting by order.
 */
export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const { searchParams } = new URL(request.url);

    const limit = parseLimit(searchParams);
    if (limit && typeof limit === 'object') {
      return fail(limit.error, 400);
    }

    const featuredOnly = searchParams.get('featured') === 'true';

    const projects = await getProjects({ featuredOnly, limit });
    return ok(projects);
  });
}
