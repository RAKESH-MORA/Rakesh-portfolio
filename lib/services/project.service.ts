import connectDB from '@/lib/db/connectDB';
import Project from '@/lib/models/Project';
import type { ProjectDTO } from '@/types/portfolio';

// Explicit field projection — only what the UI needs is ever selected from
// the database, and only what's listed here is ever returned to the client.
const PUBLIC_FIELDS = 'num title subtitle desc tags github live year category highlights';

type ProjectLean = {
  _id: unknown;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  github: string;
  live: string | null;
  year: string;
  category: string;
  highlights: string[];
};

function toDTO(doc: ProjectLean): ProjectDTO {
  return {
    id: String(doc._id),
    num: doc.num,
    title: doc.title,
    subtitle: doc.subtitle,
    desc: doc.desc,
    tags: doc.tags ?? [],
    github: doc.github,
    live: doc.live ?? null,
    year: doc.year,
    category: doc.category,
    highlights: doc.highlights ?? [],
  };
}

interface GetProjectsOptions {
  /** When true, only projects flagged `featured: true` are returned. */
  featuredOnly?: boolean;
  /** Caps the number of results (applied after sorting by `order`). */
  limit?: number;
}

/**
 * Fetches projects sorted by their configured display order.
 * Used by both the homepage (featuredOnly + limit) and the /projects page
 * (all projects, no limit).
 */
export async function getProjects(options: GetProjectsOptions = {}): Promise<ProjectDTO[]> {
  await connectDB();

  const query = Project.find(options.featuredOnly ? { featured: true } : {})
    .select(PUBLIC_FIELDS)
    .sort({ order: 1 })
    .lean<ProjectLean[]>();

  if (options.limit) {
    query.limit(options.limit);
  }

  const docs = await query.exec();
  return docs.map(toDTO);
}
