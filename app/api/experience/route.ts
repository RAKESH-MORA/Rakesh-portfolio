import { getExperience } from '@/lib/services/experience.service';
import { ok, withErrorHandling } from '@/lib/api/response';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** GET /api/experience — the full work + education timeline. */
export async function GET() {
  return withErrorHandling(async () => {
    const experience = await getExperience();
    return ok(experience);
  });
}
