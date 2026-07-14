import { getWishes, addWish } from './api.js';
import { burst } from './confetti.js';

// Instant fallback shown before anything is cached (first-ever visit).
const SEED = [
  { name: 'Papa', message: 'Happy First Birthday to my little bundle of joy' },
  { name: 'Momy', message: 'happiest birthday my betu mumma loves you'},
];

const CACHE_KEY = 'vedansh:wishes:v1';

// ---- tiny localStorage cache (safe if storage is unavailable) ----
const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const list = raw ? JSON.parse(raw) : null;
    return Array.isArray(list) && list.length ? list : null;
  } catch {
    return null;
  }
};
const writeCache = (list) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list.slice(0, 100)));
  } catch {
    /* ignore quota / private-mode errors */
  }
};

export function initWishes() {
  const wall = document.getElementById('wall');
  const nameEl = document.getElementById('wName');
  const msgEl = document.getElementById('wMsg');
  const btn = document.getElementById('addBtn');
  if (!wall || !btn) return;

  let online = false;

  // small "syncing…" pill so the background refresh is visible but unobtrusive
  const sync = document.createElement('div');
  sync.className = 'wishes-sync';
  sync.textContent = 'Syncing wishes…';
  wall.parentNode.insertBefore(sync, wall);
  const showSync = (on) => { sync.style.display = on ? 'inline-flex' : 'none'; };

  const noteEl = (name, message) => {
    const n = document.createElement('div');
    n.className = 'note';
    const m = document.createElement('div');
    m.className = 'msg';
    m.textContent = '“' + message + '”';
    const f = document.createElement('div');
    f.className = 'from';
    f.textContent = '— ' + ((name && name.trim()) || 'A well-wisher');
    n.append(m, f);
    return n;
  };

  const render = (list) => {
    wall.innerHTML = '';
    list.forEach((w) => wall.appendChild(noteEl(w.name, w.message)));
  };
  const prepend = (name, message) => wall.prepend(noteEl(name, message));

  // 1) Paint immediately from cache (or seed) — the wall is never empty.
  render(readCache() || SEED);

  // 2) Revalidate from the backend in the background; update when it arrives.
  (async function refresh() {
    showSync(true);
    try {
      const list = await getWishes();
      online = true;
      if (list.length) {
        render(list);
        writeCache(list);
      }
    } catch {
      online = false; // backend still waking / unreachable — keep what's shown
    } finally {
      showSync(false);
    }
  })();

  // 3) Adding a wish is optimistic: show it instantly, save to backend in the bg.
  btn.addEventListener('click', async () => {
    const message = msgEl.value.trim();
    const name = nameEl.value.trim();
    if (!message) { msgEl.focus(); return; }

    prepend(name, message);       // instant feedback
    nameEl.value = '';
    msgEl.value = '';
    burst();

    try {
      if (online) await addWish({ name, message });
      // refresh the cache so the new wish survives a reload
      try {
        const list = await getWishes();
        if (list.length) { render(list); writeCache(list); }
      } catch { /* keep optimistic copy */ }
    } catch {
      /* guest's words already shown; nothing lost */
    }
  });
}