// Progressive-enhancement effects powered by anime.js + three.js (loaded via CDN).
// If either library is unavailable, the page still works — these just no-op.
export function initFX() {
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const A = window.anime;

  // ----- three.js: 3D balloons drifting in the sky behind the jungle -----
  try {
    const canvas = document.getElementById('sky3d');
    if (canvas && typeof THREE !== 'undefined') {
      const hero = canvas.parentElement;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 16;
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dir = new THREE.DirectionalLight(0xffffff, 0.55);
      dir.position.set(5, 10, 7);
      scene.add(dir);

      const cols = [0xe6a437, 0xe2643a, 0x2b8a86, 0x6a9455, 0xf2c14e, 0xff8fab, 0x8ec9f0];
      const geo = new THREE.SphereGeometry(1, 24, 24);
      const balloons = [];
      for (let i = 0; i < 13; i++) {
        const mat = new THREE.MeshStandardMaterial({ color: cols[i % cols.length], roughness: 0.4, metalness: 0.05 });
        const b = new THREE.Mesh(geo, mat);
        const s = 0.6 + Math.random() * 0.7;
        b.scale.set(s, s * 1.18, s);
        b.position.set((Math.random() - 0.5) * 28, Math.random() * 32 - 16, (Math.random() - 0.5) * 10 - 3);
        b.userData = { sp: 0.006 + Math.random() * 0.014, sw: Math.random() * Math.PI * 2, amp: 0.4 + Math.random() * 0.7 };
        scene.add(b);
        balloons.push(b);
      }

      const size = () => {
        const w = hero.clientWidth, h = hero.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      size();
      window.addEventListener('resize', size);

      let boost = 0;
      window.__balloonBoost = () => { boost = 1; };
      const frame = () => {
        balloons.forEach((b) => {
          b.position.y += b.userData.sp * (1 + boost * 7);
          b.userData.sw += 0.01;
          b.position.x += Math.sin(b.userData.sw) * 0.004 * b.userData.amp;
          b.rotation.z = Math.sin(b.userData.sw) * 0.09;
          if (b.position.y > 19) { b.position.y = -19; b.position.x = (Math.random() - 0.5) * 28; }
        });
        boost *= 0.95;
        renderer.render(scene, camera);
        if (!reduce) requestAnimationFrame(frame);
      };
      if (reduce) renderer.render(scene, camera);
      else requestAnimationFrame(frame);
    }
  } catch { /* 3D optional */ }

  // ----- anime.js helpers used by other modules via window.jungleFX -----
  window.jungleFX = {
    nodePop(stop) {
      try {
        const node = stop && stop.querySelector('.node');
        if (!node || !A) return;
        A.remove(node);
        A({ targets: node, scale: [0.2, 1], rotate: ['-25deg', '0deg'], duration: 900, easing: 'easeOutElastic(1,.55)' });
      } catch { /* noop */ }
    },
    balloons() {
      try {
        const emos = ['🎈', '🎈', '🎈', '🎉', '🌟', '🎈'];
        for (let i = 0; i < 16; i++) {
          const el = document.createElement('div');
          el.className = 'balloon';
          el.textContent = emos[i % emos.length];
          el.style.left = 4 + Math.random() * 90 + 'vw';
          el.style.fontSize = 1.6 + Math.random() * 1.7 + 'rem';
          document.body.appendChild(el);
          if (A) {
            A({
              targets: el,
              translateY: [0, -(window.innerHeight + 180)],
              translateX: (Math.random() - 0.5) * 140,
              rotate: (Math.random() - 0.5) * 70,
              opacity: [{ value: 1, duration: 200 }, { value: 0, duration: 700, delay: 1500 }],
              duration: 2600 + Math.random() * 1300,
              delay: i * 70,
              easing: 'easeOutQuad',
              complete: () => el.remove(),
            });
          } else {
            setTimeout(() => el.remove(), 60);
          }
        }
        if (window.__balloonBoost) window.__balloonBoost();
      } catch { /* noop */ }
    },
    popCheer() {
      try {
        const w = document.querySelector('.win');
        if (!w || !A) return;
        A({ targets: w, scale: [0.6, 1], duration: 1200, easing: 'easeOutElastic(1,.5)', complete: () => { w.style.transform = ''; } });
      } catch { /* noop */ }
    },
  };

  // ----- anime.js: springy entrance for the birthday text -----
  try {
    if (A) {
      const pre = document.querySelectorAll('.ct-kicker,.ct-name,.ct-turning,.ct-one,.ct-paw,.sparkles');
      pre.forEach((n) => { n.style.opacity = 0; });
      A.timeline({ easing: 'easeOutElastic(1,.7)' })
        .add({ targets: '.ct-kicker', opacity: [0, 1], translateY: [14, 0], duration: 700, delay: 350 })
        .add({ targets: '.ct-name', opacity: [0, 1], translateY: [18, 0], duration: 800 }, '-=430')
        .add({ targets: '.ct-turning', opacity: [0, 1], translateY: [10, 0], duration: 600 }, '-=560')
        .add({ targets: '.ct-one', opacity: [0, 1], duration: 700, easing: 'easeOutQuad' }, '-=320')
        .add({ targets: '.ct-paw', opacity: [0, 1], duration: 400 }, '-=260')
        .add({ targets: '.sparkles', opacity: [0, 1], duration: 500 }, '-=200');
    }
  } catch { /* noop */ }
}
