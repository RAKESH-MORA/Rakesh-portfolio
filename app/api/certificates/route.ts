import { getCertificates } from '@/lib/services/certificate.service';
import { ok, withErrorHandling } from '@/lib/api/response';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** GET /api/certificates — all certificates, sorted by display order. */
export async function GET() {
  return withErrorHandling(async () => {
    const certificates = await getCertificates();
    return ok(certificates);
  });
}
