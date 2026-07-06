# Frontend — Vedansh's Wild First Year

Static site: HTML5 + CSS3 + vanilla JavaScript (ES6 modules). No build step.

## Structure

```
frontend/
├── index.html          # markup
├── css/
│   └── styles.css      # all styles
├── assets/
│   └── jungle.webp     # hero illustration
└── js/
    ├── config.js       # API base URL
    ├── api.js          # fetch helpers (wishes, rsvp)
    ├── confetti.js     # celebration effect
    ├── reveal.js       # scroll-reveal + checkpoint pops
    ├── game.js         # Safari Wish Hunt
    ├── wishes.js       # database-backed wishes wall
    ├── fx.js           # anime.js + three.js effects
    └── main.js         # entry point
```

## Run locally

Because it uses ES modules, open it through a server (not `file://`):

```bash
npm install
npm run dev          # serves at http://localhost:5173
```

Or without installing anything:

```bash
npx serve -l 5173 .
# or: python3 -m http.server 5173
```

## Connect to the backend

The wishes wall reads/writes through the backend API. Point it at your API by
editing this line in `index.html`:

```html
<script>window.__API_BASE__ = 'http://localhost:3000';</script>
```

- Local dev: `http://localhost:3000`
- Production: your Render URL, e.g. `https://vedansh-birthday-api.onrender.com`

Until the backend is reachable, the wall shows a couple of sample wishes and
still lets guests post (locally) — so the site is fully presentable on its own.

## Deploy (Vercel)

Covered in Step 5. In short: import the repo on Vercel, set the **Root
Directory** to `frontend/`, framework preset **Other**, and deploy — it's a
static site with no build command.
