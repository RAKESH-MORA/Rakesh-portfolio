import connectDB from '@/lib/db/connectDB';
import Achievement from '@/lib/models/Achievement';
import type { AchievementDTO } from '@/types/portfolio';

const PUBLIC_FIELDS = 'title description date issuer link';

type AchievementLean = {
  _id: unknown;
  title: string;
  description: string;
  date: string;
  issuer: string | null;
  link: string | null;
};

function toDTO(doc: AchievementLean): AchievementDTO {
  return {
    id: String(doc._id),
    title: doc.title,
    description: doc.description,
    date: doc.date,
    issuer: doc.issuer ?? null,
    link: doc.link ?? null,
  };
}

/** Fetches all achievements, sorted by display order. */
export async function getAchievements(): Promise<AchievementDTO[]> {
  await connectDB();

  const docs = await Achievement.find()
    .select(PUBLIC_FIELDS)
    .sort({ order: 1 })
    .lean<AchievementLean[]>()
    .exec();

  return docs.map(toDTO);
}
