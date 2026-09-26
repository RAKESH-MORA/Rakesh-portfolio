import { getProjects } from './project.service';
import { getSkillCategories } from './skill.service';
import { getCertificates } from './certificate.service';
import { getAchievements } from './achievement.service';
import { getExperience } from './experience.service';
import type {
  ProjectDTO,
  SkillCategoryDTO,
  CertificateDTO,
  AchievementDTO,
  ExperienceDTO,
} from '@/types/portfolio';

export interface PortfolioData {
  projects: ProjectDTO[];
  skills: SkillCategoryDTO[];
  certificates: CertificateDTO[];
  achievements: AchievementDTO[];
  experience: ExperienceDTO[];
}

/**
 * Fetches every portfolio collection the site needs in ONE batch.
 *
 * Previously the frontend made five independent HTTP round trips
 * (/api/projects, /api/skills, /api/certificates, /api/achievements,
 * /api/experience), each opening its own request/response cycle and each
 * waiting on Mongo separately. This runs all five Mongoose queries
 * concurrently against the single pooled connection (see connectDB) and
 * returns them as one payload, so a page load costs one network request
 * and one burst of parallel DB reads instead of five sequential ones.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const [projects, skills, certificates, achievements, experience] = await Promise.all([
    getProjects(),
    getSkillCategories(),
    getCertificates(),
    getAchievements(),
    getExperience(),
  ]);

  return { projects, skills, certificates, achievements, experience };
}
