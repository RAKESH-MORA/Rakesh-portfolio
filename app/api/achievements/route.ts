import { getAchievements } from '@/lib/services/achievement.service';
import { ok, withErrorHandling } from '@/lib/api/response';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/achievements — all achievements, sorted by display order.
 *
 * Note: the current UI does not yet render an "Achievements" section, so
 * this endpoint has no consumer in the frontend yet. It's included because
 * it was requested as one of the managed collections; wire it into a
 * component whenever an Achievements section is added to the design.
 */
export async function GET() {
  return withErrorHandling(async () => {
    const achievements = await getAchievements();
    return ok(achievements);
  });
}
