# 🦁 Vedansh's Wild First Year — Full-Stack Project

An interactive jungle-safari 1st-birthday site with a **database-backed wishes
wall** (and RSVP), built to deploy for real.

## Tech stack

| Layer            | Choice                                  | Hosting |
| ---------------- | --------------------------------------- | ------- |
| Frontend         | HTML5 · CSS3 · Vanilla JS (ES6 modules) | Vercel  |
| Backend          | NestJS · TypeScript                     | Render  |
| Database         | PostgreSQL                              | Neon    |
| ORM              | Prisma                                  | —       |
| Containerization | Docker · Docker Compose                 | —       |

## Target structure

```
vedansh-birthday/
├── frontend/          # ✅ Step 1 — static site (this build)
├── backend/           # ⏳ Step 2 — NestJS API
├── prisma/            # ⏳ Step 3 — schema + migrations  (inside backend)
├── docker-compose.yml # ⏳ Step 4
└── README.md
```

## Build roadmap

- [x] **Step 1 — Frontend refactor.** Single HTML split into `frontend/`
      (HTML + CSS + ES6 modules), image extracted to an asset, wishes wall wired
      to a configurable API with graceful offline fallback. Vercel-ready.
- [x] **Step 2 — Backend (NestJS + TypeScript).** `wishes` + `rsvp` modules,
      DTOs + validation, CORS.
- [x] **Step 3 — Database (Prisma + PostgreSQL).** `Wish` + `Rsvp` models,
      `PrismaService`, services now query Postgres, initial migration + seed.
- [ ] **Step 4 — Docker + Docker Compose.** Containerize the API, local Postgres.
- [ ] **Step 5 — Deployment.** Neon → Render → Vercel, env wiring.
- [ ] **Step 6 — Documentation.** End-to-end setup + deploy guide.

## Run the frontend now

```bash
cd frontend
npm install && npm run dev     # http://localhost:5173
```

See `frontend/README.md` for details. Backend instructions arrive in Step 2.
