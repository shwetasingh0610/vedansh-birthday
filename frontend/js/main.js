import { initFX } from './fx.js';
import { initReveal } from './reveal.js';
import { initGame } from './game.js';
import { initWishes } from './wishes.js';

function boot() {
  initFX();      // 3D balloons + anime.js entrance; sets window.jungleFX
  initReveal();  // scroll reveals + checkpoint pops
  initGame();    // Safari Wish Hunt
  initWishes();  // database-backed wishes wall
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
