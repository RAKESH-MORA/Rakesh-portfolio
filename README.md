# Rakesh Mora — Portfolio

Personal portfolio website for Rakesh Mora, Software Engineer & Full Stack
Developer. Built with Next.js (App Router) and MongoDB, with all content
(projects, skills, experience, certificates, achievements) managed as data
in the database rather than hardcoded in components.

**Live sections:** Hero · Featured Projects · About · Skills · Certificates
& Achievements · Contact, plus dedicated `/projects` and `/skills` pages.

---

## Tech Stack

| Layer      | Technology                                              |
|------------|-----------------------------------------------------------|
| Framework  | [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) |
| UI         | React 19, inline styles + [Tailwind CSS](https://tailwindcss.com/) 4 |
| Icons      | [lucide-react](https://lucide.dev/)                        |
| Database   | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) 8 |
| Language   | TypeScript                                                |
| Linting    | ESLint 9 (`next/core-web-vitals`, `next/typescript`)       |

## Features

- **Database-driven content** — projects, skill categories, experience,
  certificates and achievements all live in MongoDB and are served through
  REST API routes under `app/api/*`, instead of being hardcoded in the UI.
- **Single-request data loading** — `/api/portfolio` fetches every
  collection in one batch (backed by a short-lived in-memory cache) and the
  result is shared across the whole site via `PortfolioDataContext`, so
  navigating between `/`, `/projects` and `/skills` never re-hits the
  database.
- **Light/dark theme** with no flash-of-wrong-theme on load, and a
  crossfade transition between themes.
- **Custom cursor** on pointer-fine devices, scroll-linked hero background,
  section reveal-on-scroll animations, and an initial page loader.
- **Fully responsive**, down to small phones and landscape phones.
- **Resilient MongoDB connection**: pooled/cached connection across
  requests and dev hot-reloads, IPv4-first DNS resolution (works around
  `querySrv` timeouts some networks hit with `mongodb+srv://` URIs), and
  generous timeouts to tolerate Atlas free-tier clusters waking from idle.

## Project Structure

```
app/
├── api/                     # REST API route handlers (Mongoose → JSON)
│   ├── portfolio/route.ts   #   GET all collections in one payload (cached)
│   ├── projects/route.ts    #   GET projects (?featured=true&limit=n)
│   ├── skills/route.ts      #   GET skill categories (?limit=n)
│   ├── certificates/route.ts
│   ├── achievements/route.ts
│   └── experience/route.ts
├── components/               # All UI sections/widgets
│   ├── Hero.tsx  Navbar.tsx  About.tsx  Skills.tsx
│   ├── Projects.tsx  Certificates.tsx  Contact.tsx
│   ├── Marquee.tsx  Reveal.tsx  PageHeader.tsx
│   ├── CustomCursor.tsx  SmoothScroll.tsx  ThemeToggle.tsx
│   └── InitialLoader.tsx
├── context/PortfolioDataContext.tsx  # Shared client-side data cache
├── data/projects.ts          # Static "Core Strengths" list (not DB-backed)
├── projects/page.tsx          # /projects — full project list
├── skills/page.tsx            # /skills — full skill category list
├── layout.tsx / page.tsx / providers.tsx / globals.css
lib/
├── models/                   # Mongoose schemas (Project, SkillCategory, …)
├── services/                 # DB queries → typed DTOs, one per collection
├── db/connectDB.ts           # Cached/pooled Mongoose connection
└── api/response.ts           # Shared ok()/fail()/withErrorHandling() helpers
scripts/seed.ts                # One-time DB seed with the original content
types/portfolio.ts             # Public DTO types returned by the API
public/                        # Static images
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works fine)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your MongoDB connection string:

```bash
cp .env.local.example .env.local
```

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
```

If your network can't resolve `mongodb+srv://` SRV records (`querySrv
ETIMEOUT`/`ECONNREFUSED`), see the comments in `.env.local.example` for a
standard (non-SRV) connection string, or set `MONGODB_DNS_SERVERS` to a
resolver that works (e.g. `8.8.8.8,1.1.1.1`).

### 3. Seed the database

Populates MongoDB with the initial projects, skills, experience,
certificates and achievements. Safe to re-run — it clears each collection
before inserting, so it resets content back to these defaults rather than
duplicating it.

```bash
npm run seed
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command         | Description                                      |
|-----------------|---------------------------------------------------|
| `npm run dev`   | Start the development server (Turbopack)           |
| `npm run build` | Production build                                   |
| `npm run start` | Start the production server (run `build` first)    |
| `npm run lint`  | Run ESLint                                          |
| `npm run seed`  | Seed MongoDB with the default portfolio content     |

## API Reference

All routes return JSON in one of two envelopes:

```ts
{ "data": T }          // success
{ "error": string }    // failure, with an appropriate HTTP status
```

| Route                      | Query params                | Notes                                                      |
|-----------------------------|------------------------------|--------------------------------------------------------------|
| `GET /api/portfolio`        | —                            | Every collection in one response: `{ projects, skills, certificates, achievements, experience }`. Cached in memory (default 60s, tune with `PORTFOLIO_CACHE_TTL_MS`); this is what the site's UI actually calls. |
| `GET /api/projects`         | `featured=true`, `limit=n`  | Sorted by display order.                                     |
| `GET /api/skills`           | `limit=n`                   | Skill categories, sorted by display order.                   |
| `GET /api/certificates`     | —                            | Sorted by display order.                                     |
| `GET /api/achievements`     | —                            | Sorted by display order. Not currently rendered by the UI — reserved for a future "Achievements" section. |
| `GET /api/experience`       | —                            | Full work + education timeline.                              |

## Content Management

There's no admin UI — content is managed directly in MongoDB (Compass,
`mongosh`, or the Atlas UI). Each collection document controls its own
`order` field for display ordering, and `Project` documents have a
`featured` boolean controlling whether they appear on the homepage.

## Deployment

This is a standard Next.js app and deploys to any Next.js-compatible host
(e.g. [Vercel](https://vercel.com/)). Set the `MONGODB_URI` environment
variable (and optionally `MONGODB_DNS_SERVERS` /
`MONGODB_SERVER_SELECTION_TIMEOUT_MS` / `PORTFOLIO_CACHE_TTL_MS`) in your
hosting provider's project settings, then run `npm run build` / `npm run
start` (or let the platform run them for you).

## Author

**Rakesh Mora**
- GitHub: [@RAKESH-MORA](https://github.com/RAKESH-MORA)
- LinkedIn: [rakesh-mora](https://linkedin.com/in/rakesh-mora-78809a2b7)
- Email: [rakeshmora65@gmail.com](mailto:rakeshmora65@gmail.com)
