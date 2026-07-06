// Scroll-triggered reveals for trail stops and section titles.
export function initReveal() {
  const items = document.querySelectorAll('.stop, .reveal');
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('show');
        if (e.target.classList.contains('stop') && window.jungleFX) {
          window.jungleFX.nodePop(e.target);
        }
        io.unobserve(e.target);
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((el) => io.observe(el));
}
