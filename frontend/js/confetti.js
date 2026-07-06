// Lightweight canvas confetti burst.
export function burst() {
  const cv = document.getElementById('confetti');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  cv.width = innerWidth;
  cv.height = innerHeight;
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const cols = ['#e6a437', '#e2643a', '#2b8a86', '#6a9455', '#fbf5e6'];
  const P = [];
  for (let i = 0; i < 120; i++) {
    P.push({
      x: innerWidth / 2, y: innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 10, vy: Math.random() * -9 - 3,
      s: Math.random() * 7 + 4, c: cols[i % cols.length],
      r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
    });
  }

  let t = 0;
  (function anim() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    let alive = false;
    P.forEach((p) => {
      p.vy += 0.28; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if (p.y < cv.height + 20) alive = true;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); ctx.restore();
    });
    t++;
    if (alive && t < 160) requestAnimationFrame(anim);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}
