/**
 * One-time seed script: populates MongoDB with the portfolio content that
 * used to be hardcoded in app/data/projects.ts and app/components/About.tsx.
 *
 * Run it once against your database to get started, then manage content
 * directly in MongoDB from then on (Compass, mongosh, Atlas UI, etc.).
 *
 * Usage:
 *   npm run seed
 *
 * Safe to re-run: it clears each collection before inserting, so running it
 * again resets content back to these defaults instead of duplicating it.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import connectDB from '../lib/db/connectDB';
import Project from '../lib/models/Project';
import SkillCategory from '../lib/models/SkillCategory';
import Experience from '../lib/models/Experience';
import Certificate from '../lib/models/Certificate';
import Achievement from '../lib/models/Achievement';
import mongoose from 'mongoose';

const projects = [
  {
    num: '01',
    title: 'MovieGraph',
    subtitle: 'Graph-Based Movie Discovery & Recommendation Platform',
    desc: 'Full-stack platform modeling relationships between movies, actors, directors and genres using a graph database. Features 8+ REST endpoints with parameterized Cypher queries delivering under 200ms response times.',
    tags: ['React', 'Node.js', 'Express.js', 'Neo4j', 'Cypher', 'REST APIs', 'JavaScript'],
    github: 'https://github.com/RAKESH-MORA/Moviegraph',
    live: 'https://mellifluous-otter-651e8f.netlify.app',
    year: '2024',
    category: 'Full Stack',
    highlights: ['8+ REST endpoints', '200ms response time', 'Graph database modelling', 'Deployed on Netlify'],
    order: 1,
    featured: true,
  },
  {
    num: '02',
    title: 'Delight Mandi',
    subtitle: 'Restaurant Full-Stack Ordering Platform',
    desc: '2 production restaurant sites with WhatsApp-integrated ordering — live and actively used by real customers. Mobile-first design with PostgreSQL-backed menu management.',
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'REST APIs'],
    github: 'https://github.com/RAKESH-MORA/delight_mandi',
    live: 'https://delight-mandi.netlify.app/',
    year: '2024',
    category: 'Full Stack',
    highlights: ['Live production site', 'WhatsApp ordering', 'Real customers', 'Mobile-first'],
    order: 2,
    featured: true,
  },
  {
    num: '03',
    title: 'Digital Bills',
    subtitle: 'Mobile Billing & Invoicing App',
    desc: 'Offline-first Flutter app for small businesses. 10+ screens, 4 reactive Provider states, 8-language runtime switching, PDF export with WhatsApp sharing on iOS and Android.',
    tags: ['Flutter', 'Dart', 'Hive', 'Provider', 'PDF Generation'],
    github: 'https://github.com/RAKESH-MORA/Flutter_app_bill',
    live: null,
    year: '2024',
    category: 'Mobile',
    highlights: ['Offline-first', '8 languages', 'PDF export', 'iOS + Android'],
    order: 3,
    featured: true,
  },
  {
    num: '04',
    title: 'Task Manager',
    subtitle: 'Web-Based Task Management System',
    desc: 'Task management with user registration, authentication, task creation and progress tracking. 8 Flask API routes with session-based authentication and SQL database integration.',
    tags: ['Python', 'Flask', 'SQL', 'HTML/CSS', 'Authentication'],
    github: 'https://github.com/RAKESH-MORA/task-flow-app',
    live: null,
    year: '2023',
    category: 'Web App',
    highlights: ['User auth', '8 API routes', '3+ user types', 'CRUD operations'],
    order: 4,
    featured: false,
  },
  {
    num: '05',
    title: 'Pulmonary AI',
    subtitle: 'Disease Prediction Using Breathing Sounds',
    desc: 'ML workflow for pulmonary disease prediction using respiratory audio data. Trained on 5+ respiratory sound categories achieving baseline accuracy on the ICBHI dataset.',
    tags: ['Python', 'Machine Learning', 'Audio Processing', 'TensorFlow', 'Scikit-learn'],
    github: 'https://github.com/RAKESH-MORA/Classification-of-pulmonary-diseases-using-respiratory-sounds',
    live: null,
    year: '2024',
    category: 'AI / ML',
    highlights: ['ICBHI dataset', '5+ categories', 'Audio preprocessing', 'Feature extraction'],
    order: 5,
    featured: false,
  },
];

const skillCategories = [
  {
    cat: 'Frontend', icon: '◈', color: '#4f9cf9', order: 1,
    skills: ['React.js', 'React Router', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Flutter', 'Figma', 'Responsive Design'],
  },
  {
    cat: 'Backend', icon: '◎', color: '#2d6a2d', order: 2,
    skills: ['Node.js', 'Express.js', 'Flask', 'Django', 'REST APIs', 'Authentication', 'CRUD', 'Rate Limiting', 'CORS'],
  },
  {
    cat: 'Databases', icon: '◉', color: '#c07a3a', order: 3,
    skills: ['PostgreSQL', 'MongoDB', 'Neo4j', 'MySQL', 'Firebase', 'Supabase', 'SQLite', 'Hive', 'Cypher'],
  },
  {
    cat: 'Languages', icon: '◇', color: '#9b59b6', order: 4,
    skills: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3', 'Java', 'Dart'],
  },
  {
    cat: 'Dev & Tools', icon: '◆', color: '#e67e22', order: 5,
    skills: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Postman', 'Netlify', 'Vercel', 'Render', 'CI/CD', 'Linux'],
  },
  {
    cat: 'AI / Data', icon: '◑', color: '#c0392b', order: 6,
    skills: ['Machine Learning', 'TensorFlow', 'NumPy', 'Pandas', 'Scikit-learn', 'Audio Processing', 'Feature Extraction', 'RAG Concepts'],
  },
];

const experience = [
  {
    period: '2025 – Present',
    role: 'Independent Digital & Technical Assistance',
    org: 'Small Businesses — Khammam & Hyderabad',
    desc: 'Built and deployed full-stack restaurant ordering platforms for clients, featuring WhatsApp-integrated ordering and mobile-first design. Guided non-technical business owners in digitalizing their operations.',
    type: 'work',
    order: 1,
  },
  {
    period: '2022 – 2026',
    role: 'B.Tech — Computer Science & Engineering',
    org: 'Guru Nanak Institute of Technology, Hyderabad',
    desc: 'CGPA: 7.98 / 10. Focused on full-stack development, databases, algorithms and software engineering practices.',
    type: 'edu',
    order: 2,
  },
  {
    period: '2020 – 2022',
    role: 'Intermediate (Class 12)',
    org: 'Sri Chaitanya Junior College, Khammam',
    desc: 'Scored 96.8%. Strong foundation in Mathematics, Physics and Computer Science.',
    type: 'edu',
    order: 3,
  },
  {
    period: '2019 – 2020',
    role: 'SSC (Class 10)',
    org: 'Babay Moon High School, Khammam',
    desc: 'GPA: 10 / 10.',
    type: 'edu',
    order: 4,
  },
];

const certificates = [
  { name: 'Deloitte Technology Job Simulation', org: 'Forage', date: 'May 2026', order: 1 },
  { name: 'Deloitte Data Analytics Job Simulation', org: 'Forage', date: 'May 2026', order: 2 },
  { name: 'TCS iON Career Edge – Young Professional', org: 'TCS iON', date: 'Aug 2023', order: 3 },
];

// No achievements existed in the original hardcoded content — left empty.
// Add documents directly in the `achievements` collection whenever needed.
const achievements: Array<Record<string, unknown>> = [];

async function seed() {
  await connectDB();

  console.log('Seeding projects...');
  await Project.deleteMany({});
  await Project.insertMany(projects);

  console.log('Seeding skill categories...');
  await SkillCategory.deleteMany({});
  await SkillCategory.insertMany(skillCategories);

  console.log('Seeding experience...');
  await Experience.deleteMany({});
  await Experience.insertMany(experience);

  console.log('Seeding certificates...');
  await Certificate.deleteMany({});
  await Certificate.insertMany(certificates);

  if (achievements.length > 0) {
    console.log('Seeding achievements...');
    await Achievement.deleteMany({});
    await Achievement.insertMany(achievements);
  }

  console.log('Done. Database seeded successfully.');
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
