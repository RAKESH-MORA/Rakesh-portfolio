// Projects and Skills used to be hardcoded here — they now live in MongoDB
// and are served via /api/projects and /api/skills (see lib/services and
// app/api). The original values were moved into scripts/seed.ts as the
// initial data for those collections.
//
// "Core Strengths" isn't one of the managed collections, so it stays here
// as static content.
export const allStrengths = ['Problem Solving', 'Analytical Thinking', 'Research', 'Debugging', 'Communication', 'Collaboration', 'Adaptability', 'Leadership'];
