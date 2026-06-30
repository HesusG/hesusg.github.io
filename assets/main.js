(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Intro build-up: reveal the hero lines only AFTER webfonts load (no fallback-font flash).
  //    `preanim` is set synchronously in <head> (when motion is OK) to hide the lines pre-paint.
  if (!reduce && root.classList.contains('preanim')) {
    const start = () => root.classList.add('anim');
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
      setTimeout(start, 1200); // safety net if fonts.ready never resolves
    } else {
      start();
    }
  }

  // 2. Scroll-spy across the desktop rail AND the mobile menu.
  const navLinks = [...document.querySelectorAll('.vindex a[href^="#"], .tn-menu nav a[href^="#"]')];
  const linksById = new Map();
  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (!linksById.has(id)) linksById.set(id, []);
    linksById.get(id).push(a);
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l => { l.classList.remove('on'); l.removeAttribute('aria-current'); });
      (linksById.get(e.target.id) || []).forEach(l => { l.classList.add('on'); l.setAttribute('aria-current', 'true'); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'building', 'research', 'contact'].forEach(id => {
    const el = document.getElementById(id); if (el) spy.observe(el);
  });

  // 3. Scroll progress -> --progress (drives the rail fill via transform: scaleY).
  let ticking = false;
  const setProgress = () => {
    const max = root.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, (window.scrollY || root.scrollTop) / max)) : 0;
    root.style.setProperty('--progress', p.toFixed(4));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(setProgress); }
  }, { passive: true });
  setProgress();

  // 4. Smooth scroll (Lenis) when motion is allowed and the CDN loaded.
  let lenis = null;
  if (!reduce && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on('scroll', setProgress);
  }

  // 5. Anchor links: smooth-scroll via Lenis (or native), and close the mobile menu.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      const details = a.closest('details');
      if (details) details.open = false;
      if (lenis) { e.preventDefault(); lenis.scrollTo(target, { offset: -24 }); }
    });
  });

  // 6. Language preference persistence.
  document.querySelectorAll('[data-lang-set]').forEach(a => {
    a.addEventListener('click', () => {
      try { localStorage.setItem('hgc_lang', a.getAttribute('data-lang-set')); } catch (_) {}
    });
  });

  // 7. MailerLite universal embed (no-op until the account id is set — backlog).
  const mlAccount = 'REPLACE_ACCOUNT_ID';
  if (mlAccount !== 'REPLACE_ACCOUNT_ID') {
    (function (w, d, e, u, f, l, n) {
      w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); };
      l = d.createElement(e); l.async = 1; l.src = u;
      n = d.getElementsByTagName(e)[0]; n.parentNode.insertBefore(l, n);
    })(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
    window.ml('account', mlAccount);
  }
})();
