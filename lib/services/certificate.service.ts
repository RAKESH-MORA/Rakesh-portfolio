import connectDB from '@/lib/db/connectDB';
import Certificate from '@/lib/models/Certificate';
import type { CertificateDTO } from '@/types/portfolio';

const PUBLIC_FIELDS = 'name org date link';

type CertificateLean = {
  _id: unknown;
  name: string;
  org: string;
  date: string;
  link: string | null;
};

function toDTO(doc: CertificateLean): CertificateDTO {
  return {
    id: String(doc._id),
    name: doc.name,
    org: doc.org,
    date: doc.date,
    link: doc.link ?? null,
  };
}

/** Fetches all certificates, sorted by display order. */
export async function getCertificates(): Promise<CertificateDTO[]> {
  await connectDB();

  const docs = await Certificate.find()
    .select(PUBLIC_FIELDS)
    .sort({ order: 1 })
    .lean<CertificateLean[]>()
    .exec();

  return docs.map(toDTO);
}
