import connectDB from '@/lib/db/connectDB';
import Experience from '@/lib/models/Experience';
import type { ExperienceDTO, ExperienceType } from '@/types/portfolio';

const PUBLIC_FIELDS = 'period role org desc type';

type ExperienceLean = {
  _id: unknown;
  period: string;
  role: string;
  org: string;
  desc: string;
  type: ExperienceType;
};

function toDTO(doc: ExperienceLean): ExperienceDTO {
  return {
    id: String(doc._id),
    period: doc.period,
    role: doc.role,
    org: doc.org,
    desc: doc.desc,
    type: doc.type,
  };
}

/** Fetches the full work + education timeline, sorted by display order. */
export async function getExperience(): Promise<ExperienceDTO[]> {
  await connectDB();

  const docs = await Experience.find()
    .select(PUBLIC_FIELDS)
    .sort({ order: 1 })
    .lean<ExperienceLean[]>()
    .exec();

  return docs.map(toDTO);
}
