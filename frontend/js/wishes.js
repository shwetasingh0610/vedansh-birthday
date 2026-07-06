import { getWishes, addWish } from './api.js';
import { burst } from './confetti.js';

// Shown when the backend is not reachable yet (e.g. before deployment).
const SEED = [
  { name: 'Nani & Nana', message: 'Our little tiger, you fill our world with roars of joy!' },
  { name: 'The Sharmas', message: 'Happy 1st birthday, brave explorer! 🎂' },
];

export function initWishes() {
  const wall = document.getElementById('wall');
  const nameEl = document.getElementById('wName');
  const msgEl = document.getElementById('wMsg');
  const btn = document.getElementById('addBtn');
  if (!wall || !btn) return;

  let online = false;

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

  async function load() {
    try {
      const list = await getWishes();
      online = true;
      render(list.length ? list : SEED);
    } catch {
      online = false; // graceful demo mode until the API is live
      render(SEED);
    }
  }

  btn.addEventListener('click', async () => {
    const message = msgEl.value.trim();
    const name = nameEl.value.trim();
    if (!message) { msgEl.focus(); return; }

    btn.disabled = true;
    try {
      if (online) {
        const saved = await addWish({ name, message });
        prepend(saved.name, saved.message);
      } else {
        prepend(name, message); // local-only until backend is connected
      }
      nameEl.value = '';
      msgEl.value = '';
      burst();
    } catch {
      prepend(name, message); // never lose the guest's words
      nameEl.value = '';
      msgEl.value = '';
      burst();
    } finally {
      btn.disabled = false;
    }
  });

  load();
}
