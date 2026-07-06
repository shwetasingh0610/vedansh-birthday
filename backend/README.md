# Backend — Vedansh's Wild First Year API

NestJS + TypeScript REST API powering the wishes wall and RSVP, backed by
**PostgreSQL** via **Prisma**.

## Endpoints

| Method | Path       | Body                                       | Description               |
| ------ | ---------- | ------------------------------------------ | ------------------------- |
| GET    | `/`        | —                                          | Service info              |
| GET    | `/health`  | —                                          | Health check (for Render) |
| GET    | `/wishes`  | —                                          | List wishes, newest first |
| POST   | `/wishes`  | `{ name?, message }`                       | Add a wish                |
| GET    | `/rsvp`    | —                                          | List RSVPs                |
| POST   | `/rsvp`    | `{ name, attending, guests?, message? }`   | Submit an RSVP            |

**Validation** (via `class-validator`, unknown fields rejected):
- `wish.message` — required, 1–280 chars · `wish.name` — optional, ≤40 chars
- `rsvp.name` — required, ≤60 chars · `rsvp.attending` — boolean (required)
- `rsvp.guests` — optional int 0–20 · `rsvp.message` — optional, ≤280 chars

## Database (Prisma + PostgreSQL)

Models live in `prisma/schema.prisma` (`Wish` → table `wishes`, `Rsvp` →
`rsvps`). The initial migration is committed in `prisma/migrations/`.

```
prisma/
├── schema.prisma
├── seed.ts
└── migrations/
    ├── migration_lock.toml
    └── 20260705000000_init/migration.sql
```

### 1. Point at a database

Set `DATABASE_URL` in `.env`. Use a free **Neon** database (Step 5) or a local
Postgres (Step 4 spins one up with Docker):

```
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### 2. Generate the client + apply migrations

```bash
npm install                 # runs `prisma generate` automatically (postinstall)
npx prisma migrate deploy   # apply committed migrations to your database
npm run db:seed             # optional: add two starter wishes
```

During development you can instead use `npx prisma migrate dev` (creates a new
migration from schema changes and applies it), and `npx prisma studio` to browse
data in a UI.

## Run locally

```bash
cd backend
cp .env.example .env        # set DATABASE_URL + CORS_ORIGIN
npm install
npm run start:dev           # http://localhost:3000  (watch mode)
```

Production build:

```bash
npm run build               # prisma generate + nest build
npm run start:prod          # node dist/main.js
```

## Environment

| Variable       | Purpose                                            | Example                          |
| -------------- | -------------------------------------------------- | -------------------------------- |
| `PORT`         | Port to listen on (Render sets this automatically) | `3000`                           |
| `CORS_ORIGIN`  | Comma-separated allowed origins (`*` = any, dev)   | `http://localhost:5173`          |
| `DATABASE_URL` | Postgres connection string                         | `postgresql://…?sslmode=require` |
