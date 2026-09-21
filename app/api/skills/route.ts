import { NextRequest } from 'next/server';
import { getSkillCategories } from '@/lib/services/skill.service';
import { ok, fail, withErrorHandling, parseLimit } from '@/lib/api/response';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/skills
 * GET /api/skills?limit=4
 *
 * Query params:
 *  - limit: caps the number of skill categories returned, applied after
 *    sorting by order (used by the homepage, which shows the first 4).
 */
export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const { searchParams } = new URL(request.url);

    const limit = parseLimit(searchParams);
    if (limit && typeof limit === 'object') {
      return fail(limit.error, 400);
    }

    const categories = await getSkillCategories({ limit });
    return ok(categories);
  });
}
