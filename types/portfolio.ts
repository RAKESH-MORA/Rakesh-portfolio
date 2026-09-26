/**
 * Public-facing DTO (data transfer object) types.
 *
 * These describe exactly what the API returns to the browser — never raw
 * Mongoose documents. Keeping them separate from the Mongoose schemas means
 * internal fields (Mongo `_id`, `__v`, `createdAt`, `updatedAt`, `order`,
 * etc.) are never leaked unless a field is deliberately re-exposed here.
 */

export interface ProjectDTO {
  id: string;
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
  featured: boolean;
}

export interface SkillCategoryDTO {
  id: string;
  cat: string;
  icon: string;
  color: string;
  skills: string[];
}

export type ExperienceType = 'work' | 'edu';

export interface ExperienceDTO {
  id: string;
  period: string;
  role: string;
  org: string;
  desc: string;
  type: ExperienceType;
}

export interface CertificateDTO {
  id: string;
  name: string;
  org: string;
  date: string;
  link: string | null;
}

export interface AchievementDTO {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer: string | null;
  link: string | null;
}

/** Standard success envelope returned by every portfolio API route. */
export interface ApiSuccess<T> {
  data: T;
}

/** Standard error envelope returned by every portfolio API route. */
export interface ApiError {
  error: string;
}
