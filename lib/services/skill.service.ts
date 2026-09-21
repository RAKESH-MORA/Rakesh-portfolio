import connectDB from '@/lib/db/connectDB';
import SkillCategory from '@/lib/models/SkillCategory';
import type { SkillCategoryDTO } from '@/types/portfolio';

const PUBLIC_FIELDS = 'cat icon color skills';

type SkillCategoryLean = {
  _id: unknown;
  cat: string;
  icon: string;
  color: string;
  skills: string[];
};

function toDTO(doc: SkillCategoryLean): SkillCategoryDTO {
  return {
    id: String(doc._id),
    cat: doc.cat,
    icon: doc.icon,
    color: doc.color,
    skills: doc.skills ?? [],
  };
}

interface GetSkillCategoriesOptions {
  /** Caps the number of categories returned (applied after sorting). */
  limit?: number;
}

/**
 * Fetches skill categories sorted by their configured display order.
 * Used by both the homepage (limit: 4) and the /skills page (all).
 */
export async function getSkillCategories(options: GetSkillCategoriesOptions = {}): Promise<SkillCategoryDTO[]> {
  await connectDB();

  const query = SkillCategory.find().select(PUBLIC_FIELDS).sort({ order: 1 }).lean<SkillCategoryLean[]>();

  if (options.limit) {
    query.limit(options.limit);
  }

  const docs = await query.exec();
  return docs.map(toDTO);
}
