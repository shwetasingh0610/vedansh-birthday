import { burst } from './confetti.js';

// Safari Wish Hunt: tap hidden critters to reveal birthday wishes.
export function initGame() {
  const scene = document.getElementById('scene');
  const foundEl = document.getElementById('found');
  const totalEl = document.getElementById('total');
  const pop = document.getElementById('wishPop');
  const win = document.getElementById('win');
  const countChip = document.querySelector('.game-hud .count');
  if (!scene || !foundEl || !totalEl || !pop || !win) return;

  const wishes = [
    { emo: '🦁', text: 'May your roar be loud and your heart be brave!' },
    { emo: '🐘', text: 'Wishing you a year full of giggles and big adventures!' },
    { emo: '🦒', text: 'Stand tall, dream big, and see far, little one.' },
    { emo: '🐒', text: 'Swing through life with joy, sweet Vedansh!' },
    { emo: '🦜', text: 'May every single day be a colourful new adventure!' },
    { emo: '🐆', text: 'Run fast, laugh often, and stay wonderfully wild!' },
  ];
  const spots = [[12, 30], [40, 20], [68, 40], [24, 55], [55, 60], [80, 25]];
  totalEl.textContent = wishes.length;
  let found = 0;

  wishes.forEach((w, i) => {
    const c = document.createElement('span');
    c.className = 'critter';
    c.textContent = w.emo;
    c.style.left = spots[i][0] + '%';
    c.style.top = spots[i][1] + '%';
    c.style.animationDelay = i * 0.45 + 's';
    c.setAttribute('role', 'button');
    c.setAttribute('tabindex', '0');
    c.setAttribute('aria-label', 'Hidden animal — reveal a wish');

    const reveal = () => {
      if (c.classList.contains('found')) return;
      c.classList.add('found');
      found++;
      foundEl.textContent = found;
      if (countChip) {
        countChip.classList.remove('bump');
        void countChip.offsetWidth;
        countChip.classList.add('bump');
      }
      pop.textContent = '“' + w.text + '” ' + w.emo;
      pop.classList.add('show');
      if (found === wishes.length) {
        win.classList.add('show');
        burst();
        if (window.jungleFX) {
          window.jungleFX.balloons();
          window.jungleFX.popCheer();
        }
      }
    };

    c.addEventListener('click', reveal);
    c.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); }
    });
    scene.appendChild(c);
  });
}
