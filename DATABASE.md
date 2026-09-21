# Database Setup (MongoDB backend)

This project's frequently-changing content — **Projects, Skills, Experience,
Certificates, Achievements** — is stored in MongoDB and served through
Next.js Route Handlers. The UI is unchanged; it now fetches this content
from the API instead of a hardcoded file.

## 1. Get a MongoDB connection string

Easiest: a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.
Create a database user, allow network access from your IP (or `0.0.0.0/0`
for quick testing), and copy the connection string. A local `mongod`
instance works too.

## 2. Configure the environment variable

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
```

`MONGODB_URI` is read server-side only (`lib/db/connectDB.ts`) — it is never
sent to the browser. Set the same variable in your hosting provider's
environment variables for production (Vercel, Render, etc.).

## 3. Install dependencies and seed initial data

```bash
npm install
npm run seed
```

`npm run seed` populates the database with the content that used to be
hardcoded in `app/data/projects.ts` and `app/components/About.tsx`, so the
site looks identical to before on first run. It's safe to re-run — it
clears each collection before inserting.

From then on, **edit content directly in MongoDB** (Atlas UI, Compass,
`mongosh`) — no admin UI or write API was built, per request. Every GET
route reads fresh from the database on every request, so changes appear on
the next page load with no redeploy needed.

## 4. Run the app

```bash
npm run dev
```

## Architecture

```
lib/
  db/connectDB.ts        Cached Mongoose connection (safe for dev hot-reload
                          and serverless invocations)
  models/                 Mongoose schemas — one per collection, with
                          validation and indexes
  services/                DB queries + mapping to public DTOs (only the
                          fields the UI needs are ever selected/returned)
  api/response.ts          Shared ok()/fail()/withErrorHandling() helpers for
                          consistent JSON responses and status codes

types/portfolio.ts        Shared TypeScript DTO types used by services,
                          routes, and frontend components

app/api/
  projects/route.ts        GET /api/projects            (?featured=true&limit=)
  skills/route.ts           GET /api/skills               (?limit=)
  experience/route.ts       GET /api/experience
  certificates/route.ts     GET /api/certificates
  achievements/route.ts     GET /api/achievements

app/hooks/useApiData.ts   Client-side fetch hook (loading/error/data state)
                          used by the components below

scripts/seed.ts            One-time/reset seed script (npm run seed)
```

### Collections

| Collection      | Model                        | Notes |
|-----------------|-------------------------------|-------|
| `projects`      | `lib/models/Project.ts`       | `featured: boolean` controls the homepage's top 3; `order` controls sort everywhere |
| `skillcategories` | `lib/models/SkillCategory.ts` | One document per section (Frontend, Backend, …); `order` controls sort |
| `experiences`   | `lib/models/Experience.ts`    | Covers both work and education timeline entries (`type: 'work' \| 'edu'`) |
| `certificates`  | `lib/models/Certificate.ts`   | — |
| `achievements`  | `lib/models/Achievement.ts`   | API/model only — the current design has no Achievements section to render it in yet |

### Frontend wiring

| Component | Fetches | Notes |
|---|---|---|
| `app/components/Projects.tsx` (homepage) | `GET /api/projects?featured=true&limit=3` | |
| `app/projects/page.tsx` | `GET /api/projects` | Category filter computed client-side from the fetched data |
| `app/components/Skills.tsx` (homepage) | `GET /api/skills?limit=4` | |
| `app/skills/page.tsx` | `GET /api/skills` | |
| `app/components/About.tsx` | `GET /api/experience`, `GET /api/certificates` | Two independent fetches |

"Core Strengths" (`app/data/projects.ts`) and the stats/languages blocks in
`About.tsx` were not part of the requested collections and remain static.

### Loading / error / empty states

Every list above renders one of three states without altering the existing
design: a shimmering skeleton (same shape/spacing as the real content) while
loading, a short muted message if the request fails, and a short muted
message if the collection is empty. No layout shift beyond the normal
content-arrives transition.
